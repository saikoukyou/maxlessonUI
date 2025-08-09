<template>
  <LoadingGroup :pending="apending">
    <div class="blockW">
      <NuxtLink to="/mypage/everytime">
        <img :src="IconSelectT" alt="" class="icon_selectL"></NuxtLink>
    <section class="contentsWrap_time searchTeacher">

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
              <div class="timeFrom">～</div>
            </div>
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
        <div class="Point selectdiv">
<!--          <span>必要ポイント数</span>-->
<!--          <div class="PointSpGrid">-->
<!--            <input type="radio" name="point" value="0" v-model="integralRank" id="allpoint" :checked="integralRank == 0">-->
<!--            <label for="allpoint" class="label">すべて</label>-->
<!--            <div v-for="(itemi, indexi) in integral_rands">-->
<!--              <input type="radio" name="point" :value="itemi" v-model="integralRank" :checked="integralRank == itemi" :id="itemi+'point'">-->
<!--              <label :for="itemi+'point'" class="label">{{itemi}}ポイント</label>-->
<!--            </div>-->
<!--          </div>-->
        </div>
<!--        <div v-if="learnTypeShow" class="learn-type-div">-->
<!--          <span style="font-size: 14px;">講師の種類</span>-->
<!--          <span>-->
<!--            <input type="radio" id="learn_type1" name="learn_type" value="2" v-model="learnType" :checked="learnType === 2" placeholder="全部" />-->
<!--            <label for="learn_type1">全部</label>-->
<!--            <input type="radio" id="learn_type2" name="learn_type" value="0" v-model="learnType" :checked="learnType === 0" placeholder="学習講師" />-->
<!--            <label for="learn_type1">学習講師</label>-->
<!--            <input type="radio" id="learn_type3" name="learn_type" value="1" v-model="learnType" :checked="learnType === 1" placeholder="会話講師"/>-->
<!--            <label for="learn_type1">会話講師</label>-->
<!--          </span>-->
<!--        </div>-->
        <div class="a-accordion">
          <button class="accordionDetail" :style="backgroundImage" @click="toggleAccordion">
            <span class="bold">詳細条件を指定する</span>
          </button>
        </div>
        <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
          <div v-if="opened" class="a-accordion-inner"
               style="transition : height 0.2s ease-in-out; overflow: hidden;">
            <div class="Detail1 selectdiv">
              <span>講師の性別</span>
              <div class="selectDivInner">
                <select id="gender_select" onchange="" v-model="sex">
                  <option :value="0"> 選択してください </option>
                  <option v-for="(sexitem,sexindex) in adata.maps.sex" :value="sexindex" :data-number="ageindex">{{sexitem}}</option>
                </select>
              </div>
              <span></span>
              <span>講師の年齢</span>
              <div class="selectDivInner">
                <select id="age_select" onchange="" v-model="age">
                  <option :value="0"> 選択してください </option>
                  <option v-for="(ageitem,ageindex) in adata.maps.age" :value="ageindex" :data-number="ageindex">{{ageitem}}</option>
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
<!--                    <option value="korea_level" data-number="2">-->
<!--                      韓国語</option>-->
                  </select>
                </div>
              </div>
              <div class="Labels selectdiv">
                <div class="levelOption">
                    <span v-for="(litem,lindex) in languageLevelList">
                      <input type="checkbox" :value="lindex" v-model="languageLevel" :id="'level'+lindex">
                      <label :for="'level'+lindex" class="label">
                        <span class="wordLabel">{{lindex}}{{litem}}</span>
                      </label>
                    </span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
          <div v-if="opened" class="a-accordion-inner"
               style="transition : height 0.2s ease-in-out; overflow: hidden;">
            <div class="Keyword selectdiv">
              <span>キーワード検索</span>
              <input type="text" name="keyword"  id="Keyword" v-model="keyword" placeholder="講師の名前、出身地、自己紹介などが検索対象" class="KeywordTextbox">
            </div>
<!--            <div class="a-accordion-inner">-->
<!--              <ul class="addOption">-->
<!--                <li v-for="(tagitem, tagindex) in adata.tags" :key="tagindex">-->
<!--                  <input type="checkbox" name="label_teacher" :value="tagindex" v-model="tags" :id="'label'+tagindex">-->
<!--                  <label :for="'label'+tagindex">{{ tagitem }}</label>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
          </div>
        </transition>
      </div>

      <div class="seaT">
        <button type="submit" @click="submitForm" class="Submit_search">検索</button>
        <span type="reset" class="clearSelect" @click="clearForm">検索条件クリア</span>
      </div>
      <!--        </form>-->
      <div class="zoneDivInner">
        <div class="leftDiv">検索結果：<span>{{atotal}}</span>名の講師</div>
        <div class="rightDiv">
          <div v-if="useStore?.studentLoggedIn">
            <label>タイムゾーン設定</label>
            <select id="zone_select" v-model="timezone" @change="changeStudentTimezone">
              <option value="jp" data-number="0">日本時間</option>
              <option value="cn" data-number="1">中国時間</option>
            </select>
          </div>
        </div>
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
      <div v-if="arows.length">
        <div v-for="(item, index) in arows" class="select_teachers">
          <div class="teacherInfo">
            <NuxtLink :to="'/teachers/'+item.id">
              <div class="teacherPhoto">
<!--                <div class="cnRibbon"></div>-->
                <span v-if="item.learn_type == 0" class="tagL">総合</span>
                <span v-else class="tagS">会話</span>
                <img :src="item.face_img5" alt="" class="tphoto">
              </div>
            </NuxtLink>
            <ul>
              <li class="pinyin">{{item.name_pinyin}}</li>
              <li class="name">{{ item.name_cn }}<span class="teacherID">ID:{{item.id}}</span></li>
              <li class="cityT">{{item.province_addr}}{{ item.current_address }}</li>

            <li v-if="item.learn_type == 0">
              <span class="sptitle">日本語</span>
              <span class="spdes">{{item.japanese_level}}{{maps['japanese_level'][item.japanese_level]}}</span>
            </li>
            <li v-else>
              <span class="sptitle">業界の得意分野</span>
              <span class="spdes">{{ item.topic_str }}</span>
            </li>
            <li v-if="item.learn_type == 0">
              <span class="sptitle">英語</span>
              <span class="spdes">{{item.english_level}}{{maps['english_level'][item.english_level]}}</span>
            </li>
            <li v-else>
              <span class="sptitle">対応可能な方言</span>
              <span class="spdes">{{ item.dialect }}</span>
            </li>
              <li class="tagStar"><n-rate readonly allow-half :value="item.avg_score" /></li>
<!--            <ul class="teacherLabels">-->
<!--              <li><img :src="LabelTeacher1" alt="" class="teacher_label_img"></li>-->
<!--              <li><img :src="LabelTeacher3" alt="" class="teacher_label_img"></li>-->
<!--              <li><img :src="LabelTeacher5" alt="" class="teacher_label_img"></li>-->
<!--              <li><img :src="LabelTeacher8" alt="" class="teacher_label_img"></li>-->
<!--            </ul>-->
          </ul>
          <p class="favorite" @click="addBookmark(item.id)">
            <span>
            <img :src="useStore?.studentInfo?.bteachers?.includes(item.id) ? IconHeart : IconHeartNone" alt="" /> お気に入り
            </span>
          </p>
        </div>
          <div v-if="
  Object.values(item.times.timesArr1 || {}).some(t => t.status === 1 && t.is_reserved === 0) ||
  Object.values(item.times.timesArr2 || {}).some(t => t.status === 1 && t.is_reserved === 0) ||
  Object.values(item.times.timesArr3 || {}).some(t => t.status === 1 && t.is_reserved === 0)
" class="timeGridWrap scroll_bar scroll_transbg">
          <div
                class="timeW"
                v-if="Object.values(item.times.timesArr1 || {}).some(t => t.status === 1 && t.is_reserved === 0)"
            >
            <div class="time-block">
              <img src="../../assets/images/icon_day.png" alt="朝" class="icon" />
              <span class="time-text">
                <span v-if="useStore?.studentInfo?.timezone === 'cn'">05:00–10:30</span>
                <span v-else>06:00–11:30</span>
              </span>
            </div>
            <ul class="timeGrid"
                v-if="item.times.timesArr1 && Object.values(item.times.timesArr1).some(t => t.status === 1 && t.is_reserved === 0)"
            >
              <template v-for="(itemt, indext) in item.times.timesArr1">
                <li @click="selectTime(item.id,itemt.lesson_unixtime,itemt.is_reserved,itemt.status)" :class="itemt.is_reserved == 1 || itemt.status == 0 ? 'lesson_disabled' : ''">{{indext}}-</li>
              </template>
            </ul>
          </div>

            <div
                class="timeW"
                v-if="Object.values(item.times.timesArr2 || {}).some(t => t.status === 1 && t.is_reserved === 0)"
            >
            <div class="time-block">
              <img src="../../assets/images/icon_afternoon.png" alt="朝" class="icon" />
              <span class="time-text">
                <span v-if="useStore?.studentInfo?.timezone === 'cn'">11:00-16:30</span>
                <span v-else>12:00-17:30</span>
              </span>
            </div>

            <ul class="timeGrid"
                v-if="item.times.timesArr2 && Object.values(item.times.timesArr2).some(t => t.status === 1 && t.is_reserved === 0)"
            >
              <template v-for="(itemt, indext) in item.times.timesArr2">
                <li @click="selectTime(item.id,itemt.lesson_unixtime,itemt.is_reserved,itemt.status)" :class="itemt.is_reserved == 1 || itemt.status == 0 ? 'lesson_disabled' : ''">{{indext}}-</li>
              </template>
            </ul>
          </div>

            <div
                class="timeW"
                v-if="Object.values(item.times.timesArr3 || {}).some(t => t.status === 1 && t.is_reserved === 0)"
            >
            <div class="time-block">
              <img src="../../assets/images/icon_night.png" alt="朝" class="icon" />
              <span class="time-text">
                <span v-if="useStore?.studentInfo?.timezone === 'cn'">17:00-23:30</span>
                <span v-else>18:00-24:30</span>
              </span>
            </div>
            <ul class="timeGrid"
                v-if="item.times.timesArr3 && Object.values(item.times.timesArr3).some(t => t.status === 1 && t.is_reserved === 0)"
            >
              <template v-for="(itemt, indext) in item.times.timesArr3">
                <li @click="selectTime(item.id,itemt.lesson_unixtime,itemt.is_reserved,itemt.status)" :class="itemt.is_reserved == 1 || itemt.status == 0 ? 'lesson_disabled' : ''">{{indext}}-</li>
              </template>
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
  <n-pagination size="large" style="margin:10px auto 30px auto;" :item-count="atotal" :page="page" :page-size="limit"
                :on-update:page="handlePageChange" />
  <use-plan v-if="usePlanshow" :parameters="parameters" :learnType="learnType" @changeEvent="changeShow"></use-plan>
</template>

<script setup>

//设置首页标题,举个例子，这里的title就是首页的标题
import {addBookmark, formatDate, changeTimezone} from "~/composables/useUtil";
import IconSelectT from "../../assets/images/searchbyteacher.png";
import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import LabelTeacher1 from "../../assets/images/icon_trophy.png";
import LabelTeacher3 from "../../assets/images/icon_camera.png";
import LabelTeacher5 from "../../assets/images/icon_hsk.png";
import LabelTeacher8 from "../../assets/SVG/label_teacher8.svg";
import searchMore from '@/assets/images/searchMore.png'; // 新增：引入 searchMore 圖片
import searchClose from '@/assets/images/searchClose.png'; // 新增：引入 searchClose 圖片
import {useIndexListDataApi} from "~/apis";
import {useIndexDataApi} from "~/apis";
import {createDiscreteApi, NPagination, NRate} from "naive-ui";
import {usePage} from "~/composables/usePage";
import { register } from "swiper/element/bundle";
import {useMainStore} from "~/composables/store";
import {onMounted, ref, computed} from "vue";
import {useUpdateTeacherTimezoneData} from "~/apis/teacher";
import {useUpdateStudentInfoDataApi} from "~/apis/student";

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
let days = ref([]);
// let learnTypeShow = ref(false);
let time_start_table = ref([]);
let integral_rands = ref([]);
let maps = ref([]);
const useStore = useMainStore();
const learnType = ref(2);
let arows = ref([]);
let atotal = ref(0);
let adata = ref([]);
const route = useRoute();
let apending = ref(false);
let timezone = ref('jp');
let orderFlag = ref(1);

// if (useStore?.studentLoggedIn) {
//   learnType.value = useStore.learn_type;
//   // if (useStore?.learn_type === 2) {
//   //   learnTypeShow.value = true;
//   // } else {
//   //   learnTypeShow.value = false;
//   // }
// }

watch(() => route?.query?.learnType, track => {
  learnType.value = route?.query?.learnType;
  getInfo();
})

const getInfo = async () => {
  apending.value = true;
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
      search_day: formatDate(new Date()),
      search_learn_type : learnType.value == 2 ? '' : learnType.value,
      order_flag : orderFlag.value
    })
  })
  apending.value = false;
  if (data?.value) {
    arows.value = rows.value ?? [];
    atotal.value = total.value ?? 0;
    adata.value = data?.value ?? [];
    days.value = data?.value?.days ?? [];
    time_start_table.value = data?.value?.time_start_table ?? [];
    integral_rands.value = data?.value?.integral_rands ?? [];
    maps.value = data?.value?.maps ?? [];
    times.value = data.value?.times ?? [];
  }
}

// 控制 accordion 打開或關閉的狀態
let opened = ref(false);

// 計算屬性來切換背景圖片
const backgroundImage = computed(() => {
  return opened.value
      ? `background-image: url(${searchClose})`
      : `background-image: url(${searchMore})`;
});

onMounted(() => {
  timezone.value = useStore?.studentInfo?.timezone ?? 'jp';

  if (route && route?.query && route?.query?.learnType) {
    learnType.value = route?.query?.learnType;
  } else {
    learnType.value = useStore?.learn_type;
  }
  getInfo();
})

function handlePageChange(p) {
  page.value = p;
  submitForm(p);
  document.querySelector('.zoneDivInner')?.scrollIntoView({ behavior: 'smooth' });
}

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
let times = ref([]);

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
  languageLevelList.value = adata.value.maps[language.value];
}

async function changeDay(day,pindex,indexd) {
  searchDay.value = day;
  searchDayIndex.value = pindex*3+indexd;
  searchDayIndexPc.value = pindex*7+indexd;
  apending.value = true;
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
  if (learnType?.value !== 2) {
    query['search_learn_type'] = learnType?.value;
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
  apending.value = false;
  if (res2) {
    arows.value = res2?.rows?.value ?? [];
    atotal.value = res2?.total?.value ?? [];
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
  tags.value = []; // 正確清除 tags
}


function selectTime(teacher_id,time,reserved,status) {
  if (reserved == 1 || status == 0) {
    return false;
  }
  parameters.value = teacher_id+'_'+time;
  usePlanshow.value = true;
}

function changeShow() {
  usePlanshow.value = false;
}

// 切換打開或關閉 accordion 的狀態
function toggleAccordion() {
  opened.value = !opened.value;
}

function changeStudentTimezone() {
  changeTimezone(timezone.value);
}

async function changeOrderFlag() {
  await submitForm();
}

</script>

<style scoped>
.teacherPhoto{
  margin-left: 36px;
}
.timeW{
  width: 100%;
}
.zoneDivInner{
  background-color: #f9f9f9;
}
.select_teachers{
  background-color: #f9f9f9;
}
swiper-container::part(button-next),
swiper-container::part(button-prev) {
  color: #fff;
}
.selectDivInner{
  width: 180px;
  line-height: 50px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

label{
  margin-left: 4px;
}

.netchina_ui .netchina_main .select_teachers .timeGrid.vIf li {
  position: relative;
  z-index: 1;
}
.netchina_ui .netchina_main .select_teachers .timeGrid.vIf li a {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 2;
}
.timeGrid li.lesson_disabled {
  background-color: #F4F4F4;
  color: #BBBBBB;
}
.timeGrid li:hover.lesson_disabled {
  background-color: #C5C5C5;
  color:black;
  /*-moz-box-shadow: none;*/
  /*-webkit-box-shadow: none;*/
//-ms-box-shadow: none;
//box-shadow: none;
}
.seaT{
  position: relative; background-color:#FFF9EC; margin-bottom: 20px; padding-bottom: 20px;
}
.accordionDetail {
  padding: 6.8px 12px;
  width: fit-content;
  color: #333333;
  background-repeat: no-repeat;
  background-size: auto;
  background-position: left center;
  padding-left: 20px;
  transition: background-image 0.2s ease-in-out;
}

label{
  margin-left: 0;
}
.levelOption{
  height: 60px;
}



@media screen and (max-width: 520px) {
  .select_menu{
    padding-top: 0;
  }
  .levelOption{
    height: fit-content;
  }
  .selectDivInner{
    width: 100%;
  }
  .teacherLabels{
    position: relative !important;
  }
  .teacherLabels li{
    display: inline-block;
    margin-right: 10px !important;
  }
}

.mobiletimetable{
  display: none;
}
.timeGrid li.lesson_disabled{
  display: none;
}
@media screen and (max-width: 520px) {
  .teacherInfo>a>img{
    margin-left: 0;
  }
  .mobiletimetable{
    display: block;
  }

  .leftDiv{
    position: relative;
    left: auto;
    padding: 10px 0 0 0;
  }
  .teacherInfo{
    padding: 0 0 20px 0;
  }

  .select_teachers .timeGridWrap{
    width: 100% !important;
  }
  .select_teachers .timeGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 兩欄等寬 */
    gap: 8px; /* 欄與欄之間間距 */
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
  }

  .select_teachers .timeGrid li {
    width: 100% !important; /* 撐滿欄位 */
    margin: 0; /* 讓 gap 決定間距 */
  }
  .timeGridWrap {
    flex-direction: column; /* 改為直向排列 */
    align-items: center;
  }

  .time-block {
    display: flex;
    align-items: center;
    margin: 4px 0;
    width: 100%;
    padding-left: 12px;
  }

  .time-block .icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .time-text {
    font-size: 16px;
    font-weight: bold;
  }

  .select_teachers .timeGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 8px;
  }

  .select_teachers .timeGrid li {
    width: 100% !important;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }
  .teacherPhoto{
    margin-left: 0;
  }
}

</style>
