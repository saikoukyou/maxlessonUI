<template>
    <div class="mypageTemplate">
      <p class="lessonDesAttention">レッスン予約が完了しました。</p>
      <span  v-for="(lesson) in list">
        <div class="lessonConfirm Decision">
        <ul class="date">
          <li>{{lesson.day.md}}<span class="fs18"> ({{lesson.day.week}})</span></li>
          <li>{{lesson.day.time_sart}}〜{{lesson.day.time_end}}</li>
          <li><span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span><span v-else>（UTC+9 日本時間）</span></li>
        </ul>
        <div class="teacherInfo">
          <nuxt-link :to="'/teachers/'+lesson.teacher_id">
              <div class="teacherPhoto">
<!--                <div class="cnRibbon"></div>-->
                <span v-if="lesson.teacher_learn_type == 0" class="tagL">総合</span>
                <span v-else class="tagS">会話</span>
                <img :src="lesson.face_img5" alt="" class="tphoto">
              </div>
          </nuxt-link>
          <ul>
            <li class="pinyin">{{lesson.name_pinyin}}</li>
            <li class="name">{{ lesson.name_cn }}<span class="teacherID">ID:{{lesson.teacher_id}}</span></li>
            <li class="cityT">{{lesson.province_addr}}{{lesson.current_address}}</li>
            <li v-if="lesson.teacher_learn_type == 0">
              <span class="sptitle">日本語</span>
              <span class="spdes">{{lesson.japanese_level}}{{maps['japanese_level'][lesson.japanese_level]}}</span>
            </li>
            <li v-else class="jpT">
              <span class="sptitle">業界の得意分野</span>
              <span class="spdes">{{ lesson.teacher_topic_str }}</span>
            </li>
            <li v-if="lesson.teacher_learn_type == 0">
              <span class="sptitle">英語</span>
              <span class="spdes">{{lesson.english_level}}{{maps['english_level'][lesson.english_level]}}</span>
            </li>
            <li v-else class="enT">
              <span class="sptitle">対応可能な方言</span>
              <span class="spdes">{{ lesson.teacher_dialect }}</span>
            </li>
<!--            <li>{{lesson.integral_rank}}ポイント</li>-->
          </ul>
          <p class="favorite" @click="addBookmark(lesson.teacher_id)"><span><img :src="useStore?.studentInfo?.bteachers?.includes(lesson.teacher_id) ? IconHeart : IconHeartNone" alt="" /> お気に入り</span></p>
          <ul class="teacherLabels">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>

         <div class="lessonDecision_notes">
  <h3>注意事項</h3>
  <ul v-if="lesson.software === 'web'">
    <li>Web教室を使用してレッスンを行います。レッスン時刻の5分前になると入室ボタンが表示されます。<br>【マイページ ＞ 予約中のレッスン ＞ レッスン詳細】 からご確認いただけます。</li>
    <li>レッスンにはパソコンまたはスマートフォンで参加できますが、安定した通信環境をご準備ください。</li>
    <li>レッスン終了時刻過ぎて5分後に、教室が閉じられ利用不可となります。</li>
    <li>予約のキャンセルは60分前までです。</li>
  </ul>
  <ul v-else>
    <li>
      講師が生徒の
      <span style="font-weight: bold; color: #FA8373">
        {{lesson.software}}
        <span>（ID： {{lesson.software === 'wechat' ? lesson.student_wechat : lesson.student_teams_id}} ）</span>
      </span>
      に連絡します。必ず友人追加申請を承認してください。
    </li>
    <li>
      レッスン開始5分前になっても講師から友人追加申請が来ない場合、または安心のため早めに講師と繋がりたい場合、生徒から講師に友人追加申請をしてください。<br>
      講師の
      <span style="font-weight: bold; color: #FA8373">
        {{lesson.software}}
        <span>（ID： {{lesson.software === 'wechat' ? lesson.teacher_wechat : lesson.teacher_teams_id}} ）</span>
      </span>
    </li>
    <li>予約のキャンセルは60分前までです。</li>
    <li>使用教材についてご要望があれば、レッスン前またはレッスン時に講師に伝えてください。</li>
  </ul>

  <NuxtLink @click="changePage('/mypage/mypageReserved')">
    <div class="button_confirm">マイページトップへ</div>
  </NuxtLink>
</div>
      </span>
    </div>
    </template>

<script setup>
import IconHeart from "../../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../../assets/SVG/icon_heart_none.svg";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {useLessonsListApi} from "~/apis/student";
import {onMounted} from "vue";
import {useMainStore} from "~/composables/store";

// definePageMeta({
//   middleware: 'auth',
//   layout: 'mypage'
// });
let list = ref([]);
let lesson_ids = ref('');
let flag = ref('');
let maps = ref([]);
const useStore = useMainStore();

const route = useRoute();
if (route && route?.params) {
  lesson_ids.value = route.params.id;
  flag.value = route.params.flag;
}

const getLessons = async () => {

  let { data: info } = await useLessonsListApi(lesson_ids.value);
  if (info?.value) {
    useStore.useRefreshUserInfo();
    list.value = info?.value.list ?? [];
    maps.value = info?.value.maps ?? [];
  }
}

onMounted(() => {
  getLessons();
})

function changePage(path) {
  useStore.setActiveUrl(path);
  navigateTo(path);
}
</script>

<style scoped>

.button_confirm{
  cursor: pointer;
}
.teacherPhoto{
  margin-left: 0;
}
.teacherInfo .favorite{
  left: 0;
}
@media screen and (max-width: 520px) {
  .lessonDesAttention{
    width: 90%;
    margin: 10px auto;
  }
  .lessonConfirm{
    width: 90%;
    margin: auto;
  }
  .teacherInfo .favorite{
    left: 0;
  }
  .lessonDecision_notes{
    width: 90%;
    margin: auto;
    padding: 5%;
  }

}

</style>
  

  