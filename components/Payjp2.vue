<script setup lang="ts">
// 公開鍵を登録し、起点となるオブジェクトを取得します
const payjp = window.Payjp('pk_test_a09f89053214dde21b012e7b')

// elementsを取得します。ページ内に複数フォーム用意する場合は複数取得ください
const elements = payjp.elements()

// element(入力フォームの単位)を生成します
const cardElement = elements.create('card')

// elementをDOM上に配置します
cardElement.mount('#v2-demo')

// ボタンが押されたらtokenを生成する関数を用意します
function onSubmit(event) {
  payjp.createToken(cardElement).then(function(r) {
    // window.mount('#token').innerText = r.error ? r.error.message : r.id
  })
}
</script>
<template>
  <div id="v2-demo" class="payjs-outer"><!-- ここにフォームが生成されます --></div>
  <button onclick="onSubmit(event)">トークン作成</button>
  <span id="token"></span>
</template>

<style scoped>
/* 必要に応じてフォームの外側のデザインを用意します */
div.payjs-outer {
  border: thin solid #198fcc;
}
</style>
