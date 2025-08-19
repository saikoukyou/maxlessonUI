<template>
  <div class="topTemplate page-wrapper">
    <section class="PlanPrice">
      <div class="PlanPrice__inner">
      <div class="subPosition">
      <span class="subTitle">料金プラン</span>
      </div>
      </div>
    </section>

    <div class="planTitleFront mj">体験レッスンは、<span style="color: var(--pink-dark);">100円で5日間!</span></div>
    <div class="planDes100">
      決済後、即時にメールにてアカウント情報を送信します<br>
      25分のレッスンを7回受講できます。 最終日に自動的に月額プランヘ移行されます。<br>
      7日以内に停止すると、追加料金は一切かかりません。<a class="linkS" href="https://www.bizchina.jp/help?cindex=3&qindex=7">停止手続きについて</a>
    </div>

    <div class="planTitleFront">サブスクタイプ</div>
    <div class="planDes">・初回の課金後、毎月自動更新する支払いタイプ</div>
    <!-- 学习套餐 -->
    <section class="lColorbg">
      <div class="courseContainer">
        <div
            class="courseBlock"
            v-for="(plan, pindex) in pay_plans"
            v-on="!logged ? { click: () => showRegisterModal(plan) } : {}"
            :class="{ clickable: !logged }"
        >
          <div v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0" >
            <img src="../assets/images/saleStamp.png" class="saleStamp">
          </div>
          <div v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0" class="courseStamp">
            <ul><li>初月</li><li>{{plan.first_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
          </div>
          <span class="courseTitle Colorbg">{{plan.plan_name}}</span>
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
            <li v-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0">
              <span class="orip">月額{{plan.final_amount_show}}円</span><span class="oriptax"> 税込</span>
            </li>
            <li v-else><span class="orip"></span><span class="oriptax"></span></li>
<!--            <li>1レッスン {{plan.lesson_price}}円</li>-->
          </ul>
          <div class="planBtn">
          <span v-if="logged">
            <span v-if="!studentInfo.is_corporate_member">
              <span v-if="plan.id == studentInfo.monthly_plan_id">
                <span v-if="studentInfo.subscription_id">
                  <div class="pay-desc">カード現在利用中</div>
                  <a @click="planConfirm(plan.plan_code,'',plan.learn_type)"  class="btnRed">今すぐ更新</a>
                </span>
                <span v-else-if="studentInfo?.recurring_payment_id && studentInfo?.paypal_cancel == 0">
                  <div class="pay-desc">Paypal現在利用中</div>
                  <span v-if="studentInfo.payjp_customer_id">
                    <a @click="planConfirm(plan.plan_code,'',plan.learn_type)" class="btnRed">プラン変更</a>
                  </span>
                  <span v-else>
                    <a @click="changePayjpPlanPc(plan.plan_code,'',plan.learn_type)" class="btnRed">カード決済</a>
                  </span>
                </span>
                <span v-else>
                  <div class="pay-desc">現在利用中</div>
                  <span v-if="studentInfo.payjp_customer_id">
                    <a @click="planConfirm(plan.plan_code,'',plan.learn_type)" class="btnRed">プラン変更</a>
                  </span>
                  <span v-else>
                    <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(plan.plan_code,'',plan.learn_type)" class="btnRed">Paypal決済</a>
                    <a @click="changePayjpPlanPc(plan.plan_code,'',plan.learn_type)" class="btnRed">カード決済</a>
                  </span>
                </span>
              </span>
              <span v-else>
                <span v-if="studentInfo.payjp_customer_id">
                  <a @click="planConfirm(plan.plan_code,'',plan.learn_type)" class="btnRed">プラン変更</a>
                </span>
                <span v-else>
                  <a @click="changePayjpPlanPc(plan.plan_code,'',plan.learn_type)"  class="btnRed">カード決済</a>
                  <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(plan.plan_code,'',plan.learn_type)" class="btnRed">Paypal決済</a>
                </span>
              </span>
              <div class="reservationplandes">
                1日{{plan.reservation_limit_per_day}}回まで 予約保持{{plan.reservation_limit_per_range}}回まで
              </div>
          </span>
          </span>
            <span v-else>
            <a class="btnRed" @click.stop="showRegisterModal(plan)">100円体験へ</a>
          </span>
          </div>
        </div>
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
          <span v-if="logged">
            <span v-if="!studentInfo.is_corporate_member">
                <span v-if="singlePlan.id == studentInfo.monthly_plan_id">
                  <span v-if="studentInfo.subscription_id">
                    <div class="pay-desc">カード現在利用中</div>
                    <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">今すぐ更新</a>
                  </span>
                  <span v-else-if="studentInfo?.recurring_payment_id && studentInfo?.paypal_cancel == 0">
                    <div class="pay-desc">Paypal現在利用中</div>
                    <span v-if="studentInfo.payjp_customer_id">
                      <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">プラン変更</a>
                    </span>
                    <span v-else>
                      <a @click="changePayjpPlanPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">カード決済</a>
                    </span>
                  </span>
                  <span v-else>
                    <div class="pay-desc">現在利用中</div>
                    <span v-if="studentInfo.payjp_customer_id">
                      <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">プラン変更</a>
                    </span>
                    <span v-else>
                      <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">Paypal決済</a>
                      <a @click="changePayjpPlanPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">カード決済</a>
                    </span>
                  </span>
                </span>
                <span v-else>
                <span v-if="studentInfo.payjp_customer_id">
                  <a @click="planConfirm(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">プラン変更</a>
                </span>
                <span v-else>
                  <a @click="changePayjpPlanPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">カード決済</a>
                  <a v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1" @click="changePaypalMonthPc(singlePlan.plan_code,'',singlePlan.learn_type)" class="btnRed">Paypal決済</a>
                </span>
              </span>
            </span>
          </span>
          <span v-else>
            <a href="#" class="btnRed" @click.stop="showRegisterModal(singlePlan,1)">100円体験へ</a>
          </span>
        </div>
      </div>
    </section>

    <!-- 單發 -->
    <section class="singlePosition" >

      <div class="planTitleFront">チケットタイプ</div>
      <div class="planDes">・100円体験対象外ですが、直接購入することは可能です。</div>

      <div class="singlePlan box-s" v-for="(ticket_plan) in pay_plans_ticket">

        <ul class="SinglePlanContent">
          <li>チケット</li>
          <li><span> {{ticket_plan.buy_issued_lesson_num}} </span>回</li>
          <li>有効期限<span> {{ticket_plan.validity_term}} </span>日</li>
          <li><img width="15" src="../assets/images/redarrow.png"></li>
<!--          <li><img src="../assets/images/redarrow_m.png"></li>-->
        </ul>

        <ul class="SingleAmount">
          <li>{{ticket_plan.paypal_amount_show}}</li>
          <li>税込</li>
          <li>円</li>
          <li>1レッスン {{ticket_plan.lesson_price}}円</li>
        </ul>

        <div class="SingleBtn">
          <span v-if="logged">
            <span v-if="studentInfo.is_corporate_member"></span>
            <span v-else>
              <span v-if="studentInfo.payjp_customer_id">
                <a @click="planConfirm(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="btnRed">今すぐ購入</a>
              </span>
              <span v-else>
                <span v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1">
                  <a @click="changePaypalMonthPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="btnRed">Paypal決済</a>
                </span>
                <span v-if="ticket_plan.use_paypay === 1">
                  <a @click="changePaypayPlanPc(ticket_plan)" class="btnRed">PayPay</a>
                </span>
                <a @click="changePayjpPlanPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="btnRed">カード決済</a>
              </span>
            </span>
          </span>
          <span v-else>
            <a class="btnRed2" @click="showRegisterModal(ticket_plan)">購入へ</a>
          </span>
        </div>
      </div>
    </section>
  </div>
    <payjp v-show="payjp_show" :code="selected_plans" :ptype="selected_plan_type" :umode="update_mode" :other="form"></payjp>

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
      <img class="scanImg" src="../../assets/images/paypay_qrcode.png" />
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
  <n-modal
      class="register-modal"
      v-model:show="showRegister"
      preset="card"
      :style="bodyStyle"
      :title="null"
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    <div>
      <div
          class="signup-header"
          :class="selectRegisterPlan.learn_type === 0 ? 'learn-bg' : 'speak-bg'"
      >
        <img class="fakeClose" src="../assets/images/logo_close_w.png" @click="showRegister = false">
        <div class="signup-text">
          <h2>
            <span>{{ selectRegisterPlan.plan_name }}</span>
          </h2>
          <div v-if="singleFlag === 1">
            <ul>
              <li>レッスンなし</li>
              <li>学習コンテンツ利用し放題</li>
              <li>WEB教材 ＋ 動画 ＋ 音声</li>
            </ul>
          </div>
          <div v-else>
            <ul v-if="selectRegisterPlan.learn_type === 0">
              <li>初級者から上級者まで</li>
              <li>講師が日本語で対応可</li>
            </ul>
            <ul v-else>
              <li>オール中国語（日本語不可）</li>
              <li>会話に特化（文法の解説なし）</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="rp-section" v-if="selectRegisterType === 'trial'">
        <!-- row 1 -->
        <div class="rp-row">
          <div class="rp-dot-wrap">
            <div class="rp-dot filled"></div>
          </div>
          <div class="rp-info">
            <div class="rp-title">体験料金</div>
            <div class="rp-note">（本日から{{nextWeek}}まで、7日間）</div>
          </div>
          <div class="rp-price"><span class="largeF">100</span><span>円</span></div>
        </div>

        <!-- row 2 -->
        <div class="rp-row">
          <div class="rp-dot-wrap">
            <div class="rp-dot"></div>
          </div>
          <div class="rp-info">
            <div class="rp-title">7日後の正規プラン料金</div>
          </div>
          <div class="rp-price">{{ selectRegisterPlan.paypal_amount_show }}<span>円</span></div>
        </div>
      </div>


      <div class="rp-section" v-else>
        <div class="rp-row">
          <div class="rp-info">
            <div class="rp-title">支払い金額（税込）</div>
            <div class="rp-note">※都度購入タイプのため、自動更新はされません。</div>
          </div>
          <div class="rp-price"><span class="largeF">{{ selectRegisterPlan.paypal_amount_show }}</span><span>円</span></div>
        </div>
      </div>


      <n-form class="rp-form" ref="formRef" :model="form" :rules="rules" show-require-mark="right-hanging" size="large">
          <ul class="nameDiv">
            <li>
              <div class="form-lable-custom">苗字<span>必須</span></div>
              <n-form-item :show-label="false" path="last_name">
                <n-input class="SignInput" clearable v-model:value="form.last_name" placeholder="田中" />
              </n-form-item>
            </li>
            <li>
              <div class="form-lable-custom">名前<span>必須</span></div>
              <n-form-item :show-label="false" path="first_name">
                <n-input class="SignInput" clearable v-model:value="form.first_name" placeholder="太郎" />
              </n-form-item>
            </li>
          </ul>
          <div class="form-lable-custom">メールアドレスで会員登録<span>必須</span><br/></div>
          <n-form-item :show-label="false" path="email">
            <n-input class="SignInput" clearable v-model:value="form.email" placeholder="sample@mail.com" />
          </n-form-item>
        <n-button
            class="rp-submit-btn"
            type="submit"
            @click="onSubmit"
            :loading="loading"
            v-if="selectRegisterType === 'trial'">
          100円支払いへ
        </n-button>
        <n-button
            class="rp-submit-btn"
            type="submit"
            @click="onSubmit"
            :loading="loading"
            v-else>
          支払いへ
        </n-button>
        </n-form>


    </div>
  </n-modal>
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
let bodyStyle = {
  width: '520px'
};
let segmented = {
  content: 'soft',
  footer: 'soft'
};
let selectPaypayPlan = ref(null);
let showPaypay = ref(false);
let timer1;
let countdownEnd;
let selectRegisterPlan = ref(null);
let showRegister = ref(false);
const formRef = ref(null)
const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  registerType: "single"
})

//scroll
const learnSection = ref(null);
const speakSection = ref(null);

const scrollTo = (target) => {
  let el = null;

  if (target === 'learn') {
    el = learnSection.value;
  } else if (target === 'speak') {
    el = speakSection.value;
  }

  if (el) {
    const offset = 80; // 如果有固定 header，就加個偏移量
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};

const rules = computed(() => {
  let r = {
    first_name: [{
      required: true,
      type: 'string',
      max: 32,
      message: "名前を入力してください",
      trigger: "blur"
    }],
    last_name: [{
      required: true,
      type: 'string',
      max: 32,
      message: "苗字を入力してください",
      trigger: "blur"
    }],
    email: [{
      required: true,
      type: "email",
      max: 250,
      message: "メールアドレスを入力してください",
      trigger: "blur"
    }],
  }

  return r
});

let nextWeek = ref('');
let dtitle = ref('');
let dcontent = ref('');
let singlePlan = ref([]);
let singleFlag = ref(0);

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
    singlePlan.value = planinfo?.value.single_plan ?? [];

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
  getDate();
});

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

const onSubmit3 = () => {
  selected_plans.value = selectRegisterPlan.value.plan_code;
  selected_plan_type.value = selectRegisterPlan.value.type;

  showRegister.value = false;
  payjp_show.value = true;
  // message.success("登録に成功しました")

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
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true;

    let {
      data,
      error
    } = await useRegApi(form)
    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value?.err == false) {
      selected_plans.value = selectRegisterPlan.value.plan_code;


      showRegister.value = false;
      payjp_show.value = true;
      // message.success("登録に成功しました")

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

    } else {
      let return_errors = data.value.errors;
      if (return_errors) {
        Object.keys(return_errors).forEach(key=>{
          message.error(return_errors[key][0]);
        })
        return;
      }
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })
}

const selectRegisterType = ref(''); // 'trial' or 'ticket'
function showRegisterModal(plan,flag = 0) {
  selectRegisterPlan.value = plan;
  showRegister.value = true;
  singleFlag.value = flag;

  if (
      pay_plans_ticket.value.includes(plan) ||
      talk_pay_plans_ticket.value.includes(plan)
  ) {
    selectRegisterType.value = 'ticket';
  } else {
    selectRegisterType.value = 'trial';
  }
}

function getDate() {
  // 获取当前日期
  const now = new Date();

  // 计算7天后的日期
  const nextWeekDate = new Date();
  nextWeekDate.setDate(now.getDate() + 6);
  // 获取日（1-31）
  const day = nextWeekDate.getDate();

// 获取月（0-11，需要+1才是实际月份）
  const month = nextWeekDate.getMonth() + 1;

  nextWeek.value = month+'月'+day+'日';
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





<style scoped>

.pay-desc{
  top: 48px;
}

.planbg{
  padding-bottom: 30px;
}
.fakeClose{
  position: absolute;
  top: -48px;
  width: 60px;
  right: -16px;
  cursor: pointer;
}
.planDes100{margin: 10px auto; width: 800px; line-height: 26px; font-size: 15px; text-align: center;}

.rp-submit-btn {
  display: block;
  margin: 0 auto 36px auto;
  background-color: #d32f2f !important;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  height: 48px;
  padding: 0 40px;
  border-radius: 999px;
  text-align: center;
  box-shadow: none;
  border: none;
}

/* 避免 Naive 預設 hover 色調影響 */
.rp-submit-btn:hover {
  background-color: #b71c1c !important;
  color: #FFFFFF !important;
}


/* loading 時避免背景變灰 */
.rp-submit-btn.n-button--loading {
  background-color: #d32f2f !important;
}

.rp-form {
  padding: 0 40px;
}
/* 外層橫排 */
.nameDiv {
  display: flex;
  gap: 16px;
}

/* 每個欄位 li 一半寬 */
.nameDiv li {
  flex: 1;
}

/* label 樣式 */
.form-lable-custom {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.form-lable-custom span {
  color: #d32f2f;
  font-size: 13px;
}

/* input 框統一高度 */
.SignInput {
  height: 40px;
  font-size: 14px;
}

/* 下方 email 欄位 spacing */
.n-form-item + .form-lable-custom {
  margin-top: 16px;
}

.rp-section {
  margin-bottom: 24px;
  position: relative; /* 🌟 讓線的高度只限制在這區塊 */
  padding: 0 40px;
  margin-top: 20px;
}

.rp-dot-wrap {
  position: relative;
  display: flex;
  justify-content: center;
}

.rp-dot.filled::after {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 54px; /* ✅ 控制線長度 */
  border-left: 2px dotted black;
  z-index: 0;
}

.rp-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.rp-dot {
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  border: 2px solid black;
  background-color: white;
}

.rp-dot.filled {
  background-color: black;
}

/* 中間資訊 */
.rp-info {
  display: flex;
  flex-direction: column;
}

.rp-title {
  font-weight: bold;
  font-size: 17px;
  color: #222;
}

.rp-note {
  font-size: 11px;
  color: #666;
}

/* 右側金額 */
.rp-price {
  margin-left: auto;
  font-weight: bold;
  font-size: 20px;
  color: #b71c1c;
}
.rp-price .largeF{
  font-size: 36px;
}

.rp-price span {
  font-size: 14px;
  margin-left: 2px;
}

.register-modal{
  width: 520px;
}
.signup-header {
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  background-size: 90%;
  background-position: right;
  background-repeat: no-repeat;
  box-sizing: border-box;
}

/* 背景圖片切換 */
.learn-bg {
  background-image: url('../assets/images/signup_learn.png');
}

.speak-bg {
  background-image: url('../assets/images/signup_speak.png');
}

/* 左側文字內容區 */
.signup-text {
  max-width: 60%;
}

.signup-text h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 4px;
  color: var(--pink-dark); /* 學習預設橘色 */
}

.speak-bg .signup-text h2 {
  color: #12794b; /* 會話改為綠色 */
}

.signup-text ul {
  padding-left: 18px;
  font-size: 14px;
  margin: 0;
}

.signup-text ul li {
  list-style-type: disc;
  color: #333;
  font-size: 13px;
  font-weight: bold;
}

/* 會話的 li 改為紅字 */
.speak-bg .signup-text ul li {
  color: #d32f2f;
}

.planBtn{
  text-align: center;
}
.Pricelist .btnRed{display: inline-block; margin:10px auto 8px auto; font-size: 13px;}

.courseContainer {
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  width: 1130px;
  margin: auto;
}
.lColorbg .courseBlock {
  position: relative;
  width: 31.6%;
  padding-bottom: 1%;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  background-color: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.sColorbg .courseBlock {
  position: relative;
  width: 31.6%;
  padding-bottom: 1%;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  background-color: #ffffff;
  border-radius: 12px;
  border:3px solid #424242; /* 會話用綠色 */
  box-sizing: border-box;
}
.lColorbg .courseBlock.clickable:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.2); /* 加陰影 */
}
.sColorbg .courseBlock.clickable:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.2); /* 加陰影 */
}

.courseBlock.clickable:hover .btnRed {
  background-color: #b71c1c; /* 和你原本的 hover 顏色一樣 */
  color: #ffffff;
  transform: scale(1.1);
}

@media screen and (max-width: 520px) {
  .singlePosition{
    width: 90%;
    margin: auto;
  }
  .rp-price{
    white-space: nowrap;
  }
  .box-s {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
  }
  .planDes100 {
    width: 90%;
    font-size: 14px;
    line-height: 24px;
    margin: 10px auto;
    text-align: center;
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
    background-color: var(--pink-dark);
  }
  .courseContainer {
    flex-direction: column;
    padding: 20px;
    border-radius: 0 0 8px 8px;
    width: 100%;
  }

  .planBtn{
    height: fit-content;
  }
  .singlePlan{
    display: block;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  }
  .SinglePlanContent{
    width: 100%;
    display: block;
  }
  .SingleBtn{
    display: block;
  }
  .btnRed2{
    margin:4% auto;
    width: 60%;
  }
  .SinglePlanContent li:nth-child(1){
    height: auto;
    width: 60%;
    font-size: 16px;
    line-height: 1;
  }
  .singlePosition{
    margin-bottom: 0;
  }
  .mj{
    width: 80%;
    line-height: 1.4;
  }
  .courseContentTitle{
    font-size: 22px;
  }
  .courseBanner{
    margin: 0;
  }
  .learn-bg{
    background-size: cover;
  }
  .speak-bg{
    background-size: cover;
  }
  .rp-form{
    text-align: left;
  }
  .register-modal {
    width: 95% !important;
  }
  .signup-text ul li{
    font-size: 11px;
    line-height: normal;
  }
  .btnRed{
    display: block;
    margin: 16px auto !important;
    transform: scale(1.1) !important;
    min-width: 130px !important;
    font-size: 15px !important;
  }
  .Pricelist .btnRed{display: block; margin: 10px auto;}

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