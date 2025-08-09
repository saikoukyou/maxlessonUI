<template>
  <div class="container">
    <div v-html="videoInfo">

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  // middleware: 'auth',
  layout: false
});
const videoInfo = ref('');
const route = useRoute();
if (route?.query?.video) {
  videoInfo.value = route?.query?.video;
}

</script>


<style scoped>
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 设置容器高度为视口高度 */
}
</style>