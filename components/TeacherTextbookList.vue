<template>
  <div v-if="courseShow">
    <section class="contentsWrap">
      <div class="textBookT">BizCHINA教材一覧</div>
      <ul class="select_Text">
        <a @click="changeCourse(index)" v-for="(course,index) in course_list">
          <li :class="selected_index == index ? 'selected' : ''" v-if="course.course">{{course.course.name}}
            <span class="name_cn">{{course.course.name_cn}}</span>
          </li>
        </a>
      </ul>

      <div class="bookTitle" v-if="course_list.length">{{course_list[selected_index]['course']['name']}}</div>

      <div v-if="course_list[selected_index]" class="textArray" v-for="(category,cindex) in course_list[selected_index].categories">
        <a @click="changeCategory(category.id)" class="textLink">
          <div class="textSubtitle">
            <span class="tagL" v-if="category.learn_type === 0">総合</span>
            <span class="tagS" v-else>会话</span>
            <h3>{{category.name}}</h3>
            <p class="total">{{category.tnum}}課</p>
          </div>
        </a>
        <a @click="changeCategory(category.id)">
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
        </a>
      </div>


    </section>
  </div>
  <div v-else class="main-font-family">
    <div class="FVspaceContents"></div>
<!--    <section class="contentsHeader">-->
<!--      <h2 title="WEB TEXT"><img src="~/assets/SVG/titleBefore.svg" alt="" class="titleBefore"> ウェブ教材</h2>-->
<!--    </section>-->

    <section class="contentsWrap textbookPage">
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
        <div v-if="categoryInfo.learn_type == 0 && props.learnType == 1">
            <span v-if="textbook.status == 1 && textbook.show == 1">
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
                <li v-if="textbook.pdf_1"><a @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student',textbook.title)">PDF</a></li>
              </ul>
<!--              <div class="buttonArrowGreen">-->
<!--                <a v-if="textbook.zip_student" :href="textbook.zip_student" target="_blank"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              </div>-->
<!--              <button v-if="textbook.zip_student" @click="shareLink(textbook.title,textbook.zip_student,'student')">分享教材给学生</button>-->
<!--              <button v-if="textbook.pdf_1" @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student')">分享pdf教材给学生</button>-->
            </span>
          <span class="lstudentonly" v-else>学習会員限定</span>
        </div>
        <div v-else>
          <div v-if="textbook.class_status == 2">
            <ul class="thirdList thirdList-other">
              <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
              <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
              <li v-if="textbook.pdf_2"><a @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student',textbook.title)">PDF</a></li>
              <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              <li><span class="unopenSpan" style="position: static;">受講済み</span></li>
            </ul>
<!--            <div class="buttonArrowGreen">-->
<!--              <a v-if="textbook.zip_teacher" href="#" @click="openLink(textbook.zip_teacher)"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt="" /></a>-->
<!--            </div>-->
<!--            <button v-if="textbook.zip_student" @click="shareLink(textbook.title,textbook.zip_student,'student')">分享教材给学生</button>-->
<!--            <button v-if="textbook.pdf_1" @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student')">分享pdf教材给学生</button>-->
          </div>
          <div v-else-if="textbook.class_status == 1">
<!--            已公开-->
            <ul class="thirdList thirdList-other">
              <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
              <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
              <li v-if="textbook.pdf_2"><a @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student',textbook.title)">PDF</a></li>
              <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
            </ul>
<!--            <div class="buttonArrowGreen">-->
<!--              <a v-if="textbook.zip_teacher" href="#" @click="openLink(textbook.zip_teacher)"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--              <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt="" /></a>-->
<!--            </div>-->
<!--            <button v-if="textbook.zip_student" @click="shareLink(textbook.title,textbook.zip_student,'student')">分享教材给学生</button>-->
<!--            <button v-if="textbook.pdf_1" @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student')">分享pdf教材给学生</button>-->
          </div>
          <div v-else>
            <div v-if="textbook.status == 1 && textbook.show == 1">
              <ul class="thirdList thirdList-other">
                <li v-if="textbook.audio_1"><a :href="textbook.audio_1" target="_blank">音声</a></li>
                <li v-if="textbook.video_1"><nuxt-link :to="'/textbookVideo?video='+textbook.video_1" target="_blank">ビデオ</nuxt-link></li>
                <li v-if="textbook.pdf_2"><a @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student',textbook.title)">PDF</a></li>
                <li v-if="textbook.video_5"><a :href="textbook.video_5" target="_blank">Link</a></li>
              </ul>
<!--              <div class="buttonArrowGreen">-->
<!--                <a v-if="textbook.zip_teacher" href="#" @click="openLink(textbook.zip_teacher)"><img src="~/assets/SVG/buttonArrowGreen.svg" alt=""></a>-->
<!--                <a v-else href="#"><img src="~/assets/SVG/buttonArrowGreen.svg" alt="" /></a>-->
<!--              </div>-->
<!--              <button v-if="textbook.zip_student" @click="shareLink(textbook.title,textbook.zip_student,'student')">分享教材给学生</button>-->
<!--              <button v-if="textbook.pdf_1" @click="shareLink(textbook.pdf_1,textbook.pdf_2,'student')">分享pdf教材给学生</button>-->
            </div>
            <div v-else>
              <span class="unopenSpan">未公開</span>
              <span class="openWord" v-if="textbook.text">{{textbook.text}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <a @click="courseShow=true;" ><div class="textBack">教材一覧へ</div></a>
    <div style="height: 80px;"></div>
  </div>

</template>

<script setup>
import {useHomeCategoryListDataApi, useTextbookListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {createDiscreteApi} from "naive-ui";

const props = defineProps({
  // category: {
  //   type: [String],
  //   default: ''
  // },
  learnType: {
    type: [String],
    default: ''
  },
  sid: {
    type: [Number],
    default: 0
  },
})

let categoryInfo = ref({});
let textbookList = ref([]);
let level_map_list = ref([]);
let tag_level_arr = ref([]);
let route = useRoute();
const { dialog } = createDiscreteApi(["dialog"]);
let selected_index = ref(0);
let course_list = ref([]);
let category_id = ref(0);
let courseShow = ref(true);

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

function changeCategory(id) {
  category_id.value = id;
  getTextbookList();
}

const getTextbookList = async() => {
  const { data: info} = await useTextbookListDataApi(category_id.value,props?.sid);
  if (info?.value) {
    categoryInfo.value = info?.value?.categoryInfo ?? {};
    textbookList.value = info?.value?.textbooks ?? [];
    level_map_list.value = info?.value.tag_level_maps ?? [];
    courseShow.value = false;
    if (info?.value?.categoryInfo?.tag_level) {
      tag_level_arr.value = info?.value?.categoryInfo?.tag_level.split(',');
      console.log('tag_level_arr.value:'+JSON.stringify(tag_level_arr.value));
    }
  }
}


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

const emit = defineEmits(['shareLink']);
const shareLink = (url1,url2,type,text) => {
  emit('shareLink',url1,url2,text);
  // emit('shareLink','<a href="#" style="color:blue;" onclick="clickLink(\''+url+'\',\''+type+'\')">'+title+'</a>');
}

const openLink = (url) => {
  console.log('teacheropenLink:'+url);
  emit('openLink',url);
}

</script>
<style scoped>
.textBookT{
  margin-bottom: 32px;
}
.openWord{
  margin: 3px 0 0 32px;
  font-size: 12px;
  display: block;
}
.textbookPage{
  padding: 32px 0;
}
.textbook_container a{
  cursor: pointer;
}
.textArray{
  border: 1px solid #f4f4f4;
}
.textbook_container{
  border: 1px solid #E7E7E7;
  cursor: pointer;
}
.unopenSpan{right: 80px !important;}
.openBtn{right: 30px !important;}

.textArray{
  cursor: pointer;
}
.textbook_container{
  cursor: auto;
}
.textArray .textDetails ul li{
  width: fit-content;
  margin-right: 8px;
  font-size: 11px;
}
.textArray .textDetails::after{
  top: 50px;
}
.contentsWrap{
  width: 100%;
}
.main-font-family {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.textbook_container {
  min-height: 80px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E7E7E7;
  border-left: 11px solid var(--pink-dark);
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
}
.firstList>.textbook-num {
  font-size: 20px;
  color:#929292;
  letter-spacing: 0;
}
.textbook-title {
  font-size: 17px;
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
}

.tag-active{
  color:white;
  background-color: rgb(228, 103, 34);
}

.textbookBG{
  background-color: #F9F9F9; padding-bottom: 30px;
}

.unopenSpan{
  background-color: #ABABAB; color: #FFFFFF;
  font-size: 12px; padding: 6px 8px 3px 8px; font-weight: bold;
  position: absolute;
  top: 32px;
  right: 150px;
}
.openBtn{
  background-color: var(--pink-dark); color: #FFFFFF; font-size: 12px; padding: 6px 8px 3px 8px; font-weight: bold;
  position: absolute;
  top: 32px;
  right: 100px;
}


@media screen and (max-width: 520px) {
  .textbookPage{
    padding: 0;
  }
  .unopenSpan{
    background-color: #ABABAB; color: #FFFFFF;
    font-size: 12px; padding: 6px 8px 3px 8px;
    font-weight: bold;
    position: absolute;
    top: 32px;
    right: 24px !important;
  }
  .openBtn{
    background-color: var(--pink-dark); color: #FFFFFF;
    font-size: 12px; padding: 6px 8px 3px 8px;
    font-weight: bold;
    position: absolute;
    top: 32px;
    right: 100px;
  }
  .firstList-padding-left{
    padding-left: 1em;
    width: 70%;
  }
  .textbook-title{
    width: fit-content;
  }
  .textBack{
    margin-top: 20px;
  }
  .roadmap_container .firstList li{
    width: 100%;
    text-align: left;
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
    right: 10px;
    padding: 6px;
  }
  .textArray .textDetails::after{
    display: none;
  }
  .select_Text {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 一列5個 */
    grid-template-rows: repeat(2, auto);   /* 兩列 */
    overflow: visible; /* 不需要 scroll 了 */
  }
  .select_Text li{
    font-size: 13px;
    line-height: normal;
    padding:2px 0 16px 0;
  }

  .thirdList-other{
    right: 20px;
    padding: 6px;
    top: auto;
    position: relative;
  }
  .headline-des{
    margin-top: 6px;
  }
  .textbook-tag-div{
    text-align: left;
  }
  .textArray .textDetails::after{
    display: none;
  }
  .thirdList li a{
    display: ruby-text;
  }
  .roadmap_container .thirdList{
    display: block;
    margin-left: 77%;
    margin-top: -15%;
  }
  .thirdList li{
    border: 0;
    height: auto;
  }
  .openWord{
    margin-left: 5%;
    font-size: 12px;
    display: block;
    text-align: left;
  }
}

</style>