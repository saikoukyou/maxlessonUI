<template>
  <div class="mypageTemplate">

<!--    <div v-if="hasLesson == 0">-->
<!--      <p class="headline">体験の流れ</p>-->
<!--      <ul class="headFlow_navi">-->
<!--        <li>体験プランを決める</li>-->
<!--        <li style="color: #f2762e; font-weight: bold;">レッスン予約</li>-->
<!--        <li>学習をはじめよう</li>-->
<!--      </ul>-->
<!--    </div>-->

    <p class="lessonConfirmAttention">レッスン予約はまだ確定していません。</p>
    <div class="lessonConfirm" v-for="(item, index) in lessons">
      <ul class="date orangeColor">
        <li>{{item.date.md}}<span class="fs18"> ({{item.date.week}})</span></li>
        <li>{{item.date.time_sart}}〜{{item.date.time_end}}</li>
        <li><span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span><span v-else>（UTC+9 日本時間）</span></li>
      </ul>
      <div class="teacherInfo">
        <nuxt-link :to="'/teachers/'+item.info.id">
          <div class="teacherPhoto">
<!--            <div class="cnRibbon"></div>-->
            <span v-if="item.info.learn_type == 0" class="tagL">総合</span>
            <span v-else class="tagS">会話</span>
          <img :src="item.info.face_img5" alt="" class="tphoto">
          </div>
        </nuxt-link>
        <ul>
          <li class="pinyin">{{item.info.name_pinyin}}</li>
          <li class="name">{{ item.info.name_cn }}<span class="teacherID">ID:{{item.info.id}}</span></li>
          <li class="cityT">{{item.info.province_addr}}{{item.info.current_address}}</li>
          <li v-if="item.info.learn_type == 0">
            <span class="sptitle">日本語</span>
            <span class="spdes">{{item.info.japanese_level}}{{teacher_japanese_level[item.info.japanese_level]}}</span>
          </li>
          <li v-else>
            <span class="sptitle">業界の得意分野</span>
            <span class="spdes">{{ item.info.topic_str }}</span></li>
          <li v-if="item.info.learn_type == 0">
            <span class="sptitle">英語</span>
            <span class="spdes">{{item.info.english_level}}{{teacher_english_level[item.info.english_level]}}</span>
          </li>
          <li v-else>
            <span class="sptitle">対応可能な方言</span>
            <span class="spdes">{{ item.info.dialect }}</span></li>

        </ul>
        <p class="favorite" @click="addBookmark(item.info.id,index)">
          <span>
            <img :src="useStore?.studentInfo?.bteachers?.includes(Number(item.info.id)) ? IconHeart : IconHeartNone" alt="" />
            お気に入り</span>
        </p>
        <ul class="teacherLabels">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div>
<!--        <a href="">-->
<!--        <p class="Submit" style="width: 50px;height: 35px;">-->
<!--          <input class="Submit" style="width: 50px;height: 35px;" type="button" @click="deleteLesson(item.info.id,index)" value="削除">-->
<!--        </p>-->
<!--      </a>-->
      </div>
    </div>

<!--    <form action="">-->
    <div class="infoBlock" v-if="useSoftware === 'skype'" >
      <p class="infoNotice">
        <i class="infoIcon"></i>
        5月1日以降のレッスンでは、Skypeをご希望の方は、Teamsを選択し、TeamsIDを入力して予約してください。
        <a target="_blank" class="linkskype" href="https://www.bizchina.jp/blog/info?bid=Njk1">詳細</a>
      </p>
    </div>

    <div class="lessonConfirmContents">
      <p class="ConDes">
        <img src="../../assets/images/webbanner.png">
      </p>
      <div class="form-group">
        <label for="time_select">受講用ソフト</label>
        <select id="time_select" @change="changeSoftwares()" v-model="useSoftware">
          <option :value="skey" v-for="(software, skey) in softwares" data-number="0">
            {{software}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label v-if="useSoftware !== 'web'" for="Keyword">アカウントID</label>
        <span v-if="useSoftware !== 'web'" style="position: relative;">
          <input type="text" name="" v-model="account" id="Keyword" :placeholder="account" :disabled="accountDisabled">
          <button class="editBtn" @click="changeAccount">編集</button>
        </span>

      </div>
    </div>


<!--    <div class="lessonConfirmContents">-->
<!--          <p class="ConDes">予約を確定するため以下の情報を記入ください</p>-->
<!--              受講用ソフト-->
<!--                <select id="time_select" onchange="" v-model="useSoftware">-->
<!--                  <option :value="skey" v-for="(software,skey) in softwares" data-number="0">-->
<!--                    {{software}}</option>-->
<!--                </select>-->
<!--           アカウントID-->
<!--              <input type="text" name="" v-model="account" id="Keyword" placeholder="12345678">-->
<!--      </div>-->

    <div class="ChineseLevel_wrap" v-if="hasLesson === 0">
      <div>
        <p>中国語レベルの自己申告</p>
        <fieldset class="radio-003">
          <label v-for="(tag, tindex) in chinese_level_tag">
            <input type="radio" name="radio-003" @click="changeLevel(tindex)" :value="tindex" :checked="tindex == 1 ? true : false" />
            {{tag}}
          </label>
        </fieldset>
      </div>
<br>
      <div>
        <p>習いたい内容</p>
        <fieldset class="radio-003">
          <label v-for="(course, cindex) in course_ids_tag">
            <input type="checkbox" name="radio-004" v-model="courseChecked" :value="cindex" />
            {{course}}
          </label>
        </fieldset>
      </div>
    </div>

    <div v-else-if="learnType === 0" class="ChineseLevel_wrap">
      <div>
        <p>言い間違いの修正</p>
        <fieldset class="radio-003">
          <label v-for="(tag, tindex) in lessonTag">
            <input type="radio" name="radio-003" @click="changeLesson(tindex)" :value="tindex" :checked="tindex == 2 ? true : false" />
            {{tag}}
          </label>
        </fieldset>
      </div>

      <div>
        <p class="titlePos">言語の比率</p>
        <fieldset class="radio-003">
          <label v-for="(course, cindex) in languageTag">
            <input type="radio" name="radio-004" @click="changeLanguage(cindex)" :value="cindex" :checked="cindex == 2 ? true : false" />
            {{course}}
          </label>
        </fieldset>
      </div>
    </div>

    <div class="conBg">
      <n-button class="Submit" type="submit" @click="submitForm" :loading="loading">
        <span>予約を確定する</span>
      </n-button>
    </div>

<!--    </form>-->


    <div style="height: 50px;"></div>


  </div>
  </template>

<script setup>
import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {
  useDeleteSelectedLessonApi,
  useStudentMonthlyPlanApi,
  useStudentSelectedLessonApi,
  useStudentTicketPlanApi,
  useToCompleteSelectedLessonsApi
} from "~/apis/student";
import {createDiscreteApi, NButton} from "naive-ui";
import {useMainStore} from "~/composables/store";
import {onMounted} from "vue";

// definePageMeta({
// middleware: 'auth',
// layout: 'mypage'
// });
let lessons = ref([]);
let softwares = ref([]);
let useSoftware = ref('');
let account = ref('');
// let chineseLevelTag = ref([]);
// let courseIdsTag = ref([]);
let hasLesson = ref(0);
// let askLesson = ref([]);
// let askLanguage = ref([]);
let chinese_level_tag = ref([]);
let course_ids_tag = ref([]);
let levelChecked = ref(1);
let courseChecked = ref([1]);
let lessonTag = ref([]);
let languageTag = ref([]);
let lessonChecked = ref(1);
let languageChecked = ref(1);
let loading = ref(false);
let teacher_japanese_level = ref([]);
let teacher_english_level = ref([]);
const useStore = useMainStore();
let accounts = ref([]);
let accountDisabled = ref(true);
let learnType = ref(0);

const getReserveLessons =  async () => {
  loading.value = true;
  let { data: info } = await useStudentSelectedLessonApi()
  if (info?.value) {
    loading.value = false;
    lessons.value = info?.value?.lessons ?? [];
    softwares.value = info?.value?.software ?? [];
    accounts.value = info?.value?.accounts ?? [];
    useSoftware.value = info?.value?.default_software;
    hasLesson.value = info?.value?.has_lesson ?? 0;
    account.value = accounts.value[useSoftware.value];
// askLesson.value = info?.value.ask_lesson_tag ?? [];
// askLanguage.value = info?.value.ask_language_tag ?? [];
    learnType.value = Object.values(lessons?.value)[0].info?.learn_type ?? 0;

    if (hasLesson.value == 0) {
      chinese_level_tag.value = info?.value.chinese_level_tag ?? [];
      course_ids_tag.value = info?.value.course_ids_tag ?? [];
    } else {
      lessonTag.value = info?.value.ask_lesson_tag ?? [];
      languageTag.value = info?.value.ask_language_tag ?? [];
    }
    teacher_japanese_level.value = info?.value.japanese_level ?? [];
    teacher_english_level.value = info?.value.english_level ?? [];
  }
}

onMounted(() => {
  getReserveLessons();
})

function changeLevel(index) {
  levelChecked.value = index;
}
function changeCourse(index) {
  courseChecked.value = index;
}
function changeLesson(index) {
  lessonChecked.value = index;
}
function changeLanguage(index) {
  languageChecked.value = index;
}

async function submitForm() {
  if (lessons?.value?.length === 0) {
    const { message } = createDiscreteApi(["message"]);
    message.error('レッスンが選択されていません。');
    // useStore.setActiveUrl("/mypage/lessonTrial");
    // navigateTo('/mypage/lessonTrial',{ replace: true });
    return false;
  }
  if (useSoftware.value !== 'web' && !account?.value) {
    const { message } = createDiscreteApi(["message"]);
    message.error('アカウントIDを空にすることはできません');
    return false;
  }
  if (!useSoftware?.value) {
    const { message } = createDiscreteApi(["message"]);
    message.error('受講用ソフトの選択');
    return false;
  }

  loading.value = true;
  let params = {};
  if (hasLesson.value === 0) {
    params = {
      has_lesson : hasLesson.value,
      chinese_level : levelChecked.value,
      course_ids : courseChecked.value.join(','),
      software : useSoftware.value,
      account: account.value ?? ''
    };
  } else {
    if (learnType.value === 1) {
      lessonChecked.value = '';
      languageChecked.value = ''
    }
    params = {
      has_lesson : hasLesson.value,
      ask_lesson_tag : lessonChecked.value,
      ask_language_tag : languageChecked.value,
      software : useSoftware.value,
      account: account.value
    };
  }

  let { data: result } = await useToCompleteSelectedLessonsApi(params)
  // let { data: result } = await useToCompleteSelectedLessonsApi({
  //   has_lesson : hasLesson.value,
  //   chinese_level : tagChecked.value,
  //   course_ids : courseChecked.value,
  //   software : useSoftware.value,
  //   account: account.value
  // })
  if (result?.value) {
    if (result?.value?.err == false) {
      useStore.useRefreshUserInfo();
      loading.value = false;
      navigateTo(`/mypage/decision-${hasLesson.value}/${result.value.lesson_ids}`);
    } else {
      loading.value = false;
      lessons.value = [];
      const { message } = createDiscreteApi(["message"])
      if (result?.value?.errors) {
        Object.keys(result?.value?.errors).forEach(key=>{
          // console.log('result.value.errors:'+key+JSON.stringify(result?.value?.errors[key]));
          // message.error(result?.value?.errors[key]);
          if (Array.isArray(result?.value?.errors[key])) {
            message.error(result?.value?.errors[key][0]);
          } else {
            message.error(result?.value?.errors[key]);
          }

        })
      } else {
        message.error(result?.value?.err_msg);
      }

    }

  }

}

async function deleteLesson (teacher_id,time) {
  let { data: delres } = await useDeleteSelectedLessonApi(teacher_id+'_'+time);
  if (delres?.value && delres.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.info('削除に成功しました');
    lessons.value.splice(time,1)
    getReserveLessons();
  }
}

function changeSoftwares() {
  // console.log('useSoftware:'+accounts.value[useSoftware.value]);
  account.value = accounts.value[useSoftware.value];
}

function changeAccount() {
  const keywordElement = document.getElementById("Keyword");
  keywordElement.classList.add("editable"); // 添加 editable 樣式
  keywordElement.disabled = false; // 取消禁用輸入框
}
</script>

<style scoped>
.conBg{
  text-align: center;
  padding-bottom: 20px;
  padding-top: 20px;
  background-color:#F8F8F8;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); /* X, Y, 模糊程度, 顏色透明度 */
}
.linkskype{
  text-decoration: underline;
}
.radio-003 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  border: none;
}
.teacherPhoto{
  margin-left: 0;
}
.teacherInfo .favorite{
  left: 0;
}

.radio-003 label {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}

.radio-003 label:has(:checked) {
  background-color: #fff7e6;
  color: #000;
  background-image: url('../assets/images/checkmark.png') ;
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: right bottom;
  border: 1px solid #FF8F3E;
}

.radio-003 label:has(:checked)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px; /* Adjust the size as needed */
  height: 20px;
}

.radio-003 input {
  display: none;
}


.radio-003 label::before,
.radio-003 label:has(:checked)::after {
  border-radius: 50%;
  content: '';
}

.radio-003 label::before {
  width: 14px;
  height: 14px;
  background-color: #fff;
}

.radio-003 label:has(:checked)::after {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(-50%, -50%);
  width: 7px;
  height: 7px;
  background-color: #fff;
}

/* Remove unwanted circular markers */
.radio-003 label::before,
.radio-003 label::after {
  display: none;
}

.lessonConfirmContents {
  background-color: #F8F8F8;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 24px;
}

.ChineseLevel_wrap{
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

.ConDes {
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 16px;
  margin-top: 44px;
  position: relative;
}
.ConDes img{
  width: 290px;
  top: -26px;
  left: 134px;
  position: absolute;
}

.form-group {
  flex: 1 1 48%;
  display: flex;
  align-items: center;
  color: #424242;
  margin-bottom: 10px;
  padding-right: 10px; /* Adjust if necessary for spacing */
}

.form-group:nth-child(odd) {
  padding-right: 40px;
  margin-left: 10px;
}

.form-group:nth-child(even) {
  padding-left: 40px;
  margin-right: 10px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
}

.form-group select,
.form-group input {
  flex: 2;
  padding: 10px 24px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 50px;
  float: left;
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  background-color: #ffffff;
  border: 1px solid #DADADA;
}

.form-group select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -ms-word-break: normal;
  word-break: normal;
  background-image: url("../../assets/images/dropdown.png");
  background-repeat: no-repeat;
  background-size: 14px;
  background-position: 250px center;
}

.form-group input::placeholder {color: #ccc;}
.titlePos{margin-top: 16px;}
.orangeColor{color: #FA8373;}

.editBtn{
  position: absolute;
  padding: 4px 8px 3px 8px;
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  height: 23px;
  font-size: 12px;
  text-align: center;
  width: 44px;
  border-radius: 16px;
  top: 14px;
  right: 10px;
}

#Keyword{
  background-color: #EEEEEE;
  color: #888888;
  width: 300px;
  cursor: not-allowed;
}

#Keyword.editable{
  background-color: #FFFFFF;
  color: #424242;
  width: 300px;
  cursor: text;
}

.Key_ori{
  background-color: #FFFFFF !important;
  color: #424242 !important;
  cursor: text !important;
}
.infoBlock{
  background-color: #F8F8F8;
  width: 100%;
  margin: auto;
  padding-top: 22px;
}
.infoNotice {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #FFF4C7, #FFE49E); /* 柔和漸層黃 */
  color: #5B3E00; /* 不刺眼咖啡字 */
  padding: 9px 16px 8px 16px;
  border-left: 5px solid #FF9800;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 3px rgba(0,0,0,0.05);
  line-height: 1.5;
  width: 91%;
  margin: 0 auto;
}

.infoIcon {
  background-image: url('../../assets/images/bell-solid.svg'); /* 用你原本的 bell 圖 */
  background-size: contain;
  background-repeat: no-repeat;
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  margin-right: 10px;
}

.infoText {
  flex: 1;
}



@media screen and (max-width: 520px) {
  .conBg{
    text-align: center;
    padding-bottom: 20px;
    padding-top: 20px;
    background: none;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.1); /* X, Y, 模糊程度, 顏色透明度 */
  }
  .lessonConfirmAttention{
    width: 90%;
    margin: 10px auto;
  }
  .lessonConfirm{
    width: 90%;
    margin: auto;
  }
  .lessonConfirmContents{
    width: 90%;
    margin: auto;
    padding: 0 5%;
  }
  .ChineseLevel_wrap{
    width: 90%;
    margin: auto;
    padding: 5%;
  }
  .teacherInfo .favorite{
    left: 0;
  }
  .ConDes{
    width: 100%;
    height: auto;
    margin-top: 6%;
  }
  .ConDes img{
    position: relative;
    top: auto;
    left: auto;
    margin: auto;
    width: 90%;
  }
  .infoBlock{
    width: 90%;
  }
  .form-group:nth-child(even){
    padding: 0;
    margin-right: 0;
  }
  .form-group:nth-child(odd){
    padding: 0;
    margin-right: 0;
    margin-left: 0;
  }
  .form-group{
    flex: 1 1 100%;
  }
  .Submit{
    width: 80%;
  }
  #Keyword{
    width: 100%;
  }
  #Keyword.editable{
    width: 100%;
  }
  .infoNotice{
    font-size: 12px;
    padding: 9px 8px 8px 16px;
  }
  .linkskype{
    text-decoration: underline;
    width: 100px;
    margin-left: 8px;
  }
  .form-group select{
    background-position: 170px;
  }
}
</style>
  