<template>
  <div class="marqueeWrapper" @mouseenter="pause" @mouseleave="start">
    <div
        class="marqueeContent"
        ref="container"
        :style="{
        transform: `translateY(${offset}px)`,
        transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none'
      }"
    >
      <div
          class="marqueeItem"
          v-for="(item, index) in itemsCopy"
          :key="`${item.id}-${index}`"
          @click="goBlog(item.id)"
      >
        <span class="category-tag-new">{{ item.name }}</span>
        <span class="date">{{ item.registered.substring(0, 10) }}</span>
        <span class="title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue'
import { nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const container = ref(null)
const offset = ref(0)
const ITEM_HEIGHT = 40
const isAnimating = ref(false)
let timer = null

const itemsCopy = ref([])

// 當 props.items 更新後才開始跑
watch(
    () => props.items,
    async (val) => {
      if (val && val.length > 0) {
        itemsCopy.value = [...val]
        offset.value = 0
        await nextTick()
        start()
      }
    },
    { immediate: true }
)


const scrollStep = () => {
  if (itemsCopy.value.length === 0 || !container.value) return
  isAnimating.value = true
  offset.value = -ITEM_HEIGHT

  setTimeout(() => {
    isAnimating.value = false
    const first = itemsCopy.value.shift()
    itemsCopy.value.push(first)
    offset.value = 0
  }, 500)
}

const start = () => {
  pause()
  if (!container.value) return
  timer = setInterval(scrollStep, 3000)
}

const pause = () => {
  clearInterval(timer)
}

const goBlog = (id) => {
  const encoded = btoa(encodeURIComponent(id + ''))
  const url = `/blog/info?bid=${encoded}`
  window.open(url, '_blank') // ← 這樣就會另開新視窗
}

onMounted(() => {
  if (props.items.length > 0) {
    itemsCopy.value = [...props.items]
    start()
  }
})

onUnmounted(() => pause())
</script>

<style scoped>
.marqueeWrapper {
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  position: relative;
  background-color: var(--pink-light, #FDF1EF);
  color: #B2463B; /* 深桃作為文字色，對比清楚 */
  font-weight: bold;
  border-radius: 6px;
  margin-bottom: 12px;
  border: 1px solid rgba(250, 131, 115, 0.35); /* #FA8373 35% */
  border-left: 5px solid var(--pink-dark, #FA8373);
  box-shadow: 0 0 4px rgba(250, 131, 115, 0.12);
  transition: border-color .2s ease, box-shadow .2s ease;
}

.marqueeItem {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #B2463B;
  white-space: nowrap;
  padding: 0 10px;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}

.marqueeItem:hover {
  background: linear-gradient(to right, #FFE9E6, #FDF1EF); /* 桃→粉 */
  color: #8F392F; /* 略深一階 */
}

.marqueeWrapper:hover {
  border-color: rgba(250, 131, 115, 0.55);
  box-shadow: 0 2px 8px rgba(250, 131, 115, 0.18);
}
.date {
  margin-right: 8px;
  font-size: 13px;
  font-weight: bold;
  color: #8F392F; /* 深桃：和整體主色一致、對比清楚 */
  opacity: .95;
}

/* 粉桃膠囊標籤 */
.category-tag-new {
  color: #fff;
  background: linear-gradient(to right,
  var(--pink-dark, #FA8373),
  #F95B46
  );
  height: 20px;
  line-height: 18px;
  padding: 0 8px;
  margin: 0 8px 0 10px;
  font-size: 11px;
  font-weight: bold;
  border-radius: 999px;
  border: 1px solid rgba(249, 91, 70, 0.5);
  box-shadow:
      0 1px 0 rgba(249, 91, 70, 0.18),
      inset 0 0 0 1px rgba(255, 255, 255, 0.25);
}

/* hover 時讓 tag 更有層次，但仍維持粉桃 */
.marqueeItem:hover .category-tag-new {
  background: linear-gradient(to right, #FCA69A, #F84D36);
  border-color: rgba(248, 77, 54, 0.6);
}


.title {
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  margin-right: 12px;
  text-decoration: underline;
}

@media screen and (max-width: 520px) {
  .date {
    display: none;
  }
  .category-tag-new {
    transform: scale(0.9);
    margin-left: 0;
  }
  .title {
    font-size: 13px;
  }
  .marqueeWrapper {
    width: 90%;
    margin: 0 auto 4% auto;
  }
}
</style>
