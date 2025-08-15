<template>
  <div class="fheader"></div>
  <div id="top-head-my">
    <!-- 三條線 -->
    <h1 class="smmlogo_my">
      <span :key="useStore?.studentInfo?.is_corporate_member">
      <NuxtLink v-if="useStore?.studentInfo?.is_corporate_member === 0" class="logoBlock" to="/" >
      <img :src="`${LogoNetchina}?_=${new Date().getTime()}`" alt="ビズチャイナ" class="smmlogoImg_my" />
      </NuxtLink>
      <NuxtLink v-else to="/corporate" >
      <img :src="`${LogoNetchinaBiz}?_=${new Date().getTime()}`" alt="ビズチャイナ" class="smmlogoImg_hou" />
      </NuxtLink>
      </span>
      <span v-on:click="openModal" class="modal_open_btn">
          <div class="menuBtn">
            <span>{{useStore?.studentInfo?.last_name}}{{useStore?.studentInfo?.first_name}} 様</span>

          <img v-if="useStore?.studentInfo?.face_image" :src="useStore?.studentInfo?.face_image"/>
          <img v-else src="../assets/images/userfile.png" alt="" />

          </div>
      </span>
    </h1>

    <!-- モーダルウィンドウ -->
    <div v-show="showModal" class="modal_contents" :class="{'is-active': isActive}" @click.stop="stopPropagation">
      <div v-on:click="closeModal" class="modal_contents_bg"></div>
      <div class="modal_contents_wrap">
        <ul class="modal_user">
          <li>
            <img v-if="useStore?.studentInfo?.face_image" :src="useStore?.studentInfo?.face_image" />
            <img v-else src="../assets/images/userfile.png" alt="" />
          </li>
          <li>{{useStore?.studentInfo?.last_name}}{{useStore?.studentInfo?.first_name}}</li>
          <li>{{useStore?.studentInfo?.email}}</li>
        </ul>

        <NuxtLink :to="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id ? '' : '/mypage/userInfo'" @click.native="closeModal">
          <p v-if="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id">アカウント設定</p>
          <p v-else>アカウント設定</p>
        </NuxtLink>
        <NuxtLink v-if="useStore?.studentInfo?.business_is_auto_reserve === 1" :to="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id ? '' : '/mypage/reserveInfo'" @click.native="closeModal">
          <p v-if="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id" style="opacity:0.5">自動予約設定</p>
          <p v-else>自動予約設定</p>
        </NuxtLink>
        <div v-if="useStore?.studentInfo?.contract_status == 'Regular'">
          <NuxtLink v-if="useStore?.studentInfo?.is_corporate_member === 1" to="/mypage/attendanceRateTimes" @click.native="closeModal">
            <p>受講証明の発行</p>
          </NuxtLink>
          <NuxtLink v-else to="/mypage/attendanceRates" @click.native="closeModal">
            <p>受講証明の発行</p>
          </NuxtLink>
        </div>
<!--        <NuxtLink :to="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id ? '' : '/mypage/campaign'" @click.native="closeModal">-->
<!--          <p v-if="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id" style="opacity:0.5">友達紹介</p>-->
<!--          <p v-else>友達紹介</p>-->
<!--        </NuxtLink>-->
<!--        <NuxtLink :to="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id ? '' : '/help'" @click.native="closeModal">-->
<!--          <p v-if="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id" style=" opacity:0.5">ヘルプ</p>-->
<!--          <p v-else>ヘルプ</p>-->
<!--        </NuxtLink>-->

        <hr style="margin-bottom: 20px;">
          <a href="#" @click="logout"><span class="logoutBtn">ログアウト</span></a><br>
<!--          <span v-on:click="closeModal" class="modal_close_btn">閉じる</span>-->
      </div>
    </div>
  </div>

</template>
<script setup>
import LogoNetchina from "../assets/images/footer_logo.png";
import LogoNetchinaBiz from "../assets/images/houjin_logo.png";

import {useMainStore} from "~/composables/store";

const route = useRoute()
const showModal = ref(false);
// const showMenu = ref(false);
const useStore = useMainStore();
const isActive = ref(false);

const openModal = () => {
  showModal.value = !showModal.value;
  // toggleMenu();
};

const closeModal = () => {
  if (!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id) {

  } else {
    showModal.value = false;
  }
  // toggleMenu();
};

// const toggleMenu = () => {
//   showMenu.value = !showMenu.value;
// };

const logout = () => {
  useStore.studentLogout();
}

// 阻止事件冒泡到全局监听器
function stopPropagation(event) {
  event.stopPropagation();
}

// 全局点击事件处理函数
function handleOutsideClick(event) {
  // 假设.my-div是你的div的类名
  const divElement = document.querySelector('.modal_contents');
  const openDiv = document.querySelector('.modal_open_btn');
  if (openDiv?.contains(event.target)) {
    showModal.value = true;
  } else if (!divElement?.contains(event.target)) {
    showModal.value = false;
  }
}

// 组件挂载时添加事件监听器
onMounted(() => {
  document.addEventListener('mouseover', handleOutsideClick);
});

// 组件销毁前移除事件监听器
onBeforeUnmount(() => {
  document.removeEventListener('mouseover', handleOutsideClick);
});

async function switchAccount(newAccountInfo) {
  await useStore.updateStudentInfo(newAccountInfo); // 確保狀態更新
}


</script>
<style scoped>

.mobileMenu{display: none;}

.modal_contents_wrap a{
  cursor: pointer;
}

.imgCircle{
  border-radius: 100px;
}

@media screen and (max-width: 520px) {

  .mobileMenu{
    display: inline-block;
  }

  #top-head-my{
    width: 100%;
    height: 48px;
  }
  .fheader{
    height: 48px;
  }
  .smmlogo_my{
    width: 100%;
  }
  .smmlogoImg_my{
    position: absolute;
    display: inline-block;
    width: 154px;
    top: -2px;
    left: 48px;
  }
  .smmlogoImg_hou{
    position: absolute;
    display: inline-block;
    width: 178px;
    top: -3px;
    left: 48px;
  }
  .modal_open_btn{
    margin-top: 5px;
  }
  .myName{
    left: 206px;
    font-size: 15px;
    top: 20px;
  }
}
</style>
