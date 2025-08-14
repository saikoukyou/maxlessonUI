<template>
  <div id="top-head">
    <div class="inner">
    <div class="smmlogo">
      <NuxtLink to="/" >
        <img :src="LogoNetchina" alt="ビズチャイナ" class="smmlogoImg" @click="goHomeAndCloseMenu" />
      </NuxtLink>
    </div>
      <nav id="global-nav">
        <div class="g-nav-wrap">
          <ul>
            <li
                v-for="(item, index) in menus"
                :key="index"
                :class="{ activeMenu: route.path === item.path }"
            >
              <a @click="handleOpen(item.path)">{{ item.name }}</a>
              <span class="BG"></span>
            </li>
          </ul>
        </div>
        <div v-if="logged === true" class="loginBTNs">
          <NuxtLink to="/mypage/mypageReserved">
            <img src="../assets/images/loginBtn.png">
            <p class="BtnLogin">マイページ</p>
          </NuxtLink>
        </div>
        <div v-else class="loginBTNs">
            <NuxtLink to="/login">
              <img src="../assets/images/loginBtn.png">
            <p class="BtnLogin">ログイン</p>
            </NuxtLink>
          <NuxtLink to="/plan">
            <p class="BtnLogin2">100円体験</p>
          </NuxtLink>
        </div>
      </nav>
    <div class="GsapMenu">
      <div class="menu sp sp_head_menu">
        <div v-if="logged === true" class="loginBTNs">
          <NuxtLink to="/mypage/mypageReserved">
            <p class="MyLogin">
              マイページ
            </p>
          </NuxtLink>
        </div>
        <div v-else class="loginBTNs">
          <NuxtLink to="/login">
            <p
                class="BtnLogin"
                :class="{ activeLogin: isLoginActive }"
            >
              ログイン
            </p>
          </NuxtLink>
          <NuxtLink to="/plan">
            <p
                class="BtnLogin2"
                :class="{ highlighted: isSignupActive }"
            >
              100円体験
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    </div>
    <div id="app">
      <div id="top-toggle" class="sp">
        <div class="barres">
          <input type="checkbox" id="menu-toggle" class="menu-toggle" ref="menuToggle">
          <label for="menu-toggle" class="menu-btn"></label>
          <div id="menu" class="menu-content">
            <ul>
              <NuxtLink to="/strength" @click="closeMenu"><li class="num1">NetKOREAについて</li></NuxtLink>
              <NuxtLink to="/plan" @click="closeMenu"><li class="num2">料金プラン</li></NuxtLink>
              <NuxtLink to="/timetable" @click="closeMenu"><li class="num3">講師一覧</li></NuxtLink>
              <NuxtLink to="/textbook" @click="closeMenu"><li class="num4">教材一覧</li></NuxtLink>
              <NuxtLink to="/help" @click="closeMenu"><li class="num5">よくある質問</li></NuxtLink>

              <NuxtLink v-if="logged === true" to="/mypage/mypageReserved" @click="closeMenu">
                <li class="menumy">マイページ</li>
              </NuxtLink>
              <NuxtLink v-else to="/login" @click="closeMenu">
                <li class="menu6">ログイン</li>
              </NuxtLink>
              <NuxtLink v-if="!logged" to="/plan" @click="closeMenu">
                <li class="menu7">100円体験</li>
              </NuxtLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import LogoNetchina from "../assets/images/Biz_logo.png";
import IconLoginRed from "../assets/SVG/icon_login_red.svg";
import {useMainStore} from "~/composables/store";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

// 获取当前路由信息
const route = useRoute();

// 判断是否处于 /login 页面
const isLoginActive = computed(() => route.path === "/login");
// 判断是否处于 /signup 页面
const isSignupActive = computed(() => route.path === "/signup");


const menus = [{
    name: "NetKOREAについて",
    path: "/strength"
}, {
    name: "料金プラン",
    path: "/plan",
    match: [{
        name: "paper-page"
    }]
}, {
    name: "講師一覧",
    path: "/timetable",
    match: [{
        name: "list-type-page",
        params: {
            type: "group"
        }
    }]
}, {
    name: "教材一覧",
    path: "/textbook",
    match: [{
        name: "list-type-page",
        params: {
            type: "flashsale"
        }
    }]
},
//   {
//   name: "動画一覧",
//   path: "/video",
//   match: [{
//     name: "list-type-page",
//     params: {
//       type: "flashsale"
//     }
//   }]
// },
  {
    name: "よくある質問",
    path: "/help",
    match: [{
        name: "list-type-page",
        params: {
            type: "live"
        }
    }]
},]


const useStore = useMainStore();
let logged = useStore.studentLoggedIn;

function handleOpen(path) {
    navigateTo(path)
}
onMounted(async () => {
  if (logged) {
    useStore.useRefreshUserInfo();
  }
})

</script>

<script>
export default {
  methods: {
    closeMenu() {
      this.$refs.menuToggle.checked = false;
    },
    goHomeAndCloseMenu() {
      this.$refs.menuToggle.checked = false;
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
#top-toggle {
  position: relative;
}

.barres {
  position: relative;
}

/* 菜單按鈕的樣式 */
.menu-btn {
  cursor: pointer;
  display: inline-block;
  width: 48px;
  height: 48px;
  background-image: url('../assets/images/logo_menu.png'); /* 替換為你的開啟圖標路徑 */
  background-size: cover;
  position: relative;
  z-index: 2; /* 確保按鈕在最上層 */
  background-color: #25909A;
}

/* 切換到關閉圖標 */
.menu-toggle:checked + .menu-btn {
  background-image: url('../assets/images/logo_close.png'); /* 替換為你的開啟圖標路徑 */
}

/* 菜單內容 */
.menu-content {
  display: none;
  animation: fadeInOut 0.3s ease;      /* 動畫快一點 */
  width: 100%;
  background: linear-gradient(#F5F0E7, #FAF7F3); /* 用今天配色 */
  position: fixed;
  top: 48px;
  left: 0;
  z-index: 1000;                       /* 提高層級 */
  height: fit-content;
  padding: 8px 0 4vh;                 /* 頂部/底部間距調整 */
  box-shadow: 0 8px 24px rgba(0,0,0,0.12); /* 陰影更柔和更大 */
}

.menu-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-content li {
  text-align: center;
  margin: 0 16px;
  font-size: 20px; /* 字級統一 */
  font-weight: bold;
  padding: 24px 12px;
  border-bottom: 1px solid #E7E2DA;
  color: #20959A;
  text-shadow: 0 1px 2px rgba(255,255,255,0.8); /* 白陰影 */
}

.menu-content li a {
  display: block;
  text-decoration: none;
}

/* 白底紅字按鈕 */
.menu-content li.menu6 {
  height: auto;
  line-height: 1.4;
  margin: 32px 16px 0 16px;
  font-size: 16px;
  background-color: #25909A;
  color: #FFFFFF;
  padding: 16px 0;
  border-radius: 8px;
}

/* 紅底白字按鈕 */
.menu-content li.menu7 {
  border-radius: 8px;
  margin: 20px 16px;
  height: auto;
  line-height: 1.4;
  font-size: 16px;
  color: #ffffff;
  background: linear-gradient(200deg, #ffa297 25%, #ff867e 75%);
  padding: 16px 0;
  border: 0;
}

/* 按鈕內文字顏色 */
.menu-content li.menu6 a { color: #b12332 !important; }
.menu-content li.menu7 a { color: #ffffff !important; }


.menu-content li.menumy {
  text-align: center;
  border: 0;
  border-radius: 48px;
  height: 48px;
  align-items: center;
  line-height: 48px;
  width: 70%;
  margin: auto;
  color: #ffffff;
  font-size: 16px;
  background-color: #EF6D20;
  padding-left: 0;
}
.menu-content li.menumy a{
  color: #FFFFFF !important;
}

/* 菜單開啟時顯示 */
.menu-toggle:checked ~ .menu-content {
  display: block;
}

/* 顯示動畫 */
@keyframes fadeInOut {
  0% { opacity: 0; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.activeLogin {
  background-color: #EF6D20 !important; /* 橙色背景 */
  color: #fff !important; /* 白色字体 */
  background-image: url("../assets/images/logo_login_w.png") !important;
}

.highlighted {
  background-image: url("../assets/images/logo_signup.png") !important;
  background-color: #EF6D20 !important; /* 橙色背景 */
  color: #FFFFFF !important;
}

.menu-content li.hr{
  border-bottom: 1px solid #CCCCCC;
  margin: 24px auto;
  width: 80%;
}
.menu-content li.corporate{
  color: #FFFFFF !important;
  background: linear-gradient(315deg, #739EC6, #3A6BA0);
  width: 70%;
  margin: 10px auto;
  text-align: center;
  border-left: 0;
  font-size: 14px;
  height: 40px;
  line-height: 40px !important;
  padding-left: 0;
}
.loginBTNs{
  z-index: 999;
}

</style>
