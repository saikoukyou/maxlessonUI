<template>
	<div class="col gap-xl">
<!--		<h1 class="bold">アカウント情報</h1>-->
    <n-card title="アカウント情報" style="margin-bottom: 16px">
      <n-tabs type="line" animated>
        <n-tab-pane name="company" tab="会社情報">
          <n-form  ref="formRef" :model="form" :rules="rules" label-placement="left" label-width="10rem" size="large">
            <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap-l font-size-s">
              <div class="row items-center gap">
                <n-form-item path="email" label="メールアドレス">
                  <n-input type="text" v-model:value="form.email" placeholder="メールアドレス" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item label="パスワード">
                  <n-input type="password" v-model:value="form.password" placeholder="パスワード" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="corporate_name" label="会社名" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="form.corporate_name" placeholder="会社名" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="add1" label="住所" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="form.add1" placeholder="住所" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="person_name" label="担当者様お名前" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="form.person_name" placeholder="担当者様お名前" />
                </n-form-item>
              </div>
              <div class="row justify-center" style="margin-top: 20px;">
                <div class="button-submit" @click="onSubmit">保存する</div>
              </div>
            </div>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="header" tab="担当者情報">
          <n-form  ref="cformRef" :model="cform" :rules="crules" label-placement="left" label-width="10rem" size="large">
            <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap-l font-size-s">
              <div class="row items-center gap">
                <n-form-item path="leader_name1" label="ご担当者様氏名1" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_name1" placeholder="ご担当者様氏名1" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_email1" label="メールアドレス1" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_email1" placeholder="メールアドレス1" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_tel1" label="電話番号1" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_tel1" placeholder="電話番号1" />
                </n-form-item>
              </div>

              <hr>

              <div class="row items-center gap">
                <n-form-item path="leader_name2" label="ご担当者様氏名2" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_name2" placeholder="ご担当者様氏名2" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_email2" label="メールアドレス2" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_email2" placeholder="メールアドレス2" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_tel2" label="電話番号2" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_tel2" placeholder="電話番号2" />
                </n-form-item>
              </div>

              <hr>
              <div class="row items-center gap">
                <n-form-item path="leader_name3" label="ご担当者様氏名3" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_name3" placeholder="ご担当者様氏名3" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_email3" label="メールアドレス3" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_email3" placeholder="メールアドレス3" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_tel3" label="電話番号3" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_tel3" placeholder="電話番号3" />
                </n-form-item>
              </div>

              <hr>
              <div class="row items-center gap">
                <n-form-item path="leader_name4" label="ご担当者様氏名4" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_name4" placeholder="ご担当者様氏名4" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_email4" label="メールアドレス4" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_email4" placeholder="メールアドレス4" />
                </n-form-item>
              </div>
              <div class="row items-center gap">
                <n-form-item path="leader_tel4" label="電話番号4" label-style="font-size:14px;">
                  <n-input type="text" v-model:value="cform.leader_tel4" placeholder="電話番号4" />
                </n-form-item>
              </div>
              <div class="row justify-center">
                <div class="button-submit" @click="onSubmitCompany">保存する</div>
              </div>
            </div>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="contract" tab="利用契約">
          利用契約
        </n-tab-pane>
        <n-tab-pane name="secret" tab="秘密保持">
          秘密保持
        </n-tab-pane>
      </n-tabs>
    </n-card>

	</div>
</template>
<script setup>
import { ref } from "vue"
import { PersonOutline } from '@vicons/ionicons5'
import {useBusinessAccountIndexApi, useBusinessAccountUpdateApi} from "~/apis/corporate";
import {createDiscreteApi, NButton, NDatePicker, NForm, NFormItem, NInput, NRadio, NRadioGroup, NSpace,NCard,NTabs,NTabPane} from "naive-ui";

const times = [
	{ value: 0, text: 'いつでもアクセス可能' },
	{ value: 1, text: '公開期間を指定する' },
];
let init = {
  language: 'ja',
  height: 500,
  menubar: true,
  apiKey: '3dsqlo0vozq4j2g8q60stol6gc40z501uflwvezftrd28one',
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
    'image'
  ],
  toolbar: 'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat help | link image',
};
const form = reactive({
  email: '',
  password: '',
  corporate_name: '',
  add1: '',
  person_name: '',
  flag: 0,
});
const cform = reactive({
  leader_name1: '',
  leader_email1: '',
  leader_tel1: '',
  leader_name2: '',
  leader_email2: '',
  leader_tel2: '',
  leader_name3: '',
  leader_email3: '',
  leader_tel3: '',
  leader_name4: '',
  leader_email4: '',
  leader_tel4: '',
  flag: 1,
});
let formRef = ref(null);
let cformRef = ref(null);
let loading = ref(false);
const rules = computed(() => {
  let r = {
    email: [{
      type: 'email',
      required: true,
      message: "正しいログイン用メールアドレスを入力してください",
      trigger: "blur",
      max:128
    }],
    password: [{
      required: false,
      message: "6～18文字のパスワードを入力してください",
      trigger: "blur",
      min:6,
      max:18
    }],
    corporate_name: [{
      message: "请输入小于255个字符",
      trigger: "blur",
      max:255
    }],
    add1: [{
      message: "请输入小于255个字符",
      trigger: "blur",
      max:255
    }],
    person_name: [{
      message: "请输入小于255个字符",
      trigger: "blur",
      max:255
    }],
  }
  return r
})
const crules = computed(() => {
  let r = {
    leader_name1: [{
      // required: true,
      message: "请输入小于50个字符",
      trigger: "blur",
      max:50
    }],
    leader_email1: [{
      type: 'email',
      // required: true,
      message: "正しいメールアドレスを入力してください。",
      trigger: "blur",
      max:128
    }],
    leader_tel1: [{
      // required: true,
      message: "请输入正确的电话",
      trigger: "blur",
      max:13
    }],
    leader_name2: [{
      // required: true,
      message: "请输入小于50个字符",
      trigger: "blur",
      max:50
    }],
    leader_email2: [{
      type: 'email',
      // required: true,
      message: "正しいメールアドレスを入力してください。",
      trigger: "blur",
      max:128
    }],
    leader_tel2: [{
      // required: true,
      message: "请输入正确的电话",
      trigger: "blur",
      max:13
    }],
    leader_name3: [{
      // required: true,
      message: "请输入小于50个字符",
      trigger: "blur",
      max:50
    }],
    leader_email3: [{
      type: 'email',
      // required: true,
      message: "正しいメールアドレスを入力してください。",
      trigger: "blur",
      max:128
    }],
    leader_tel3: [{
      // required: true,
      message: "请输入正确的电话",
      trigger: "blur",
      max:13
    }],
    leader_name4: [{
      // required: true,
      message: "请输入小于50个字符",
      trigger: "blur",
      max:50
    }],
    leader_email4: [{
      type: 'email',
      // required: true,
      message: "正しいメールアドレスを入力してください。",
      trigger: "blur",
      max:128
    }],
    leader_tel4: [{
      // required: true,
      message: "请输入正确的电话",
      trigger: "blur",
      max:13
    }],
  }
  return r
})

const getInfo = async () => {
  const { data } = await useBusinessAccountIndexApi();
  if (data?.value) {
    form.person_name = data?.value.info?.person_name ?? '';
    form.email = data?.value.info?.email ?? '';
    form.corporate_name = data?.value.info?.corporate_name ?? '';
    form.add1 = data?.value.info?.add1 ?? '';

    cform.leader_name1 = data?.value.info?.leader_name1 ?? '';
    cform.leader_email1 = data?.value.info?.leader_email1 ?? '';
    cform.leader_tel1 = data?.value.info?.leader_tel1 ?? '';
    cform.leader_name2 = data?.value.info?.leader_name2 ?? '';
    cform.leader_email2 = data?.value.info?.leader_email2 ?? '';
    cform.leader_tel2 = data?.value.info?.leader_tel2 ?? '';
    cform.leader_name3 = data?.value.info?.leader_name3 ?? '';
    cform.leader_email3 = data?.value.info?.leader_email3 ?? '';
    cform.leader_tel3 = data?.value.info?.leader_tel3 ?? '';
    cform.leader_name4 = data?.value.info?.leader_name4 ?? '';
    cform.leader_email4 = data?.value.info?.leader_email4 ?? '';
    cform.leader_tel4 = data?.value.info?.leader_tel4 ?? '';
  }
}

onMounted(() => {
  getInfo();
})

function dateChange(value,strValue) {
  form.open_time_begin = strValue;
}

function dateChange2(value,strValue) {
  form.open_time_end = strValue;
}

const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true;

    const {data, error  } = await useBusinessAccountUpdateApi(form);

    loading.value = false

    if (error?.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data.value != null && data?.value.err === false) {
      message.success("保存成功")
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

const onSubmitCompany = () => {
  cformRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true;

    const {data, error  } = await useBusinessAccountUpdateApi(cform);

    loading.value = false

    if (error?.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data.value != null && data?.value.err === false) {
      message.success("保存成功")
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
<style lang="scss" scoped>
.form {
	.row {
		p {
			width: 100px;
		}

		input {
			width: 300px;
		}

		textarea {
			border: 1px solid var(--input-border-color);
			height: var(--input-height);
			outline: none;
			width: 500px;
		}
	}
}
</style>