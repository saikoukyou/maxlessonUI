<template>

    <div class="netchina_contents">
      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/userInfo"><li class="">基本情報</li></nuxt-link>
        <nuxt-link to="/mypage/userMail"><li class="selected">メール受信管理</li></nuxt-link>
        <nuxt-link to="/mypage/userFavorite"><li class="">お気に入り講師</li></nuxt-link>
        <nuxt-link to="/mypage/userProxy"><li class="">代講設定</li></nuxt-link>
        <nuxt-link to="/mypage/userProcedure"><li class="">各種お手続き</li></nuxt-link>
      </ul>
      <div class="userInfoContents">
        <n-form  ref="formRef" :model="form" :rules="rules" size="small">
        <div class="userInfoColumn">
          <n-form-item :show-label="false" path="receive_email" class="myBlock">
            <label class="titleC">受信用メールアドレス</label>
            <n-input class="mailWidth" type="text" v-model:value="form.receive_email" clearable placeholder=""></n-input>
          </n-form-item>
          <span class="tipWord">ログイン用アドレスと違うものでも可能。</span>
        </div>
        <p class="userBorder"></p>
        <div class="userInfoColumn">
          <n-form-item :show-label="false" path="reservation_email">
            <label class="titleC">レッスン予約メール</label>
            <div class="learn-type-div">
              <input class="custom-radio" type="radio" v-model="form.reservation_email" :value="1" name="reservation_email">
              <label>受信する</label>
            </div>
            <div class="learn-type-div">
              <input class="custom-radio" type="radio" v-model="form.reservation_email" :value="2" name="reservation_email">
              <label>受信しない</label>
            </div>
          </n-form-item>
        </div>
        <p class="userBorder"></p>


          <div class="userInfoColumn">
            <n-form-item :show-label="false" path="cancel_email">
              <label class="titleC">予約キャンセルメール</label>
              <div class="learn-type-div">
                <input class="custom-radio" type="radio" v-model="form.cancel_email" :value="1" name="cancel_email">
                <label>受信する</label>
              </div>
              <div class="learn-type-div">
                <input class="custom-radio" type="radio" v-model="form.cancel_email" :value="2" name="cancel_email">
                <label>受信しない</label>
              </div>
            </n-form-item>
          </div>
          <p class="userBorder"></p>

          <div class="userInfoColumn">
            <n-form-item :show-label="false" path="marketing_email">
              <label class="titleC">メルマガ</label>
              <div class="learn-type-div">
                <input class="custom-radio" type="radio" v-model="form.marketing_email" :value="1" name="marketing_email">
                <label>受信する</label>
              </div>
              <div class="learn-type-div">
                <input class="custom-radio" type="radio" v-model="form.marketing_email" :value="2" name="marketing_email">
                <label>受信しない</label>
              </div>
            </n-form-item>
          </div>
          <p class="userBorder"></p>

          <div class="userInfoColumn">
            <n-form-item :show-label="false" path="news_email">
              <label class="titleC">ニュースレター</label>
              <div class="learn-type-div">
                <input class="custom-radio" type="radio" v-model="form.news_email" :value="1" name="news_email">
                <label>受信する</label>
              </div>
              <div class="learn-type-div">
                <input class="custom-radio" type="radio" v-model="form.news_email" :value="2" name="news_email">
                <label>受信しない</label>
              </div>
            </n-form-item>
          </div>


          <p class="userBorder"></p>

        <div class="userInfoButtonArea">
          <n-button class="Submit" style="margin-top: 20px;" type="submit" @click="onSubmit" :loading="loading">
            <span style="display: inline-block">送信</span>
          </n-button>
        </div>

        </n-form>
      </div>


    </div>


</template>


<script setup>

import {useStudentInfoDataApi, useUpdateStudentInfoDataApi} from "~/apis/student";
 import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NSelect, NRadio, NRadioGroup} from "naive-ui";
import {useMainStore} from "~/composables/store";

//  definePageMeta({
//     middleware: 'auth',
//     layout: 'mypage'
// });
 //加载效果
 const loading = ref(false)
 const formRef = ref(null)
const form = reactive({
  receive_email: "",
  reservation_email:"",
  cancel_email:"",
  marketing_email:"",
  news_email:"",
  flag:'email'
})

const rules = computed(() => {
  let r = {
    receive_email: [{
      required: false,
      max: 250,
      message: "正しいメールを入力してください",
      trigger: "blur"
    }],
    reservation_email: [{
      required: true,
      type: 'integer',
      message: "レッスン予約メールを選択してください",
      trigger: "blur"
    }],
    cancel_email: [{
      required: true,
      type: 'integer',
      message: "予約キャンセルメールを選択してください",
      trigger: "blur"
    }],
    marketing_email: [{
      required: true,
      type: 'integer',
      message: "メルマガを選択してください",
      trigger: "blur"
    }],
    news_email: [{
      required: true,
      type: 'integer',
      message: "ニュースレターを選択してください",
      trigger: "blur"
    }],
  }

  return r
});
const useStore = useMainStore();
onMounted(async () => {
  let info = useStore.studentInfo
  form.receive_email = info?.receive_email ?? '';
  form.reservation_email = info?.reservation_email ?? 0;
  form.cancel_email = info?.cancel_email ?? 0;
  form.marketing_email = info?.marketing_email ?? 0;
  form.news_email = info?.news_email ?? 0;
});
//  const {pending, data: info  } = await useStudentInfoDataApi();
//  // console.log('studentinfo:'+JSON.stringify(info));
//
//  // let chineseOptions = ref([]);
//  // console.log('chinese_level:'+JSON.stringify(info.value.map.chinese_level));
// if (info?.value) {
//   useStore.setStudentInfo(info?.value);
//   form.receive_email = info.value.receive_email;
//   form.reservation_email = info.value.reservation_email;
//   form.cancel_email = info.value.cancel_email;
// }

 const onSubmit = () => {
   formRef.value.validate(async (errors) => {
     if (errors) return;

     loading.value = true

     let {
       data,
       error
     } = await useUpdateStudentInfoDataApi(form)

     loading.value = false

     if (error?.value) return;

     const { message } = createDiscreteApi(["message"])
     if (data?.value && data.value.err == false) {
       useStore.useRefreshUserInfo();
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

 useEnterEvent(() => onSubmit())
</script>
<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 30%;
  margin-left: 46px;
}
.n-select {
  width: 30%;
}
.userInfoColumn{padding: 0 40px;}

label{margin-right: 20px; min-width: 150px;}
.n-input{min-width: fit-content;}

.userInfoContents{
  padding: 40px 0;
}
::v-deep .n-form-item-feedback-wrapper{
  display: none;
}
.userBorder{
  margin: 8px auto;
}
.learn-type-div{
  font-size: 14px;
}
.tipWord{
  font-size: 10px;
  display: block;
  color: #AAAAAA;
  text-align: left;
  margin-top: -12px;
  margin-left: 0;
  margin-bottom: 20px;
}
.titleC{
  margin-top: 0;
  text-align: left;
}
.mailWidth{
  width: 360px !important;
}

@media screen and (max-width: 520px) {
  label{margin-right: 4px;}
  .mailWidth{
    width: 100% !important;
  }
  .userInfoColumn{
    padding: 0 30px;
  }
  .n-form-item-blank{
    display: block;
  }
  .titleC{
    width: 80px;
    min-width: auto !important;
  }
  .userInfoButtonArea{
    margin-top: 20px;
  }
  .n-form-item-blank{
    display: block;
  }
  .tipWord{
    font-size: 11px;
    display: block;
    color: #AAAAAA;
    text-align: left;
    margin: 10px 4px 0 10px;
  }
  .n-input:not(.n-input--autosize) {
    margin-left:0;
  }

  ::v-deep(.myBlock .n-form-item-blank){
    display: block;
    text-align: left;
  }
  ::v-deep(.myBlock .n-form-item-blank input){
    width: 100%;
  }
  .n-input:not(.n-input--autosize){
    width: 100%;
  }
}
</style>