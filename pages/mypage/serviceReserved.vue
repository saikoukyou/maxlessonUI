<template>
    <div class="mypageTemplate">
      <div class="blockW">
      <p class="headline">予約中のカウンセリング</p>
      <div class="reservedList">
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

        <div class="reserved_Teacher_Wrap" v-for="(lesson,lindex) in pending_lessons" @click="gotoInfo(lesson.id)">
          <ul class="reserved_Teacher_Time">
            <li>{{lesson.lesson_start_datetime}}～{{lesson.lesson_end_datetime}}
              <span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span>
              <span v-else class="timezone">（UTC+9 日本時間）</span>
            </li>
          </ul>
          <div class="teacherInfo">
            <a :href="'/teachers/'+lesson.teacher_id"><img :src="lesson.face_img5" alt="" class=""></a>
            <ul>
              <li class="pinyin">{{lesson.teacher_name_pinyin}}</li>
              <li class="name">{{ lesson.teacher_name_cn }}
                <span class="teacherID">ID:{{lesson.teacher_id}}</span></li>
              <li class="cityT">{{lesson.province_addr}}{{lesson.current_address}}</li>
              <li class="jpT">日本語{{lesson.japanese_level}}{{maps['japanese_level'][lesson.japanese_level]}}</li>
              <li class="enT">英語{{lesson.english_level}}{{maps['english_level'][lesson.english_level]}}</li>
<!--              <li>{{lesson.integral_rank}}ポイント</li>-->
            </ul>
            <ul class="teacherLabels">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>


      <p class="headline">受講済のカウンセリング</p>
      <div v-for="(clesson,cindex) in allrows" :class="{ allowsDiv: cindex === 0 }">
        <nuxt-link :to="`/mypage/lesson/${clesson.id}`">
          <div class="reserved_Teacher_Wrap CompletedFirst">
          <ul class="reserved_Teacher_Time">
            <li class="dateTime">{{clesson.lesson_datetime}}</li>
            <li>{{clesson.lesson_start_datetime}}～{{clesson.lesson_end_datetime}}
              <span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span>
              <span v-else class="timezone">（UTC+9 日本時間）</span>
            </li>
          </ul>
          <div class="teacherInfo">
            <a :href="'/teachers/'+clesson.teacher_id"><img :src="clesson.face_img5" alt="" class="tphoto"></a>
            <ul>
              <li class="pinyin">{{clesson.teacher_name_pinyin}}</li>
              <li class="name">{{ clesson.teacher_name_cn }}<span class="teacherID">ID:{{clesson.teacher_id}}</span></li>
<!--              <li>{{clesson.province_addr}}{{clesson.current_address}}</li>-->
<!--              <li>日本語{{clesson.japanese_level}}{{maps['japanese_level'][clesson.japanese_level]}}　英語{{clesson.english_level}}{{maps['english_level'][clesson.english_level]}}</li>-->
            </ul>
          </div>
        </div>
        </nuxt-link>
<!--        <nuxt-link>-->
<!--          <div class="reserved_Teacher_Wrap CompletedFirst">-->
<!--          <ul class="reserved_Teacher_Time">-->
<!--            <li class="dateTime">{{clesson.lesson_datetime}}</li>-->
<!--            &lt;!&ndash;            <li>(金)</li>&ndash;&gt;-->
<!--            <li>{{clesson.lesson_start_datetime}}～{{clesson.lesson_end_datetime}}-->
<!--              <span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国时间）</span>-->
<!--              <span v-else class="timezone">（UTC+9 日本時間）</span>-->
<!--            </li>-->
<!--          </ul>-->
<!--          <div class="teacherInfo">-->
<!--            <a :href="'/teachers/'+clesson.teacher_id"><img :src="clesson.face_img5" alt="" class="tphoto"></a>-->
<!--            <ul>-->
<!--              <li class="pinyin">{{clesson.teacher_name_pinyin}}</li>-->
<!--              <li class="name">{{ clesson.teacher_name_cn }}<span class="teacherID">ID:{{clesson.teacher_id}}</span></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--        </nuxt-link>-->
      </div>
      <n-pagination size="large" style="margin-top:10px;" :item-count="alltotal" :page="page" :page-size="limit"
                    :on-update:page="handlePageChange" />
      </div>
    </div>

     </template>


<script setup>
import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import {usePage} from "~/composables/usePage";

definePageMeta({
  // middleware: ['reservation-auth'],
  // layout: 'mypage'
});

import { register } from "swiper/element/bundle";
import {
  useServiceCompleteListApi, useServiceIndexListApi,
} from "~/apis/student";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {NPagination} from "naive-ui";
import {onMounted, ref} from "vue";
import {useMainStore} from "~/composables/store";
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
    return useServiceCompleteListApi({
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

const getInfo = async() => {
  const { data: lists, refresh,error } = await useServiceIndexListApi(searchDay.value);
  // console.log('lists:'+JSON.stringify(lists));
  if (lists.value !== null && lists.value !== undefined) {
    if (!useStore?.studentInfo?.monthly_plan_id && useStore?.studentInfo?.contract_status == 'Trial' && useStore?.studentInfo?.is_corporate_member === 0) {
      useStore.setActiveUrl("/mypage/mypage");
      navigateTo("/mypage/mypage",{ replace: true });
    } else {
      memberDays.value = lists?.value.days ?? [];
      times.value = lists?.value.times ?? [];
      //预约的课程
      pending_lessons.value = lists?.value.pending_lessons ?? [];
      studentInfo.value = lists?.value.info ?? [];
      maps.value = lists?.value.maps ?? [];
      await completedLesson();
    }
  }
}

const changeDay = (day,pindex,indexd) => {
  searchDay.value = day;
  searchDayIndex.value = pindex*3+indexd;
  searchDayIndexPc.value = pindex*7+indexd;
  getInfo();
}

onMounted(() => {
  getInfo();
})

function handlePageChange(p) {
  page.value = p;
  completedLesson();
}

function gotoInfo(id) {
  navigateTo({path:'/mypage/decisionService',query:{
      id: id,
    }}, { replace: true })
}
</script>

<style scoped>
.mypageTemplate .allowsDiv {
  border-top: 1px solid #F2B705;
}
.reservedList{
  margin-bottom: 40px;
}
.reserved_Teacher_Wrap{
  cursor: pointer;
}
.mobiletimetable{
  display: none;
}
.dateTime{
  margin: auto;
}
@media screen and (max-width: 520px) {
  .teacherInfo>a>img{
    margin-left: 0;
  }
  .mobiletimetable{
    display: block;
  }
}

</style>