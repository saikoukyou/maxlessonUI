<template>
  <div class="select_helpContents">
    <h3>お問い合わせフォーム</h3>
    <n-form  ref="formRef" :model="model" :rules="rules" size="small">
      <ul class="widthPosition">
        <li>
        <p>お名前<span class="indeed">必須</span><br>
          <n-form-item :show-label="false" path="name">
            <n-input id="name" name="name" type="text" class="SignInput" v-model:value="model.name" clearable placeholder="山田 太朗"></n-input><br>
          </n-form-item>
        </p>
        </li>
        <li>
        <p>会員ID<br>
          <n-form-item :show-label="false" path="name">
            <n-input id="name" name="name" type="text" class="SignInput" v-model:value="model.id" clearable placeholder="" disabled></n-input><br>
          </n-form-item>
        </p>
        </li>
      </ul>
        <p>返信を希望するメールアドレス<span class="indeed">必須</span><br>
        <n-form-item :show-label="false" path="email">
          <n-input id="email" name="email" type="text" class="SignInput" v-model:value="model.email" clearable placeholder="sample@mail.com"></n-input><br>
        </n-form-item>
        </p>
      <div class="selectDivInner">
        <p>お問い合わせ事項<br>
        <n-form-item :show-label="false">
          <n-select name="question" id="question" v-model:value="model.question" :options="questionOptions" placeholder="">
            <!--              <option v-for="(level,lindex) in info.map.chinese_level" :value="lindex">{{level}}</option>-->
            <!--            <option value="">中級</option>-->
            <!--            <option value="">上級</option>-->
          </n-select>
        </n-form-item>
        </p>
<!--        <select id="time_select" onchange="">-->
<!--          <option value="レッスンについて" data-number="0">-->
<!--            レッスンについて-->
<!--          </option>-->
<!--          <option value="その他の質問" data-number="1">-->
<!--            その他の質問-->
<!--          </option>-->
<!--        </select>-->
      </div>
      <p>お問い合わせ内容<span class="indeed">必須</span><br>
        <n-form-item :show-label="false" path="body">
          <n-input id="body" name="body" type="textarea" class="SignInput" v-model:value="model.body" :autosize="{minRows: 8,maxRows: 12,}" clearable placeholder=""></n-input><br>
        </n-form-item>
      </p>
      <div class="userInfoButtonArea">
        <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
          <span>送信</span>
        </n-button>
      </div>
<!--        <textarea class="SignInput MailContent" type="text" name="password" value="" placeholder="お問い合わせ内容を入力してください"></textarea></p>-->
<!--      <p><input class="Submit" type="submit" name="submit" value="送信"></p>-->
    </n-form>
  </div>
  <div class="llbanner"></div>
</template>
<script setup>
import {createDiscreteApi, NForm, NButton, NFormItem, NInput, NSelect} from "naive-ui";
import {useSaveContactDataApi} from "~/apis";
import {useMainStore} from "~/composables/store";

let questionOptions = [{label: 'レッスンについて',value: 'レッスンについて'},{label: 'その他の質問',value: 'その他の質問'}];
const loading = ref(false)
const formRef = ref(null)
const model = reactive({
  name: "",
  email:"",
  body:"",
  id:""
})

const rules = computed(() => {
  let r = {
    name: [{
      required: true,
      max: 250,
      message: "お名前を入力してください",
      trigger: "blur"
    }],
    email: [{
      required: true,
      min: 4,
      max: 30,
      message: "正しいメールを入力してください",
      trigger: "blur"
    }],
    body: [{
      required: true,
      max: 500,
      message: "500文字未満のお問い合わせ事項を入力してください",
      trigger: "blur"
    }],
  }

  return r
});

const useStore = useMainStore();
const stuinfo = useStore.studentInfo;
if (stuinfo) {
  model.name = stuinfo.last_name + stuinfo.first_name;
  model.email = stuinfo.email;
  model.id = stuinfo.showId;
}

const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true

    let {
      data,
      error
    } = await useSaveContactDataApi(model)

    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data?.value && data?.value?.err == false) {
      message.success("送信成功")

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
.n-form{
  width: 80%;
  margin-top: 10px;
  margin-bottom: 6px;
}
.userInfoButtonArea{
  padding-bottom: 30px;
  margin-bottom: 20px;
}
.indeed{
  font-size: 12px;
  color: red;
  margin-left: 8px;
}
.selectDivInner{
  width: auto;
  display: block;
}
.widthPosition{
  margin-top: 24px;
}
.widthPosition li{
  width: 49%;
  display: inline-block;
}
.widthPosition li:nth-child(1){
  margin-right: 2%;
}


@media screen and (max-width: 520px) {
  .widthPosition li{
    text-align: left;
  }
  .n-form{
    text-align: left;
  }
}
</style>