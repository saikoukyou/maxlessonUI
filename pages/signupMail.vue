<template>
  <div style="background-color: #F9F9F9;">
    <section class="contentsHeaderSign">
      <div class="centerPosition">
        <span class="subTitle center">体験登録</span><br>
        <div class="signupDes"></div>
      </div>
    </section>

    <section class="contentsWrap LoginUI mgt0">
      <div class="stepImg2"></div>
      <div class="SignUpMail">
        <div class="SignUpFlashDetail">
          <p class="title">まだ登録は完了していません</p>
          <p class="descript"><span class="orangeWord">「{{ query.email }}」</span>へ認証メールを送信しました。<br>
            {{ query.from_email }}から届いたメールに記載されているURLを開いて、登録完了してください。<br>
            <span class="orangeWord">URLの有効期限は{{ query.valid_period }}日間時間です。</span></p>

          <!-- 按鈕放置位置 -->
          <button :class="buttonClass">
            {{ buttonText }}
          </button>

        </div>
        <p class="out-title">ご登録内容</p>
        <div class="SignUpMailConfirm">
          <ul class="list">
            <li>お名前</li>
            <li>{{ query.last_name }} {{ query.first_name }}</li>
            <li>メールアドレス</li>
            <li>{{ query.email }}</li>
            <li>パスワード</li>
            <li>セキュリティ上表示できません</li>
<!--            <li>メールマガジン</li>-->
<!--            <li>受信する</li>-->
          </ul>
        </div>
        <p class="out-title">認証メールが届かない場合、以下をご確認ください</p>
        <div class="SignUpMailNotes">
          <ul>
            <li>1.メールアドレスの入力間違い</li>
            <li>{{ query.email }}宛てに、メールを送付しています。間違えた場合は、会員登録ページより
              登録し直してください。</li>
            <li>２.メールの受信設定</li>
            <li>{{ query.from_email }}が受信拒否設定に含まれていないか、迷惑メールのフォルダに入っていないか、
              ご確認ください。</li>
          </ul>
        </div>
      </div>
    </section>

    <div style="height: 8vh;"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {

    useHead({
      script: [
        {
          innerHTML: `
        gtag('event', 'conversion', {
          'send_to': 'AW-16972081559/-i02CKWq-50aEL_48NwD',
          'value': 1.0,
          'currency': 'JPY'
        });
      `,
          type: 'text/javascript',
          body: true // 将脚本放在 body 底部
        }
      ]
    });

    const route = useRoute();
    const query = route.query;
    const countdown = ref(3);
    const isCountingDown = ref(true);

    const buttonClass = computed(() => {
      return {
        orangeButton: countdown.value > 0,
        grayButton: countdown.value <= 0,
      };
    });

    const buttonText = computed(() => {
      return countdown.value > 0
          ? `登録URLを送信中（${countdown.value}）`
          : '登録URLを送信しました';
    });

    const countdownTimer = () => {
      const timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer);
          isCountingDown.value = false;
        }
      }, 1000);
    };

    onMounted(() => {
      countdownTimer();
    });

    return {
      query,
      countdown,
      buttonClass,
      buttonText,
    };
  },
};
</script>

<style scoped>
.orangeButton {
  background-color: #ff7f00;
  color: white;
  width: 400px;
  height: 56px;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  text-align: center;
  margin: 16px auto 0 auto;
  display: block;
  border-radius: 8px;
  font-weight: bold;
}
.grayButton {
  background-color: #B9B9B9;
  color: white;
  width: 400px;
  height: 56px;
  border: none;
  cursor: not-allowed;
  text-align: center;
  font-size: 1.5em;
  margin: 16px auto 0 auto;
  display: block;
  border-radius: 8px;
  font-weight: bold;
}
.SignUpFlash {
  font-size: 23px;
  font-weight: 700;
  text-align: center;
}
.SignUpFlashDetail .title {
  font-size: 24px;
  color: #424242;
  text-align: center;
  font-weight: 700;
  margin-bottom: 1vh;
}
.out-title {
  margin: 4vh 10% 0;
  font-size: 18px;
  font-weight: 700;
}
.descript {
  text-align: center;
  line-height: 30px;
}
.orangeWord {
  color: var(--pink-dark);
  font-weight: bold;
}
.list li {
  margin-bottom: 1px;
  display: inline-block;
  padding: 16px 24px 16px 24px;
}
.list li:nth-child(odd) {
  background-color: #d0d0d0;
  color: #424242;
  width: 30%;
}
.list li:nth-child(even) {
  background-color: #ffffff;
  color: #424242;
  width: 70%;
}
@media screen and (max-width: 520px) {
  .grayButton {
    width: 90%;
  }
  .orangeButton {
    width: 90%;
  }
}
</style>
