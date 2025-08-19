<template>
  <div class="blockW">
    <h5>サブスクプランの停止手続き</h5>
    <ul class="eventBlock">
      <li>総合コース「ずっと30％オフ」を適用中のサブスクを停止した場合、<br>キャンペーン適用は終了となります。</li>
      <li>キャンペーン内容：<span>体験期間中に入会の場合、総合コースがずっと３０％OFF</span></li>
      <li>
        利用停止手続きを行いましたら、当該キャンペーンが終了となります。
        レッスン再開時に適用されなくなりますので、ご注意ください。</li>
      <li>
        利用停止をご希望の場合は、下のボタンをクリックし、手続きをお願い致します。
        利用停止の手続きは、アカウント有効期限内に行ってください。
        お支払いいただきました料金に関しましては返金できかねますので、ご了承ください。
        <br>
        <span>※利用停止の手続きをされても、有効期限まではアカウントをご利用いただけます。</span>
      </li>
    </ul>

    <div class="btnGroup">
      <nuxt-link class="backBtn" to="/mypage/userProcedure">
        <n-button>戾る</n-button>
      </nuxt-link>
      <n-button class="yesBtn" @click="exitMonth">上記内容に同意した、停止する。</n-button>
    </div>

  </div>

</template>


<script setup>

import {
  useStudentExitMonthApi, useStudentInfoDataApi,
} from "~/apis/student";
import {createDiscreteApi, NButton, NInput, NModal, NTable} from "naive-ui";
import {useMainStore} from "~/composables/store";

 //加载效果
const loading = ref(false)
const list = ref([]);
const useStore = useMainStore();
const user = ref([]);
const { dialog } = createDiscreteApi(["dialog"])

onMounted(async () => {
  const {pending, data: info  } = await useStudentInfoDataApi();
  if (info?.value) {
    if (!info?.value.payjp_customer_id) {
      useStore.setActiveUrl("/mypage/mypageReserved");
      return navigateTo("/mypage/mypageReserved", { replace: true });
    }
    user.value = info?.value;
  }
});

const exitM = async () => {
  const {pending, data: info  } = await useStudentExitMonthApi();
  const { message } = createDiscreteApi(["message"]);
  if (info?.value && info?.value.err == false) {
    useStore.useRefreshUserInfo();
    message.success(info?.value?.err_msg);
  } else {
    if (info?.value?.err_msg) {
      message.error(info?.value.err_msg);
    }
  }
}

async function exitMonth() {
  const d = dialog.warning({
    content: "お客様は利用停止手続きを済ませ、クレジットカードの自動引き落としは停止されます。" +
        "誤作動防止のため、10秒後に停止ポタンが表示されます。",
    positiveText: "停止する",
    negativeText: "前のペ-ジに戾る",
    positiveButtonProps: {disabled: true},
    onPositiveClick: () => {
      exitM();
    },
    onNegativeClick: async () => {
      return navigateTo("/mypage/userProcedure", { replace: true });
    },
  });

  let timer = ref(10);
  let interval = setInterval(() => {
    if (timer.value === 0) {
      d.positiveButtonProps.disabled = false;
      d.positiveText = "停止する";
      clearInterval(interval)
    } else {
      // console.log('timer.value:'+timer.value);
      timer.value --;
      d.positiveText = "停止する("+timer.value+")";
    }
  }, 1000);
}

</script>
<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 30%;
}
.n-select {
  width: 30%;
}

.eventBlock{color: #424242; text-align: center; font-size: 16px;
  padding: 20px 50px 50px 50px; ;background-color: #FDF9F0;
  width: 100%;
  margin: 20px auto;
  line-height: 30px;
}
.eventBlock li:nth-child(1){font-size: 16px; font-weight: bold;}
.eventBlock li:nth-child(2){font-weight: bold;}
.eventBlock li:nth-child(2) span{color: var(--pink-dark); font-weight: bold;}
.eventBlock li:nth-child(3){font-size: 11px;}
.eventBlock li:nth-child(4){font-size: 13px; margin-top: 10px; padding: 30px; background-color: #FFFFFF; line-height: 20px;}
.eventBlock li:nth-child(4) span{color: var(--pink-dark);}


.btnGroup{width: 400px; margin: auto; text-align: center;}
@media screen and (max-width: 520px) {
  .yesBtn{
    display: block;
    margin: auto;
  }
  .btnGroup{
    width: 100%;
    margin-bottom: 6%;
  }
  .eventBlock{
    padding: 20px 20px 50px 20px;
  }
}
</style>