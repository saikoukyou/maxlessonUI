<template>
  <div class="mypageTemplate">
        <p class="headline">予約中のレッスン</p>
        <div class="reservedList">
          <swiper-container navigation="true">
            <swiper-slide>
              <ul class="OneWeekList">
                <li class="before"></li>
                <li v-for="(memberDay, index) in memberDays.slice(0, 7)" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,0,index)"><span>{{ memberDay.md }}</span><span>{{ memberDay.week }}</span>
                  <span>({{memberDay.num}})</span>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
                <ul class="OneWeekList">
                  <li class="before"></li>
                  <li v-for="(memberDay, index) in memberDays.slice(7, 14)" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,1,index)"><span>{{ memberDay.md }}</span><span>{{ memberDay.week }}</span>
                    <span>({{memberDay.num}})</span>
                  </li>
              </ul>
            </swiper-slide>
            <swiper-slide>
                <ul class="OneWeekList">
                  <li class="before"></li>
                  <li v-for="(memberDay, index) in memberDays.slice(14, 21)" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="changeDay(memberDay.day,2,index)"><span>{{ memberDay.md }}</span><span>{{ memberDay.week }}</span>
                    <span>({{memberDay.num}})</span>
                  </li>
              </ul>
            </swiper-slide>
          </swiper-container>
       

          <div class="reserved_Teacher_Wrap" v-for="(lesson,lindex) in pending_lessons">
            <ul class="reserved_Teacher_Time">
<!--              <li>11/5</li>-->
<!--              <li>(金)</li>-->
              <li>{{lesson.lesson_start_datetime}}～{{lesson.lesson_end_datetime}}
                <span class="timezone">（UTC+9 日本時間）</span></li>
            </ul>
            <div class="teacherInfo">
              <a :href="'/teachers/'+lesson.teacher_id"><img :src="lesson.face_img5" alt="" class=""></a>
              <ul>
                <li class="pinyin">{{lesson.teacher_name_pinyin}}</li>
                <li class="name">{{ lesson.teacher_name_cn }}<span class="teacherID">ID:{{lesson.teacher_id}}</span></li>
                <li>{{lesson.province_addr}}{{lesson.current_address}}</li>
                <li v-if="lesson.learn_type == 0">日本語{{lesson.japanese_level}}{{maps['japanese_level'][lesson.japanese_level]}}　英語{{lesson.english_level}}{{maps['english_level'][lesson.english_level]}}</li>
                <li v-else>{{lesson.topic_str}} {{lesson.dialect}}</li>
<!--                <li>{{lesson.integral_rank}}ポイント</li>-->
              </ul>
              <p class="favorite" @click="addBookmark(lesson.teacher_id)"><span><img :src="useStore?.studentInfo?.bteachers?.includes(lesson.teacher_id) ? IconHeart : IconHeartNone" alt="" /> お気に入り</span></p>
              <ul class="teacherLabels">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>

        <div style="height: 80px;"></div>
        <p class="headline">受講済のレッスン</p>
        <div v-for="(clesson,cindex) in allrows" :class="{ allowsDiv: cindex === 0 }">
          <nuxt-link v-if="clesson.is_operate" :to="`/mypage/lesson/${clesson.id}`">
        <div class="reserved_Teacher_Wrap CompletedFirst">
          <ul class="reserved_Teacher_Time">
            <li class="dateTime">{{clesson.lesson_datetime}}</li>
            <li>{{clesson.lesson_start_datetime}}～{{clesson.lesson_end_datetime}}<span class="timezone">（UTC+9 日本時間）</span></li>
          </ul>
          <div class="teacherInfo">
            <a :href="'/teachers/'+clesson.teacher_id"><img :src="clesson.face_img5" alt="" class="tphoto"></a>
            <ul>
              <li class="pinyin">{{clesson.teacher_name_pinyin}}</li>
              <li class="name">{{ clesson.teacher_name_cn }}<span class="teacherID">ID:{{clesson.teacher_id}}</span></li>
              <li>{{clesson.province_addr}}{{clesson.current_address}}</li>
              <li v-if="clesson.teacher_learn_type == 0">日本語{{clesson.japanese_level}}{{maps['japanese_level'][clesson.japanese_level]}}　英語{{clesson.english_level}}{{maps['english_level'][clesson.english_level]}}</li>
              <li v-else>{{clesson.teacher_topic_str}} {{clesson.teacher_dialect}}</li>
<!--              <li>{{clesson.integral_rank}}ポイント</li>-->
            </ul>
            <p class="favorite" @click="addBookmark(clesson.teacher_id)"><span><img :src="useStore?.studentInfo?.bteachers?.includes(clesson.teacher_id) ? '~/assets/SVG/icon_heart.svg' : '~/assets/SVG/icon_heart_none.svg'" alt="" /> お気に入り</span></p>
            <ul class="teacherLabels">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
          </nuxt-link>
          <nuxt-link v-else>
            <div class="reserved_Teacher_Wrap CompletedFirst">
            <ul class="reserved_Teacher_Time">
              <li>{{clesson.lesson_datetime}}</li>
              <!--            <li>(金)</li>-->
              <li>{{clesson.lesson_start_datetime}}～{{clesson.lesson_end_datetime}}<span class="timezone">（UTC+9 日本時間）</span></li>
            </ul>
            <div class="teacherInfo">
              <ul>
                <li class="pinyin">{{clesson.teacher_name_pinyin}}</li>
                <li class="name">{{ clesson.teacher_name_cn }}<span class="teacherID">ID:{{clesson.teacher_id}}</span></li>
              </ul>
            </div>
          </div>
          </nuxt-link>
      </div>
        
        <n-pagination size="large" style="margin-top:10px;" :item-count="alltotal" :page="page" :page-size="limit"
                      :on-update:page="handlePageChange" />

      <div style="height: 80px;"></div>


      <div style="height: 200px;"></div>
  </div>
  <NuxtLink v-if="user && user.is_corporate_member == 1 && user.corporate_member_payment_method == 0" to="/mypage/roadmap" >
    <picture>
      <source srcset="~/assets/SVG/roadmap_button_sp.svg" media="(max-width: 520px)" type="image/svg+xml">
      <img src="~/assets/SVG/roadmap_button.svg" alt=”学習ロードマップ” class="roadmap_button">
    </picture>
  </NuxtLink>
     </template>


<script setup>
import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import {useCompletedLessonListApi, useStudentIndexDataApi} from "~/apis/student";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {usePage} from "~/composables/usePage";
import {NPagination} from "naive-ui";
import {useMainStore} from "~/composables/store";
import {onMounted} from "vue";
import {register} from "swiper/element";

register();

const pending_lessons = ref([]);
let searchDay = ref(formatDate(new Date()));
const memberDays = ref([]);
const times = ref([]);
let searchDayIndex = ref(0);
let alltotal = ref(0);
let limit = ref(10);
let page = ref(1);
let allrows = ref([]);
let maps = ref([]);
const useStore = useMainStore();
const user = useStore.studentInfo;

const getStudentInfo = async() => {
  const { data: lists, refresh,error } = await useStudentIndexDataApi(searchDay.value);
  if (lists?.value) {
    memberDays.value = lists?.value.days ?? [];
    times.value = lists?.value.times ?? [];
    //预约的课程
    pending_lessons.value = lists?.value.pending_lessons ?? [];
    maps.value = info?.value.maps ?? [];
  }
}

onMounted(() => {
  getStudentInfo();
})

const changeDay = (day,pindex,indexd) => {
  searchDay.value = day;
  searchDayIndex.value = pindex*7+indexd;
  getStudentInfo();
}

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
completedLesson();

function handlePageChange(p) {
  page.value = p;
  completedLesson();
}
</script>

<style scoped>
.mypageTemplate .allowsDiv {
  border-top: 1px solid #F2B705;
}

</style>