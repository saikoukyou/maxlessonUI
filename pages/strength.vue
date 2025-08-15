<template>
  <div class="topTemplate page-wrapper">
    <!-- NetKOREA 介紹區塊 -->

    <div class="cv-hero">
      <div class="cv-hero__content">
        <picture>
          <source srcset="../assets/images/slogen_m.png" class="cv-hero__img" media="(max-width: 520px)">
          <img src="../assets/images/slogen.png" alt="Slogan" class="cv-hero__img">
        </picture>
      </div>
    </div>

    <section class="nk-section">
      <img src="../assets/images/s_arrow.png" class="s_arrow">
      <div class="nk-wrap">
        <h2 class="nk-title">NetKOREAとは？</h2>
        <p class="nk-intro">
          私たちはオンラインの1対1韓国語学習教室です。韓国人講師が設計した教材で、自然な韓国語を学びながら
          韓国文化にも深く理解できます。全講師がネイティブで、自宅にいながら本場の韓国語に触れられます。
          POP、ドラマ、旅行など、興味のあることから学び始め、韓国語を習得して未来の可能性を広げましょう！
        </p>
      </div>

      <!-- POINT 01 -->
      <div class="nk-row">
        <div class="nk-wrap nk-flex">
          <div class="nk-text">
            <img class="nk-point-badge" src="../assets/images/s_p1.png" alt="POINT 01">
            <h3 class="nk-h3">ネイティブの韓国人講師が日本語で対応可能</h3>
            <p class="nk-p">
              初心者の方でも安心して学んでいただけるように、日本語が話せる韓国人講師を中心に採用しています。
              ネットコリアの柔軟な対応力は、日本語でのレッスンが可能な点です。ぜひ一度レッスンを体験してください。
            </p>
          </div>
          <div class="nk-media">
              <img src="../assets/images/sphoto1.png" alt="韓国の寺院と桜の写真">
          </div>
        </div>
      </div>

      <!-- POINT 02（左右對調） -->
      <div class="nk-row nk-row--alt">
        <div class="nk-wrap nk-flex">
          <div class="nk-media">
            <picture>
              <img src="../assets/images/sphoto2.png" alt="ノートPCで学習する写真">
            </picture>
          </div>
          <div class="nk-text">
            <img class="nk-point-badge" src="../assets/images/s_p2.png" alt="POINT 02">
            <h3 class="nk-h3">ネット学習に特化したオリジナル教材を無料提供</h3>
            <p class="nk-p">
              ネットコリアで使われている教材はすべて、TOPIK（韓国語能力試験）の基準に基づき、
              実用性と語彙力に焦点を置いたものです。ネット学習の特性を活かした教材で、効率よく体系的に韓国語を学べます。
              全教材2,000課以上を会員様に無料で提供しています。
            </p>
          </div>
        </div>
      </div>

      <!-- POINT 03 -->
      <div class="nk-row">
        <div class="nk-wrap nk-flex">
          <div class="nk-text">
            <img class="nk-point-badge" src="../assets/images/s_p3.png" alt="POINT 03">
            <h3 class="nk-h3">日本人スタッフによる安心のサポート体制</h3>
            <p class="nk-p">
              弊社は東京本社勤務の日本人スタッフが、お客様の韓国語学習をサポートします。
              学習に関するお悩みにも丁寧に対応いたします。
            </p>
          </div>
          <div class="nk-media">
              <img src="../assets/images/sphoto3.png" alt="カスタマーサポートの写真">
          </div>
        </div>
      </div>

    </section>

  </div>
  <section class="k-cta">
    <div class="k-cta__inner">


      <!-- 裝飾圖：手勢（桌機/手機切換） -->
      <picture class="k-cta__deco k-cta__deco--hand">
        <!-- 手機版 -->
        <source srcset="../assets/images/kword_m.png" media="(max-width: 520px)">
        <!-- 預設（桌機版） -->
        <img class="kword" src="../assets/images/kword.png" alt="" aria-hidden="true">
      </picture>

      <button class="top-cta--reverse">
        <span>100円体験</span>
        <img src="../assets/images/arrow_g.png" alt="arrow">
      </button>
      <img class="kflag" src="../assets/images/kflag.png" alt="" aria-hidden="true">
      <img class="khand" src="../assets/images/khand.png" alt="" aria-hidden="true">
    </div>
  </section>
</template>


<style scoped>
/* 容器背景（獨立命名） */
.cv-hero{
  background-image: url("../assets/images/cvimg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top left;
  /* 初始透明 & 背景往下偏一點 */
  opacity: 0;
  animation: cvHeroBgUp .8s ease-out forwards;
}

/* 內容區：置中、寬高、背景定位（若需要） */
.cv-hero__content{
  width: 1240px;
  height: 380px;
  margin: 0 auto;
  display: flex;
  align-items: center;   /* 垂直置中 */
  justify-content: center; /* 水平置中 */
  background-repeat: no-repeat;
  background-position: top right -80px;
}

/* 圖片尺寸 + 進場動畫 */
.cv-hero__img{
  width: 400px;
  max-width: 100%;
  height: auto;
  opacity: 0.9;
}

/* 進場關鍵影格 */
@keyframes cvHeroBgUp {
  0% {
    opacity: 0;
    background-position: center bottom -20px; /* 往下偏移一點 */
  }
  100% {
    opacity: 1;
    background-position: center bottom; /* 回到正常位置 */
  }
}

/* 無障礙：使用者偏好減少動效時停用動畫 */
@media (prefers-reduced-motion: reduce){
  .cv-hero__img{
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.s_arrow{
  margin: auto;
  width: 18px;
}
/* ========== Base ========== */
.nk-section{
  position: relative;
  padding: 32px 0 72px;
  overflow: hidden;      /* 避免裝飾圖溢出捲軸 */
}

.nk-wrap{
  width: min(960px, 100%);
  margin: 24px auto 56px;     /* 原本 32px / 100px 偏大 */
  padding: 0 20px;            /* 左右安全留白 */
}
/* --- 桌機預設：左右 50% / 50% --- */
.nk-flex{
  display: grid;
  grid-template-columns: 1fr 1fr; /* 50% / 50% */
  gap: 40px;
  align-items: center;
}

/* 第二區塊桌機也維持 50/50（僅明示，不變換順序） */
.nk-row--alt .nk-flex{
  margin: 60px auto;
  grid-template-columns: 1fr 1fr;
}

/* 文字與圖片卡片樣式維持不變 */
.nk-media img{
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0,0,0,.05);
}

.nk-title{
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: bold;
  text-align: center;
}
.nk-h3{
  font-size: 26px;
  margin-bottom: 8px;
  font-weight: bold;
  line-height: normal;
}
.nk-point-badge{
  width: 120px;
  left: -36px;
  top: 0;
  position: absolute;
}
.nk-text{
  position: relative;
  padding-top: 60px;
}
.nk-intro{
  text-align: center;
  font-size: 16px;
  line-height: 28px;
}
.nk-p{
  line-height: normal;
}

/* --- 手機：改直向堆疊，order 才會生效 --- */
@media (max-width: 520px){
  .nk-section{
    padding: 20px 16px 32px;  /* 上中下分明，別用單一 16px 造成擁擠 */
    overflow: hidden;
  }
  .nk-wrap{
    width: 100%;
    margin: 16px auto 24px;   /* 短一點，避免整段下方太垂墜 */
    padding: 0 12px;          /* 手機再小一點側邊留白 */
  }
  /* 手機改直向堆疊 */
  .nk-flex{
    display: flex;
    flex-direction: column;
    gap: 16px;               /* 防止額外外距把容器撐開 */
  }
  /* 文字在上、圖片在下；移除桌機為徽章預留的上方空間 */
  .nk-text{
    order: 1;
    padding-top: 0;           /* 取消 60px 推移 */
    margin-top: 0;            /* 取消任何負邊距 */
  }
  .nk-media{
    order: 2;
  }
  .nk-point-badge{
    position: static;         /* 不要絕對定位以免溢出 */
    width: 112px;
    margin: 4px 0 -10px -20px;        /* 給一點自然間距 */
    left: auto; top: auto;
  }
  .nk-media img{
    margin-bottom: 16px;
  }
  .nk-title{ font-size: 26px; }
  .nk-h3{ font-size: 20px; line-height: 1.4; }
  .nk-intro{ font-size: 15px; line-height: 26px; }


  .cv-hero__content {
    width: 100%;
    height: auto;
    min-height: 280px;
    padding: 40px 16px;
    flex-direction: column;
    background-position: center top;
    background-size: cover;
  }
  .cv-hero__img {
    width: 60%;
    margin: 0 auto;
    opacity: 0.8;
  }
  .nk-row--alt .nk-flex{
    margin: 0;
  }

}

</style>