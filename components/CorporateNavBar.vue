<template>
  <div class="row items-center justify-between padding-x-l font-size headBg">
    <div class="headerHoujin">
      <NuxtLink to="/corporate" class="houLogo">
        <img :src="LogoNetchina" alt="ビズチャイナ" class="smmlogoImg" width="380" />
      </NuxtLink>
      <nuxt-link to="/corporate/download">
        <div class="btn1">お役立ち資料</div>
      </nuxt-link>
      <nuxt-link to="/corporate/contact">
        <div class="btn2">お問い合わせ</div>
      </nuxt-link>

      <div v-if="studentLogged" class="icon_loginBtn">
        <nuxt-link to="/mypage/mypageReserved">
          <div class="btn3">マイページ</div>
        </nuxt-link>
      </div>
      <div v-else-if="logged" class="icon_loginBtn">
        <nuxt-link to="/corporate/centre/dashboard">
          <div class="btn3">管理画面</div>
        </nuxt-link>
      </div>
      <div v-else>
        <nuxt-link to="/corporate/login">
          <div class="btn3">ログイン</div>
        </nuxt-link>
      </div>

    </div>
  </div>

  <!-- 手機版菜單控制按鈕 -->
  <NuxtLink to="/corporate">
    <img src="../assets/images/logob_w.png" alt="ビズチャイナ" class="logospb" width="380" />
  </NuxtLink>

  <div class="menuColor">
    <div v-if="studentLogged" class="corBtn imgmyhou">
      <nuxt-link to="/mypage/mypageReserved">マイページ</nuxt-link>
    </div>
    <div v-else-if="logged" class="corBtn imgcor">
      <nuxt-link to="/corporate/centre/dashboard">管理画面</nuxt-link>
    </div>
    <div v-else class="corBtn imglogin">
      <nuxt-link to="/corporate/login">ログイン</nuxt-link>
    </div>
  <div class="menuBtnH" @click="toggleMenu" v-if="isMobile">
    <img :src="menuIcon" width="48" alt="Menu Icon" />
  </div>
  </div>

  <div class="menuBizBg" v-show="!isMobile || showMenu">
    <ul class="menuBiz">
      <li>｜</li>
      <li :class="{ active: $route.path === '/corporate/content' }">
        <nuxt-link to="/corporate/content">研修サービス内容</nuxt-link>
      </li>
      <li>｜</li>
      <li :class="{ active: $route.path === '/corporate/plan' }">
        <nuxt-link to="/corporate/plan">料金プラン</nuxt-link>
      </li>
      <li>｜</li>
      <li :class="{ active: $route.path === '/corporate/score' }">
        <nuxt-link to="/corporate/score">導入実績</nuxt-link>
      </li>
      <li>｜</li>
      <li :class="{ active: $route.path === '/corporate/download' }">
        <nuxt-link to="/corporate/download">イベント&資料</nuxt-link>
      </li>
      <li>｜</li>
      <li class="bizBack" :class="{ active: $route.path === '/' }">
        <nuxt-link to="/"><p>BizCHINA</p></nuxt-link>
      </li>
      <li>｜</li>
      <li class="btnsp1">
        <nuxt-link to="/corporate/download">
          <div>お役立ち資料</div>
        </nuxt-link>
      </li>
      <li class="btnsp2">
        <nuxt-link to="/corporate/contact">
          <div>お問い合わせ</div>
        </nuxt-link>
      </li>
      <li class="bizNormal">
        <nuxt-link to="/"><div>BizCHINA</div></nuxt-link>
      </li>

    </ul>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import LogoNetchina from "../assets/images/bizchina_houjin.png";
import {createDiscreteApi} from "naive-ui";
import {useMainStore} from "~/composables/store";

// Naive UI dialog
const {dialog} = createDiscreteApi(["dialog"]);

// 使用 Pinia Store
const useStore = useMainStore();
const logged = useStore.corporateLoggedIn;
const corporate = useStore.corporateInfo;

// 新增對 studentLoggedIn 的引用
const studentLogged = useStore.studentLoggedIn; // 學生登錄狀態

// 引入圖片資源
import menuIconOpen from '../assets/images/logo_menu_w.png';
import menuIconClose from '../assets/images/logo_close_w.png';

// 追蹤當前顯示的圖標
const menuIcon = ref(menuIconOpen);

// 控制菜單顯示的變量
const showMenu = ref(false);
const isMobile = ref(false);

// 切換菜單顯示狀態及圖標
function toggleMenu() {
  showMenu.value = !showMenu.value;
  menuIcon.value = showMenu.value ? menuIconClose : menuIconOpen;
}

// 監聽螢幕大小變化
function handleResize() {
  isMobile.value = window.innerWidth <= 520;
}

// 組件掛載時立即檢查螢幕大小
onMounted(() => {
  handleResize(); // 初始化時檢查
  window.addEventListener('resize', handleResize); // 監聽螢幕大小變化
});


// 退出登錄功能
function logout() {
  dialog.warning({
    content: "ログアウトしますか？",
    positiveText: "ログアウト",
    negativeText: "キャンセル",
    onPositiveClick: () => {
      useStore.corporateLogout();
    },
  });
}
</script>

<style scoped>
.headBg {
  background-color: #ffffff;
  padding-bottom: 24px;
}

.smmlogoImg {
  margin-top: 10px;
}

.headerHoujin {
  width: 1130px;
  margin: auto;
  position: relative;
}

.menuBizBg {
  background-color: #2e6190;
  height: 48px;
  width: 100%;
}

.menuBiz {
  width: 1130px;
  margin: auto;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}

.menuBiz li {
  display: inline-block;
  font-size: 16px;
}

.menuBiz li:nth-child(odd) {
  line-height: 48px;
  width: 2px;
  text-align: center;
}

.menuBiz li:nth-child(even) {
  width: 222px;
  text-align: center;
}


.menuBiz li.btnsp1,
.menuBiz li.btnsp2,
.menuBiz li.btnsp3 {
  display: none;
}

/* 新增hover和active效果 */
.menuBiz li:hover {
  color: #ffe03b;
  font-weight: bold;
}

.menuBiz li.active {
  color: #ffe03b;
  font-weight: bold;
}

.btn1,
.btn2 {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn1:hover,
.btn2:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn1:active,
.btn2:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn1 {
  width: 160px;
  font-weight: bold;
  line-height: 32px;
  text-align: center;
  font-size: 15px;
  color: #2e6190;
  border: 1px solid #2e6190;
  height: 32px;
  border-radius: 4px;
  position: absolute;
  right: 26%;
  top: 24px;
}

.btn2 {
  width: 160px;
  font-weight: bold;
  line-height: 32px;
  text-align: center;
  font-size: 15px;
  color: #ffffff;
  background-color: #2e6190;
  height: 32px;
  border-radius: 4px;
  position: absolute;
  right: 11%;
  top: 24px;
}

.btn3 {
  font-weight: bold;
  line-height: 32px;
  text-align: left;
  padding:0 3% 0 1%;
  font-size: 15px;
  color: #2e6190;
  height: 32px;
  border-radius: 4px;
  right: 0;
  top: 24px;
  background-image: url("../assets/images/loginBtn.png");
  background-repeat: no-repeat;
  background-position:94%;
  background-size: 24px;
  position: absolute;
  cursor: pointer;
}
.btn3:hover {
  background-color: #F4F6FB;
}
.menuColor{
  background-color: #2e6190;
}
.menuBtnH {
  display: none;
}
.logospb{
  display: none;
}
.houLogo{
  display: block;
  width: fit-content;
}
.corBtn{
  display: none;
}
.menuBiz li.bizNormal div{
  display: none;
}

.bizBack p{
  width:60%;
  border-radius: 30px;
  margin: auto;
  cursor: pointer;
  transform: scale(0.9);
}
.bizBack p:hover{
  background-color: #FFAA47;
  color: #FFF9EC;
}

@media screen and (max-width: 520px) {
  .headBg {
    display: none;
  }

  .menuBizBg {
    width: 100%;
    background-color: orange;
    height: auto;
  }

  .menuBiz {
    width: 100%;
    height: auto;
    z-index: 9999;
    position: absolute;
  }

  .menuBiz li {
    width: 100%;
    display: block;
    background-color: #2e6190;
    height: 64px;
    line-height: 64px;
  }

  .menuBiz li:nth-child(even) {
    width: auto;
  }

  .menuBiz li:nth-child(odd) {
    width: auto;
    display: none;
  }

  .menuBiz li.btnsp1,
  .menuBiz li.btnsp2,
  .menuBiz li.btnsp3 {
    display: block;
  }

  .menuBiz li.btnsp1 div {
    border: 1px solid #ffffff;
    background-color: white;
    color: #2e6190;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    width: 70%;
    margin: auto;
    font-size: 14px;
  }

  .menuBiz li.btnsp2 div {
    border: 1px solid #ffffff;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    width: 70%;
    margin: auto;
    font-size: 14px;
  }

  .menuBiz li.btnsp3 div {
    width: 60%;
    margin: auto;
    background-size: 26px;
    background-position: right center;
    background-image: url("../assets/images/loginBtnw.png");
    background-repeat: no-repeat;
  }

  .menuBtnH {
    display: block;
    background-color:#2e6190;
    width: 48px;
  }
  .logospb{
    padding-top: 4px;
    width: 178px;
    display: block;
    position: absolute;
    margin-top: 8px;
    margin-left: 48px;
  }
  .corBtn{
    width: 48px; height: 48px; position: absolute;
    top: 0; right: 0;
    display: block;
    border: 0;
    border-radius: 0px;
    font-size: 9px;
    font-weight:normal;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    margin-top: 0;
    text-align: center;
    line-height: 74px;
    border-left: 1px solid rgba(204, 204, 204, 0.5);
    color: #FFFFFF;
  }
  .imgmyhou{
    background-image: url("../assets/images/logo_myhou.png");
    background-size: cover;
    background-repeat: no-repeat;
    letter-spacing: -0.1em;
  }
  .imgcor{
    background-image: url("../assets/images/logo_signup.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .imglogin{
    background-image: url("../assets/images/logo_login_w.png");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .menuBiz li.bizNormal div{
    background: linear-gradient(135deg, #FFB273, #FA8373);
    width: 70%;
    height: 40px;
    margin: auto;
    line-height: 40px;
    border-radius: 4px;
    display: block;
  }
}
</style>