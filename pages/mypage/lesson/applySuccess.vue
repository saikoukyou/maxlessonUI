<script setup lang="ts">

import {NButton} from "naive-ui";
</script>

<template>
  <div class="blockW">
    <div class="submit-status-container">
      <div class="submit-status-text">提出が完了しました。<br>審査をお待ちください。</div>
      <nuxt-link to="/mypage/mypageReserved">
        <n-button class="return-button">
          <span>戻る</span>
        </n-button>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.submit-status-container {
  text-align: center;
  padding: 20px;
}

.submit-status-text {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
  line-height: 32px;
}

.return-button {
  background-color: #f36c21;
  color: white;
  border-radius: 12px;
  padding: 24px 60px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.return-button:hover {
  background-color: #d95e1a;
}

</style>