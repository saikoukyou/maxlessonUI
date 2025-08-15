<template>
  <p class="lessonConfirmAttention ">お支払いに失敗したため、再度プランを選んでお支払いください。</p>
  <div class="blockW">
    <div class="planTitleFront">サブスクタイプ</div>
    <div class="planDes">・初回の課金後、毎月自動更新する支払いタイプ</div>


    <!-- 学习套餐 -->
    <section class="Pricelist">
      <img src="../../assets/images/mobile_learn.png" class="mobile_learn">
      <div class="courseBanner learn">
        <div class="courseContentWord">
          <span class="courseContentTitle">総合コース
          <span class="courseDesc">中国語学習を全面的にサポート</span>
          </span>
          <div class="feature-icons">
            <img src="../../assets/images/learn_s1.png" alt="マンツーマンレッスン">
            <img src="../../assets/images/learn_s2.png" alt="入門OK">
            <img src="../../assets/images/learn_s3.png" alt="文法/会話/HSK">
            <img src="../../assets/images/learn_s4.png" alt="WEB教材9ジャンル">
            <img src="../../assets/images/learn_s5.png" alt="動画・音声で自習もOK">
          </div>
        </div>
      </div>

      <div class="courseBlock" v-for="(plan,pindex) in pay_plans">
        <div v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0">
<!--          <ul><li>ずっと</li><li>{{plan.every_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>-->
          <img src="../../assets/images/saleStamp.png" class="saleStamp">
        </div>
        <div v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0" class="courseStamp">
          <ul><li>初月</li><li>{{plan.first_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
        </div>
        <span class="courseTitle lColorbg">{{plan.plan_name}}</span>
        <ul class="courseContent">
          <li v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0" class="saleWord">今なら、ず━━っと</li>
          <li class="salePrice">月額
            <span class="amount" v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0">
              {{plan.paypal_amount_show}}
            </span>
            <span class="amount" v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0">
              {{plan.first_month_off_amount_show}}
            </span>
            <span class="amount" v-else>
              {{plan.paypal_amount_show}}
            </span>
            円<span class="littleTax">税込</span>
          </li>
          <li v-if="(plan.every_month_off == 1 && plan.every_month_off_rate != 0) || (plan.first_month_off == 1 && plan.first_month_off_rate != 0)">
            <span class="orip">月額{{plan.final_amount_show}}円</span><span class="oriptax"> 税込</span>
          </li>
          <li v-else><span class="orip"></span><span class="oriptax"></span></li>
<!--          <li>1レッスン {{plan.lesson_price}}円</li>-->
        </ul>
        <div>
          <span v-if="studentInfo.monthly_plan_id">
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
<!--              <div class="reservationplandes">-->
<!--                1日{{plan.reservation_limit_per_day}}回まで 予約保持{{plan.reservation_limit_per_range}}回まで-->
<!--              </div>-->
          </span>
          </span>
          <span v-else>
            <a class="buttonCVtrial" @click="onSubmit(plan)">100円で体験する</a>
          </span>
        </div>
      </div>
      <div class="study-plan-box">
        <div class="study-plan-left">
          <div class="study-plan-desc">
            レッスンなし・学習コンテンツ利用し放題
          </div>
          <div class="study-plan-type">
            <span class="plan-label"></span>
            <span class="plan-content">WEB教材＋動画＋音声</span>
          </div>
        </div>
        <div class="study-plan-right">
            <span>
            <a href="#" class="btnRed">100円体験へ</a>
          </span>
        </div>
      </div>

    </section>


    <!-- 会话套餐 -->
    <section class="Pricelist">
      <img src="../../assets/images/mobile_speak.png" class="mobile_learn">
      <div class="courseBanner speak">
        <div class="courseContentWord">
          <span class="courseContentTitle">会話コース
          <span class="courseDesc">和中国各地老師全程用中文交流</span>
          </span>
          <div class="feature-icons">
            <img src="../../assets/images/speak_s1.png" alt="マンツーマンレッスン">
            <img src="../../assets/images/speak_s2.png" alt="オール中国語">
            <img src="../../assets/images/speak_s3.png" alt="会話コース限定教材">
            <img src="../../assets/images/speak_s4.png" alt="WEB教材2ジャンル">
          </div>
        </div>
      </div>
      <div class="courseBlock" v-for="(tplan,pindex) in talk_pay_plans">
        <div v-if="tplan.every_month_off == 1 && tplan.every_month_off_rate != 0" class="courseStamp planP">
          <ul><li>ずっと</li><li>{{tplan.every_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
        </div>
        <div v-else-if="tplan.first_month_off == 1 && tplan.first_month_off_rate != 0" class="courseStamp">
          <ul><li>初月</li><li>{{tplan.first_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
        </div>
        <span class="courseTitle sColorbg">{{tplan.plan_name}}</span>
        <ul class="courseContent">
          <li v-if="(tplan.every_month_off == 1 && tplan.every_month_off_rate != 0) || (tplan.first_month_off == 1 && tplan.first_month_off_rate != 0)"><span class="orip">月額{{tplan.final_amount_show}}円</span><span class="oriptax"> 税込</span></li>
          <li v-else><span class="orip"></span><span class="oriptax"></span></li>
          <li class="salePrice">月額
            <span class="amount" v-if="tplan.every_month_off == 1 && tplan.every_month_off_rate != 0">
              {{tplan.paypal_amount_show}}
            </span>
            <span class="amount" v-else-if="tplan.first_month_off == 1 && tplan.first_month_off_rate != 0">
              {{tplan.first_month_off_amount_show}}
            </span>
            <span class="amount" v-else>
              {{tplan.paypal_amount_show}}
            </span>
            円<span class="littleTax">税込</span>
          </li>
          <li>1レッスン {{tplan.lesson_price}}円</li>
        </ul>
        <div>
          <span v-if="studentInfo.monthly_plan_id">
            <span v-if="!studentInfo.is_corporate_member">
            <span v-if="tplan.id == studentInfo.monthly_plan_id">
              <span v-if="studentInfo.subscription_id">
                <div class="pay-desc">カード現在利用中</div>
                <a @click="planConfirm(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">今すぐ更新</a>
              </span>
              <span v-else-if="studentInfo?.recurring_payment_id && studentInfo?.paypal_cancel == 0">
                <div class="pay-desc">Paypal現在利用中</div>
                <span v-if="studentInfo.payjp_customer_id">
                  <a @click="planConfirm(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">プラン変更</a>
                </span>
                <span v-else>
                  <a @click="changePayjpPlanPc(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">カード決済</a>
                </span>
              </span>
              <span v-else>
                <div class="pay-desc">現在利用中</div>
                <span v-if="studentInfo.payjp_customer_id">
                  <a @click="planConfirm(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">プラン変更</a>
                </span>
                <span v-else>
                  <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">Paypal決済</a>
                  <a @click="changePayjpPlanPc(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">カード決済</a>
                </span>
              </span>
            </span>
            <span v-else>
            <span v-if="studentInfo.payjp_customer_id">
              <a @click="planConfirm(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">プラン変更</a>
            </span>
            <span v-else>
              <a @click="changePayjpPlanPc(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">カード決済</a>
              <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(tplan.plan_code,'',tplan.learn_type)" class="buttonCVtrial">Paypal決済</a>
            </span>
          </span>
            <div class="reservationplandes">
              1日{{tplan.reservation_limit_per_day}}回まで 予約保持{{tplan.reservation_limit_per_range}}回まで
            </div>
        </span>
          </span>
          <span v-else>
            <a class="buttonCVtrial" @click="onSubmit(tplan)">100円で体験する</a>
          </span>

          <!--          <a @click="changePaypalMonthPc(tplan.plan_code)" class="buttonCVtrial">Paypal決済</a>-->
        </div>
      </div>



    </section>


    <!-- 單發 -->
    <section class="Pricelist singlePosition" >

      <div class="planTitleFront">チケットタイプ</div>
      <div class="planDes">・都度購入で自動更新されないタイプ</div>
      <!--      -->
      <div class="singlePlan" v-for="(ticket_plan) in pay_plans_ticket">

        <ul class="SinglePlanContent">
          <li class="lColorbg">総合コース</li>
          <li><span> {{ticket_plan.buy_issued_lesson_num}} </span>回</li>
          <li>有効期限<span> {{ticket_plan.validity_term}} </span>日</li>
          <li><img width="15" src="../../assets/images/redarrow.png"></li>
        </ul>

        <ul class="SingleAmount">
          <li>{{ticket_plan.paypal_amount_show}}</li>
          <li>税込</li>
          <li>円</li>
          <li>1レッスン {{ticket_plan.lesson_price}}円</li>
        </ul>

        <div class="SingleBtn">
          <span v-if="logged">
            <span v-if="studentInfo.payjp_customer_id">
              <a @click="planConfirm(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">今すぐ購入</a>
            </span>
            <span v-else>
              <span v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1">
                <a @click="changePaypalMonthPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
              </span>
              <span v-if="ticket_plan.use_paypay === 1">
                <a @click="changePaypayPlanPc(ticket_plan)" class="buttonCVtrial">PayPay</a>
              </span>
              <a @click="changePayjpPlanPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">カード決済</a>
            </span>
          </span>
          <span v-else>
            <a @click="onSubmit(ticket_plan)">購入する</a>
          </span>
        </div>

      </div>

      <div class="singlePlan" v-for="(t_ticket_plan) in talk_pay_plans_ticket">

        <ul class="SinglePlanContent">
          <li class="sColorbg">会話コース</li>
          <li><span> {{t_ticket_plan.buy_issued_lesson_num}} </span>回</li>
          <li>有効期限<span> {{t_ticket_plan.validity_term}} </span>日</li>
          <li><img width="15" src="../../assets/images/redarrow.png"></li>
<!--          <li><img src="../assets/images/redarrow_m.png"></li>-->
        </ul>

        <ul class="SingleAmount">
          <li>{{t_ticket_plan.paypal_amount_show}}</li>
          <li>税込</li>
          <li>円</li>
          <li>1レッスン {{t_ticket_plan.lesson_price}}円</li>
        </ul>

        <div class="SingleBtn">
          <span v-if="logged">
            <span v-if="studentInfo.is_corporate_member"></span>
            <span v-else>
              <span v-if="studentInfo.payjp_customer_id">
                <a style="display: inline-block;" @click="planConfirm(t_ticket_plan.plan_code,'ticket',t_ticket_plan.learn_type)" class="buttonCVtrial">今すぐ購入</a>
              </span>
              <span v-else>
                <span v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1">
                  <a @click="changePaypalMonthPc(t_ticket_plan.plan_code,'ticket',t_ticket_plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
                </span>
                <span v-if="t_ticket_plan.use_paypay === 1">
                  <a @click="changePaypayPlanPc(ticket_plan)" class="buttonCVtrial">PayPay</a>
                </span>
                  <a @click="changePayjpPlanPc(t_ticket_plan.plan_code,'ticket',t_ticket_plan.learn_type)" class="buttonCVtrial">カード決済</a>
              </span>
            </span>
          </span>
          <span v-else>
            <a class="buttonCVtrial" @click="onSubmit(t_ticket_plan)">購入する</a>
          </span>
        </div>

      </div>


    </section>

  </div>
  <payjp v-show="payjp_show" :code="selected_plans" :ptype="selected_plan_type" :umode="update_mode"></payjp>
  <main>
  </main>

</template>


<script setup>
import {
  useHomePlanListDataApi,
  useStudentChangeMonthPlanPayjpApi,
  useStudentChangeTicketPlanPayjpApi,
  useStudentPaypalPayApi
} from "~/apis/plan";
import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NModal, NText} from "naive-ui";
import {h, onMounted, ref} from "vue";
import { useMainStore } from "~/composables/store";
import {useRegApi} from "~/apis/user";

// 你原本的程式碼
let studentInfo = ref({});
let payjp_card_brand = ref('');
let payjp_card_last4 = ref('');
let selected_plans = ref('');
let selected_plan_type = ref('');
let payjp_show = ref(true);
let pay_plans = ref([]);
let pay_plans_ticket = ref([]);
let plans_footer_des = ref('');
let talk_pay_plans = ref([]);
let talk_pay_plans_ticket = ref([]);
let timer = ref(3);
let register_flag = ref(1);
let register_text = ref('');
let update_mode = ref('');
let use_paypal = ref(0);
const useStore = useMainStore();
const logged = useStore.studentLoggedIn;
const monthlyLearnType = useStore.monthly_learn_type;
const contractStatus = useStore.contract_status;
let flag = ref(1);
let selectPaypayPlan = ref(null);
let showPaypay = ref(false);
let timer1;
let countdownEnd;
let selectRegisterPlan = ref(null);

const getAllPlans = async () => {
  const { data: planinfo } = await useHomePlanListDataApi();
  if (planinfo?.value) {
    register_flag.value = planinfo?.value?.register_type ?? 1;
    register_text.value = register_flag.value == 1 ? '立即体验' : '今すぐ体験';
    pay_plans.value = planinfo?.value.pay_plans ?? [];
    pay_plans_ticket.value = planinfo?.value.pay_plans_ticket ?? [];
    plans_footer_des.value = planinfo?.value.plans_footer_des ?? '';
    talk_pay_plans.value = planinfo?.value.talk_pay_plans ?? [];
    talk_pay_plans_ticket.value = planinfo?.value.talk_pay_plans_ticket ?? [];
    use_paypal.value = planinfo?.value.use_paypal ?? 0;

    if (logged) {
      studentInfo.value = planinfo?.value?.student_info ?? {};
      payjp_card_brand.value = studentInfo.value.payjp_card_brand ?? '';
      payjp_card_last4.value = studentInfo.value.payjp_card_last4 ?? '';
      update_mode.value = studentInfo?.value?.monthly_plan_id ? 'update' : 'add';
    } else {
      update_mode.value = 'add';
    }
  }
};

onMounted(() => {
  // 載入計劃數據
  getAllPlans();
});

function planConfirm(plan_code,type='',learnType) {
  const { dialog } = createDiscreteApi(["dialog"]);
  if (useStore?.studentInfo?.monthly_change_now === 1 && type !== 'ticket') {
    dialog.warning({
      title: "プランの購入",
      content: "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
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
                content: "新しいプランの購入で間違いないでしょうか。※"
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
      title: "チケットの購入",
      content: "ご購入で間違いないでしょうか。※ご購入後、以前のプランに含まれるレッスン数はリセットされます。",
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
      title: "プランの購入",
      content: "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
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
}

function changePayjpPlanPc(plan_code,type='',learnType) {
  payjp_show.value = true;
  const { dialog } = createDiscreteApi(["dialog"]);
  if (useStore?.studentInfo?.monthly_change_now === 1 && type !== 'ticket') {
    dialog.warning({
      title: "プランの購入",
      content: "ご購入で間違いないでしょうか。※ご購入後、以前のプランに含まれるレッスン数はリセットされます。",
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
      content: "ご購入で間違いないでしょうか。※ご購入後、以前のプランに含まれるレッスン数はリセットされます。",
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

//加载效果
const loading = ref(false)

const onSubmit = (plan) => {
  selectRegisterPlan.value = plan;
  selected_plans.value = selectRegisterPlan.value.plan_code;
  selected_plan_type.value = selectRegisterPlan.value.type;

  payjp_show.value = true;

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
}
</script>




<style scoped>
.study-plan-box{
  margin: 0 20px 20px 13px;
}
.courseContentTitle{
  left: 70px;
}
.feature-icons{
  left: 270px;
}
.feature-icons img{
  width: 106px;
}
.courseContentWord{
  transform: scale(0.8);
}
.courseBanner.learn{
  background-position: -460px;
}
.courseBanner.speak{
  background-position: -460px;
}
.saleStamp{
  transform: scale(0.8);
  top:0;
  right: -20px;
}
.salePrice{
  transform: scale(0.9);
}
.planTitleFront{
  margin: 10px auto;
}
.courseDesc{
  font-size: 13px;
}
.singlePlan{
  width: 100%;
  border: 1px solid #eeeeee;
}
.courseBanner{
  margin: 0;
}
.Pricelist{
  width: 100%;
  border: 1px solid #eeeeee;
  background-color: #f4f4f4;
  margin-top: 30px;
}
.courseBlock{
  width: 30%;
  border: 1px solid #eeeeee;
  margin: 2% 1.5%;
  display: inline-block;
  position: relative;
  background-color: #ffffff;
  border-radius:  0 0 8px 8px;
}
.courseStamp{
  right: 0;
  transform: scale(0.7);
}
.buttonCVtrial{
  background-color: #E53939;
  padding: 10px 20px;
  border-radius: 28px;
  color: #ffffff;
  margin: 10px auto !important;
  display: block !important;
  text-align: center;
  width: fit-content;
  font-weight: bold;
  cursor: pointer;
}
.buttonCVtrial:hover {
  background-color: #b71c1c;
  color: #FFFFFF !important;
}
.singlePosition{
  background-color: #ffffff !important;
  border: 0;
}

@media screen and (max-width: 520px) {
  .study-plan-box{
    margin: auto;
    width: 100%;
  }
  .lessonConfirmAttention{
    width: 90%;
    line-height: normal;
    padding-bottom: 2%;
    margin: auto;
  }
  .SinglePlanContent li:nth-child(2) span{
    font-size: 30px;
  }
  .SinglePlanContent li:nth-child(3) span{
    font-size: 30px;
  }
  .SingleBtn{
    display: block;
  }
  .SinglePlanContent{
    display: block;
    text-align: center;
  }
  .SinglePlanContent li:nth-child(1){
    height: auto;
  }
  .courseBlock{
    border-radius: 8px;
    margin: 3% 0;
  }
  .Pricelist{
    padding: 0;
    background: none;
    border: 0;
  }
  .singlePlan{
    display: block;
  }
  .tabCourse li {
    width: 50%;
    display: inline-block;
    text-align: center;
    color: #FFFFFF;
  }

  .tabCourse li:nth-child(1) {
    background-color: #30A186;
  }

  .tabCourse li:nth-child(2) {
    background-color: #FA8373;
  }
}

.buttonCVtrial{margin-bottom: 10px;}

.Pricelist .buttonCVtrial{display: inline-block; margin-left: 5px; font-size: 13px;}

</style>
