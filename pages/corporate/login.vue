<template>
	<NuxtLayout name="corporate">
		<div page="corporate-login">

			<section class="contentsWrap LoginUI">
				<div class="contentsGrid Login">
          <n-card title="">
            <n-tabs type="line" default-value="student" animated>
              <n-tab-pane name="student" tab="一般ユ一ザ">
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
                    <n-button class="Submit" type="submit" @click="onSubmit('student')" :loading="loading">
                      <span>ログイン</span>
                    </n-button>
                    <n-checkbox v-model:checked="form.remember">
                      ログイン状態を保持する
                    </n-checkbox>

                  </n-form>

                  <div>

                    <p>{{ error }}</p>




                  <NuxtLink to="/password">
                    <p class="forgetPass">パスワードを忘れた方</p>
                  </NuxtLink>
<!--                  <nuxt-link to="/signup">-->
<!--                    <p class="forgetPass">会員登録していない方はサインアップ</p>-->
<!--                  </nuxt-link>-->

                </div>
              </n-tab-pane>
              <n-tab-pane name="admin" tab="管理者ユ一ザ">

                  <p class="contentsTitle">メールアドレスでログイン</p>
                  <n-form ref="formRef" :model="form" :rules="rules" size="large">
                    <div class="form-lable-custom">メールアドレス<span></span><br /></div>
                    <n-form-item :show-label="false" path="email">
                      <n-input class="SignInput" clearable v-model:value="form.email"
                               placeholder="sample@mail.com" />
                    </n-form-item>
                    <div class="form-lable-custom">パスワード<span></span><br /></div>
                    <n-form-item :show-label="false" path="password">
                      <n-input class="SignInput" clearable v-model:value="form.password" type="password"
                               placeholder="*******" />
                    </n-form-item>
                    <n-button class="Submit" type="submit" @click="onSubmit('business')" :loading="loading">
                      <span>ログイン</span>
                    </n-button>

                  </n-form>

                  <div>

                    <p>{{ error }}</p>




                  <NuxtLink to="/corporate/password">
                    <p class="forgetPass">パスワードを忘れた方</p>
                  </NuxtLink>
                  <!--						<a href="signup.html">-->
                  <!--							<p>会員登録していない方はサインアップ</p>-->
                  <!--						</a>-->

                </div>
              </n-tab-pane>
            </n-tabs>
          </n-card>
				</div>
			</section>
		</div>
	</NuxtLayout>
</template>
<script setup>
import {useCorporateLoginApi} from "~/apis/corporate";

definePageMeta({
	layout: false,
	middleware: ["only-visitor-corporate"]
})

import {
  NForm,
  NInput,
  NFormItem,
  NButton,
  NAlert,
  NTag,
  createDiscreteApi,
  NCard,
  NTabs,
  NTabPane,
  NCheckbox
} from "naive-ui"
import { useTeacherLoginApi } from "~/apis/teacher";
import {useMainStore} from "~/composables/store";

const route = useRoute()
const type = ref("login")
const title = ref("ログイン")

//表单验证
const formRef = ref(null)
// const formRef2 = ref(null)
const form = reactive({
	email: "",
	password: "",
  remember: false
})
// const form2 = reactive({
//   email: "",
//   password: "",
//   // remember: 1
// })
const error = ref(null);

const rules = computed(() => {
	let r = {
		email: [{
			required: true,
			message: "メールアドレスを入力してください",
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

//加载效果
const loading = ref(false)
const useStore = useMainStore();
//回车事件
const onSubmit = (type) => {
	formRef.value.validate(async (errors) => {
		if (errors) return;

    if (form.remember === false) {
      delete form.remember;
    }

		loading.value = true

    if (type === 'student') {
      useStore.studentLogin(form);
    } else {
      useStore.corporateLogin(form);
    }

		loading.value = false

	})
}

// useEnterEvent(() => onSubmit())

</script>

<style scoped>


::v-deep(.n-tabs .n-tabs-wrapper){
  width: 100%;
  display: block;
  margin: auto;
}
::v-deep(.n-tabs-tab-wrapper){
  width: 50%;
  display: inline-block;
  text-align: center;
  font-size: 16px;
}

::v-deep(.n-tabs-tab--active){
  font-weight: bold !important;
}


  .n-card{
    margin: auto;
  }
  .contentsGrid{
    display: block;
    width: 50%;
    margin: 60px auto;
  }
  .contentsTitle{
    margin-top: 6%;
    margin-bottom: 3%;
  }
  .Submit{
    width: 100%;
    background-color: #3682E0;
    box-shadow:2px 2px 10px 3px rgb(54 130 224 / 50%);
  }
  .forgetPass{
    color: #3682E0;
    margin: 30px auto;
  }
  .n-tab-pane{
    width: 80%;
    margin: auto;
  }

  .n-form-item-blank .n-input{
    --n-border: 1px solid #DADADA;
  }
  .contentsTitle{
    margin-top: 0;
  }
  .contentsTitle{
    padding-top: 30px;
  }

  @media screen and (max-width: 520px) {
    .contentsGrid{
      width: 90%;
      margin: auto;
    }
    .forgetPass{
      width: 100%;
      margin-bottom: 4%;
    }
    .contentsTitle{
      margin-bottom: 6%;
    }
    .LoginUI{
      margin-top: 4%;
    }
    .Submit{
      width: 100%;
    }
    .n-tab-pane{
      width: 100%;
      margin: auto;
    }
  }

</style>