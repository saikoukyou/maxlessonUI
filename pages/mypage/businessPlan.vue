<template>
<div class="mypageTemplate blockW" v-if="pay_plans.length > 0 || talk_pay_plans.length > 0">

  <div class="PricelistChild">
    <span class="businessTitle">サブスクプラン</span>
    <span class="businessTitle2">・初回の課金後、毎月自動更新する支払いタイプ</span>
    <div>
      <div v-if="pay_plans.length" class="lColor">
        <span class="learnTitle">▍総合コース</span>
        <span class="learnDes">・中国語を学習したい方　・体系的に習得したい方　・文法/会話/ビジネス/HSK等</span>
      </div>
      <div class="courseBlock" v-for="(plan) in pay_plans">
        <span class="courseTitle lColorbg">{{plan.plan_name}}</span>
        <ul class="courseContent">
          <li v-if="plan.first_month_off === 1 || plan.every_month_off === 1">
            <span class="orip">月額{{plan.final_amount}}円</span><span class="oriptax"> 税込</span>
          </li>
          <li v-else></li>
          <li class="salePrice">月額
            <span class="amount">{{plan.paypal_amount}}</span>円<span class="littleTax">税込</span>
          </li>
          <li>1レッスン {{plan.lesson_price}}円</li>
        </ul>
        <div v-if="studentInfo.is_corporate_member">
          <span v-if="studentInfo.corporate_member_payment_method === 0 && studentInfo.contract_status === 'Trial'">
            <a @click="businessMonthPlanConfirm(plan.id,'',plan.learn_type)" class="buttonCVtrial">申し込む</a>
          </span>
          <span v-else>
            <span v-if="plan.id == studentInfo.monthly_plan_id">
              <span v-if="studentInfo.subscription_id">
                <div class="pay-desc">カード現在利用中</div>
                <a @click="planConfirm(plan.plan_code,'',plan.learn_type)" class="buttonCVtrial">今すぐ更新</a>
              </span>
              <span v-else-if="studentInfo.recurring_payment_id && studentInfo.paypal_cancel == 0">
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
          </span>
        </div>
      </div>




    </div>
  </div>

  <div class="PricelistChild">
    <div>
      <div v-if="talk_pay_plans.length" class="sColor">
        <span class="learnTitle">▍会話コース</span>
        <span class="learnDes">・中国語の会話を楽しみたい方　・特に文法指導は不要な方　・トピック会話/フリートーク等</span>
      </div>
      <div class="courseBlock" v-for="(tplan) in talk_pay_plans">
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
        <div v-if="studentInfo.is_corporate_member">
                <span v-if="studentInfo.corporate_member_payment_method === 0 && studentInfo.contract_status === 'Trial'">
                  <a @click="businessMonthPlanConfirm(tplan.id,'',tplan.learn_type)" class="buttonCVtrial">申し込む</a>
                </span>
          <span v-else>
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
                </span>
        </div>
      </div>
    </div>
  </div>

</div>

  <div class="blockW" v-if="pay_plans_ticket.length > 0 || talk_pay_plans_ticket.length > 0">
    <div>
      <span class="businessTitle">チケットタイプ</span>
      <span class="businessTitle2">・都度購入で自動更新されないタイプ</span>
    <div class="PricelistChild_add" v-for="(ticket_plan) in pay_plans_ticket">
      <div class="ticketname">{{ticket_plan.plan_name}}</div>
      <div class="singlePlan">
        <ul class="SinglePlanContent">
          <li class="lColorbg">総合コース</li>
          <li><span>{{ticket_plan.buy_issued_lesson_num}}</span>回</li>
          <li>有効期限<span>{{ticket_plan.validity_term}}</span>日</li>
          <li><img width="15" src="../../assets/images/redarrow.png"></li>
<!--          <li><img src="../../assets/images/redarrow_m.png"></li>-->
        </ul>

        <ul class="SingleAmount">
          <li>{{ticket_plan.paypal_amount.toLocaleString()}}</li>
          <li>税込</li>
          <li>円</li>
          <li>1レッスン {{ticket_plan.lesson_price}}円</li>
        </ul>
        <div v-if="studentInfo.is_corporate_member">
          <!--          <span v-if="studentInfo.corporate_member_payment_method === 0">-->
          <!--            <a @click="businessPlanConfirm(ticket_plan.id,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">申し込む</a>-->
          <!--          </span>-->
          <!--          <span v-else>-->
          <span v-if="studentInfo.payjp_customer_id">
              <a @click="planConfirm(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">今すぐ購入</a>
            </span>
          <span v-else>
              <span v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1">
                <a @click="changePaypalMonthPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
              </span>
              <a @click="changePayjpPlanPc(ticket_plan.plan_code,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">カード決済</a>
            </span>
        </div>
      </div>



    </div>
    </div>
<!--    <p class="description">{{plans_footer_des}}</p>-->

    <div>
      <div class="PricelistChild_add" v-for="(tticket_plan) in talk_pay_plans_ticket">
        <div class="ticketname">{{tticket_plan.plan_name}}</div>
        <div class="singlePlan">
          <ul class="SinglePlanContent">
            <li class="sColorbg">会話コース</li>
            <li><span>{{tticket_plan.buy_issued_lesson_num}}</span>回</li>
            <li>有効期限<span>{{tticket_plan.validity_term}}</span>日</li>
            <li><img width="15" src="../../assets/images/redarrow.png"></li>
<!--            <li><img src="../../assets/images/redarrow_m.png"></li>-->
          </ul>

          <ul class="SingleAmount">
            <li>{{tticket_plan.paypal_amount}}</li>
            <li>税込</li>
            <li>円</li>
            <li>1レッスン {{tticket_plan.lesson_price}}円</li>
          </ul>
          <div v-if="studentInfo.is_corporate_member">
            <!--            <span v-if="studentInfo.corporate_member_payment_method === 0">-->
            <!--              <a @click="businessPlanConfirm(ticket_plan.id,'ticket',ticket_plan.learn_type)" class="buttonCVtrial">领取</a>-->
            <!--            </span>-->
            <!--            <span v-else>-->
            <span v-if="studentInfo.payjp_customer_id">
                  <a @click="planConfirm(tticket_plan.plan_code,'ticket',tticket_plan.learn_type)" class="buttonCVtrial">今すぐ購入</a>
                </span>
            <span v-else>
                  <span v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1">
                    <a @click="changePaypalMonthPc(tticket_plan.plan_code,'ticket',tticket_plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
                  </span>
                  <a @click="changePayjpPlanPc(tticket_plan.plan_code,'ticket',tticket_plan.learn_type)" class="buttonCVtrial">カード決済</a>
                </span>
          </div>
        </div>
        <div>

<!--          </span>-->
        </div>
      </div>
    </div>

<!--    <p class="description">{{plans_footer_des}}</p>-->

</div>

  <payjp v-show="payjp_show" :code="selected_plans" :ptype="selected_plan_type" :umode="update_mode"></payjp>
    
</template>

<script setup>

import {
  useBusinessStudentChangeMonthPlanPayjpApi,
  useStudentChangeMonthPlanPayjpApi,
  useStudentChangeTicketPlanPayjpApi, useStudentPaypalPayApi,
  useStudentPlanListDataApi
} from "~/apis/plan";
  import {createDiscreteApi} from "naive-ui";
  import {ref} from "vue";
import {useMainStore} from "~/composables/store";

  let studentInfo = ref({});
  const pay_plans = ref([]);
  const pay_plans_ticket = ref([]);
  const plans_footer_des = ref('');
  let selected_plans = ref('');
  let selected_plan_type = ref('');
  let payjp_show = ref(false);
  let payjp_card_brand = ref('');
  let payjp_card_last4 = ref('');
  const talk_pay_plans = ref([]);
  const talk_pay_plans_ticket = ref([]);
  let timer = ref(3);
  let update_mode = ref('');
  let use_paypal = ref(0);
  const useStore = useMainStore();
  const monthlyLearnType = useStore.monthly_learn_type;
  const contractStatus = useStore.contract_status;
  let dtitle = ref('');
  let dcontent = ref('');

  const getPlans = async () => {
    const {pending, data: planinfo  } = await useStudentPlanListDataApi();
    if (planinfo?.value) {
      pay_plans.value = planinfo?.value?.pay_plans ?? [];
      pay_plans_ticket.value = planinfo?.value?.pay_plans_ticket ?? [];
      plans_footer_des.value = planinfo?.value?.plans_footer_des ?? '';
      studentInfo.value = planinfo?.value?.student_info ?? {};
      payjp_card_brand.value = studentInfo.value.payjp_card_brand ?? '';
      payjp_card_last4.value = studentInfo.value.payjp_card_last4 ?? '';
      talk_pay_plans.value = planinfo?.value?.talk_pay_plans ?? [];
      talk_pay_plans_ticket.value = planinfo?.value?.talk_pay_plans_ticket ?? [];
      update_mode.value = studentInfo?.value?.monthly_plan_id ? 'update' : 'add';
      use_paypal.value = planinfo?.value.use_paypal ?? 0;

      // 排序：從金額小到大
      pay_plans_ticket.value.sort((a, b) => a.paypal_amount - b.paypal_amount);
      talk_pay_plans_ticket.value.sort((a, b) => a.paypal_amount - b.paypal_amount);

    }
  }
  getPlans();

    function planConfirm(plan_code,type='',learnType) {
      getDes(type,learnType);
      const { dialog } = createDiscreteApi(["dialog"]);
      if (type !== 'ticket' && contractStatus === 'Regular' && monthlyLearnType !== learnType) {
        dialog.warning({
          title: "プランの購入",
          content: "ご購入で間違いないでしょうか。※購入後、旧プランの数量はリセットされます",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onNegativeClick: async () => {

          },
          onPositiveClick: async () => {
            dialog.warning({
              title: "プランの購入",
              content: "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
              positiveText: "はい、購入する",
              negativeText: "いいえ、キャンセル",
              onPositiveClick: async () => {
                const {pending, error, data: changedata  } = type == 'ticket' ? await useStudentChangeTicketPlanPayjpApi(plan_code) : await useStudentChangeMonthPlanPayjpApi(plan_code);
                if (changedata?.value && changedata.value.err == false) {
                  useStore.useRefreshUserInfo();
                  useStore.setActiveUrl("/mypage/mypageReserved");
                  return navigateTo("/mypage/mypageReserved", { replace: true });
                }
              },
            });
          }
        });
      } else {
        dialog.warning({
          title: useStore?.studentInfo?.contract_status === 'Trial' ? dtitle.value : "プランの購入",
          content: useStore?.studentInfo?.contract_status === 'Trial' ? dcontent.value : "ご購入で間違いないでしょうか。※"+payjp_card_brand.value+"下4桁"+payjp_card_last4.value+"のカードが使われます",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onPositiveClick: async () => {
            const {pending, error, data: changedata  } = type == 'ticket' ? await useStudentChangeTicketPlanPayjpApi(plan_code) : await useStudentChangeMonthPlanPayjpApi(plan_code);
            if (changedata?.value && changedata.value.err == false) {
              useStore.useRefreshUserInfo();
              useStore.setActiveUrl("/mypage/mypageReserved");
              return navigateTo("/mypage/mypageReserved", { replace: true });
            }
          },
        });
      }
    }
    function changePayjpPlanPc(plan_code,type='',learnType) {
      const { dialog } = createDiscreteApi(["dialog"]);
      if (type !== 'ticket' && contractStatus === 'Regular' && monthlyLearnType !== learnType) {
        dialog.warning({
          title: "プランの購入",
          content: "ご購入で間違いないでしょうか。※購入後、旧プランの数量はリセットされます",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onNegativeClick: async () => {

          },
          onPositiveClick: async () => {
            selected_plans.value = plan_code;
            selected_plan_type.value = type;
            payjp_show.value = true;
            let payjpCheckBox = document.getElementById('payjp_checkout_box');
            if (payjpCheckBox != null) {
              payjpCheckBox.children[0].click();
            } else {
              payjp_show.value = false;
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
          },
        });
      } else {
        selected_plans.value = plan_code;
        selected_plan_type.value = type;
        payjp_show.value = true;
        let payjpCheckBox = document.getElementById('payjp_checkout_box');
        if (payjpCheckBox != null) {
          payjpCheckBox.children[0].click();
        } else {
          payjp_show.value = false;
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
      }

    }

    async function changePaypalMonthPc(plan_code,type='',learnType) {
      const { dialog } = createDiscreteApi(["dialog"]);
      if (type !== 'ticket' && contractStatus === 'Regular' && monthlyLearnType !== learnType) {
        dialog.warning({
          title: "プランの購入",
          content: "ご購入で間違いないでしょうか。※購入後、旧プランの数量はリセットされます",
          positiveText: "はい、購入する",
          negativeText: "いいえ、キャンセル",
          onNegativeClick: async () => {

          },
          onPositiveClick: async () => {
            const {pending, error, data: paydata  } = await useStudentPaypalPayApi(plan_code);

            if (paydata?.value && paydata.value.err === false) {
              useStore.useRefreshUserInfo();
              window.location.href = paydata?.value.url;
              // console.log('changePaypalMonthPc:', JSON.stringify(paydata));
            }
          }
        });
      } else {
        const {pending, error, data: paydata  } = await useStudentPaypalPayApi(plan_code);

        if (paydata?.value && paydata.value.err === false) {
          window.location.href = paydata?.value.url;
        }
      }

    }

  function businessMonthPlanConfirm(plan_id,type='',learnType) {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.warning({
      title: "プランの購入",
      content: "ご購入で間違いないでしょうか。※購入後、旧プランの数量はリセットされます",
      positiveText: "はい、購入する",
      negativeText: "いいえ、キャンセル",
      onNegativeClick: async () => {

      },
      onPositiveClick: async () => {
        const form = {'student_id' : studentInfo.value.id,'plan_id' : plan_id};
        const {pending, error, data: changedata  } = await useBusinessStudentChangeMonthPlanPayjpApi(form);
        if (changedata?.value && changedata.value.err === false) {
          useStore.useRefreshUserInfo();
          useStore.setActiveUrl("/mypage/mypageReserved");
          return navigateTo("/mypage/mypageReserved", { replace: true });
        }
      }
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

<style scoped>
.ticketname{
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fdf6f0;
  padding: 8px 12px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  border-radius: 4px;
}
.PricelistChild_add{
  border: 1px solid #f4f4f4;
  padding-top: 20px;
  margin: 20px 0 30px 0;
  position: relative;
  text-align: left;
}
.PricelistChild{
  border: 0;
}
.courseBlock{
  height: auto;
  padding-bottom: 10px;
  border: 1px solid #DDDDDD;
  border-radius: 12px;
  margin: -1% 1% 3% 1%;
  transform: scale(0.9);
  width: 48%;
  display: inline-block;
}
.singlePlan{
  width: 100%;
  transform: scale(0.88);
  border-radius: 8px;
  height: auto;
  padding-bottom: 10px;
  margin-left: -36px;
  margin-top: 4px;
  background: none;
  position: relative;
}
.SinglePlanContent li:nth-child(1){
  min-width: 122px;
  line-height: 30px;
  text-align: center;
}
.SinglePlanContent li:nth-child(2){
  width: 80px !important;
}
.SinglePlanContent li:nth-child(3){
  width: 160px;
}
.singlePlan div{
}
.buttonCVtrial{
  width: 120px;
  cursor: pointer;
  margin: 10px auto;
}

.SinglePlanContent li:nth-child(2){
  width: 12%;
  margin-left: 3%;
}
.SinglePlanContent li:nth-child(2) span{
  font-size: 44px;
}
.SinglePlanContent li:nth-child(4){
  margin-left: 5%;
}
.SinglePlanContent li:nth-child(3) span{
  font-size: 44px;
}
.SingleAmount{
  width: 150px;
  margin-right: 50px;
}
.SingleAmount li:nth-child(1){
  font-size: 44px;
}
.businessTitle{
  font-size: 24px;
  text-align: center;
  display: block;
  font-weight: bold;
}
.businessTitle2{
  font-size: 14px;
  text-align: center;
  display: block;
  margin-top: 8px;
}
.sColor{
  text-align: left;
  margin-top: 10px;
}
.lColor{
  text-align: left;
  margin-top: 10px;
}
.learnTitle{
  font-size: 22px;
}
.learnDes{
  font-size: 14px;
}
.SingleAmount li:nth-child(2){
  top: 15px;
}
.SingleAmount li:nth-child(3){
  top: 30px;
}
.SingleAmount li:nth-child(4){
  margin-top: 3px;
  width: 140px;
}
@media screen and (max-width: 520px) {
  .SingleAmount{
    width: auto;
  }
  .SingleAmount{
    margin-right: auto;
  }
  .SingleAmount li:nth-child(4){
    width: auto !important;
    text-align: center;
  }
  .PricelistChild{
    margin-bottom: 0;
  }
  .SinglePlanContent{
    display: block;
    text-align: center;
  }
  .SinglePlanContent li:nth-child(3){
    width: auto;
  }
  .singlePlan{
    display: block;
    margin: auto;
  }
  .SinglePlanContent li:nth-child(2) span{
    font-size: 34px;
  }
  .SinglePlanContent li:nth-child(3) span{
    font-size: 34px;
  }
  .SingleAmount li:nth-child(1){
    font-size:54px;
  }
  .businessTitle{
    margin-top: 10px;
    margin-bottom: 0;
  }
  .singlePlan{
    margin-top: 0;
  }
  .courseBlock{
    width: 100% ;
    display: block;
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
  font-size: 15px;
  line-height: 20px;
  padding: 2% 8%;
  position: relative;
  order: 1;
  margin: auto;
  display: block;
  --n-border: 0 !important;
  --n-border-hover: 0 !important;
  --n-color:#FA8373 !important;
  --n-color-hover:#FA8373 !important;
  --n-color-pressed:#FA8373 !important;
  --n-color-focus:#FA8373 !important;
  --n-color-disabled:#FA8373 !important;
  --n-ripple-color:#FA8373 !important;
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




    