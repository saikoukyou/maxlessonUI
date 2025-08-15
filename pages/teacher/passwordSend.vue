<template>
  <div class="pSend">
  <section class="contentsHeader">
    <div class="subPosition">
      <span class="subTitle">パスワードの再設定</span>
    </div>
  </section>

  <div class="FlashDetail">
    <p class="title">パスワード再設定はまだ完了していません。</p>
    <span class="des">
      <span class="orangeW">「{{email}}」</span>へパスワード変更用URLを送信しました。<br>
      {{from_email}}から届いたメールに記載されているURLを開いて、登録を完了してください。<br>
      <span class="orangeW">URLの有効期限は{{valid_period}}日間です。</span>
    </span>

    <!-- 按鈕位置 -->
    <button :class="buttonClass">
      {{ buttonText }}
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: "teacherout",
  middleware: ["only-visitor-teacher"]
})

const email = ref('');
const valid_period = ref('');
const from_email = ref('');

const route = useRoute();
if (route?.query) {
  if (route?.query?.email) {
    email.value = route?.query?.email;
  }
  if (route?.query?.valid_period) {
    valid_period.value = route?.query?.valid_period;
  }
  if (route?.query?.from_email) {
    from_email.value = route?.query?.from_email;
  }
}

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
      ? `パスワード変更用URLを送信中（${countdown.value}）`
      : 'パスワード変更用URLを送信しました';
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
</script>

<style scoped>
.FlashDetail {
  background-color: white;
  padding: 40px;
  width: 907px;
  margin: 70px auto 0 auto;
  text-align: center;
  border-radius: 10px;
}
.FlashDetail .title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1vh;
  color: #424242;
}
.orangeButton {
  background-color: #ff7f00;
  color: white;
  width: 400px;
  height: 56px;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
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
  font-size: 1.2em;
  margin: 16px auto 0 auto;
  display: block;
  border-radius: 8px;
  font-weight: bold;
}
.des{
  line-height: 30px;
  font-size: 0.9em;
}
.des .orangeW{
  color: #FA8373;
  font-weight: bold;
}
.pSend{
  background-color: rgb(249, 249, 249);
  padding-bottom: 100px;
}
.subDes{
  font-size: 14px;
  margin: 10px;
}
@media screen and (max-width: 520px) {
  .contentsHeader{
    margin-top: 0 !important;
  }
  .subPosition{
    padding-left: 0;
  }
}
</style>
