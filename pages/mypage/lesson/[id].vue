<template>
    <div class="mypageTemplate">
      <span v-if="lesson">
        <div class="lessonConfirm Decision">
          <div class="corner-ribbon-wrapper">
            <div class="corner-ribbon">
                <span v-if="lesson.lesson_type === 0">月額プラン</span>
                 <span v-else-if="lesson.lesson_type === 1">チケット</span>
               <span v-else-if="lesson.lesson_type === 2">返却コマ</span>
            </div>
          </div>

        <ul class="date">
          <li>{{lesson.lesson_day}}<span class="fs18"> ({{lesson.lesson_week}})</span></li>
          <li>{{lesson.lesson_start_datetime_sub}}〜{{lesson.lesson_end_datetime_sub}}</li>
          <li><span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span><span v-else>（UTC+9 日本時間）</span></li>
          <li class="lessonID">レッスンID｜{{lesson.id}}</li>
        </ul>
        <div class="teacherInfo">
          <div class="teacherPhoto">
          <nuxt-link :to="'/teachers/'+lesson.teacher_id">
<!--             <div class="cnRibbon"></div>-->
            <span v-if="lesson.learn_type == 0" class="tagL">総合</span>
            <span v-else class="tagS">会話</span>
            <img :src="lesson.face_img5" alt="" class="tphoto">
          </nuxt-link>
          </div>
          <ul>
            <li class="pinyin">{{lesson.teacher_name_pinyin}}</li>
            <li class="name">{{ lesson.teacher_name_cn }}<span class="teacherID">ID:{{lesson.teacher_id}}</span></li>
            <li class="cityT">{{lesson.province_addr}}{{lesson.current_address}}</li>

            <li v-if="lesson.learn_type == 0">
              <span class="sptitle">日本語</span>
              <span class="spdes" v-if="maps['japanese_level']">
                {{lesson.japanese_level}}{{maps['japanese_level'][lesson.japanese_level]}}
              </span>
            </li>
            <li v-else >
              <span class="sptitle">業界の得意分野</span>
              <span class="spdes">{{ lesson.topic_str }}</span>
            </li>
            <li v-if="lesson.learn_type == 0">
              <span class="sptitle">英語</span>
              <span class="spdes" v-if="maps['english_level']">
                {{lesson.english_level}}{{maps['english_level'][lesson.english_level]}}
              </span>
            </li>
            <li v-else>
              <span class="sptitle">対応可能な方言</span>
              <span class="spdes">{{ lesson.dialect }}</span>
            </li>
          </ul>
          <p class="favorite" @click="addBookmark(lesson.teacher_id)"><span><img :src="useStore?.studentInfo?.bteachers?.includes(lesson.teacher_id) ? IconHeart : IconHeartNone" alt="" /> お気に入り</span></p>
          <ul class="teacherLabels">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>

        <div class="lessonDes" v-if="lesson.lesson_status === 1">
          <div class="qrBlock" v-if="lesson.software == 'wechat'">
            <img :src="lesson.teacher_wechat_img" alt="" class="qrcodeImg">
<!--            <p class="chatWord">WeChat でスキャンすると講師の連絡先を追加できます</p>-->
          </div>
            <table class="custom-table">
              <tr>
                  <th>受講ソフト</th>
                  <td>{{ lesson.software_name }}</td>
              </tr>
              <tr v-if="lesson.software === 'wechat'">
                  <th>講師のWeChat</th>
                  <td>{{ lesson.teacher_wechat }}
                  </td>
              </tr>
              <tr v-else-if="lesson.software === 'skype'">
                  <th>講師のSkype</th>
                  <td>{{ lesson.teacher_skype_id }}</td>
              </tr>
              <tr v-else-if="lesson.software === 'teams'">
                  <th>講師のTeams</th>
                  <td>{{ lesson.teacher_teams_id }}</td>
              </tr>
            </table>
          <div>
            <div class="webStyle" v-if="lesson.software === 'web' && lesson.reservation_status === 1 && lesson.lesson_status === 1 && lesson.service_type !== 1">
              <span v-if="videoShow">
                <nuxt-link :to="'/mypage/lesson/agoraVideo?channel='+lesson.id">
                  <button class="webBtn">Web教室に入る</button>
                </nuxt-link>
              </span>
              <span v-else>
                <button class="webBtn_disable">Web教室に入る</button>
              </span>
              <span class="webWord">レッスン時刻の5分前から入室可能。</span>
              <span class="webWord">レッスン時刻まで <n-countdown
                    :duration="duration"
                    :active="cactive"
                    :on-finish="finishCount"
                    :render="renderTime"
                    class="countdown-red"
                />
              </span>
              </div>
            <br>


            <!-- 尚未開放 lesson board 的提示 -->
          <div class="lessonWaitBoard" v-if="lesson.software === 'web' && !uploadShow">
            <div class="lesson-desc wait-board">
              <div class="wait-text">
                レッスンの60分前から共有ファイルのアップロードが可能です。<br>
                しばらくお待ちください。
              </div>
               <img src="../../../assets/images/panda_wait.png" alt="レッスン待機" />
            </div>
          </div>
            <!-- 進入教室後的提示 -->
          <div  v-else-if="lesson.software === 'web' && uploadShow && videoShow"></div>

            <!-- 上課前60分鐘內才顯示的上傳區塊 -->
           <div class="lessonBoard" v-else-if="lesson.software === 'web' && uploadShow && !videoShow">
              <div class="lesson-title">
              <img src="../../../assets/images/panda_lessontitle.png" width="48" alt="レッスンボード">
              <span>レッスンボード</span>
              </div>
              <div class="lesson-desc">
                レッスンの60分前からアップロードが可能です。レッスン中にファイルを共有できます。<br>
                対応形式：JPG、PNG、PDF
              </div>
              <div v-if="uploadShow" class="upload-wrapper">
                <UploaderLesson class="face-img" v-model="simg1" :data="{type : 'lesson',lessonId : lesson.id,name : 'simg1',url : simg1}" @handlePreview="previewImg(simg1)" />
                <UploaderLesson class="face-img" v-model="simg2" :data="{type : 'lesson',lessonId : lesson.id,name : 'simg2',url : simg2}" @handlePreview="previewImg(simg2)" />
                <UploaderLesson class="face-img" v-model="simg3" :data="{type : 'lesson',lessonId : lesson.id,name : 'simg3',url : simg3}" @handlePreview="previewImg(simg3)" />
                <UploaderLesson class="face-img" v-model="simg4" :data="{type : 'lesson',lessonId : lesson.id,name : 'simg4',url : simg4}" @handlePreview="previewImg(simg4)" />
                <UploaderLesson class="face-img" v-model="simg5" :data="{type : 'lesson',lessonId : lesson.id,name : 'simg5',url : simg5}" @handlePreview="previewImg(simg5)" />
              </div>
            </div>
            <button class="cancelBtn" v-if="lesson.reservation_status === 1 && !cancelLoading" @click="cancelLesson">予約のキャンセル</button>
            <nuxt-link to="/mypage/mypageReserved">
              <button class="backBtn" >TOPに戻る</button>
            </nuxt-link>
            <span class="noticeTime">※レッスン時刻の60分前までキャンセル可能</span><br>
              </div>
        </div>
        <div v-else-if="lesson.lesson_status === 2">
          <div class="lessonUp">
            <n-form :model="form" ref="formRef" :rules="rules" show-require-mark="right-hanging" size="large">
            <n-form-item label="レッスンへの評価" path="evaluation_score">
              <n-rate clearable allow-half v-model:value="form.evaluation_score" type="number" @update:value="changeScore"/>
            </n-form-item>
            <n-form-item label="コメント" path="evaluation_comment">
              <n-input
                  v-model:value="form.evaluation_comment"
                  placeholder="評価"
                  type="textarea"
                  :autosize="{
                    minRows: 3,
                    maxRows: 5
                  }"
              />
            </n-form-item>
            <n-form-item show-label="false">
              <n-checkbox v-model:checked="form.evaluation_status">
                管理者のみに公開します
              </n-checkbox>
            </n-form-item>
            <div class="btnFix">
              <nuxt-link to="/mypage/mypageReserved">
                <n-button class="Submit backB">
                  <span>戻る</span>
                </n-button>
              </nuxt-link>
              <n-button v-if="!lesson.evaluation_score" class="Submit backA" type="submit" @click="onSubmit" :loading="loading">
                <span>確定/修正</span>
              </n-button>
            </div>
          </n-form>
          </div>

          <div class="block2">
            <n-form :model="form2" ref="formRef2" :rules="rules2" show-require-mark="right-hanging" size="large">
              <n-form-item label="申告種類" path="type">
                <n-radio-group v-model:value="form2.type" @update:value="changeType" name="radiobuttongroup1">
                  <n-radio-button
                      v-for="type in types"
                      :key="type.value"
                      :value="type.value"
                      :label="type.label"
                  />
                </n-radio-group>
              </n-form-item>
              <n-form-item v-if="form2.type == 2" label="遅刻時間" path="late_minute">
                <n-select v-model:value="form2.late_minute" :options="options" />
              </n-form-item>
              <n-form-item label="申告内容" path="student_comment">
                <n-input
                    v-model:value="form2.student_comment"
                    placeholder="内容を入力してください"
                    type="textarea"
                    :autosize="{
                      minRows: 3,
                      maxRows: 5
                    }"
                />
              </n-form-item>
              <n-form-item style="display: block; width: fit-content;" show-label="false">
                画像をアップロード
                <uploader v-model="form2.img"/>
              </n-form-item>
              <div style="text-align: center;" v-if="!lesson.trouble_lesson_id">
                <n-button class="Submit" type="submit" @click="onSubmitForm2" :loading="loading2">
                  <span>申告</span>
                </n-button>
              </div>
            </n-form>
          </div>

          <div class="block2" v-if="lesson.software === 'web' && lesson.talk_history_str">
              <span class="chatTitle">チャット履歴</span>
              <div v-html="lesson.talk_history_str"></div>
          </div>
        </div>

      </span>

    </div>

  <n-modal
      v-model:show="showImg"
      preset="card"
      style="width: 90%; max-width: 800px"
  >
    <!-- 如果是圖片 -->
    <img
        v-if="/\.(jpe?g|png|gif|webp)$/i.test(imgSrc)"
        :src="imgSrc"
        style="width: 100%; height: auto; display: block;"
    />

    <!-- 如果是 PDF -->
    <iframe
        v-else
        :src="imgSrc"
        style="width: 100%; height: 80vh; border: none;"
    />
  </n-modal>



</template>

<script setup>
import IconHeart from "../../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../../assets/SVG/icon_heart_none.svg";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {
  useCancelLessonApi,
  useLessonsListApi,
  useLessonsPreviewApi, useStudentApplyTroubleApi,
  useStudentLessonEvaluationDataApi
} from "~/apis/student";
import {
  NForm,
  NInput,
  NFormItem,
  NButton,
  NRate,
  NCheckbox,
  NRadioGroup,
  NRadioButton,
  NSelect,
  NCountdown,
  NModal,
  createDiscreteApi
} from "naive-ui"
import {onMounted, ref} from "vue";
import {useMainStore} from "~/composables/store";


// definePageMeta({
//   middleware: 'auth',
//   layout: 'mypage'
// });
let lesson = ref([]);
const route = useRoute();
const lesson_ids = route.params.id;
const form = reactive({
  evaluation_score:5,
  evaluation_comment: "",
  evaluation_status: false,
  id: 0
});
const form2 = reactive({
  student_comment:'',
  type: 1,
  img: "",
  id: 0,
  late_minute: 0
});
let loading = ref(false);
let loading2 = ref(false);

const { message, dialog } = createDiscreteApi(["message", "dialog"]);


const types = [
  {
    value: 2,
    label: "講師の遅刻"
  },
  {
    value: 0,
    label: '講師の欠勤'
  },
  // {
  //   value: 1,
  //   label: '満足保証'
  // },
];
const options = [
  {
    value: 1,
    label: "1"
  },
  {
    value: 2,
    label: "2"
  },
  {
    value: 3,
    label: "3"
  },
  {
    value: 4,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
];

const formRef = ref(null);
const formRef2 = ref(null)

const rules = reactive({
  evaluation_score: [{
    required: true,
    type: "number",
    min: 1,
    max: 5,
    message: "点数を入力してください",
    trigger: "blur"
  }],
  evaluation_comment: [{
    required: false,
    trigger: "blur"
  }],
});

const rules2 = reactive({
  type: [{
    required: true,
    type: "number",
    message: "申告種類を入力してください",
    trigger: "blur"
  }],
  late_minute: [{
    required: false,
    type: "number",
    trigger: "blur"
  }],
  student_comment: [{
    required: false,
    type: "string",
    max: 255,
    message: "申告内容を入力してください",
    trigger: "blur"
  }],
});
let maps = ref([]);
let category_id = ref(0);
const useStore = useMainStore();
const cactive = ref(true);
const duration = ref(0);
const videoShow = ref(false);
let cancelLoading = ref(false);
let simg1 = ref('');
let simg2 = ref('');
let simg3 = ref('');
let simg4 = ref('');
let simg5 = ref('');
let showImg = ref(false);
let imgSrc = ref('');
let countdownImg;
let timerImg;
const uploadShow = ref(false);


const getLessonInfo = async () => {
  let { data: info } = await useLessonsPreviewApi(lesson_ids);
  if (info?.value) {
    lesson.value = info?.value?.info ?? [];
    form.id = lesson.value['id'] ?? 0;
    form.evaluation_score = lesson.value['evaluation_score'] ?? 5;
    form.evaluation_comment = lesson.value['evaluation_comment'] ?? '';
    form.evaluation_status = lesson.value['evaluation_status'] == 0 ? true : false;
    form2.id = lesson.value['id'] ?? 0;
    form2.type = lesson.value['trouble_is_anshin_guarantor'] ?? 0;
    form2.student_comment = lesson.value['trouble_student_comment'] ?? '';
    form2.img = lesson.value['trouble_img'] ?? '';
    form2.late_minute = lesson.value['trouble_late_minute'] ?? 0;
    simg1.value = lesson?.value?.simg1 ?? "";
    simg2.value = lesson?.value?.simg2 ?? "";
    simg3.value = lesson?.value?.simg3 ?? "";
    simg4.value = lesson?.value?.simg4 ?? "";
    simg5.value = lesson?.value?.simg5 ?? "";

    maps.value = info?.value.maps ?? [];
    category_id.value = info?.value.textbook_category_id ?? 0;

    // console.log('duration::::'+duration.value);
    videoShow.value = info?.value?.videoShow == 1 ? true : false;
    duration.value = info?.value?.duration ? info?.value?.duration : 0;
    cactive.value = info?.value?.cactive == 1 ? true : false;

    startCountdown(info?.value?.duration2 ? info?.value?.duration2 : 0);
    // console.log('info?.value?.end_img_count::'+info?.value?.end_img_count);
    if (info?.value?.end_img_count >= 0) {
      startCountdownImg(info?.value?.end_img_count ? info?.value?.end_img_count : 0);
    }

    // let startTime = Number(info?.value['lesson_video_start_unixtime_jp'])*1000;
    // let endTime = Number(info?.value['lesson_video_end_unixtime_jp'])*1000;
    // if (startTime > Date.now()) {
    //   cactive.value = true;
    //   videoShow.value = false;
    //   duration.value = startTime - Date.now();
    // } else if (startTime < Date.now() && endTime > Date.now()) {
    //   videoShow.value = true;
    //   duration.value = 0;
    //   cactive.value = false;
    // } else {
    //   videoShow.value = false;
    //   cactive.value = false;
    //   duration.value = 0;
    // }

  }
}

onMounted(() => {
  clearTimeout(timer);
  clearTimeout(timerImg);
  getLessonInfo();
})

const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true;
    if (form.evaluation_status) {
      form.evaluation_status = 0;
    } else {
      form.evaluation_status = 1;
    }

    let { data: data } = await useStudentLessonEvaluationDataApi(form);
    if (data?.value && data?.value.err === false ) {
      // console.log('data:'+JSON.stringify(data.value));
      loading.value = false;
      getLessonInfo();
      return message.success(data?.value?.err_msg);
    } else {
      if (data?.value?.err_msg) {
        return message.error(data?.value?.err_msg);
      }
    }
  })
}
const onSubmitForm2 = async () => {
  formRef2.value.validate(async (errors) => {
    if (errors) return;

    loading2.value = true;

    let { data: data } = await useStudentApplyTroubleApi(lesson.value['id'],form2);
    if (data?.value && data?.value.err === false ) {
      // console.log('data:'+JSON.stringify(data.value));
      loading2.value = false;
      getLessonInfo();
      message.success(data?.value?.err_msg);
      return navigateTo("/mypage/lesson/applySuccess");
    } else {
      loading2.value = false;
      if (data?.value?.err_msg) {
        return message.error(data?.value?.err_msg);
      }
    }
  })
}

let dialogLoading = ref(false); // 外層定義

const cancelLesson = () => {
  const d = dialog.create({
    title: () => dialogLoading.value ? "処理中です" : "レッスンのキャンセル確認",
    content: () =>
        h("div", {}, dialogLoading.value
            ? "キャンセル処理中です。少々お待ちください。"
            : "このレッスンをキャンセルしますか？"),
    positiveText: () => !dialogLoading.value && h("span", {}, "はい、キャンセル"),
    negativeText: () => !dialogLoading.value && "いいえ",
    maskClosable: false,
    closeOnEsc: false,
    async onPositiveClick() {
      dialogLoading.value = true;
      cancelLoading.value = true;
      await nextTick();

      const actionEl = document.querySelector('.n-dialog__action');
      if (actionEl) actionEl.innerHTML = "";

      const { data: cancelData } = await useCancelLessonApi(lesson.value['id']);

      if (cancelData?.value && cancelData?.value?.err === false) {
        useStore.useRefreshUserInfo();
        d.destroy();
        dialog.success({
          title: "キャンセル完了",
          content: "レッスンのキャンセルが完了しました。",
          positiveText: "戻る",
          onPositiveClick() {
            useStore.setActiveUrl("/mypage/mypageReserved");
            return navigateTo("/mypage/mypageReserved", { replace: true });
          }
        });
      } else {
        dialogLoading.value = false;
        cancelLoading.value = false;
        message.error(cancelData?.value?.err_msg || "レッスンのキャンセルが失敗しました。");
      }
    }
  });
};


//時間格式
const renderTime = ({ hours, minutes, seconds }) => {
  const pad = (n) => String(n).padStart(2, '0');
  return h(
      'span',
      { style: 'color: red; font-weight: bold;' },
      `${pad(hours)}時間${pad(minutes)}分${pad(seconds)}秒`
  );
};


function changeScore() {
  if (form.evaluation_score == 1 || form.evaluation_score == 2) {
    rules.evaluation_comment = [{
      required: true,
      message: "内容を入力してください",
    }];
  }
}
function changeType() {
  if (form2.type == 2) {
    rules2.late_minute = [{
      required: true,
      min: 1,
      type: "number",
      trigger: "blur"
    }];
  }
}

function finishCount() {
  videoShow.value = true;
  cactive.value = false;
}

let countdownEnd;
let timer;

// const startCountdown = (num) => {
//   // let timer1 = null;
//   timer1 = setInterval(() => {
//     if (num > 0) {
//       num--;
//     } else {
//       clearInterval(timer1);
//       videoShow.value = true;
//     }
//   }, 1000)
// };

function startCountdown(duration) {
  clearTimeout(timer);
  countdownEnd = Date.now() + duration;
  updateCountdown();
}

function updateCountdown() {
  const remaining = Math.max(0, countdownEnd - Date.now());

  if (remaining > 0) {
    timer = setTimeout(updateCountdown, 1000);
  } else {
    videoShow.value = true;
  }
}

function startCountdownImg(duration) {
  clearTimeout(timerImg);
  countdownImg = Date.now() + duration;
  updateCountdownImg();
}

function updateCountdownImg() {
  const remaining = Math.max(0, countdownImg - Date.now());

  if (remaining > 0) {
    timerImg = setTimeout(updateCountdownImg, 1000);
  } else {
    uploadShow.value = true;
  }
}

function previewImg(img) {
  showImg.value = true;
  imgSrc.value = img;
}

// console.log('lesson.value:'+JSON.stringify(lesson.value));
</script>

<style scoped>
::v-deep(.n-modal) img {
  max-width: 100%;
  height: auto;
}

.teacherPhoto{
  margin-left: 0;
}
.teacherInfo .tagL{
  bottom: 16px;
}
.teacherInfo .tagS{
  bottom: 16px;
}
.iframe-wrapper {
  width: 100%;
  height: 70vh;
}
.iframe-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* ✅ 其他選項：cover, fill, none, scale-down */
}

.lessonWaitBoard{
  text-align: center;
  width: 70%;
  background-color: #FFFFFF;
  margin: 0 auto 30px auto;
}
.lesson-desc.wait-board {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #333;
  text-align: left;
  padding: 8px 0 0 0;
}
.wait-board img {
  width: 80px;
  height: auto;
}

.upload-wrapper {
  display: flex;
  justify-content: center;  /* ⬅️ 水平置中整排 */
  align-items: center;      /* ⬅️ 若需要垂直置中 */
  gap: 4px;                /* ⬅️ 每個 uploader 間的間距 */
  flex-wrap: wrap;          /* 若想在小畫面自動換行可加 */
  padding: 16px 0;
}
.face-img {
  flex: 0 0 auto;    /* 不要自動放大或撐開 */
  width: 17% !important;
}
.lessonBoard{
  text-align: center;
  width: 70%;
  margin: 0 auto 30px auto;
  padding-bottom: 10px;
  background-color: #FFFFFF;
}
.lesson-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  padding-top: 10px;
  margin-bottom: 8px;
  border-bottom: 1px solid #f4f4f4;
}

.lesson-title img {
  margin-right: 8px;
}

.lesson-desc {
  font-size: 13px;
  color: #333;
  margin-top: 8px;
  line-height: 20px;
}
.date .lessonID{
  font-size: 10px !important; margin: 8px auto 0 auto;
  font-family: noto sans-serif;
  width: fit-content !important;
  padding: 4px;
  height: fit-content !important;
  border-radius: 8px;
}
  .block2 .chatTitle{
    color: #333333;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    display: block;
  }
  .custom-table {
    width: 70%;
    border-collapse: collapse;
    margin: 0 auto;
    font-size: 15px;
    text-align: left;
    line-height: 30px;
  }
  .custom-table th, .custom-table td {
    border-bottom: 1px solid #f4f4f4;
    padding: 8px 12px;
    background-color: #FFFFFF;
  }
  .custom-table th {
    background-color: #e0e0e0;
    width: 40%;
    text-align: center;
  }
  .qrBlock{
    width: 300px;
    background-color: white;
    margin: 0 auto 20px auto;
  }
  .lessonDes{
    background-color: #F8F8F8;
    text-align: center;
    padding: 26px 0;
    border-radius: 0 0 8px 8px;
    border-top: 1px solid #E8E8E8;
    color: #424242;
    margin-bottom: 30px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  }
  .lessonConfirm.Decision{
    border-radius: 8px 8px 0 0;
  }
  .cancelBtn{
    color: dimgrey;
    height: 44px;
    background-color:#FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 8px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: bold;
    min-width: 150px;
  }
  .backBtn{
    width:fit-content;
    min-width: 150px;
    height: 44px;
    background-color:dimgrey;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    color: white;
  }
.webBtn{
  width:fit-content;
  min-width: 190px;
  height: 54px;
  background-color:#FF8127;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  cursor: pointer;
}
.webBtn_disable{
  width:fit-content;
  min-width: 190px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  height: 54px;
  background-color:#BBBBBB;
  color:#FFFFFF;
  cursor: not-allowed;
}
.noticeTime{
  clear: both;
  font-size: 11px;
  display: block;
  margin: 10px 0;
}
.lessonUp{
  background-color: #F8F8F8; padding: 20px 40px 20px 40px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
  :deep(.n-form-item-label__text) {
    color: #333333 !important; /* 修改文字颜色 */
    font-size: 18px !important; /* 修改文字大小 */
    font-weight: bold !important; /* 修改文字粗细 */
  }
  .n-form-item.n-form-item--top-labelled{
    grid-template-rows:1fr;
  }
  .backB{
    width: fit-content; padding: 0 40px; margin-right: 10px;
  }
  .block2{
    background-color: rgb(248, 248, 248); padding: 20px 40px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
  .mypageTemplate{
    margin-bottom: 40px;
  }
  .teacherInfo .favorite{
    left: 0;
  }
  .mypageTemplate{
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  .block2{
    margin-top: 20px;
    border-radius: 8px;
  }
  .mypageTemplate{
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
  }
  .lessonUp{
    border-radius: 0 0 8px 8px;
  }
  .btnFix{
    margin: auto;
    text-align: center;
  }
  .webWord{
    font-size: 14px;
    display: block;
    margin: 8px auto 4px auto;
  }
  .webStyle{
    background-color: white;
    width: 70%;
    padding: 40px 0;
    margin: 0 auto 10px auto;
  }

  @media screen and (max-width: 520px) {

    .teacherInfo>a>img{
      margin-left: 0;
    }
    .mypageTemplate{
      width: 90%;
      margin: 20px auto 0 auto;
    }
    .custom-table{
      width: 100%;
    }
    .lessonDes{
      padding: 5%;
    }
    .lessonDes p{
      text-align: left;
    }
    .n-button{
      width: 40%;
      min-width: fit-content;
    }
    .noticeTime{
      margin-bottom: 8px;
      color: #666666;
      font-weight: bold;
    }
    .lessonUp{
      background-color: #F8F8F8;
      padding: 5%;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    }
    .block2{
      padding: 5%;
      margin: 20px 0;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    }
    .n-input{
      text-align: left;
    }
    .backB{
      width: 40% !important;
      min-width:  30% !important;
      float: left;
      text-align: center;
    }
    .backA{
      float: right;
      width: 56% !important;
    }
    .btnFix{
      height: 60px;
    }
    .webStyle{
      width: 100%;
    }
    .webBtn{
      width: 60%;
    }
    .cancelBtn{
      margin: auto;
      display: block;
      width: 60%;
    }
    .backBtn{
      display: block;
      margin: 10px auto;
      width: 60%;
    }
    .lessonBoard{
      width: 100%;
    }
    .upload-wrapper {
      justify-content: flex-start;
      gap: 8px;
      padding: 12px;
      flex-wrap: wrap;
      width: 80%;
      margin: auto;
    }
    .lesson-desc{
      width: 80%;
      margin: auto;
      font-size: 11px;
      line-height: normal;
    }
    .face-img {
      width: calc(50% - 4px) !important;
      margin: auto;
    }
    /* 最後一個（第5個）改為100%寬 */
    .face-img:nth-child(5) {
      width: 100% !important;
    }
    .teacherInfo .tagL{
      bottom: 20px;
    }
    .teacherInfo .tagS{
      bottom: 20px;
    }
  }
</style>

