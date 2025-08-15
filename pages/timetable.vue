<template xmlns="http://www.w3.org/1999/html">
    <LoadingGroup :pending="allPending">
      <div class="topTemplate page-wrapper">
      <section class="PlanPrice">
        <div class="PlanPrice__inner">
        <div class="subPosition">
          <span class="subTitle">講師一覧</span>
        </div>
        </div>
      </section>
        <!-- Page header: title + switch -->
        <div class="searchHeader">
          <div class="searchHeader__inner">
            <h2 class="searchHeader__title">予約・講師検索</h2>

            <div class="seg-switch">
              <!-- 左：老師（本頁亮） -->
              <NuxtLink to="/timetable" class="seg-switch__btn seg-switch__btn--teacher teacher_active">
                先生で検索
              </NuxtLink>

              <!-- 右：時間 -->
              <NuxtLink to="/everytime" class="seg-switch__btn seg-switch__btn--time">
                時間で検索
              </NuxtLink>
            </div>
          </div>
        </div>
        <section class="contentsWrap searchTeacher">
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


        <div class="select_menu">
          <div class="TimezoneWrap">
            <div class="Timezone selectdiv">
              <span>開始時間</span>
              <div class="selectDivInner">
                <select id="time_select" onchange="" v-model="timeStart">
                  <option v-for="(itemsd, indexsd) in time_start_table" :value="indexsd" data-number="0">
                    {{itemsd}}
                  </option>
                </select>
              </div>
              <div class="timeFrom">～</div>
              <div class="selectDivInner">
                <select id="time_select" onchange="" v-model="timeEnd">
                  <option v-for="(itemed, indexed) in time_start_table" :value="indexed" data-number="0">
                    {{itemed}}
                  </option>
                </select>
              </div>
            </div>
            <div class="SwitchRadio1">
              <input class="visually-hidden" id="bookmark" type="checkbox" name="bookmark" v-model="bookmark" />
              <label for="bookmark">お気に入り講師のみ表示</label>
            </div>
          </div>

<!--          <div v-if="learnTypeShow" class="learn-type-div">-->
<!--            <span>講師の種類</span>-->
<!--            <span>-->
<!--                <input type="radio" id="learn_type1" name="learn_type" value="2" v-model="learnType" :checked="learnType === 2" placeholder="全部" />-->
<!--                <label for="learn_type1">全て</label>-->
<!--                <input type="radio" id="learn_type2" name="learn_type" value="0" v-model="learnType" :checked="learnType === 0" placeholder="学习" />-->
<!--                <label for="learn_type1">学習講師</label>-->
<!--                <input type="radio" id="learn_type3" name="learn_type" value="1" v-model="learnType" :checked="learnType === 1" placeholder="会话"/>-->
<!--                <label for="learn_type1">会話講師</label>-->
<!--              </span>-->
<!--          </div>-->

          <div class="Point selectdiv">

<!--            <span>必要ポイント数</span>-->
<!--            <div class="PointSpGrid">-->
<!--              <input type="radio" name="point" value="0" v-model="integralRank" id="allpoint" :checked="integralRank == 0">-->
<!--              <label for="allpoint" class="label">すべて</label>-->
<!--              <div v-for="(itemi, indexi) in integral_rands">-->
<!--                <input type="radio" name="point" :value="itemi" v-model="integralRank" :checked="integralRank == itemi" :id="itemi+'point'">-->
<!--                <label :for="itemi+'point'" class="label">{{itemi}}ポイント</label>-->
<!--              </div>-->
<!--            </div>-->

            <div class="a-accordion">
              <button class="accordionDetail" :style="backgroundImage" @click="toggleAccordion">
                <span class="bold">さらに詳しい条件を指定する</span>
              </button>
            </div>
          </div>
          <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
            <div v-if="opened" class="a-accordion-inner"
                 style="transition : height 0.2s ease-in-out; overflow: hidden;">
              <div class="Detail1 selectdiv">
                <span>性別</span>
                <div class="selectDivInner">
                  <select id="gender_select" onchange="" v-model="sex">
                    <option :value="0"> 選択してください </option>
                    <option v-for="(sexitem,sexindex) in sexs" :value="sexindex" :data-number="ageindex">{{sexitem}}</option>
                  </select>
                </div>
                <span class="yearLayout">年齢</span>
                <div class="selectDivInner">
                  <select id="age_select" onchange="" v-model="age">
                    <option :value="0"> 選択してください </option>
                    <option v-for="(ageitem,ageindex) in ages" :value="ageindex" :data-number="ageindex">{{ageitem}}</option>
                  </select>
                </div>
                <span></span>
              </div>
              <div class="Language">
                <div class="LanguageLevel">
                  <span>講師の外国語レベル</span>
                  <div class="selectDivInner">
                    <select id="language_select" v-model="language" @change="changeLanguage">
                      <option :value="''"> 選択してください </option>
                      <option value="japanese_level" data-number="0">
                        日本語</option>
                      <option value="english_level" data-number="1">
                        英語</option>
                    </select>
                  </div>
                </div>
                <div class="Labels selectdiv">
                  <div class="levelOption">
                  <span v-for="(litem,lindex) in languageLevelList">
                    <input type="checkbox" :value="lindex" v-model="languageLevel" :id="'level'+lindex">
                    <label :for="'level'+lindex" class="label" >
                      <span class="wordLabel">{{lindex}}{{litem}}</span>
                    </label>
                  </span>
                  </div>
                </div>
<!--                <div style="height:50px;width: 100%;display: inline-block;">-->
<!--                  <div>-->
<!--                    <span v-for="(litem,lindex) in languageLevelList">-->
<!--                      <input type="checkbox" name="level" :value="lindex" v-model="languageLevel" :id="'level'+lindex">-->
<!--                      <label :for="'level'+lindex" class="">{{lindex}}{{litem}}</label>-->
<!--                    </span>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </div>
          </transition>

          <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
            <div v-if="opened" class="a-accordion-inner">
              <div class="Keyword selectdiv">
                <span>キーワード検索</span>
                <input type="text" name="keyword"  id="Keyword" v-model="keyword" placeholder="講師の名前、出身地、自己紹介などが検索対象" class="KeywordTextbox">
              </div>
            </div>
          </transition>
<!--          <div v-if="opened" class="a-accordion-inner">-->
<!--            <ul class="addOption">-->
<!--              <li v-for="(tagitem, tagindex) in tagArr" :key="tagindex">-->
<!--                <input type="checkbox" name="label_teacher" :value="tagindex" v-model="tags" :id="'label'+tagindex">-->
<!--                <label :for="'label'+tagindex">{{ tagitem }}</label>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </div>
        <div class="submitLayout">
          <button type="submit" @click="handleSearchClick" class="Submit_search">この条件で検索</button>
          <span type="reset" class="clearSelect" @click="clearForm">検索条件クリア</span>
        </div>
        <div style="height: 20px;"></div>
        <div class="zoneDivInner">
          <div class="leftDiv">検索結果：<span>{{allTotal}}</span>名の講師</div>
          <div class="rightDiv">
            <div>
              <label>表示順</label>
              <select id="order_select" v-model="orderFlag" @change="changeOrderFlag" style="text-align: center;">
                <option value="1" data-number="0">総合評価順</option>
                <option value="2" data-number="1">お気に入り優先順</option>
                <option value="3" data-number="2">新人講師優先順</option>
                <option value="4" data-number="3">レッスン評価順</option>
              </select>
            </div>
          </div>
        </div>


        <div v-if="allRows.length">
          <div v-for="(item, index) in allRows" class="select_teachers">
            <div class="teacherInfo">
              <nuxt-link :to="'/teachers/'+item.id">
                <div class="teacherPhoto">
                  <img :src="item.face_img5" alt="" class="tphoto">
                </div>
              </nuxt-link>
              <ul>
                <li class="pinyin">{{item.name_pinyin}}</li>
                <li class="name">{{ item.name_cn }}<span class="teacherID">ID:{{item.id}}</span></li>
                <li class="cityT">{{item.province_addr}}{{item.current_address}}</li>
                <li>
                  <span class="sptitle">日本語</span>
                  <span class="spdes">{{item.japanese_level}}{{maps['japanese_level'][item.japanese_level]}}</span>
                </li>
                <li>
                  <span class="sptitle">業界の得意分野</span>
                  <span class="spdes">{{ item.topic_str }}</span>
                </li>
                <li><n-rate readonly :value="item.avg_score" :allow-half="true" type="number" /></li>

<!--                <ul class="teacherLabels">-->
<!--                  <li><img :src="LabelTeacher1" alt="" class="teacher_label_img"></li>-->
<!--                  <li><img :src="LabelTeacher3" alt="" class="teacher_label_img"></li>-->
<!--                  <li><img :src="LabelTeacher5" alt="" class="teacher_label_img"></li>-->
<!--                  <li><img :src="LabelTeacher8" alt="" class="teacher_label_img"></li>-->
<!--                </ul>-->

              </ul>
              <p class="favorite" @click="addBookmark(item.id)">
                <span><img :src="useStore?.studentInfo?.bteachers?.includes(item.id) ? IconHeart : IconHeartNone" alt="" />お気に入り</span>
              </p>
            </div>
            <div v-if="
  Object.values(item.times.timesArr1 || {}).some(t => t.status === 1 && t.is_reserved === 0) ||
  Object.values(item.times.timesArr2 || {}).some(t => t.status === 1 && t.is_reserved === 0) ||
  Object.values(item.times.timesArr3 || {}).some(t => t.status === 1 && t.is_reserved === 0)
" class="timeGridWrap scroll_bar scroll_transbg">
              <div class="timeW"
                   v-if="Object.values(item.times.timesArr1 || {}).some(t => t.status === 1 && t.is_reserved === 0)">
              <div class="time-block">
                  <img src="../assets/images/icon_day.png" class="icon" />
                <span class="time-text">06:00–11:30</span>
                </div>
                <ul
                    class="timeGrid"
                    v-if="item.times.timesArr1 && Object.values(item.times.timesArr1).some(t => t.status === 1 && t.is_reserved === 0)"
                >
                  <li v-for="(itemt, indext) in item.times.timesArr1"
                      @click="selectTime(item.id,itemt.lesson_unixtime)"
                      :class="itemt.is_reserved == 1 || itemt.status == 0 ? 'lesson_disabled' : ''" >
                    {{indext}}-
                  </li>
                </ul>
              </div>
              <div class="timeW"
                   v-if="Object.values(item.times.timesArr2 || {}).some(t => t.status === 1 && t.is_reserved === 0)">

              <div class="time-block">
                  <img src="../assets/images/icon_afternoon.png" class="icon" />
                  <span class="time-text">12:00-17:30</span>
                </div>
                <ul
                    class="timeGrid"
                    v-if="item.times.timesArr2 && Object.values(item.times.timesArr2).some(t => t.status === 1 && t.is_reserved === 0)"
                >
                  <li v-for="(itemt, indext) in item.times.timesArr2"
                      @click="selectTime(item.id,itemt.lesson_unixtime)"
                      :class="itemt.is_reserved == 1 || itemt.status == 0 ? 'lesson_disabled' : ''" >
                    {{indext}}-
                  </li>
                </ul>
              </div>
              <div class="timeW"
                   v-if="Object.values(item.times.timesArr3 || {}).some(t => t.status === 1 && t.is_reserved === 0)">

              <div class="time-block">
                  <img src="../assets/images/icon_night.png"  class="icon" />
                  <span class="time-text">18:00-24:30</span>
                </div>
                <ul
                    class="timeGrid"
                    v-if="item.times.timesArr3 && Object.values(item.times.timesArr3).some(t => t.status === 1 && t.is_reserved === 0)"
                >
                  <li v-for="(itemt, indext) in item.times.timesArr3"
                      @click="selectTime(item.id,itemt.lesson_unixtime)"
                      :class="itemt.is_reserved == 1 || itemt.status == 0 ? 'lesson_disabled' : ''" >
                    {{indext}}-
                  </li>
                </ul>
              </div>
            </div>
            <div v-else class="no-time-text">この日は現在空きが有りません。<br>別日で検索をお試しください。</div>
          </div>
        </div>
        <div v-else>
          <div class="snone">該当者なし</div>
        </div>
      </section>
      </div>
    </LoadingGroup>

<div class="page-num">
    <n-pagination style="width:fit-content; margin: auto;" size="large" :item-count="allTotal" :page="page" :page-size="limit" :on-update:page="handlePageChange" />
</div>
  <use-plan v-if="usePlanshow" :parameters="parameters" :learnType="2" @changeEvent="changeShow" />
</template>

<script setup>

//设置首页标题,举个例子，这里的title就是首页的标题
import {addBookmark, formatDate} from "~/composables/useUtil";
import IconHeart from "../assets/SVG/icon_heart.svg";
import IconHeartNone from "../assets/SVG/icon_heart_none.svg";
import {useIndexListDataApi} from "~/apis";
import {useIndexDataApi} from "~/apis";
import { NPagination,NRate } from "naive-ui";
import {usePage} from "~/composables/usePage";
import { register } from "swiper/element/bundle";
import {onMounted, ref, computed} from "vue";
import {useMainStore} from "~/composables/store";
import { useRoute } from 'vue-router';

const route = useRoute();

// 使用 import 方式來引入圖片
import searchMore from '@/assets/images/searchMore.png';
import searchClose from '@/assets/images/searchClose.png';

useHead({
  title: '予約・講師検索',
  meta: [
    { name: "keywords", content: "BizCHINA,ビズチャイナ,中国語,オンライン中国語,中国語研修,中国語レッスン" },
    { name: "description", content: "オンライン中国語教室で、WeChat、Teamsや独自のWeb教室を使って受講できます。約300名の講師が在籍。朝6時から深夜1時まで。ネット利用に特化した無料教材。1レッスン333円から受講可能。" },
  ],
})

register();

const page = ref(1);
let limit = ref(10);
let allTotal = ref(0);
let allRows = ref([]);
let allError = ref(null);
let allPending = ref(false);
let days = ref([]);
let time_start_table = ref([]);
let integral_rands = ref([]);
let sexs = ref([]);
let ages = ref([]);
let tagArr = ref([]);
const maps = ref([]);
const useStore = useMainStore();
let orderFlag = ref(1);

const getSeachInfo = async () => {
  let {
    pending,
    data,
    error,
    rows,
    total
  } = await usePage(() => {
    return useIndexDataApi({
      per_page: limit.value,
      page: page?.value || 1,
      get_count: true,
      search_day: searchDay.value,
      order_flag : orderFlag.value
    })
  })

  allTotal.value = total?.value ?? 0;
  allRows.value = rows?.value ?? [];
  allError.value = error?.value ?? null;
  allPending.value = pending?.value ?? false;


  if (data?.value) {
    days.value = data?.value.days ?? [];
    time_start_table.value = data?.value.time_start_table ?? [];
    integral_rands.value = data?.value.integral_rands ?? [];
    maps.value = data?.value.maps ?? [];
    sexs.value = data?.value.maps.sex ?? [];
    ages.value = data?.value.maps.age ?? [];
    tagArr.value = data?.value.tags ?? [];
  }
}
function handlePageChange(p) {
  page.value = p;
  submitForm(p);
  document.querySelector('.clearSelect')?.scrollIntoView({ behavior: 'smooth' });
}
function handleSearchClick() {
  submitForm();
  document.querySelector('.clearSelect')?.scrollIntoView({ behavior: 'smooth' });
}

// 服务端时直接报错
if (process.server && allError.value) {
  throwError(allError.value?.data?.data)
}
let opened = ref(false);
let searchDay = ref(formatDate(new Date()));
let searchDayIndex = ref(0);
let searchDayIndexPc = ref(0);
let language = ref('');
let languageLevelList = ref([]);
let languageLevel = ref([]);
let timeStart = ref('');
let timeEnd = ref('');
let bookmark = ref(false);
let integralRank = ref(0);
let sex = ref(0);
let age = ref(0);
let keyword = ref('');
let tags = ref([]);
let parameters = ref('');
let usePlanshow = ref(false);

// 使用 import 的背景圖片
const backgroundImage = computed(() => {
  return opened.value
      ? `background-image: url(${searchClose})`
      : `background-image: url(${searchMore})`;
});

function beforeEnter(el) {
  el.style.transition = 'height 0.2s ease-in-out;'
  el.style.height = '0'
}

function enter(el) {
  el.style.transition = 'height 0.2s ease-in-out;'
  el.style.height = el.scrollHeight + 'px'
}

function beforeLeave(el) {
  el.style.transition = 'height 0.2s ease-in-out;'
  el.style.height = el.scrollHeight + 'px'
}

function leave(el) {
  el.style.transition = 'height 0.2s ease-in-out;'
  el.style.height = '0'
}

function changeLanguage() {
  languageLevel.value = [];
  languageLevelList.value = maps.value[language.value];
}

async function changeDay(day,pindex,indexd) {
  searchDay.value = day;
  searchDayIndex.value = pindex*3+indexd;
  searchDayIndexPc.value = pindex*7+indexd;
  //重新提交请求
  await submitForm();
}

async function submitForm(nowpage=0) {
  let query = {};
  if (searchDay?.value) {
    query['search_day'] = searchDay.value;
  } else {
    query['search_day'] = formatDate(new Date());
  }
  if (language?.value && languageLevel?.value) {
    query[language.value] = languageLevel.value.join(',');
  }
  if (timeStart?.value) {
    query['time_start'] = timeStart.value;
  }
  if (timeEnd?.value) {
    query['time_end'] = timeEnd.value;
  }

  if (bookmark?.value) {
    query['bookmark'] = 1;
  }
  if (integralRank?.value) {
    query['where[integral_rank]'] = integralRank.value;
  }
  if (sex?.value) {
    query['where[sex]'] = sex.value;
  }
  if (age?.value) {
    query['where[age]'] = age.value;
  }
  if (keyword?.value) {
    query['keyword'] = keyword.value;
  }
  if (tags?.value?.length) {
    query['tags'] = tags.value.join(',');
  }
  query['per_page'] = limit.value;
  query['get_count'] = true;
  query['order_flag'] = orderFlag.value;
  if (nowpage > 0) {
    query['page'] = page?.value || 1;
  } else {
    page.value = 1;
  }
  let res2 = await usePage(() => {
    return useIndexListDataApi(query)
  })
  // rows.value = res2?.rows.value ?? [];
  // total.value = res2?.total.value ?? 0;
  // error = res2?.error;
  if (res2) {
    allTotal.value = res2?.total?.value ?? 0;
    allRows.value = res2?.rows?.value ?? [];
    allError.value = res2?.error?.value ?? null;
    allPending.value = res2?.pending?.value ?? false;
  }
}

function clearForm() {
  searchDay.value = "";
  language.value = "";
  timeStart.value = "";
  timeEnd.value = "";
  bookmark.value = false;
  integralRank.value = 0;
  sex.value = 0;
  age.value = 0;
  keyword.value = "";
  tags.value = []; // 清空所有已選中的 tags
}

function selectTime(teacher_id,time) {
  parameters.value = teacher_id+'_'+time;
  usePlanshow.value = true;
  // console.log('time:'+time);
}
function changeShow() {
  usePlanshow.value = false;
  // console.log('changeshow');
}

// 新增切換 accordion 狀態的函數
function toggleAccordion() {
  opened.value = !opened.value;
}
async function changeOrderFlag() {
  await submitForm();
}


onMounted(() => {
  const now = new Date();
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(now.getDate() + 1);
  const nowHour = parseInt(now.getHours());
  const hourOffset = parseInt(now.getTimezoneOffset() / 60);
  if (hourOffset === -8 && nowHour >= 18) {
    searchDayIndex.value = 1;
    searchDayIndexPc.value = 1;
    searchDay.value = formatDate(tomorrowDate);
  } else if (hourOffset === -9 && nowHour >= 19) {
    searchDayIndex.value = 1;
    searchDayIndexPc.value = 1;
    searchDay.value = formatDate(tomorrowDate);
  }
  getSeachInfo();
});


</script>


<style scoped>
.teacherInfo .tphoto {
  filter: brightness(96%); /* 或 opacity、grayscale */
  border: 0;
}

.page-num{
  padding: 0 0 40px 0;
  background-color: #f9f9f9;
}
.timeGrid li.lesson_disabled{
  display: none;
}


.teacherInfo ul{
  margin-left: 4px;
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
.timeGrid li.lesson_disabled {
  background-color: #F4F4F4;
  color: #BBBBBB;
}
.select_teachers .teacherInfo{
  grid-template-columns:1.2fr 1.8fr;
  margin-left: 40px;
  width: 400px;
}
.select_teachers{
  grid-template-columns:1fr 1.2fr;
}
.select_teachers .timeGrid{
  grid-template-columns:3fr 3fr 3fr 4.2fr;
}
.select_teachers .timeGridWrap{
  margin-left: -90px;
  margin-right: 30px;
}
.select_teachers .timeGrid li{
  width: 152px;
}

.accordionDetail {
  margin-top: 10px;
  padding: 6.8px 12px;
  width: fit-content;
  color: #333333;
  background-repeat: no-repeat;
  background-size: auto;
  background-position: left center;
  padding-left: 20px;
  transition: background-image 0.2s ease-in-out;
}
.levelOption{
  height: 60px;
}
.Point{
  height: 40px;
}

@media screen and (max-width: 520px) {
  .course-image h2{
    margin-top: 0;
  }
  .teacherInfo ul{
    margin-left: 16px;
  }
  swiper-container::part(button-next){
    background-size: 46%;
    background-position: 6px 12px;
    margin-right: -12px;
  }
  swiper-container::part(button-prev) {
    background-size: 46%;
    background-position:3px 12px;
    margin-left: -6px;
  }
  .select_teachers .teacherInfo{
    margin-left: 0;
    display: inline-block;
  }
  .select_teachers .timeGridWrap{
    display: block !important;
    margin-right: auto;
    margin-left: auto;
  }
  .time-block{
    display: flex;
    text-align: center;
  }
  .timeW{
    width: 100%;
  }
  .select_teachers{
    display: inline-block;
  }
  .teacherLabels{
    position: relative !important;
  }
  .teacherLabels li{
    position: relative !important;
    display: inline-block;
  }
  .select_teachers .teacherInfo{
    width: auto;
  }
  .contentsWrap{
    margin-top: 1%;
    padding: 2% 8% 0 8%;
  }

  .addOption li:nth-child(1){background-image: none;}
  .addOption li:nth-child(2){background-image: none;}
  .addOption li:nth-child(3){background-image: none;}
  .addOption li:nth-child(4){background-image: none;}
  .addOption li:nth-child(5){background-image: none;}
  .addOption li:nth-child(6){background-image: none;}
  .addOption li:nth-child(7){background-image: none;}
  .addOption li:nth-child(8){background-image: none;}

  .addOption{
    padding-bottom: 16px;
  }
  .levelOption{
    height: fit-content;
  }
}

.mobiletimetable{
  display: none;
}
@media screen and (max-width: 520px) {
  .teacherInfo>a>img{
    margin-left: 0;
  }
  .mobiletimetable{
    display: block;
  }
  .SwitchRadio1 label{
    margin: auto;
  }
  .leftDiv{
    position: relative;
    left: auto;
    padding: 10px 0 0 0;
  }
  .teacherInfo{
    padding: 0 0 20px 7px;
  }

  .select_teachers .timeGridWrap {
    display: flex;
    justify-content: center;
    margin: 8px auto;
    box-sizing: border-box;
    height: auto;
  }

  .select_teachers .timeGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 關鍵！ */
    width: 100%;
  }

  .select_teachers .timeGrid li {
    width: 96% !important; /* 撐滿每格 */
    background-color: #fff;
    border-radius: 6px;
    text-align: center;
    line-height: 44px;
    font-weight: bold;
    color: #14A6B3;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
}
</style>