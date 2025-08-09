<template>
  <NuxtLayout name="corporate">
    <div style="background-color: #EAF0F9; padding-bottom: 30px;">
      <div class="corBlock">
        <span class="cortt">大阪ホテル専門学校<br>
中国語オンライン会話「ネットチャイナ」導入事例インタビュー</span>
        <div class="spanTag">
          <span>サービス</span><span>グローバル人材育成</span><span>オンランン中国語研修</span>
        </div>
      </div>

      <div class="whiteContent">

        <div class="mainTitle"><h1 class="gradient-text">インタビュー</h1></div>
        <h2 class="h2Title">
          大阪ホテル専門学校は、どんな学校ですか。
        </h2>
        <hr class="styled-hr">

        <img class="contentImg"src="../../assets/images/case2_img1.png"/>

        <div class="word">
          ホテル業界への就職を目指す学生たちがビジネスマナーやホスピタリティのほか、ホテルに特化した実践的な授業を受講しています。本物に近い環境に整えた実習室で、現場出身の講師たちからの「本物」を日々、習得しています。</div>

        <h2 class="h2Title">
          数多くあるオンライン中国語会話の中でNetChinaを導入した理由を教えてください。
        </h2>
        <hr class="styled-hr">
        <div class="word">
          対応してくださった方が丁寧で、どの案件に関しても迅速にご回答いただけたため。
          また、デモとして試験的に実施させていただいた際に現地講師の方が非常に分かりやすく楽しくレッスンを展開してくれたため。
        </div>


        <h2 class="h2Title">
          NetChinaのレッスンは、どのように行われていますか？
        </h2>
        <hr class="styled-hr">
        <img class="contentImg"src="../../assets/images/case2_img2.png"/>
        <div class="word">
          授業の中で時間を設けての実施
        </div>

        <h2 class="h2Title">
          受講者様の感想や、効果はいかがでしょうか？
        </h2>
        <hr class="styled-hr">
        <div class="word">
          受講者のペースに合わせて講師がレッスンを行ってくれるということで非常に満足度高く、レッスン終了後には達成感と楽しさを味わっている様子が伺えます。</div>

        <h2 class="h2Title">
          今後、中国語教育を通してどのような展開を考えていますか？</h2>
        <hr class="styled-hr">
        <div class="word">
          学生たちの海外ホテルでの勤務も見据えていますが、日本国内で中国語をお話になるお客様に積極的にアプローチしていける人材育成を目指しています。また、共に働くスタッフの中にも中国語圏からのスタッフが増えてきているため、職場内でのコミュニケーションの円滑化にも語学を生かしてもらいたいと考えています。</div>

        <img class="case3img" src="../../assets/images/case2_img3.png"/>

      </div>
      <div class="HelpBackBtn" @click="goBack">戻る</div>

    </div>
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);  // 返回上一页
  } else {
    router.push('/');  // 跳转到首页
  }
}
definePageMeta({
  layout: false,
  middleware: ["only-visitor-corporate"],
});

</script>




<style scoped>

.corBlock{
  width: 100%;
  background-image: url("../../assets/images/scBg.png");
  color: #FFFFFF;
  background-size: cover;
  font-weight: bold;
  padding: 50px 0;
}
.cortt{display: block; width: 1028px; line-height: 44px; margin: auto; font-size: 32px; font-family: Murecho;}

.spanTag{
  width: 1028px;
  margin: 20px auto 0 auto;
}
.spanTag span{
  border: 1px solid #FFFFFF;
  border-radius: 16px;
  font-size: 12px;
  vertical-align: center;
  line-height: 16px;
  margin-right: 6px;
  display: inline-block;
  width: fit-content;
  padding: 4px 12px;
  font-weight: normal;
}
.whiteContent{
  width: 1028px;
  margin: -30px auto 0 auto; background-color: #FFFFFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 30px 40px;
}

.whiteContent .word{
  font-size: 15px;
  line-height: 24px;
  padding: 10px 0 20px 0;
  margin: 8px auto;
  width: 98%;
}

.mainTitle{
  background-image: url("../../assets/images/blueCircle.png");
  background-size: 40px;
  background-position: left center;
  background-repeat: no-repeat;
  height: 50px;
  vertical-align: center;
  padding-left: 20px;
}
.gradient-text {
  font-size: 20px;
  font-weight: bold;
  font-family: Murecho;
  line-height: 50px;
  background: linear-gradient(90deg, #3682E0, #2E6190);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.caseImg{
  display: inline-block;
  position: relative;
  margin: 0 12px;
  height: fit-content;
}
.caseImg img{
  width: 292px;
}
.caseImg li:nth-child(even){
  z-index: 999;
  left: 0;
  background-color: #F4F6FB;
  text-align: center;
  padding: 8px;
  color: #2E6190;
  width: 100%;
  font-weight: bold;
}
.h2Title{
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
  border-left: 4px solid #007BFF; /* 左邊藍色線條 */
  width: 98%;
  margin: 10px auto;
  line-height: 24px;
}

.styled-hr {
  border: none; /* 移除預設邊框 */
  height: 1px; /* 設定水平線的高度 */
  background: #f4f4f4;
  border-radius: 1px; /* 讓邊角變得圓滑 */
  width: 98%;
  margin: 10px auto;
}
.HelpBackBtn{
  width: 20%;
  height: 48px;
  line-height: 48px;
  color: #FFFFFF;
  border-radius: 30px;
  background-color: #2E6190;
  text-align: center;
  margin: 60px auto 40px auto;
  cursor: pointer;
}
.contentImg{
  width: 70%; margin: 30px auto;
}
.case3img{
  width: 480px;
  margin: auto;
}

@media screen and (max-width: 520px) {
  .cortt{display: block; width: 80%; margin: auto; font-size: 32px; font-family: Murecho;}
  .corBlock{
    padding: 20px 0;
  }
  .whiteContent{
    width: 100%;
    margin: auto;
    padding:4% 10%;
  }
  .spanTag{
    width: 100%;
    padding: 0 10%;
  }
  .whiteContent .word{
    padding: 0;
  }
  .caseImg{
    margin: 10px 0;
  }
  .word{
    padding-bottom: 8% !important;
  }
  .HelpBackBtn{
    width: 50%;
    margin: 50px auto;
  }
  .contentImg{
    width: 100%; margin: 30px auto 10px auto;
  }
  .case3img{
    width: 100%;
    margin: auto;
  }
}

</style>