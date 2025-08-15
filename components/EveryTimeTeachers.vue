<template>
  <div class="mypageTemplate">
    <!--  レッスントライアルウィンドウ  -->
    <div>
      <p class="time-teachers-head">
        <span>{{props.day}}</span>
        <span>{{props.week}}</span>
        <span v-if="props.timezone === 'cn'">{{props.timeCn}}</span>
        <span v-else>{{props.time}}</span>
      </p>

      <div class="pc" style="background-color: #EEEEEE;">
        <div v-if="isTeacherDataLoaded">
          <div v-if="rows.length">
            <div class="select_teachers selected_time_teachers timeGrid_inherit" v-for="(teacher, teacherIndex) in rows" :key="teacherIndex">
            <div class="teacherInfo">
              <router-link :to="`/teachers/${teacher.id}`">
                <div class="teacherPhoto">
<!--                  <div class="cnRibbon"></div>-->
                  <img :src="teacher.face_img5" alt="" class="tphoto"/>
                </div>
              </router-link>
              <ul>
                <li class="pinyin">{{teacher.name_pinyin}}</li>
                <li class="name">{{ teacher.name_cn }}<span class="teacherID">ID:{{teacher.id}}</span></li>

                <li class="cityT">{{ teacher.province_addr }}{{ teacher.current_address }}</li>

                <li>
                  <span class="sptitle">日本語</span>
                  <span class="spdes">{{ teacher.japanese_level }}{{maps['japanese_level'][teacher.japanese_level]}}</span>
                </li>
                <li>
                  <span class="sptitle">業界の得意分野</span>
                  <span class="spdes">{{ teacher.topic_str }}</span>
                </li>

                <li class="tagT"><span><n-rate readonly allow-half :value="teacher.avg_score" /></span></li>
              </ul>

              <p class="favorite" @click="addBookmark(teacher.id)">
                <span>
                  <img :src="useStore?.studentInfo?.bteachers?.includes(teacher.id) ? IconHeart : IconHeartNone" alt="" />
                  お気に入り
                </span>
              </p>

            </div>
            <div class="timeGridWrap scroll_bar scroll_transbg">
              <n-button class="selected_time_button_confirm" @click="selectTeacher(teacher.id)"><span>予約</span></n-button>
            </div>
          </div>
          </div>
          <div v-else>
            <div class="snone">該当者なし</div>
          </div>
          <n-pagination size="small" style="padding:10px;" :item-count="total" :page="page"
                        :on-update:page="handlePageChange" />
        </div>
      </div>

      <!--   トライアルウィンドウを閉じる   -->
    </div>
      <!--  trial_contents_wrap FlexCenter -->
  </div>
  <use-plan v-if="usePlanshow" :parameters="parameters" :learnType="learnType" @changeEvent="changeShow"></use-plan>
</template>


<script setup>
import IconHeart from "../assets/SVG/icon_heart.svg";
import IconHeartNone from "../assets/SVG/icon_heart_none.svg";
// definePageMeta({
//   // middleware: "auth",
//   // layout: "mypage",
// });

import { register } from "swiper/element/bundle";
import {addBookmark,formatDate} from "~/composables/useUtil";
import {
  NPagination,NRate
} from "naive-ui"
import {usePage} from "~/composables/usePage";
import {useIndexListDataApi, useSelectedTimeTeacherListData} from "~/apis";
import {useMainStore} from "~/composables/store";

// register();

const props = defineProps({
  day: {
    type: String,
    default: ''
  },
  week: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  timeCn: {
    type: String,
    default: ''
  },
  timezone: {
    type: String,
    default: ''
  },
  searchDay: {
    type: String,
    default: ''
  },
  learnType: {
    type: String,
    default: ''
  },
  integralRank: {
    type: String,
    default: 0
  },
  bookmark: {
    type: Boolean,
    default: false
  },
})

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
let searchUnixtime = ref(0);
const maps = ref([]);
const useStore = useMainStore();

// 1番目は「今日」、2番目は「明日」、3番目は「明後日」と表示するためのメソッド

const reservation = async () => {
  let res2 = await usePage(() => {
    return useSelectedTimeTeacherListData({
      search_unixtime:props.searchDay+' '+props.time+':00',flag:'time',
      search_learn_type:props.learnType,
      integral_rank:props.integralRank,
      bookmark:props.bookmark,
      get_count:true,
      page:page.value})
  });
  // let res2 = await useSelectedTimeTeacherListData({search_unixtime:props.searchDay+' '+props.time+':00',flag:'time',get_count:true,page:page.value})

  console.log('res2:'+JSON.stringify(res2));
  if (res2) {
    page_data.value = res2?.data.value ?? [];
    rows.value = res2?.rows.value ?? [];
    total.value = res2?.total.value ?? [];
    searchUnixtime.value = res2?.data.value.search_unixtime ?? 0;
    isTeacherDataLoaded.value = true;
    maps.value = res2?.data.value.maps ?? [];
  }

}
reservation();

function handlePageChange(p) {
  page.value = p;
  reservation();
}

function changeShow() {
  usePlanshow.value = false;
}
function selectTeacher(teacher_id) {
  parameters.value = teacher_id+'_'+searchUnixtime.value;
  usePlanshow.value = true;
}
</script>

<style scoped>
.time-teachers-head {
  font-size: 24px;
  color:#424242;
  line-height: 70px;
  text-align: left;
  font-weight: bold;
  padding-left: 32px;
}
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
.selected_time_teachers {
  width: 49.5%;
  height: fit-content;
  grid-template-columns: 2fr 1fr;
  filter: none;
  display: inline-block;
  position: relative;
}
.selected_time_button_confirm {
  width: 93%;
  height: 36px;
  margin: 0 auto;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .12s ease;
  font-weight: bold;
  border-radius: 4px;
  border:1px solid #FA8373;
  color: #FA8373;
  cursor: pointer;
}
.select_teachers .teacherInfo{
  grid-template-rows:0fr 0fr;
  margin-bottom: 24px !important;
}
.select_teachers{
  padding: 20px;
  vertical-align: top;
  min-height: 250px;
}
.teacherInfo{
  grid-template-columns:1fr 2.4fr;
}

.n-pagination{
  text-align: center;
  width: 120px;
  margin: auto;
}
.select_teachers .teacherInfo>a>img{
  margin-left: 12%;
}
.select_teachers .teacherInfo ul{
  margin-left: 0;
}
.select_teachers .teacherInfo .favorite{
  left: 3.4%;
}

.select_teachers .timeGridWrap{
  height: auto;
}
.pc{
  background-color: #FFFFFF !important;
  min-height: fit-content;
}
.select_teachers{
  background-color: #F9F9F9;
  border-right: 1px solid #FFFFFF;
}
.teacherPhoto{
  margin-left: 12px;
}
.select_teachers .teacherInfo ul{
  margin-left: 10px;
  overflow: visible;
}
.select_teachers .teacherInfo{
  margin-bottom: 20px;
}

@media screen and (max-width: 520px) {
  .select_teachers .teacherInfo{
    margin-bottom: 0;
  }
  .select_teachers .teacherInfo .favorite{
    left: 8px;
  }
  .teacherPhoto{
    margin-left: 6px;
  }
  .teacherInfo a{
    display: inline-block;
  }
  .selected_time_teachers{
    display: block;
    height: auto;
    width: 100%;
  }
  .select_teachers .teacherInfo>a>img{
    margin-left: 6%;
  }
  .select_teachers .teacherInfo{
    padding: 1%;
    margin-bottom: 0 !important;
  }
  .select_teachers .teacherInfo ul{
    display: inline-block;
    position: relative;
    width: 49%;
    overflow: hidden;
    top: 0;
    left: 2px;
    vertical-align: top;
  }

  .select_teachers .teacherInfo ul .tagP{
    margin-top: 10px;
  }

  .selected_time_teachers{
    //height: auto;
  }
  .select_teachers .timeGridWrap{
    height: auto;
    display: block;
    position: relative;
  }
  .select_teachers .teacherInfo .favorite{
    margin: 0;
  }
  .teacherInfo{
    margin: 0;
  }
  .pc{
    display: block;
  }
}

</style>