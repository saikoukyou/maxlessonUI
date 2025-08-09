<template>
  <div class="main-font-family">

    <div class="textBookT">{{ courseName }}</div>
    <section class="contentsWrap textbookPage pageW">
      <div style="display: flex;">
        <p class="headline">
          {{categoryInfo.name}}
        </p>
      </div>

      <div class="headline-des">{{categoryInfo.explanation}}</div>

      <div class="category-button-list">
        <nuxt-link
            v-for="category in categories"
            :key="category.id"
            :to="{
      path: route.path,
      query: { category: category.id, sid: route.query.sid }
    }"
            class="category-button"
            :class="{ active: route.query.category == category.id.toString() }"
        >
          <div class="category-tags">
      <span
          class="tag-badge"
          :class="{ active: route.query.category == category.id.toString() }"
          v-for="tagId in getTagLevelIndexes(category.tag_level)"
          :key="tagId"
      >
        {{ level_map_list[tagId] }}
      </span>
          </div>
          <div class="category-name">{{ category.name }}</div>
        </nuxt-link>
      </div>



      <div class="roadmap_container textbook_container" v-for="(textbook,tindex) in textbookList">
        <ul class="firstList firstList-padding-left">
          <li class="textbook-name">第{{tindex+1}}課<span class="separateline">｜</span><p class="textbook-title">{{textbook.title}}</p></li>
          <li class="textbook-num">教材番号：{{textbook.id}}</li>
        </ul>

        <div>
          <div v-if="textbook.class_status == 2">
            <ul class="thirdList thirdList-other">
              <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
              <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
              <li v-if="textbook.pdf_2"><a :href="textbook.pdf_2" @click="upTextbookCount()" target="_blank">PDF</a></li>
              <li v-if="textbook.pdf_2_backup"><a :href="textbook.pdf_2_backup" @click="upTextbookCount()" target="_blank">PDF(备用)</a></li>
              <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
            </ul>
<!--            <div class="buttonArrowGreen">-->
<!--              <a v-if="textbook.zip_teacher" :href="textbook.zip_teacher" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt="" /></a>-->
<!--            </div>-->
            <span class="unopenSpan">
              授講済み
            </span>
          </div>
          <div v-else-if="textbook.class_status == 1">
<!--            已公开-->
            <ul class="thirdList thirdList-other">
              <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
              <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
              <li v-if="textbook.pdf_2"><a :href="textbook.pdf_2" @click="upTextbookCount()" target="_blank">PDF</a></li>
              <li v-if="textbook.pdf_2_backup"><a :href="textbook.pdf_2_backup" @click="upTextbookCount()" target="_blank">PDF(备用)</a></li>
              <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
            </ul>
<!--            <div class="buttonArrowGreen">-->
<!--              <a v-if="textbook.zip_teacher" :href="textbook.zip_teacher" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt="" /></a>-->
<!--            </div>-->
          </div>
          <div v-else>
            <div v-if="textbook.status == 1 && textbook.show == 1">
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
                <li v-if="textbook.pdf_2"><a :href="textbook.pdf_2" @click="upTextbookCount()" target="_blank">PDF</a></li>
                <li v-if="textbook.pdf_2_backup"><a :href="textbook.pdf_2_backup" @click="upTextbookCount()" target="_blank">PDF(备用)</a></li>
                <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              </ul>
<!--              <div class="buttonArrowGreen">-->
<!--                <a v-if="textbook.zip_teacher" :href="textbook.zip_teacher" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt="" /></a>-->
<!--              </div>-->
            </div>
            <div v-else>
              <span class="unopenSpan">未公開</span>
<!--              <span class="openword" v-if="textbook.text">{{textbook.text}}</span>-->
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="HelpBackBtn" @click="goBack">教材一覧へ</div>
  </div>

</template>

<script setup>
import { useTextbookListDataApi } from "~/apis/textbook";
import {createDiscreteApi} from "naive-ui";
import { useHomeCategoryListDataApi } from '~/apis/textbook'; // ← 確保你有引入
import { ref, onMounted, watch } from 'vue';
import {useTeacherOpenTextbookNumApi} from "~/apis/teacher";

let categoryInfo = ref({});
let textbookList = ref([]);
let level_map_list = ref([]);
let route = useRoute();
const { dialog } = createDiscreteApi(["dialog"])
const router = useRouter();
let courseName = ref('');
let categories = ref([]);

const getTagLevelIndexes = (tagLevel) => {
  if (!tagLevel) return [];
  if (Array.isArray(tagLevel)) return tagLevel.map(i => String(i));
  if (typeof tagLevel === 'string') return tagLevel.split(',').map(i => i.trim());
  return [];
};


const getTextbookList = async (category, sid) => {
  const { data: info } = await useTextbookListDataApi(category, sid);
  if (info?.value) {
    categoryInfo.value = info?.value?.categoryInfo ?? {};
    textbookList.value = info?.value?.textbooks ?? [];
    level_map_list.value = info?.value.tag_level_maps ?? [];

    await fetchCategoriesFromCourse(info.value.categoryInfo.id);
  }
};

const fetchCategoriesFromCourse = async (currentCategoryId) => {
  const { data: res } = await useHomeCategoryListDataApi(7); // 7 是你固定的課程 group id？
  if (res?.value?.courses?.length) {
    for (let course of res.value.courses) {
      const match = course.categories?.find(cat => cat.id == currentCategoryId);
      if (match) {
        categories.value = course.categories ?? [];
        courseName.value = course.course?.name ?? '';
        break;
      }
    }
  }
};

onMounted(() => {
  if (route && route?.query?.category) {
    // console.log('category:'+route?.query?.category);
    getTextbookList(route?.query?.category,route?.query?.sid);
  }
})

watch(
    () => route.query.category,
    (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        getTextbookList(newVal, route.query.sid);
      }
    },
    { immediate: true }
);


const showDialog = () => {
  dialog.warning({
    title: "この教材は会員限定です。",
    content: "この教材を閲覧するには正式な会員になる必要があります。",
    positiveText: "料金プランへ",
    negativeText: "もう少し考えてみて",
    onPositiveClick: async () => {
      navigateTo('/plan');
    },
  })
}
// 返回上一页功能
function goBack() {
  if (document.referrer && !document.referrer.includes(location.pathname)) {
    router.back();
  } else {
    router.push('/teacher/center/textbook');
  }
}

async function upTextbookCount() {
  const {data  } = await useTeacherOpenTextbookNumApi();
}


</script>

<style scoped>
.main-font-family {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.textbook_container {
  min-height: 80px;
  background-color: #FFFFFF;
  border-top: 1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  border-bottom: 0;
  border-left: 11px solid #EF6D20;
  padding: 20px 0;
  position: relative;
}
.textbook_container:last-of-type {
  border-bottom: 1px solid #E7E7E7;
}


.firstList-padding-left {
  padding-left: 2rem;
}
.firstList>.textbook-name {
  font-size: 15px;
  font-weight: bolder;
  letter-spacing: 0;
  text-align: left;
}
.firstList>.textbook-num {
  font-size: 20px;
  color:#929292;
  letter-spacing: 0;
  text-align: left;
}
.textbook-title {
  font-size: 17px;
  font-weight:bold;
  justify-content: center;
  display: inline-block;
  line-height: normal;
}
.thirdList-other {
  font-size: 12px;
  font-weight: bold;
  color:#929292;
  position: absolute;
  vertical-align: center;
  right: 10px;
  top: 30px;
  border-radius: 8px;
  padding: 8px;
  width: fit-content;
}
.buttonArrowGreen>img {
  height: 50px;
  width: 50px;
}

.textbookBG{
  background-color: #F9F9F9; padding-bottom: 30px;
}


.unopenSpan{
  background-color: #BBBBBB;
  color: #FFFFFF;
  font-size: 9px;
  padding: 2px 12px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 32px;
}
.openBtn{
  background-color: #EF6D20; color: #FFFFFF; font-size: 12px; padding: 6px 8px 3px 8px; font-weight: bold;
  position: absolute;
  top: 32px;
  right: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.openword{
  margin: 2px 0 0 32px;
  font-size: 12px;
  color: #BBBBBB;
}

.memberonly{
  background: linear-gradient(90deg, #F9A43E 0%, #F87C25 100%);
  color: #FFFFFF;
  width: fit-content;
  position: absolute;
  right: 40px;
  top: 30px;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.headline{
  margin-bottom: 16px;
}

@media screen and (max-width: 520px) {
  .firstList-padding-left{
    padding-left: 1rem;
  }
  .roadmap_container .firstList li{
    width: 78%;
  }
  .unopenSpan{
    top: 22px;
    right: 10px;
  }
  .openBtn{
    top: 48px;
    right: 10px;
  }
  .thirdList-other{
    right: 0;
    padding: 6px;
  }
  .memberonly{
    position: absolute;
    right: 3%;
  }
  .buttonArrowGreen{
    right: 16px;
  }

  .unopenSpan{
    width: fit-content;
    background-color: #ABABAB;
    color: #FFFFFF;
    font-size: 9px;
    padding: 3px 6px 0 6px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    left: 15px;
  }
  .openword{
    margin-left: 16px;
  }
  .openBtn{
    background-color: #EF6D20; color: #FFFFFF;
    font-size: 12px; padding: 6px 8px 3px 8px;
    font-weight: bold;
    position: absolute;
    top: 32px;
    right: 16px;
  }
}

</style>