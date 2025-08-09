<template>
    <div class="mypageTemplate">
      <div v-if="useStore?.studentInfo?.is_corporate_member !== 1">
            <div>
              <img v-if="useStore?.studentInfo?.pay_plans_img" :src="useStore?.studentInfo?.pay_plans_img" class="eventBlock"/>
            </div>
      </div>

      <div class="blockW">
        <p class="headline">予約中のレッスン</p>
        <!--        手机端-->
        <div class="reservedList mobiletimetable">
          <swiper-container navigation="true">
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(0, 3)" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,0,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(3, 6)" :class="searchDayIndex == index+3 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,1,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(6, 9)" :class="searchDayIndex == index+6 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,2,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(9, 12)" :class="searchDayIndex == index+9 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,3,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(12, 15)" :class="searchDayIndex == index+12 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,4,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(15, 18)" :class="searchDayIndex == index+15 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,5,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(18, 21)" :class="searchDayIndex == index+18 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,6,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
          </swiper-container>

        </div>
        <!--        pc端-->
        <div class="reservedList pc">
          <swiper-container navigation="true">
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(0, 7)" :class="searchDayIndexPc == index ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,0,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(7, 14)" :class="searchDayIndexPc == index+7 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,1,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(14, 21)" :class="searchDayIndexPc == index+14 ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,2,index)">
                  <span>{{ memberDay.md }}</span>
                  <span>{{ memberDay.week }}({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
          </swiper-container>

        </div>

        <div>
          <!-- 如果有資料 -->
          <div v-if="pending_lessons.length > 0">
            <div v-for="(lesson, lindex) in pending_lessons" :key="lesson.id">
              <NuxtLink :to="`/mypage/lesson/${lesson.id}`">
                <div class="reserved_Teacher_Wrap reservedLesson">
                  <div class="corner-ribbon-wrapper">
                    <div class="corner-ribbon">
                      <span v-if="lesson.lesson_type === 0">月額プラン</span>
                      <span v-else-if="lesson.lesson_type === 1">チケット</span>
                      <span v-else-if="lesson.lesson_type === 2">返却コマ</span>
                    </div>
                  </div>
                  <ul class="reserved_Teacher_Time">
                    <li>{{lesson.lesson_start_datetime}}～{{lesson.lesson_end_datetime}}<span class="timezone"><span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span><span v-else>（UTC+9 日本時間）</span></span></li>
                  </ul>
                  <div class="teacherInfo">
                      <a :href="'/teachers/'+lesson.teacher_id">
                        <div class="teacherPhoto">
<!--                          <div class="cnRibbon"></div>-->
                        <span v-if="lesson.learn_type == 0" class="tagL">総合</span>
                        <span v-else class="tagS">会話</span>
                        <img :src="lesson.face_img5" alt="" class="tphoto">
                        </div>
                      </a>
                    <ul>
                      <li class="pinyin">{{lesson.teacher_name_pinyin}}</li>
                      <li class="name">{{ lesson.teacher_name_cn }}
                        <span class="teacherID">ID:{{lesson.teacher_id}}</span></li>
                      <li class="cityT">{{lesson.province_addr}}{{lesson.current_address}}</li>

                      <li v-if="lesson.learn_type == 0">
                        <span class="sptitle">日本語</span>
                        <span class="spdes">{{lesson.japanese_level}}{{maps['japanese_level'][lesson.japanese_level]}}</span>
                      </li>
                      <li v-else>
                        <span class="sptitle">業界の得意分野</span>
                        <span class="spdes">{{ lesson.topic_str }}</span>
                      </li>
                      <li v-if="lesson.learn_type == 0">
                        <span class="sptitle">英語</span>
                        <span class="spdes">{{lesson.english_level}}{{maps['english_level'][lesson.english_level]}}</span>
                      </li>
                      <li v-else>
                        <span class="sptitle">対応可能な方言</span>
                        <span class="spdes">{{ lesson.dialect }}</span>
                      </li>
                    </ul>
                    <p class="favorite" @click="addBookmark(lesson.teacher_id)">
              <span>
                <img :src="useStore?.studentInfo?.bteachers?.includes(lesson.teacher_id) ? IconHeart : IconHeartNone" alt="" /> お気に入り
              </span>
                    </p>
                  </div>
                  <span class="arrowContent">詳細を見る</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- 如果沒有資料 -->
          <div v-else>
            <p class="no-lesson">予約中のレッスンはありません。</p>
          </div>
        </div>


      </div>

      <div class="blockW">
        <div style="position: relative;">
      <p class="headline">受講済のレッスン</p>
        <p class="text_right">レッスン終了後24時間以内に評価できます。</p>
        </div>
      <div v-if="alltotal" v-for="(clesson,cindex) in allrows" :class="{ allowsDiv: cindex === 0 }">
        <nuxt-link v-if="clesson.is_operate" :to="`/mypage/lesson/${clesson.id}`">
          <div class="reserved_Teacher_Wrap CompletedFirst commentBG">
            <div class="corner-ribbon-wrapper">
              <div class="corner-ribbon">
                <span v-if="clesson.lesson_type === 0">月額プラン</span>
                <span v-else-if="clesson.lesson_type === 1">チケット</span>
                <span v-else-if="clesson.lesson_type === 2">返却コマ</span>
              </div>
            </div>
          <ul class="reserved_Teacher_Time">
            <li>
              <span class="datetime">{{clesson.lesson_datetime}}</span>
              {{clesson.lesson_start_datetime}}～{{clesson.lesson_end_datetime}}
              <span class="timezone"><span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span><span v-else>（UTC+9 日本時間）</span></span>
            </li>
          </ul>
          <div class="teacherInfo">
            <a :href="'/teachers/'+clesson.teacher_id">
              <div class="teacherPhoto">
<!--                <div class="cnRibbon"></div>-->
                <span v-if="clesson.learn_type == 0" class="tagL">総合</span>
                <span v-else class="tagS">会話</span>
                <img :src="clesson.face_img5" alt="" class="tphoto">
              </div>
            </a>
            <ul>
              <li class="pinyin">{{clesson.teacher_name_pinyin}}</li>
              <li class="name">{{ clesson.teacher_name_cn }}
              <span class="teacherID">ID:{{clesson.teacher_id}}</span></li>
              <li class="cityT">{{clesson.province_addr}}{{clesson.current_address}}</li>
              <li v-if="clesson.learn_type == 0">
                <span class="sptitle">日本語</span>
                <span class="spdes">{{clesson.japanese_level}}{{maps['japanese_level'][clesson.japanese_level]}}</span>
              </li>
              <li v-else>
                <span class="sptitle">業界の得意分野</span>
                <span class="spdes">{{ clesson.topic_str }}</span>
              </li>
              <li v-if="clesson.learn_type == 0">
                <span class="sptitle">英語</span>
                <span class="spdes">{{clesson.english_level}}{{maps['english_level'][clesson.english_level]}}</span>
              </li>
              <li v-else>
                <span class="sptitle">対応可能な方言</span>
                <span class="spdes">{{ clesson.dialect }}</span>
              </li>

            </ul>
          </div>
            <span class="arrowContent">評価を書く</span>
        </div>
        </nuxt-link>
        <nuxt-link v-else>
          <div class="reserved_Teacher_Wrap CompletedFirst">
            <div class="corner-ribbon-wrapper">
              <div class="corner-ribbon">
                <span v-if="clesson.lesson_type === 0">月額プラン</span>
                <span v-else-if="clesson.lesson_type === 1">チケット</span>
                <span v-else-if="clesson.lesson_type === 2">返却コマ</span>
              </div>
            </div>
          <ul class="reserved_Teacher_Time">
            <li>
              <span class="datetime">{{clesson.lesson_datetime}}</span>
              {{clesson.lesson_start_datetime}}～{{clesson.lesson_end_datetime}}
              <span class="timezone"><span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span><span v-else>（UTC+9 日本時間）</span></span></li>
          </ul>
          <div class="teacherInfo">
            <a :href="'/teachers/'+clesson.teacher_id">
              <div class="teacherPhoto">
<!--                <div class="cnRibbon"></div>-->
                <span v-if="clesson.learn_type == 0" class="tagL">総合</span>
                <span v-else class="tagS">会話</span>
                <img :src="clesson.face_img5" alt="" class="tphoto">
              </div>
            </a>
            <ul>
              <li class="pinyin">{{clesson.teacher_name_pinyin}}</li>
              <li class="name">{{ clesson.teacher_name_cn }}
                <span class="teacherID">ID:{{clesson.teacher_id}}</span></li>
              <li class="cityT">{{clesson.province_addr}}{{clesson.current_address}}</li>
              <li v-if="clesson.learn_type == 0">
                <span class="sptitle">日本語</span>
                <span class="spdes">{{clesson.japanese_level}}{{maps['japanese_level'][clesson.japanese_level]}}</span>
              </li>
              <li v-else>
                <span class="sptitle">業界の得意分野</span>
                <span class="spdes">{{ clesson.topic_str }}</span>
              </li>
              <li v-if="clesson.learn_type == 0">
                <span class="sptitle">英語</span>
                <span class="spdes">{{clesson.english_level}}{{maps['english_level'][clesson.english_level]}}</span>
              </li>
              <li v-else>
                <span class="sptitle">対応可能な方言</span>
                <span class="spdes">{{ clesson.dialect }}</span>
              </li>

            </ul>
          </div>
        </div>
        </nuxt-link>
      </div>
      <div v-else><p class="no-lesson">受講済みのレッスンはありません。</p></div>
      <n-pagination size="large" :item-count="alltotal" :page="page" :page-size="limit"
                    :on-update:page="handlePageChange" />
      </div>

      </div>


  <NuxtLink v-if="studentInfo.length > 0 && studentInfo.is_corporate_member == 1 && studentInfo.corporate_member_payment_method == 0" to="/mypage/roadmap" >
    <picture>
      <source srcset="~/assets/SVG/roadmap_button_sp.svg" media="(max-width: 520px)" type="image/svg+xml">
      <img src="~/assets/SVG/roadmap_button.svg" alt=”学習ロードマップ” class="roadmap_button">
    </picture>
  </NuxtLink>
     </template>


<script setup>

import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import {usePage} from "~/composables/usePage";
import { register } from "swiper/element/bundle";
import {useCompletedLessonListApi, useStudentIndexDataApi} from "~/apis/student";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {NPagination} from "naive-ui";
import {useMainStore} from "~/composables/store";
import { useHomeTeacherListDataApi } from '~/apis';
register();

const pending_lessons = ref([]);
let searchDay = ref(formatDate(new Date()));
const memberDays = ref([]);
const times = ref([]);
let searchDayIndex = ref(0);
let searchDayIndexPc = ref(0);
let alltotal = ref(0);
let limit = ref(10);
let page = ref(1);
let allrows = ref([]);
const studentInfo = ref([]);
let maps = ref([]);
const useStore = useMainStore();
const contractStatus = useStore.contract_status;


const completedLesson = async () => {
  let {
    pending,
    data,
    error,
    rows,
    total
    // refresh
  } = await usePage(() => {
    return useCompletedLessonListApi({
      per_page: limit.value,
      page: page?.value || 1,
      get_count: true,
    })
  })
  if (data?.value) {
    allrows.value = rows?.value ?? [];
    alltotal.value = total?.value ?? 0;
  }
}

const getStudentInfo = async() => {
  const { data: lists } = await useStudentIndexDataApi(searchDay.value);
  // console.log('lists:'+JSON.stringify(lists));
  if (lists?.value) {
    if (!useStore?.studentInfo?.monthly_plan_id && useStore?.studentInfo?.contract_status == 'Trial' && useStore?.studentInfo?.is_corporate_member === 0) {
      navigateTo("/mypage/mypage",{ replace: true });
    } else {
      memberDays.value = lists?.value?.days ?? [];
      times.value = lists?.value?.times ?? [];
      //预约的课程
      pending_lessons.value = lists?.value?.pending_lessons ?? [];
      studentInfo.value = lists?.value?.info ?? [];
      maps.value = lists?.value?.maps ?? [];
      await completedLesson();
    }
  }
}

// getStudentInfo();
const changeDay = (day,pindex,indexd) => {
  searchDay.value = day;
  searchDayIndex.value = pindex*3+indexd;
  searchDayIndexPc.value = pindex*7+indexd;
  getStudentInfo();
}

onMounted(() => {
  getStudentInfo();
});

function handlePageChange(p) {
  page.value = p;
  completedLesson();
}

function changePage(path) {
  useStore.setActiveUrl(path)
  navigateTo(path,{ replace: true });
}
</script>

<style scoped>
.n-pagination{
  margin: 20px auto 0 auto;
  width: fit-content;
}
.teacherInfo .favorite{
  left: 0;
}
.teacherPhoto{
  margin-left: 0;
}
swiper-container::part(button-next),
swiper-container::part(button-prev) {
  color: #fff;
}
.reserved_Teacher_Wrap .teacherInfo .favorite img{
  margin-top: 0;
}
.mobiletimetable{
  display: none;
}
.no-lesson{
  background-color: rgb(249, 249, 249);
  padding: 20px;
  text-align: center;
}
.eventBlock_m{
  display: none;
}
.commentBG{
  background-color: #FFF9EC;
  border-bottom: 1px solid #EEEEEE;
  position: relative;
}
.teacherInfo a{
  display: inline-block;
  width: 110px;
}
.teacherInfo{
  grid-template-columns:0.2fr 1.6fr;
}

.arrowContent {
  background-image: url("../../assets/images/toppage_arrow.png");
  background-repeat: no-repeat;
  background-size: 27px;
  height: 45px;
  display: block;
  position: absolute;
  right: 50px;
  color: #FF8F3E;
  font-size: 10px;
  text-align: center;
  background-position: center top;
  line-height: 35px; /* 讓文字垂直對齊 */
  padding-top: 22px; /* 根據需要調整 */
  vertical-align: bottom;
  margin-top: 24px;
}
.reserved_Teacher_Wrap{
  position: relative;
}
.text_right{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 11px;
  color: #acacac;
}
.teacherInfo ul{
  width: 210px;
}

@media screen and (max-width: 520px) {
  .teacherInfo>a>img{
    margin-left: 0;
  }
  .mobiletimetable{
    display: block;
  }
  .eventBlock{
    display: none;
  }
  .eventBlock_m{
    display: block;
  }
  .favorite{
    display: none;
  }
  .arrowContent {
    right: auto;
    position: relative;
    background-image: url("../../assets/images/toppage_arrow.png");
    background-repeat: no-repeat;
    background-color: #FFEFCE;
    background-position: right 16px center; /* 背景圖片距右側 20px，垂直居中 */
    background-size: 14px;
    width: 120px;
    border-radius: 30px;
    height: 32px;
    line-height: 33px;
    display: block;
    color: #FF8F3E;
    font-size: 13px;
    font-weight: bold;
    padding-top: 0; /* 根據需要調整 */
    vertical-align: bottom;
    margin: 20px auto;
    text-align: left;
    padding-left: 19px;
  }
  .text_right{
    display: block;
    position: relative;
    margin-top: -8px;
  }
}
</style>