<template>

    <div class="netchina_contents">

      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/userInfo"><li class="">基本情報</li></nuxt-link>
        <nuxt-link to="/mypage/userMail"><li class="">メール受信管理</li></nuxt-link>
        <nuxt-link to="/mypage/userFavorite"><li class="">お気に入り講師</li></nuxt-link>
        <nuxt-link to="/mypage/userProxy"><li class="selected">代講設定</li></nuxt-link>
        <nuxt-link to="/mypage/userProcedure"><li class="">各種お手続き</li></nuxt-link>
      </ul>

      <div class="userInfoContents">
        講師のやむを得ない事情で講師側からレッスンがキャンセルされることが稀にあります。
        下記の代講設定により、同じ時刻で代替の講師を自動手配します。（手配結果はメールにてお知らせします）
        <p class="userBorder"></p>

        <div class="userInfoColumn">
          <p>
            <span>代講設定</span>
          </p>
<!--          <div v-for="(tag,tindex) in tags">-->
<!--            <input class="custom-radio" type="radio" v-model="form.substitute_teaching_hope" :value="tindex" name="proxy" id="" style="margin-right:10px;">-->
<!--            <label>{{tag}}</label>-->
<!--          </div>-->
          <div v-for="(tag, tindex) in tags" :key="tindex" class="learn-type-div">
            <input class="custom-radio" type="radio" v-model="form.substitute_teaching_hope" :value="tindex" name="proxy">
            <label>{{ tag }}</label>
          </div>

<!--          <input type="radio" name="proxy" id="">-->
<!--          <p>お気に入り講師のみを、代替講師として手配する</p>-->
<!--          <input type="radio" name="proxy" id="">-->
<!--          <p>代替講師を手配せずにレッスンをキャンセルする</p>-->
        </div>

        <p class="userBorder"></p>

        <span class="userDes">
          代替の講師が手配できない場合、または代講設定なしの場合は、レッスンはキャンセルとなります。
          レッスンコマ数はサブスクプランの「返却コマ」またはチケットプランの「チケット」に返還いたします。
          （メールとマイページをご確認ください）
        </span>


        <div class="userInfoButtonArea">
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span style="display: inline-block">送信</span>
          </n-button>
        </div>

        <div>
        </div>
      </div>

    </div>

</template>


<script setup>

import {
  useDownloadAttendanceApi,
  useDownloadAttendanceRateApi,
  useStudentInfoDataApi,
  useUpdateStudentInfoDataApi
} from "~/apis/student";
 import {createDiscreteApi, NForm, NButton, NFormItem, NInput, NSelect} from "naive-ui";
import {fetchConfig} from "~/composables/useHttp";
import {useMainStore} from "~/composables/store";
// import axios from "axios";

//  definePageMeta({
//     middleware: 'auth',
//     layout: 'mypage'
// });
 //加载效果
const loading = ref(false)
const form = reactive({
  substitute_teaching_hope: "",
  flag: 'substitute'
})
let tags = ref([]);
let plans = ref([]);
let selectedPlan = ref(0);
const useStore = useMainStore();


onMounted(async () => {
  let info = useStore.studentInfo
  form.substitute_teaching_hope = info?.substitute_teaching_hope;
  tags.value = info?.map?.substitute_teaching_hope;
});
// const {pending, data: info  } = await useStudentInfoDataApi();
// if (info?.value) {
//   useStore.setStudentInfo(info?.value);
//   form.substitute_teaching_hope = info?.value.substitute_teaching_hope;
//   tags.value = info?.value.map?.substitute_teaching_hope;
//   showDownloadFile();
// }

const onSubmit = async () => {
  loading.value = true
  let {
    data,
    error
  } = await useUpdateStudentInfoDataApi(form)

  loading.value = false

  if (error.value) return;

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
}

</script>

<style scoped>
.n-input:not(.n-input--autosize) {
  width: 30%;
}
.n-select {
  width: 30%;
}
.userInfoContents {
  padding: 40px;
}
.userInfoColumn span {
  font-size: 16px;
  font-weight: bold;
  color: #424242;
}
.userInfoColumn .radio-container {
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  margin-left: 2px;
}

.userInfoButtonArea{margin-top: 30px;}


.userDes{
  font-size: 13px;
  margin-top: 60px;
}

.userBorder{margin-top: 30px; width: 100%;}
.userInfoContents{line-height: 20px;}


@media screen and (max-width: 520px) {
  .learn-type-div label{
    margin-left: 40px;
    margin-top: -22px;
    display: block;
  }
  .userInfoContents{
    line-height: normal;
  }
}

</style>


