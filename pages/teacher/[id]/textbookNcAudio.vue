<template>
  <div v-if="msg" v-html="msg"></div>
</template>


<script setup>
let msg = ref('');
const route = useRoute();
if (route && route?.query?.msg) {
  msg.value = route?.query?.msg;
}
</script>