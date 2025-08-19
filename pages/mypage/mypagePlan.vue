<template>
  <div class="mypageTemplate">
  <div class="blockW">
      <div
          :class="{ 'active': activeTabIndex === 0 }"
      >
        <p class="headlinePos">サブスクタイプ</p>
        <p class="headlineDes">初回の課金後、毎月自動更新する支払いタイプ</p>
        <div class="PricelistWrap">
          <div class="PricelistChild" v-for="(plan) in pay_plans">
            <div v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0">
<!--              <ul><li>ずっと</li><li>{{plan.every_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>-->
              <img src="../../assets/images/saleStamp.png" class="saleStamp">
            </div>
            <div v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0" class="courseStamp">
              <ul><li>初月</li><li>{{plan.first_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
            </div>
              <h4 class="lColorbg">{{plan.plan_name}}</h4>
            <div class="month-plan-main">
              <div class="month-plan-sub-r">
                <span v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0" class="saleWord">今なら、ず━━っと</span>
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
                <span class="ori_font" v-if="(plan.every_month_off == 1 && plan.every_month_off_rate != 0) || (plan.first_month_off == 1 && plan.first_month_off_rate != 0)"><span class="monthNone">月額{{plan.final_amount_show}}円</span> 税込</span>
                <!--                <span class="singleLesson">1レッスン {{plan.lesson_price}}円</span>-->
              </div>
            </div>
            <div>
        <span v-if="!studentInfo.is_corporate_member">
          <span v-if="plan.id == studentInfo.monthly_plan_id">
            <span v-if="studentInfo.subscription_id">
              <div class="pay-desc">カード現在利用中</div>
              <a @click="planConfirm(plan.plan_code,'',plan.learn_type)"  class="buttonCVtrial">今すぐ更新</a>
            </span>
            <span v-else-if="studentInfo?.recurring_payment_id && studentInfo?.paypal_cancel == 0">
              <div class="pay-desc">Paypal現在利用中</div>
              <span v-if="studentInfo.payjp_customer_id">
                <a @click="planConfirm(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">プラン変更</a>
              </span>
              <span v-else>
                <a @click="changePayjpPlanPc(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">カード決済</a>
              </span>
            </span>
            <span v-else>
              <div class="pay-desc">現在利用中</div>
              <span v-if="studentInfo.payjp_customer_id">
                <a @click="planConfirm(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">プラン変更</a>
              </span>
              <span v-else>
                <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
                <a @click="changePayjpPlanPc(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">カード決済</a>
              </span>
            </span>
          </span>
          <span v-else>
            <span v-if="studentInfo.payjp_customer_id">
              <a @click="planConfirm(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">プラン変更</a>
            </span>
            <span v-else>
              <a @click="changePayjpPlanPc(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">カード決済</a>
              <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
            </span>
          </span>
          <div class="reservationplandes">
            1日{{plan.reservation_limit_per_day}}回まで 予約保持{{plan.reservation_limit_per_range}}回まで
          </div>
      </span>
            </div>
            <!--            <p class="lessonTitle">{{plan.paypal_amount}}税込円-->
            <!--              毎月{{plan.reservation_limit_per_range}}レッスン-->
            <!--              <font v-if="plan.type == 1">{{plan.buy_issued_lesson_num}}ポイント</font>-->
            <!--              <img src="~/assets/SVG/lessonTitle01.svg" alt=""></p>-->
            <!--            <p class="buttonCVtrial">購 入</p>-->
          </div>

          <!--          <div class="PricelistChild" >-->
          <!--            <h4>毎日１回プラン</h4>-->
          <!--            <p class="lessonTitle"><img src="~/assets/SVG/lessonTitle02.svg" alt=""></p>-->
          <!--            <p class="buttonCVtrial">無料登録</p>-->
          <!--          </div>-->
          <!--          <div class="PricelistChild" >-->
          <!--            <h4>毎日２回プラン</h4>-->
          <!--            <p class="lessonTitle"><img src="~/assets/SVG/lessonTitle03.svg" alt=""></p>-->
          <!--            <p class="buttonCVtrial">無料登録</p>-->
          <!--          </div>-->
        </div>

        <div class="study-plan-box" v-if="singlePlan">
          <div class="study-plan-left">
            <div class="study-plan-desc">
              レッスンなし・学習コンテンツ利用し放題
            </div>
            <div class="study-plan-type">
              <span class="plan-label">{{singlePlan.plan_name}}</span>
              <span class="plan-content">WEB教材＋動画＋音声</span>
            </div>
          </div>
          <div class="study-plan-right">
            <div class="plan-price">
              <span class="price">{{singlePlan.paypal_amount_show}}<span> 円</span></span><span class="tax">税込</span>
            </div>
            <span v-if="!studentInfo.is_corporate_member">
                <span v-if="singlePlan.id == studentInfo.monthly_plan_id">
                  <span v-if="studentInfo.subscription_id">
                    <div class="pay-desc">カード現在利用中</div>
                    <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">今すぐ更新</a>
                  </span>
                  <span v-else-if="studentInfo?.recurring_payment_id && studentInfo?.paypal_cancel == 0">
                    <div class="pay-desc">Paypal現在利用中</div>
                    <span v-if="studentInfo.payjp_customer_id">
                      <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">プラン変更</a>
                    </span>
                    <span v-else>
                      <a @click="changePayjpPlanPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">カード決済</a>
                    </span>
                  </span>
                  <span v-else>
                    <div class="pay-desc">現在利用中</div>
                    <span v-if="studentInfo.payjp_customer_id">
                      <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">プラン変更</a>
                    </span>
                    <span v-else>
                      <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">Paypal決済</a>
                      <a @click="changePayjpPlanPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">カード決済</a>
                    </span>
                  </span>
                </span>
                <span v-else>
                <span v-if="studentInfo.payjp_customer_id">
                  <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">プラン変更</a>
                </span>
                <span v-else>
                  <a @click="changePayjpPlanPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">カード決済</a>
                  <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="buttonCVtrial">Paypal決済</a>
                </span>
              </span>

            </span>
          </div>
        </div>

        <ul class="courseList">
        <li>全ジャンルの教材が使用可能です。</li>
        <li>「総合コース」専属の講師が予約可能。日本語での対応も可（一部を除く）</li>
        <li>上記プランはサブスクプランとなっておりますので、毎月自動的に更新されます。</li>
        </ul>


        <div v-if="pay_plans_ticket.length || talk_pay_plans_ticket.length">
          <p class="headlinePos">チケットタイプ</p>
          <p class="headlineDes">都度購入で自動更新されないタイプ</p>
          <div class="PricelistWrap_add">
            <div class="PricelistChild_add lColorbg_light" v-for="(ticket_plan) in pay_plans_ticket">

              <div class="addTitle">チケット</div>
              <div class="addLesson"><span class="font32">{{ticket_plan.buy_issued_lesson_num}}</span>回</div>
              <div class="addLesson">有効期限<span class="font32">{{ticket_plan.validity_term}}</span>日</div>
              <img class="redArrow" src="../../assets/images/redarrow.png" width="12"/>
              <div class="addPlan">{{ticket_plan.paypal_amount_show}}
                <div class="taxFont">税込</div><br />
                <div class="dollarFont">円</div>
              </div>

              <span v-if="studentInfo.is_corporate_member"></span>
              <span v-else>
                <span v-if="studentInfo.payjp_customer_id">
                <a @click="planConfirm(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">今すぐ購入</a>
                </span>
                <span v-else>
                <span v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1">
                  <a @click="changePaypalMonthPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
                </span>
                  <span v-if="ticket_plan.use_paypay === 1 && ticket_plan.paypay_img">
                    <a @click="changePaypayPlanPc(ticket_plan)" class="buttonCVtrial">PayPay</a>
                  </span>
                  <a @click="changePayjpPlanPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">カード決済</a>
                </span>
                <div class="reservationplandes">
                  1日{{ticket_plan.reservation_limit_per_day}}回まで 予約保持{{ticket_plan.reservation_limit_per_range}}回まで
                </div>
              </span>

            </div>
          </div>

        </div>

      </div>
      <div
          id="content2"
          class="contentPlan"
          :class="{ 'active': activeTabIndex === 1 }"
      >
        <p class="headlinePos">サブスクタイプ</p>
        <p class="headlineDes">初回の課金後、毎月自動更新する支払いタイプ</p>
        <div class="PricelistWrap">

          <!--          <div class="PricelistChild" >-->
          <!--            <h4>毎日１回プラン</h4>-->
          <!--            <p class="lessonTitle"><img src="~/assets/SVG/lessonTitle02.svg" alt=""></p>-->
          <!--            <p class="buttonCVtrial">無料登録</p>-->
          <!--          </div>-->
          <!--          <div class="PricelistChild" >-->
          <!--            <h4>毎日２回プラン</h4>-->
          <!--            <p class="lessonTitle"><img src="~/assets/SVG/lessonTitle03.svg" alt=""></p>-->
          <!--            <p class="buttonCVtrial">無料登録</p>-->
          <!--          </div>-->
        </div>

      </div>
  </div>
  </div>
  <payjp v-show="payjp_show" :code="selected_plans" :ptype="selected_plan_type" :umode="update_mode" :flag="flag"></payjp>
    
<!--    </div>-->

  <n-modal
      class="paypay-modal"
      v-model:show="showPaypay"
      preset="dialog"
      :style="bodyStyle"
      title=""
      size="huge"
      :bordered="false"
      :segmented="segmented"
      positive-text="支払い済みの方はこちら"
      negative-text="購入せずに戻る"
      @positive-click="paypayPay"
      @negative-click="paypayBack"
  >
    <div>
      <h1><img src="../../assets/images/paypay_headlogo.png"></h1>
      <h5>購入は、こちらを読み取ってお支払いください。</h5>
      <img class="scanImg" :src="selectPaypayPlan.paypay_img" />
      <div class="info-row">
        <div class="info-title">ご購入内容</div>
        <div class="info-content">
          (チケット)
          <span v-if="selectPaypayPlan.learn_type === 0">総合</span>
          <span v-else>会話</span>
          {{selectPaypayPlan.buy_issued_lesson_num}}回{{selectPaypayPlan.validity_term}}日
        </div>
      </div>

      <div class="info-row">
        <div class="info-title">支払い金額(税込)</div>
        <div class="info-price">
          <span>{{selectPaypayPlan.paypal_amount_show}}</span>円
        </div>
      </div>
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


  // definePageMeta({
    //   middleware: 'auth',
    //   layout: 'mypage'
    // });

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
  const monthlyLearnType = useStore.monthly_learn_type;
  const ticketLearnType = useStore.ticket_plan_type;
  const contractStatus = useStore.contract_status;
  let flag = ref(1);
  let imgFlag = ref(0);
  let bodyStyle = {
    width: '600px'
  };
  let segmented = {
    content: 'soft',
    footer: 'soft'
  };
  let selectPaypayPlan = ref(null);
  let showPaypay = ref(false);
  let timer1;
  let countdownEnd;
  let dtitle = ref('');
  let dcontent = ref('');
  let singlePlan = ref([]);

  const getPlans = async () => {
    const {pending, data: planinfo  } = await useStudentPlanListDataApi();
    payjp_show.value = true;
    // console.log('planinfo:'+JSON.stringify(planinfo));
    if (planinfo?.value) {
      pay_plans.value = planinfo?.value?.pay_plans ?? [];
      pay_plans_ticket.value = planinfo?.value?.pay_plans_ticket ?? [];
      plans_footer_des.value = planinfo?.value?.plans_footer_des ?? '';
      studentInfo.value = planinfo?.value?.student_info ?? {};
      payjp_card_brand.value = studentInfo.value.payjp_card_brand ?? '';
      payjp_card_last4.value = studentInfo.value.payjp_card_last4 ?? '';
      talk_pay_plans.value = planinfo?.value?.talk_pay_plans ?? [];
      talk_pay_plans_ticket.value = planinfo?.value?.talk_pay_plans_ticket ?? [];
      singlePlan.value = planinfo?.value.single_plan ?? [];
      update_mode.value = studentInfo?.value?.monthly_plan_id ? 'update' : 'add';
      // use_paypal.value = planinfo?.value.use_paypal ?? 0;
      use_paypal.value = 1;
      imgFlag.value = planinfo?.value.flag ?? 0;
    }
  }

  onMounted( () => {
    clearTimeout(timer1);
    getPlans();
  })
    function planConfirm(plan_code,type='',learnType) {
      getDes(type,learnType);
      const { dialog } = createDiscreteApi(["dialog"]);
      if (useStore?.studentInfo?.monthly_change_now === 1 && type !== 'ticket') {
        dialog.warning({
          title: useStore?.studentInfo?.contract_status === 'Trial' ? dtitle.value : "プランの購入",
          content: useStore?.studentInfo?.contract_status === 'Trial' ? dcontent.value : "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onPositiveClick: async () => {
            const dialogInstance = showLoading();
            const {pending, error, data: changedata  } = await useStudentChangeMonthPlanPayjpApi(plan_code,'',1);
            if (changedata?.value && changedata.value.err == false) {
              dialogInstance.destroy();
              goTop();
            } else {
              dialogInstance.destroy();
            }
          },
        });
      } else if (contractStatus === 'Regular' && type !== 'ticket') {
        dialog.warning({
          title: "プラン変更のお手続き",
          action: () => h('div', { class: 'dg-action' }, [
            // 加底線的文字內容
            h('div', { class: 'dg-content' }, [
              h('span', {}, '変更のタイミングをお選びください。'),
              h('span', { class: 'dg-underline' }, 'お手続き完了後の取り消しは不可となります。')
            ]),
            // 第一組按鈕及其說明 (即時に変更する)
            h('div', { class: 'dg-button-container' }, [
              h('button', {
                class: 'dg-button',
                onClick: async () => {
                  dialog.destroyAll();
                  dialog.warning({
                    title: "即時にプランを変更する",
                    content: "新しいプランの購入で間違いないでしょうか。※購入後、以前のプランで残っていたレッスンコマ数は消えて無効となります。※"
                        + payjp_card_brand.value + "下4桁"
                        + payjp_card_last4.value + "のカードが使われます",
                    positiveText: "購入する",
                    negativeText: "キャンセル",
                    onPositiveClick: async () => {
                      const dialogInstance = showLoading();
                      const { pending, error, data: changedata } =
                          await useStudentChangeMonthPlanPayjpApi(plan_code, '', 1);
                      if (changedata?.value && changedata.value.err == false) {
                        dialogInstance.destroy();
                        goTop();
                      } else {
                        dialogInstance.destroy();
                      }
                    }
                  });
                }
              }, '即時に変更する'),

              h(NText, {
                class: 'dg-text',
              }, 'クリック後、すぐにプランが変更されます。現在残りのコマ数は0にリセットされます。')
            ]),

            // 第二組按鈕及其說明 (変更を予約する)
            h('div', { class: 'dg-button-container' }, [
              h('button', {
                class: 'dg-button',
                onClick: async () => {
                  dialog.destroyAll();
                  dialog.warning({
                    title: "プラン変更を予約する",
                    content: "現行プランの有効期限が終了するタイミングで新しいプランの課金が発生します。※"
                        + payjp_card_brand.value + "下4桁"
                        + payjp_card_last4.value + "のカードが使われます",
                    positiveText: "購入する",
                    negativeText: "キャンセル",
                    onPositiveClick: async () => {
                      const dialogInstance = showLoading();
                      const { pending, error, data: changedata } =
                          await useStudentChangeMonthPlanPayjpApi(plan_code, '', 2);
                      if (changedata?.value && changedata.value.err == false) {
                        dialogInstance.destroy();
                        goTop();
                      } else {
                        dialogInstance.destroy();
                      }
                    }
                  });
                }
              }, '変更を予約する'),

              h(NText, {
                class: 'dg-text',
              }, '現在利用中のプランの有効期限終了後に、プランが変更されます。')
            ])
          ])
        });
      } else if (type == 'ticket') {
        dialog.warning({
          title: useStore?.studentInfo?.contract_status === 'Trial' ? dtitle.value : "チケットの購入",
          content: useStore?.studentInfo?.contract_status === 'Trial' ? dcontent.value : "チケットの購入で間違いないででしょうか？",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onPositiveClick: async () => {
            dialog.warning({
              title: "チケットの購入",
              content: "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
              positiveText: "はい、購入する",
              negativeText: "いいえ、キャンセル",
              onPositiveClick: async () => {
                const dialogInstance = showLoading();
                const {pending, error, data: changedata  } = await useStudentChangeTicketPlanPayjpApi(plan_code);
                if (changedata?.value && changedata.value.err == false) {
                  dialogInstance.destroy();
                  goTop();
                } else {
                  dialogInstance.destroy();
                }
              },
            });
          },
          onNegativeClick: async () => {

          }
        });
      } else {
        dialog.warning({
          title: useStore?.studentInfo?.contract_status === 'Trial' ? dtitle.value : "プランの購入",
          content: useStore?.studentInfo?.contract_status === 'Trial' ? dcontent.value : "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onPositiveClick: async () => {
            const dialogInstance = showLoading();
            const {pending, error, data: changedata  } = await useStudentChangeMonthPlanPayjpApi(plan_code);
            if (changedata?.value && changedata.value.err == false) {
              dialogInstance.destroy();
              goTop();
            } else {
              dialogInstance.destroy();
            }
          },
        });
      }
      // const { dialog } = createDiscreteApi(["dialog"])
    }

    // function ticketConfirm(plan_code) {
    //   const { dialog } = createDiscreteApi(["dialog"])
    //   dialog.warning({
    //     title: "プランの購入",
    //     content: "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
    //     positiveText: "はい、購入する",
    //     negativeText: "いいえ、キャンセル",
    //     onPositiveClick: async () => {
    //       //调用换月套餐接口
    //       const {pending, error, data: changedata  } = await useStudentChangeTicketPlanPayjpApi(plan_code);
    //       console.log('planpage:'+JSON.stringify(changedata));
    //       if (changedata.value.err == false) {
    //         return navigateTo("/mypage/mypageReserved", { replace: true });
    //       }
    //     },
    //   });
    // }
    function changePayjpPlanPc(plan_code,type='',learnType) {
      payjp_show.value = true;
      const { dialog } = createDiscreteApi(["dialog"]);
      if (useStore?.studentInfo?.monthly_change_now === 1 && type !== 'ticket') {
        dialog.warning({
          title: "プランの購入",
          content: "ご購入で間違いないでしょうか。※変更前のサブスクプランでの新規予約はできなくなります.",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onNegativeClick: async () => {

          },
          onPositiveClick: async () => {
            selected_plans.value = plan_code;
            selected_plan_type.value = type;
            flag.value = 1;
            let payjpCheckBox = document.getElementById('payjp_checkout_box');
            // console.log('payjpCheckBox:'+payjpCheckBox);
            if (payjpCheckBox != null) {
              payjpCheckBox.children[0].click();
            } else {
              timer.value = 3;
              // payjp_show.value = false;
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
                  // console.log(timer)
                }
              }, 1000)
            }
          },
        });
      } else if (contractStatus === 'Regular' && type !== 'ticket') {
        dialog.warning({
          title: "プラン変更のお手続き",
          action: () => h('div', { class: 'dg-action' }, [
            // 加底線的文字內容
            h('div', { class: 'dg-content' }, [
              h('span', {}, '変更のタイミングをお選びください。'),
              h('span', { class: 'dg-underline' }, 'お手続き完了後の取り消しは不可となります。')
            ]),
            // 第一組按鈕及其說明 (すぐにプラン変更する)
            h('div', { class: 'dg-button-container' }, [
              h('button', {
                class: 'dg-button',
                onClick: async () => {
                  dialog.destroyAll();
                  dialog.warning({
                    title: "即時にプランを変更する",
                    content: "新しいプランの購入で間違いないでしょうか。※ご購入後、以前のプランに含まれるレッスン数はリセットされます。",
                    positiveText: "購入する",
                    negativeText: "キャンセル",
                    onPositiveClick: async () => {
                      selected_plans.value = plan_code;
                      selected_plan_type.value = type;
                      flag.value = 1;
                      let payjpCheckBox = document.getElementById('payjp_checkout_box');
                      if (payjpCheckBox != null) {
                        payjpCheckBox.children[0].click();
                      } else {
                        timer.value = 3;
                        let interval = setInterval(() => {
                          if (timer.value === 0) {
                            clearInterval(interval);
                          } else {
                            payjp_show.value = true;
                            let payjpCheckBox2 = document.getElementById('payjp_checkout_box');
                            if (payjpCheckBox2 != null) {
                              payjpCheckBox2.children[0].click();
                              clearInterval(interval);
                            } else {
                              timer.value--;
                            }
                          }
                        }, 1000);
                      }
                    }
                  });
                }
              }, '即時に変更する'),

              h(NText, {
                class: 'dg-text',
              }, 'クリック後、すぐにプランが変更されます。現在保有のレッスン数がリセットされます。')
            ]),

            // 第二組按鈕及其說明 (現行プランの有効期限が終わると同時にプラン変更する)
            h('div', { class: 'dg-button-container' }, [
              h('button', {
                class: 'dg-button',
                onClick: async () => {
                  dialog.destroyAll();
                  dialog.warning({
                    title: "プラン変更を予約する",
                    content: "現行プランの有効期限が終了するタイミングで新しいプランの課金が発生します。",
                    positiveText: "購入する",
                    negativeText: "キャンセル",
                    onPositiveClick: async () => {
                      selected_plans.value = plan_code;
                      selected_plan_type.value = type;
                      flag.value = 2;
                      let payjpCheckBox = document.getElementById('payjp_checkout_box');
                      if (payjpCheckBox != null) {
                        payjpCheckBox.children[0].click();
                      } else {
                        timer.value = 3;
                        let interval = setInterval(() => {
                          if (timer.value === 0) {
                            clearInterval(interval);
                          } else {
                            payjp_show.value = true;
                            let payjpCheckBox2 = document.getElementById('payjp_checkout_box');
                            if (payjpCheckBox2 != null) {
                              payjpCheckBox2.children[0].click();
                              clearInterval(interval);
                            } else {
                              timer.value--;
                            }
                          }
                        }, 1000);
                      }
                    }
                  });
                }
              }, '変更を予約する'),

              h(NText, {
                class: 'dg-text',
              }, '現在利用中のプランの有効期限終了後に、プランが変更されます。')
            ])
          ])
        })
      } else {
        selected_plans.value = plan_code;
        selected_plan_type.value = type;
        let payjpCheckBox = document.getElementById('payjp_checkout_box');
        // console.log('payjpCheckBox:'+payjpCheckBox);
        if (payjpCheckBox != null) {
          payjpCheckBox.children[0].click();
        } else {
          timer.value = 3;
          // payjp_show.value = false;
          let interval = setInterval(() => {
            if (timer.value === 0) {
              clearInterval(interval)
              payjp_show.value = false;
            } else {
              payjp_show.value = true;
              let payjpCheckBox2 = document.getElementById('payjp_checkout_box');
              if (payjpCheckBox2 != null) {
                payjpCheckBox2.children[0].click();
                clearInterval(interval)
              } else {
                timer.value --
              }
              // console.log(timer)
            }
          }, 1000)
        }
      }
      // $("#payjp_checkout_box").children("input[type=button]").trigger('click');

    }

    async function changePaypalMonthPc(plan_code,type='',learnType) {
      const { dialog } = createDiscreteApi(["dialog"]);
      if (type !== 'ticket' && contractStatus === 'Regular' && monthlyLearnType !== learnType) {
        dialog.warning({
          title: "プランの購入",
          content: "ご購入で間違いないでしょうか。※変更前のサブスクプランでの新規予約はできなくなります。",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onNegativeClick: async () => {

          },
          onPositiveClick: async () => {
            // console.log('paypal支付');//调用后台api
            const {pending, error, data: paydata  } = await useStudentPaypalPayApi(plan_code);

            if (paydata?.value && paydata.value.err === false) {
              window.location.href = paydata?.value.url;
              // console.log('changePaypalMonthPc:', JSON.stringify(paydata));
            }
          }
        });
      } else {
        // console.log('paypal支付');//调用后台api
        const {pending, error, data: paydata  } = await useStudentPaypalPayApi(plan_code);

        if (paydata?.value && paydata.value.err === false) {
          window.location.href = paydata?.value.url;
          // console.log('changePaypalMonthPc:', JSON.stringify(paydata));
        }
      }

    }

  function changePaypayPlanPc(plan) {
    selectPaypayPlan.value = plan;
    showPaypay.value = true;

    clearTimeout(timer1);
    countdownEnd = Date.now() + 22000;
    updateCountdown1();
  }

  function updateCountdown1() {
    const remaining = Math.max(0, countdownEnd - Date.now());

    if (remaining > 0) {
      timer1 = setTimeout(updateCountdown1, 1000);
    } else {
      clearTimeout(timer1);
      return false;
    }
  }
  function paypayPay() {
    showPaypay.value = false;

    dialog.warning({
      title: "お支払い状況の最終確認",
      content: "「はい、お支払い済み」を押すと、チケットが追加されます。 まだお支払い前の方は、「いいえ、まだ」で前の画面にお戻りください。",
      positiveText: "はい、お支払い済み",
      negativeText: "いいえ、まだ",
      onPositiveClick: async () => {

      },
      onNegativeClick: () => {
        showPaypay.value = true;
      },
    });

  }

  function paypayBack() {
    showPaypay.value = false;
  }

  function showLoading() {
    const { dialog } = createDiscreteApi(["dialog"]);
    const dialogInstance = dialog.warning({
      title: "プランの購入",
      content: "ご購入で間違いないでしょうか。※" + payjp_card_brand.value + "下4桁" + payjp_card_last4.value + "のカードが使われます",
      positiveText: "はい、購入する",
      negativeText: "いいえ、キャンセル",
      loading: true, // 启用加载状态
      onPositiveClick: async () => {
        // 防止重复点击
        return false;
      },
    });
    return dialogInstance;
  }

  function goTop() {
    useStore.useRefreshUserInfo();
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.warning({
      title: "プランのご購入が完了しました。",
      positiveText: "マイページTOPへ",
      onPositiveClick: async () => {
        useStore.setActiveUrl("/mypage/mypageReserved");
        return navigateTo("/mypage/mypageReserved", { replace: true });
      },
    });
  }

  function getDes(type='',learnType) {
    if (type !== 'ticket') {
      dtitle.value = 'プランのご購入';
      if (useStore?.studentInfo?.monthly_learn_type === learnType) {
        dcontent.value = 'すぐに正規プランが適応されます。\n' +
            '体験レッスンの未利用部分はご利用できなくなります。\n' +
            '※'+payjp_card_brand.value+'カードで下四桁'+payjp_card_last4.value+'のカードが使われます。';
      } else {
        dcontent.value = 'すぐに正規プランが適応されます。\n' +
            '体験レッスンの未利用部分はご利用できなくなります。\n' +
            'コースが変わるため、現在予約中のレッスンがある場合、そのままご受講いただけます。\n' +
            '※'+payjp_card_brand.value+'カードで下四桁'+payjp_card_last4.value+'のカードが使われます。';
      }
    } else {
      dtitle.value = 'レッスンチケットのご購入';
      dcontent.value = 'ご利用中のサブスクプランがある場合、引き続きご利用いただけます。' +
          '※'+payjp_card_brand.value+'カードで下四桁'+payjp_card_last4.value+'のカードが使われます。';
    }
  }
  </script>

<script>
export default {
  data() {
    return {
      activeTabIndex: 0 // 預設顯示第一個 tab 的內容
    };
  },
  methods: {
    activateTab(index) {
      this.activeTabIndex = index;
    }
  }
};
</script>

<style scoped>
.study-plan-box{
  margin-top: 16px;
  border: 1px solid #eeeeee;
  box-shadow: 0 0 0 !important;
}
.saleStamp{
  z-index: 999;
  transform: scale(0.8);
  top: 0;
  right: -20px;
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
  border-radius: 8px; height: 40px; position: relative;
  background-color: var(--pink-dark); color: #FFFFFF;
  bottom: -2px;
  padding: 0 8px;
}
.addTitle2{
  display: inline-block; line-height: 40px; text-align: center; font-weight: bold;
  border-radius: 8px; height: 40px; position: relative;
  background-color: #30A186; color: #FFFFFF;
  bottom: -2px;
  padding: 0 8px;
}
.addLesson{display: inline-block; margin:0 4px; bottom: -8px;position: relative; padding-bottom: 14px;}
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


.PricelistWrap_add .buttonCVtrial{
  font-size: 11px;
  right: 0;
  margin-right: 0;
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

@media screen and (max-width: 520px) {
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
  text-decoration-color: var(--pink-dark);
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
  background-color: var(--pink-dark);
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