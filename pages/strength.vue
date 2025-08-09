<template>
  <div style="background-color: #F9F9F9;">
    <section class="PlanPrice">
      <div class="subPosition">
        <span class="subTitle">初めての方へ</span>
      </div>
    </section>

    <div class="course-section">
      <!-- 學習コース -->
      <div class="course-block course-learn">
        <div class="course-img">
          <img src="../assets/images/first_learn.png" alt="総合コース">
        </div>
        <div class="course-content">
          <h3 class="course-title learn-title">総合コース</h3>
          <p class="course-desc">
            文法・会話・テスト対策までバランスよく学べる、初心者からビジネスレベルまで対応の実践型コースです。日本語対応可能なネイティブ講師（一部を除く）と総合的に中国語力を伸ばします。
          </p>

          <div class="teacher-note">
            <NuxtLink to="/timetable?learn_type=0" class="link-label-orange">総合講師：</NuxtLink>
            「総合コース」担当講師予約可能、講師が日本語で対応可。
          </div>
          <div class="teacher-note">
            <NuxtLink to="/textbook?learn_type=0" class="link-label-orange">総合教材：</NuxtLink>
            すべてのジャンルの教材が使用可能です。
          </div>


          <div class="course-tags">
            <span>ゼロから学べる</span>
            <span>基礎から実践まで</span>
            <span>ステップアップ</span>
          </div>
        </div>
      </div>

      <!-- 会話コース -->
      <div class="course-block course-speak">
        <div class="course-img">
          <img src="../assets/images/first_speak.png" alt="会話コース">
        </div>
        <div class="course-content">
          <h3 class="course-title speak-title">会話コース</h3>
          <p class="course-desc">
            対話練習を通じて、自然な表現と反応力を養います。日本語が話せないネイティブ講師が担当しますので、すでに中国語で会話ができる方向けのコースです。
          </p>

          <div class="teacher-note">
            <NuxtLink to="/timetable?learn_type=1" class="link-label-green">会話講師：</NuxtLink>
            「会話コース」担当講師予約可能、オール中国語（日本語不可）。
          </div>
          <div class="teacher-note">
            <NuxtLink to="/textbook?learn_type=1" class="link-label-green">会話教材：</NuxtLink>
            使用可能な教材は「トピック会話」と「ニュース」のみです。
          </div>

          <div class="course-tags">
            <span>オール中国語</span>
            <span>アウトプット専用</span>
            <span>会話に特化</span>
          </div>
        </div>
      </div>
    </div>


    <div>
      <ul class="threeBlock">
        <li><span class="stt">柔軟性のある、<br/><span class="orafont">お支払いタイプ</span></span><span class="sdd">サブスクでも、買い切りチケットでも、お好きな支払いタイプでご利用可能</span></li>
        <li><span class="stt">日本人スタッフによる安心の<span class="orafont">サポート体制</span></span><span class="sdd">弊社の日本人スタッフがお客様の学習をサポート、中国語学習歴があるため、中国語の学習悩み相談にも対応</span></li>
        <li><span class="stt">両コース<span class="orafont">体験可能</span></span><span class="sdd">各コース100円で7日間7コマの体験できます。<br>総合コースと会話コースのどちらも体験が可能。</span></li>
      </ul>
    </div>




    <span class="loginTitle">ご利用の流れ</span>

  <div class="loginArea" style="background-color: #FFFFFF;">
    <ul>
      <li>
        <img src="../assets/images/img_step1.png"/>
        <span class="title">プランを選ぶ</span>
        <span class="des"><a class="linkS" href="/plan">料金プラン</a>で、体験したいコースを選択してください。</span>
      </li>
      <li><img src="../assets/images/arrow_orange.png" width="24"/></li>
      <li>
        <img src="../assets/images/img_step2.png"/>
        <span class="title">１００円のお支払い</span>
        <span class="des">お名前とメールアドレスを入力し、100円で体験に申し込めます。</span>
      </li>
      <li><img src="../assets/images/arrow_orange.png" width="24"/></li>
      <li>
        <img src="../assets/images/img_step3.png"/>
        <span class="title">レッスンを予約</span>
        <span class="des">登録完了後、すぐにレッスン予約が可能です！</span>
      </li>

    </ul>
    <div class="happyM">
      <img src="../assets/images/icon_happy.png" width="56"/>
      <span class="happyT">気軽に体験</span>
      <span class="happyD">初回のレッスンでは、体験用教材またはBizCHINAのお好きな教材をご利用いただけます。</span>
    </div>
  </div>

  <div class="teacherArea">
      <span class="ttTitle">講師について</span>
      <div class="tt1">
        <span class="title">講師が日本語でレッスン対応可能</span>
        <span class="des">中国語ネィティブの講師のみ採用しています。<br>厳しい採用基準を設けて、それに合格できた講師だけを採用しています。
          総合コースの場合、担当する講師の8割以上が日本語での対応が可能。会話コースの場合、講師が中国語のみで対応。</span>
      </div>

      <div class="tt2">
        <span class="title">0.8%の講師採用率</span>
        <span class="des">講師間のレベル差をなくし、高品質なレッスンを提供するため、ビズチャイナ独自のレッスンクオリティー管理システムを導入しています。
厳格な採用基準、オリジナル教材によるレッスン標準化、評価システムに基づく個別指導を実施し、満足度の高いレッスンを実現しています。</span>
      </div>

      <div class="tt3">
        <span class="title">現地で講師採用&研修センター</span>
        <span class="des" >現地のリクルートサービスや中国語講師研修機構と連携し、安定した講師の応募を確保しています。日本人スタッフと現地の講師管理チームがトレーニング計画を担当しています。</span>
      </div>
    </div>

  </div>


</template>


<style scoped>
.teacher-note {
  font-size: 13px;
  margin-bottom: 8px;
}
.link-label-orange {
  color: #EF6D20;
  font-weight: bold;
  text-decoration: none;
}

.link-label-green {
  color: #30A186;
  font-weight: bold;
  text-decoration: none;
}

.link-label-orange:hover,
.link-label-green:hover {
  text-decoration: underline;
}

  .threeBlock{
    width: 1130px;
    margin: 0 auto 40px auto;
    z-index: 9999;
  }
  .threeBlock li{
    font-size: 14px;
    background-color: #FFFFFF;
    border-radius: 10px;
    width: 32%;
    min-height: 326px;
    vertical-align: top;
    display: inline-block;
    text-align: center;
    background-repeat: no-repeat;
    background-size: 80px;
    background-position: center 30px;
    padding: 0 24px;
    line-height: 22px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  }
  .orafont{
    color: #EF6D20;
  }
  .threeBlock li .stt{
    font-size: 24px;
    line-height: 34px;
    font-weight: bold;
    display: block;
    width: 90%;
    height: 60px;
    margin: 120px auto 20px auto;
  }
  .threeBlock li:nth-child(1){background-image: url("../assets/images/point_s2.png");}
  .threeBlock li:nth-child(2){background-image: url("../assets/images/point_s3.png"); margin-left: 2%;}
  .threeBlock li:nth-child(3){background-image: url("../assets/images/point_s4.png"); margin-left: 2%;}


  .course-section {
    width: 1130px;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .course-block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
  }

  .course-img {
    flex: 1 1 50%;
  }
  .course-img img {
    border-radius: 8px;
  }
  .course-content {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  }

  .course-img img {
    width: 100%;
    height: auto;
    display: block;
  }

  .course-content {
    flex: 1 1 50%;
    background: #fff;
    margin-left: -24px;
    padding: 40px 40px 40px 64px;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
  }

  .course-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .learn-title {
    color: #E4670C;
  }

  .speak-title {
    color: #30A186;
  }

  .course-desc {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .course-tags{
    margin-top: 20px;
  }
  .course-tags span {
    display: inline-block;
    background: #333;
    color: #fff;
    padding: 6px 16px;
    margin-right: 10px;
    border-radius: 20px;
    font-size: 14px;
  }

  @media screen and (max-width: 520px) {
    .ttTitle{
      width: auto;
    }
    .threeBlock{
      width: 90%;
    }
    .threeBlock li{
      display: block;
      width: 100%;
      min-height: auto;
      background-position: 8% 12%;
      text-align: left;
      padding: 5% 8% 4% 33%;
      margin: 0 auto 6% auto;
    }
    .threeBlock li .stt{
      margin: auto;
      font-size: 20px;
      line-height: normal;
      height: auto;
      width: 100%;
    }
    .threeBlock li .sdd{
      font-size: 13px;
      line-height: 12px;
    }
    .threeBlock li:nth-child(2){
      margin-left: auto;
    }
    .threeBlock li:nth-child(3){
      margin-left: auto;
    }


      .course-section {
        width: 90%;
      }

      .course-block {
        flex-direction: column;
      }

      .course-content {
        margin-left: 0;
        padding: 24px;
      }

      .course-title {
        font-size: 22px;
      }

      .course-desc {
        font-size: 15px;
      }

      .course-tags span {
        font-size: 13px;
        margin-bottom: 8px;
      }
    .course-img img{
      border-radius: 8px 8px 0 0;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    }
      .course-content{
        border-radius: 0 0 8px 8px;
      }

  }

</style>

<script setup lang="ts">
</script>