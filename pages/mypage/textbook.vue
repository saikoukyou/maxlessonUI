<template>
  <div :class="currentTab">
    <div v-if="useStore?.learn_type === 3"></div>
    <div v-else>
      <!-- tab 區塊 -->
      <div class="course-book">
        <h2>教材一覧</h2>
      </div>
      <section class="contentsWrap">
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
            </li>
          </a>
        </ul>

        <br>

        <div v-if="course_list[selected_index]" class="textArray" v-for="(category,cindex) in course_list[selected_index].categories">
          <nuxt-link :to="`/mypage/textbookList?category=${category.id}`" class="textLink">
            <div class="textSubtitle">
              <!--            <span class="tagL" v-if="category.learn_type === 0">学習</span>-->
              <!--            <span class="tagS" v-else>会話</span>-->
              <h3>{{category.name}}</h3>
              <p class="total">{{category.tnum}}課</p>
            </div>
          </nuxt-link>
          <nuxt-link :to="`/mypage/textbookList?category=${category.id}`">
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





const currentTab = ref('learning'); // 預設學習 tab
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

  const learnTypeFromQuery = useStore.learn_type;

  if (learnTypeFromQuery === 1) {
    changeTab('conversation');
  } else {
    // 預設為 0 或其他值都顯示 learning
    changeTab('learning');
  }
});


</script>

<style scoped>

.course-tab-inner{
  width: 100%;
}
.tab-btn{
  width: 50%;
}
.active-line{
  width: 50%;
}

.active-line.conversation {
  transform: translateX(calc(430px)); /* 567 + divider 1px */
  background-color: #30A186;
}
.textbookBG{
  border-radius: 8px;
  background-color: white;
}
.course-book h2{
  margin: 40px auto 20px auto;
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
  background-color: var(--pink-dark);
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
  left: 8px;
  width: 28px;
  height: 35px;
  background-image: url("../../assets/images/learnonly.png");
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 2;
}
.contentsWrap{
  width: 100%;
}

@media screen and (max-width: 520px) {
  /* 讓 active tab 對應移動 */
  .active-line.learning {
    transform: translateX(0%);
  }
  .active-line.conversation {
    transform: translateX(100%);
  }
  .course-tab{
    padding: 0;
  }
  .textbookBG{
    width: 90%;
    margin: 3% auto;
  }
  .select_Text{
    border: 1px solid #DDDDDD;
  }
}
</style>
