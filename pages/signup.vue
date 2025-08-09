<template>
  <div class="signupBG">
    <section class="contentsHeaderSign">
      <div class="centerPosition">
        <span class="subTitle">無料登録</span><br>
        <div class="signupDes"></div>
      </div>
    </section>

  <section class="contentsWrap LoginUI mgt0">
    <div class="stepImg"></div>
    <div class="contentsGrid Login">
      <div class="left">
        <p class="contentsTitle">メールアドレスで登録</p>
        <n-form ref="formRef" :model="form" :rules="rules" show-require-mark="right-hanging" size="large">

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

          <div class="form-lable-custom">メールアドレス<span>必須</span><br/></div>
          <n-form-item :show-label="false" path="email">
            <n-input class="SignInput" clearable v-model:value="form.email" placeholder="sample@mail.com" />
          </n-form-item>
          <div class="form-lable-custom">パスワード設定（半角英数字6文字以上）<span>必須</span><br/></div>
          <n-form-item :show-label="false" path="password">
            <n-input class="SignInput" clearable v-model:value="form.password" type="password" placeholder="半角英数字6文字以上" />
          </n-form-item>
          <div class="form-lable-custom">パスワードの確認<span>必須</span><br/></div>
          <n-form-item :show-label="false" path="password_confirmation">
            <n-input class="SignInput" clearable v-model:value="form.password_confirmation" type="password" placeholder="*******" />
          </n-form-item>
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span style="padding-top: 8px; display: inline-block">体験登録</span>
          </n-button>
        </n-form>
      </div>
      <div class="right">
        <p class="contentsTitle">Googleアカウントで登録</p>
        <br>
        <img src="~/assets/images/button_google.png" alt="" class="ButtonGoogle">
      </div>
      
    </div>

  </section>
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
import {useLoginApi, useRegApi} from "~/apis/user";

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
  // bid: 0,
  flag: 0,
  proxy_id: ""
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
const loading = ref(false)

// if (route && route?.query?.auth) {
//   form.bid = route?.query?.auth;
// }
if (route) {
  if (route?.query?.flag) {
    form.flag = route?.query?.flag;
  }
  if (route?.query?.proxy_id) {
    form.proxy_id = route?.query?.proxy_id;
  }
}
//回车事件
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
      message.success("登録に成功しました")
      // 跳转
      navigateTo({path:'/signupMail',query:{
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
  // layout: "login",
  middleware: ["only-visitor"]
})
</script>
<style lang="scss" scoped>
.form-lable-custom {
  margin-top: 4px;
}
.form-lable-custom>span {
  color:red;
  margin-left:6px;
  font-size: 12px;
}
.specialTwo{
  font-size: 22px;
  color: #FFEB3B;
}
.n-button{
  width: 80%;
  margin-top: 0;
}
.n-form{
  padding-bottom: 20px;
}

.nameDiv{width: 90%; display: block; position: relative;}
.nameDiv li:first-child{width: 50%; float: left;}
.nameDiv li:nth-child(2){width: 50%; float: right;}

.nameDiv li:first-child .n-input{width: 86%;}
.nameDiv li:nth-child(2) .n-input{width: 86%; right: 8%;}

.SignInput{font-size: 11px;}

.nameDiv li:nth-child(2) .form-lable-custom{
  margin-left: -10px;
}
.contentsTitle{
  padding-top: 0;
}

@media screen and (max-width: 520px) {
  .n-form-item {
    width: 90%;
    margin: auto;
    text-align: left;
  }
  .n-button{
    width: 90%;
  }
  .form-lable-custom {
    width: 90%;
    margin: auto;
    text-align: left;
    margin-bottom: 4px;
  }
  .contentsTitle {
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .ButtonGoogle {
    margin: auto;
  }
  .signupBG {
    padding-bottom: 200px;
    background-size: 150%;
    background-position: right bottom;
  }
  .signupDes{
    min-height: fit-content;
  }
  .nameDiv li:first-child .form-lable-custom{
    margin-left: 20px;
  }
  .nameDiv li:nth-child(2) .form-lable-custom{
    margin-left: 0;
  }
  .nameDiv li:first-child .n-input{
    width: 100%;
    margin-left: 7%;
  }
  .nameDiv li:nth-child(2) .n-input{
    width: 100%;
  }
  .nameDiv{
    width: 100%;
  }
  .contentsGrid .left{
    padding: 0 5%;
  }
}
</style>