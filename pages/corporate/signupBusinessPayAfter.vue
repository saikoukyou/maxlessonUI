<template>
<div style="background-color: #EAF0F9;">
  <div class="corBlock">
    <span class="cortt">登録</span>
    <span class="cordesdes">Sign Up</span>
  </div>

  <div>

    <img src="../../assets/images/step1.png" width="432" class="step_h"/>

    <section>
    <div class="loginBlock">
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
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span>登録</span>
          </n-button>
        </n-form>
      </div>
<!--      <div class="right">-->
<!--        <p class="contentsTitle">Googleアカウントで登録</p>-->
<!--        <br>-->
<!--        <img src="~/assets/images/button_google.png" alt="" class="ButtonGoogle">-->
<!--      </div>-->


    </div>

  </section>


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
const type = ref("reg")
const title = ref("登録")

//表单验证
const formRef = ref(null)
const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  bid: 0,
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


if (route && route?.query?.bid) {
  form.bid = route?.query?.bid;
}
//回车事件
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true;

    let {
      data,
      error
    } = await useBusinessApproveCompletePayApi(form)
    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value?.err == false) {
      message.success("登録に成功しました")
      // 跳转
      navigateTo({path:'/corporate/signupMailBusiness',query:{
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

// useEnterEvent(() => onSubmit())



//ui布局
definePageMeta({
  layout: "corporate",
  middleware: ["only-visitor"]
})
</script>
<style lang="scss" scoped>
.form-lable-custom {
  line-height: 26px;
  margin-top:0;
  margin-bottom: 0;
}
.form-lable-custom>span {
  color:#d03050;
  margin-left:4px;
  font-size: 11px;
}

.corBlock{
  width: 100%;
  background-image: url("../../assets/images/scBg.png");
  color: #FFFFFF;
  background-size: cover;
  font-weight: bold;
  padding: 20px 0;
}

.cortt{display: block; text-align: center; width: 1080px; margin: auto; font-size: 32px; font-family: Murecho;}
.cordesdes{display: block; width: 1080px; margin:10px auto; text-align: center;}

.step_h{
  margin: 20px auto 0 auto;
}
.contentsGrid .left{
  display: block;
  margin: auto;
}
.loginBlock{
  width: 440px;
  margin: auto;
  display: block;
}
.n-input{
  height: 48px;
}

.Submit{
  width: 100%;
}
.contentsTitle{
  text-align: center;
  margin-bottom: 10px;
  padding-top: 20px;
}

.Submit {
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
  width: 100%;
  height: 50px;
  margin-top: 0;
  margin-bottom: 50px;
}
/* 按下時的效果 */
.Submit:hover {
  background-color: #3b82f6; /* 藍色背景 */
  color: #FFFFFF;
  transform: translateY(2px); /* 按下時微微下移 */
  box-shadow: 0 2px 0 #2563eb; /* 陰影縮小 */
}

@media screen and (max-width: 520px) {
  .cortt {
    display: block;
    width: 80%;
    margin: auto;
    font-size: 32px;
    font-family: Murecho;
  }

  .cordesdes {
    display: block;
    width: 80%;
    margin: 10px auto;
  }
  .loginBlock{
    width: 80%;
    margin: auto;
    display: block;
  }
  .step_h{
    width: 80%;
  }
  .n-form{
    text-align: left;
  }
  .Submit{
    width: 100% !important;
  }
}
</style>