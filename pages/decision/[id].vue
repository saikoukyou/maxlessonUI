<template>
    <div class="mypageTemplate">

      <div style="height: 40px;"></div>
      <div v-if="flag == 0">
        <p class="headline">体験の流れ</p>
        <ul class="headFlow_navi">
          <li>体験プランを決める</li>
          <li style="color: #f2762e; font-weight: bold;">レッスン予約</li>
          <li>学習をはじめよう</li>
        </ul>
      </div>

      <div style="height: 80px;"></div>

      <span  v-for="(lesson) in list">
        <div class="lessonConfirm Decision">
        <ul class="date">
          <li>レッスンの予約が確定されました。</li>
          <li></li>
          <li>{{lesson.day.md}}({{lesson.day.week}})</li>
          <li>{{lesson.day.time_sart}}〜{{lesson.day.time_end}}</li>
          <li><span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span><span v-else>（UTC+9 日本時間）</span></li>
        </ul>
        <div class="teacherInfo">
          <nuxt-link :to="'/teachers/'+lesson.teacher_id"><img :src="lesson.face_img5" alt="" class=""></nuxt-link>
          <ul>
            <li class="pinyin">{{lesson.name_pinyin}}</li>
            <li class="name">{{ lesson.name_cn }}<span class="teacherID">ID:{{lesson.teacher_id}}</span></li>
            <li>{{lesson.province_addr}}{{lesson.current_address}}</li>
            <li v-if="lesson.learn_type == 0">日本語{{lesson.japanese_level}}{{maps['japanese_level'][lesson.japanese_level]}} 英語{{lesson.english_level}}{{maps['english_level'][lesson.english_level]}}</li>
            <li v-else>{{lesson.topic_str}} {{lesson.dialect}}</li>
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
        <h3>注意事項</h3>

        <div class="lessonDecision_notes">
          <ul>
            <li>講師がお客様の<span style="font-weight: bold; color: var(--pink-dark)"> {{lesson.software}}（ID： {{lesson.software == 'web' ? '' : (lesson.software == 'wechat' ? lesson.teacher_wechat : lesson.teacher_teams_id) }} ）</span>に連絡先を追加します。ご承認ください。</li>
            <li>万が一レッスン開始５分前までになっても追加が来ない場合、お客様のほうから講師の連絡先を追加してください。講師の{{lesson.software}}（ID： {{lesson.software == 'web' ? '' : (lesson.software == 'wechat' ? lesson.student_wechat : lesson.student_teams_id) }} ）</li>
            <li>予約時間を変更したい場合、予約済みのレッスンをキャンセルしてから、再度ご予約ください。（マイページTOPにて）</li>
            <li>初回レッスン時の教材は講師が知らせてくれますので、前もって準備する必要はありません</li>
          </ul>

        </div>
      </span>


      <router-link to="/mypage/mypageReserved">
        <div class="button_confirm">マイページトップへ</div>
      </router-link>

      <div style="height: 200px;"></div>
    
    </div>
    </template>

<script setup>
import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {useLessonsListApi} from "~/apis/student";
import {onMounted} from "vue";
import {useMainStore} from "~/composables/store";

definePageMeta({
middleware: 'auth',
layout: 'mypage'
});
const route = useRoute();
let lesson_ids = ref('');
let flag = ref('');
let list = ref([]);
let maps = ref([]);
const useStore = useMainStore();

if (route && route?.params) {
  lesson_ids.value = route.params.id;
  flag.value = route.params.flag;
}

const getInfo = async () => {
  let { data: info } = await useLessonsListApi(lesson_ids)
  if (info?.value) {
    list.value = info?.value.list ?? [];
    maps.value = info?.value.maps ?? [];
  }
}

onMounted(() => {
  getInfo();
})
</script>
  

  