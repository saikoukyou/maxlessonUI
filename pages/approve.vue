<template>
  <div v-if="pshow">
    <section class="contentsHeader">
      <div class="subPosition">
        <span class="subTitle">パスワードの再設定</span>
        <span class="subDes center">Password</span>
      </div>
    </section>

    <div class="forgetPassWrap">
    <n-form ref="formRef" :model="form" :rules="rules" show-require-mark="right-hanging" size="large">
      <n-form-item label="パスワード設定" path="password">
        <n-input clearable v-model:value="form.password" type="password" placeholder="*******" />
      </n-form-item>
      <n-form-item label="パスワードの確認" path="password_confirmation">
        <n-input clearable v-model:value="form.password_confirmation" type="password" placeholder="*******" />
      </n-form-item>
      <div style="text-align: center;">
        <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
          <span>登録</span>
        </n-button>
      </div>
    </n-form>
    </div>
  </div>
  <div v-else>
    {{msg}}
  </div>
</template>
<script setup>
import {useApproveCompleteApi, useMemberInviteApproveApi} from "~/apis/corporate";
import {onMounted} from "vue";
import {createDiscreteApi, NButton, NForm, NFormItem, NInput} from "naive-ui";

let pshow = ref(false);
let loading = ref(false);
const formRef = ref(null)
let msg = ref('');
const form = reactive({
  auth_key:'',
  password: "",
  password_confirmation: ""
})
const rules = computed(() => {
  let r = {
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
const route = useRoute();

onMounted(async () => {
  if (route && route?.query?.auth_key) {
    const { data } = await useMemberInviteApproveApi(route.query.auth_key);
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
        form.auth_key = route.query.auth_key;
      }

    }

  }
})
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true

    const {data, error  } = await useApproveCompleteApi(form);

    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value.err === false) {
      message.success("保存成功")
      navigateTo('/corporate/login');
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
</script>
<style scoped>
.approve-main {
  width:40%;
  margin:auto%;
}
.aprrove-title{
  margin:20px 0;
  text-align: center;
}
.n-form{
  text-align: left;
}
::v-deep(.n-form-item-label__text) {
  font-weight: bold;

}
@media screen and (max-width: 520px) {
  .approve-main {
    width:70%;
    margin:auto%;
  }
  .subPosition{
    padding: 24px 0 0 0;
  }
}
</style>
