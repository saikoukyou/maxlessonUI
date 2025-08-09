<template>
  <div class="approve-main">
    <div v-if="ashow === 0" class="aprrove-title">
      <p class="contentsTitle">{{errMsg}}</p>
    </div>
    <div v-else class="aprrove-title">
      <p class="contentsTitle">アクティベーションに成功しました。<nuxt-link class="loginStyle" to="/login">ログイン</nuxt-link>してください。</p>
    </div>
  </div>
</template>
<script setup>
import {onMounted} from "vue";
import {createDiscreteApi} from "naive-ui";
import {useActiveBusinessStudentApi, useActiveStudentApi} from "~/apis/student";

let ashow = ref(0);
let errMsg = ref('');
const route = useRoute();
const { message } = createDiscreteApi(["message"]);
// console.log('activeroute:'+JSON.stringify(route.query));

onMounted(async () => {
  if (route && route?.query?.id) {
    const { data } = await useActiveBusinessStudentApi(route?.query?.id);
    // console.log('data:'+JSON.stringify(data));
    if (data?.value && data?.value.err === false) {
      ashow.value = 1;
    } else {
      ashow.value = 0;
      if (data?.value && data?.value.err_msg) {
        errMsg.value = data?.value.err_msg;
      }
    }

  }
})

</script>
<style scoped>
.approve-main {
  width:60%;
  margin:0 20%;
}
.aprrove-title{
  text-align: center;
  width: 550px; height: 130px; margin: 100px auto;
  vertical-align: center; background-color: #FFF9EC;
}
.loginStyle{
  text-decoration: underline;
  color: orange;
}
@media screen and (max-width: 520px) {
  width: 80%;
  height: auto;
  margin: 10% auto;
}
</style>
