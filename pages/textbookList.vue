<template>
  <div class="page-wrapper topTemplate">
  <div class="main-font-family textbookBG">
    <section class="PlanPrice">
      <div class="PlanPrice__inner">
        <div class="subPosition">
          <span class="subTitle">{{courseName}}</span>
        </div>
      </div>
    </section>

    <section class="contentsWrap textbookPage">
      <div>
        <p class="headline">{{ categoryInfo.name }}
          <span class="class_len">{{ textbookList.length }}課</span>
          <span class="class_ex">{{ categoryInfo.explanation }}</span>
        </p>
      </div>

      <div class="category-button-list">
        <nuxt-link
            v-for="category in categories"
            :key="category.id"
            :to="`/textbookList?category=${category.id}`"
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

        <div v-if="logged">
          <div v-if="categoryInfo.learn_type == 0 && learnType == 1">
            <span v-if="textbook.status == 1 && textbook.show == 1">
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.video_1">
                <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                  <img src="../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                  さくっと動画
                </a>
              </li>
                <li v-if="textbook.pdf_1"><a :href="textbook.pdf_1" target="_blank">教材</a></li>
                <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              </ul>
<!--              <div class="buttonArrowGreen">-->
<!--                <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              </div>-->
            </span>
            <span class="lstudentonly" v-else>学習会員限定</span>
          </div>
          <div v-else>
            <div v-if="textbook.class_status == 2">
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.video_1">
                  <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                    <img src="../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                    さくっと動画
                  </a>
                </li>
                <li v-if="textbook.pdf_1"><a :href="textbook.pdf_1" target="_blank">教材</a></li>
                <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              </ul>
<!--              <div class="buttonArrowGreen">-->
<!--                <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              </div>-->
              <span class="unopenSpan">
              受講済み
            </span>
            </div>
            <div v-else-if="textbook.class_status == 1">
              <!--            已公开-->
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.video_1">
                  <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                    <img src="../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                    さくっと動画
                  </a>
                </li>
                <li v-if="textbook.pdf_1"><a :href="textbook.pdf_1" target="_blank">教材</a></li>
                <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              </ul>
<!--              <div class="buttonArrowGreen">-->
<!--                <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              </div>-->
            </div>
            <div v-else>
              <div v-if="textbook.status == 1 && textbook.show == 1">
                <ul class="thirdList thirdList-other">
                  <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                  <li v-if="textbook.video_1">
                    <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                      <img src="../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                      さくっと動画
                    </a>
                  </li>
                  <li v-if="textbook.pdf_1"><a :href="textbook.pdf_1" target="_blank">教材</a></li>
                  <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
                </ul>
<!--                <div class="buttonArrowGreen">-->
<!--                  <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                  <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                </div>-->
              </div>
              <div style="text-align: left;" v-else>
                <span class="unopenSpan">未公開</span>
<!--                <span class="openword" v-if="textbook.text">{{textbook.text}}</span>-->
                <a href="#" @click="openTextBook(textbook.id,textbook.sort)"><span class="openBtn">教材を表示させる</span></a>
                <!--            未公开-->
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="textbook.show == 1">
            <ul class="thirdList thirdList-other">
              <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
              <li v-if="textbook.video_1">
                <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                  <img src="../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                  さくっと動画
                </a>
              </li>
              <li v-if="textbook.pdf_1"><a :href="textbook.pdf_1" target="_blank">教材</a></li>
              <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
            </ul>
<!--            <div class="buttonArrowGreen">-->
<!--              <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--            </div>-->
          </div>
          <div class="memberonly" v-else @click="showDialog">
            <img src="../assets/images/lock.png" width="10"> 会員限定
          </div>
        </div>

      </div>
    </section>

    <NuxtLink to="/textbook">
      <div class="textBack">教材一覧に戻る</div>
    </NuxtLink>

  </div>
  </div>


  <n-modal
      v-model:show="showYoutubeModal"
      preset="card"
      :closable="true"
      :mask-closable="true"
      :on-after-leave="resetYoutube"
      :style="{ width: '900px' }"
  >
    <div class="modal-video-wrapper">
      <iframe
          v-if="youtubeUrl"
          :src="youtubeUrl"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
      ></iframe>
    </div>
  </n-modal>

</template>


<script setup>
import { useRoute, navigateTo } from "#app";
import {createDiscreteApi} from "naive-ui";
import { useMainStore } from "~/composables/store";
import { useTextbookListDataApi, useHomeCategoryListDataApi } from "~/apis/textbook";
import { useStudentOpenTextbookApi } from "~/apis/student";

const route = useRoute();
const { dialog, message } = createDiscreteApi(['dialog', 'message']);
const useStore = useMainStore();

let courseName = ref('');
let categoryInfo = ref({});
let textbookList = ref([]);
let level_map_list = ref({});
let categories = ref([]);

const logged = useStore?.studentLoggedIn;
const user = useStore?.studentInfo;
const learnType = useStore?.learn_type;


// Lightbox 狀態
const showYoutubeModal = ref(false);
const youtubeUrl = ref('');

const openYoutubeModal = (textbook) => {
  if (textbook?.video_1) {
    const youtubeId = extractYoutubeId(textbook.video_1);
    youtubeUrl.value = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    showYoutubeModal.value = true;
  }
};

const resetYoutube = () => {
  youtubeUrl.value = '';
};

const extractYoutubeId = (url) => {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
};



const getTagLevelIndexes = (tagLevel) => {
  if (!tagLevel) return [];
  if (Array.isArray(tagLevel)) return tagLevel.map(i => String(i));
  if (typeof tagLevel === 'string') return tagLevel.split(',').map(i => i.trim());
  return [];
};

const getTextbookList = async (categoryId) => {
  const { data: info } = await useTextbookListDataApi(categoryId);
  if (info?.value) {
    console.log('📦 API 回傳資料:', info.value);
    categoryInfo.value = info.value.categoryInfo ?? {};
    textbookList.value = info.value.textbooks ?? [];
    level_map_list.value = info.value.tag_level_maps ?? {};
    await fetchCategoriesFromCourse(info.value.categoryInfo.id);
  }
};


// ✅ 取全部課程（依你 API 調整：不帶參數 / 帶 0 或 null）
const fetchCategoriesFromCourse = async (currentCategoryId) => {
  const { data: res } = await useHomeCategoryListDataApi(); // <= 不帶參數版
  if (res?.value?.courses?.length) {
    for (const course of res.value.courses) {
      const match = course.categories?.find(cat => cat.id == currentCategoryId);
      if (match) {
        categories.value = course.categories ?? [];
        courseName.value = course.course?.name ?? '';
        break;
      }
    }
  }
};

const openTextBook = async (textbook_id, sort) => {
  const { data: info } = await useStudentOpenTextbookApi({
    id: user?.id ?? 0,
    tid: textbook_id,
    sort: sort
  });
  if (info?.value && info?.value.err === false) {
    const { message } = createDiscreteApi(["message"]);
    message.success(info?.value?.err_msg);
    if (route?.query?.category) getTextbookList(route.query.category);
  }
};

const showDialog = () => {
  dialog.warning({
    title: "この教材は会員限定です。",
    content: "この教材を閲覧するには正式な会員になる必要があります。",
    positiveText: "料金プランへ",
    negativeText: "閉じる",
    onPositiveClick: async () => {
      navigateTo('/plan');
    },
  });
};

watch(
    () => route.query.category,
    (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) getTextbookList(newVal);
    },
    { immediate: true }
);
</script>


<style scoped>
  .main-font-family {
    font-family: 'Microsoft YaHei', Arial, sans-serif;
  }
  .textbook_container {
    min-height: 80px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #E7E7E7;
    border-left: 11px solid #14A6B3;
    padding: 20px 0;
    position: relative;
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
    right: 20px;
    top: 30px;
    border-radius: 8px;
    padding: 8px;
    width: fit-content;
  }


  .textbookBG{
    padding-bottom: 30px;
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

  .memberonly img{
    display: inline-block;
    width: 9px;
    margin-bottom: 2px;
  }
  .headline{
    margin-top: 20px;
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
    .memberonly{
      position: absolute;
      right: 3%;
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
    .openBtn{
      background-color: #14A6B3; color: #FFFFFF;
      font-size: 12px; padding: 6px 8px 3px 8px;
      font-weight: bold;
      position: absolute;
      top: 32px;
      right: 16px;
    }
  }

</style>