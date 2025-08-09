<template>
  <div class="container">
    <div class="scrolling-array" ref="scrollingArray" :style="{ top: arrayTop + 'px' }">
      <div class="item" v-for="(evaluation,ekey) in evaluations" :key="ekey">
        <NuxtLink
            :to="`/teachers/${evaluation.teacher_id}`"
            class="TimelineLink"
        >
        <img class="teacherface" :src="evaluation.face_img5" />
        <n-rate readonly allow-half class="star" size="middle" style="height:20px;" :value="evaluation.score" />
<!--          <n-icon size="20">-->
<!--            <star-outline />-->
<!--          </n-icon>-->
<!--        </n-rate>-->
        <ul>
<!--          <img class="star" src="../assets/images/star.png">-->
          <li class="teachername">{{evaluation.teacher_name_kanji}}<span class="littleWord">講師</span></li>
          <li class="comment">{{evaluation.comment}}</li>
          <li class="date">{{evaluation.registered}}</li>
        </ul>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  NRate,
  NIcon
} from "naive-ui"
import {defineProps, onMounted, ref} from "vue";

const props = defineProps({
  evaluations: {
    default: [],
    type: Object,
  }
});

let scrollSpeed = ref(1);
let scrollInterval;
const scrollingArray = ref(null);
const arrayTop = ref(0);


function startScrolling() {
  scrollInterval = setInterval(() => {
    arrayTop.value -= scrollSpeed.value;
    if (arrayTop.value <= -120) {
      const firstItem = scrollingArray.value.firstChild;
      scrollingArray.value.appendChild(firstItem);
      arrayTop.value = 0;
      // array.appendChild(array.firstElementChild);
      // array.style.top = '0px';
    }
  }, 20);
}
// function handleClick(item) {
//   alert(`You clicked item ${item}`);
// }

onMounted(() => {
  startScrolling();
});

onBeforeUnmount(() => {
  clearInterval(scrollInterval);
})
</script>

<style scoped>
.container {
  width: 500px;
  height: 550px;
  overflow: hidden;
  position: relative;
}

.scrolling-array {
  width: 480px;
  height: auto;
  position: absolute;
}


.item {border-radius:16px; background-color: #ffffff; width: 100%; height: 110px; padding:18px; position: relative; margin:10px 0 10px 0;}
.item .teacherface{width:80px; border-radius: 4px; background-color: #f1f1f1; height: 80px; position: absolute; left: 18px; overflow: hidden; object-fit: cover;}
.item ul{position: absolute; left: 110px; text-align: left;}
.star{width: 100px; position: absolute; right:0;}

.item ul li.teachername{position: absolute; left:0; margin-top: 1px; font-size:19px; font-weight:bold;}
.item .littleWord{font-size:11px; display: contents; font-weight: normal; margin-left:8px;}
.item ul li.comment{margin-top: 26px; width: 350px; height: 33px; line-height: 18px; overflow: hidden; font-size:14px; text-align: left; margin-bottom: 6px;}
.item ul li.date{margin-top: 8px; font-size:13px; color:#6f6f6f; text-align: left;}

.star{right: 16px;}


@media screen and (max-width: 520px) {
  .container{
    width: 100%;
  }
  .scrolling-array{
    width: 100%;
    text-align: left;
  }
  .star{width: 90px; transform: scale(0.7); position: absolute; right:4px;}
  .item ul li:nth-child(2){position: absolute; left:0; margin-top: 0;}
  .item ul li:nth-child(3){margin-top: 64px; font-size:13px;}
  .item ul li:nth-child(4){margin-top: 5px; font-size:12px; color:#cccccc; text-align: left;}

  .item ul{ width: 70%; overflow: auto;}
  .item ul li.comment{margin-top: 25px; padding: 0; font-size: 0.8rem; width: 90%; overflow: hidden;}
  .item ul li.teachername{width: 140px; height: 22px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
}
</style>