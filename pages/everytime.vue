<template>
  <LoadingGroup :pending="pending">
    <section class="PlanPrice">
      <div class="subPosition">
        <span class="subTitle">講師一覧</span>
      </div>
    </section>

    <div class="course-image-wrapper">
    <!-- 背景圖區塊 -->
    <div class="bg_learn" v-if="learnType === 0">
      <div class="course-book learning">
        <h2>総合コース講師一覧</h2>
        <p>日本語対応可、文法・会話・ビジネス・HSK対策などを担当</p>
        <NuxtLink
            v-if="useStore?.studentLoggedIn"
            :to="{ path: '/timetable', query: { learn_type: 0 } }"
        >
          <img :src="IconSelectT" class="select-img" />
        </NuxtLink>
      </div>
    </div>

    <div class="bg_con" v-else-if="learnType === 1">
      <div class="course-book conversation">
        <h2>会話コース講師一覧</h2>
        <p>中国各地のネイティブ講師と「中国語のみ」でリアルな会話</p>
        <NuxtLink
            v-if="useStore?.studentLoggedIn"
            :to="{ path: '/timetable', query: { learn_type: 1 } }"
        >
          <img :src="IconSelectT" class="select-img" />
        </NuxtLink>
      </div>
    </div>
    </div>


    <section class="contentsWrap searchTeacher">
<!--      <div class="titlePosition">-->
<!--        <span class="timetableTitle">予約・講師検索</span>-->
<!--        <NuxtLink to="/timetable">-->
<!--        <img src="~/assets/images/searchbytime.png" alt="" class="icon_selectL"></NuxtLink>-->
<!--      </div>-->


    <div class="everytime">

<!--      <div class="Point selectdiv PointEverytime">-->
<!--        <span>必要ポイント数</span>-->
<!--        <div class="PointSpGrid">-->
<!--          <div>-->
<!--            <input type="radio" name="point" value="0" v-model="integralRank" id="allpoint" :checked="integralRank == 0">-->
<!--            <label for="allpoint" class="label">すべて</label></div>-->
<!--            <div v-for="(itemi, indexi) in integral_rands">-->
<!--              <input type="radio" name="point" :value="itemi" v-model="integralRank" :checked="integralRank == itemi" :id="itemi+'point'">-->
<!--              <label :for="itemi+'point'" class="label">{{itemi}}ポイント</label>-->
<!--            </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="SwitchRadio1" style="text-align: left;">-->
<!--        <input class="visually-hidden" id="bookmark" type="checkbox" name="bookmark" v-model="bookmark" />-->
<!--        <label for="bookmark">お気に入り講師のみ指定</label>-->
<!--      </div>-->
      <div v-if="learnTypeShow" class="learn-type-div">
        <span>講師の種類</span>
        <span>
                <input type="radio" id="learn_type1" name="learn_type" value="2" v-model="learnType" :checked="learnType === 2" placeholder="全部" />
                <label for="learn_type1">全て</label>
                <input type="radio" id="learn_type2" name="learn_type" value="0" v-model="learnType" :checked="learnType === 0" placeholder="学习" />
                <label for="learn_type1">学習講師</label>
                <input type="radio" id="learn_type3" name="learn_type" value="1" v-model="learnType" :checked="learnType === 1" placeholder="会话"/>
                <label for="learn_type1">会話講師</label>
              </span>
      </div>
    </div>
    <div v-if="learnTypeShow" class="submitLayout">
      <button type="submit" @click="submitForm" class="Submit_search">この条件で検索</button>
      <span class="clearSelect" @click="clearForm">検索条件クリア</span>
    </div>


      <div class="reservedList mobiletimetable">
        <swiper-container navigation="true">
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(0, 3)" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="changeDay(day.day,0,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(3, 6)" :class="searchDayIndex == index+3 ? 'selected' : ''" :key="index" @click="changeDay(day.day,1,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(6, 9)" :class="searchDayIndex == index+6 ? 'selected' : ''" :key="index" @click="changeDay(day.day,2,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(9, 12)" :class="searchDayIndex == index+9 ? 'selected' : ''" :key="index" @click="changeDay(day.day,3,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(12, 15)" :class="searchDayIndex == index+12 ? 'selected' : ''" :key="index" @click="changeDay(day.day,4,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(15, 18)" :class="searchDayIndex == index+15 ? 'selected' : ''" :key="index" @click="changeDay(day.day,5,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(18, 21)" :class="searchDayIndex == index+18 ? 'selected' : ''" :key="index" @click="changeDay(day.day,6,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
        </swiper-container>
      </div>
      <div class="reservedList pc">
        <swiper-container navigation="true">
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(0, 7)" :class="searchDayIndexPc == index ? 'selected' : ''" :key="index" @click="changeDay(day.day,0,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(7, 14)" :class="searchDayIndexPc == index+7 ? 'selected' : ''" :key="index" @click="changeDay(day.day,1,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in days.slice(14, 21)" :class="searchDayIndexPc == index+14 ? 'selected' : ''" :key="index" @click="changeDay(day.day,2,index)">{{ day.md }}<span>{{day.week}}</span></li>
            </ul>
          </swiper-slide>
        </swiper-container>
      </div>

      <div class="zoneDivInner">
        <div class="leftDiv"></div>
        <div class="rightDiv">
          <div v-if="useStore?.studentLoggedIn">
            <label>タイムゾーン設定</label>
            <select id="zone_select" v-model="timezone" @change="changeStudentTimezone">
              <option value="jp" data-number="0">日本時間</option>
              <option value="cn" data-number="1">中国時間</option>
            </select>
          </div>
        </div>
      </div>
    <div class="select_everytime">
      <div class="timeTitle"><span v-if="useStore?.studentInfo?.timezone === 'cn'">朝（5:00-10:30）</span><span v-else>朝（6:00-11:30）</span></div>
      <ul class="everytimeWrap">
        <li v-for="(time,ikey) in times.slice(0, 12)" :class="list[searchDay+' '+time+':00'] ? '' : 'none'" @click="selectedTimeTeachers(time,timesCn[ikey])">
          <span>
            <span v-if="useStore?.studentInfo?.timezone === 'cn'">
              <span class="fs18 bkf">{{timesCn[ikey]}}-</span>{{timesCn[ikey].toString().substring(0,3)}}{{timesCn[ikey].toString().substring(3) == '30' ? '55' : '25'}}
            </span>
            <span v-else>
              <span class="fs18 bkf">{{time}}-</span>{{time.toString().substring(0,3)}}{{time.toString().substring(3) == '30' ? '55' : '25'}}
            </span>
          </span>
          <span v-if="list[searchDay+' '+time+':00']">
            <span v-if="list[searchDay+' '+time+':00'].reserve_status == 1" class="reserve few">予約受付中</span>
            <span v-else-if="list[searchDay+' '+time+':00'].reserve_status == 2" class="reserve normal">予約受付中</span>
            <span v-else-if="list[searchDay+' '+time+':00'].reserve_status == 3" class="reserve many">予約受付中</span>
          </span>
          <span v-else>
            <span class="reserve none">予約不可</span>
          </span>
        </li>
      </ul>
      <div class="timeTitle"><span v-if="useStore?.studentInfo?.timezone === 'cn'">昼（11:00-16:30）</span><span v-else>昼（12:00-17:30）</span></div>
      <ul class="everytimeWrap list2">
        <li v-for="(time,fkey) in times.slice(12, 24)" :class="list[searchDay+' '+time+':00'] ? '' : 'none'" @click="selectedTimeTeachers(time,timesCn[fkey+12])">
          <span>
            <span v-if="useStore?.studentInfo?.timezone === 'cn'">
              <span class="fs18 bkf">{{timesCn[fkey+12]}}-</span>{{timesCn[fkey+12].toString().substring(0,3)}}{{timesCn[fkey+12].toString().substring(3) == '30' ? '55' : '25'}}
            </span>
            <span v-else>
              <span class="fs18 bkf">{{time}}-</span>{{time.toString().substring(0,3)}}{{time.toString().substring(3) == '30' ? '55' : '25'}}
            </span>
          </span>
          <span v-if="list[searchDay+' '+time+':00']">
            <span v-if="list[searchDay+' '+time+':00'].reserve_status == 1" class="reserve few">予約受付中</span>
            <span v-else-if="list[searchDay+' '+time+':00'].reserve_status == 2" class="reserve normal">予約受付中</span>
            <span v-else-if="list[searchDay+' '+time+':00'].reserve_status == 3" class="reserve many">予約受付中</span>
          </span>
          <span v-else>
            <span class="reserve none">予約不可</span>
          </span>
        </li>
      </ul>
      <div class="timeTitle"><span v-if="useStore?.studentInfo?.timezone === 'cn'">夜（17:00-23:30）</span><span v-else>夜（18:00-24:30）</span></div>
      <ul class="everytimeWrap list3">
        <li v-for="(time,skey) in times.slice(24, 38)" :class="list[searchDay+' '+time+':00'] ? '' : 'none'" @click="selectedTimeTeachers(time,timesCn[skey+24])">
          <span>
            <span v-if="useStore?.studentInfo?.timezone === 'cn'">
              <span class="fs18 bkf">{{timesCn[skey+24]}}-</span>{{timesCn[skey+24].toString().substring(0,3)}}{{timesCn[skey+24].toString().substring(3) == '30' ? '55' : '25'}}
            </span>
            <span v-else>
              <span class="fs18 bkf">{{time}}-</span>{{time.toString().substring(0,3)}}{{time.toString().substring(3) == '30' ? '55' : '25'}}
            </span>
          </span>
          <span v-if="list[searchDay+' '+time+':00']">
            <span v-if="list[searchDay+' '+time+':00'].reserve_status == 1" class="reserve few">予約受付中</span>
            <span v-else-if="list[searchDay+' '+time+':00'].reserve_status == 2" class="reserve normal">予約受付中</span>
            <span v-else-if="list[searchDay+' '+time+':00'].reserve_status == 3" class="reserve many">予約受付中</span>
          </span>
          <span v-else>
            <span class="reserve none">予約不可</span>
          </span>
        </li>
      </ul>
    </div>

  </section>

  </LoadingGroup>
  <div class="mypageTemplate">
    <!--  レッスントライアルウィンドウ  -->
    <div
        v-show="showTeachers"
        class="trial_contents"
        :class="{ isActive: showTeachers }"
    >
      <!-- トライアルウィンドウの背景 -->
      <div
          v-on:click="
          closeshowTeachers();
        "
          class="trial_contents_bg"
      ></div>
      <!--   トライアルウィンドウの中身   -->
      <div class="trial_contents_wrap">
        <!--   トライアルウィンドウを閉じる   -->
        <span
            v-on:click="
              closeshowTeachers();"
            class="trial_close_btn"><img src="~/assets/SVG/icon_batu.svg" alt="" class="icon_batu" /></span>
        <div style="width: 100%;">
          <EveryTimeTeachers v-if="showTeachers" :day="selectDay" :week="selectWeek" :time="selectTime" :timeCn="selectTimeCn"
                             :timezone="useStore?.studentInfo?.timezone" :searchDay="searchDay" :learnType="learnType" :integralRank="integralRank"
                             :bookmark="bookmark"></EveryTimeTeachers>
        </div>
        <!--  trial_contents_wrap FlexCenter -->
      </div>
      <!--  trial_contents_wrap -->
    </div>
  </div>

</template>

<script setup>

//设置首页标题,举个例子，这里的title就是首页的标题
import {changeTimezone, formatDate} from "~/composables/useUtil";
import {useTimeTeacherListDataApi} from "~/apis";
import { register } from "swiper/element/bundle";
import {onMounted, ref} from "vue";
import {useMainStore} from "~/composables/store";
import { useRoute } from 'vue-router';
import IconSelectT from "../assets/images/searchbytime.png";
const route = useRoute();

useHead({
    title: '予約・講師検索',
    meta: [
        { name: "keywords", content: "BizCHINA,ビズチャイナ,中国語,オンライン中国語,中国語研修,中国語レッスン" },
        { name: "description", content: "オンライン中国語教室で、WeChat、Teamsや独自のWeb教室を使って受講できます。約300名の講師が在籍。朝6時から深夜1時まで。ネット利用に特化した無料教材。1レッスン333円から受講可能。" },
    ]
})

register();

let days = ref([]);
let times = ref([]);
let timesCn = ref([]);
let list = ref([]);
let integral_rands = ref([]);
let searchDayIndex = ref(0);
let searchDayIndexPc = ref(0);
let searchDay = ref(formatDate(new Date()));
let integralRank = ref(0);
let bookmark = ref(false);
let showTeachers = ref();
let selectDay = ref('');
let selectWeek = ref('');
let selectTime = ref('');
let selectTimeCn = ref('');
let learnTypeShow = ref(false);
// let learnType = ref(2);
const useStore = useMainStore();
const learnType = ref(2);
let timezone = ref('jp');
// learnType.value = useStore.learn_type;

// if (learn_type && learn_type.value) {
//   learnType.value = learn_type.value;
// }

if (useStore?.studentLoggedIn) {
  learnType.value = useStore?.learn_type;
  if (useStore.learn_type === 2) {
    learnTypeShow.value = true;
  } else {
    learnTypeShow.value = false;
  }
}

const getTimeTeachers = async () => {
  let { data: info } = await useTimeTeacherListDataApi({
    search_day: formatDate(new Date()),
    search_learn_type : learnType.value == 2 ? '' : learnType.value
  })
// console.log('timelist:'+JSON.stringify(info));
  if (info?.value) {
    days.value = info?.value.days ?? [];
    times.value = info?.value.times ?? [];
    timesCn.value = info?.value.timescn ?? [];
    list.value = info?.value.list ?? [];
    integral_rands.value = info?.value.integral_rands ?? [];
  }
}

onMounted(() => {
  timezone.value = useStore?.studentInfo?.timezone ?? 'jp';

  // 如果 URL 有帶 learn_type，優先使用它
  const queryLearnType = route.query.learn_type;
  if (queryLearnType === '0' || queryLearnType === '1') {
    learnType.value = Number(queryLearnType);
    learnTypeShow.value = false;
  } else {
    // 沒有 query 時，使用 store 預設值
    if (useStore?.studentLoggedIn) {
      learnType.value = useStore?.learn_type ?? 2;
      learnTypeShow.value = useStore?.learn_type === 2;
    } else {
      learnType.value = 2;
      learnTypeShow.value = true;
    }
  }

  // ✅ 只呼叫一次 getTimeTeachers()
  getTimeTeachers();
});


function changeDay(day,pindex,indexd) {
  searchDay.value = day;
  searchDayIndex.value = pindex*3+indexd;
  searchDayIndexPc.value = pindex*7+indexd;
  showTeachers.value = false;
  submitForm();
}

async function submitForm() {
  let query = {};
  if (searchDay.value !== "''") {
    query['search_day'] = searchDay.value;
  } else {
    query['search_day'] = formatDate(new Date());
  }
  if (integralRank.value) {
    query['integral_rank'] = integralRank.value;
  }
  if (bookmark.value) {
    query['bookmark'] = 1;
  }
  if (learnType.value !== 2) {
    query['search_learn_type'] = learnType.value;
  }
  let res2 = await useTimeTeacherListDataApi(query)
  // console.log('res2:'+JSON.stringify(res2));
  // console.log('res2:'+JSON.stringify(res2?.data.value.list));
  list.value = res2?.data?.value?.list ?? [];
}

function clearForm() {
  searchDay.value = "";
  bookmark.value = false;
  integralRank.value = 0;
  // learnType.value = learn_type.value;
}

function selectedTimeTeachers(time,timecn) {
  if (!list.value[searchDay.value+' '+time+':00']) {
    return;
  }
  showTeachers.value = true;
  selectDay.value = days.value[searchDayIndex.value].md;
  selectWeek.value = days.value[searchDayIndex.value].week;
  selectTime.value = time;
  selectTimeCn.value = timecn;

}

function closeshowTeachers() {
  showTeachers.value = false;
}

function changeStudentTimezone() {
  changeTimezone(timezone.value);
}

</script>

<style scoped>
.zoneDivInner{
  background-color: #f9f9f9;
}
.trial_close_btn {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

swiper-container::part(button-next){
  color: rgba(255, 255, 255, 0);
  background-image: url("../assets/images/sw_next.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 0 10px;
}
swiper-container::part(button-prev) {
  color: rgba(255, 255, 255, 0);
  background-image: url("../assets/images/sw_prev.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 9px 10px;
}
.course-image-wrapper{
  height: 168px;
}
.bg_learn{
  width: 100%;
  height: 300px;
  background-image: url("../assets/images/bg_learn.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding-top: 50px;
}
.bg_con{
  width: 100%;
  height: 300px;
  background-image: url("../assets/images/bg_speak.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding-top: 50px;
}
.course-book h2{
  margin-top: 0;
}

@media screen and (max-width: 520px) {
  swiper-container::part(button-next){
    background-size: 46%;
    background-position: 6px 12px;
    margin-right: -12px;
    background-color: #FFAA47;
  }
  swiper-container::part(button-prev) {
    background-size: 46%;
    background-position:3px 12px;
    margin-left: -6px;
    background-color: #FFAA47;
  }
  .contentsWrap{
    padding: 2% 4% 0 4%;
  }
  .course-book h2{
    font-size: 24px;
  }
  .course-book p{
    font-size: 13px;
  }
}

.mobiletimetable{
  display: none;
}
.trial_contents_wrap{
  height: 550px;
}
@media screen and (max-width: 520px) {
  .teacherInfo>a>img{
    margin-left: 0;
  }
  .mobiletimetable{
    display: block;
  }
  .trial_contents_wrap{
    height: 80%;
  }
  .bg_learn{
    width: 100%;
    padding-top:8% !important;
    height: 300px;
    background-image: url("../assets/images/signup_learn.png");
    background-size: 100%;

  }
  .bg_con{
    width: 100%;
    padding-top: 8%;
    height: 300px;
    background-image: url("../assets/images/signup_speak.png");
    background-size: 100%;
  }
  .course-book h2{
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
      text-shadow: 0 2px 3px rgba(255, 255, 255, 1);
  }

  .course-book {
    position: relative;
    z-index: 1;
    color: #fff;
    padding: 0 8%;
    text-align: left;
  }
  .course-book p{
    width: 60%;
    line-height: normal;
    font-size: 11px;
    font-weight: bold;
    text-shadow: 0 2px 3px rgba(255, 255, 255, 1);
  }
  .course-image-wrapper{
    height: 150px !important;
  }
}
</style>