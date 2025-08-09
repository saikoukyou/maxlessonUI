<template>
  <div class="overview">
    <div class="resultCard">
      <img
          v-if="flag === 1"
          src="../assets/images/payComplete.png"
          alt="success"
          class="resultIcon"
      />
      <img
          v-else
          src="../assets/images/payFail.png"
          alt="fail"
          class="resultIcon"
      />

      <div class="FrontWord" v-if="flag === 1">お支払いが完了しました</div>
      <div class="FrontWord" v-else>お支払いに失敗しました</div>

      <div class="resultText" v-if="flag === 1">
        パスワードがご登録のメールアドレスに送信されました。<br />
        ログイン後、すぐにレッスンの予約ができます！
      </div>
      <div class="resultText" v-else>
        アカウントは作成済みです。パスワードはご登録のメールに送信されています。<br />
        ログイン後、再度プランを選び決済してください。
      </div>

      <p class="emailNote">
        登録されたメールアドレスをご確認ください。
      </p>

      <div class="emailBox">{{ email }}</div>

      <div class="btnWrapper">
        <nuxt-link to="/login">
          <n-button type="primary" class="mainBtn">
            {{ flag === 1 ? "メール確認へ" : "ログイン画面へ" }}
          </n-button>
        </nuxt-link>
      </div>

      <hr style="margin: 30px auto;">

      <p class="emailHelpText">
        ※メールアドレスに誤りがあった場合や、30分以内にメールが届かない場合は、<br />
        下記ボタンをクリックしてお問い合わせください。
      </p>

      <div class="btnWrapper">
        <nuxt-link to="/help">
          <n-button class="secondaryBtn">
            <template #icon>
              <span>✉️</span>
            </template>
            メールが届かない方はこちら
          </n-button>
        </nuxt-link>
      </div>
    </div>
  </div>

</template>

<script setup>

import {onMounted} from "vue";

let email = ref('');
const route = useRoute();
const flag = ref(1);

onMounted(() => {
  email.value = route?.query?.email ?? '';
  flag.value = route?.query?.flag ? parseInt(route?.query?.flag) : 0;
});
</script>

<style scoped>
.overview {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
}


.emailNote {
  font-size: 13px;
  color: #666;
}

.emailBox {
  background: #f6f6f6;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 22px;
  width: 50%;
  margin: 2px auto 30px auto;
}

.btnWrapper {
  margin-bottom: 30px;
}

.mainBtn {
  background-color: #fc8a24;
  color: #fff;
  border-radius: 6px;
  padding: 12px 32px;
  font-size:16px;
  font-weight: bold;
}

.secondaryBtn {
  background-color: #fff;
  color: #fc8a24;
  border: 1px solid #fc8a24;
  border-radius: 6px;
  font-size: 14px;
  padding: 10px 20px;
}

.emailHelpText {
  font-size: 12px;
  color: #888;
  margin-bottom: 16px;
  line-height: 1.6;
}

@media (max-width: 520px) {
  .resultCard {
    padding: 25px 16px;
    margin-top: 12%;
  }

  .planTitleFront {
    font-size: 18px;
  }
  .emailBox{
    width: 80%;
    font-size: 16px !important;
  }

  .resultText,
  .emailNote,
  .emailBox {
    font-size: 13px;
  }

  .mainBtn,
  .secondaryBtn {
    font-size: 15px;
    width: 100%;
  }
}

</style>