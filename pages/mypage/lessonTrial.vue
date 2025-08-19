<template>
  <div class="mypageTemplate">
    <div v-if="useStore?.studentInfo?.is_corporate_member !== 1">
      <div>
        <img v-if="useStore?.studentInfo?.pay_plans_img" :src="useStore?.studentInfo?.pay_plans_img" class="eventBlock"/>
      </div>
    </div>

    <main>
      <div class="netchina_contents">
        <div class="blockW">
          <ul class="firstRes">
            <li class="headline">体験レッスン予約へ</li>
            <li>今日・明日・明後日のレッスンでしたら、下記の先生がおすすめです</li>
            <li>他の日程や講師を検索して予約したい方は<nuxt-link class="linkStyle" to="/mypage/searchTeacher">こちら</nuxt-link></li>
          </ul>
        <swiper-container navigation="true">
          <swiper-slide>
            <ul class="lessonTrial_head_navi lessonTrial">
              <li
                v-for="(day, index) in days.slice(0, dayLimit)"
                :class="searchDayIndex == index ? 'selected' : ''"
                :key="index"
                @click="changeDay(day.day,0,index)"
              >
                <span
                  >{{ day.md }}<span class="font13"> ({{ day.week }})</span></span
                ><br /><span class="fs18 Bit">{{ getDayLabel(index) }}</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="lessonTrial_head_navi">
              <li
                v-for="(day, index) in days.slice(dayLimit, 6)"
                :class="searchDayIndex == index+dayLimit ? 'selected' : ''"
                :key="index"
                @click="changeDay(day.day,1,index)"
              >
                <span>{{ day.md }}<span class="font13"> ({{ day.week }})</span></span
                ><br /><span class="fs18 Bit"></span>
              </li>
            </ul>
          </swiper-slide>
        </swiper-container>
          <div class="select_menu">
            <div class="learn-type-div">
              <span>講師の種類</span>
              <span>
                <input type="radio" id="learn_type1" name="learn_type" value="2" v-model="learnType" :checked="learnType === 2" placeholder="全部" />
                <label for="learn_type1">全部</label>
                <input type="radio" id="learn_type2" name="learn_type" value="0" v-model="learnType" :checked="learnType === 0" placeholder="学習講師" />
                <label for="learn_type1">学習講師</label>
                <input type="radio" id="learn_type3" name="learn_type" value="1" v-model="learnType" :checked="learnType === 1" placeholder="会話講師"/>
                <label for="learn_type1">会話講師</label>
              </span>
            </div>
          </div>
          <div class="subb">
            <button type="submit" @click="submitForm" class="Submit_search">検索</button>
          </div>
          <div class="lessonTrialBG">
          <div
            v-for="(teacher, index) in allrows"
            :key="index"
            class="select_teachers timeGrid_inherit"
          >
            <div class="teacherInfo">
              <router-link :to="`/teachers/${teacher.id}`">
                <div class="teacherPhoto">
                <span v-if="teacher.learn_type == 0" class="tagL">総合</span>
                <span v-else class="tagS">会話</span>
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
              <ul class="teacherLabels">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="timeGridWrap scroll_bar scroll_transbg">
              <ul class="timeGrid">
                <li v-for="(lesson, key) in teacher.times" :class="lesson.is_reserved == 1 || lesson.status == 0 ? 'lesson_disabled' : ''" :key="key" @click="selectTime(teacher.id,lesson.lesson_unixtime,lesson.is_reserved,lesson.status)">
<!--                  <router-link :to="`/confirm-${teacher.id}/${lesson.lesson_unixtime}`">-->
                    {{key}}-
<!--                  </router-link>-->
                </li>
              </ul>
            </div>
          </div>

          <n-pagination size="large" style="margin-top:10px;" :item-count="alltotal" :page="page" :page-size="pagelimit"
                        :on-update:page="handlePageChange" />

        </div>
        </div>
      </div>
    </main>
  </div>
  <use-plan v-if="usePlanshow === true" :parameters="parameters" @changeEvent="changeShow" @reloadData="getData"></use-plan>
</template>

<script setup>
import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import {usePage} from "~/composables/usePage";
import { register } from "swiper/element/bundle";
import {useIndexDataApi, useIndexListDataApi} from "~/apis";
import {addBookmark, formatDate} from "~/composables/useUtil";
import {NPagination,createDiscreteApi,NRate} from "naive-ui";
import {useMainStore} from "~/composables/store";
import {onMounted} from "vue";

register();

const page = ref(1);
let pagelimit = ref(10);
let searchDay = ref(formatDate(new Date()));
let searchDayIndex = ref(0);
let days = ref([]);
let allrows = ref([]);
let alltotal = ref(0);
const dayLimit = 3;
let parameters = ref('');
let usePlanshow = ref(false);
const useStore = useMainStore();
const contractStatus = useStore.contract_status;
const maps = ref([]);
const learnType = ref(2);
learnType.value = useStore.learn_type;


const getData = async () => {
  usePlanshow.value = false;
  let {
    pending,
    data,
    error,
    rows,
    total
  } = await usePage(() => {
    return useIndexDataApi({
      per_page: pagelimit.value,
      page: page?.value || 1,
      get_count: true,
      search_day: searchDay.value,
      search_learn_type: learnType.value == 2 ? '' : learnType.value
    })
  })
  if (data?.value) {
    days.value = data?.value?.days ?? [];
    allrows.value = rows.value ?? [];
    alltotal.value = total.value ?? [];
    maps.value = data?.value.maps ?? [];
  }

}

onMounted(() => {
  getData();
})

const getDayLabel = (index) => {
  if (index === 0) return "今日";
  if (index === 1) return "明日";
  if (index === 2) return "明後日";
};

function handlePageChange(p) {
  page.value = p;
  getData();
}

function changeDay(day,pindex,indexd) {
  searchDay.value = day;
  searchDayIndex.value = pindex*dayLimit+indexd;
  //重新提交请求
  getData();
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

function submitForm() {
  if (learnType.value != 2) {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.warning({
      title: "ご注意",
      content: "体験期間中は、講師の種類を切り替えて予約することは可能ですが、ご入会後、ご利用のプランの講師のみ表示されます。",
      positiveText: "了解です",
      onPositiveClick: () => {
        getData();
      },
    });
  } else {
    getData();
  }
}
</script>

<style scoped>
swiper-container::part(button-next),
swiper-container::part(button-prev) {
  color: #fff;
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
.clockPos{display: block; margin-top: 8px;}
.font13{font-size: 13px;}

::v-deep(.n-button){
  width: 200px !important;
}

</style>

<style scoped>
  .n-button--small-type
  {
    width: 43%;
    min-width: fit-content;
  }
  .subb{
    position: relative; background-color:#FFF9EC; margin-bottom: 20px; padding-bottom: 20px;
  }
  .learn-type-div{
    text-align: center;
  }
  @media screen and (max-width: 520px) {
    .learn-type-div label{
      margin-right: 8px;
    }
    .netchina_contents .lessonTrial_head_navi{
      width: 100%;
    }
    .netchina_contents .lessonTrial_head_navi li{
      width: 60%;
      font-size: 16px;
    }
    .netchina_contents .lessonTrial_head_navi .Bit{
      font-size: 11px;
      display: none;
    }
    .teacherInfo{
      margin-bottom: 20px;
    }
  }
</style>

<style>
.n-dialog .n-dialog__title{
  display: block;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}
.n-dialog .n-dialog__icon {
  font-size: 60px;
  display: block;
  margin: auto;
}
.n-dialog.n-dialog--icon-left .n-dialog__icon{
  margin: 10px auto;
}

.n-dialog .n-dialog__action{
  display: flex;
  margin: 20px auto 0 auto !important;
  width: 100%;
  text-align: center;
  flex-direction: column;
}

.n-dialog.n-dialog--icon-left.n-dialog--closable .n-dialog__title{
  padding-right: 0;
}

.n-dialog .n-dialog__action > :last-child {
  min-width: fit-content;
  height: 48px;
  font-size: 20px;
  text-align: center;
  padding: 0 96px;
  position: relative;
  order: 1;
  margin: auto;
  display: block;
  --n-border: 0 !important;
  --n-border-hover: 0 !important;
  --n-color:var(--pink-dark) !important;
  --n-color-hover:var(--pink-dark) !important;
  --n-color-pressed:var(--pink-dark) !important;
  --n-color-focus:var(--pink-dark) !important;
  --n-color-disabled:var(--pink-dark) !important;
  --n-ripple-color:var(--pink-dark) !important;
}
.n-dialog .n-dialog__action > *:not(:last-child){
  background-color: #EEEEEE;
  --n-border: 0 !important;
  --n-border-hover: 0 !important;
  color: #BBBBBB;
  height: 30px;
  font-size: 14px;
  font-weight: normal;
  padding: 0 16px;
  margin: 16px auto;
  order:2;
  display: block;
}

.n-dialog .n-dialog__close{
  right: 4px;
  top: 4px;
}
.n-dialog .n-dialog__icon{
  color: #f0a020;
}
.n-button--info-type{
  margin: auto;
  display: block;
}
.n-dialog.n-modal{
  width: 516px;
}
.timeGrid li.lesson_disabled{
  display: none;
}
@media screen and (max-width: 520px) {

  .n-dialog .n-dialog__action > *:not(:last-child){
    margin-left: auto;
    display: block;
    height: auto;
    padding: 10px;
  }
  .n-button .n-button__content{
    text-align: center;
  }
  .n-button .n-button__content{
    display: block;
  }
  .n-dialog .n-dialog__action > :last-child {
    font-size: 15px;
    height: auto;
    padding: 10px;
  }
  .n-dialog .n-dialog__action > :last-child span{
    display: block;
    margin: auto;
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
}

</style>

    