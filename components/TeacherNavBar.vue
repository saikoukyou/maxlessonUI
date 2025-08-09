<template>
  <div class="pc" v-if="!isTeacherAgoraVideo">
    <div class="row items-center justify-between padding-x-l font-size" style="height: 90px;">
      <NuxtLink to="/teacher/centre/dashboard">
        <img :src="LogoNetchina" alt="ビズチャイナ" class="smmlogoImg" width="380" />
      </NuxtLink>

      <div v-if="logged">
        <p class="padding-s padding-x-l border border-radius-l border-color-accent row gap cursor-pointer"
           style="border-width: 3px; line-height: 14px;" @click="logout">
          退出登录
        </p>
      </div>

      <div class="col gap-s accent bold" v-else style="line-height: 0.1rem;">
        <NuxtLink to="/teacher/login">
          <p class="padding-s padding-x-l border border-radius-l border-color-accent"
             style="border-width: 3px; line-height: 14px;">
            老师登录
          </p>
        </NuxtLink>
        <br>
        <NuxtLink to="/teacher/apply">
          <p class="padding-s  padding-x-l border border-radius-l border-color-accent"
             style="border-width: 3px; line-height: 14px;">
            申请职位
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>

  <div class="sp sps" v-if="!isTeacherAgoraVideo">
    <div class="row items-center justify-between padding-x-l font-size">
      <NuxtLink to="/teacher/centre/dashboard">
        <img :src="LogoNetchina" alt="ビズチャイナ" class="smmlogoImg" />
      </NuxtLink>
      <span>讲师后台</span>
    </div>
  </div>
</template>
<script setup>
import LogoNetchina from "../assets/images/Biz_logo.png";
import IconLoginRed from "../assets/SVG/icon_login_red.svg";

import { createDiscreteApi } from "naive-ui"
import {useMainStore} from "~/composables/store";
const { dialog } = createDiscreteApi(["dialog"])

const useStore = useMainStore();
let logged = useStore.teacherLoggedIn;
// const teacher = useStore.teacherInfo;
let showSpMenu = ref(false);

import { useRoute } from "vue-router"
const route = useRoute();
const isTeacherAgoraVideo = computed(() => {
  return route.fullPath.includes('/teacher/center/agoraVideo');
});


function logout() {
  dialog.warning({
    content: "是否要退出登录？",
    positiveText: "退出",
    negativeText: "取消",
    onPositiveClick: () => {
      useStore.teacherLogout();
    },
  })
}

function toggleShowMenu() {
  showSpMenu.value = !showSpMenu.value;
}
</script>
<style scoped>
.spMenu {
  position: absolute;
  right: 0;
  width: 125px;
  line-height: 36px;
  text-align: center;
}
@media screen and (max-width: 520px) {
  .sp .smmlogoImg {
    padding-top: 12px;
    margin-left: 40px;
  }
  .sps{
    height: 48px;
    width: 100%;
    position: fixed;
    background-color: white;
  }
  .sps span{
    display: block;
    position: absolute;
    left: 220px;
    top: 22px;
    font-weight: bold;
    z-index: 999;
  }
}

</style>
