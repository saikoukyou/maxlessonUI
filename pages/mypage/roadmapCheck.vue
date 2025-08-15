<template>

  <div class="my-curriculum">
  <div class="upBlock">
    <h5>MYカリキュラム</h5>
    <div class="des">
      難易度別やジャンル別に多数教材をご用意しておりますが、お客様のニーズに合わせて、オーダーメイドのMYカリキュラムを作りましょう！
    </div>
    <!--    <div><nuxt-link class="actionBtn" to="/mypage/textbookBusiness?type=">教材一覧</nuxt-link></div>-->
  </div>
    <div class="step-container">
      <div class="step">Step1 ヒアリングシート</div>
      <div class="step">Step2 中国語文法テスト</div>
      <div class="step">Step3 MYカリキュラム完成</div>
    </div>
  <div class="downBlock">
    <p class="titleB">完成しました</p>
    <p class="titleD">
      ご回答ありがとうございました。内容を提出しました。<br>
    お客様のＭＹカリキュラムが表示されるまで、3営業日ほどお時間を頂く場合があります。<br>
    しばらくお待ちください。</p>

    <!--曾經製作過路線圖的學生才顯示這段話-->
    <span>※過去のMYカリキュラム一覧は<nuxt-link to="/mypage/roadmap"><span class="orangeW">こちら</span>へ</nuxt-link></span>

  </div>
  </div>

</template>

<script setup>
// definePageMeta({
//   middleware: 'auth',
//   layout: 'mypage'
// });

</script>

<style scoped>
.downBlock{
  text-align: center;
}
  .downBlock .titleB{
    margin: 20px 0 10px 0;
    font-size: 24px;
    font-weight: bold;
  }
  .downBlock .titleD{
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
    margin-bottom: 10px;
  }
  .downBlock span{
    font-size: 13px;
  }
  .downBlock span.orangeW{
    color: #FA8373;
    font-weight: bold;
    text-decoration: underline;
  }

.step:nth-child(1)::after {
  content: "";
  position: absolute;
  right: -20px;
  z-index: 999;
  top: 50%;
  transform: translateY(-50%);
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid #D9D9D9;
}
.step:nth-child(2)::after {
  content: "";
  position: absolute;
  right: -20px;
  z-index: 999;
  top: 50%;
  transform: translateY(-50%);
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid #BDBDBD;
}
.step:nth-child(1) {
  background-color: #D9D9D9;
}
.step:nth-child(2) {
  background-color: #BDBDBD;
}
.step:nth-child(3) {
  background-color: #FA8373;
  font-weight: bold;
}
@media screen and (max-width: 520px) {
  .step:nth-child(1)::after {
    display: none;
  }
  .step:nth-child(2)::after {
    display: none;
  }
}
</style>