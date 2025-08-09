<template>

    <div class="netchina_contents">

      <div v-if="show_form" class="userInfoContents blockW">
        <p class="headline">特別受講プラン</p>
        <span class="des">
          特別受講プランのコードを入力し、確定を押したら、プランが表示されます。お申し込みの場合、購入するボタンをクリックしてください。
        </span>
        <n-form class="codeBlock"  ref="formRef" :model="form" :rules="rules" size="small">
          <n-form-item :show-label="false" path="code">
            <label class="title" for="">コード入力：</label>
            <n-input type="text" v-model:value="form.code" clearable placeholder=""></n-input>
          </n-form-item>

          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span>確定</span>
          </n-button>

        </n-form>
      </div>

      <div v-if="show_info" class="blockW">
        <p class="headline">特別受講プラン</p>
        <span class="des">
         お申し込みの場合、購入するボタンをクリックしてください。
        </span>
        <hr style="margin-top: 30px;">

        <div v-if="plan.use_ticket === 0" class="PricelistWrap">

          <div class="PricelistChild" style="position: relative;">
            <div v-if="plan.every_month_off == 1 && plan.every_month_off_rate != 0" class="courseStamp">
              <ul><li>ずっと</li><li>{{plan.every_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
            </div>
            <div v-else-if="plan.first_month_off == 1 && plan.first_month_off_rate != 0" class="courseStamp">
              <ul><li>初月</li><li>{{plan.first_month_off_rate*100}}</li><li>%</li><li>OFF</li></ul>
            </div>
            <h4 class="sColorbg">{{plan.plan_name}}</h4>
            <div class="month-plan-main">
              <div class="month-plan-sub-r">
                <div class="month-plan-sub-r-child">
                  <span class="monthFont">月額</span>
                  <div class="month-plan-sub-r-child-l">{{plan.paypal_amount}}</div>
                  <div class="month-plan-sub-r-child-r">
                    <span class="font-size-11 font-weight-700">税込</span><br>
                    <span>円</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span v-if="!studentInfo.is_corporate_member">
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
        <div v-else class="Pricelist bgnone">
          <div class="singlePlan">
            <ul class="houul">
              <div class="triangle-label"></div>
              <li class="hou1">{{plan.plan_name}}</li>
              <li class="hou2">
                有効期限{{plan.validity_term}}
                <span v-if="plan.validity_term_unit == 'y'">ヶ月間</span>
                <span v-if="plan.validity_term_unit == 'm'">ヶ年間</span>
                <span v-else>日間</span>
              </li>
              <li class="hou3">総レッスン数 <span class="bigF">{{plan.buy_issued_lesson_num}}</span> 回
                <span class="bottomWord">（1日予約上限{{plan.reservation_limit_per_day}}回）</span></li>
              <li class="hou4"><img src="../../assets/images/redarrow.png" width="12"/></li>
              <li class="hou5"><img src="../../assets/images/redarrow_m.png" width="20"/></li>
              <li class="hou6"><span class="bigF">{{plan.paypal_amount}}</span><span style="position: relative;"><span class="fonttax">税込</span>円</span>
<!--                <span class="bottomWord">（{{plan.final_amount}}円税込み）</span>-->
              </li>
            </ul>
          </div>

            <div class="PricelistChild_add">
                <span v-if="studentInfo.is_corporate_member"></span>
                <span v-else>
            <span v-if="studentInfo.payjp_customer_id">
              <a @click="planConfirm(plan.plan_code,'ticket',plan.learn_type)" class="buttonCVtrial">今すぐ購入</a>
            </span>
            <span v-else>
              <span v-if="studentInfo.paypal_cancel == 0 && use_paypal === 1">
                <a @click="changePaypalMonthPc(plan.plan_code,'ticket',plan.learn_type)" class="buttonCVtrial">Paypal決済</a>
              </span>
              <a @click="changePayjpPlanPc(plan.plan_code,'ticket',plan.learn_type)" class="buttonCVtrial">カード決済</a>
            </span>
          </span>
            </div>

        </div>

        <payjp v-show="payjp_show" :code="selected_plans" :ptype="selected_plan_type" :umode="update_mode"></payjp>

      </div>
    </div>


</template>


<script setup>

import {
  useGetPlanInfoByCodeApi,
} from "~/apis/student";
 import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio} from "naive-ui";
import {
  useStudentChangeMonthPlanPayjpApi,
  useStudentChangeTicketPlanPayjpApi,
  useStudentPaypalPayApi
} from "~/apis/plan";
import {ref} from "vue";
import {useMainStore} from "~/composables/store";

 //加载效果
 const loading = ref(false)
 const formRef = ref(null)
const form = reactive({
  code:""
})

const rules = computed(() => {
  let r = {
    code: [{
      required: true,
      message: "コードを入力してください",
      trigger: "blur"
    }],
  }

  return r
});

let plan = ref(null);
let show_form = ref(true);
let show_info = ref(false);
let studentInfo = ref([]);
let selected_plans = ref('');
let selected_plan_type = ref('');
let payjp_show = ref(false);
let payjp_card_brand = ref('');
let payjp_card_last4 = ref('');
let timer = ref(3);
let update_mode = ref('');
let use_paypal = ref(0);
const useStore = useMainStore();
const monthlyLearnType = useStore.monthly_learn_type;
const contractStatus = useStore.contract_status;

onMounted(async () => {

});

 const onSubmit = () => {
   formRef.value.validate(async (errors) => {
     if (errors) return;

     loading.value = true

     let {
       data,
       error
     } = await useGetPlanInfoByCodeApi(form.code)

     loading.value = false

     const { message } = createDiscreteApi(["message"])
     if (data?.value && data?.value?.err == false) {
       plan.value = data?.value?.info ?? [];
       studentInfo.value = data?.value?.sinfo ?? [];
       show_form.value = false;
       show_info.value = true;
     } else {
       return message.error(data?.value?.err_msg || 'サービス側エラー');
     }

   })
 }

 useEnterEvent(() => onSubmit())

function planConfirm(plan_code,type='',learnType) {
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
        // console.log('payjpCheckBox:'+payjpCheckBox);
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
              // console.log(timer)
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
    // console.log('payjpCheckBox:'+payjpCheckBox);
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
      content: "ご購入で間違いないでしょうか。※購入後、旧プランの数量はリセットされます",
      positiveText: "はい、購入する",
      negativeText: "いいえ、キャンセル",
      onNegativeClick: async () => {

      },
      onPositiveClick: async () => {
        // console.log('paypal支付');//调用后台api
        const {pending, error, data: paydata  } = await useStudentPaypalPayApi(plan_code);

        if (paydata?.value && paydata.value.err === false) {
          useStore.useRefreshUserInfo();
          window.location.href = paydata?.value.url;
          console.log('changePaypalMonthPc:', JSON.stringify(paydata));
        }
      }
    });
  } else {
    // console.log('paypal支付');//调用后台api
    const {pending, error, data: paydata  } = await useStudentPaypalPayApi(plan_code);

    if (paydata?.value && paydata.value.err === false) {
      useStore.useRefreshUserInfo();
      window.location.href = paydata?.value.url;
      // console.log('changePaypalMonthPc:', JSON.stringify(paydata));
    }
  }

}
</script>
<style lang="scss" scoped>
label.title{
  width: 110px;
}
.n-input:not(.n-input--autosize) {
  width: 100%;
}
.n-select {
  width: 30%;
}
.codeBlock{
  background-color: #F4F4F4;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}
.codeBlock{
  position: relative;
}
.Submit{
  width: 90px;
  height: 36px;
  font-size: 16px;
  border-radius: 4px;
  position: absolute;
  top: 26px;
  right: 30px;
  box-shadow: 0 0 0;
}
.Pricelist{
  width: auto;
}
.PricelistChild{
  height: fit-content;
  padding-bottom: 20px;
}
.courseStamp{
  transform: scale(0.75);
  z-index: 999;
  top: -6px;
  right: -22px;
}
h4{
  font-size: 19px;
}
.sColor{
  margin-top: 10px;
}
.singlePlan{
  width: auto;
  height: auto;
  margin: auto;
}
.SinglePlanContent li:nth-child(1){
  width: auto;
  padding: 0 10px;
}
.form-lable-custom span{
  color: #d03050;
  font-size: 12px;
  margin-left: 3px;
}
.bottomWord{
  position: absolute;
  font-size: 11px;
  bottom: -2px;
  display: block;
  width: 100%;
  text-align: center;
}

.houul li{
  display: flex;
  align-items: center;
  justify-content: center;
}

.houul{display: flex; position: relative; background-color: #FFF9EC; margin: 10px 0; font-weight: bold; width: 100%; text-align: center; font-size: 15px; padding: 10px 10px 20px 10px;}
.houul li.hou1{padding: 10px 2%; border-radius: 8px; border: 1px solid #3476E0; margin-left: 8px; background-color:#F5F8FD;  color: #3476E0; width: fit-content; min-width: fit-content;}
.houul li.hou2{font-size: 16px; width: 22%; color: #3476E0; }
.houul li.hou3{position:relative; width: 23%; color: #3476E0;}
.houul li.hou4{text-align: center; margin: 0 3%;}
.houul li.hou5{display: none;}
.houul li.hou6{position: relative; color:#E53939; width: 16%; }
.bigF{font-size: 36px; font-weight: bold; margin:0 4px 10px 4px;}

.fonttax{
  position: absolute;
  right: -6px;
  top: -10px;
  font-size: 10px;
  width: 24px;
}

.PricelistWrap{
  margin-top: 10px;
}
@media screen and (max-width: 520px) {
  .n-form-item{
    display: block !important;
  }
  label.title{
    width:150px;
  }
  .Submit{
    width: 100%;
    height: 40px;
    font-size: 16px;
    border-radius: 4px;
    position: relative;
    top: auto;
    right: auto;
    box-shadow: 0 0 0;
    margin:0;
    text-align: left;
  }
  ::v-deep(.codeBlock .n-form-item-blank){
    display: block;
    text-align: left;
  }

  .houul{
    display: block;
    margin-bottom: 20px;
  }
  .houul li{ display: block;}
  .houul li.hou1{ width: 80%; margin: auto;}
  .houul li.hou2{ width: 100%; margin-top: 10px;}
  .houul li.hou3{ width: 100%;}
  .houul li.hou4{ width: 100%; display: none;}
  .houul li.hou5{ width: 100%; display: block; margin: 10px 0; text-align: center;}
  .houul li.hou5 img{ margin: auto;}
  .houul li.hou6{ width: 100%;}
  .bigF{font-size: 30px;}

  .bottomWord{
    position: relative;
    font-size: 11px;
    bottom: -2px;
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>