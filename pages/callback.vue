<template>
  <div></div>
</template>
<script setup>
import {useStudentDoExpressCheckoutApi} from "~/apis/plan";
import {createDiscreteApi} from "naive-ui";
import {onMounted} from "vue";

const route = useRoute();
const getPayStatus = async () => {
  if (route && route?.query && route?.query?.token) {
    // console.log('callback:'+JSON.stringify(route.query));
    const { data: paydata  } = await useStudentDoExpressCheckoutApi(route.query.token);

    if (paydata?.value) {
      if (paydata.value.err === false) {
        // console.log('支付成功');
        const { message } = createDiscreteApi(["message"]);
        message.success('支払いに成功しました。');
      }
    }
  }
}


onMounted(() => {
  getPayStatus();
})
</script>