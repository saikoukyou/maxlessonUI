<template>
  <ul class="userInfoMenu">
    <nuxt-link to="/mypage/userInfo"><li class="">基本情報</li></nuxt-link>
    <nuxt-link to="/mypage/userMail"><li class="">メール受信管理</li></nuxt-link>
    <nuxt-link to="/mypage/userFavorite"><li class="">お気に入り講師</li></nuxt-link>
    <nuxt-link to="/mypage/userProxy"><li class="">代講設定</li></nuxt-link>
    <nuxt-link to="/mypage/userProcedure"><li class="selected">各種お手続き</li></nuxt-link>
  </ul>

  <div class="userInfoContents" v-if="useStore?.studentInfo">

    <div class="blockL">お支払い方法</div>

    <div class="blockR" v-if="useStore?.studentInfo?.payjp_customer_id">
      <p>クレジットカ-ド決済</p>
      <div style="font-size: 12px; color: #424242;">
      弊社ではお客様のカード情報安全を最優先にしております。
      お支払いは、国内決済システムPAY.JPによるクレジットカード決済となります。
      弊社ではお客様のカード番号下4桁、カード有効期限と名義人の情報のみ保存しております。
      </div>

        <ul class="cardInfor">
          <li>カード番号</li>
          <li>**** **** **** {{useStore?.studentInfo?.payjp_card_last4}}</li>
          <li>有効期限</li>
          <li>名義人</li>
          <li> {{useStore?.studentInfo?.payjp_card_exp_month}}/{{useStore?.studentInfo?.payjp_card_exp_year}}</li>
          <li>{{useStore?.studentInfo?.payjp_card_name}}</li>
        </ul>

      <div v-if="useStore?.studentInfo?.payjp_cancel == 0">
        <ClientOnly>
        <card></card>
        </ClientOnly>
      </div>
      <div v-else>
        <n-button @click="deleteCard">カードを削除する</n-button>
      </div>
    </div>
    <div class="paypayUse" v-else-if="useStore?.studentInfo?.paypal_payer_id">
      <p style="font-size: 16px;">Paypal</p>
      <div style="font-size: 12px; color: #888888; font-weight: normal;">
<!--        <a @click="goBlogInfo(20)" class="menu_a6">退会手続き(Paypal)</a>-->
        <br>（サブスク停止ご希望の場合はPayPalでお手続きをお願いします。）
      </div>
    </div>

    <p class="userBorder"></p>

    <div class="inforBlock">

      <p>
        <div class="userRec">領収書</div>
        <nuxt-link class="actionBtn" to="/mypage/bill">発行する</nuxt-link>
      </p>


      <p v-if="useStore?.studentInfo?.is_corporate_member == 0">
        <div class="userRec">受講証明</div>
        <nuxt-link class="actionBtn" to="/mypage/attendanceRates">発行する</nuxt-link>
      </p>

      <p v-else>
        <div class="userRec">受講証明</div>
        <nuxt-link class="actionBtn" to="/mypage/attendanceRateTimes">発行する</nuxt-link>
      </p>


      <p class="actionBlock" v-if="useStore?.studentInfo?.subscription_id">
        <div class="userRec">サブスクプラン</div>
        利用停止は<nuxt-link class="actionBtn" to="/mypage/existMonth">こちら</nuxt-link><br>
      </p>


    </div>

    </div>

</template>


<script setup>

import {useRestInfoApi, useSaveRestInfoApi, useStudentDeleteCardApi, useStudentInfoDataApi} from "~/apis/student";
import {createDiscreteApi, NForm, NFormItem, NButton, NSelect, NCheckbox} from "naive-ui";
import {useMainStore} from "~/composables/store";
import {StarOutline} from "@vicons/ionicons5";

 //加载效果
 const loading = ref(false)
 const formRef = ref(null)
let start_date = ref([]);
let days_sel = ref([]);

const model = reactive({
  start_date: null,
  days_sel: null,
  agree: true,
})

const rules = computed(() => {
  let r = {
    start_date: [{
      required: true,
      max: 20,
      message: "休会開始日を入力してください",
      trigger: "blur"
    }],
    days_sel: [{
      required: true,
      max: 20,
      message: "休会期間を入力してください",
      trigger: "blur"
    }],
    agree: [{
      required: true,
      type: 'boolean'
    }, {
      validator(rule, value) {
        return value === true
      },
      message: "同意をチェックしてください",
      trigger: ["input", "blur"]
    }]
  }

  return r
});
const user = ref([]);
const useStore = useMainStore();

onMounted(async () => {
  user.value = useStore.studentInfo;
  const {pending, data: info  } = await useRestInfoApi();
  if (info?.value) {
    start_date.value = info?.value?.start_date ?? [];
    days_sel.value = info?.value?.days_sel ?? [];
  }
});


async function deleteCard() {
  const {pending, data: info  } = await useStudentDeleteCardApi()
  if (info?.value && info?.value.err === false) {
    useStore.useRefreshUserInfo();
    user.value = useStore.studentInfo;
    const { message } = createDiscreteApi(["message"])
    message.success(info?.value.err_msg);
  }
}

function goBlogInfo(bid) {
  const encodedBid = btoa(encodeURIComponent(bid+''));
  navigateTo({path:'/blog/info',query:{
      bid: encodedBid,
    }}, { replace: true })
}

</script>
<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 30%;
}
.n-select {
  width: 30%;
}
.blockL{
  font-weight: bold;
  vertical-align: top;
  width: 200px;
  padding: 40px;
  display: inline-block;
  font-size: 14px;
}
.blockR{width: 73%;
  padding: 40px;
  display: inline-block;
  font-size: 14px;
}

.userRec{ width: 200px;  display: inline-block; font-weight: bold;font-size: 14px; }
.inforBlock{padding: 0 40px;}
.actionBtn{display: inline-block;font-size: 14px;  color: var(--pink-dark); font-weight: bold; text-decoration: underline;}

.cardInfor{
  border-radius: 8px;
  background-color: #FCF8ED;
  width: 340px;
  padding: 20px;
  margin: 20px 0;
  position: relative;
}
.cardInfor li{height: 20px;}
.cardInfor li:nth-child(1){color: #848484; font-size: 15px; font-weight: bold; margin: 8px 0;}
.cardInfor li:nth-child(2){color: #424242; font-size: 16px;margin: 8px 0;}
.cardInfor li:nth-child(3){color: #848484; width: 50%; display: inline-block; font-weight: bold;}
.cardInfor li:nth-child(4){color: #848484; width: 50%; display: inline-block; font-weight: bold;}
.cardInfor li:nth-child(5){width: 50%; display: inline-block;}
.cardInfor li:nth-child(6){width: 50%; display: inline-block;}
.cardInfor li:nth-child(7){position: absolute; top: 20px; right: 20px; width: 24px;}

p{font-size: 14px;}
.userInfoContents{padding-bottom: 40px;}
.paypayUse{
  margin: 10px 44px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  background-color: #f4f4f4;
}

@media screen and (max-width: 520px) {
  .userRec{
    width: fit-content;
    margin-right: 20px;
    min-width: 100px;
  }
  .blockR{
    width: 100%;
    padding:10px 40px 0 40px;
  }
  .blockL{
    width: 100%;
    padding:40px 0 0 40px;
  }
  .cardInfor{
    width: 100%;
  }
}

</style>