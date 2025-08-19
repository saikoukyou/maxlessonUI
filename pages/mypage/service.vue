<template>
  <div class="blockW">
  <LoadingGroup :pending="pending">
    <h5>カウンセリング</h5>
      <ul class="firstRes">
        <li>・中国語勉強のお悩み相談</li>
        <li>・学習の目標設定</li>
        <li>・弊社学習サイトの活用法</li>
        <li class="moreDes">など、中国語学習歴を持つ弊社の日本人スタッフがカウンセリングを担当いたします。</li>
        <li class="moreDes2">過去のカウンセリング予約記録を確認するには、
          <nuxt-link class="actionBtn" to="/mypage/serviceReserved">こちら</nuxt-link>をクリックしてください。</li>
      </ul>
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


      <div class="select_everytime">
<!--        <ul class="everytimeWrap">-->
<!--          <li v-for="(time) in times.slice(0, 12)" @click="selectedTimeTeachers(list[searchDay+' '+time+':00'])">-->
<!--          <span>-->
<!--            <span class="fs18 bkf">{{time}}-</span>{{time.toString().substring(0,3)}}{{time.toString().substring(3) == '30' ? '55' : '25'}}-->
<!--          </span>-->
<!--            <span v-if="list[searchDay+' '+time+':00']">-->
<!--              <span v-if="list[searchDay+' '+time+':00'].reserve_status == 1" class="reserve few">予約受付中</span>-->
<!--            </span>-->
<!--            <span v-else>-->
<!--              <span class="reserve none">予約不可</span>-->
<!--            </span>-->
<!--          </li>-->
<!--        </ul>-->

<!--        <ul class="everytimeWrap list2">-->
<!--          <li v-for="(time) in times.slice(12, 24)" @click="selectedTimeTeachers(list[searchDay+' '+time+':00'])">-->
<!--          <span>-->
<!--            <span class="fs18 bkf">{{time}}-</span>{{time.toString().substring(0,3)}}{{time.toString().substring(3) == '30' ? '55' : '25'}}-->
<!--          </span>-->
<!--            <span v-if="list[searchDay+' '+time+':00']">-->
<!--            <span v-if="list[searchDay+' '+time+':00'].reserve_status == 1" class="reserve few">予約受付中</span>-->
<!--          </span>-->
<!--            <span v-else>-->
<!--            <span class="reserve none">予約不可</span>-->
<!--          </span>-->
<!--          </li>-->
<!--        </ul>-->

        <ul class="everytimeWrap list3">
          <li v-for="(time,key) in list" @click="selectedTimeTeachers(time.lesson_unixtime,key)" :class="selectedIndex == key ? 'selected' : ''" >
          <span>
            <span class="fs18 bkf">{{time.timestr}}-</span>{{time.timestr.toString().substring(0,3)}}{{time.timestr.toString().substring(3) == '30' ? '55' : '25'}}
          </span>
          </li>
        </ul>
      </div>

      <div class="lessonConfirmContents">
        <div class="selectdiv block">
          <p>予約を確定するため以下の情報を記入ください</p>
          <div class="content">
            <div class="myFlex">
            <div class="left">
              <p class="subtitle">受講用ソフト</p>
              <div class="selectDivInner">
                <select id="time_select" onchange="" v-model="useSoftware">
                  <option :value="skey" v-for="(software,skey) in softwares" data-number="0">
                    {{software}}</option>
                </select>
              </div>
            </div>
            <div class="right">
              <p class="subtitle">アカウントID</p>
              <input type="text" name="" v-model="account" id="Keyword" placeholder="12345678" class="KeywordTextbox">
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ChineseLevel_wrap">
        <div>
          <p>相談内容</p>
          <n-checkbox-group v-model:value="serviceChecked">
            <n-space item-style="display: flex;">
              <n-checkbox  v-for="(tag,tindex) in service_type_tag" :value="tindex" :label="tag" />
            </n-space>
          </n-checkbox-group>
        </div>
      </div>
      <div class="ChineseLevel_wrap">
        <div>
          <p>詳細内容</p>
          <textarea v-model="comment" class="question-text" id="onlineQuestionId" placeholder="100文字以内">

        </textarea>
        </div>
        <div class="button_confirm" @click="submitForm">予約を確定する</div>
      </div>


    </section>

  </LoadingGroup>
  </div>
</template>

<script setup>

//设置首页标题,举个例子，这里的title就是首页的标题
import {formatDate} from "~/composables/useUtil";
import {useIndexDataApi} from "~/apis";
import { register } from "swiper/element/bundle";
import {useCheckPlanApi, useGetServiceTeacherTimeListApi, useReserveServiceApi} from "~/apis/student";
import {createDiscreteApi, NCheckbox, NCheckboxGroup, NSpace} from "naive-ui";
import {onMounted, ref} from "vue";
import {useMainStore} from "~/composables/store";

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
let searchDay = ref(formatDate(new Date()));
let times = ref([]);
let list = ref([]);
let searchDayIndex = ref(0);
let searchDayIndexPc = ref(0);
let softwares = ref([]);
let useSoftware = ref('');
let account = ref('');
let serviceChecked = ref([]);
let service_type_tag = ref([]);
let comment = ref('');
let selectedUnixtime = ref(0);
const useStore = useMainStore();
const user = useStore.studentInfo;
let selectedIndex = ref();

const getInfo = async () => {
  let {
    pending,
    data,
    error,
    rows,
    total,
  } = await useGetServiceTeacherTimeListApi(searchDay.value);
  // console.log('servicedata:'+JSON.stringify(data?.value));
  if (data?.value) {
    days.value = data?.value?.days ?? [];
    times.value = data?.value.times ?? [];
    list.value = data?.value.list ?? [];
    softwares.value = data?.value?.software ?? [];
    useSoftware.value = data?.value?.default_software ?? '';
    service_type_tag.value = data?.value?.service_content ?? [];
  }
}

onMounted(() => {
  getInfo();
})
function changeDay(day,pindex,indexd) {
  searchDay.value = day;
  searchDayIndex.value = pindex*3+indexd;
  searchDayIndexPc.value = pindex*7+indexd;
  getInfo();
}

const selectedTimeTeachers = (lesson_unixtime,key) => {
  // if (!list.value[searchDay.value+' '+time+':00']) {
  //   return;
  // }
  // navigateTo({path:'/mypage/confirmService',query:{
  //     time: lesson_unixtime,
  //   }}, { replace: true })
  selectedUnixtime.value = lesson_unixtime;
  selectedIndex.value = key;
}

async function submitForm() {
  const { message } = createDiscreteApi(["message"]);
  let { data: info } = await useReserveServiceApi({
    lesson_unixtime:selectedUnixtime.value,
    id:user?.id,
    service_content : serviceChecked.value.join(','),
    student_comment : comment.value,
    software : useSoftware.value,
    account: account.value
  });
  if (info.value.err === false) {
    if (info.value.flag === 1) {
      message.error('今月のカウンセリング回数は上限に達しました。');
    } else if (info.value.flag === 2) {
      message.error('この時間帯に対応可能な講師はいません。');
    } else if (info.value.flag === 3) {
      message.error('このカウンセリングは期限切れです。');
    } else {
      message.success('予約が完了しました。');
      navigateTo({path:'/mypage/decisionService',query:{
          id: info.value.data.lessons_id,
        }}, { replace: true })
    }
  } else {
    if (info?.value?.err_msg) {
      message.error(info?.value?.err_msg);
    } else {
      message.error('予約に失敗しました。');
    }
  }

}

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

</script>

<style scoped>
swiper-container::part(button-next),
swiper-container::part(button-prev) {
  color: #fff;
}
.contentsWrap{
  width: 800px;
}
.question-text {
  height:150px;
  width:100%;
  border:1px solid #C5C5C5;
  margin-bottom: 20px;
  background-color: #ffffff;
}
.lessonConfirmContents{
  background-color: #F8F8F8;
  padding: 10px 40px 0 40px;
}
.select_everytime{
  margin-bottom: 20px;
  margin-top: 0;
  padding-top: 24px;
}
.everytimeWrap li{
  width: 23%;
  min-height:fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ChineseLevel_wrap{
  padding: 10px 40px 10px 40px;
}
.selectdiv p{
  font-weight: bold;
}
.button_confirm{
  font-size: 16px;
  cursor: pointer;
}

.moreDes{
  font-size: 13px;
  margin-top: 10px;
}
.moreDes2{
  font-size: 13px;
  margin-top: 0;
}
.firstRes{
  margin-top: 10px;
}
.firstRes li:nth-child(1){
  margin: auto;
}
.actionBtn{
  color: var(--pink-dark);
  text-decoration: underline;
  font-weight: bold;
}
.question-text{
  padding: 20px;
}
.left{
  width: 50%;
}
.right{
  width: 50%;
}
.KeywordTextbox{
  width: 100%;
}
.myFlex{
  display: flex;
}
.selectDivInner select{
  max-width: none;
  width: 100%;
  background-position: 310px center;
}
.selectDivInner{
  width: 95%;
}
.selected{
  background-color: #65ABE9 !important;
}
@media screen and (max-width: 520px) {
  .contentsWrap{
    width: 100%;
  }
  .everytimeWrap li{
    display: inline-block;
    width: 27%;
  }
  .lessonConfirmContents,.ChineseLevel_wrap{
    padding: 10px 20px 20px 20px;
  }
  .button_confirm{
    margin-bottom: 20px;
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
}
</style>
