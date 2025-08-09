<template>
  <div class="mypageTemplate">

    <div style="height: 40px;"></div>
    <p class="headline">体験の流れ</p>
    <ul class="headFlow_navi">
      <li>体験プランを決める</li>
      <li style="color: #f2762e; font-weight: bold;">レッスン予約</li>
      <li>学習をはじめよう</li>
    </ul>

    <p class="lessonConfirmAttention ">▼レッスン予約はまだ確定していません。</p>


    <div class="lessonConfirm" v-for="(item, index) in lessons">
      <ul class="date">
        <li>レッスン予約はまだ確定していません。</li>
        <li>{{item.date.md}}({{item.date.week}})</li>
        <li>{{item.date.time_sart}}〜{{item.date.time_end}}</li>
        <li>（UTC+9 日本時間）</li>
      </ul>
      <div class="teacherInfo">
        <nuxt-link :to="'/teachers/'+item.info.id"><img :src="item.info.face_img5" alt="" class=""></nuxt-link>
        <ul>
          <li class="name">{{item.info.name}}</li>
          <li>{{item.info.province_addr}}{{item.info.current_address}}</li>
          <li>日本語{{item.info.japanese_level}}{{teacher_japanese_level[item.info.japanese_level]}} 英語{{item.info.english_level}}{{teacher_english_level[item.info.english_level]}}</li>
<!--          <li>{{item.info.integral_rank}}ポイント</li>-->
        </ul>
        <p class="favorite" @click="addBookmark(item.info.id)"><span><img :src="useStore?.studentInfo?.bteachers?.includes(item.info.id) ? IconHeart : IconHeartNone" alt="" /> お気に入り</span></p>
        <ul class="teacherLabels">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>

    <form action="">

      <div class="lessonConfirmContents">
        <div class="selectdiv block">
          <p>予約を確定するため以下の情報を記入ください</p>
          <div class="content">
            <div class="left">
              <p class="subtitle">受講用ソフト</p>
              <div class="selectDivInner">
                <select id="time_select" onchange="" v-model="useSoftware">
                  <option :value="skey" v-for="(software,skey) in softwares" data-number="0">
                    {{software}}</option>
                </select>
              </div>
            </div>
            <div class="right">
              <p class="subtitle">アカウントID</p>
              <input type="text" name="" v-model="account" id="Keyword" placeholder="12345678" class="KeywordTextbox">
            </div>
          </div>
        </div>
      </div>


      <div class="ChineseLevel_wrap">
        <div>
          <p>中国語レベルの自己申告</p>
          <fieldset class="radio-003">
            <label v-for="(tag,tindex) in chineseLevelTag">
              <input type="radio" name="radio-003" @click="changeTag(tindex)" :value="tindex" :checked="tindex == 1 ? true : false"/>
              {{tag}}
            </label>
          </fieldset>
        </div>

        <div>
          <p>習いたい内容</p>
          <fieldset class="radio-003">
            <label v-for="(course,cindex) in courseIdsTag">
              <input type="radio" name="radio-004" @click="changeCourse(cindex)" :value="cindex" :checked="cindex == 1 ? true : false"/>
              {{course}}
            </label>
          </fieldset>
        </div>

      </div>


      <div style="height: 60px;"></div>
        <div class="button_confirm" @click="submitForm">予約を確定する</div>

    </form>


    <div style="height: 200px;"></div>

  
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
import {createDiscreteApi} from "naive-ui";
import {useMainStore} from "~/composables/store";

// definePageMeta({
//   middleware: 'auth',
//   layout: 'mypage'
// });
let lessons = ref([]);
let softwares = ref([]);
let useSoftware = ref('');
let account = ref('');
let chineseLevelTag = ref([]);
let courseIdsTag = ref([]);
let tagChecked = ref(1);
let courseChecked = ref(1);
let hasLesson = ref(0);
let teacher_japanese_level = ref([]);
let teacher_english_level = ref([]);
const useStore = useMainStore();

let { data: info } = await useStudentSelectedLessonApi()
if (info?.value) {
  lessons.value = info?.value?.lessons ?? [];
  softwares.value = info?.value?.software ?? [];
  useSoftware.value = info?.value?.default_software ?? 'teams';
  chineseLevelTag.value = info?.value?.chinese_level_tag ?? [];
  courseIdsTag.value = info?.value?.course_ids_tag ?? [];
  hasLesson.value = info?.value?.has_lesson ?? 0;
  teacher_japanese_level.value = info?.value.japanese_level ?? [];
  teacher_english_level.value = info?.value.english_level ?? [];
}


function changeTag(index) {
  tagChecked.value = index;
}
function changeCourse(index) {
  courseChecked.value = index;
}

async function submitForm() {
  if (account.value == '') {
    const { message } = createDiscreteApi(["message"])
    message.error('アカウントを入力してください');
    return;
  }
  let { data: result } = await useToCompleteSelectedLessonsApi({
    has_lesson : hasLesson.value,
    chinese_level : tagChecked.value,
    course_ids : courseChecked.value,
    software : useSoftware.value,
    account: account.value
  })
  if (result.value != null && result.value.err == false) {
    navigateTo(`/decision/${result.value.lesson_ids}`)
  }

}
</script>

<style scoped>
.radio-003 {
border: none;
}

.radio-003 label {
display: flex;
align-items: center;
gap: 0 .5em;
position: relative;
max-width: 286px;
margin-bottom: .4em;
padding: .5em .7em;
border: 1px solid #f2b705;
border-radius: 25px;
background-color: #f2b70526;
cursor: pointer;
}

.radio-003 label:has(:checked) {
background-color: #f2b705;
color: #fff;
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
left: calc(7px + .7em);
transform: translate(-50%, -50%);
width: 7px;
height: 7px;
background-color: #f2b705;
}

.radio-003 input {
display: none;
}
</style>
  