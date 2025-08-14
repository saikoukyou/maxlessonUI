<template>
  <div class="loginBG topTemplate">
    <section class="contentsHeader">
      <div class="subPosition">
        <span class="subTitle">ログイン</span>
      </div>
    </section>
    <section class="contentsWrap LoginUI">
      <div class="contentsGrid Login">
        <div class="left">
          <p class="contentsTitle">メールアドレスでログイン</p>
          <n-form  ref="formRef" :model="form" :rules="rules" size="large">
            <div class="form-lable-custom">メールアドレス<span></span><br/></div>
            <n-form-item :show-label="false" path="email">
              <n-input class="SignInput" clearable v-model:value="form.email" placeholder="sample@mail.com" />
            </n-form-item>
            <div class="form-lable-custom">パスワード<span></span><br/></div>
            <n-form-item :show-label="false" path="password">
              <n-input class="SignInput" clearable v-model:value="form.password" type="password" placeholder="*******" />
            </n-form-item>
            <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
              <span>ログイン</span>
            </n-button>
            <n-checkbox v-model:checked="form.remember" class="form_remember">
              ログイン状態を保持する
            </n-checkbox>
          </n-form>

          <div>

            <p>{{ error }}</p>

          </div>


          <NuxtLink to="/password">
            <p class="forgetPass">パスワードを忘れた方はこちら ＞</p>
          </NuxtLink>
<!--          <nuxt-link to="/signup">-->
<!--            <p class="signupBlock">-->
<!--              <span>会員登録していない方はサインアップ</span>-->
<!--              <span class="signBtn">無料体験</span>-->
<!--            </p>-->
<!--          </nuxt-link>-->
        </div>
<!--        <div class="right">-->
<!--          <p class="contentsTitle">Googleアカウントでログイン</p>-->
<!--          <br />-->
<!--          <GoogleSignInButton style="font-size: 20px;font-weight: bold;"-->
<!--              @success="handleSignInSuccess"-->
<!--              @error="handleSignInError"-->
<!--          ></GoogleSignInButton>-->
<!--        </div>-->
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
    createDiscreteApi,
    NCheckbox
} from "naive-ui"
import {useLoginApi} from "~/apis/user";
import {ref} from "vue";
import {
  GoogleSignInButton,decodeCredential
} from "vue3-google-signin";
import {useGoogleLoginApi} from "~/apis/student";
import {useMainStore} from "~/composables/store";

const useStore = useMainStore();
const route = useRoute()
const type = ref("login")
const title = ref("ログイン")

//表单验证
const formRef = ref(null)
const form = reactive({
    email: "",
    password: "",
    repassword: "",
    remember: false
})
const error = ref(null);

const rules = computed(() => {
    let r = {
        email: [{
            required: true,
            message: "入力してください",
            trigger: "blur"
        }],
        password: [{
            required: true,
            message: "パスワードを入力してください",
            trigger: "blur"
        }],

    }
    if (type.value != "login") {
        r.repassword = [{
            required: true,
            message: "パスワードを再入力してください",
        }, {
            validator: (rule, value, callback) => {
                if (value !== form.password) {
                    callback(new Error("2回入力されたパスワードが一致しません"))
                } else {
                    callback()
                }
            },
            trigger: ["blur", "input"]
        }]
    }
    return r
})

const changeType = () => {
    type.value = type.value === 'login' ? 'reg' : 'login'
    title.value = type.value == 'login' ? 'ログイン' : '登録'
    route.meta.title = title.value
    form.email = ""
    form.password = ""
    form.repassword = ""
    formRef.value.restoreValidation()
}

// 定义处理成功登录的函数
const handleSignInSuccess = (response) => {
  const credential = response.credential;
  const decodedCredential = decodeCredential(credential);
  googleLogin(decodedCredential);
  // console.log("User:", decodedCredential);
}

const googleLogin =  async (decodedCredential) => {
  useStore.studentGoogleLogin(decodedCredential);
}

// handle an error event
// 定义处理登录失败的函数
const handleSignInError = () => {
  console.error("Signin Failed");
}
//加载效果
const loading = ref(false)

//回车事件
const onSubmit = () => {
    formRef.value.validate(async (errors) => {
      if (errors) return;

      if (form.remember === false) {
        delete form.remember;
      }

      loading.value = true
      useStore.studentLogin(form);
      loading.value = false
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
.form_remember{
  margin: 10px;
}
.top-head{
  background-color: #FFFFFF;
}

.n-button{
  width: 80%;
  margin-bottom: 6px;
}
.LoginUI{
  margin-top: 0;
}
@media screen and (max-width: 520px) {
  .n-button{
    width: 90%;
  }
  .form-lable-custom {
    text-align: left;
    width: 90%;
    margin: 10px auto;
  }
  .n-form-item{
    text-align: left;
    width: 90%;
    margin: auto;
  }
  .forgetPass{
    text-align: center;
    margin: auto;
  }
  .signupBlock{
    margin: 10px auto;
  }
  .ButtonGoogle{
    margin: 0 auto;
  }
  .loginBG{
    padding-bottom: 200px;
    background-size: 150%;
    background-position: right bottom;
  }
  .LoginUI{
    margin-top: 0;
  }
  .contentsTitle{
    padding-top: 0;
  }
  .contentsGrid .left{
    padding: 5%;
  }
}
</style>
