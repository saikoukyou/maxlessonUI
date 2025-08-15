<template>
  <div class="main-font-family">
    <div class="FVspaceContents"></div>
<!--    <section class="contentsHeader">-->
<!--      <h2 title="WEB TEXT"><img src="~/assets/SVG/titleBefore.svg" alt="" class="titleBefore"> ウェブ教材</h2>-->
<!--    </section>-->
    <div class="textBookT">法人教材一覧(66段)</div>
    <section class="contentsWrap_my textbookPage pageW">
      <div style="display: flex;">
        <p class="headline">
          {{categoryInfo.name}}
        </p>
      </div>

      <div class="headline-des">{{categoryInfo.explanation}}</div>

      <div class="textbook-tag-div">
        <ul>
          <li class="textbook-tag-div-content" v-for="(tag,tindex) in level_map_list" :class="tag_level_arr.includes(tindex) ? 'tag-active' : ''">{{tag}}</li>
        </ul>
      </div>

      <div class="roadmap_container textbook_container" v-for="(textbook,tindex) in textbookList">
        <ul class="firstList firstList-padding-left">
          <li class="textbook-name">第{{tindex+1}}課<span class="separateline">｜</span><p class="textbook-title">{{textbook.title}}</p></li>
          <li class="textbook-num">教材番号：{{textbook.id}}</li>
        </ul>

        <div v-if="logged">
          <div v-if="categoryInfo.learn_type == 0 && useStore?.learn_type == 1">
            <span v-if="textbook.status == 1 && textbook.show == 1">
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.video_1">
                <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                  <img src="../../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                  さくっと動画
                </a>
              </li>
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
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

                <li v-if="textbook.video_1">
                  <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                    <img src="../../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                    さくっと動画
                  </a>
                </li>
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
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
            <div v-else>
              <!--            已公开-->
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.video_1">
                  <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                    <img src="../../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                    さくっと動画
                  </a>
                </li>
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.pdf_1"><a :href="textbook.pdf_1" target="_blank">教材</a></li>
                <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              </ul>
<!--              <div class="buttonArrowGreen">-->
<!--                <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              </div>-->
            </div>
          </div>
        </div>
        <div v-else>
          <ul class="thirdList thirdList-other">
            <li v-if="textbook.video_1">
              <a href="javascript:void(0)" class="video-btn" @click="openYoutubeModal(textbook)">
                <img src="../../assets/images/video-solid.svg" alt="動画" class="video-icon" />
                さくっと動画
              </a>
            </li>
            <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
            <li v-if="textbook.pdf_1"><a :href="textbook.pdf_1" target="_blank">教材</a></li>
            <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
          </ul>
<!--          <div class="buttonArrowGreen">-->
<!--            <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--            <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--          </div>-->
        </div>

      </div>
    </section>

    <div class="textBack" @click="goBack">教材一覧へ</div>

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
import {useTextbookListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {createDiscreteApi, NModal} from "naive-ui";
import {useStudentOpenTextbookApi} from "~/apis/student";
import {useMainStore} from "~/composables/store";
import { useRouter } from 'vue-router';

let categoryInfo = ref({});
let textbookList = ref([]);
let level_map_list = ref([]);
let tag_level_arr = ref([]);
let route = useRoute();
const { dialog } = createDiscreteApi(["dialog"])
const useStore = useMainStore();
let logged = useStore.studentLoggedIn;
const user = useStore.studentInfo;

const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);  // 返回上一页
  } else {
    router.push('/');  // 跳转到首页
  }
}

//light youtube

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

const getTextbookList = async(category) => {
  const { data: info} = await useTextbookListDataApi(category);
  if (info?.value) {
    categoryInfo.value = info?.value?.categoryInfo ?? {};
    textbookList.value = info?.value?.textbooks ?? [];
    level_map_list.value = info?.value.tag_level_maps ?? [];
    if (info?.value?.categoryInfo?.tag_level) {
      tag_level_arr.value = info?.value?.categoryInfo?.tag_level.split(',');
      // console.log('tag_level_arr.value:'+JSON.stringify(tag_level_arr.value));
    }
  }
}

onMounted(() => {
  if (route && route?.query?.category) {
    console.log('category:'+route?.query?.category);
    getTextbookList(route?.query?.category);
  }

})

const showDialog = () => {
  dialog.warning({
    title: "この教材は会員限定です。",
    content: "この教材を閲覧するには正式な会員になる必要があります。",
    positiveText: "料金プランへ",
    negativeText: "閉じる",
    onPositiveClick: async () => {
      navigateTo('/plan');
    },
  })
}

const openTextBook = async (textbook_id,sort) => {
  const { data: info} = await useStudentOpenTextbookApi({
    id: user?.id ?? 0,
    tid: textbook_id,
    sort: sort
  });
  if (info?.value && info?.value.err == false) {
    const { message } = createDiscreteApi(["message"]);
    message.success(info?.value?.err_msg);

    if (route && route?.query?.category) {
      console.log('category:'+route?.query?.category);
      getTextbookList(route?.query?.category);
    }
  }
}

</script>
<style scoped>
.main-font-family {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.textbook_container {
  background-color: #FFFFFF;
  border-top: 1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  border-bottom: 0;
  border-left: 11px solid #FA8373;
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
}
.firstList>.textbook-num {
  font-size: 20px;
  color:#929292;
  letter-spacing: 0;
}
.textbook-title {
  font-weight:bold;
  justify-content: center;
  display: inline-block;
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
.buttonArrowGreen>img {
  height: 50px;
  width: 50px;
}
.buttonArrowGreen{
  right: 24px;
}
.textbook-tag-div {
  padding-left:0;
  margin-bottom: 20px;
}
.textbook-tag-div-content-first {
  display:inline-block;
  width:6rem;
  margin-right:1rem;
  font-weight: bold;
  border:2px solid black;
  padding: 10px 22px;
}
.textbook-tag-div-content {
  padding: 5px 12px;
  background-color: #E6E6E6;
  margin-right: 16px;
  border-radius: 20px;
  font-size: 13px;
  line-height: 13px;
  color: #ACACAC;
  display: inline-block;
  width: fit-content;
  margin-bottom: 10px;
  border: 0;
  cursor: auto;
}

.tag-active{
  color:white;
  background-color: rgb(101, 171, 233);
}

.textbookBG{
  background-color: #F9F9F9; padding-bottom: 30px;
}
.textbook_container{
  padding: 5px 0;
  min-height: 50px;
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
  background-color: #FA8373; color: #FFFFFF; font-size: 12px; padding: 6px 8px 3px 8px; font-weight: bold;
  position: absolute;
  top: 32px;
  right: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.roadmap_container .firstList li{
  width: 100%;
}

.textbook_container:nth-child(3n) {
  margin-bottom: 24px; /* 在 3 的倍數後加間距 */
  border-bottom: 1px solid #E7E7E7;
}
.thirdList-other{
  top: 14px;
}
.buttonArrowGreen{
  top: 16px;
}
.openword{
  margin: 2px 0 0 32px;
  font-size: 12px;
  color: #BBBBBB;
}
.textbook_container{
  border-left:11px solid #65ABE9;
}
.textBack{
  background-color: #65ABE9;;
}
@media screen and (max-width: 520px) {

  .textbook-name{
    font-size: 15px !important;
  }
  .textbook-title{
    font-size: 15px !important;
    margin-left: 0;
  }
  .roadmap_container .firstList li{
    width: 60% !important;
    margin-bottom: 5px;
  }
  .textbook_container{
    min-height: auto;
    padding: 10px 10px 0 10px;
  }
  .textbook-num{
    font-size: 11px !important;
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
    margin-left: 15px;
  }
  .openBtn{
    background-color: #FA8373; color: #FFFFFF;
    font-size: 12px; padding: 6px 8px 3px 8px;
    font-weight: bold;
    position: absolute;
    top: 32px;
    right: 16px;
  }
  .firstList-padding-left{
    padding-left: 0.1em;
  }
  .textbook-title{
    width: fit-content;
    line-height: normal;
  }
  .roadmap_container .firstList li{
    width: 100%;
  }
  .thirdList-other{
    right: 10px;
    padding: 6px;
    transform: scale(0.9);
    top: 0 !important;
  }
  .thirdList li{
    margin: 16px 0 !important;
  }
  .roadmap_container {
    width: 100%;
    min-height: 100px;
  }


}

</style>