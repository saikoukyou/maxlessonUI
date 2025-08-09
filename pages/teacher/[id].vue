<template>
  <NuxtLayout name="teacher">
    <div page="teacher-detail" v-if="!isAgoraVideoPage">
      <Menu class="menu" />
      <div class="main pc">
        <NuxtPage />
      </div>
      <div class="mainsp sp">
        <NuxtPage />
      </div>
    </div>
    <template v-else>
      <NuxtPage />
    </template>
  </NuxtLayout>
</template>

<script setup>
import Menu from "./components/menu.vue"
import {watch, onMounted, computed} from "vue"
import {useRoute} from "vue-router"

const useStore = useMainStore();
definePageMeta({
  layout: false,
  middleware: ["teacher-auth"]
});

const route = useRoute();
if (route) {
  useStore.activeTeacherUrl = route.path;
}

// 判斷是不是 agoraVideo 頁面
const isAgoraVideoPage = computed(() => {
  return route.path === '/teacher/center/agoraVideo'
})

onMounted(() => {
  useStore.useRefreshTeacherInfo();
})
</script>
