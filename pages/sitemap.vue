<template>
  <section class="PlanPrice">
    <div class="PlanPrice__inner">
    <div class="subPosition">
      <span class="subTitle">サイトマップ</span>
    </div>
    </div>
  </section>

  <div class="sitemap-page">
    <div class="sitemap-columns">
      <!-- 一般の方向け -->
      <div class="sitemap-col">
        <h3 class="sitemap-section-title">
          <span class="section-index">一般の方向け</span>
        </h3>
        <ul>
          <li><NuxtLink to="/">HOME</NuxtLink></li>
          <li><NuxtLink to="/blogs?id=18">記事一覧</NuxtLink></li>
          <li><NuxtLink to="/strength">NetKOREAについて</NuxtLink></li>
          <li><NuxtLink to="/plan">料金プラン</NuxtLink></li>
          <li><NuxtLink to="/timetable">講師一覧（先生で検索）</NuxtLink></li>
          <li><NuxtLink to="/everytime">講師一覧（時間で検索）</NuxtLink></li>
          <li><NuxtLink to="/textbook">教材一覧</NuxtLink></li>
          <li><NuxtLink to="/help">よくある質問</NuxtLink></li>
          <li><NuxtLink to="/login">ログイン</NuxtLink></li>
          <li><NuxtLink to="/plan">100円体験</NuxtLink></li>
          <li><NuxtLink to="/mypage/mypageReserved">マイページ</NuxtLink></li>
        </ul>
      </div>

      <!-- 法人専用 -->
      <div class="sitemap-col sitemap-col--corporate">
        <h3 class="sitemap-section-title">
          <span class="section-index">法人専用</span>
        </h3>
        <ul>
          <li><NuxtLink to="/corporate">法人トップ</NuxtLink></li>
          <li><NuxtLink to="/corporate/content">研修サービス内容</NuxtLink></li>
          <li><NuxtLink to="/corporate/plan">料金プラン</NuxtLink></li>
          <li><NuxtLink to="/corporate/score">導入実績</NuxtLink></li>
          <li><NuxtLink to="/corporate/download">イベント＆資料</NuxtLink></li>
          <li><NuxtLink to="/corporate/contact">お問い合わせ</NuxtLink></li>
          <li><NuxtLink to="/corporate/login">ログイン</NuxtLink></li>
          <li><NuxtLink to="/mypage/mypageReserved">マイページ</NuxtLink></li>
        </ul>
      </div>
    </div>

    <!-- フッターリンク -->
    <div class="sitemap-columns">
      <div class="sitemap-col">
        <h3 class="sitemap-section-title">
          <span class="section-index">運営会社</span>
        </h3>
        <ul>
          <li><NuxtLink to="/overview">会社概要</NuxtLink></li>
          <li><NuxtLink to="/rule">利用規約</NuxtLink></li>
          <li><NuxtLink to="/siteprivacy">プライバシーポリシー</NuxtLink></li>
          <li><NuxtLink to="/legalnotice">特定商取引法に基づく表記</NuxtLink></li>
          <li><NuxtLink to="/sitemap">サイトマップ</NuxtLink></li>
        </ul>
      </div>
    </div>

  </div>


</template>

<style scoped>

.sitemap-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: "Noto Sans JP", sans-serif;
  color: #333;
}

.sitemap-columns {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

/* 每欄固定寬度 */
.sitemap-col {
  flex: 0 0 47%;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* 輕微陰影 */
  padding: 10px 20px;
}

/* footer 標題樣式 */
.sitemap-footer h4 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #c0392b; /* 深橘紅 */
  line-height: 32px;
  border-left: 4px solid #c0392b;
  padding-left: 0.5rem;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin: 0.8rem 0;
  position: relative;
  padding-left: 1.2rem;
  font-size: 0.95rem;
}

li::before {
  content: "●";
  position: absolute;
  left: 0;
  top: 0.25rem;
  font-size: 0.5rem;
  color: #c0392b; /* 點點改為磚紅色 */
}

/* 超連結樣式 */
a,
NuxtLink {
  color: #424242;
  text-decoration: none;
  transition: all 0.2s ease;
}

a:hover,
NuxtLink:hover {
  text-decoration: underline;
}

/* 標題區塊樣式（像你最後提供那張圖） */
.sitemap-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffe5cc; /* 橘色淡背景 */
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-left: 4px solid #c0392b; /* 深橘紅線條 */
  color: #333;
  margin-bottom: 1rem;
  transition: background-color 0.2s ease;
}

.section-index {
  margin-right: 0.5rem;
  color: #c0392b;
}

.section-arrow {
  font-size: 1rem;
  color: #c0392b;
}
/* 藍色法人專用區塊 */
.sitemap-col--corporate .sitemap-section-title {
  background-color: #f0f6fb;
  border-left: 4px solid #1e75bb;
  color: #1e75bb;
}

.sitemap-col--corporate .section-index,
.sitemap-col--corporate .section-arrow {
  color: #1e75bb;
}

.sitemap-col--corporate li::before {
  color: #1e75bb;
}

.sitemap-col--corporate li {
  color: #424242;
}

.sitemap-col--corporate a,
.sitemap-col--corporate NuxtLink {
  color: #1e75bb;
}


/* RWD: 手機變單欄 */
@media (max-width: 768px) {
  .sitemap-col {
    flex: 0 0 100%;
    margin-bottom: 2rem;
  }
}

</style>
<script setup lang="ts">
</script>