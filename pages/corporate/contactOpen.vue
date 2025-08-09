<template>
  <div>
    <a v-show="false" ref="openRef" :href="url"></a>
  </div>
</template>
<script setup>
import {useBusinessSendAlarmEmailDataApi} from "~/apis";

definePageMeta({
  layout: false,
});

const openRef = ref(null);
const form = reactive({
  type:"",
  link:"",
  name:"",
  corporate_name:"",
  person_name:"",
  department:"",
  position:"",
  email:"",
  tel:"",
  question:"",
  memo:"",
})
const url = ref('');

const route = useRoute();

const sendAlarmEmail = async () => {
  let {
    data,
    error
  } = await useBusinessSendAlarmEmailDataApi(form);
  const aTag = openRef.value;

  if (aTag) {
    // 模拟点击事件
    aTag.click();
  }
}


onMounted(() => {
  if (route) {
    if (route?.query?.link) {
      url.value = route?.query?.link;
      form.link = route?.query?.link;
    }
    if (route?.query?.type) {
      form.type = route?.query?.type;
    }
    if (route?.query?.name) {
      form.name = route?.query?.name;
    }
    if (route?.query?.corporate_name) {
      form.corporate_name = route?.query?.corporate_name;
    }
    if (route?.query?.person_name) {
      form.person_name = route?.query?.person_name;
    }
    if (route?.query?.department) {
      form.department = route?.query?.department;
    }
    if (route?.query?.position) {
      form.position = route?.query?.position;
    }
    if (route?.query?.email) {
      form.email = route?.query?.email;
    }
    if (route?.query?.tel) {
      form.tel = route?.query?.tel;
    }
    if (route?.query?.question) {
      form.question = route?.query?.question;
    }
    if (route?.query?.memo) {
      form.memo = route?.query?.memo;
    }
    sendAlarmEmail();
  }
})

</script>
