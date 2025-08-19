<template>
  <div class="page-wrapper topTemplate">
    <div v-if="learnTypeFromQuery === 3">
      <section class="PlanPrice">
        <div class="PlanPrice__inner">
        <div class="subPosition">
          <span class="subTitle">教材一覧</span>
        </div>
        </div>
      </section>
      <div class="noneBlock">
        ご利用中の会員ステータスでは、現在ご提供できる教材はありません。
      </div>
    </div>
    <div v-else class="textbookBG">
    <section class="PlanPrice">
      <div class="PlanPrice__inner">
      <div class="subPosition">
        <span class="subTitle">教材一覧</span>
      </div>
      </div>
    </section>


    <section class="contentsWrap textbookPage">
      <ul class="select_Text">
        <a
            v-for="(course, index) in course_list"
            :key="course.course.id"
            @click="handleClickCourse(index, course.course.id)"
        >
          <li
              :class="selected_index == index ? 'selected' : ''"
              v-if="course.course"
          >
            {{ course.course.name }}
          </li>
        </a>
      </ul>

      <br>

      <div v-if="course_list[selected_index]" class="textArray" v-for="(category,cindex) in course_list[selected_index].categories">
        <nuxt-link :to="`/textbookList?category=${category.id}`" class="textLink">
          <div class="textSubtitle">
<!--            <span class="tagL" v-if="category.learn_type === 0">学習</span>-->
<!--            <span class="tagS" v-else>会話</span>-->
            <h3>{{category.name}}</h3>
            <p class="total">{{category.tnum}}課</p>
          </div>
        </nuxt-link>
        <nuxt-link :to="`/textbookList?category=${category.id}`">
          <div class="textDetails">
            <ul>
              <li
                  v-for="(tag,tindex) in level_map_list"
                  :class="{ 'active-tag': category.tag_level.includes(tindex) }"
              >
                {{tag}}
              </li>
            </ul>
            <p>{{category.explanation}}</p>
          </div>
        </nuxt-link>
      </div>
    </section>


  </div>
  </div>
</template>


<script setup>
import { register } from 'swiper/element/bundle';
import {useHomeCategoryListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {usePage} from "~/composables/usePage";
import {useMainStore} from "~/composables/store";
import { useRoute } from 'vue-router';
const route = useRoute();
// register Swiper custom elements
register();

let selected_index = ref(0);
let course_list = ref([]);
let level_map_list = ref([]);
const useStore = useMainStore();
// const learnType = useStore?.learn_type;
let learnTypeFromQuery = ref(2);




function handleClickCourse(index, courseId) {
  changeCourse(index);
}


function changeCourse(index) {
  selected_index.value = index;
}

const getCategorys = async () => {
  // ✅ 這裡改為拿「全部教材」的API呼叫（依你的API實際情況調整）
  let { data: courseinfos } = await useHomeCategoryListDataApi();
  if (courseinfos?.value) {
    course_list.value = courseinfos?.value.courses ?? [];
    level_map_list.value = courseinfos?.value.tag_level_maps ?? [];
  }
};

onMounted(async () => {
  await getCategorys();
  // 保留「登入前後」與 query 的判斷，不動作業邏輯
  if (route.query.learn_type) {
    learnTypeFromQuery.value = route.query.learn_type;
  }
  if (useStore?.studentLoggedIn) {
    learnTypeFromQuery.value = useStore.learn_type;
  }
  // 不再根據 learn_type 切換 tab，預設第一個即可
  selected_index.value = 0;
});
</script>

<style scoped>
.noneBlock{
  padding: 100px; font-size: 16px; height: 200px; margin: auto; text-align: center;
}
/* Swiper 按鈕顏色 */
swiper-container::part(button-next), swiper-container::part(button-prev) {
  color: blanchedalmond;
}

/* 通用樣式 */
.teacherImg {
  max-width: 200px;
}
.textbookPage {
  margin-top: 16px;
}
.active-tag{
  background-color: var(--pink-dark);
  color: #FFFFFF;
}
</style>
