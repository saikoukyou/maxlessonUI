<template>
  <div>
    <div class="plan_modal_contents_bg"></div>
    <div class="plan_pop_div">
      <span @click="close" class="modal_close_btn">閉じる</span>
      <div style="line-height: 1em;">
        <n-form ref="formRef" :model="form" :rules="rules" size="large">
        <span class="pwTitle">パスワード</span><br>
        <n-form-item :show-label="false" path="password">
          <n-input class="SignInput" clearable type="password" v-model:value="form.password" placeholder="******" />
        </n-form-item>
        <span class="pwTitle">パスワード確認</span><br>
        <n-form-item :show-label="false" path="password_confirmation">
          <n-input clearable type="password" v-model:value="form.password_confirmation" placeholder="******" />
        </n-form-item>
          <div style="text-align: center;">
        <n-button class="Submit" type="submit" name="submit" @click="submitForm" :loading="loading" value="パスワード登録">
          <span>パスワード登録</span>
        </n-button>
          </div>
      </n-form>
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
import {useBusinessCodeCheckApi, useBusinessResetPasswordApi} from "~/apis/corporate";
import {useStudentResetPasswordApi} from "~/apis/user";
import {useResetPasswordApi} from "~/apis/student";

//表单验证
const formRef = ref(null)
const form = reactive({
  password: "",
  password_confirmation: "",
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

//加载效果
const loading = ref(false);
let timer = ref(3);
const route = useRoute();
const emit = defineEmits(['changePasswordEvent']);


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

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data.value.err == false) {
      message.success("パスワードの再設定が完了しました");
      emit("changePasswordEvent");
    } else {
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })
}

function close() {
  emit("changePasswordEvent");
}

useEnterEvent(() => onSubmit())

</script>

<style lang="scss" scoped>
/* モーダルウィンドウの背景要素 */
.plan_modal_contents_bg {
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .56);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
}
.plan_pop_div {
  background: white;
  padding: 3vh 7vh;
  border-radius: 8px;
  -ms-box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
  box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
  position: fixed; /* 修改为 fixed */
  top: 50%;
  left: 50%;
  width: 800px;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.modal_close_btn {
  position: absolute;
  right: 8px;
  top: 0;
}
.li-text {
  display: inline-block;
  width: 50%;
  font-size: 0.9rem;
}
.li-btn {
  display: inline-block;
  text-align: right;
  vertical-align: bottom;
  width: 50%;
}
.plan-hr {
  border-bottom: 1px solid #C6C6C6;
  margin:10px 0;
}
.button_confirm{
  cursor: pointer;
  font-size: 1.1em;
}
.pwTitle{
  display: block;
  text-align: left;
}

::v-deep(.n-input-wrapper){
  text-align: left;
}
@media screen and (max-width: 520px) {
  .li-text{
    width: 100%;
    font-size: 1rem;
    text-align: center;
  }
  .plan_pop_div {
    width: 90%; /* 手机端缩小宽度 */
    padding: 5vh 10vw 3vw 10vw; /* 调整内边距 */
    top: 50%; /* 固定在视口中间 */
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .li-btn{
    width: 100%;
  }
}
</style>