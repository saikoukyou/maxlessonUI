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
  background-color: #F6F9FF; /* 淡藍灰底，清爽穩重 */
  color: #123A70;
  font-weight: bold;
  border-radius: 6px;
  margin-bottom: 12px;
  border: 1px solid #A3C1F0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #3A7BFF;
  transition: border-color 0.2s ease;
}

.marqueeItem {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #123A70;
  white-space: nowrap;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.marqueeItem:hover {
  background: linear-gradient(to right, #D7E9FF, #F0DDF7); /* 藍紫漸層 hover */
  color: #2F296B;
}

.marqueeWrapper:hover {
  border-color: #91B8F2;
}

.date {
  margin-right: 8px;
  font-size: 13px;
  font-weight: bold;
  color: #123A70;
}

.category-tag-new {
  color: white;
  background: linear-gradient(to right, #3A7BFF, #FF5C8A); /* 藍 → 藍紅 tag */
  height: 20px;
  padding: 0 8px;
  line-height: 20px;
  margin-right: 8px;
  font-size: 11px;
  border-radius: 999px;
  margin-left: 10px;
  font-weight: bold;
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
