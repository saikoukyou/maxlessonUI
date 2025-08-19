<template>
<div style="background-color: #f9f9f9;">
  <section class="contentsHeader">
    <div class="subPosition">
      <span class="subTitle">講師プロフィール</span>
    </div>
  </section>

  <section class="contentsWrap teacherProfileSection" v-if="info">

    <div class="teacherProfile">
      <div class="photo-carousel">
        <!-- 主圖顯示區 -->
        <div class="main-photo">
<!--          <div class="cnRibbon"></div>-->
          <!-- loading 狀態 -->
          <div v-if="imageStatus === 'loading'" class="img-placeholder animated-loading"></div>

          <!-- 圖片載入完成後顯示 -->
          <img
              v-show="imageStatus === 'loaded'"
              :src="currentImage"
              :class="{ 'fade-in': imageStatus === 'loaded' }"
              @load="imageStatus = 'loaded'"
              @error="imageStatus = 'loading'"
          />
        </div>

        <!-- 縮圖列 -->
        <div class="thumbnail-row">
          <img
              v-for="(img, index) in validThumbnails"
              :key="index"
              :src="img"
              class="thumbnail"
              @click="currentImage = img"
              :class="{ active: currentImage === img }"
          />
        </div>
      </div>

      <div class="teacherDetail">
        <span class="pinyin">{{info.name_pinyin}}</span>
        <span class="name">{{ info.name_cn }}</span>
        <span class="teacherID">ID:{{info.id}}</span>
        <span>
          <span v-if="info.avg_score !== null && info.avg_score !== undefined">
  <n-rate readonly allow-half :value="info.avg_score" type="number" />  {{ info.avg_score }}</span>
        </span>
        <span class="star"></span>
        <div style="clear: both;"></div>

        <ul class="tutorProfile">
          <li>年齢</li>
          <li>{{ info.age }} 代</li>
        </ul>
        <ul class="tutorProfile">
          <li>出身地</li>
          <li>{{info.province_bir}}{{info.birthplace}}</li>
        </ul>
        <ul class="tutorProfile">
          <li>現在地</li>
          <li>{{info.province_addr}}{{info.current_address}}</li>
        </ul>
        <ul class="tutorProfile">
          <li>出身学校</li>
          <li>{{info.alma_mater}}</li>
        </ul>
        <ul class="tutorProfile">
          <li>専攻内容</li>
          <li>{{info.major}}</li>
        </ul>
        <ul class="tutorProfile" v-if="info.learn_type == 0">
          <li>日本語</li>
          <li>{{ info.japanese_level }}
            <span v-if="maps['japanese_level']">
              {{maps['japanese_level'][info.japanese_level]}}
            </span>
          </li>
        </ul>
        <ul class="tutorProfile" v-if="info.learn_type == 0">
          <li>英語</li>
          <li>{{ info.english_level }}
            <span v-if="maps['english_level']">
              {{maps['english_level'][info.english_level]}}
            </span>
          </li>
        </ul>
<!--        <ul class="tutorProfile">-->
<!--          <li>韓国語</li>-->
<!--          <li>{{ info.korea_level }}</li>-->
<!--        </ul>-->
        <ul class="tutorProfile">
          <li>話せる方言</li>
          <li>{{ info.dialect }}</li>
        </ul>

<!--        <div class="specialItem">-->
<!--          <img src="../../assets/images/icon_trophy.png"/>-->
<!--          <img src="../../assets/images/icon_camera.png"/>-->
<!--          <img src="../../assets/images/icon_hsk.png"/>-->
<!--        </div>-->
      </div>

      <div class="cancelratio">
        <ul>
          <li class="ctitle">予約レッスン</li>
          <li class="cnumber">{{info.total_lesson_num}}<span>回</span></li>
          <li class="clink">
            <p
                @click="toggleTable"
                class="cancel-rate">
              キャンセル率を見る▼
            </p>
            <div v-if="showTable" class="hover-table">
              <div class="table-content">
                <ul>
                  <li>今月</li>
                  <li>予約件数<br><span>{{info.curr_mon_num}}</span> 件</li>
                  <li>キャンセル率<br><span>{{info.cancel_rate}}</span> %</li>
                </ul>
                <ul>
                  <li>先月</li>
                  <li>予約件数<br><span>{{info.next_mon_num}}</span> 件</li>
                  <li>キャンセル率<br><span>{{info.cancel_rate_next}}</span> %</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>


    </div>
    <div class="tabs">
      <input type="radio" id="tab2" name="tab" class="tab" value="0" v-model="selectedTab" @change="changeTab" checked>
      <label for="tab2" class="tab-label">プロフィール</label>
      <input type="radio" id="tab1" name="tab" value="1" v-model="selectedTab" class="tab" @change="changeTab">
      <label for="tab1" class="tab-label">レッスン予約</label>

      <div class="tab-content tab-content1">
        <div class="reservedList mobiletimetable">
          <swiper-container navigation="true">
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(0, 3)" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="handleClickDate(0,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(3, 6)" :class="searchDayIndex == index+3 ? 'selected' : ''" :key="index" @click="handleClickDate(1,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(6, 9)" :class="searchDayIndex == index+6 ? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(9, 12)" :class="searchDayIndex == index+9 ? 'selected' : ''" :key="index" @click="handleClickDate(3,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(12, 15)" :class="searchDayIndex == index+12 ? 'selected' : ''" :key="index" @click="handleClickDate(4,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(15, 18)" :class="searchDayIndex == index+15 ? 'selected' : ''" :key="index" @click="handleClickDate(5,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(18, 21)" :class="searchDayIndex == index+18 ? 'selected' : ''" :key="index" @click="handleClickDate(6,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
          </swiper-container>
        </div>

        <div class="reservedList pc">
          <swiper-container navigation="true">
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(0, 7)" :class="searchDayIndexPc == index ? 'selected' : ''" :key="index" @click="handleClickDatePc(0,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(7, 14)" :class="searchDayIndexPc == index+7 ? 'selected' : ''" :key="index" @click="handleClickDatePc(1,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
            <swiper-slide>
              <ul class="select_date">
                <li v-for="(day, index) in days.slice(14, 21)" :class="searchDayIndexPc == index+14 ? 'selected' : ''" :key="index" @click="handleClickDatePc(2,index)">{{ day.md }}<span>{{day.week}}</span></li>
              </ul>
            </swiper-slide>
          </swiper-container>
        </div>

          <div class="select_everytime">
            <div class="timeTitle"><span v-if="useStore?.studentInfo?.timezone === 'cn'">朝（5:00-10:30）</span><span v-else>朝（6:00-11:30）</span></div>
            <ul class="everytimeWrap">
              <li v-for="(timekey, index) in times.slice(0,12)" :class="!(list[timekey] && list[timekey].is_reserved == 0 && list[timekey].status == 1) ? 'none' : ''" :key="index" @click="selectedTime(timekey)">
                <span>
                  <span v-if="useStore?.studentInfo?.timezone === 'cn'">
                    <span class="fs20 bkf">{{timesCn[index]}}-</span>{{timesCn[index].toString().substring(0,3)}}{{timesCn[index].toString().substring(3) == '30' ? '55' : '25'}}
                  </span>
                  <span v-else>
                    <span class="fs20 bkf">{{ timekey }}-</span>{{timekey.toString().substring(0,3)}}{{timekey.toString().substring(3) == '30' ? '55' : '25'}}
                  </span>
                </span>
                <span v-if="list[timekey] && list[timekey].is_reserved == 0 && list[timekey].status == 1" class="reserve">予約受付中</span>
                <span v-else>予約不可</span>
              </li>
            </ul>
            <div class="timeTitle"><span v-if="useStore?.studentInfo?.timezone === 'cn'">昼（11:00-16:30）</span><span v-else>昼（12:00-17:30）</span></div>
            <ul class="everytimeWrap list2">
              <li v-for="(timekey, index) in times.slice(12,24)" :class="!(list[timekey] && list[timekey].is_reserved == 0 && list[timekey].status == 1) ? 'none' : ''" :key="index" @click="selectedTime(timekey)">
                <span>
                  <span v-if="useStore?.studentInfo?.timezone === 'cn'">
                    <span class="fs20 bkf">{{timesCn[index+12]}}-</span>{{timesCn[index+12].toString().substring(0,3)}}{{timesCn[index+12].toString().substring(3) == '30' ? '55' : '25'}}
                  </span>
                  <span v-else>
                    <span class="fs20 bkf">{{ timekey }}-</span>{{timekey.toString().substring(0,3)}}{{timekey.toString().substring(3) == '30' ? '55' : '25'}}
                  </span>
                </span>
                <span v-if="list[timekey] && list[timekey].is_reserved == 0 && list[timekey].status == 1" class="reserve">予約受付中</span>
                <span v-else>予約不可</span>
              </li>
            </ul>
            <div class="timeTitle"><span v-if="useStore?.studentInfo?.timezone === 'cn'">夜（17:00-23:30）</span><span v-else>夜（18:00-24:30）</span></div>
            <ul class="everytimeWrap list3">
              <li v-for="(timekey, index) in times.slice(24,38)" :class="!(list[timekey] && list[timekey].is_reserved == 0 && list[timekey].status == 1) ? 'none' : ''" :key="index" @click="selectedTime(timekey)">
                <span>
                  <span v-if="useStore?.studentInfo?.timezone === 'cn'">
                    <span class="fs20 bkf">{{timesCn[index+24]}}-</span>{{timesCn[index+24].toString().substring(0,3)}}{{timesCn[index+24].toString().substring(3) == '30' ? '55' : '25'}}
                  </span>
                  <span v-else>
                    <span class="fs20 bkf">{{ timekey }}-</span>{{timekey.toString().substring(0,3)}}{{timekey.toString().substring(3) == '30' ? '55' : '25'}}
                  </span>
                </span>
                <span v-if="list[timekey] && list[timekey].is_reserved == 0 && list[timekey].status == 1" class="reserve">予約受付中</span>
                <span v-else><span class="reserve none">予約不可</span></span>
              </li>
            </ul>
          </div>
<!--          <div class="profileText">-->
<!--            <div v-if="info.intro_1" v-html="info.intro_1"></div>-->
<!--          </div>-->

      </div>
      <div class="tab-content tab-content2" v-if="info">
        <span>
          <div class="ck-content" v-if="info.exclamation_pc" v-html="info.exclamation_pc"></div>
        </span>
        <div class="youtube-wrapper" v-if="info.exclamation_video" v-html="info.exclamation_video">
        </div>
        <h2>レッスンの評価</h2>
        <div class="commentB">
          <ul class="commentTeacher" v-for="evaluation in evaluationArr">
            <li class="commentW">{{evaluation.comment}}</li>
            <li>{{evaluation.registered}}</li>
            <li><n-rate readonly allow-half v-model:value="evaluation.score" :max="5" /></li>
          </ul>
        </div>
      </div>
    </div>
    <NuxtLink v-if="info.learn_type == 0" to="/timetable?learn_type=0">
      <div class="textBack">総合コース講師一覧に戻る</div>
    </NuxtLink>

    <NuxtLink v-if="info.learn_type == 1" to="/timetable?learn_type=1">
      <div class="textBack_s">会話コース講師一覧に戻る</div>
    </NuxtLink>

  </section>


<use-plan v-if="usePlanshow" :parameters="parameters" :learnType="learnType" @changeEvent="changeShow"></use-plan>
</div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // 引入 useRoute 和 useRouter
import { register } from "swiper/element/bundle";
import { createDiscreteApi, NRate } from "naive-ui";
import { useMainStore } from "~/composables/store";
import '~/assets/css/content.css';
import {formatDate} from "~/composables/useUtil";
import {usePreviewTeacherDataApi} from "../../apis";

register();

const days = ref([]);
const allList = ref([]);
const list = ref([]);
const timeKeys = ref([]);
let times = ref([]);
let timesCn = ref([]);
const searchDayIndex = ref(0);
let searchDayIndexPc = ref(0);
// const listCount1 = ref(false);
// const listCount2 = ref(false);
// const listCount3 = ref(false);
const info = ref({});
const parameters = ref('');
const usePlanshow = ref(false);
const evaluationArr = ref([]);
const maps = ref([]);
let selectedDayIndex = ref(0);

// 路由实例
const route = useRoute();
const router = useRouter();
const useStore = useMainStore();
const learnType = useStore.learn_type;

definePageMeta({
  layout: 'default'
});

const showTable = ref(false);
const isMobile = ref(false);
const selectedTab = ref(0);

// 切換顯示狀態
function toggleTable() {
  showTable.value = !showTable.value;
}

// 判斷是否是手機版
function checkMobile() {
  isMobile.value = window.innerWidth <= 520; // 根據手機版的斷點調整
}

//照片輪播
const imageStatus = ref('loading'); // 狀態值: 'loading' 或 'loaded'
const currentImage = ref(''); // 主圖片的路徑（會綁定到 <img :src="currentImage" />）

// 只顯示最多五張有效圖片（img5 是預設主圖）
const validThumbnails = computed(() => {
  const imgs = [];
  if (info.value.face_img5) imgs.push(info.value.face_img5); // 預設圖
  if (info.value.face_img2) imgs.push(info.value.face_img2);
  if (info.value.face_img3) imgs.push(info.value.face_img3);
  if (info.value.face_img4) imgs.push(info.value.face_img4);
  return imgs.slice(0, 5);
});

// 當 info 更新時，重設主圖與 loading 狀態
watch(info, () => {
  currentImage.value = info.value.face_img5 || '';
  imageStatus.value = 'loading';
});

// 當使用者切換圖片時，也要重設 loading 狀態
watch(currentImage, () => {
  imageStatus.value = 'loading';
});


// 获取数据
const getInfo = async () => {
  const { data, error } = await usePreviewTeacherDataApi(route.params.id);
  if (data?.value) {
    info.value = data.value ?? {};
    // console.log('info.value:'+JSON.stringify(info.value));
    days.value = data.value?.days ?? [];
    // list.value = allList.value = data.value?.attendance_table ?? [];
    // list.value = allList.value[days.value[selectedDayIndex.value].day] ?? [];
    evaluationArr.value = data.value?.evaluations ?? [];
    timeKeys.value = Object.keys(list.value);
    times.value = data.value?.times ?? [];
    timesCn.value = data.value?.timescn ?? [];
    maps.value = data.value.maps ?? [];

    // if (timeKeys.value.length > 26) {
    //   listCount1.value = timeKeys.value.length - 26;
    //   listCount2.value = listCount1.value + 12;
    //   listCount3.value = listCount2.value + 14;
    // } else if (timeKeys.value.length > 14 && timeKeys.value.length <= 26) {
    //   listCount1.value = 0;
    //   listCount2.value = timeKeys.value.length - 14;
    //   listCount3.value = listCount2.value + 14;
    // } else {
    //   listCount1.value = 0;
    //   listCount2.value = 0;
    //   listCount3.value = timeKeys.value.length;
    // }
  }

  if (process.server && error?.value) {
    throw new Error(error.value?.data?.data || 'Server Error');
  }
};

// 格式化时间
function formatTime(datetime) {
  return datetime; // 如果有需要，可以对时间进行进一步格式化
}

async function changeList() {
  const { data, error } = await usePreviewTeacherDataApi(route.params.id,days.value[selectedDayIndex.value].day,'times');
  if (data?.value) {
    list.value = allList.value = data.value.attendance_table ?? [];
    timeKeys.value = Object.keys(list.value);
    // if (timeKeys.value.length > 26) {
    //   listCount1.value = timeKeys.value.length - 26;
    //   listCount2.value = listCount1.value + 12;
    //   listCount3.value = listCount2.value + 14;
    // } else if (timeKeys.value.length > 14 && timeKeys.value.length <= 26) {
    //   listCount1.value = 0;
    //   listCount2.value = timeKeys.value.length - 14;
    //   listCount3.value = listCount2.value + 14;
    // } else {
    //   listCount1.value = 0;
    //   listCount2.value = 0;
    //   listCount3.value = timeKeys.value.length;
    // }
  }
}

// 点击日期处理
async function handleClickDate(pindex, index) {
  searchDayIndex.value = pindex * 3 + index;
  selectedDayIndex.value = searchDayIndex.value;
  await changeList();
}

async function handleClickDatePc(pindex, index) {
  searchDayIndexPc.value = pindex * 7 + index;
  selectedDayIndex.value = searchDayIndexPc.value;
  await changeList();
}

// 选择时间段
function selectedTime(timekey) {
  const timeData = list?.value[timekey] ? list?.value[timekey] : false;
  if (timeData && timeData?.is_reserved === 0 && timeData?.status === 1) {

  } else {
    return;
  }
  parameters.value = `${info.value.id}_${timeData.lesson_unixtime}`;
  usePlanshow.value = true;
}

// 关闭弹框
function changeShow() {
  usePlanshow.value = false;
}

// 返回上一页功能
function goBack() {
  if (window.history.length > 1) {
    router.go(-1); // 使用 Vue Router 返回上一页
  } else {
    router.push('/'); // 如果没有上一页，跳转到首页或其他页面
  }
}

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  getInfo();
  // let now = new Date();
  // refreshKey.value = now.getMilliseconds();
});

// 移除事件監聽器以防止內存泄漏
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

function changeTab() {
  // console.log('selectedTab.value:'+selectedTab.value);
  if (selectedTab.value === '1') {
    changeList();
  }
}
</script>

<style scoped>
.main-photo{
  position: relative;
}
/* 角標樣式 */
.cnRibbon {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  overflow: hidden;
  pointer-events: none; /* 不影響點擊 */
  z-index: 999;
}
.cnRibbon::before {
  content: '中国語のみ';
  position: absolute;
  left: -28px;
  top: 18px;
  transform: rotate(-45deg);
  background: rgba(255, 248, 252, 0.8); /* 幾乎白的淡粉 */
  color: #C6383A;
  box-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  font-size: 12px;
  padding: 4px 24px;
  font-weight: bold;
  border-radius: 2px;
  white-space: nowrap;
}
.photo-carousel {
  width: 300px;
  margin-right: 24px;
}

.main-photo {
  width: 300px;
  height: 300px;
  border: 1px solid #DADADA;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* 重要：為絕對定位的 tag 提供參考點 */
}
.img-placeholder {
  width: 100%;
  aspect-ratio: 3 / 4; /* 或固定 height 也可 */
  background-color: #FFFFFF;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

/* skeleton loading 動畫 */
.animated-loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  height: 100%;
  width: 150%;
  background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    left: 100%;
  }
}

.fade-in {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.courseTag {
  position: absolute;
  bottom: 10px;
  transform: scale(1.1);
  left: 10px;
  z-index: 2;
  height: 18px;
}


.main-photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumbnail-row {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 1px solid transparent;
  cursor: pointer;
}

.thumbnail.active {
  border: 2px solid #FFAA47;
}

.commentB{
 height: 640px; overflow: scroll;
}
.ck-content{
  text-align: left;
  margin-top: 24px;
}
.ck-content p{
  line-height: 24px !important;
}
.youtube-wrapper {
  position: relative;
  width: 100%;
  max-width: 680px;       /* 桌機寬度限制 */
  margin: 1.5rem auto;     /* 上下保留空間 */
  padding-bottom: 38%;  /* 16:7 比例（原本 56.25%，現在更扁） */
  overflow: hidden;
  height: 0;
}

::v-deep(.youtube-wrapper iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  border: 0;
}
swiper-container::part(button-next){
  color: rgba(255, 255, 255, 0);
  background-image: url("../../assets/images/sw_next.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 0 10px;
}
swiper-container::part(button-prev) {
  color: rgba(255, 255, 255, 0);
  background-image: url("../../assets/images/sw_prev.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 9px 10px;
}

.tabs {
  width: 1130px;
  border: 1px solid #ccc;
  background-color: #F9F9F9;
}
.tab {
  display: none;
}
.tab-label {
  display: inline-block;
  cursor: pointer;
  background: #f0f0f0;
  position: relative;
  transition: background 0.3s, color 0.3s;
  width: 50%;
  text-align: center;
  line-height: 70px;
  height: 70px;
  font-weight: bold;
  color: #666666;
  font-size: 16px;
}
.tab-label:hover {
  background: #e0e0e0;
}
.tab-content {
  display: none;
  border-top: none;
  background-color: #F9F9F9;
}
.tab-content2 {
  padding: 10px 30px 30px 30px;
  background: #FFFFFF;
}
.tab-content2 h2{
  font-weight: bold;
  font-size: 20px;
  padding: 30px 0 20px 0;
}
.tab-content2 span{
  line-height: 24px;
}
#tab1:checked ~ .tab-label[for="tab1"],
#tab2:checked ~ .tab-label[for="tab2"] {
  background: #FFAA47;
  font-weight: bold;
  color: #424242;
}
#tab1:checked ~ .tab-content1,
#tab2:checked ~ .tab-content2 {
  display: block;
}
.tabs input[type="radio"] {
  display: none;
}
.select_everytime{
  padding: 0;
  border: 0;
}
.button_confirm{
  margin-top: 30px;
}
.commentTeacher{
  position: relative;
  padding: 12px 20px;
  background-color: #FFF9EC;
  border-bottom: 1px solid #FFFFFF;
  font-size: 14px;
  text-align: left;
}
.commentTeacher li:nth-child(2){
  position: absolute;
  right: 4%;
  font-size: 12px;
  color: #666666;
}

.hover-table {
  position: absolute;
  top: 124px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: none;
  transform: scale(1);
  width: 230px;
}

.hover-table .table-content {
  padding: 0 6px;
  z-index: 999;
}

.cancel-rate:hover + .hover-table,
.hover-table:hover {
  display: block;
}

.table-content ul{
  display: inline-block;
  float: left;
  margin-right: 5px;
  padding: 5px;
}

.table-content ul li:nth-child(1){
  background-color: #424242;
  color: #FFFFFF;
  font-size: 12px;
  width: 100%;
  padding: 3px;
  margin-bottom: 0;
}
.table-content ul li:nth-child(2){
  display: inline-block;
  float: left;
  width: 100px;
  color: #424242;
  border-right: 1px solid #CCCCCC;
}
.table-content ul li:nth-child(3){
  display: inline-block;
  float: left;
  width: 100px;
  color: #424242;
}
.table-content ul li:nth-child(2) span{
  font-size: 20px;
  padding-top: 6px;
}
.table-content ul li:nth-child(3) span{
  font-size: 20px;
  padding-top: 6px;
}
.select_everytime{
  padding-top: 20px;
}
.teacherDphoto .tagS{
  bottom: 0;
  top: 0;
}
.teacherDphoto .tagL{
  bottom: 0;
  top: 0;
}
.commentW{
  font-size: 14px;
  padding: 8px 8px 8px 0;
  width: 80%;
  line-height: 20px;
}
.__rate-t5b718-2{
  --n-item-size:16px;
}
.teacherProfile{
  margin-top: 16px;
  padding: 24px;
}

.cancel-rate{
  border-radius: 20px;
  cursor: pointer;
  padding: 0 10px;
  margin-bottom: 10px;
}


@media screen and (max-width: 520px) {
  .everytimeWrap{
    text-align: left;
    margin: auto;
    padding: 0 4%;
  }
  .select_everytime .everytimeWrap li{
    width: 31%;
    margin: 1%;
  }
  .timeTitle{
    text-align: left;
    padding: 0 5%;
  }

  .tabs{
    width: 100%;
  }
  .teacherDphoto{
    margin: 0 auto 10px auto;
  }
  .n-rate:not(.n-rate--readonly){
    position: absolute;
    left: 20px;
  }
  .tutorProfile{
    width: 50%;
    margin: 10px 0;
    vertical-align: top;
  }
  .tutorProfile li:nth-child(2){
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    clear: both;
    position: relative;
    width: auto;
    padding: 0 10px;
  }
  .select_everytime{
    padding-top: 20px;
  }
  .teacherDetail{
    width: 100%;
  }
  .cancelratio{
    margin-top: 10px;
    width: fit-content;
    padding: 8px;
    transform: scale(1);
  }
  .hover-table{
    display: block;
    position: relative;
    top: auto;
    right: auto;
    width: 240px;
    margin: auto;
  }
  .teacherProfile{
    display: block;
  }
  .table-content ul{
    display: block;
    margin: auto;
    width: 100%;
  }
  .commentW{
    font-size: 14px;
    padding: 0;
    width: 100%;
    line-height: 20px;
  }
  .commentTeacher li:nth-child(2){
    padding-top: 1%;
  }
  .commentTeacher li{
    margin: 1% 0;
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
  .teacherProfile .teacherDetail .name{
    display: block;
    width: 100%;
    margin: 0 auto 4px auto;
  }
  .teacherProfile .teacherDetail .teacherID{
    display: block;
    width: 100%;
    margin: 4px auto;
  }
  .youtube-wrapper {
    max-width: 100%;
    padding-bottom: 56.25%;
    margin: 0;
  }
  .commentB{
    height: 360px;
    overflow: scroll;
  }
  .photo-carousel {
    width: 100%;
    max-width: 330px;
    margin: 0 auto 20px auto;
  }

  .main-photo {
    width: 100%;
    height: 300px;
    position: relative;
    border: 1px solid #eeeeee;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-photo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .thumbnail-row {
    display: flex;
    justify-content: center;  /* ← 改這裡 */
    gap: 6px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .thumbnail {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border: 1px solid transparent;
    cursor: pointer;
  }

  .thumbnail.active {
    border: 2px solid #FFAA47;
  }
}
</style>