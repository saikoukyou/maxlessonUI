<template>
  <div style="background-color: #EAF0F9;">
    <div class="siteTop">
      <div class="companyBlock">
        <div class="companyName">
          <p class="variable-text serif">{{cname}}</p>
        </div>
      </div>
    </div>
    <div class="sitemb">
      <p class="variable-text serif">{{cname}}</p>
      <img src="../../assets/images/sitehbg_1.png" width="100%"/>
      <img src="../../assets/images/sitehbg_2.png" width="100%"/>
    </div>
    <div v-if="pshow" class="siteBg">
      <span class="title serif">自己啓発学習プラン</span>
      <span v-if="notice_show" class="subdes">{{title}}</span>
      <div v-if="notice_show" class="messageBlock">
        <span class="subtitle serif">貴社研修担当部署からのメッセージ</span>
        <p class="message" v-html="notice">
        </p>
      </div>
      <div v-if="planShow">
        <div class="month-type-title"></div>
        <div class="messageBlock">
          <span class="subtitle serif">サブスクプラン</span>
          <span class="planDes serif">・初回の課金後、毎月自動更新する支払いタイプ</span>

          <div v-if="talk_pay_plans.length" class="sColor">
            <span class="learnTitle">▍会話コース</span>
            <span class="learnDes">・中国語の会話を楽しみたい方　・特に文法指導は不要な方　・トピック会話/フリートーク等</span>
          </div>

          <div class="hplanBlock">
            <div class="courseBlock" v-for="(tplan,pindex) in talk_pay_plans">
              <span class="courseTitle sColorbg">{{tplan.plan_name}}</span>
              <ul class="courseContent">
                <li v-if="tplan.first_month_off === 1 || tplan.every_month_off === 1">
                  <span class="orip">月額{{tplan.final_amount}}円</span><span class="oriptax"> 税込</span>
                </li>
                <li v-else style="height:16.55px;"></li>
                <li>月額
                  <span class="amount">{{tplan.paypal_amount}}</span>円<span class="littleTax">税込</span>
                </li>
                <li>1レッスン {{tplan.lesson_price}}円</li>
              </ul>
            </div>
            </div>



          <div v-if="pay_plans.length" class="lColor">
            <span class="learnTitle">▍総合コース</span>
            <span class="learnDes">・中国語を学習したい方　・体系的に習得したい方　・文法/会話/ビジネス/HSK等</span>
          </div>


            <div class="hplanBlock">
              <div class="courseBlock" v-for="(plan,pindex) in pay_plans">
                <span class="courseTitle lColorbg">{{plan.plan_name}}</span>
                <ul class="courseContent">
                  <li v-if="plan.first_month_off === 1 || plan.every_month_off === 1">
                    <span class="orip">月額{{plan.final_amount}}円</span><span class="oriptax"> 税込</span>
                  </li>
                  <li v-else style="height:16.55px;"></li>
                  <li>月額
                    <span class="amount">{{plan.paypal_amount}}</span>円<span class="littleTax">税込</span>
                  </li>
                  <li>1レッスン {{plan.lesson_price}}円</li>
                </ul>
              </div>
            </div>
          <button class="button" @click="goAfter">アカウント登録へ！</button>
        </div>
        <div v-if="pay_plans_ticket.length" class="messageBlock">

          <span class="subtitle serif">チケットタイプ</span>
          <span class="planDes serif">・都度購入で自動更新されないタイプ</span>

          <div>
            <div v-for="(ticket_plan) in pay_plans_ticket">
              <div class="singlePlan">
                <ul class="SinglePlanContent">
                  <li class="lColorbg">総合コース</li>
                  <li><span>{{ticket_plan.buy_issued_lesson_num}}</span>回</li>
                  <li>有効期限<span>{{ticket_plan.validity_term}}</span>日</li>
                  <li><img width="15" src="../../assets/images/redarrow.png"></li>
                  <li><img src="../../assets/images/redarrow_m.png"></li>
                </ul>

                <ul class="SingleAmount">
                  <li>{{ticket_plan.paypal_amount}}</li>
                  <li>税込</li>
                  <li>円</li>
                  <li>1レッスン ¥{{ticket_plan.lesson_price}}円</li>
                </ul>

              </div>
            </div>
            <div class="PricelistChild_add" v-for="(tticket_plan) in talk_pay_plans_ticket">
              <div class="singlePlan">
                <ul class="SinglePlanContent">
                  <li class="sColorbg">会話コース</li>
                  <li><span>{{tticket_plan.buy_issued_lesson_num}}</span>回</li>
                  <li>有効期限<span>{{tticket_plan.validity_term}}</span>日</li>
                  <li><img width="15" src="../../assets/images/redarrow.png"></li>
                  <li><img src="../../assets/images/redarrow_m.png"></li>
                </ul>

                <ul class="SingleAmount">
                  <li>{{tticket_plan.paypal_amount}}</li>
                  <li>税込</li>
                  <li>円</li>
                  <li>1レッスン ¥{{tticket_plan.lesson_price}}円</li>
                </ul>

              </div>
            </div>
          </div>
          <button class="button" @click="goAfter">アカウント登録へ！</button>
        </div>
      </div>

      <div v-else>
        {{msg}}
      </div>

    </div>
  </div>
</template>

<script setup>
import {
  NForm,
  NInput,
  NFormItem,
  NButton,
  NAlert,
  NTag,
  createDiscreteApi
} from "naive-ui"
import {onMounted} from "vue";
import {
  useBusinessApproveCompletePayApi,
  useBusinessApprovePayApi,
} from "~/apis/student";

const route = useRoute()


//加载效果
const loading = ref(false);
const plans = ref([]);
let pshow = ref(false);
let msg = ref('');
let planShow = ref(false);
const pay_plans = ref([]);
const pay_plans_ticket = ref([]);
const talk_pay_plans = ref([]);
const talk_pay_plans_ticket = ref([]);
const bid = ref(0);
const cname = ref('');
const title = ref('');
const notice = ref('');
let notice_show = ref(false);

onMounted(async () => {
  if (route && route?.query?.auth) {
    const { data } = await useBusinessApprovePayApi(route.query.auth);
    if (data?.value && data?.value.err === false) {
      if (data?.value.expire === 1) {
        msg.value = '认证已失效';
        const { dialog } = createDiscreteApi(["dialog"]);
        dialog.warning({
          content: "このページは現在公開期間外のため、登録は不可となります。",
          positiveText: "確認",
          onPositiveClick: async () => {
            navigateTo('/');
          },
        })

      } else {
        pshow.value = true;
        bid.value = data?.value.bid ?? 0;
        planShow.value = data?.value.is_show ?? false;
        pay_plans.value = data?.value?.plans?.pay_plans ?? [];
        talk_pay_plans.value = data?.value?.plans?.talk_pay_plans ?? [];
        pay_plans_ticket.value = data?.value?.plans?.pay_plans_ticket ?? [];
        talk_pay_plans_ticket.value = data?.value?.plans?.talk_pay_plans_ticket ?? [];
        cname.value = data?.value?.corporate_name ?? '';
        title.value = data?.value?.website_title ?? '';
        notice.value = data?.value?.notice1 ?? '';
        notice_show.value = data?.value.notice_show ?? false;
      }

    }

  }
})

//ui布局
definePageMeta({
  layout: false,
  middleware: ["only-visitor"]
})

function goAfter() {
  // 跳转
  if (bid.value) {
    navigateTo({path:'/corporate/signupBusinessPayAfter',query:{
        bid: bid.value
      }}, { replace: true })
  }
}
</script>


<style scoped>
.Pricelist{
  width: 100%;
  text-align: left;
}
.siteTop{
  background-image: url("../../assets/images/siteTop_bg.png");
  height: 330px;
  background-position: top center;
  background-size: 1440px;
  position: relative;
}
.companyBlock{
  width: 810px;
  height: 330px;
  margin: auto;
  position: relative;
}
.companyName{
  width: 326px;
  position: absolute;
  top: 24px;
  right: 24px;
  text-align: center;
  height: 64px;
  font-weight: bold;
  color: #2E6190;
  vertical-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.variable-text{
  font-size: 24px;
  line-height: 26px;
  vertical-align: center;
}
.serif{
  font-family: Serif;
}
.siteBg{
  width: 810px;
  margin: auto;
  padding: 40px 0;
}
.title{
  font-size: 28px;
  display: block;
  text-align: center;
  font-weight: bold;
  color: #2E6190;
}
.subdes{
  font-size: 15px;
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #2E6190;
  font-weight: bold;
}
.messageBlock{width: 810px; border: 1px solid #C9E0F6; border-radius: 8px; margin: 30px auto; background-color: #F2F5FA; text-align: center; padding: 30px 70px 30px 70px;}
.subtitle {color:#3682E0; font-size: 22px; display: block; font-weight: bold; margin: 10px 0 0 0;}
.message{text-align: left; display: block; font-size: 14px; line-height: 22px;}

.planDes{
  font-size: 14px;
  color:#3682E0;
  display: block;
  margin-top: 4px;
}

.button {
  background-color: #3b82f6; /* 藍色背景 */
  color: white; /* 白色文字 */
  padding: 10px 20px; /* 按鈕的內距 */
  border: none; /* 移除預設邊框 */
  border-radius: 8px; /* 圓角 */
  font-size: 16px; /* 字型大小 */
  font-weight: bold; /* 粗體字 */
  box-shadow: 0 4px 0 #2563eb; /* 按鈕下方的陰影，略微偏移 */
  cursor: pointer; /* 滑鼠移上去顯示手型游標 */
  transition: transform 0.1s; /* 點擊時的動畫效果 */
  width: 330px;
  height: 50px;
  margin-top: 30px;
}
/* 按下時的效果 */
.button:active {
  transform: translateY(2px); /* 按下時微微下移 */
  box-shadow: 0 2px 0 #2563eb; /* 陰影縮小 */
}
.sitemb{
  display: none;
}
.sColor{
  text-align: left;
  margin-top: 10px;
}
.lColor{
  text-align: left;
  margin-top: 10px;
}
.learnDes{
  margin-top: 8px;
}
.courseBlock{
  width: 33%;
  border-radius: 8px;
  background-color: white;
  height: fit-content;
  padding-bottom: 10px;
}
.courseContent{
  transform: scale(0.85);
  margin: 16px auto 0 auto;
}
.courseTitle{
  font-size: 18px;
}
.courseContent li:nth-child(2) .amount{
  font-size: 44px;
}
.hplanBlock{
  display: flex;
}
.singlePlan{
  width: 100%;
  position: relative;
}
.SinglePlanContent li span{
  font-size: 40px;
}
.SinglePlanContent{
  display: block;
  width: 100%;
  text-align: left;

}
.SingleAmount{
  display: inline-block;
  position: absolute;
  float: right;
  right: 10%;
  text-align: left;
}
.SingleAmount li:nth-child(1){
  font-size: 40px;
}
.SinglePlanContent li:nth-child(3){
  width: 23%;
}
.SingleAmount li:nth-child(3){
  top: 28px;
}
.SingleAmount li:nth-child(2){
  top: 12px;
}
.SinglePlanContent li:nth-child(2){
  width: 13%;
}
.SinglePlanContent li:nth-child(1){
  font-size: 20px;
}


@media screen and (max-width: 520px) {
  .siteTop{
    display: none;
  }
  .siteBg{
    width: 90%;
  }
  .messageBlock{
    width: 100%;
    padding: 10px 40px 30px 40px;
  }
  .button{
    width: 100%;
  }
  .variable-text{
    text-align: center;
    padding-top: 5%;
    font-size: 1.6rem;
    font-weight: bold;
    color: #2E6190;
    margin-bottom: 16px;
  }
  .title{
    font-size: 25px;
  }
  .subdes{
    font-size: 14px;
  }
  .sitemb{
    display: block;
  }
  .hplanBlock{
    display: block;
  }
  .courseBlock{
    width: 100%;
    display: block;
  }
  .button{
    margin-top: 0;
  }
  .SinglePlanContent li:nth-child(2){
    width:42%;
  }
  .SinglePlanContent li:nth-child(3){
    width: 50%;
  }
  .SinglePlanContent li span{
    font-size: 28px;
  }
  .SinglePlanContent li:nth-child(3){
    font-size: 12px;
  }
  .SingleAmount{
    position: relative;
    margin: auto;
    text-align: center;
    right: auto;
    display: block;
    width: 100%;
    background-color: white;
    float: none;
  }
  .singlePlan{
    background-color: white;
    margin-bottom: 10%;
  }
  .SinglePlanContent{
    padding-top: 0;
  }
}
</style>