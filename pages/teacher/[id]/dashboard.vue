<template>
  <div  class="teacher-dashboard">
    <div class="pc">
      <NoticeAndMessage />
    </div>

    <div class="font-normal dashborard-desc-div">
      <div class="teacherMess"><span v-if="teacherInfo">{{teacherInfo.name_cn}}</span>老师 您好，这里是您近期要负责的课程，请确认 ~</div>
      <div class="timeOption">
        时区选择：
        <select id="time_select" v-model="timezone" @change="changeTimezone">
          <option :value="tkey" v-for="(titem,tkey) in timezoneOption" data-number="0">
            {{titem}}</option>
        </select><div class="down-triangle"></div>
      </div>
    </div>

    <!-- 课程表 -->
    <div class="courses pc">
      <div class="reservedList">
        <swiper-container navigation="true">
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(0, 3)" class="days-flex" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="handleClickDate(0,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(3, 6)" class="days-flex" :class="searchDayIndex == index + 3 ? 'selected' : ''" :key="index" @click="handleClickDate(1,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(6, 9)" class="days-flex" :class="searchDayIndex == index + 6? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(9, 12)" class="days-flex" :class="searchDayIndex == index + 9? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(12, 15)" class="days-flex" :class="searchDayIndex == index + 12? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(15, 18)" class="days-flex" :class="searchDayIndex == index + 15? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(18, 21)" class="days-flex" :class="searchDayIndex == index + 18? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
        </swiper-container>
      </div>

      <div class="group">
        <div v-for="(item) in result_times" :key="item.id" class="item" :status="item.status" @click="changeOpen(item.id,item.status,item.expired,item.stime,item.etime,item.lesson_id,item.lesson_unixtime)">
          <p class="hours">
            <span class="stime">{{ item.stime }} - {{ item.etime }}</span>
            <span class="tName"><div>{{ item.text }}</div></span>
            <span class="tSoftware">{{ item.software }}</span>

            <div class="actionWidth">
            <span v-if="item.status == 6"><n-button class="editButton" @click="addReport">
              <img class="shockmark" alt="" src="../../../assets/images/shockmark.png"/>
              请填写记录
            <img class="arrowbtn" alt="" src="../../../assets/images/arrowbtn.png"/>
            </n-button></span>
            <span v-else-if="item.status == 7 || item.status == 9 || item.status == 10">
              <img src="../../../assets/images/recordsuccess.png" class="recordsuccess"/>
              记录完成
            </span>
            <span class="noneRecord" v-else-if="item.status == 8">无课后记录</span>
            <span v-else><img class="readMore" alt="" src="../../../assets/images/readmore.png"/></span>
            </div>
          </p>
        </div>
      </div>
<!--      <div style="text-align: center;">-->
<!--        x:未开课  &#45;&#45;:未被预约  o:被预约  灰色:已结束时间-->
<!--      </div>-->
    </div>

    <div class="courses sp">
      <div class="reservedList" style="width:100vw;">
        <swiper-container navigation="true">
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(0, 3)" class="days-flex" :class="searchDayIndex == index ? 'selected' : ''" :key="index" @click="handleClickDate(0,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(3, 6)" class="days-flex" :class="searchDayIndex == index + 3 ? 'selected' : ''" :key="index" @click="handleClickDate(1,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(6, 9)" class="days-flex" :class="searchDayIndex == index + 6? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(9, 12)" class="days-flex" :class="searchDayIndex == index + 9? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(12, 15)" class="days-flex" :class="searchDayIndex == index + 12? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(15, 18)" class="days-flex" :class="searchDayIndex == index + 15? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="select_date">
              <li v-for="(day, index) in teacherDays.slice(18, 21)" class="days-flex" :class="searchDayIndex == index + 18? 'selected' : ''" :key="index" @click="handleClickDate(2,index)">
                <span>{{ day.md }}</span><span class="week-span">{{day.week}}({{day.num}})</span>
              </li>
            </ul>
          </swiper-slide>
        </swiper-container>
      </div>

      <div class="group">
        <div class="item" v-for="(item) in result_times" :key="item.id" :status="item.status" @click="changeOpen(item.id,item.status,item.expired,item.stime,item.etime,item.lesson_id,item.lesson_unixtime)">
          <p class="hours">
            <span class="stime">{{ item.stime }} - {{ item.etime }}</span>
            <span class="tName"><div>{{ item.text }}</div></span>
            <span class="tSoftware">{{ item.software }}</span>

            <div class="actionWidth">
            <span v-if="item.status == 6"><n-button class="editButton" @click="addReport">
              <img class="shockmark" alt="" src="../../../assets/images/shockmark.png"/>
              请填写记录
            <img class="arrowbtn" alt="" src="../../../assets/images/arrowbtn.png"/>
            </n-button></span>
              <span v-else-if="item.status == 7 || item.status == 9">
              <img src="../../../assets/images/recordsuccess.png" class="recordsuccess"/>
              记录完成
            </span>
              <span v-else-if="item.status == 8">无课后记录</span>
              <span v-else><img class="readMore" alt="" src="../../../assets/images/readmore.png"/></span>
            </div>
          </p>
        </div>
      </div>
<!--      <div style="text-align: center;">-->
<!--        x:未开课  &#45;&#45;:未被预约  o:被预约  灰色:已结束时间-->
<!--      </div>-->
    </div>

<!--    <div v-if="open_show" class="course-open border border-color-third col update-class-div" :style="'left: '+selectedLeft+'px;top: '+selectedTop+'px'">-->
<!--      <div class="padding-l bg-third relative"><span class="modal_close_btn" @click="open_show=false">x</span></div>-->
<!--      <div class="padding-l padding-y-xl bg-light-yellow col gap-xl items-center relative" style="padding: 70px 0 40px 0;">-->
<!--        <div class="date">-->
<!--          <p class="border border-color-third fit-content padding-s padding-x-xl border-radius-l secondary">{{teacherDays[searchDayIndex].md}}-->
<!--            {{open_show_stime}}-{{open_show_etime}}</p>-->
<!--        </div>-->
<!--        <div v-if="open_show_status == 2">-->
<!--          <p>本节课，您已公开，尚未被预约。</p>-->
<!--          <p class="border border-color-third fit-content padding padding-x-xl border-radius-l change-class-p" @click="changeClass(0)">点击不再公开这节课</p>-->
<!--        </div>-->
<!--        <div  v-if="open_show_status == 3">-->
<!--          <p>本节课，您还没有公开，学生无法预约。</p>-->
<!--          <p class="border border-color-third fit-content padding padding-x-xl border-radius-l change-class-p" @click="changeClass(1)">点击公开这节课</p>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="padding-l bg-third"></div>-->
<!--    </div>-->

    <n-modal v-model:show="lesson_show" :block-scroll="false">
      <LessonReport ref="childReport" v-if="lesson_show" :lesson_id="selected_lesson_id" :open_show_stime="open_show_stime" :open_show_etime="open_show_etime" :selected_day="selected_day" @cancelLesson="cancelLesson" @cancelService="cancelService" :status="open_show_status" style="z-index:1000;width:60%;margin:0 20%;" >
      </LessonReport>
    </n-modal>
  </div>
</template>
<script setup>
import NoticeAndMessage from "../components/notice-and-message.vue"
import { ref } from "vue"
import {
  useTeacherTimesIndexInfo, useTeacherUpdateClassStatus, useUpdateTeacherTimezoneData,
} from "~/apis/teacher";
import { register } from "swiper/element/bundle";
import {createDiscreteApi, NModal} from "naive-ui";


register();

const teacherDays = ref([]);
const times = ref([]);
const result_times = ref([]);
let searchDayIndex = ref(1);
let open_show = ref(false);
let open_show_status = ref(1);
let open_show_stime = ref('');
let open_show_etime = ref('');
let selected_day = ref('');
let selected_timetable_id = ref(0);
let lesson_show = ref(false);
let selected_lesson_unixtime = ref(0);
let selected_lesson_id = ref(0);
let selectedTop = ref(800);
let selectedLeft = ref(800);
let timezoneOption = ref([]);
let timezone = ref('');
const useStore = useMainStore();
const teacherInfo = useStore.teacherInfo;
const { dialog } = createDiscreteApi(["dialog"])
let childReport = ref(null);

const getTimesInfo = async (selected_day) => {
  const { data: lists, error: err  } = await useTeacherTimesIndexInfo(selected_day);
  if (lists.value !== null) {
    teacherDays.value = lists?.value.days ?? [];
    result_times.value = lists?.value.result_times ?? [];
    timezoneOption.value = lists?.value.timezoneOption ?? [];
    timezone.value = lists?.value.timezone ?? '';
    lesson_show.value = false;
  }
}

onMounted(() => {
  getTimesInfo('');
});

async function handleClickDate(pindex,index) {
  searchDayIndex.value = pindex*3+index;
  getTimesInfo(teacherDays.value[searchDayIndex.value].day);
}

// async function changeClass(status) {
//   const {pending, data: changeInfo  } = await useTeacherUpdateClassStatus(selected_timetable_id.value,status,selected_lesson_unixtime.value);
//   if (changeInfo.value.err == false) {
//     const { message } = createDiscreteApi(["message"])
//     open_show.value = false;
//     getTimesInfo(teacherDays.value[searchDayIndex.value].day);
//   }
// }

async function changeOpen(id,status,expired,stime,etime,lesson_id,lesson_unixtime) {
  lesson_show.value = false;
  // selectedTop.value = event.clientY+350;
  // selectedLeft.value = event.clientX-220;
  if (expired === true && lesson_id === 0) {
    return false;
  }
  open_show_stime.value = stime;
  open_show_etime.value = etime;
  selected_day.value = teacherDays.value[searchDayIndex.value].md;
  if (status === 1 || status === 6 || status === 7 || status === 8 || status === 9 || status === 10) {
    // window.scrollTo({
    //   top: '800',
    //   behavior: 'smooth' // 添加平滑滚动效果
    // });

    open_show_status.value = status;
    selected_lesson_id.value = lesson_id;
    open_show.value = false;
    lesson_show.value = true;
    if (childReport.value) {
      childReport.value.getLessonInfo(lesson_id);
    }

  } else if (status === 2 || status === 3) {
    open_show.value = true;
    lesson_show.value = false;
    open_show_status.value = status;
    selected_timetable_id.value = id;
    selected_lesson_unixtime.value = lesson_unixtime;
  }

}

function cancelLesson() {
  lesson_show.value = false;
  getTimesInfo(teacherDays.value[searchDayIndex.value].day);
}

function cancelService() {
  lesson_show.value = false;
  getTimesInfo(teacherDays.value[searchDayIndex.value].day);
}

async function changeTimezoneFun() {
  const {data: info } = await useUpdateTeacherTimezoneData(timezone.value);
  if (info.value !== null && info.value !== undefined) {
    if (info.value.err === false) {
      const { message } = createDiscreteApi(["message"]);
      message.success('修改成功');
      if (searchDayIndex.value == 0) {
        await getTimesInfo('');
      } else {
        await getTimesInfo(teacherDays.value[searchDayIndex.value].day);
      }
      open_show.value = false;
      lesson_show.value = false;
    }
  }
}

async function changeTimezone() {
  let msg = timezone.value === 'CN' ? '中国时间' : '日本时间';
  dialog.warning({
    content: "您的开课时间和预约时间都将按照-"+msg+"显示？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      await changeTimezoneFun();
    },
    onNegativeClick: async () => {
      timezone.value = timezone.value === 'CN' ? 'JP' : 'CN';
    },
  })

}

const showUpload = ref(false);

function checkBodyOverflow() {
  console.log("Body overflow is:", document.body.style.overflow);
}

</script>

<style scoped>
body{
  overflow: scroll;
}
.dashborard-desc-div {
  text-align: left;
  font-size: 18px;
  float: left;
}

.reservedList {
  max-width: 74vw;
  min-width: 1060px;
}

.days-flex {
  flex-direction: column;
}
.update-class-div {
  width:320px;
  position: absolute;
}
.show-reserved-class {
  position: absolute;
  //width: 100%;
  max-width: 100vw;
}
.modal_close_btn {
  position: absolute;
  right: 8px;
  top: -8px;
  font-size: 20px;
  font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
}
.down-triangle {
  position: relative;
  top: 18px;
  right: 20px;
  display: inline;
  width: 0;
  height: 0;
  border-top: 13px solid black;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
}
.select_date{
  grid-template-columns: 1fr 1fr 1fr;
}
.week-span {
  font-size: 14px;
}
.change-class-p {
  cursor: default;
  margin: 20px 50px 0px 50px;
}
.change-class-p:active {
  background-color: #F2B705;
}
#time_select{
  background-color: white;
  padding: 3% 15% 3% 4%;
  border-radius: 4px;
  display: inline-block;
}
.timeOption{
  float: right;
  width: 300px;
  text-align: right;
}
.teacherMess{
  width: fit-content;
  float: left;
  margin-top: 6px;
}
.teacherMess span{
  font-weight: bold;
}
.teacher-dashboard .courses .group{
  padding: 0;
}

.teacher-dashboard .courses .group .item{
  border: 0;
  border-bottom: 1px solid #e7e7e7;
  border-radius: 0;
}

.readMore{
  width: 16px;
  display: inline-block;
  margin-left: 10px;
}

.item{
  cursor: pointer;
}

.editButton{
  border-radius: 16px;
  background-color: #F2B706;
  width: 104px;
  height: 16px;
  padding: 6px 12px;
  font-weight: bold;
  font-size: 11px;
  margin-left: 8px;
}
.hours{
  font-size: 15px !important;
  font-weight: bold;
}

.stime{
  width: 100px;
  text-align: left;
}
.tName{
  min-width: fit-content;
  margin-left: 20px;
}
.tName div{
  display: block;
  position: relative;
  text-align: left;
  width: 106px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin:-6px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tSoftware{
  width: 50px;
  min-width: fit-content;
  margin-left: 10px;
  text-align: center;
}
.actionWidth{
  width: 150px;
  min-width: fit-content;
  display: inline-block;
  text-align: center;
}

.recordsuccess{
  width: 14px;
  display: inline-block;
  margin-bottom: 4px;
}

.teacher-dashboard .courses .group .item{
  font-size: 15px;
  height: 64px;
}

.select_date>li.selected{
  background-color: #FFFFFF;
}
.select_date{
  background-color: #F2B706;
}
.etime{
  font-size: 15px !important;
}
.shockmark{
  display: inline-block;
  width: 11px;
  position: relative;
  margin-bottom: 5px;
}
.arrowbtn{
  display: inline-block;
  width: 6px;
  margin-bottom: 5px;
  margin-left: 2px;
}
.hours span{
  display: inline-block;
}
.noneRecord{
  font-size: 13px;
}

@media screen and (max-width: 520px) {
  .reservedList {
    max-width: 100vw;
  }
  .dashborard-desc-div{
    display: block;
    width: 90%;
    margin: auto;
    font-size: 15px;
  }
  .timeOption{
    display: block;
  }
  .teacherMess{
    display: block;
    margin: 20px auto 10px auto;
  }
  .teacherMess span{
    display: block;
  }
  .teacher-dashboard .courses .group .item{
    display: block;
    padding: 5% 1%;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
  }
  .hours span{
    margin: 0 4px;
  }
  .teacher-dashboard .courses{
    padding-bottom: 30px;
  }
  .teacherMess span{
    font-size: 20px;
  }
  .reservedList{
    min-width: auto;
  }
  #time_select{
    background-color: white;
    padding: 2% 16% 2% 2%;
    border-radius: 4px;
  }
  .down-triangle {
    top: 18px;
  }
  .teacher-dashboard .courses .group .item{
    height: auto;
  }
  .actionWidth{
    width: auto;
  }
  .tName div{
    width: fit-content;
  }
}

</style>