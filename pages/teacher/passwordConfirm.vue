<template>
  <div v-if="pop_show">
    <div class="modal_contents_bg"></div>
    <div class="pop_div">
      <p class="pop_div_title">パスワードを再設定しました</p>
      <p>パスワードの再設定が完了しました。ログイン画面よりログインください。</p>
      <p>{{timer}}</p>
    </div>
  </div>
    <div style="height: 90px; width: 100%;"></div>

<section class="contentsHeader">
  <h2 title="PASSWORD"><img src="~/assets/SVG/titleBefore.svg" alt="" class="titleBefore" /> パスワードの再設定</h2>
</section>

<section v-if="show_pass" class="forgetPassWrap">
  <!-- method="post" -->
  <n-form ref="formRef" :model="form" :rules="rules" size="large">
    パスワード<span></span><br>
    <n-form-item :show-label="false" path="password">
      <n-input class="SignInput" clearable type="password" v-model:value="form.password" placeholder="******" />
    </n-form-item>
    パスワード確認<span></span><br>
    <n-form-item :show-label="false" path="password_confirmation">
      <n-input class="SignInput" clearable type="password" v-model:value="form.password_confirmation" placeholder="******" />
    </n-form-item>
    <p class="Submit" >
      <n-button class="Submit" type="submit" name="submit" @click="submitForm" :loading="loading" value="パスワード登録">
        <span>パスワード登録</span>
      </n-button>
    </p>
  </n-form>
</section>

<div style="height: 8vh;"></div>
</template>
<script setup>
import {
  NForm,
  NInput,
  NFormItem,
  NButton,
  createDiscreteApi
} from "naive-ui"
import {useStudentCodeCheckApi, useStudentResetPasswordApi} from "~/apis/user";
import {onMounted} from "vue";
import {useTeacherCodeCheckApi, useTeacherResetPasswordApi} from "~/apis/teacher";


//ui布局
definePageMeta({
  layout: "teacherout",
  middleware: ["only-visitor-teacher"]
})

//表单验证
const formRef = ref(null)
const form = reactive({
  password: "",
  password_confirmation: "",
  code: ""
})

let pop_show = ref(false);

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
let show_pass = ref(false);
let timer = ref(3);
const route = useRoute();
let query = route?.query;
if (query) {
  form.code = query?.code ?? "";
}

// const checkCode = async () => {
//
// }
// checkCode();

const checkCode = async () => {
  let {
    data,
    error
  } = await useTeacherCodeCheckApi(form.code)

  if (data && data.value && data.value.err == true) {
    const { message } = createDiscreteApi(["message"])
    message.error('codeが正しくありません');
  } else {
    show_pass.value = true;
  }
}

//回车事件
const submitForm = () => {
  formRef.value.validate(async (errors) => {console.log('errors:'+JSON.stringify(errors));
    if (errors) return;

    loading.value = true
    let {
      data,
      error,
      refresh
    } = await useTeacherResetPasswordApi(form)

    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data && data.value && data.value.err == false) {
      // message.success("メールを送信しました");
      pop_show.value = true;

      let interval = setInterval(() => {
        if (timer.value === 0) {
          clearInterval(interval)
          navigateTo("/teacher/login", { replace: true })
        } else {
          timer.value --
          console.log(timer)
        }
      }, 1000)
      // 跳转
      // navigateTo("/login", { replace: true })
    } else {
      return message.error(data?.value.err_msg || 'サービス側エラー');
    }

  })
}

function close() {
  pop_show.value = false;
}

useEnterEvent(() => onSubmit())


onMounted(() => {
  checkCode();
})
</script>
<style lang="scss" scoped>
.form-lable-custom {
  line-height: 32px;
  margin-top:24px;
  margin-bottom: 10px;
}
.pop_div {
  background: #FAC014;
  padding: 3vh 7vh;
  border-radius: 8px;
  -ms-box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
  box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  transform: translate(-50%, -50%);
  z-index: 101;
}
.pop_div_title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}
/* モーダルウィンドウの背景要素 */
.modal_contents_bg {
  background: rgba(0, 0, 0, .56);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
}
</style>