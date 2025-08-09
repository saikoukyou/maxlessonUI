<template>
  <NuxtLayout name="corporate">

  <div style="background-color: #EAF0F9;">
  <div class="corBlock">
    <span class="cortt">パスワードの再設定</span>
    <span class="cordesdes">Password</span>
  </div>


<section class="forgetPassWrap">
  <p>会員登録いただいたメールアドレスを入力してください<br>
    パスワードを再設定するためのURLを記載したメールをお送りします。<br></p>

  <n-form ref="formRef" :model="form" :rules="rules" size="large">
    <div class="form-lable-custom">メールアドレス<br/></div>
    <n-form-item :show-label="false" path="email">
      <n-input class="SignInput" clearable v-model:value="form.email" placeholder="sample@mail.com" />
    </n-form-item>
    <n-button class="Submit" type="primary" @click="submitReset" :loading="loading">
      <span style="padding-top: 8px; display: inline-block">送信</span>
    </n-button>
  </n-form>
  <p>確認メールが”迷惑メール”として振り分けられることがありますので、www.bizchina.jpからのメールを
    迷惑メールから除外してください</p>
</section>
  </div>

  </NuxtLayout>
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
import {useForgetApi} from "~/apis/user";
import {useTeacherForgetApi} from "~/apis/teacher";
import {useBusinessForgetApi} from "~/apis/corporate";

const route = useRoute()

//表单验证
const formRef = ref(null)
const form = reactive({
  email: "",
})

const rules = computed(() => {
  let r = {
    email: [{
      required: true,
      type: "email",
      max: 250,
      message: "メールアドレスを入力してください",
      trigger: "change"
    }],
  }

  return r
})

//加载效果
const loading = ref(false)

//回车事件
const submitReset = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true
    let {
      data,
      error,
      refresh
    } = await useBusinessForgetApi(form)
    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data.value.err == false) {
      navigateTo({path:"/corporate/passwordSend",query:{
          email: form.email,
          valid_period: data?.value['valid_period'],
          from_email: data?.value['from_email'],
        }})
      // message.success("メールを送信しました")
      // // 跳转
      // navigateTo("/passwordConfirm")
    } else {
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })
}

useEnterEvent(() => onSubmit())

//ui布局
definePageMeta({
  layout: false,
  middleware: ["only-visitor-corporate"]
})

</script>
<style lang="scss" scoped>
.form-lable-custom {
  line-height: 32px;
  margin-top:24px;
  margin-bottom: 10px;
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

.forgetPassWrap{
  width: 907px;
  margin: 24px auto 0 auto;
  padding-bottom: 24px;
}
.form-lable-custom {
  line-height: 32px;
  margin-top:24px;
  margin-bottom: 10px;
  text-align: center;
}

.n-form{
  width: 100%;
  text-align: center;
  background: white;
  padding: 5px 50px 30px 50px;
  margin: 20px 0 30px 0;
  border-radius: 8px;
}
.n-input{
  width: 50%;
  margin: auto;
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
  .contentsHeader{
    margin-top: 0;
  }
  .forgetPassWrap{
    width: 90%;
  }
  .n-input{
    width: 100%;
  }
  .forgetPassWrap .Submit{
    width: 100%;
    margin-top: 0;
  }
  p{
    line-height: 24px;
  }
  .subPosition{
    padding: 24px 0 0 0 ;
  }
}
</style>