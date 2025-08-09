<template>
  <div id="top-head">
    <h1 class="smmlogo">
      <NuxtLink to="/" >
        <img :src="LogoNetchina" alt="ビズチャイナ" class="smmlogoImg" @click="goHomeAndCloseMenu" />
      </NuxtLink>
    </h1>
    <div class="inner">
      <nav id="global-nav">
        <div class="g-nav-wrap">
          <div class="forB">
            <a href="/corporate" target="_blank" rel="noopener noreferrer">企業向け</a>
          </div>
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
            <p class="BtnLogin"><img :src="IconLoginRed" alt="" class="icon_login"> マイページ</p>
          </NuxtLink>
        </div>
        <div v-else class="loginBTNs">
            <NuxtLink to="/login">
            <p class="BtnLogin"><img :src="IconLoginRed" alt="" class="icon_login"> ログイン</p>
            </NuxtLink>
          <NuxtLink to="/plan">
            <p class="BtnLogin2">100円体験</p>
          </NuxtLink>
        </div>
      </nav>

    </div>

    <div id="app">
      <div id="top-toggle" class="sp">
        <div class="barres">
          <input type="checkbox" id="menu-toggle" class="menu-toggle" ref="menuToggle">
          <label for="menu-toggle" class="menu-btn"></label>
          <div id="menu" class="menu-content">
            <ul>
              <NuxtLink to="/strength" @click="closeMenu"><li class="num1">初めての方へ</li></NuxtLink>
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

              <li class="hr"></li>
              <NuxtLink to="/corporate" @click="closeMenu"><li class="corporate">企業向け</li></NuxtLink>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <div class="GsapMenu">
      <div class="menu sp sp_head_menu">
<!--        <div class="loginBTNs">-->
<!--          <nuxt-link to="/login">-->
<!--            <p-->
<!--                class="BtnLogin"-->
<!--                :class="{ activeLogin: isLoginActive }"-->
<!--            >-->
<!--              ログイン-->
<!--            </p>-->
<!--          </nuxt-link>-->
<!--          <nuxt-link to="/signup">-->
<!--            <p-->
<!--                class="BtnLogin2"-->
<!--                :class="{ highlighted: isSignupActive }"-->
<!--            >-->
<!--              今すぐ体験-->
<!--            </p>-->
<!--          </nuxt-link>-->
<!--        </div>-->

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


        <ul class="list">
          <li><nuxt-link to="/strength">初めての方へ</nuxt-link><span class="BG"></span></li>
          <li><nuxt-link to="/plan">料金プラン</nuxt-link><span class="BG"></span></li>
          <li><NuxtLink to="/timetable" >予約・講師検索</NuxtLink><span class="BG"></span></li>
          <li><nuxt-link to="/textbook">WEB教材</nuxt-link><span class="BG"></span></li>
          <li><nuxt-link ot="/help">ヘルプ</nuxt-link><span class="BG"></span></li>
        </ul>
        <ul class="list2">
          <li>会社法人</li>
          <li>学校法人</li>
        </ul>

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
  name: "HOME",
  path: "/"
},{
    name: "初めての方へ",
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
}

/* 切換到關閉圖標 */
.menu-toggle:checked + .menu-btn {
  background-image: url('../assets/images/logo_close.png'); /* 替換為你的開啟圖標路徑 */
}

/* 菜單內容 */
.menu-content {
  display: none;
  animation: fadeInOut 0.5s ease;
  width: 100%; /* 確保 menu-content 寬度為 100% */
  background-color: #f4f4f4; /* 增加背景色以便查看效果 */
  position: fixed; /* 固定在螢幕上 */
  top: 48px; /* 從頂部開始 */
  left: 0; /* 從左側開始 */
  z-index: 1; /* 確保菜單在按鈕下方 */
  height: fit-content;
  padding-bottom: 4vh;
  /* 添加陰影 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 可調整陰影的大小和透明度 */
}

.menu-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 999;
}

.menu-content li {
  height: 10%;
  margin: 6% 0 8% 4%;
  font-size: 1.4em;
  font-weight: bold;
  padding-left: 10px;
  border-radius: 4px;
}

.menu-content li.num1 { border-left: 8px solid #04b445; }
.menu-content li.num2 { border-left: 8px solid #039b3c; }
.menu-content li.num3 { border-left: 8px solid #ff7700; }
.menu-content li.num4 { border-left: 8px solid #e78005; }
.menu-content li.num5 { border-left: 8px solid #FBA13E; }

.menu-content li.menu6 {
  text-align: center;
  border: 2px solid #b12332;
  border-radius: 48px;
  height: 48px;
  align-items: center;
  line-height: 48px;
  width: 70%;
  margin: 0 auto 16px auto;
  font-size: 16px;
  background-color: #ffffff;
  padding-left: 0;
  color: #b12332;
}
.menu-content li.menu7 {
  text-align: center;
  border: 2px solid #b12332;
  border-radius: 48px;
  height: 48px;
  align-items: center;
  line-height: 48px;
  width: 70%;
  margin: auto;
  font-size: 16px;
  color: #ffffff;
  background-color: #b12332;
  padding-left: 0;
}
.menu-content li.menu6 a{
  color: #b12332 !important;
}
.menu-content li.menu7 a{
  color: #ffffff !important;
}
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
