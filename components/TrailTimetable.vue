<template>
  <div class="mypageTemplate">
    <div style="height: 40px;"></div>
    <!--  レッスントライアルウィンドウ  -->
    <div>
      <swiper-container navigation="true">
        <swiper-slide>
          <ul class="lessonTrial_head_navi">
            <li v-for="(day, index) in limitedDays" :key="index" @click="handleClickDate(day.day)">
                <span class="fs18"
                >{{ day.md }}<span>{{ day.week }}</span></span
                ><br /><span class="fs18 Bit">{{ getDayLabel(index) }}</span>
            </li>
          </ul>
        </swiper-slide>
      </swiper-container>

      <p style="margin-top: 24px">
        今日・明日・明後日のレッスンでしたら、下記の先生がおすすめです
      </p>
      <p style="text-align: right">
        <nuxt-link to="/mypage/searchTeacher">他の日程や講師を検索して予約したい方はこちら</nuxt-link>
      </p>

      <div class="pc">
        <div v-if="isTeacherDataLoaded">
          <div class="select_teachers timeGrid_inherit" v-for="(teacher, teacherIndex) in rows" :key="teacherIndex" style="grid-template-columns: 1fr 1.4fr;">
            <div class="teacherInfo">
              <router-link :to="`/teachers/${teacher.id}`"><img :src="teacher.face_img5" alt=""></router-link>
              <ul>
                <li class="pinyin">{{teacher.name_pinyin}}</li>
                <li class="name">{{ teacher.name_cn }}<span class="teacherID">ID:{{teacher.id}}</span></li>
                <li>{{ teacher.province_addr }}{{ teacher.current_address }}</li>
                <li v-if="teacher.learn_type == 0">日本語{{ teacher.japanese_level }}{{maps['japanese_level'][teacher.japanese_level]}} 英語{{ teacher.english_level }}{{maps['english_level'][teacher.english_level]}}</li>
                <li v-else>{{teacher.topic_str}} {{teacher.dialect}}</li>
<!--                <li>{{ teacher.integral_rank }}ポイント</li>-->
              </ul>
              <p class="favorite" @click="addBookmark(teacher.id)"><span><img :src="useStore?.studentInfo?.bteachers?.includes(teacher.id) ? IconHeart : IconHeartNone" alt="" /> お気に入り</span></p>
              <ul class="teacherLabels"><li></li><li></li><li></li></ul>
            </div>
            <div class="timeGridWrap scroll_bar scroll_transbg">
              <ul class="timeGrid vIf">
                <li v-for="(time, spanIndex) in teacher.times" :key="spanIndex"  @click="selectTime(teacher.id,time.lesson_unixtime)" :class="time.is_reserved == 1 || time.status == 0 ? 'lesson_disabled' : ''">
<!--                  <router-link :to="`/confirm-${teacher.id}/${time.lesson_datetime}`"></router-link>-->
                  {{ spanIndex }}
                </li>
              </ul>

            </div>
          </div>
          <n-pagination size="large" style="margin-top:10px;" :item-count="total" :page="page"
                        :on-update:page="handlePageChange" />
        </div>
      </div>
      <div class="sp swiper">
        <div class="swiper-wrapper">
          <div class="select_teachers timeGrid_inherit swiper-slide" v-for="(teacher, teacherIndex) in rows" :key="teacherIndex">
            <div class="teacherInfo">
              <router-link :to="`/teachers/${teacher.id}`"><img :src="teacher.face_img5" alt=""></router-link>
              <ul>
                <li class="pinyin">{{teacher.name_pinyin}}</li>
                <li class="name">{{ teacher.name_cn }}<span class="teacherID">ID:{{teacher.id}}</span></li>
                <li>{{ teacher.province_addr }}{{ teacher.current_address }}</li>
                <li v-if="teacher.learn_type == 0">日本語{{ teacher.japanese_level }}{{maps['japanese_level'][teacher.japanese_level]}} 英語{{ teacher.english_level }}{{maps['english_level'][teacher.english_level]}}</li>
                <li v-else>{{teacher.topic_str}} {{teacher.dialect}}</li>
<!--                <li>{{ teacher.integral_rank }}ポイント</li>-->
              </ul>
              <p class="favorite" @click="addBookmark(teacher.id)">
                  <span><img :src="useStore?.studentInfo?.bteachers?.includes(teacher.id) ? IconHeart : IconHeartNone" alt="" />お気に入り</span>
              </p>
              <ul class="teacherLabels">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="timeGridWrap scroll_bar scroll_transbg">
              <ul class="timeGrid">
                <li v-for="(time, spanIndex) in teacher.times" :key="spanIndex"  @click="selectTime(teacher.id,time.lesson_unixtime)" :class="time.is_reserved == 1 || time.status == 0 ? 'lesson_disabled' : ''">
<!--                  <router-link :to="`/confirm-${teacher.id}/${time.lesson_datetime}`"></router-link>-->
                  {{ spanIndex }}</li>
              </ul>
            </div>
          </div>
          <n-pagination size="large" style="margin-top:10px;" :item-count="total" :page="page"
                        :on-update:page="handlePageChange" />
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>

      <!--   トライアルウィンドウを閉じる   -->
    </div>
      <!--  trial_contents_wrap FlexCenter -->

    <div style="height: 90px; width: 100%"></div>

  </div>
  <use-plan v-if="usePlanshow" :parameters="parameters" @changeEvent="changeShow"></use-plan>
</template>


<script setup>

// definePageMeta({
//   // middleware: "auth",
//   // layout: "mypage",
// });

import IconHeart from "../assets/SVG/icon_heart.svg";
import IconHeartNone from "../assets/SVG/icon_heart_none.svg";
import { register } from "swiper/element/bundle";
import {addBookmark,formatDate} from "~/composables/useUtil";
import {
  NPagination
} from "naive-ui"
import {usePage} from "~/composables/usePage";
import {useIndexListDataApi} from "~/apis";
import {useMainStore} from "~/composables/store";

register();

// デフォルトのデータ
const show = ref(false);
const isTeacherDataLoaded = ref(false);
const day = ref(formatDate(new Date()));
const days = ref([]);
// const times = ref([]);
const limitedDays = ref([]);
const rows = ref([]);
const total = ref(0);
const page = ref(1);
const page_data = ref({});
let parameters = ref('');
let usePlanshow = ref(false);
let maps = ref([]);

// 1番目は「今日」、2番目は「明日」、3番目は「明後日」と表示するためのメソッド
const getDayLabel = (index) => {
  if (index === 0) return "今日";
  if (index === 1) return "明日";
  if (index === 2) return "明後日";
};

const useStore = useMainStore();

const reservation = async () => {
  let res2 = await usePage(() => {
    return useIndexListDataApi({search_day:day.value,get_count:true,page:page.value})
  })
  // console.log('res2:'+JSON.stringify(res2));
  if (res2 !== null && res2 !== undefined ) {
    page_data.value = res2?.data.value ?? [];
    rows.value = res2?.rows.value ?? [];
    total.value = res2?.total.value ?? [];
    days.value = page_data?.value.days ?? [];
    // times.value = page_data?.value.times ?? [];
    // console.log('rows:'+JSON.stringify(rows));

    // 最初の3つの日付のみを取得するcomputedプロパティ
    limitedDays.value = days.value.slice(0, 3);
    isTeacherDataLoaded.value = true;
    maps.value = res2?.data.value.maps ?? [];
    // const token = useCookie("token");
    // console.log('token:'+JSON.stringify(token.value));
  }

}
reservation();

function handleClickDate(date) {
  day.value = date;
  reservation();
}

function handlePageChange(p) {
  page.value = p;
  reservation();
}

function selectTime(teacher_id,time) {
  parameters.value = teacher_id+'_'+time;
  usePlanshow.value = true;
  console.log('time:'+time);
  console.log('usePlanshow:'+usePlanshow.value);
}

function changeShow() {
  usePlanshow.value = false;
  console.log('changeshow');
}
</script>

<style scoped>
swiper-container::part(button-next),
swiper-container::part(button-prev) {
  color: #fff;
}

.timeGrid_inherit .timeGrid.vIf li {
  position: relative;
  z-index: 1;
}
.timeGrid_inherit .timeGrid.vIf li a {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 2;
}
</style>