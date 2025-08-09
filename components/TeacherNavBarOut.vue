<template>
  <div class="pc">
    <div class="row items-center justify-between padding-x-l font-size" style="height: 80px;">

      <NuxtLink to="/teacher">
        <img :src="LogoNetchina" alt="ビズチャイナ" class="smmlogoImg"/>
      </NuxtLink>

      <div v-if="logged">
        <p class="padding-s padding-x-l border border-radius-l border-color-accent row gap cursor-pointer" style="border-width: 3px; line-height: 14px;">
          <nuxt-link to="/teacher/centre/dashboard">
            讲师后台</nuxt-link>
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
  <div class="sp">
    <div class="row items-center justify-between padding-x-l font-size">
      <NuxtLink to="/teacher/apply">
        <img :src="LogoNetchina" alt="ビズチャイナ" class="smmlogoImg"/>
      </NuxtLink>
      <div v-if="logged">
        <p class="padding-s padding-x-l border border-radius-l border-color-accent row gap cursor-pointer" style="border-width: 3px; line-height: 14px;">
          <nuxt-link to="/teacher/centre/dashboard"><img :src="IconLoginRed" alt="" class="icon_login"> 讲师后台</nuxt-link>
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

</template>
<script setup>
import LogoNetchina from "../assets/images/Biz_logo.png";
import IconLoginRed from "../assets/SVG/icon_login_red.svg";
import {useMainStore} from "~/composables/store";

const useStore = useMainStore();
let logged = useStore.teacherLoggedIn;
</script>

<style scoped>
  .smmlogoImg{
    width: 220px;
  }
  .FVimg{
    height: auto;
  }
  .pc{
    width: 1110px; margin: auto;
  }
  @media screen and (max-width: 520px) {
    .pc{
      display: none;
    }
    .smmlogoImg{
      width: 150px;
      position: absolute;
      padding-top: 0;
      margin-top: -10px;
      margin-left: 0;
    }
    .items-center{
      height: 54px;
    }
    .gap-s{

    }
  }
</style>
