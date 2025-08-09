<template>
    

<section class="teacher">
    <h3 class="teacherTitle">人気講師</h3>
    <div class="left">
      <figure></figure>
      <figure v-for="(bteacher, index) in props.teachers" :key="index">
        <img :src="bteacher.face_img2" :alt="bteacher.name_kanji" />
      </figure>
<!--      <figure><img src="~/assets/images/leftGrid1.jpg" alt="" /></figure>-->
<!--      <figure><img src="~/assets/images/leftGrid2.jpg" alt="" /></figure>-->
<!--      <figure><img src="~/assets/images/leftGrid3.jpg" alt="" /></figure>-->
<!--      <figure><img src="~/assets/images/leftGrid4.jpg" alt="" /></figure>-->
<!--      <figure><img src="~/assets/images/leftGrid5.jpg" alt="" /></figure>-->
<!--      <figure><img src="~/assets/images/leftGrid5.jpg" alt="" /></figure>-->
<!--      <figure><img src="~/assets/images/leftGrid3.jpg" alt="" /></figure>-->
<!--      <figure><img src="~/assets/images/leftGrid1.jpg" alt="" /></figure>-->
    </div>
    <div class="right">
      <p class="rightTitle">本日受付中の講師</p>
      <div class="TimelineWrap scroll_bar">
        <div v-if="pending">Loading ...</div>
        <ul v-for="(teacher, index) in props.teachers_today" :key="index">
          <li class="TimelineChild">
            <NuxtLink
              :to="`/teachers/${teacher.id}`"
              class="TimelineLink"
            >
            <figure><img :src="teacher.face_img5" alt="" /></figure>
              <span class="date">
<!--                10/10 19:08:23<br />-->
                <span class="name">{{teacher.name_pinyin}}{{ teacher.name_cn }} {{ teacher.name_jp }}</span>
                <img src="~/assets/SVG/icon_online.svg" alt="講師顔写真"/>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>

</template>


<script setup>

const props = defineProps({
  teachers: {
    type: Array,
    default: []
  },
  teachers_today: {
    type: [Array],
    default: []
  }
})


</script>