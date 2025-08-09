<template>
  <ul class="links">
    <li v-for="(item,index) in useStore?.teacherMenu" :class="item.key === useStore?.activeTeacherUrl ? 'active' : ' '"
        @click="changeMenu(item.key)">
      <router-link :to="item.key">
        <n-icon :size="30">
        <CalendarOutline v-if="item.icon == 'CalendarOutline'" />
        <StatsChartOutline v-if="item.icon == 'StatsChartOutline'" />
        <ListCircleOutline v-if="item.icon == 'ListCircleOutline'" />
        <AccessibilityOutline v-if="item.icon == 'AccessibilityOutline'" />
        <RibbonOutline v-if="item.icon == 'RibbonOutline'" />
        <InformationOutline v-if="item.icon == 'InformationOutline'" />
        <DiamondOutline v-if="item.icon == 'DiamondOutline'" />
        <FileTrayOutline v-if="item.icon == 'FileTrayOutline'" />
        <PersonOutline v-if="item.icon == 'PersonOutline'" />
        <StarOutline v-if="item.icon == 'StarOutline'" />
        </n-icon>
        <span>{{ item.text }}
            <span class="red-dot" v-if="item.key === '/teacher/centre/solution' && unNum > 0">
            </span>
          </span>
      </router-link>
    </li>
  </ul>
</template>
<script setup>
import { ref } from "vue"
import { CalendarOutline, GitNetwork, StatsChartOutline, ListCircleOutline, AccessibilityOutline, RibbonOutline, InformationOutline, DiamondOutline, FileTrayOutline, PersonOutline, StarOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import {useOnlineQuestionUnReadData} from "~/apis/teacher";
const links = ref([
	// { key: "/teacher/centre/dashboard", text: "工作台", icon: "StatsChartOutline" },
	// { key: "/teacher/centre/calendar", text: "所有预约一览", icon: "CalendarOutline" },
	// { key: "/teacher/centre/class", text: "公开课表", icon: "ListCircleOutline" },
	// { key: "/teacher/centre/class-evaluate", text: "我的课程评价", icon: "AccessibilityOutline" },
	// { key: "/teacher/centre/solution", text: "解疑答惑", icon: "RibbonOutline" },
	// { key: "/teacher/centre/message", text: "信息一览", icon: "InformationOutline" },
	// { key: "/teacher/centre/class-fee", text: "课时费管理", icon: "DiamondOutline" },
	// { key: "/teacher/centre/contract", text: "讲师协议", icon: "FileTrayOutline" },
	// { key: "/teacher/centre/info", text: "我的账户", icon: "PersonOutline" },
	// { key: "/teacher/centre/recommend", text: "讲师推荐", icon: "StarOutline" },
])
const selectedMenu = ref('');
const useStore = useMainStore();
const teacher = useStore.teacherInfo;
const route = useRoute();
let unNum = ref(0);

// if (route) {
//   selectedMenu.value = route.path;
//   console.log('selectedMenu.value:'+selectedMenu.value);
// }

const emit = defineEmits(['toggleShowMenu'])
function changeMenu(key) {
  if (useStore?.teacherInfo) {
    if (useStore.teacherInfo.apply_status === 5) {
      useStore.setActiveTeacherUrl("/teacher/centre/info");
    } else if (useStore.teacherInfo.apply_status === 6) {//合同
      useStore.setActiveTeacherUrl(key);
    } else {
      useStore.setActiveTeacherUrl(key);
      // selectedMenu.value  = key;
    }
  } else {
    useStore.setActiveTeacherUrl(key);
    // selectedMenu.value  = key;
  }

  emit("toggleShowMenu")
  navigateTo(useStore?.activeTeacherUrl, { replace: true });
}

async function getUnReadCount() {
  const {data: info  } = await useOnlineQuestionUnReadData();
  if (info.value) {
    unNum.value = info.value.num;
  }
}
onMounted(() => {
  // if (route) {
  //   selectedMenu.value = route.path;
  // }
  // console.log('selectedMenu.value:'+selectedMenu.value);
  getUnReadCount();
});
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
</style>