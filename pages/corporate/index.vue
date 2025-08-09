<template>
	<NuxtLayout name="corporate" style="background-color: #EAF0F9;">
      <div class="TopBg">
        <div class="BizTitle">
          <img src="../../assets/images/houjinTitle.png" height="596" width="609"/>
          <a href="/corporate/download" class="Bizbutton">お役立ち資料</a>
        </div>
      </div>
      <div class="TopBgSp">
        <img src="../../assets/images/Hbg.png" width="100%"/>
      </div>

    <div class="houjinBg">
      <div class="contentBg">
        <div class="title">まずはお気軽にご相談ください</div>
        <img class="pandaintro" src="../../assets/images/pandaintro.png"/>
        <img class="pandaintrosp" src="../../assets/images/pandaintrosp.png"/>
        <nuxt-link to="/corporate/contact"><div class="custom-button custom-button-left">無料相談へ</div></nuxt-link>
        <nuxt-link to="/corporate/download"><div class="custom-button custom-button-right">お役立ち資料</div></nuxt-link>

        <ul class="phoneCall">
          <li>お気軽にお電話ください</li>
          <li><img src="../../assets/images/icon_phone.png"/></li>
          <li>03 - 6380 - 8893</li>
        </ul>
      </div>
    </div>

    <div class="title">3種類の研修形態</div>
    <ul class="pointBlock">
      <li>
        <img src="../../assets/images/POINT01.png" width="125"/>
        <span class="tt">マンツーマンレッスン</span>
        <span class="desdes">1回25分で、中国人講師とマンツーマンで中国語を学び、十分な会話量が確保できます。</span>
      </li>
      <li>
        <img src="../../assets/images/POINT02.png" width="125"/>
        <span class="tt">オンデマンド動画学習</span>
        <span class="desdes">1回10分程度の動画で、中国語や異文化理解の講義を受けられます。視聴後の試験もあります。</span>
      </li>
      <li>
        <img src="../../assets/images/POINT03.png" width="125"/>
        <span class="tt">中国現地研修</span>
        <span class="desdes">現地で語学の勉強も、ワークショップや企業視察も可能です。</span>
      </li>
    </ul>
  </NuxtLayout>
</template>
<script setup>
import {NButton} from "naive-ui";

definePageMeta({
  layout: false,
  middleware: ["only-visitor-corporate"]
})
</script>
<style scoped>

.BizTitle{width: 1130px; margin: 0 auto; padding-top: 50px;}

.TopBg{
  background-image: url("../../assets/images/houjinBg.png");
  background-repeat: no-repeat;
  background-size: 1800px;
  background-position: top center;
  width: 100%;
  background-color: #FFFFFF;
  height: 574px;
}

.Bizbutton {
  display: block;
  width: 373px;
  height: 70px;
  background-color: #E60012; /* Red background color */
  color: white; /* White text color */
  padding: 10px 20px; /* Padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  border-radius: 8px; /* Rounded corners */
  font-size: 27px; /* Font size */
  line-height: 56px;
  font-weight: bold; /* Bold text */
  border: none; /* No border */
  cursor: pointer; /* Pointer cursor on hover */
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.Bizbutton:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}


.houjinBg{background-color: #EAF0F9;}
.custom-button {
  width: 345px;
  height: 64px;
  display: inline-block;
  text-align: center;
  line-height: 64px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.custom-button-left {
  background-color: white;
  color: #2E6190;
  border: 2px solid #2E6190;
}

.custom-button-right {
  background-color: #2E6190;
  color: white;
  border: 2px solid #2E6190;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.contentBg{
  width: 1028px;height: 270px; text-align: center;
  margin: 54px auto 80px auto;
  padding: 10px;
  background-color: #F6F8FD;
  position: relative;
}

.title{font-family:Murecho; display: block; text-align: center; font-size: 30px; font-weight: bold; color: #2E6190; margin:36px auto 25px auto;}
.pandaintro{height: 90px; position: absolute; top: 23px; right: 200px;}

.phoneCall{margin-top: 20px;}
.phoneCall li{display: inline-block;}
.phoneCall li:nth-child(1){height: 46px; color: #2E6190; font-weight: bold; background-color: #EAF0FA; width: fit-content; line-height: 46px; padding: 0 30px; border-radius: 40px;}
.phoneCall li:nth-child(2){padding-top: 20px;height: 40px; }
.phoneCall li:nth-child(2) img{width: 26px; vertical-align: center; margin:0 16px; line-height: 20px;}
.phoneCall li:nth-child(3){font-size: 32px; vertical-align: bottom; padding-bottom:6px; font-weight: bold; color:#2E6190; }

.pointBlock{width: 1028px; margin: auto;}

.pointBlock .tt{font-size: 26px; color: #2E6190; margin: 20px 0 10px 0; font-weight: bold; display: block; width: 270px;}
.pointBlock .desdes{width: 270px; font-weight: bold; display: block; line-height: 24px; font-size: 15px; color: #2E6190;}

.pointBlock li{
  width: 1028px; height: 300px;
  background-color: #F6FAFF;
  background-size: 630px;
  background-position: right;
  background-repeat: no-repeat;
  padding: 60px;
  margin-bottom: 20px;
}

.pointBlock li:nth-child(1){background-image: url("../../assets/images/hpoint1.png");}
.pointBlock li:nth-child(2){background-image: url("../../assets/images/hpoint2.png");}
.pointBlock li:nth-child(3){background-image: url("../../assets/images/hpoint3.png");}

.pandaintrosp{
  display: none;
}
.TopBgSp{
  display: none;
}

@media screen and (max-width: 520px) {
  .TopBg{
    display: none;
  }
  .contentBg{
    width: 100%;
    height: auto;
    padding: 0;
    margin: auto;
  }
  .title{
    width: 80%;
    padding: 5% 5% 0 5%;
    line-height: normal;
    margin: 20px auto;
  }
  .custom-button{
    width: 80%;
    margin-bottom: 4%;
  }
  .pandaintro{
    display: none;
  }
  .phoneCall{
    margin-top: 0;
    margin-bottom: 10px;
  }
  .phoneCall li:nth-child(3){
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .pointBlock{
    width: 100%;
  }
  .pointBlock li{
    width: 100%;
    height: 380px;
    background-position: bottom;
    background-size: 100%;
    padding: 5% 10%;
  }
  .pointBlock li img{
    width: 90px;
  }
  .pointBlock .desdes{
    width: 100%;
  }
  .pointBlock .tt{
    width: 100%;
  }
  .pandaintrosp{
    display: block;
    margin: -20px auto -20px auto;
    height: 100px;
  }
  .TopBgSp{
    display: block;
  }
}
</style>
