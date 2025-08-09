<template>
  <NuxtLayout name="corporate">
    <div class="corBlock">
      <span class="cortt">お問い合わせ</span>
      <span class="cordesdes">Inquiry</span>
    </div>

    <div style="background-color:#EAF0F9; padding:20px;">
    <div>
      <div class="downloadBlock" v-if="content">
        <div class="downloadImg">{{content}}</div>
      </div>
      <div>
        <n-form ref="formRef" :model="form"
                :rules="rules"
                size="small"
                label-placement="left"
                label-width="220px"
                label-align="left"
                require-mark-placement="right-hanging"
                :style="{
                  maxWidth: '640px'
                }">
          <div class="line-with-text">
            <span>下記のフォームにご記入ください。</span>
          </div>
          <n-form-item label="貴社名" path="corporate_name">
            <n-input class="SignInput" clearable v-model:value="form.corporate_name"
                     placeholder="貴社名" />
          </n-form-item>
          <n-form-item label="お名前" path="person_name">
            <n-input class="SignInput" clearable v-model:value="form.person_name"
                     placeholder="お名前" />
          </n-form-item>
          <n-form-item label="部署名" path="department">
            <n-input class="SignInput" clearable v-model:value="form.department"
                     placeholder="部署名" />
          </n-form-item>
          <n-form-item label="役職" path="position">
            <n-select name="position" id="position" v-model:value="form.position" :options="positionOptions" placeholder="役職" ></n-select>
          </n-form-item>
          <n-form-item label="返信を希望するメールアドレス" path="email">
            <n-input class="SignInput" clearable v-model:value="form.email"
                     placeholder="sample@mail.com" />
          </n-form-item>
          <n-form-item label="電話番号" path="tel">
            <n-input class="SignInput" clearable v-model:value="form.tel"
                     placeholder="電話番号" />
          </n-form-item>
          <n-form-item label="お問い合わせ事項" path="type">
            <n-select name="question" id="question" v-model:value="form.question" :options="questionOptions" placeholder="" ></n-select>
          </n-form-item>
          <n-form-item label="お問い合わせ内容" path="memo">
            <n-input id="memo" name="memo" type="textarea" class="SignInput" v-model:value="form.memo" :autosize="{minRows: 8,maxRows: 12,}" clearable placeholder="お問い合わせ内容"></n-input><br>
          </n-form-item>
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span style="padding-top: 8px; display: inline-block">送信</span>
          </n-button>

        </n-form>
        <p>{{ error }}</p>
      </div>
    </div>

      <ul class="contactBg">
        <li>お気軽にお電話ください</li>
        <li>03 - 6380 - 8893<span>（平日10時～18時）</span></li>
      </ul>

    </div>
  </NuxtLayout>
</template>
<script setup>
import {createDiscreteApi, NForm, NButton, NFormItem, NInput, NSelect} from "naive-ui";
import {useBusinessSaveContactDataApi, useSaveContactDataApi} from "~/apis";
import {useMainStore} from "~/composables/store";

definePageMeta({
  layout: false,
});

let questionOptions = [{label: '機能や料金を知りたい',value: '機能や料金を知りたい'},{label: '導入検討中',value: '導入検討中'},{label: 'その他',value: 'その他'}];
let positionOptions = [{label: '経営者/役員',value: '経営者/役員'},{label: '本部長クラス',value: '本部長クラス'},{label: '部長クラス',value: '部長クラス'},{label: '課長クラス',value: '課長クラス'},{label: '主任クラス',value: '主任クラス'},{label: 'メンバー',value: 'メンバー'}];
const loading = ref(false)
const formRef = ref(null)
const form = reactive({
  biz: "",
  corporate_name: "",
  person_name:"",
  department:"",
  position:null,
  email:"",
  tel:"",
  question:null,
  memo:"",
})

const rules = computed(() => {
  let r = {
    corporate_name: [{
      required: true,
      max: 250,
      message: "250文字未満の貴社名を入力してください",
      trigger: "blur"
    }],
    person_name: [{
      required: true,
      max: 250,
      message: "250文字未満のお名前を入力してください",
      trigger: "blur"
    }],
    department: [{
      required: true,
      max: 250,
      message: "250文字未満の部署名を入力してください",
      trigger: "blur"
    }],
    position: [{
      required: true,
      max: 250,
      message: "250文字未満の役職を入力してください",
      trigger: "blur"
    }],
    email: [{
      required: true,
      min: 4,
      max: 30,
      message: "正しいメールを入力してください",
      trigger: "blur"
    }],
    tel: [{
      required: true,
      max: 30,
      message: "電話番号を入力してください",
      trigger: "blur"
    }],
    question: [{
      required: true,
      message: "お問い合わせ事項を入力してください",
      trigger: "blur"
    }],
    memo: [{
      required: true,
      max: 500,
      message: "500文字未満のお問い合わせ内容を入力してください",
      trigger: "blur"
    }],
  }

  return r
})
const content = ref('');
const route = useRoute();
const useStore = useMainStore();
const corinfo = useStore.corporateInfo;
if (corinfo) {
  form.corporate_name = corinfo.corporate_name;
  form.person_name = corinfo.person_name;
}
if (route && route?.query?.content) {
  content.value = route?.query?.content ?? '';
}
if (route && route?.query?.biz) {
  form.biz = route?.query?.biz ?? '';
}

const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true

    let {
      data,
      error
    } = await useBusinessSaveContactDataApi(form)

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

<style scoped>
.line-with-text {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 40px 0;
  font-size: 16px;
}

.line-with-text::before,
.line-with-text::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #4382b7);
}

.line-with-text::after {
  background: linear-gradient(to right, #4382b7, transparent);
}

.line-with-text span {
  padding: 0 1em;
  white-space: nowrap;
  color: #2e6190;
  font-weight: bold;
}

.downloadBlock{
  width: 1028px;
  margin: auto;
  display: block;
}

.corBlock{
  width: 100%;
  background-image: url("../../assets/images/scBg.png");
  color: #FFFFFF;
  background-size: cover;
  font-weight: bold;
  padding: 20px 0;
}
.cortt{display: block; width: 1080px; margin: auto; font-size: 32px; font-family: Murecho;}
.cordesdes{display: block; width: 1080px; margin:10px auto;}

::v-deep .n-form{
  background-color: rgba(255, 255, 255, 0.5);
  margin: auto;
  max-width: 1028px !important;
  padding: 10px 50px 20px 50px;
}

.n-input,.n-select{
  width: 60%;
  background-color: white;
}

.n-input--textarea{
  width: 100%;
}
::v-deep .n-form-item-label{
  font-size: 15px;
  margin-top: 5px;
  color: #2E6190;
  font-weight: bold;
}

.n-button{
  background-color: #2E6190;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 54px;
  margin: 20px auto;
  display: block;
  text-align: center;
  font-weight: bold;
}
.n-button:hover {
  background-color: #2E6190;
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.n-button__content span{
  display: block;
  margin: auto;
  padding-top: 4px !important;
}


.contactBg{
  background-image: url("../../assets/images/bubblebg.png");
  background-size: cover;
  height: 160px;
  margin: 20px auto;
  width: 1028px;
  position: relative;
}

.contactBg li:nth-child(1){font-size: 27px;font-weight: bold; color: #2E6190;
  margin: auto;
  text-align: center;
  padding: 40px 0 0 60px;}
.contactBg li:nth-child(2){font-size: 44px;font-weight: bold;
  color: #2E6190; background-image: url("../../assets/images/icon_phone.png");
  background-repeat: no-repeat;
  padding-left: 144px;
  background-size: 32px;
  background-position: 296px 9px;
  margin-left: 40px;
  margin-top: 10px;
  text-align: center;
}
.contactBg li:nth-child(2) span{font-size: 13px;}


@media screen and (max-width: 520px) {
  .downloadImg{
    transform: scale(0.9);
    background-size: cover;
    background-position: right;
  }
  .downloadBlock{
    width: 100%;
    margin: auto;
    display: block;
  }
  .cortt{display: block; width: 80%; margin: auto; font-size: 32px; font-family: Murecho;}
  .cordesdes{display: block; width: 80%; margin:10px auto;
  }

  .contactBg{
    width: 100%;
  }
  .contactBg li:nth-child(1){
    width: 80%;
    display: block;
    margin: auto;
    padding: 20px 0 0 0;
    font-size: 22px;
  }
  .contactBg li:nth-child(2){
    background-image: none;
    font-size: 30px;
    margin-left: 0;
    padding-left: 0;
  }
  .contactBg li:nth-child(2) span{
    display: block;
    margin-top: 10px;
  }
  .contactBg{
    height: fit-content;
    padding-bottom: 20px;
  }


    .n-form-item {
      display: block;
      flex-direction: column;
      margin-bottom: 10px;
      width: 100%;
    }

    .n-input,
    .n-select,
    .n-input--textarea {
      width: 100% !important; /* 讓下拉選單和textarea都佔滿整行 */
      text-align: left;
      background-color: white;
    }
  ::v-deep .n-form-item-label{
    font-size: 14px;
    margin-top: 5px;
    color: #2E6190;
    font-weight: bold;
    width: 100%;
  }
  ::v-deep .n-form-item.n-form-item--left-labelled .n-form-item-label{
    display: block;
  }
  ::v-deep .n-form{
    margin: 0 auto;
    padding: 1px 30px;
  }



}

</style>
