<template>
  <img class="grayMask" src="../assets/images/graymask.png" />
  <div class="container" @mouseenter="stopScrolling" @mouseleave="startScrolling">
    <div class="scrolling-array" ref="scrollingArray" :style="{ top: arrayTop + 'px' }">
      <div
          v-for="(teacher, index) in props.items"
          :key="index"
          class="item"
      >
        <NuxtLink
            :to="`/teachers/${teacher.id}`"
            class="TimelineLink"
        >
        <img class="teacherFrame" src="../assets/images/resevationimg.png" />
<!--        <img class="teacherFace" :src="teacher.face_img5" />-->
        <div class="teacherFace" :style="{ backgroundImage: `url(${teacher.face_img5})` }"></div>
        <span class="teacherName">{{teacher.name_pinyin}}<br>
          <span class="teacherFont">{{ teacher.name_cn }} {{ teacher.name_jp }}</span>
        <span class="kouShi">講師</span>
        </span>
        <span class="teacherCountry">{{ teacher.province_addr }}{{ teacher.current_address }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, defineProps} from 'vue';

const props = defineProps({
  items: {
    default: [],
    type: Object,
  }
})

// const items = ref(['1', '2', '3', '4', '5', '6']);
const arrayTop = ref(0);
const scrollingArray = ref(null);
let scrollSpeed = 1;
let scrollInterval;

function startScrolling() {
  scrollInterval = setInterval(() => {
    arrayTop.value -= scrollSpeed;
    if (arrayTop.value <= -92) {
      const firstItem = scrollingArray.value.firstChild;
      scrollingArray.value.appendChild(firstItem);
      arrayTop.value = 0;
    }
  }, 30);
}

function stopScrolling() {
  clearInterval(scrollInterval);
}

// function handleClick(item) {
//   return navigateTo("/teachers/"+item.id);
// }

onMounted(() => {
  startScrolling();
});

onUnmounted(() => {
  stopScrolling();
});
</script>

<style scoped>
.container {
  width: 300px;
  height: 370px;
  overflow: hidden;
  position: absolute;
  top: 130px;
  right: 70px;
}

.container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to top, white, transparent);
  pointer-events: none; /* 确保不影响其他元素的交互 */
}

.scrolling-array {
  width: 280px;
  height: auto;
  position: absolute;
}

.item {
  width: 100%;
  height: 82px;
  background-color: #FFFFFF;
  margin-bottom: 10px;
  margin-left: 4px;
  cursor: pointer;
  border-radius: 40px;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  color: #424242;
}
.grayMask{width: 300px;position: absolute; right: 76px; top: 414px; z-index: 999;}

.teacherFrame{width: 77px; border-radius: 77px; position: absolute; top: 3px; left: 3px; z-index: 999;}
.teacherFace{width: 75px; height: 75px; background-position: center center; background-size:cover; overflow: hidden; object-fit: cover; border-radius: 75px; position: absolute; top: 3px; left: 4px;}
.teacherName{font-size: 13px; position: absolute; top: 14px; left: 100px;}
.teacherFont{font-size: 19px; font-weight: bold; margin: 4px 0 10px 0; display: inline-block;}
.kouShi{font-size: 12px; font-weight: normal; margin-left: 4px;}
.teacherCountry{font-size: 14px; font-weight: bold; color: #AFAFAF; position: absolute; top: 58px; left: 100px;}

@media screen and (max-width: 520px) {
  .grayMask{display: none;}
  .container{
    width: 300px;
    height: 370px;
    overflow: hidden;
    position: relative;
    top: 20px;
    right: auto;
    margin: auto;
    clear: both;
  }
}
</style>