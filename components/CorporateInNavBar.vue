<template>
  <div class="row items-center justify-between padding-x-l font-size headBg">
    <div class="headerHoujin">
      <NuxtLink to="/corporate" class="logoBlock">
        <img src="../assets/images/bizhoujin_w.png" class="smmlogoImg"/>
      </NuxtLink>
      <div v-if="logged" class="icon_loginBtn">
        <p class="logout" @click="logout"><span v-if="corporate">ログアウト</span></p>
      </div>
    </div>
  </div>

  <!-- 手機版菜單控制按鈕這是法人管理的Nav -->
  <NuxtLink to="/corporate">
    <img src="../assets/images/logob_w.png" alt="ビズチャイナ" class="logospb" width="380" />
  </NuxtLink>

  <div class="menuBtnH" @click="toggleMenu" v-if="isMobile">
    <img :src="menuIcon" width="48" alt="Menu Icon" />
  </div>

  <div class="menuBizBg" v-show="!isMobile || showMenu">
    <ul class="menuBiz">

      <li class="btnsp3">
        <div v-if="logged" class="icon_loginBtn">
          <p @click="logout"><span v-if="corporate">ログアウト</span></p>
        </div>
      </li>
    </ul>
  </div>

</template>

<script setup>
import {ref, onMounted} from 'vue';
import LogoNetchina from "../assets/images/bizchina_houjin.png";
import {createDiscreteApi} from "naive-ui";
import {useMainStore} from "~/composables/store";
// 引入圖片資源
import menuIconOpen from '../assets/images/logo_menu_w.png';
import menuIconClose from '../assets/images/logo_close_w.png';

// Naive UI dialog
const {dialog} = createDiscreteApi(["dialog"]);

// 使用 Pinia Store
const useStore = useMainStore();
const logged = useStore.corporateLoggedIn;
const corporate = useStore.corporateInfo;


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
  background-color: #2E6190;
  height: 56px;
}

.smmlogoImg {
  width: 220px;
  padding-top: 0;
}

.headerHoujin {
  width:98%;
  margin: auto;
  position: relative;
}

.menuBizBg {
  background-color: #2e6190;
  height: 48px;
  width: 100%;
  display: none;
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
  width: 280px;
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
  right: 280px;
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
  right: 100px;
  top: 24px;
}

.btn3 {
  width: 106px;
  font-weight: bold;
  line-height: 32px;
  text-align: center;
  font-size: 15px;
  color: #2e6190;
  height: 32px;
  border-radius: 4px;
  right: 0;
  top: 24px;
  background-image: url("../assets/images/loginBtn.png");
  background-repeat: no-repeat;
  background-position: right;
  background-size: 24px;
  position: absolute;
}

.menuBtnH {
  display: none;
}
.logospb{
  display: none;
}
.logout{
  width: 100px;
  border-radius: 30px; text-align: center; color: #FFFFFF;
  font-weight: bold; font-size: 13px;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 30px;
  cursor: pointer;
}
.logout:hover{
  background-color: #184873;
}
.logoBlock{
  display: block; width: 220px;
}

@media screen and (max-width: 520px) {
  .headBg {
    display: none;
  }

  .menuBizBg {
    width: 100%;
    background-color: orange;
    height: auto;
    display: block;
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
  }

  .menuBiz li.btnsp2 div {
    border: 1px solid #ffffff;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    width: 80%;
    margin: auto;
  }

  .menuBiz li.btnsp3 div {
    width: 30%;
    margin: auto;
    background-size: 26px;
    background-position: right center;
    background-image: url("../assets/images/loginBtnw.png");
    background-repeat: no-repeat;
  }
  .menuBtnH {
    display: block;
    background-color:#2e6190;
  }
  .logospb{
    padding-top: 4px;
    width: 178px;
    display: block;
    position: absolute;
    margin-top: 8px;
    margin-left: 48px;
  }

}
</style>
