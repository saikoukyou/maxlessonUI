<template>
  <NuxtLayout name="corporate">
    <div style="background-color: #EAF0F9; padding-bottom: 30px;">
      <div class="corBlock">
        <span class="cortt">日経新聞に掲載されました</span>
      </div>

      <div class="whiteContent">
        <img class="contentImg" src="../../assets/images/case3_img.png"/>
        <div class="word">
          <span style="font-weight: bold;">日経新聞がネットチャイナのご利用者様へ取材を行い、その内容が掲載されました。</span><br>
          これからもネットチャイナ中国語は皆さまの中国語学習の力になれますよう、スタッフ一同、努めてまりますので、よろしくお願いいたします。
          デジタル版の新聞記事は<NuxtLink target="_blank" class="actionBtn" to="https://www.nikkei.com/article/DGXMZO56184700Y0A220C2TCL000/?fbclid=IwAR00w1IgdRplB1bEXDH7T-5X3CgUE1Mt3mQVx2vvwYIsPpXyQ8Qgjr5fPmU">こちら</NuxtLink>でご覧いただけます。
        </div>
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
.actionBtn{
  text-decoration: underline;
  font-weight: bold;
  color: #3682E0;
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