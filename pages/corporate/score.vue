<template>
	<NuxtLayout name="corporate">
		<div class="corBlock">
      <span class="cortt">導入実績</span>
      <span class="cordesdes">BizCHINAを導入いただいた企業様を導入事例と共にご紹介いたします。</span>
      <div>
        <select v-model="selectedCategory" id="category">
          <option value="" disabled selected>業種</option>
          <option>メーカー</option>
          <option>商社</option>
          <option>コンサルティング</option>
          <option>物流/交通</option>
          <option>サービス</option>
          <option>金融/保険</option>
        </select>

        <!-- 導入目的 -->
        <select v-model="selectedGoal" id="goal">
          <option value="" disabled selected>導入目的</option>
          <option>社員の中国語力向上</option>
          <option>福利厚生&自己啓発支援</option>
          <option>グローバル人材育成</option>
        </select>


        <!-- 導入內容 -->
        <select v-model="selectedContent" id="content">
          <option value="" disabled selected>導入内容</option>
          <option value="module1">オンライン中国語研修</option>
          <option value="module2">中国リテラシー</option>
          <option value="module3">中国現地研修</option>
        </select>
      </div>
    </div>

    <div class="caseContent">
      <div class="caseDiv">
        <Nuxt-link to="/corporate/scoreContent">
        <img src="../../assets/images/casephoto.png" width="426"/>
        <ul class="caseUl">
          <li>村田製作所</li>
          <li><span class="tagInfo">メーカー</span><span class="tagInfo">社員の中国語向上</span><span class="tagInfo">オンランン中国語研修</span></li>
          <li>株式会社村田製作所は、京都府長岡京市に本社を置く電子部品メーカー。電子部品を主力とする企業では世界 ...株式会社村田製作所は、京都府長岡京市に本社を置く電子部品...</li>
        </ul>
        </nuxt-link>
      </div>


      <div class="caseDiv">
        <Nuxt-link to="/corporate/scoreContent2">
        <img src="../../assets/images/case2.png" width="426"/>
        <ul class="caseUl">
          <li>大阪ホテル専門学校</li>
          <li><span class="tagInfo">サービズ</span><span class="tagInfo">グローバル人材育成</span><span class="tagInfo">オンランン中国語研修</span></li>
          <li>ホテル業界への就職を目指す学生たちがビジネスマナーやホスピタリティのほか、ホテルに特化した実践的な授業を受講しています。本物に近い環境に整えた実習室で、現場出身の講師たちからの「本物」を日々、習得しています。</li>
        </ul>
        </Nuxt-link>
      </div>

      <div class="caseDiv">
        <Nuxt-link to="/corporate/scoreContent3">
        <img src="../../assets/images/case3.png" width="426"/>
        <ul class="caseUl">
          <li>日経新聞に掲載されました</li>
          <li></li>
          <li>日経新聞がネットチャイナのご利用者様へ取材を行い、その内容が掲載されました。</li>
        </ul>
        </Nuxt-link>
      </div>

      <ul class="contactBg">
        <li>電話でお気軽にお問い合わせ</li>
        <li>03 - 6380 - 8893<span>（平日10時～18時）</span></li>
        <li>
          <nuxt-link to="/corporate/download"><div class="custom-button custom-button-right">お役立ち資料</div>
          </nuxt-link>
        </li>
      </ul>
    </div>

	</NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBizListApi } from "~/apis/corporate";
import { NButton } from "naive-ui";

definePageMeta({
  layout: false,
  middleware: ["only-visitor-corporate"],
});


// 定義響應式變數
const selectedCategory = ref(""); // 業種的選擇
const selectedGoal = ref(""); // 導入目的的選擇
const selectedContent = ref(""); // 導入內容的選擇

</script>




<style scoped>

.corBlock{
  width: 100%;
  color: #FFFFFF;
  background-size: cover;
  font-weight: bold;
  padding: 20px 0;
  background-image: url("../../assets/images/caseBg.png");
  height: 289px;
  text-align: center;
}

.cortt{display: block; margin: 50px auto 10px auto; font-size: 34px; font-family: Murecho;}
.cordesdes{display: block; margin:10px auto 30px auto;}


select{
  background-color: white;
  width: 212px;
  height: 50px;
  border-radius: 50px;
  color: #3682E0;
  text-align: left;
  padding-left: 18px;
  margin-right: 10px;
  background-image: url("../../assets/images/bluearrow.png");
  background-size: 12px;
  background-position: 182px 22px;
  background-repeat: no-repeat;
  font-size: 14px;
}

.caseContent{background-color: #EAF0F9; padding: 0;}

.caseDiv{
  width: 1028px; height: 200px; margin: 30px auto; background-color: #FFFFFF; position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, background-color 0.3s ease, box-shadow 0.4s ease; /* 平滑過渡 */
}
.caseDiv:hover {
  transform: translateY(-5px); /* 平滑上移 5px */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 增強陰影 */
}
.caseDiv img {float: left; margin-right: 20px; width: 500px;}
.caseUl{padding: 26px 20px;}
.caseUl li:nth-child(1){font-size: 19px; font-weight: bold; color:#2E6190;}
.caseUl li:nth-child(2) .tagInfo{display: inline-block; margin-top: 8px; width: fit-content; border-radius: 8px; margin-right: 4px; background-color: #F4F6FB; font-size: 10px; padding: 4px 8px;}
.caseUl li:nth-child(3){font-size: 13px; line-height: 20px; margin-top: 10px;}

.caseContent{background-color: #EAF0F9; padding: 10px;}


.contactBg{
  background-image: url("../../assets/images/bubblebg.png");
  background-size: cover;
  height: 160px;
  margin: auto;
  width: 1142px;
  position: relative;
  transform: scale(0.9);
}

.contactBg li:nth-child(1){font-size: 27px;font-weight: bold; color: #2E6190;
  padding: 40px 0 0 60px;}
.contactBg li:nth-child(2){font-size: 44px;font-weight: bold;
  color: #2E6190; background-image: url("../../assets/images/icon_phone.png");
  background-repeat: no-repeat;
  padding-left: 74px;
  background-size: 32px;
  background-position: 26px 9px;
  margin-left: 36px;
  margin-top: 10px;
}
.contactBg li:nth-child(2) span{font-size: 13px;}
.contactBg li:nth-child(3){position: absolute; top: 60px; right: 60px;}


.custom-button {
  width: 211px;
  height: 54px;
  text-align: center;
  line-height: 54px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.custom-button-right {
  background-color: #2E6190;
  color: white;
  border: 2px solid #2E6190;
}

@media screen and (max-width: 520px) {
  .cortt {
    display: block;
    width: 80%;
    margin: auto;
    font-size: 32px;
    font-family: Murecho;
  }

  .cordesdes {
    display: block;
    width: 80%;
    margin: 10px auto;
  }

  .caseDiv{
    width: 90%;
    height: fit-content;
  }

  .contactBg{
    width: 100%;
    text-align: center;
  }
  .contactBg li:nth-child(1){
    width: 90%;
    display: block;
    margin: auto;
    padding: 20px 0 0 0;
    font-size: 22px;
  }
  .contactBg li:nth-child(2){
    background-image: none;
    font-size: 30px;
    margin-left: 0;
    padding-left: 0;
  }
  .contactBg li:nth-child(2) span{
    display: block;
    margin-top: 10px;
  }
  .contactBg{
    height: fit-content;
    padding-bottom: 20px;
  }
  select{
    margin-bottom: 8px;
  }
  .corBlock{
    height: 300px;
  }
  .caseDiv img{
    float: none;
  }
  .custom-button{
    display: block;
    margin: auto;
  }
  .contactBg li:nth-child(2){
    display: block;
    margin-bottom: 10px;
  }
  .contactBg li{
    text-align: center;
  }
  .contactBg li:nth-child(3){
    position: relative;
    top: auto;
    right: auto;
    margin: auto;
  }
}

</style>