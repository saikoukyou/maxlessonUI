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
    <div class="siteBg">
      <span class="title serif">法人研修申し込みサイト</span>
      <span v-if="notice_show" class="subdes">{{title}}</span>
      <div v-if="notice_show" class="messageBlock">
        <span class="subtitle serif">貴社研修担当部署からのメッセージ</span>
        <p class="message" v-html="notice">
        </p>
      </div>
      <div v-if="pshow">

        <div class="messageBlock">
          <span class="subtitle serif">ご利用可能プラン</span>


          <div class="Pricelist" v-if="planShow">


            <div  v-for="(plan,pindex) in pay_plans">
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
              <li class="hou6"><span class="bigF">{{plan.paypal_amount}}</span><span>円</span><span>税込</span>
                <span class="bottomWord">（{{plan.final_amount}}円税込み）</span></li>
            </ul>
            </div>

            <div v-for="(tplan,pindex) in talk_pay_plans">
              <ul class="houul">
                <div class="triangle-label2"></div>
                <li class="hou1">{{tplan.plan_name}}</li>
                <li class="hou2">
                  有効期限{{tplan.validity_term}}
                  <span v-if="tplan.validity_term_unit == 'y'">ヶ月間</span>
                  <span v-if="tplan.validity_term_unit == 'm'">ヶ年間</span>
                  <span v-else>日間</span>
                </li>
                <li class="hou3">総レッスン数 <span class="bigF">{{tplan.buy_issued_lesson_num}}</span> 回
                  <span class="bottomWord">（1日予約上限{{tplan.reservation_limit_per_day}}回）</span></li>
                <li class="hou4"><img src="../../assets/images/redarrow.png" width="12"/></li>
                <li class="hou5"><img src="../../assets/images/redarrow_m.png" width="20"/></li>
                <li class="hou6"><span class="bigF">{{tplan.paypal_amount}}</span><span>円</span><span>税込</span>
                  <span class="bottomWord">（{{tplan.final_amount}}円税込み）</span></li>
              </ul>

            </div>

            <div v-for="(ticket_plan) in pay_plans_ticket">
              <ul class="houul">
                <div class="triangle-label"></div>
                <li class="hou1">6ヶ月36回プラン</li>
                <li class="hou2">
                  有効期限{{ticket_plan.validity_term}}
                  <span v-if="ticket_plan.validity_term_unit == 'y'">ヶ月間</span>
                  <span v-if="ticket_plan.validity_term_unit == 'm'">ヶ年間</span>
                  <span v-else>日間</span>
                </li>
                <li class="hou3">総レッスン数 <span class="bigF">{{ticket_plan.buy_issued_lesson_num}}</span> 回
                  <span class="bottomWord">（1日予約上限{{ticket_plan.reservation_limit_per_day}}回）</span></li>
                <li class="hou4"><img src="../../assets/images/redarrow.png" width="12"/></li>
                <li class="hou5"><img src="../../assets/images/redarrow_m.png" width="20"/></li>
                <li class="hou6"><span class="bigF">{{ticket_plan.paypal_amount}}</span><span>円</span><span>税込</span>
                  <span class="bottomWord">（{{ticket_plan.final_amount}}円税込み）</span></li>
              </ul>
            </div>

            <div v-for="(tticket_plan) in talk_pay_plans_ticket">
              <ul class="houul">
                <div class="triangle-label2"></div>
                <li class="hou1">{{tticket_plan.plan_name}}</li>
                <li class="hou2">
                  有効期限{{tticket_plan.validity_term}}
                  <span v-if="tticket_plan.validity_term_unit == 'y'">ヶ月間</span>
                  <span v-if="tticket_plan.validity_term_unit == 'm'">ヶ年間</span>
                  <span v-else>日間</span>
                </li>
                <li class="hou3">総レッスン数 <span class="bigF">{{tticket_plan.buy_issued_lesson_num}}</span> 回
                  <span class="bottomWord">（1日予約上限{{tticket_plan.reservation_limit_per_day}}回）</span></li>
                <li class="hou4"><img src="../../assets/images/redarrow.png" width="12"/></li>
                <li class="hou5"><img src="../../assets/images/redarrow_m.png" width="20"/></li>
                <li class="hou6"><span class="bigF">{{tticket_plan.paypal_amount}}</span><span>円</span><span>税込</span>
                  <span class="bottomWord">（{{tticket_plan.final_amount}}円税込み）</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="messageBlock">
        <span class="subtitle serif">ご利用の流れ</span>
        <img class="imgstep" src="../../assets/images/sitestep.png"/>
        <div class="sitemb"><img src="../../assets/images/sitestep_m.png" height="126" width="644"/></div>
        <div class="left">
          <p class="contentsTitle">メールアドレスで登録</p>
          <n-form ref="formRef" :model="form" :rules="rules" show-require-mark="right-hanging" size="large">
            <div style="width: 48%; float: left;">
            <div class="form-lable-custom">苗字<span>必須</span><br/></div>
            <n-form-item :show-label="false" path="last_name">
              <n-input class="SignInput" clearable v-model:value="form.last_name" placeholder="田中" />
            </n-form-item>
            </div>
            <div style="width: 50%; float: right;">
            <div class="form-lable-custom">名前<span>必須</span><br/></div>
            <n-form-item :show-label="false" path="first_name">
              <n-input class="SignInput" clearable v-model:value="form.first_name" placeholder="太郎" />
            </n-form-item>
            </div>

            <div class="form-lable-custom">メールアドレス<span>必須</span><br/></div>
            <n-form-item :show-label="false" path="email">
              <n-input class="SignInput" clearable v-model:value="form.email" placeholder="sample@mail.com" />
            </n-form-item>
            <div class="form-lable-custom">パスワード設定<span>必須</span><br/></div>
            <n-form-item :show-label="false" path="password">
              <n-input class="SignInput" clearable v-model:value="form.password" type="password" placeholder="*******" />
            </n-form-item>
            <div class="form-lable-custom">パスワードの確認<span>必須</span><br/></div>
            <n-form-item :show-label="false" path="password_confirmation">
              <n-input class="SignInput" clearable v-model:value="form.password_confirmation" type="password" placeholder="*******" />
            </n-form-item>
            <span v-if="fields.includes('department')">
            <div class="form-lable-custom">部署名<br/></div>
            <n-form-item :show-label="false" path="department">
              <n-input class="SignInput" clearable v-model:value="form.department" type="text" placeholder="部署名" />
            </n-form-item>
          </span>
            <span v-if="fields.includes('job')">
            <div class="form-lable-custom">役職<br/></div>
            <n-form-item :show-label="false" path="job">
            <n-input class="SignInput" clearable v-model:value="form.job" type="text" placeholder="役職" />
          </n-form-item>
          </span>
            <span v-if="fields.includes('employee_number')">
            <div class="form-lable-custom">社員番号<br/></div>
            <n-form-item :show-label="false" path="employee_number">
            <n-input class="SignInput" clearable v-model:value="form.employee_number" type="text" placeholder="社員番号" />
          </n-form-item>
          </span>
            <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
              <span>アカウント登録</span>
            </n-button>
          </n-form>
        </div>
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
  createDiscreteApi
} from "naive-ui"
import {onMounted} from "vue";
import {useBusinessApproveCompleteFreeApi, useBusinessApproveFreeApi, useGetBusinessFreePlansApi} from "~/apis/student";

const route = useRoute()

//表单验证
const formRef = ref(null)
const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  bid: 0,
  department: "",
  job: "",
  employee_number: "",
})

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
    password: [{
      required: true,
      type: 'string',
      min:4,
      max:16,
      message: "パスワードを入力してください",
      trigger: "blur"
    }],
    password_confirmation: [{
      required: true,
      type: 'string',
      min:4,
      max:16,
      message: "パスワードを入力してください",
      trigger: "blur"
    }],
    department: [{
      required: false,
      type: "string",
      max: 250,
      message: "部署名最长250个字符",
      trigger: "blur"
    }],
    job: [{
      required: false,
      type: "string",
      max: 250,
      message: "役職最长250个字符",
      trigger: "blur"
    }],
    employee_number: [{
      required: false,
      type: "string",
      max: 250,
      message: "社員番号最长250个字符",
      trigger: "blur"
    }],

  }

  r.password_confirmation = [{
    required: true,
    message: "パスワードを再入力してください",
  }, {
    validator: (rule, value, callback) => {
      if (value !== form.password) {
        callback(new Error("2回入力されたパスワードが一致しません "))
      } else {
        callback()
      }
    },
    trigger: ["blur", "input"]
  }]

  return r
})

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
const fields = ref([]);
const cname = ref('');
const title = ref('');
const notice = ref('');
let notice_show = ref(false);

onMounted(async () => {
  if (route && route?.query?.auth) {
    const { data } = await useBusinessApproveFreeApi(route.query.auth);
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
        form.bid = data?.value.bid ?? 0;
        planShow.value = data?.value.is_show ?? false;
        pay_plans.value = data?.value?.plans?.pay_plans ?? [];
        talk_pay_plans.value = data?.value?.plans?.talk_pay_plans ?? [];
        pay_plans_ticket.value = data?.value?.plans?.pay_plans_ticket ?? [];
        talk_pay_plans_ticket.value = data?.value?.plans?.talk_pay_plans_ticket ?? [];
        fields.value = data?.value?.fields ?? [];
        cname.value = data?.value?.corporate_name ?? '';
        title.value = data?.value?.business_website_title ?? '';
        notice.value = data?.value?.business_notice1 ?? '';
        notice_show.value = data?.value.business_notice_show ?? false;

        console.log('plans:'+JSON.stringify(plans.value));
      }

    }

  }
})

//回车事件
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true

    let {
      data,
      error
    } = await useBusinessApproveCompleteFreeApi(form)
    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value?.err == false) {
      message.success("登録に成功しました")
      // 跳转
      navigateTo({path:'/signupMailBusiness',query:{
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          from_email: data.value.from_email,
          valid_period: data.value.valid_period
        }}, { replace: true })
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

useEnterEvent(() => onSubmit())

//ui布局
definePageMeta({
  layout: false,
  middleware: ["only-visitor"]
})
</script>

<style scoped>
.Pricelist{
  width: 100%;
}
.contentsTitle{
  margin-bottom: 16px;
  padding-top: 0;
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
.messageBlock{width: 810px; border: 1px solid #C9E0F6; border-radius: 8px; margin: 30px auto; background-color: #F2F5FA; text-align: center; padding: 20px 70px 40px 70px;}
.subtitle {color:#3682E0; font-size: 22px; display: block; font-weight: bold; margin: 20px 0;}
.message{text-align: left; display: block; font-size: 14px; line-height: 22px;}

.Submit{
  width: 100%;
  background-color: #3b82f6; /* 藍色背景 */
  color: white; /* 白色文字 */
  border: none; /* 移除預設邊框 */
  border-radius: 8px; /* 圓角 */
  font-size: 16px; /* 字型大小 */
  font-weight: bold; /* 粗體字 */
  box-shadow: 0 4px 0 #2563eb; /* 按鈕下方的陰影，略微偏移 */
  cursor: pointer; /* 滑鼠移上去顯示手型游標 */
  transition: transform 0.1s; /* 點擊時的動畫效果 */
  display: block;
  margin: auto;
  text-align: center;
  line-height: 36px;
}
.Submit span{
  display: block;
  margin: auto;
}
/* 按下時的效果 */
.Submit:hover {
  transform: translateY(2px); /* 按下時微微下移 */
  box-shadow: 0 2px 0 #2563eb; /* 陰影縮小 */
  background-color: #3b82f6; /* 藍色背景 */
  color: #FFFFFF;
}
.button span{
  display: block;
  margin: auto;
}
.imgstep{
  width: 512px;
  margin: auto;
}
.n-form{
  width: 500px;
  text-align: left;
}

.nameDiv{width: 100%; display: block; position: relative; text-align: left;}
.nameDiv li:first-child{width: 50%; float: left;}
.nameDiv li:nth-child(2){width: 50%; float: right;}

.nameDiv li:first-child .n-input{width: 96%;}
.nameDiv li:nth-child(2) .n-input{width: 100%; right: 0;}

.left{
  margin-top: 30px;
}
.form-lable-custom{
  margin-bottom: 4px;
}
.n-input{
  --n-border:1px solid #C9E0F6;
  height: 48px;
  margin-bottom: 2px;
}

.sitemb{
  display: none;
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

.houul{display: flex; position: relative; margin-bottom: 10px; font-weight: bold; width: 100%; text-align: center; font-size: 15px; background-color: white; padding: 10px 10px 20px 10px;}
.houul li.hou1{padding: 10px 4px; border-radius: 8px; border: 1px solid #3476E0; margin-left: 8px; background-color:#F5F8FD;  color: #3476E0; width: 20%;}
.houul li.hou2{font-size: 16px; width: 23%; color: #3476E0; }
.houul li.hou3{position:relative; width: 30%; color: #3476E0;}
.houul li.hou4{text-align: center; margin-right: 2%;}
.houul li.hou5{display: none;}
.houul li.hou6{position: relative; color:#E53939; width: 22%; }
.bigF{font-size: 22px; font-weight: bold;}

.triangle-label {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 40px 60px 0 0; /* 控制三角形大小 */
  border-color: #EF6D20 transparent transparent transparent; /* 半透明三角形顏色 */
  left: 0;
  top: 0;
}

.triangle-label::after {
  content: '総合'; /* 標籤文字 */
  position: absolute;
  top: -34px; /* 調整文字位置 */
  left: 5px; /* 調整文字位置 */
  color: white;
  font-size: 11px;
  font-weight: bold;
  width: 30px;
  text-align: left;
}


.triangle-label2 {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 40px 60px 0 0; /* 控制三角形大小 */
  border-color: #30A186 transparent transparent transparent; /* 半透明三角形顏色 */
  left: 0;
  top: 0;
}

.triangle-label2::after {
  content: '会話'; /* 標籤文字 */
  position: absolute;
  top: -34px; /* 調整文字位置 */
  left: 5px; /* 調整文字位置 */
  color: white;
  font-size: 11px;
  font-weight: bold;
  width: 30px;
  text-align: left;
}


@media screen and (max-width: 520px) {
  .siteTop {
    display: none;
  }

  .siteBg {
    width: 90%;
  }

  .messageBlock {
    width: 100%;
    padding: 10px 40px 30px 40px;
  }

  .button {
    width: 100%;
  }

  .variable-text {
    text-align: center;
    padding-top: 5%;
    font-size: 1.6rem;
    font-weight: bold;
    color: #2E6190;
    margin-bottom: 16px;
  }

  .title {
    font-size: 25px;
  }

  .subdes {
    font-size: 14px;
  }

  .sitemb {

    display: block;
  }
  .n-form{
    width: 100%;
  }
  .imgstep{
    display: none;
  }

  .houul li{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .Pricelist{
    padding: 0;
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