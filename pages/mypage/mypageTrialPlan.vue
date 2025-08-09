<template>
  <div class="mypageTemplate">
  <div class="pageW">
    <p class="headlinePos">体験プラン変更</p>
    <p class="headlineDes">ご希望のプランを選択し、お支払いにお進みください。</p>

    <div class="trial-plan-box">
      <p class="trial-plan-title">
        現在体験中のプラン：
        <span :class="useStore?.studentInfo?.monthly_learn_type == 1 ? 'sColor' : 'lColor'">
    {{ useStore?.studentInfo?.monthly_plan_name }}
  </span>
      </p>
    </div>

    <img src="../../assets/images/dropdown.png" style="margin: auto;">

    <div class="containerPlan">
      <div
          v-if="useStore?.studentInfo?.monthly_learn_type == 1"
          id="content1"
      >
        <span class="learnTitle lColor">▍総合コース</span>
        <span class="learnDes lColor">・初級者から上級者ま・講師が日本語で対応可・文法/会話/ビジネス/HSK等</span>
        <div class="PricelistWrap">
          <div class="PricelistChild" v-for="(plan) in pay_plans">
            <div v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0" class="courseStamp">
              <ul><li>ずっと</li><li>{{plan.every_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
            </div>
            <div v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0" class="courseStamp">
              <ul><li>初月</li><li>{{plan.first_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
            </div>
              <h4 class="lColorbg">{{plan.plan_name}}</h4>
            <div class="month-plan-main">
              <div class="month-plan-sub-r">
                <span class="ori_font" v-if="(plan.every_month_off == 1 && plan.every_month_off_rate != 0) || (plan.first_month_off == 1 && plan.first_month_off_rate != 0)"><span class="monthNone">月額{{plan.final_amount_show}}円</span> 税込</span>
                <div class="month-plan-sub-r-child">
                  <span class="monthFont">月額</span>
                  <div class="month-plan-sub-r-child-l">
                    <span v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0">
                      {{plan.paypal_amount_show}}
                    </span>
                    <span v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0">
                      {{plan.first_month_off_amount_show}}
                    </span>
                    <span v-else>
                      {{plan.paypal_amount_show}}
                    </span>
                  </div>
                  <div class="month-plan-sub-r-child-r">
                    <span class="font-size-11 font-weight-700">税込</span><br>
                    <span>円</span>
                  </div>
                </div>
                <span class="singleLesson">1レッスン {{plan.lesson_price}}円</span>
              </div>
            </div>
            <div>
              <span v-if="!studentInfo.is_corporate_member">
                <a class="buttonCVtrial" @click="confirmChange(plan)">100円で体験する</a>
                <div class="plandes">
                  1日{{plan.reservation_limit_per_day}}回まで 予約保持{{plan.reservation_limit_per_range}}回まで
                </div>
              </span>
            </div>
          </div>
        </div>

      </div>
      <div
          v-else
          id="content2"
      >
        <span class="learnTitle sColor">▍会話コース</span>
        <span class="learnDes sColor">・オール中国語・アウトプット専用・文法の解説なし</span>
        <div class="PricelistWrap">
          <div class="PricelistChild" v-for="(plan) in talk_pay_plans">
            <div v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0" class="courseStamp">
              <ul><li>ずっと</li><li>{{plan.every_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
            </div>
            <div v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0" class="courseStamp">
              <ul><li>初月</li><li>{{plan.first_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
            </div>
            <h4 class="sColorbg">{{plan.plan_name}}</h4>
            <div class="month-plan-main">
              <div class="month-plan-sub-r">
                <span class="ori_font" v-if="(plan.every_month_off == 1 && plan.every_month_off_rate != 0) || (plan.first_month_off == 1 && plan.first_month_off_rate != 0)"><span class="monthNone">月額{{plan.final_amount_show}}円</span> 税込</span>
                <div class="month-plan-sub-r-child">
                  <span class="monthFont">月額</span>
                  <div class="month-plan-sub-r-child-l">
                    <span v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0">
                      {{plan.paypal_amount_show}}
                    </span>
                    <span v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0">
                      {{plan.first_month_off_amount_show}}
                    </span>
                    <span v-else>
                      {{plan.paypal_amount_show}}
                    </span>
                  </div>
                  <div class="month-plan-sub-r-child-r">
                    <span class="font-size-11 font-weight-700">税込</span><br>
                    <span>円</span>
                  </div>
                </div>
                <span class="singleLesson">1レッスン {{plan.lesson_price}}円</span>
              </div>
            </div>
            <div>
              <span v-if="!studentInfo.is_corporate_member">
                <a class="buttonCVtrial" @click="confirmChange(plan)">100円で体験する</a>
                <div class="plandes">
                  1日{{plan.reservation_limit_per_day}}回まで 予約保持{{plan.reservation_limit_per_range}}回まで
                </div>
            </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
  <div class="lessonDecision_notes">
    <h3>注意事項</h3>
    <ol>
      <li>体験プランを変更する際に、新たに100円の決済が必要となります。</li>
      <li>体験プランを変更しましたら、現在予約中のレッスンが自動的にキャンセルされます。</li>
      <li>前コースの体験レッスンのご利用は無効となります。</li>
      <li>お支払いされた料金の返金は承っておりません。</li>
      <li>体験プランの変更は1回のみとなっております。</li>
      <li>新コースの体験プランは7日後に月額料金が自動課金されます。</li>
      <li>変更と同時に前コースの7日後の自動課金は停止されます。</li>
    </ol>
  </div>
  <payjp v-show="payjp_show" :code="selected_plans" :ptype="selected_plan_type" :umode="update_mode" :flag="flag"></payjp>


  <n-modal
      v-model:show="showConfirm"
      preset="dialog"
      :style="bodyStyle"
      title=""
      size="huge"
      :bordered="false"
      :segmented="segmented"
      positive-text="確認する"
      negative-text="キャンセル"
      @positive-click="onSubmit"
  >
    <div>
      <div class="FrontWord">プラン変更の確認</div>
      <ul class="payRule">
        <li>予約中のレッスンがある場合、自動的にキャンセルされます。</li>
        <li>現在ご利用中のコース体験は終了となり、今後自動で課金されることはありませんので、ご安心ください。</li>
        <li>
          登録済みのクレジットカード
          <span v-if="useStore?.studentInfo?.payjp_customer_id">
        （下4桁 : {{ payjp_card_last4 }}）
      </span>
          で決済されます。
        </li>
      </ul>
    </div>
  </n-modal>
    </template>

<script setup>

  import {
    useStudentChangeMonthPlanPayjpApi,
    useStudentChangeTicketPlanPayjpApi, useStudentPaypalPayApi,
    useStudentPlanListDataApi
  } from "~/apis/plan";
  import {createDiscreteApi, NInput, NModal, NTable} from "naive-ui";
  import {onMounted, ref} from "vue";
  import {useMainStore} from "~/composables/store";
  import { h } from 'vue';
  import { NText, NSpace } from 'naive-ui';

  const { dialog } = createDiscreteApi(['dialog']);

  let studentInfo = ref({});
  const pay_plans = ref([]);
  const pay_plans_ticket = ref([]);
  const plans_footer_des = ref('');
  let selected_plans = ref('');
  let selected_plan_type = ref('');
  let payjp_show = ref(true);
  let payjp_card_brand = ref('');
  let payjp_card_last4 = ref('');
  const talk_pay_plans = ref([]);
  const talk_pay_plans_ticket = ref([]);
  let timer = ref(3);
  let update_mode = ref('');
  let use_paypal = ref(0);
  const useStore = useMainStore();
  let flag = ref(3);
  let imgFlag = ref(0);
  let selectRegisterPlan = ref(null);
  let showConfirm = ref(false);
  let bodyStyle = {
    width: '600px'
  };
  let segmented = {
    content: 'soft',
    footer: 'soft'
  };

  const getPlans = async () => {
    const { data: planinfo  } = await useStudentPlanListDataApi();
    payjp_show.value = true;
    if (planinfo?.value) {
      pay_plans.value = planinfo?.value?.pay_plans ?? [];
      pay_plans_ticket.value = planinfo?.value?.pay_plans_ticket ?? [];
      plans_footer_des.value = planinfo?.value?.plans_footer_des ?? '';
      studentInfo.value = planinfo?.value?.student_info ?? {};
      payjp_card_brand.value = studentInfo.value.payjp_card_brand ?? '';
      payjp_card_last4.value = studentInfo.value.payjp_card_last4 ?? '';
      talk_pay_plans.value = planinfo?.value?.talk_pay_plans ?? [];
      talk_pay_plans_ticket.value = planinfo?.value?.talk_pay_plans_ticket ?? [];
      update_mode.value = 'add';
      use_paypal.value = 1;
      imgFlag.value = planinfo?.value.flag ?? 0;
    }
  }

  onMounted( () => {
    getPlans();
  })


  function confirmChange(plan) {
    selectRegisterPlan.value = plan;
    showConfirm.value = true;
  }

  const onSubmit = async () => {
    selected_plans.value = selectRegisterPlan.value.plan_code;
    selected_plan_type.value = selectRegisterPlan.value.type;

    showConfirm.value = false;

    if (!useStore?.studentInfo?.payjp_customer_id) {
      payjp_show.value = true;
      let payjpCheckBox = document.getElementById('payjp_checkout_box');
      if (payjpCheckBox != null) {
        payjpCheckBox.children[0].click();
      } else {
        timer.value = 3;
        let interval = setInterval(() => {
          if (timer.value === 0) {
            clearInterval(interval)
          } else {
            payjp_show.value = true;
            let payjpCheckBox2 = document.getElementById('payjp_checkout_box');
            if (payjpCheckBox2 != null) {
              payjpCheckBox2.children[0].click();
              clearInterval(interval)
            } else {
              timer.value --
            }
          }
        }, 1000)
      }
    } else {
      const {error, data: changedata  } = await useStudentChangeTicketPlanPayjpApi(selected_plans.value);
      if (changedata?.value && changedata.value.err == false) {
        await useStore.useRefreshUserInfo();
        dialog.warning({
          title: "プランの変更が完了しました。",
          content: "",
          positiveText: "レッスンを予約する",
          onPositiveClick: async () => {
            return navigateTo('/mypage/searchTeacher?learnType='+useStore?.monthly_learn_type);
          },
        });
      }
    }

  }

  </script>

<style scoped>
.trial-plan-box {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px 30px;
  width: 80%;
  margin: 20px auto;
  text-align: center;
  font-family: sans-serif;
}

.trial-plan-title {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.trial-plan-description p{
  font-size: 14px;
  color: #333;
  line-height: 22px !important;
}
.pageW{
  margin-bottom: 0;
  border-radius: 8px 8px 0 0;
}
.lessonDecision_notes{
  border-radius: 0 0 8px 8px;
}
.containerPlan {
  width: 801px;
  margin: 30px auto;
}
.tabs {
  display: flex;
  position: relative;
  text-align: center;
}
.tab {
  width: 403px;
  height: 68px;
  line-height: 68px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #f1f1f1;
  font-size: 22px;
  color:#A3A3A3;
}
.tab.active {
  background-color: gray;
  color: white;
  font-weight: bold;
}
.contentPlan {
  display: none;
  padding: 20px;
  background-color: #f4f4f4;
}
.contentPlan.active {
  display: block;
  background-color: white;
  border: 1px solid #F4F4F4;
}
.ori_ing{
  position: absolute; top: 13px; left: 383px;
}
.addTitle{
  display: inline-block; line-height: 40px; text-align: center; font-weight: bold;
  border-radius: 8px; width: 112px; height: 40px; position: relative;
  background-color: #EF6D20; color: #FFFFFF;
  bottom: -2px;
}
.addTitle2{
  display: inline-block; line-height: 40px; text-align: center; font-weight: bold;
  border-radius: 8px; width: 112px; height: 40px; position: relative;
  background-color: #30A186; color: #FFFFFF;
  bottom: -2px;
}
.addLesson{display: inline-block; margin:0 10px; bottom: -8px;position: relative; padding-bottom: 14px;}
.addPlan{font-size: 30px; font-weight: bold; display: inline-block; margin:0 16px; bottom: -8px;position: relative; padding-bottom: 14px; text-align: right; padding-right: 26px; min-width: 110px;}
.headlineDes{text-align: center; line-height: 18px; color: #333333; margin-bottom: 14px; font-size: 13px; margin-top: 0;}
.font32{font-size: 30px; font-weight: bold; padding: 0 4px; display: inline-block;}
.redArrow{display: inline-block; padding-bottom: 13px;}
.PricelistChild_add{text-align: center;position: relative; padding: 6px 0 6px 16px; margin-bottom: 10px; text-align: left;}


.taxFont{font-size: 10px; position: absolute; top: 4px; right: 0;}
.dollarFont{font-size: 10px; position: absolute; top: 16px; right: 0;}

.buttonCVtrial{margin-bottom: 10px;}

.PricelistWrap_add .buttonCVtrial{display: inline-block; margin-left: 5px; font-size: 13px;}

.addPlan{ width: 118px;}

.PricelistChild{position: relative;}


.courseStamp {width: 54px; height: 60px; position: absolute;
  background-size: cover;
  right:-12px; top:16px; background-image: url("../../assets/images/pstamp.png");
  background-size: cover;
  z-index: 999;}

.courseStamp ul{position: relative; padding-top: 4px; width: fit-content;
  margin: auto; color: #DE2222;font-weight: bold;}
.courseStamp li:nth-child(1){font-size: 13px; margin-top: 6px; margin-left: 0;}
.courseStamp li:nth-child(2){font-size: 20px; position: absolute; left: -16px; top: 24px; display: block;}
.courseStamp li:nth-child(3){font-size: 9px; position: absolute; top: 27px; right:-16px;}
.courseStamp li:nth-child(4){font-size: 7px; position: absolute; top: 36px; right:-18px; letter-spacing: -1px;}

.plandes{
  text-align: center;
  border-radius: 0 0 8px 8px;
  font-size: 11px;
  color: #36676D;
  padding:3px 0 6px 0;
  font-weight: bold;
}
.PricelistWrap_add .buttonCVtrial{
  font-size: 11px;
  right: 0;
  margin-right: 0;
  width: 90px;
}
.font32{
  width: 58px;
  text-align: center;
}
.paypay-modal h1 img{margin: auto;}
.paypay-modal h5 {font-weight: bold; font-size: 13px;}
.paypay-modal .scanImg{margin: auto; width: 320px;}

.paypay-modal .info-row {
  width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: auto;
  font-size: 13px;
  font-weight: 500;
}

.paypay-modal .info-title {
  color: #333;
  font-weight: bold;
}

.paypay-modal .info-content {
  color: #e27317; /* 橘色 */
  font-weight: bold;
}

.paypay-modal .info-price {
  color: #e27317;
  font-weight: bold;
  font-size: 24px;
}
.payRule{
  list-style-type: number;
  text-align: left;
}
@media screen and (max-width: 520px) {
  .lessonDecision_notes{
    width: 90%;
    margin: auto;
  }
  .learnTitle{
    text-align: center;
    margin-bottom: 10px;
    display: block;
  }
  .learnDes{
    text-align: center;
    font-size: 14px;
  }
  .pageW{
    margin: 30px auto 0 auto;
    width: 90%;
  }
  .trial-plan-box{
    width: 100%;
  }
  .trial-plan-title{
    font-size: 15px;
  }
  .containerPlan{
    width: 100%;
  }
  .PricelistChild{
    margin-bottom: 10px;
  }
  .PricelistWrap{
    gap: 0%;
  }
  .month-plan-sub-r-child{
    width: 70%;
  }
  .event_img{
    width: 100%;
  }
  .ori_ing{
    position: absolute;
    top: 16px;
    left: 154px;
  }
  .addTitle{
    display: block;
    margin: auto;
  }
  .PricelistChild_add{
    padding: 16px;
  }
  .addPlan{
    display: block;
    text-align: center;
  }
  .addTitle2{
    display: block;
    margin: auto;
  }
  .taxFont{
    right: 32px;
    top: -4px;
  }
  .dollarFont{
    right: 40px;
    top: 10px;
  }
  .redArrow{
    text-align: center;
    display: none;
  }
  .ori_ing{
    display: none;
  }
  .addLesson{
    margin: 4px;
    padding-bottom: 0;
  }
  .PricelistWrap_add .buttonCVtrial{
    display: block;
    margin: 10px auto;
  }
  .addPlan{
    font-size: 36px;
    font-family: Murecho;
    line-height: 60px;
    padding-bottom: 0;
    width: auto;
  }
  .courseStamp{
    right: 10px;
  }
}
</style>


<style>
.paypay-modal{
  width: 540px !important;
}
.paypay-modal .n-dialog__icon {
  display: none !important;
}

.dg-content {
  text-align: center;
  margin-top: -20px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #333;
}

.dg-underline {
  text-decoration: underline;
  text-decoration-color: #EF6D20;
  text-decoration-thickness: 2px;
  text-decoration-style: solid;
  display: block;
  font-size: 14px;
  margin-top: 4px;
}
.dg-action {
  width: 100%;
  margin-top: 0 !important;
}
.dg-button-container {
  text-align: center;
  width: 172px; /* 統一寬度，確保對齊 */
  display: inline-block;
  vertical-align: top;
  margin: 0 6px;
}
.dg-button {
  background-color: #EF6D20;
  color: #FFF;
  padding: 10px 20px;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 164px;
  font-weight: bold;
}

.dg-text {
  width: 156px;
  margin: 6px auto;
  font-size: 11px;
  color: #666;
  text-align: left;
  line-height: 1.4;
  white-space: normal;
  display: block;
  min-height: 32px; /* 固定高度，讓文字區域統一 */
}

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

.n-dialog__content{
  text-align: center;
  width: 80%;
  margin: auto !important;
  display: block;
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
  text-align: center;
  white-space:normal;
  height: auto;
  font-size: 16px;
  line-height: 20px;
  padding: 2% 10%;
  position: relative;
  order: 1;
  margin: auto;
  display: block;
  --n-border: 0 !important;
  --n-border-hover: 0 !important;
  --n-color:#EF6D20 !important;
  --n-color-hover:#EF6D20 !important;
  --n-color-pressed:#EF6D20 !important;
  --n-color-focus:#EF6D20 !important;
  --n-color-disabled:#EF6D20 !important;
  --n-ripple-color:#EF6D20 !important;
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
@media screen and (max-width: 520px) {
  .dg-button-container{
    width: 100%;
    display: block;
    margin: 1% auto 8% auto;
  }
  .dg-button{
    width: 100%;
    margin-bottom: 8px;
  }
  .dg-text{
    width: 90%;
    font-size: 13px;
  }
  .n-button{
    width: 100%;
    height: 54px;
    left: auto;
    margin: 2% auto;
    text-align: center;
    min-width: auto;
    white-space: normal;
    line-height: 20px;
    font-size: 16px;
  }
  .n-dialog__action{
    text-align: center;
    width: 100%;
    height: auto;
  }
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
  .n-dialog__content{
    width: 100%;
  }
  .n-dialog .n-dialog__action > :last-child {
    font-size: 15px;
    height: auto;
    padding: 10px;
  }
}
</style>