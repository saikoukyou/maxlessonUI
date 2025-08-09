<template>
	<div class="menu pc">
		<div class="info" v-if="useStore.teacherInfo">
			<p style="margin-bottom: 1.4rem;">
<!--        <CalendarOutline style="height:2rem;width: 2rem;" />-->
        <span class="sideTitle">讲师后台</span>
      </p>

      <img :src="useStore.teacherInfo.face_img5" alt="" class="teacherImg"/>
      <ul class="teacherBack" >
        <li class="pinyin">{{useStore.teacherInfo.name_pinyin}}</li>
        <li class="name">{{ useStore.teacherInfo.name_cn }}<span class="teacherID">ID：{{ useStore.teacherInfo.id }}</span></li>
        <li class="rank">{{ useStore.teacherInfo.province_addr }}{{ useStore.teacherInfo.current_address }}</li>
        <li class="rank">{{ useStore.teacherInfo.rank }}</li>

      </ul>

			<br />
			<br />
			<p class="center bold hours-label">累积授课时间</p>
			<p class="center hours TotalMeasure"><b>{{useStore.teacherInfo.attend_class*0.5}}</b>小时</p>
		</div>

    <TeacherMenu></TeacherMenu>
	</div>
  <div id="top-toggle" class="sp" @click="toggleShowMenu">
    <div class="barres">
      <div class="hamburger">
      </div>
    </div>
  </div>
  <div v-if="showSpMenu" class="sp menu spMenu">
    <div style="cursor: pointer;" @click="logout">退出登录</div>
    <TeacherMenu @toggleShowMenu="toggleShowMenu"></TeacherMenu>
  </div>
</template>
<script setup>
import TeacherMenu from "~/pages/teacher/components/teacher-menu.vue";
import {createDiscreteApi} from "naive-ui";

const { dialog } = createDiscreteApi(["dialog"])
const useStore = useMainStore();
// const teacher = useStore.teacherInfo;
let showSpMenu = ref(false);
function toggleShowMenu() {
  showSpMenu.value = !showSpMenu.value;
}

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
</script>
<style scoped>
.red-dot {
  width: 12px;
  height: 12px;
  background-color: #E63737;
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px;
  position: relative;
  top: 2px;
}
.spMenu {
  position: absolute;
  left: 0;
  width: 125px;
  line-height: 36px;
  text-align: center;
  z-index:800;
  background-color: #C5C5C5;
}
.teacherBack {
  flex-direction: column;
  padding: 0;
  margin-left: 12px;
  display: inline-block;
}

.teacherBack li {
  color: #424242;
}

.teacherBack .pinyin {
  font-size: 13px;
  font-weight: bold;
  margin: 4px 0 5px 0;
}

.teacherBack .name {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  margin: 2px 0 6px 0;
}
.teacherBack .teacherID{
  font-size: 13px;
  margin-left: 6px;
}
.teacherBack .rank{
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 2px;
}
.teacherImg{
  display: inline-block;
  width: 64px;
  margin-left: 16px;
}

@media screen and (max-width: 520px) {
  .spMenu{
    width: 40% !important;
    margin-top: 48px;
  }
}

</style>