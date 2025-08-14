<template>
<!--    <div class="mt-auto bg-dark-400 text-light-500">-->
<!--        <div class="flex  items-center justify-center py-4">-->
<!--            <a :href="item.url" v-for="item in footerLinkArrays" :key="item.name" class="p-3">{{item.name}}</a>-->
<!--        </div>-->
<!--        <div class="container mx-auto border-t border-gray-600 flex  items-center justify-center !py-4">-->
<!--            <small>-->
<!--                Copyright© 2022 大赵同学 鄂ICP备 1000000号-1-->
<!--            </small>-->
<!--        </div>-->
<!--    </div>-->
  <div class="footer_pages">
    <div class="footerWrap">
      <ul class="footerLogo" style="width: 40%;">
        <li>
          <nuxt-link to="/">
          <img src="../assets/images/footer_logo.png" width="282">
          </nuxt-link></li>
        <li>info@netkorea.jp</li>
        <li>24時間メール受付中</li>
      </ul>
      <ul class="footerMenu firstmenu">
        <li>運営会社</li>
        <li><NuxtLink to="/overview">会社概要</NuxtLink></li>
        <li><NuxtLink to="/rule">利用規約</NuxtLink></li>
        <li><NuxtLink to="/siteprivacy">プライバシーポリシー</NuxtLink></li>
        <li><NuxtLink to="/legalnotice">特定商取引法に基づく表記</NuxtLink></li>
        <li><NuxtLink to="/sitemap">サイトマップ</NuxtLink></li>
      </ul>
      <ul class="footerMenu">
        <li>受講関係</li>
        <li><NuxtLink to="/plan">料金プラン</NuxtLink></li>
        <li><NuxtLink to="/textbook">教材一覧</NuxtLink></li>
        <li><NuxtLink to="/timetable">講師一覧</NuxtLink></li>
      </ul>
      <ul class="footerMenu">
        <li>よくある質問</li>
        <li><NuxtLink to="/corporate" target="_blank">法人のお客様</NuxtLink></li>
        <li><NuxtLink to="/help">お問い合わせ</NuxtLink></li>
        <li><NuxtLink to="/help">よくある質問</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// let footerLinkArrays = [
//     {
//         name: "项目源码",
//         url: "https://github.com/webyang-male/nuxt3-edu"
//     },
//     {
//         name: "其他项目",
//         url: "https://github.com/webyang-male/vue3-mallManage",
//     },
//     {
//         name: "站长博客",
//         url: "//www.bugjs.cn"
//     },
//     {
//         name: "烂笔头",
//         url: "https://doc.zzychaser.top/#/"
//     },
// ]
</script>