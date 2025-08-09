<template>
  <NuxtLayout name="corporate">

    <div class="corBlock">
      <span class="cortt">イベント&資料</span>
      <span class="cordesdes">Event & Information</span>
    </div>
    <div class="bizSemi">

      <div id="section1" class="scTitle">BizChinaセミナー情報</div>

      <ul v-for="(live) in liveList" class="memVBlock">
        <li><img src="../../assets/images/red_flag.png" width="79"/></li>
        <li><img src="../../assets/images/img_event.png" width="91"/></li>
        <li>{{live.name}}</li>
        <li>{{live.memo}}</li>
        <li>
          <nuxt-link :to="'/corporate/contact?content='+live.memo+'&biz='+live.id">
            <div class="custom-button custom-button-right">申込する</div>
          </nuxt-link>
        </li>
      </ul>


      <div id="section1" class="scTitle">BizChinaお役立ち資料のダウンロード</div>

      <div class="blocktotal">
        <div v-for="(item) in list" class="downloadBlock">
            <div class="downloadImg">{{item.name}}</div>
          <nuxt-link :to="'/corporate/contact?content='+item.name+'&biz='+item.id">
            <button class="download-button"><img src="../../assets/images/download_icon.png" alt="Download Icon">ダウンロード</button>
          </nuxt-link>
        </div>
      </div>

    </div>

  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBizListApi } from "~/apis/corporate";
import { NButton } from "naive-ui";
import ref1 from "../../assets/download/bizchina_ref1.pdf";
import ref2 from "../../assets/download/bizchina_ref2.pdf";
import ref3 from "../../assets/download/bizchina_ref3.pdf";
import ref4 from "../../assets/download/bizchina_ref4.pdf";

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
.custom-button-right {
  background-color: #2E6190;
  color: white;
  border: 2px solid #2E6190;
}
.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.memVBlock {
  width: 1028px;
  height: 150px;
  margin: 20px auto 50px auto;
  background-color: #FFFFFF;
  position: relative;
}

.memVBlock li:nth-child(1) {
  position: absolute;
  left: -9px;
  top: 20px;
}

.memVBlock li:nth-child(1) img {
  width: 79px;
}

.memVBlock li:nth-child(2) {
  position: absolute;
  top: 40px;
  left: 110px;
}

.memVBlock li:nth-child(2) img {
  width: 91px;
}

.memVBlock li:nth-child(3) {
  position: absolute;
  top: 44px;
  left: 225px;
  font-size: 18px;
  font-weight: bold;
  color: #2E6190;
}

.memVBlock li:nth-child(4) {
  position: absolute;
  top: 72px;
  left: 225px;
  width: 400px;
  line-height: 22px;
  font-size: 16px;
  color: #424242;
}

.memVBlock li:nth-child(5) {
  position: absolute;
  right: 60px;
  top: 54px;
}
.download-button {
  background-color: #2e6190; /* 背景色與圖片中相似 */
  border: none;
  border-radius: 4px; /* 圓角 */
  padding: 15px 30px; /* 調整內邊距，使按鈕大小合適 */
  color:  #FFFFFF;/* 字體顏色與圖片中的相似 */
  font-size: 18px; /* 字體大小 */
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 355px;
  margin: 12px 0 24px 74px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.download-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.download-button img {
  margin-right: 8px; /* 圖片與文字之間的間距 */
  width: 18px;
  margin-top: -2px;
}

.blocktotal{
  width: 1040px; margin: 0 auto 50px auto;
}
.bizSemi{
  background-color:#EAF0F9; padding:10px 0;
}

@media screen and (max-width: 520px) {
  .cortt{display: block; width: 80%; margin: auto; font-size: 32px; font-family: Murecho;}
  .cordesdes{display: block; width: 80%; margin:10px auto;}

  .memVBlock{
    width: 90%;
    height: auto;
    padding: 8% 0;
  }
  .memVBlock li{
    display: block;
    text-align: center;
    margin: auto;
    position: relative;
  }
  .memVBlock li:nth-child(2){
    position: relative;
    top: auto;
    left: auto;
    margin: auto;
    text-align: center;
  }
  .memVBlock li:nth-child(2) img{
    margin: 5% auto;
  }
  .memVBlock li:nth-child(3){
    position: relative;
    width: 70%;
    margin: 3% auto;
    left: auto;
    top: auto;
  }
  .memVBlock li:nth-child(4){
    position: relative;
    width: 70%;
    left: auto;
    top: auto;
    margin: auto;
  }
  .memVBlock li:nth-child(5){
    position: relative;
    margin: auto;
    right: auto;
    top: auto;
  }
  .memVBlock li:nth-child(5) div{
    margin: 3% auto;
  }
  .scTitle{
    width: 80%;
    padding: 20px;
  }
  .downloadBlock{
    width: 100%;
    margin: 10px 0;
  }
  .blocktotal{
    width: 90%; margin: 0 auto 50px auto;
  }
  .download-button{
    width: 80%;
    margin: 20px auto;
    display: block;
    padding: 10px;
    position: relative;
    height: 54px;
  }
  .download-button img{
    position: absolute;
    left: 30px;
    top: 20px;
  }
  .corBlock{
    padding: 20px 0 20px 0;
  }
  .downloadImg{
    width: 90%;
    background-size: contain;
    background-repeat: no-repeat;
  }

}

</style>