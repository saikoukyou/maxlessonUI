<template>
	<NuxtLayout name="mypage">
    <NuxtPage />
	</NuxtLayout>
  <n-modal
      class="register-modal"
      v-model:show="showChangePasswd"
      preset="card"
      :style="bodyStyle"
      title=""
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    <div class="keywordCard">
      <img
          src="../assets/images/payFail.png"
          class="resultIcon"
      />
      <div class="FrontWord">パスワードの設定をお願いします</div>
      <div class="resultText">今後ログインする際に必要なパスワードを設定してください。半角英数字6文字以上でご入力ください。
      </div>
    </div>
    <n-form class="passwordBlock" ref="formRef" :model="form" :rules="rules" size="large">
      パスワード<span></span><br>
      <n-form-item :show-label="false" path="password">
        <n-input class="SignInput" clearable type="password" v-model:value="form.password" placeholder="******" />
      </n-form-item>
      パスワード確認<span></span><br>
      <n-form-item :show-label="false" path="password_confirmation">
        <n-input class="SignInput" clearable type="password" v-model:value="form.password_confirmation" placeholder="******" />
      </n-form-item>
        <n-button class="Submit" type="submit" name="submit" @click="submitForm" :loading="loading" value="パスワード登録">
          <span>パスワード登録</span>
        </n-button>
    </n-form>
  </n-modal>
</template>
<script setup>

import {onMounted, ref, watch} from "vue";
import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NModal} from "naive-ui";
import {useResetPasswordApi} from "~/apis/student";
import {useDeleteImgDataApi} from "~/apis";

definePageMeta({
	layout: false,
  middleware: ['auth'],
});

const useStore = useMainStore();
const route = useRoute();

let bodyStyle = {
  width: '520px'
};
let segmented = {
  content: 'soft',
  footer: 'soft'
};

const formRef = ref(null)
const form = reactive({
  password: "",
  password_confirmation: "",
  changeType: "change"
})

const rules = computed(() => {
  let r = {
    password: [{
      required: true,
      type: "string",
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

let showChangePasswd = ref(false);
const loading = ref(false);
const { dialog } = createDiscreteApi(["dialog"]);

if (route && route?.path) {
  // console.log('route?.path:'+route?.path);
  useStore.setActiveUrl(route.path);
}

onMounted(async () => {
  if (useStore?.studentInfo?.is_corporate_member === 1 && useStore?.studentInfo?.corporate_member_payment_method === 0) {
    // console.log('可能进到这里吗');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('../assets/css/style_houjin.css', import.meta.url).href;
    document.head.appendChild(link);
    // import("/assets/css/style_houjin.css");
  }

  if (useStore?.studentInfo?.change_passwd === 1) {
    showChangePasswd.value = true;
  }

})

//回车事件
const submitForm = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true
    let {
      data,
      error,
      refresh
    } = await useResetPasswordApi(form)

    loading.value = false

    if (error?.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value?.err == false) {
      showChangePasswd.value = false;
      await useStore.useRefreshUserInfo();

      dialog.warning({
        title: "パスワードの設定が完了しました！",
        content: "さっそくレッスンの予約を始めましょう。",
        positiveText: "レッスンを予約する",
        onPositiveClick: async () => {
          return navigateTo('/mypage/searchTeacher?learnType='+useStore?.monthly_learn_type);
        },
      });

    } else {
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })
}
</script>
<style scoped>

.Submit{
  margin: 10px auto 30px auto;
  display: block;
  text-align: center;
}
.Submit span{
  text-align: center;
  display: block;
  margin: auto;
}
  .resultIcon {
    width: 120px;
    margin:0 auto;
  }

  .FrontWord {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .resultText {
    font-size: 14px;
    color: #555;
    margin-bottom: 25px;
    line-height: 1.6;
  }
  .keywordCard {
    width: 80%;
    text-align: center;
    margin: 0 auto 20px auto;
  }
  .passwordBlock{
    padding: 0 30px;
    width: 80%;
  }
  @media (max-width: 520px) {
    .FrontWord {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .resultText {
      font-size: 13px;
      color: #555;
      margin-bottom: 25px;
      line-height: 1.6;
    }
    .passwordBlock{
      padding: 0 30px;
      width: 90%;
    }
  }
</style>