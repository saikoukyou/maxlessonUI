<template>
  <div class="">


<div style="height: 90px; width: 100%;"></div>

<section class="contentsHeader">
  <h2 title="SIGN UP"><img src="~/assets/SVG/titleBefore.svg" alt="" class="titleBefore"> 体験登録　メール認証</h2>
</section>

  <section class="contentsWrap LoginUI mgt0" style="height:auto;padding-bottom: 20px;">
    <p class="SignUpFlow-title">登録の流れ ＜＜体験登録無料・教材費無料・入会費無料＞＞</p>
    <ul class="SignUpFlow"><li><span>体験登録</span></li><li><span>体験内容を選ぶ</span></li><li><span>料金発生</span></li></ul>
    <p class="SignUpFlow-descript">ご自身で課金の手続きを行わない限り、料金は発生しません</p>
    <div style="height: 12px;"></div>
    <h2 class="SignUpFlash">認証メールを送信しました</h2>
    <div class="SignUpMail">
      <div class="SignUpFlashDetail">
        <p class="title">まだ登録は完了していません</p>
        <p class="descript">「{{query.email}}」へ認証メールを送信しました。<br>
          {{query.from_email}}から届いたメールに記載されているURLを開いて、登録完了してください。<br>
          URLの有効期限は{{query.valid_period}}です。</p>
      </div>
      <p class="out-title">ご登録内容</p>
      <div class="SignUpMailConfirm">
        <ul class="list">
          <li>お名前</li>
          <li>{{query.last_name}} {{query.first_name}}</li>
          <li>メールアドレス</li>
          <li>{{query.email}}</li>
          <li>パスワード</li>
          <li>セキュリティ上表示できません</li>
<!--          <li>メールマガジン</li>-->
<!--          <li>受信する</li>-->
        </ul>
      </div>
      <p class="out-title">認証メールが届かない場合、以下をご確認ください</p>
      <div class="SignUpMailNotes">
        <ul>
          <li>1.メールアドレスの入力間違い</li>
          <li>{{query.email}}宛てに、メールを送付しています。間違えた場合は、会員登録ページより
            登録し直してください。</li>
          <li>２.メールの受信設定</li>
          <li>{{query.from_email}}が受信拒否設定に含まれていないか、迷惑メールのフォルダに入っていないか、
            ご確認ください。</li>
        </ul>
      </div>
    </div>

  </section>

    <div style="height: 8vh;"></div>

  </div>
</template>

<script setup>
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
let query = route.query;
//ui布局
definePageMeta({
  // layout: "login",
  middleware: ["only-visitor"]
})
</script>
<style lang="scss" scoped>
.SignUpFlash {
  font-size: 23px;
  font-weight: 700;
  text-align: center;
  margin: 5vh;
}
.SignUpFlashDetail .title{
  font-size: 18px;
  color: red;
  text-align: center;
  font-weight: 700;
  margin-bottom: 4vh;
}
.out-title {
  margin: 5vh 10% 1vh;
  font-size: 18px;
  font-weight: 700;
}
.learn-type-div{
  font-size: 15px;
}
</style>