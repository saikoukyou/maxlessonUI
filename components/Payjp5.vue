<script setup lang="ts">
import {onMounted} from "vue";

let token = ref('');
let error = ref('');

onMounted(() => {
  console.log('PAYJP_PUBLIC_KEY:'+process.env.PAYJP_PUBLIC_KEY);
  const payjp = window.Payjp('pk_test_a09f89053214dde21b012e7b') // ここに PAY.JP の公開鍵を追加する
  const elements = payjp.elements()
  const cardElement = elements.create('card')
  cardElement.mount('#payjp-form')
  cardElement.on('change', async (event) => {
    if (event.complete) {
      const res = await payjp.createToken(cardElement) // トークン生成
      token.value = res.id
      console.log(token.value)
      if (error.value) {
        error.value = ''
      }
    }
    if (event.error) {
      error.value = event.error.message
    }
  })
})

</script>

<template>
  <div class="wrap">
    <div id="payjp-form"></div>
    <span class="error">{{ error }}</span>
  </div>
</template>

<style scoped>

</style>