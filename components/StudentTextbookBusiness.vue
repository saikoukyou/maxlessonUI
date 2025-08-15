<template>
  <div>
  <div class="FVspaceContents"></div>

  <section class="contentsWrap textbookPage">

    <div class="textBookT">BizCHINA法人教材(66段)</div>

    <div v-if="courseShow">
      <div v-if="category_list?.length" class="textArray" v-for="(category,cindex) in category_list">
        <a @click="changeCategory(category.id)" class="textLink">
          <div class="textSubtitle">
            <span class="tagL" v-if="category.learn_type === 0">総合</span>
            <span v-else>会话</span>
            <h3>{{category.name}}</h3>
            <p class="total">{{category.tnum}}課</p>
          </div>
        </a>
        <a @click="changeCategory(category.id)">
          <div class="textDetails">
            <ul>
              <li v-for="(tag,tindex) in level_map_list" :style="category.tag_level.includes(tindex) ? 'background-color: #479EEA;color:white;' : ''">{{tag}}</li>
            </ul>
            <p>{{category.explanation}}</p>
          </div>
        </a>
      </div>
    </div>
    <div v-else class="main-font-family">
      <section class="contentsWrap_my textbookPage">
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

          <div>
            <div v-if="categoryInfo.learn_type == 0 && useStore?.learn_type == 1">
            <span v-if="textbook.status == 1 && textbook.show == 1">
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
                <li v-if="textbook.pdf_1"><a @click="shareLink(textbook.pdf_1,textbook.pdf_2,'teacher',textbook.title)">PDF</a></li>
                <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              </ul>
            </span>
              <span class="lstudentonly" v-else>学習会員限定</span>
            </div>
            <div v-else>
              <div v-if="textbook.class_status == 2">
                <ul class="thirdList thirdList-other">
                  <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                  <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
                  <li v-if="textbook.pdf_1"><a @click="shareLink(textbook.pdf_1,textbook.pdf_2,'teacher',textbook.title)">PDF</a></li>
                  <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
                  <li><span class="unopenSpan" style="position: static;">受講済み</span></li>
                </ul>
              </div>
              <div v-else>
                <!--            已公开-->
                <ul class="thirdList thirdList-other">
                  <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                  <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
                  <li v-if="textbook.pdf_1"><a @click="shareLink(textbook.pdf_1,textbook.pdf_2,'teacher',textbook.title)">PDF</a></li>
                  <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div class="textBack" @click="courseShow=true;">教材一覧へ</div>

    </div>

  </section class="contentsWrap textbookPage">


  <div style="height: 24vh;"></div>



  </div>
</template>


<script setup>
import { register } from 'swiper/element/bundle';
import {useHomeCategoryListDataApi, useTextbookListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {usePage} from "~/composables/usePage";
import {useMainStore} from "~/composables/store";

// register Swiper custom elements
register();

let category_list = ref([]);
let level_map_list = ref([]);
const useStore = useMainStore();
const user =  useStore.studentInfo;
let categoryInfo = ref({});
let textbookList = ref([]);
let tag_level_arr = ref([]);
let categoryId = ref(0);
let courseShow = ref(true);
let logged = useStore.studentLoggedIn;

const getCategorys = async () => {
  if (user?.business_id) {
    let bid = user?.business_id;
    let {data: courseinfos  } = await useHomeCategoryListDataApi(6,bid);
    if (courseinfos?.value) {
      category_list.value = courseinfos?.value.courses ?? [];
      level_map_list.value = courseinfos?.value.tag_level_maps ?? [];
    }
  }
};

function changeCategory(id) {
  categoryId.value = id;
  getTextbookList();
  courseShow.value = false;
}

const getTextbookList = async() => {
  const { data: info} = await useTextbookListDataApi(categoryId.value);
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

const emit = defineEmits(['shareLink']);
const shareLink = (url1,url2,type,text) => {
  emit('shareLink',url1,url2,text);
}

const openLink = (url) => {
  emit('openLinkStudent',url);
}

onMounted(() => {

  getCategorys();

})

</script>


<style scoped>
.contentsWrap{
  width: 100%;
}
.thirdList li a{
  cursor: pointer;
}
swiper-container::part(button-next),swiper-container::part(button-prev) {
    color: #fff;
}
.teacherImg {
  max-width: 200px;
}

.tag-active{
  color:white;
  background-color: rgb(101, 171, 233);
}

.textArray{
  border: 1px solid #f4f4f4;
  display:grid;
  grid-template-columns:4.7fr 13.5fr !important;
}
.textArray .textDetails ul li{
  font-size: 12px;
}
.textArray .textSubtitle{
  padding: 5% 7% 3% 7%;
}
.textArray .textSubtitle>.total{
  margin: 4px 0;
  font-size: 15px;
}
.contentsWrap h3{
  margin: 6px 0 0 0;
}
.tagL{
  font-size: 12px;
  padding: 2px 6px;
  background-color: #91B6D6;
}
.textArray .textSubtitle{
  background-color: #EAF0F9;
}
.textArray .textSubtitle>.total{
  color: #666666;
}
.tag-active{
  color:white !important;
  background-color: rgb(101, 171, 233) !important;
}
.textArray .textDetails::after{
  background-image:url("../../assets/images/buttonArrowBlue.svg");
}

@media screen and (max-width: 520px) {

  .thirdList li a{
    display: ruby-text;
  }
  .roadmap_container .thirdList{
    display: block;
    margin-left: 75%;
    margin-top: -20%;
    position: relative;
  }
  .thirdList li{
    border: 0;
    height: auto;
  }
  .textbookPage{
    width: 100%;
  }
  .textArray .textLink{
    width: 100%;
  }
  .textArray{
    display: inline-block;
    grid-template-columns: auto;
  }
.textArray .textSubtitle{
  padding-top: 5%;
}

.textArray .textSubtitle>.total {
  text-align: left;
}
.textArray .textLinkAbsolute{
  width: auto;
}

.textArray .textDetails p{
  text-align: left;
  margin-bottom: 30px;
  width: 100%;
}

.textDetails{
  margin-bottom: 20px;
}
}

</style>

<style scoped>
.textBookT{
  margin-bottom: 32px;
}
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
  background-color: #65ABE9;
  margin: 20px auto;
}
@media screen and (max-width: 520px) {
  .textbook-tag-div{
    text-align: left;
  }
  .textbookPage{
    padding: 0;
  }
  .textbook-name{
    font-size: 13px !important;
  }
  .textbook-title{
    font-size: 13px !important;
    margin-left: 0;
  }
  .roadmap_container .firstList li{
    width: 60% !important;
    margin-bottom: 5px;
    text-align: left;
  }
  .textbook_container{
    min-height: auto;
    padding: 10px 10px 20px 10px;
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
    padding-left: 1em;
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
  }


}

</style>