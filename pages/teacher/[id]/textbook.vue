<template>
  <section class="contentsWrap textbookPage">
    <div class="textBookT">BizCHINA教材一覧</div>
    <ul class="select_Text">
      <a @click="changeCourse(index)" v-for="(course,index) in course_list">
        <li :class="selected_index == index ? 'selected' : ''" v-if="course.course">{{course.course.name}}<span class="name_cn">{{course.course.name_cn}}</span></li>
      </a>
    </ul>

    <div style="height: 30px;"></div>

    <div v-if="course_list[selected_index]" class="textArray" v-for="(category,cindex) in course_list[selected_index].categories">
      <nuxt-link :to="'/teacher/center/textbookList?category='+category.id+'&sid='+sid" class="textLink">
        <div class="textSubtitle">
          <span class="tagL" v-if="category.learn_type === 0">総合</span>
          <span class="tagS" v-else>会话</span>
          <h3>{{category.name}}</h3>
          <p class="total">{{category.tnum}}課</p>
        </div>
      </nuxt-link>
      <nuxt-link :to="'/teacher/center/textbookList?category='+category.id+'&sid='+sid">
      <div class="textDetails">
        <ul>
          <li v-for="(tag,tindex) in level_map_list" :style="category.tag_level.includes(tindex) ? 'background-color: #E46722;color:white;' : ''">{{tag}}</li>
        </ul>
        <p>{{category.explanation}}</p>
<!--        <div class="progressDiv">-->
<!--          進捗状況-->
<!--          <div class="progress-bar">-->
<!--            <div class="progress"></div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      </nuxt-link>
    </div>


  </section>


  <div style="height: 24vh;"></div>


</template>


<script setup>
import { register } from 'swiper/element/bundle';
import {useHomeCategoryListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {usePage} from "~/composables/usePage";

// register Swiper custom elements
register();

let selected_index = ref(0);
let course_list = ref([]);
let level_map_list = ref([]);
let sid = ref(0);
let route = useRoute();

if (route?.query?.sid) {
  sid.value = route?.query?.sid;
}

function changeCourse(index) {
  selected_index.value = index;
}

const getCategorys = async () => {
  let {data: courseinfos  } = await useHomeCategoryListDataApi(7);
  if (courseinfos?.value) {
    course_list.value = courseinfos?.value.courses ?? [];
    level_map_list.value = courseinfos?.value.tag_level_maps ?? [];
  }
};

onMounted(() => {

  getCategorys();

})

</script>


<style scoped>
swiper-container::part(button-next),swiper-container::part(button-prev) {
    color: #fff;
}
.teacherImg {
  max-width: 200px;
}
@media screen and (max-width: 520px) {
  .contentsWrap{
    width: 100%;
  }
  .textbookPage{
    width: 100%;
  }
  .select_Text{
    width: 100%;
    grid-template-columns: repeat(3, 33%)
  }
}
</style>