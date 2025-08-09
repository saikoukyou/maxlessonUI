<template>
	<NuxtLayout name="corporate">

		<div class="corBlock">
      <span class="cortt">研修サービス内容</span>
      <span class="cordesdes">Service Content</span>
    </div>

    <div style="background-color:#EAF0F9; padding:40px 0;">

      <div class="tag-buttons">
        <a @click="scrollToSection('section1')" class="tag-button">1対1中国語レッスン</a>
        <a @click="scrollToSection('section2')" class="tag-button">中国語動画講座</a>
        <a @click="scrollToSection('section3')" class="tag-button">中国に特化した異文化理解講座</a>
        <a @click="scrollToSection('section4')" class="tag-button">中国現地研修</a>
      </div>

    <div class="scBlock">
      <div id="section1" class="scTitle">1対１中国語レッスン</div>
      <span class="spanTitle">ビジネス利用に特化したカリキュラム</span>

      <ul class="pointBlock">
        <li>
          <span class="tt">基礎を固める文法知識</span>
          <span class="desdes">
            ・講師が日本語対応可能で、初心者でも安心<br>
            ・中国語の基礎を体系的に構築できる</span>
        </li>
        <li>
          <span class="tt">現地で通じる中国語表現</span>
          <span class="desdes">
            ・現地での日常生活やビジネス場面に対応できる中国語カリキュラム<br>
            ・実践的かつ体系的にビジネス中国語をマスター
          </span>
        </li>
        <li>
          <span class="tt">一歩踏み込んだビジネス中国語</span>
          <span class="desdes">
            ・専門知識を入り交じった高度なビジネス中国語カリキュラム<br>
            ・交渉、人事、展示会、保険、広告、契約解除等</span>
        </li>
        <li>
          <span class="tt">仕事シーン別の中国語運用</span>
          <span class="desdes">
            ・中国語を必要とする職場や仕事シーンに対応する中国語カリキュラム<br>
            ・送迎、出張、接待、宴会、商談等
          </span>
        </li>
      </ul>

      <div id="section2" class="scTitle">中国語動画講座</div>
      <span class="spanTitle">
        中国語の勉強にインプット（覚える）とアウトプット（話す）が欠かせません。<br>
        インプットの部分は講師と一緒に進めることは無論可能だが、気軽に独学で予習復習のため、<br>
        文法と単語の教材内容をそれぞれ数百課分の動画教材をご提供しております。
      </span>

      <div class="chineseClass">
      <div class="videoCount fleft">
        <img src="../../assets/images/img_word.png" width="500"/>
        <span class="tt">ビデオ動画講座--単語編</span>
        <span class="desdes">
          ・テンポよく覚えられる単語の読み聞かせ動画教材<br>
          ・単語暗記や発音チェックに欠かせない</span>
      </div>

      <div class="videoCount fright">
        <img src="../../assets/images/img_grammer.png" width="500"/>
        <span class="tt">ビデオ動画講座--単語編</span>
        <span class="desdes">
          ・テンポよく覚えられる単語の読み聞かせ動画教材<br>
          ・単語暗記や発音チェックに欠かせない</span>
      </div>
      </div>
      <div style="clear: both;"></div>

      <div id="section3" class="scTitle">中国に特化した！異文化理解講座</div>

      <ul class="chinesePoint">
        <li>中国は独自進化が激しく、もはやガラパゴス大陸と変貌している</li>
        <li>中国ビジネスに密接な情報で構成する動画研修カリキュラム</li>
        <li>中国に特化した異文化理解は「知ってる」と「知らない」で差が大きく出る</li>
        <li>動画講座1本毎に小テスト付で、学習効果が可視化に</li>
      </ul>

      <div class="sblocks">
        <div class="sblock">
        <img src="../../assets/images/chinese5.png" width="246"/>
        <ul class="spoint">
          <li>ビジネス向け中国の基本情報</li>
          <li>中国の基本的な情報</li>
          <li>各地域別のビジネス情報</li>
        </ul>
      </div>
        <div class="sblock m13">
        <img src="../../assets/images/chinese6.png" width="246"/>
        <ul class="spoint">
          <li>中国従業員が持つ価値観</li>
          <li>現地での日常生活やビジネス場面に対応できる中国語カリキュラム</li>
          <li>実践的かつ体系的にビジネス中国語をマスター</li>
        </ul>
      </div>
        <div class="sblock">
        <img src="../../assets/images/chinese7.png" width="246"/>
        <ul class="spoint">
          <li>中国独特の商習慣</li>
          <li>中国語を必要とする職場や仕事シーンに対応する中国語カリキュラム</li>
          <li>送迎、出張、接待、宴会、商談等</li>
        </ul>
      </div>
        <div class="sblock m13">
        <img src="../../assets/images/chinese8.png" width="246"/>
        <ul class="spoint">
          <li>ビジネス向け中国の基本情報</li>
          <li>専門知識を入り交じった高度なビジネス中国語カリキュラム</li>
          <li>交渉、人事、展示会、保険、広告、契約解除等</li>
        </ul>
      </div>
      </div>

      <div id="section4" class="scTitle">中国現地研修</div>

      <ul class="pointBlock2">
        <li>
          <span class="tt">現地短期留学</span>
          <span class="desdes">
            ・中国トップクラスの国立大学に御社にニーズに合わせて専用留学プログラム<br>
            ・2週間、2ヶ月、6ヵ月～最長4年間の多種多様なプログラムに対応可能</span>
        </li>
        <li>
          <span class="tt">現地で通じる中国語表現</span>
          <span class="desdes">
            ・現地の企業や日系企業に視察し、セミナーやワークショップ開催<br>
            ・目的、日程、ご予算などに合わせて、プログラムをご提案！
          </span>
        </li>
        <li>
          <span class="tt">一歩踏み込んだビジネス中国語</span>
          <span class="desdes">
            ・展示会の選定、視察同行、アフター商談に徹底サポート<br>
            ・目的、日程、ご予算などに合わせて、視察先の展示会をご提案！</span>
        </li>
      </ul>

      <ul class="contactBg">
        <li>電話でお気軽にお問い合わせ</li>
        <li>03 - 6380 - 8893<span>（平日10時～18時）</span></li>
        <li>
          <nuxt-link to="/corporate/download"><div class="custom-button custom-button-right">お役立ち資料</div>
          </nuxt-link>
        </li>
      </ul>
    </div>
      <GotoTop />
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

const list = ref([]);
const liveList = ref([]);
const getList = async () => {
  const { data: info } = await useBizListApi();
  if (info?.value) {
    list.value = info?.value.biz ?? [];
    liveList.value = info?.value.live ?? [];
  }
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  getList();
});
</script>




<style scoped>

.corBlock{
  width: 100%;
  background-image: url("../../assets/images/scBg.png");
  color: #FFFFFF;
  background-size: cover;
  font-weight: bold;
  padding: 50px 0 30px 0;
}

.cortt{display: block; width: 1080px; margin: auto; font-size: 32px; font-family: Murecho;}
.cordesdes{display: block; width: 1080px; margin:10px auto;}

.scBlock{margin:50px auto 0 auto; width: 1130px; min-height: 1000px;}

.scTitle{
  background-image: url("../../assets/images/circleTitle.png");
  background-repeat: no-repeat;
  background-size:60px;
  background-position: left 30px;
  font-family: Murecho;
  font-size: 32px;
  font-weight: bold;
  color: #2E6190;
  padding:40px 0 20px 24px;
  width: fit-content;
  margin: auto;
  text-align: center;
}

.spanTitle{
  font-size: 15px;
  display: block;
  line-height: 24px;
  width: fit-content;
  text-align: center;
  color: #2E6190;
  font-weight: bold;
  margin: -2px auto 20px auto;
}

.fleft{
  float: left;
}
.fright{
  float: right;
}

.pointBlock{width: 1028px; margin: auto;}
.pointBlock2{width: 1028px; margin: auto;}


.tt{font-size: 22px; width: 320px; color: #2E6190; margin: 30px 0 10px 0; font-weight: bold; display: block;}
.desdes{width:320px; font-weight: bold; display: block; line-height: 24px; font-size: 13px; color: #333333;}

.pointBlock li{
  width: 1028px; height: 240px;
  background-color: #F6FAFF;
  background-size: 630px;
  background-position: right;
  background-repeat: no-repeat;
  padding: 20px 0 0 40px;
  margin-bottom: 20px;
  color: #000000;
}

.pointBlock li:nth-child(1){background-image: url("../../assets/images/sc01.png");}
.pointBlock li:nth-child(2){background-image: url("../../assets/images/sc02.png");}
.pointBlock li:nth-child(3){background-image: url("../../assets/images/sc03.png");}
.pointBlock li:nth-child(4){background-image: url("../../assets/images/sc04.png"); margin-bottom: 50px;}

.videoCount{width: 500px; background-color: #F6FAFF; height: 380px; margin-bottom: 60px;}
.videoCount span{margin-left: 40px;}

.chinesePoint{width: 1024px; margin: 10px auto;}
.chinesePoint li{width: 500px; height: 230px; font-size: 18px; text-align: left; font-weight: bold;
  display:inline-flex; background-size: cover; line-height: 28px; padding: 40px 220px 10px 30px;}
.chinesePoint li:nth-child(1){background-image: url("../../assets/images/chinese1.png"); color: #FFFFFF;}
.chinesePoint li:nth-child(2){background-image: url("../../assets/images/chinese2.png"); color: #2E6190;}
.chinesePoint li:nth-child(3){background-image: url("../../assets/images/chinese3.png"); color: #2E6190;}
.chinesePoint li:nth-child(4){background-image: url("../../assets/images/chinese4.png"); color: #FFFFFF;}
.chinesePoint li:nth-child(odd){margin-right: 24px;}

.sblock{width: 246px; display: inline-block; vertical-align: top; margin-right:13px;}
.sblock:last-child{margin: 0;}

.sblock img{border-radius: 8px 8px 0 0;}
.spoint{background-color: #F6FAFF; padding: 2px 24px 0 24px; height: 140px; text-align: center; border-radius: 0 0 8px 8px;}

.spoint li:nth-child(1){font-size:15px; font-weight: bold; color: #2E6190; padding-top: 16px;}
.spoint li:nth-child(2){font-size:13px; color: #424242; margin-top: 10px;}
.spoint li:nth-child(3){font-size:13px; color: #424242; margin-top: 6px; line-height: 20px;}


.pointBlock2{width: 1028px;}

.pointBlock2 li{
  width: 1028px; height: 240px;
  background-color: #F6FAFF;
  background-size: 630px;
  background-position: right;
  background-repeat: no-repeat;
  padding: 20px 0 0 40px;
  margin-bottom: 20px;
  color: #000000;
}

.pointBlock2 li:nth-child(1){background-image: url("../../assets/images/sc05.png"); margin-top: 10px;}
.pointBlock2 li:nth-child(2){background-image: url("../../assets/images/sc06.png");}
.pointBlock2 li:nth-child(3){background-image: url("../../assets/images/sc07.png"); margin-bottom: 40px;}

.contactBg{
  background-image: url("../../assets/images/bubblebg.png");
  background-size: cover;
  height: 160px;
  margin: auto;
  width: 1028px;
  position: relative;
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
  margin: 0 60px;
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
.sblocks{width: 1024px; margin: 30px auto 70px auto;}

.tag-buttons {
  display: flex;
  margin: auto;
  width: 1028px;
  height: 70px;
  font-size: 16px;
  line-height: 52px;
  text-align: center;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
}

.tag-button {
  flex: 1;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tag-button:not(:last-child) {
  border-right: 1px solid #e0e0e0;
}

.tag-button:hover {
  background-color: #d1e0fb;
  color: #0056b3;
}

.chineseClass{
  width: 1024px; margin: auto;
}

@media screen and (max-width: 520px) {
  .cortt{display: block; width: 80%; margin: auto; font-size: 32px; font-family: Murecho;}
  .cordesdes{display: block; width: 80%; margin:10px auto;}
  .corBlock{padding: 20px 0 20px 0;}

  .tag-buttons{
    width: 90%;
    font-size: 12px;
    line-height: normal;
    height: auto;
  }
  .scTitle{
    width: 80%;
    padding: 20px;
  }
  .scBlock{
    width: 90%;
    margin:20px auto 0 auto;
  }

  .pointBlock{
    width: 100%;
  }
  .pointBlock li{
    width: 100%;
    padding: 20px 0;
  }
  .spanTitle{
    width: 80%;
  }
  .chineseClass{
    width: 100%;
  }
  .videoCount{
    width: 100%;
  }
  .chinesePoint li{
    width: 100%;
  }
  .chinesePoint{
    width: 100%;
  }
  .sblocks{
    width: 100%;
  }
  .sblock{
    width: 48%;
    margin: 1%;
  }
  .pointBlock2{
    width: 100%;
  }
  .pointBlock2 li{
    width: 100%;
  }
  .contactBg{
    width: 100%;
  }
  .tt{
    background-color: rgba(255, 255, 255, 0.7);
    width: 90%;
    padding: 3% 0 1% 0;
    margin: 22% auto 0 auto;
    font-size: 20px;
    text-align: center;
  }
  .desdes{
    background-color: rgba(255, 255, 255, 0.7);
    width: 90%;
    padding: 2%;
    font-size: 12px;
    line-height: normal;
    margin: auto;
  }
  .videoCount{
    height: auto;
    margin-bottom: 20px;
  }
  .videoCount span{
    margin-left: auto;
  }
  .videoCount .tt{
    margin: 10px auto 0 auto;
    background: none;
  }
  .videoCount .desdes{
    margin: 0 auto 10px auto;
    background: none;
  }
  .chinesePoint li:nth-child(odd){
    margin-right: auto;
  }
  .chinesePoint li{
    background-position: right;
    background-size: 100%;
    background-repeat: no-repeat;
    font-size: 16px;
    line-height: normal;
    height: 200px;
    padding: 8% 50% 2% 8%;
  }
  .m13{margin-left: 1%;}
  .spoint{
    height: auto;
    min-height: 180px;
  }
  .scTitle{
    background-position: left top;
  }
  .pointBlock2 li{
    padding: 20px 0 0 0;
  }
  .contactBg li:nth-child(1){
    width: 80%;
    display: block;
    margin: auto;
    padding: 20px 0 0 0;
    font-size: 22px;
  }
  .contactBg{
    height: auto;
  }
  .contactBg li:nth-child(2){
    background-image: none;
    padding-left: 0;
    margin-left: 0;
    text-align: center;
    font-size: 30px;
  }
  .contactBg li:nth-child(2) span{
    display: block;
    margin: auto;
    text-align: center;
  }
  .contactBg li:nth-child(3){
    position: relative;
    margin: auto;
    top: auto;
    right: auto;
    padding-bottom: 10px;
  }
  .custom-button{
    margin: 10px auto;
    width: 80%;
  }

}
</style>