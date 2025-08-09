<template>
	<NuxtLayout name="teacherout">
		<div page="teacher-login">
      <div class="loginpc">
			<div class="bg-login padding-xl col gap-xl justify-center font-size-xl">
				<h1>LOG IN</h1>
				<h1 class="font-size-xxl">BizCHINA<br>对外汉语网校</h1>
			</div>

			<section class="contentsWrap LoginUI" style="margin-top:0px;">
				<div class="contentsGrid Login">
					<div class="left">
						<p class="contentsTitle"></p>
						<n-form ref="formRef" :model="form" :rules="rules" size="large">
							<div class="form-lable-custom">邮箱<span></span><br /></div>
							<n-form-item :show-label="false" path="email">
								<n-input class="SignInput" clearable v-model:value="form.email"
									placeholder="sample@mail.com" />
							</n-form-item>
							<div class="form-lable-custom">密码<span></span><br /></div>
							<n-form-item :show-label="false" path="password">
								<n-input class="SignInput" clearable v-model:value="form.password" type="password"
									placeholder="*******" />
							</n-form-item>
							<n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
								<span style="padding-top: 8px; display: inline-block">登录</span>
							</n-button>

						</n-form>

						<div>

							<p>{{ error }}</p>

						</div>


						<NuxtLink to="/teacher/password">
							<p class="forgetPass">忘记密码？</p>
						</NuxtLink>

					</div>
				</div>
			</section>
      </div>
		</div>
	</NuxtLayout>
</template>
<script setup>
import {useMainStore} from "~/composables/store";

definePageMeta({
	layout: false,
	middleware: ["only-visitor-teacher"]
})

import {
	NForm,
	NInput,
	NFormItem,
	NButton,
	NAlert,
	NTag,
	createDiscreteApi
} from "naive-ui"
import { useTeacherLoginApi } from "~/apis/teacher";

const route = useRoute()
const type = ref("login")
const title = ref("ログイン")

//表单验证
const formRef = ref(null)
const form = reactive({
	email: "",
	password: "",
	// remember: 1
})
const error = ref(null);

const rules = computed(() => {
	let r = {
		email: [{
      type: 'email',
			required: true,
			message: "请输入正确的登录邮箱",
			trigger: "blur"
		}],
		password: [{
			required: true,
			message: "请输入密码",
			trigger: "blur"
		}],

	}
	if (type.value != "login") {
		r.repassword = [{
			required: true,
			message: "请输入确认密码",
		}, {
			validator: (rule, value, callback) => {
				if (value !== form.password) {
					callback(new Error("两次输入密码不一致"))
				} else {
					callback()
				}
			},
			trigger: ["blur", "input"]
		}]
	}
	return r
})

//加载效果
const loading = ref(false)
const useStore = useMainStore();
//回车事件
const onSubmit = () => {
	formRef.value.validate(async (errors) => {
		if (errors) return;

		loading.value = true

    useStore.teacherLogin(form);

		loading.value = false
	})
}

// useEnterEvent(() => onSubmit())

</script>
<style scoped>
  .contentsGrid{
    grid-template-columns: none;
  }
  .contentsWrap{
    padding: 0;
    width: auto;
  }
  .contentsGrid .left{
    border: 1px solid #CCCCCC;
    padding: 30px 60px 88px 60px;
  }
  .contentsTitle{
    padding-top: 0;
  }
  .n-form{
    width: 70%;
  }
  .Submit{
    width: 100%;
  }
  .contentsGrid .left .SignInput{
    width: 100%;
  }
  .forgetPass{
    width: 100%;
  }
  .contentsGrid .left{
    padding: 79px 60px 48px 60px;
  }
  @media screen and (max-width: 520px) {
    .contentsGrid .left{
      padding: 30px 0;
    }
    .Submit{
      width: 100%;
    }
    .contentsGrid .left .SignInput{
      width: 100%;
      text-align: left;
    }
    .form-lable-custom{
      text-align: left;
      margin-bottom: 5px;
    }
    .forgetPass{
      margin: auto;
    }
    .contentsTitle{
      padding-top: 0;
    }
  }
</style>