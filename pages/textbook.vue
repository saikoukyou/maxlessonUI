<template>
  <div class="page-wrapper" :class="currentTab">
    <div v-if="learnTypeFromQuery === 3">
      <section class="PlanPrice">
        <div class="subPosition">
          <span class="subTitle">教材一覧</span>
        </div>
      </section>
      <div class="noneBlock">
        ご利用中の会員ステータスでは、現在ご提供できる教材はありません。
      </div>
    </div>
    <div v-else class="textbookBG">
    <section class="PlanPrice">
      <div class="subPosition">
        <span class="subTitle">教材一覧</span>
      </div>
    </section>

    <!-- tab 區塊 -->
    <div class="course-tab" v-if="learnTypeFromQuery === 2">

    <div class="course-tab-inner">
        <!-- 學習 tab -->
        <div
            class="tab-btn left"
            :class="{ active: currentTab === 'learning' }"
            @click="changeTab('learning')"
        >
          <img src="../assets/images/class_learn.png" alt="総合コース" />
          <span>総合コース</span>
        </div>

        <!-- divider -->
        <div class="divider"></div>

        <!-- 會話 tab -->
        <div
            class="tab-btn right"
            :class="{ active: currentTab === 'conversation' }"
            @click="changeTab('conversation')"
        >
          <img src="../assets/images/class_speak.png" alt="会話コース" />
          <span>会話コース</span>
        </div>

        <!-- active line -->
        <div class="active-line" :class="currentTab"></div>
      </div>
    </div>


    <div class="course-book" :class="currentTab">
        <h2 v-if="currentTab === 'learning'">総合コース教材一覧</h2>
        <h2 v-else>会話コース教材一覧</h2>
        <p v-if="currentTab === 'learning'">文法/会話/ビジネス/HSK等</p>
        <p v-else>中国語で考え中国語で伝える教材</p>
    </div>

    <section class="contentsWrap textbookPage">
      <ul class="select_Text">
        <a
            v-for="(course, index) in course_list"
            :key="course.course.id"
            @click="handleClickCourse(index, course.course.id)"
        >
          <li
              :class="[
        selected_index == index ? 'selected' : '',
        isDisabled(course.course.id) ? 'disabled' : ''
      ]"
              v-if="course.course"
          >
            {{ course.course.name }}
            <span class="name_cn">{{ course.course.name_cn }}</span>
          </li>
        </a>
      </ul>

<!--      <div class="bookSection">-->
<!--        <div class="bookTitle" v-if="course_list.length">{{course_list[selected_index]['course']['name']}}</div>-->
<!--        <p class="jp-text">文法や言葉の用法など全般的な文法基礎を学びます。予習動画も利用できます。</p>-->
<!--        <p class="cn-text">提供系统的语法知识体系，让学习者全面了解中文的语法规则。教材提供预习视频。</p>-->
<!--      </div>-->

      <div v-if="course_list[selected_index]" class="textArray" v-for="(category,cindex) in course_list[selected_index].categories">
        <nuxt-link :to="`/textbookList?category=${category.id}&tab=${currentTab}`" class="textLink">
          <div class="textSubtitle">
<!--            <span class="tagL" v-if="category.learn_type === 0">学習</span>-->
<!--            <span class="tagS" v-else>会話</span>-->
            <h3>{{category.name}}</h3>
            <p class="total">{{category.tnum}}課</p>
          </div>
        </nuxt-link>
        <nuxt-link :to="`/textbookList?category=${category.id}&tab=${currentTab}`">
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

const currentTab = ref(route.query.learn_type === '1' ? 'conversation' : 'learning');

function changeTab(tab) {
  currentTab.value = tab;
  if (tab === 'learning') {
    selected_index.value = 0;
  }
  if (tab === 'conversation') {
    // 找出 courseId == 7 的 index
    const indexForCourseId7 = course_list.value.findIndex(course => course.course?.id === 7);
    if (indexForCourseId7 !== -1) {
      selected_index.value = indexForCourseId7;
    }
  }
}

const disabledCourseIdsForConversation = [1, 2, 3, 4, 5, 6, 8, 9];

function isDisabled(courseId) {
  if (currentTab.value === 'conversation') {
    return disabledCourseIdsForConversation.includes(courseId);
  }
  return false;
}


function handleClickCourse(index, courseId) {
  if (isDisabled(courseId)) {
    return; // 不可點擊
  }
  changeCourse(index);
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

onMounted(async () => {
  await getCategorys(); // 先抓資料

  if (route.query.learn_type) {
    learnTypeFromQuery.value = route.query.learn_type;
  }
  if (useStore?.studentLoggedIn) {
    learnTypeFromQuery.value = useStore.learn_type;
  }


  if (learnTypeFromQuery.value === 1) {
    changeTab('conversation');
  } else {
    // 預設為 0 或其他值都顯示 learning
    changeTab('learning');
  }
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

/* 學習 / 會話 樣式 */
.learning .active-tag {
  background-color: #E46722;
  color: white;
}

/* 禁用樣式 */
.select_Text li.disabled {
  pointer-events: auto;  /* 保持 hover 可用 */
  cursor: not-allowed;
  background-color: #f0f0f0;
  position: relative;
  color: grey;
}


/* 禁止點擊（用透明遮罩攔截事件） */
.select_Text li.disabled::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: all;
}

/* hover 顯示 learnonly 圖片 */
.select_Text li.disabled:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 24px;
  width: 28px;
  height: 35px;
  background-image: url("../assets/images/learnonly.png");
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 2;
}
</style>
