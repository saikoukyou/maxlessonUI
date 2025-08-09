<template>
<div class="mypageTemplate">
  <div class="blockW">
  <section class="contentsWrap searchTeacher">
      <NuxtLink to="/mypage/searchTeacher">
        <img src="~/assets/images/searchbytime.png" alt="" class="icon_selectL">
      </NuxtLink>



    <div class="everytime">

<!--      <div class="Point selectdiv">-->
<!--        <span>必要ポイント数</span>-->
<!--        <div class="PointSpGrid">-->
<!--          <input type="radio" name="point" value="0" v-model="integralRank" id="allpoint" :checked="integralRank == 0">-->
<!--          <label for="allpoint" class="label">すべて</label>-->
<!--          <div v-for="(itemi, indexi) in integral_rands">-->
<!--            <input type="radio" name="point" :value="itemi" v-model="integralRank" :checked="integralRank == itemi" :id="itemi+'point'">-->
<!--            <label :for="itemi+'point'" class="label">{{itemi}}ポイント</label>-->
<!--          </div>-->
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
            <label for="learn_type1">総合</label>
            <input type="radio" id="learn_type3" name="learn_type" value="1" v-model="learnType" :checked="learnType === 1" placeholder="会话"/>
            <label for="learn_type1">会話</label>
          </span>
      </div>
      <div v-if="learnTypeShow" style="position: relative;">
        <button type="submit" @click="submitForm" class="Submit_search">検索</button>
        <span class="clearSelect" @click="clearForm">検索条件クリア</span>
      </div>
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
        <li :class="list[searchDay + ' ' + time + ':00'] ? '' : 'none'" v-for="(time,ikey) in times.slice(0, 12)" @click="selectedTimeTeachers(time,timesCn[ikey])">
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
        <li :class="list[searchDay + ' ' + time + ':00'] ? '' : 'none'" v-for="(time,fkey) in times.slice(12, 24)" @click="selectedTimeTeachers(time,timesCn[fkey+12])">
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
        <li :class="list[searchDay + ' ' + time + ':00'] ? '' : 'none'" v-for="(time,skey) in times.slice(24, 38)" @click="selectedTimeTeachers(time,timesCn[skey+24])">
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
  </div>
</div>
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
import {useTimeTeacherListDataApi} from "~/apis";
import {changeTimezone, formatDate} from "~/composables/useUtil";
import {register} from "swiper/element";
import {useMainStore} from "~/composables/store";
import {ref} from "vue";

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
const useStore = useMainStore();
const learnType = ref(2);
let timezone = ref('jp');

if (useStore?.studentLoggedIn) {
  learnType.value = useStore.learn_type;
  if (useStore.learn_type === 2) {
    learnTypeShow.value = true;
  } else {
    learnTypeShow.value = false;
  }
}

onMounted(async () => {
  timezone.value = useStore?.studentInfo?.timezone ?? 'jp';

  let { data: info } = await useTimeTeacherListDataApi({
    search_day: formatDate(new Date()),
    search_learn_type : learnType.value == 2 ? '' : learnType.value
  })
  if (info?.value) {
    days.value = info?.value.days ?? [];
    times.value = info?.value.times ?? [];
    timesCn.value = info?.value.timescn ?? [];
    list.value = info?.value.list ?? [];
    integral_rands.value = info?.value.integral_rands ?? [];
  }
})

function changeDay(day,pindex,indexd) {
  searchDay.value = day;
  searchDayIndex.value = pindex*3+indexd;
  searchDayIndexPc.value = pindex*7+indexd;
  submitForm();
}

async function submitForm() {
  let query = {};
  if (searchDay.value !== "''") {
    query['search_day'] = searchDay.value;
  } else {
    query['search_day'] = formatDate(new Date());
  }
  if (integralRank?.value) {
    query['integral_rank'] = integralRank.value;
  }
  if (bookmark.value !== "''" && bookmark.value === true) {
    query['bookmark'] = 1;
  }
  if (learnType.value !== 2) {
    query['search_learn_type'] = learnType.value;
  }
  let res2 = await useTimeTeacherListDataApi(query)
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
.everytime{
  background-color: #FFF9EC;
  text-align: center;
  padding: 20px 0;
  margin-bottom: 20px;
}
.Point input[type=radio] {
  display: none;
  /* ラジオボタンを非表示にする */
}

.Point input[type="radio"]:checked+label {
  background: #F2B705;
  color: #ffffff;
}

.Point .label {
  display: block;
  float: left;
  margin: 5px;
  width: 140px;
  height: 45px;
  padding-left: 5px;
  padding-right: 5px;
  color: #000;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  border: 2px solid #F2B705;
  border-radius: 38px;
  font-size: 14px;
  font-weight: 600;
}
.trial_contents_wrap{
  height: 550px;
}
@media screen and (max-width: 520px) {
  .select_menu{
    padding-top: 0;
  }
}

.mobiletimetable{
  display: none;
}
.contentsWrap{
  width: 800px;
}

.select_menu{
  background-color: #FFF9EC;
  margin: 10px 0;
  text-align: center;
}
.Submit_search{
  scale: calc(0.8);
}
.everytimeWrap li .reserve{
  font-size: 12px;
}
@media screen and (max-width: 520px) {
  .teacherInfo>a>img{
    margin-left: 0;
  }
  .mobiletimetable{
    display: block;
  }
  .select_menu{
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .select_menu span{
    font-size: 15px;
    margin-top: 4px;
  }
  .trial_contents_wrap{
    height: 80%;
  }
  .contentsWrap{
    width: 100%;
  }
}
</style>