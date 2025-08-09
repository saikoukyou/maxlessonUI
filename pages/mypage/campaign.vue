<template>
  <div class="campaignFlash">
    <p class="subtitle">Campaign</p>
    <h2>NETCHINA 紹介キャンペーン</h2>
    <p class="descript">ビズチャイナの中国語レッスンについて、ご満足いただけた場合、
      ぜひお友達やSNS等で紹介していただければ幸いです。
      お客様の専用紹介リンク経由で新規で登録があった場合、レッスン料金と相殺できるコインを差し上げます。</p>
  </div>
  <div class="campaignContents">
    <img src="~/assets/SVG/campaignBanner.svg" alt="" width="100%" class="campaignContentsImg">


    <div class="info_glay">
      <p class="subtitle">お客様の専用宣伝リンク</p>
      <p>{{info.proxy_url}}</p>
      <p class="subtitle">紹介コイン残高</p>
      <p><span class="coinBG">{{info.coin}}コイン</span></p>
      <p>※プラン更新時やポイント購入時に、課金するたびに、コイン残高を自動的に相殺金として利用します。</p>
    </div>

    <div class="infomation">

      <p class="subtitle">紹介コイン消費履歴</p>
      <ul class="pointGrid">
        <li>利用時間</li>
        <li>コイン数</li>
        <li>プラン名</li>
        <li>利用前金額（税込）</li>
        <li>利用後金額（税込）</li>
      </ul>
      <ul class="pointGrid" v-for="(reduceCoin,aindex) in reduce_coin_list">
        <li>{{reduceCoin.time}}</li>
        <li>{{reduceCoin.num}}</li>
        <li>{{reduceCoin.remark}}</li>
        <li>{{reduceCoin.before_amount}}</li>
        <li>{{reduceCoin.after_amount}}</li>
      </ul>
    </div>

    <div class="infomation">

      <p class="subtitle">紹介コイン獲得履歴</p>
      <ul class="pointGrid">
        <li>時間</li>
        <li>コイン数</li>
        <li>被紹介者アドレス</li>
        <li>IPアドレス</li>
        <li>詳細</li>
      </ul>
      <ul class="pointGrid" v-for="(addCoin,aindex) in add_coin_list">
        <li>{{addCoin.time}}</li>
        <li>{{addCoin.num}}</li>
        <li>{{addCoin.email}}</li>
        <li>{{addCoin.registerip}}</li>
        <li>{{addCoin.remark}}</li>
      </ul>

    </div>

  </div>


  <div style="height: 200px;"></div>
</template>

<script setup>
import {useStudentProxyInfotApi} from "~/apis/student";

// definePageMeta({
//   middleware: 'auth',
//   layout: 'mypage'
// });

let add_coin_list = ref([]);
let reduce_coin_list = ref([]);
const info = ref([]);
const { data: data } = await useStudentProxyInfotApi();
if (data?.value) {
  info.value = data?.value ?? [];
  add_coin_list.value = data?.value.add_coin_list ?? [];
  reduce_coin_list.value = data?.value.reduce_coin_list ?? [];
}

// console.log('info:'+JSON.stringify(data));
</script>