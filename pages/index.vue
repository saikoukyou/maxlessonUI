<template>
    <div class="topTemplate">

<!--      <router-link v-if="logged == false" to="/plan">-->
<!--        <p class="TopBtn">{{register_text}}</p>-->
<!--      </router-link>-->

      <div class="top-bg-wrap">
      <div class="top-section">
        <div class="content">
          <button class="peach-cta">
            <span>
              <b>今から</b>
              <b>始める</b>
            </span>
            <img src="../assets/images/top_arrow.png">
          </button>
        </div>
      </div>
      <div class="mobile-section">
        <img class="m1-img" src="../assets/images/netkorea_topbg_m.png">
        <div class="m2-block">
          <button class="mobile-cta-btn">
            <span>今から始める</span>
            <img src="../assets/images/arrow_w.png" alt="arrow">
          </button>
        </div>
      </div>
      <section class="reasons">
        <div class="reasons__in">
          <div class="reasons__left">
            <img class="eyebrow" src="../assets/images/resons_eyebrow.png">
            <h2 class="topPage">ネットコリアが<br>選ばれている理由</h2>
            <span class="leadWord">韓国人ネイティブ講師が日本語で優しく指導。初心者も安心して学べます。
              好きな時に受講でき、日本人スタッフのサポートも万全！</span>
            <button class="top-cta">
              <span>100円体験</span>
              <img src="../assets/images/arrow_w.png" alt="arrow">
            </button>
          </div>

          <ul class="reasons__grid">
              <li class="materials">
                <img src="../assets/images/r_materials.png" alt="オリジナル教材">
                <h3>オリジナル教材</h3>
                <p>2000課無料</p>
              </li>
              <li class="teacher">
                <img src="../assets/images/r_teacher.png" alt="講師と1対1">
                <h3>講師と1対1</h3>
                <p>韓国語ネイティブ</p>
              </li>
              <li class="video">
                <img src="../assets/images/r_video.png" alt="動画レッスン">
                <h3>動画レッスン</h3>
                <p>予習・復習</p>
              </li>
              <li class="jp">
                <img src="../assets/images/r_jp.png" alt="日本語でレッスン">
                <h3>日本語でレッスン</h3>
                <p>初心者に優しい</p>
              </li>
              <li class="hours">
                <img src="../assets/images/r_hours.png" alt="朝6時〜深夜25時">
                <h3>朝6時〜深夜25時</h3>
                <p>年中無休</p>
              </li>
          </ul>
        </div>
        <button class="top-cta mobile-btn">
          <span>100円体験</span>
          <img src="../assets/images/arrow_w.png" alt="arrow">
        </button>
      </section>
      </div>

      <section class="blogBlock">
        <div class="blogUp">
          <p class="intro_title" style="margin-bottom: 6px;">最新記事</p>
          <ul class="bloglist">
            <li class="blogitem" v-for="(tblog) in topBlogs">
              <a @click="goBlogInfo(tblog.id)" class="blogitem-link">
                <div class="meta">
                  <span class="date">{{tblog.registered.substring(0,11)}}</span>
                  <span class="category-tag" style="color: #da1111; border-color: #da1111;">
                  {{tblog.name}}
                </span>
                </div>
                <div class="title">
                  <h3>{{tblog.title}}</h3>
                </div>
                <div class="arrow">→</div>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section class="tutors">
        <div class="tutors__inner">
          <img class="eyebrow" src="../assets/images/eye_OurTutors.png">
          <h2 class="topPage">経験豊富な講師陣と楽しく学ぶ</h2>
          <span class="leadWord">いつでも、どこでも韓国人講師とマンツーマン</span>
          <ul class="tutor-grid">
            <!-- 1 -->
            <li class="tutor-card">
              <div class="tutor-card__meta">
                <strong class="tutor-card__name">パク・ヒヨン</strong><span class="tutor-card__role">講師</span>
                <div class="tutor-card__loc"><b>韓国・群山</b></div>
                <div class="tutor-card__bio">専攻 生物情報工学<br>趣味 食べ歩き、ゴロゴロ</div>
              </div>
              <div class="tutor-card__photo">
                <img src="../assets/images/tutor1.png" alt="パク・ヒヨン">
              </div>
            </li>

            <!-- 2 -->
            <li class="tutor-card">
              <div class="tutor-card__meta">
                <strong class="tutor-card__name">キム・ヒジョン</strong><span class="tutor-card__role">講師</span>
                <div class="tutor-card__loc"><b>韓国・群山</b></div>
                <div class="tutor-card__bio">専攻 国語国文学科<br>趣味 日本旅行</div>
              </div>
              <div class="tutor-card__photo">
                <img src="../assets/images/tutor2.png" alt="キム・ヒジョン">
              </div>
            </li>

            <!-- 3 -->
            <li class="tutor-card">
              <div class="tutor-card__meta">
                <strong class="tutor-card__name">キム・ヒジョン</strong><span class="tutor-card__role">講師</span>
                <div class="tutor-card__loc"><b>韓国・釜山</b></div>
                <div class="tutor-card__bio">専攻 ホテル経営学<br>趣味 ベーキング、サーフィン</div>
              </div>
              <div class="tutor-card__photo">
                <img src="../assets/images/tutor3.png" alt="キム・ヒジョン">
              </div>
            </li>

            <!-- 4 -->
            <li class="tutor-card">
              <div class="tutor-card__meta">
                <strong class="tutor-card__name">イ・スンヒ</strong><span class="tutor-card__role">講師</span>
                <div class="tutor-card__loc"><b>韓国・ソウル</b></div>
                <div class="tutor-card__bio">専攻 日本語<br>趣味 旅行、登山</div>
              </div>
              <div class="tutor-card__photo">
                <img src="../assets/images/tutor4.png" alt="イ・スンヒ">
              </div>
            </li>
            <!-- 5 -->
            <li class="tutor-card">
              <div class="tutor-card__meta">
                <strong class="tutor-card__name">ファン・ジホ</strong><span class="tutor-card__role">講師</span>
                <div class="tutor-card__loc"><b>韓国・ソウル</b></div>
                <div class="tutor-card__bio">韓国語教育課程2級取得<br>趣味 映画</div>
              </div>
              <div class="tutor-card__photo">
                <img src="../assets/images/tutor5.png" alt="ファン・ジホ">
              </div>
            </li>
          </ul>
          <button class="top-cta">
            <span>講師一覧</span>
            <img src="../assets/images/arrow_w.png" alt="arrow">
          </button>
        </div>
      </section>

      <section class="count">
        <div class="count--inner">
          <div class="SumLesson">
        <div class="weekCount">
          <img src="../assets/images/icon_total.png" />
          <ul class="countBlock">
            <li class="countTitle">累計実施レッスン数</li>
            <li><span class="countNumber">{{ formattedLessonNum }}</span>
              <span class="lessonComa">コマ</span></li>
          </ul>
        </div>

        <div class="totalCount">
          <img src="../assets/images/icon_weekcount.png" />
          <ul class="countBlock">
            <li class="countTitle">今週予約可能レッスン数</li>
            <li><span class="countNumber">{{formattedWeekOpenNum}}</span>
              <span class="lessonComa">コマ</span></li>
          </ul>
        </div>
      </div>
        </div>
      </section>

      <section class="step3-wrap">
        <div class="step3-inner">
          <!-- 裝飾線條 -->
          <img class="step3-eye step3-eye--left"  src="../assets/images/leftEye.png"  alt="" aria-hidden="true">
          <img class="step3-eye step3-eye--right" src="../assets/images/rightEye.png" alt="" aria-hidden="true">

          <!-- 標題：圖片3 + 文字 -->
          <h2 class="step3-title">
            上達できる<img class="step3-num" src="../assets/images/step3.png" alt="3">
            <span>つのステップ</span>
          </h2>

          <!-- 短說明 -->
          <p class="step3-lead">
            プロ講師開発の教材を使い、「文法→練習→実践」の3ステップで学ぶ、基礎から応用まで対応した韓国語カリキュラムです。
          </p>

          <!-- 一大張圖（含三個圓圈） -->
          <div class="step3-illustration">
            <picture>
              <!-- 手機版 -->
              <source srcset="../assets/images/pic_m.png" media="(max-width: 520px)">
              <!-- 預設桌機版 -->
              <img src="../assets/images/pic1.png" alt="3ステップのイラスト">
            </picture>
          </div>


          <button class="top-cta--reverse">
            <span>教材一覧</span>
            <img src="../assets/images/arrow_g.png" alt="">
          </button>
        </div>
      </section>

      <section class="topix">
                                <div class="topixContents">
                                  <p></p>
                                  <div class="child">
                                    <p class="newsTitle">更新情報</p>
                                    <ul v-for="(blog,index) in blogs" :key=index >
                                      <li class="date">{{blog.registered}}</li>
                                      <li class="title" @click="goBlogInfo(blog.id)">
                                        {{blog.title}}<br />
                                        {{blog.explanation}}
                                      </li>
                                    </ul>
                                    <button class="more-button-c">
                                      <router-link to="/blogs?id=18">もっと見る
                                      <span class="arrow-circle-c">→</span>
                                      </router-link>
                                    </button>
                                  </div>
                                  <div class="child">
                                    <p class="voiceTitle">生徒様の声</p>
                                    <ScrollFeedback :evaluations="evaluations"></ScrollFeedback>
                                  </div>
                                  <p></p>
                                </div>
                              </section>

      <section class="point5-wrap">
        <div class="point5-wrap-inner">
          <!-- 裝飾線條 -->
          <img class="step3-eye step3-eye--left"  src="../assets/images/leftEye.png"  alt="" aria-hidden="true">
          <img class="step3-eye step3-eye--right" src="../assets/images/rightEye.png" alt="" aria-hidden="true">

          <!-- 標題：圖片3 + 文字 -->
          <h2 class="step3-title">
            安心して選べる<img class="step3-num" src="../assets/images/point5.png" alt="3">
            <span>つのポイント</span>
          </h2>

          <!-- 短說明 -->
          <p class="step3-lead">
            日本語対応やネイティブ講師の指導など、初心者でも安心！柔軟なスケジュールで、自分のペースで学べます。
          </p>

          <ul class="feature-grid">
            <li class="feature-card">
              <div class="feature-card__text">
                日本語でレッスン<br>
                初心者に優しい
              </div>
            </li>
            <li class="feature-card">
              <div class="feature-card__text">
                オリジナル<br>
                韓国語教材
              </div>
            </li>
            <li class="feature-card">
              <div class="feature-card__text">
                韓国語ネイティブ<br>
                講師と1対1
              </div>
            </li>
            <li class="feature-card">
              <div class="feature-card__text">
                日本人スタッフの<br>
                サポート
              </div>
            </li>
            <li class="feature-card">
              <div class="feature-card__text">
                朝6時〜深夜1時まで<br>
                受講可能
              </div>
            </li>
          </ul>
          <button class="top-cta--reverse">
            <span>100円体験</span>
            <img src="../assets/images/arrow_g.png" alt="">
          </button>
        </div>
      </section>

      <div class="cvimg_container">
        <div class="cvcontent">
          <div class="intro_word">
            <div class="intro_title">NetKOREAが考える
              <br>オンライン韓国語学習の在り方</div>
            私たちは、時間とお金をかけてオンラインで韓国語を学んでいる方々を最大限にサポートしたいと考えています。そのため、講師のあっせんだけにとどまらず、講師の採用、サイトの構築、教材の開発、日本人による学習サポートなど、多方面から総合的にサポートを行いたいと考えています。
            韓国語学習においては、タイムパフォーマンスが非常に重要です。NetKOREAを選んで利用いただいている皆様の貴重な時間が、しっかりと成果に結びつくように、スタッフ一同、全力で努めてまいります。
          </div>
        </div>
      </div>


      <GotoTop />
    </div>
</template>

<script setup>
//设置首页标题,举个例子，这里的title就是首页的标题
import {
  useHomeBlogAndVideoListDataApi,
  useHomeLessonAndInfoListDataApi,
  useHomeTeacherListDataApi,
} from "~/apis";
import {onMounted, ref} from 'vue'
import {useMainStore} from "~/composables/store";

useHead({
  title: "オンライン中国語のビズチャイナ【100円で7日間体験】",
  meta: [
    { name: "keywords", content: "BizCHINA,ビズチャイナ,中国語,オンライン中国語,中国語研修,中国語レッスン" },
    { name: "description", content: "オンライン中国語教室で、WeChat、Teamsや独自のWeb教室を使って受講できます。約300名の講師が在籍。朝6時から深夜1時まで。ネット利用に特化した無料教材。1レッスン333円から受講可能。" },
  ],
  // script: [
  //   {
  //     type: 'text/javascript',
  //     src: 'https://unpkg.com/swiper@7/swiper-bundle.min.js',
  //     body: true //<script>是否在body中
  //   }
  // ],
  // link: [
  //   {
  //     rel: 'stylesheet',
  //     href: 'https://unpkg.com/swiper@7/swiper-bundle.min.css'
  //   }
  // ]
});

let weekOpenNum = ref(0);
let allLessonNum = ref(0);
let evaluations = ref([]);
let blogs = ref([]);
let teachers = ref([]);
let teachers_today = ref([]);
let videos = ref([]);
let blog_list = ref([]);
let register_flag = ref(1);
let register_text = ref('100円体験');
const useStore = useMainStore();
const logged = useStore.studentLoggedIn;
const bcolor = ['','',''];
let topBlogs = ref([]);

const getHomeTeachers = async () => {
  const {data: lists } = await useHomeTeacherListDataApi();
  if (lists?.value) {
    register_flag.value = lists?.value?.register_type ?? 1;
    register_text.value = register_flag.value == 1 ? '100円体験' : '100円体験';
    // teachers.value = lists?.value?.bookmark_teacher_list ?? [];
    teachers_today.value = lists?.value?.today_teacher_list ?? [];

    weekOpenNum.value = Number(lists?.value?.weekOpenNum ?? 0); // ← 這裡加 Number()
    allLessonNum.value = Number(lists.value.allLessonNum ?? 0); // 確保是數字
    evaluations.value = lists?.value?.evaluations ?? [];
    blogs.value = lists?.value?.bloglist ?? [];
    videos.value = lists?.value?.videos ?? [];
    blog_list.value = lists?.value?.blog_list ?? [];
    topBlogs.value = lists?.value?.topbloglist ?? [];
  }
  // await getHomeInfo();
}

// 格式化數字為帶逗號的形式
const formattedLessonNum = computed(() => {
  return allLessonNum.value.toLocaleString(); // 使用內建方法格式化
});
const formattedWeekOpenNum = computed(() => {
  return weekOpenNum.value.toLocaleString();
});

onMounted(() => {
  getHomeTeachers();
})

function goBlogInfo(bid) {
  const encodedBid = btoa(encodeURIComponent(bid+''));
  navigateTo({path:'/blog/info',query:{
      bid: encodedBid,
    }}, { replace: true })
}
</script>



<style scoped>
/* 網格 */
.feature-grid{
  list-style:none;
  margin:24px 0 40px;
  padding:0;
  display:grid;
  grid-template-columns:repeat(5,minmax(0,1fr));
  gap:20px;
}

/* 卡片（背景圖＋文字） */
.feature-card{
  position:relative;
  height:300px;
  border-radius:16px;
  overflow:hidden;
  background-size: 100%;
  background-color: #ffffff;
}
/* 1/3/5 上邊距變化 */
.feature-card:nth-child(1),
.feature-card:nth-child(3),
.feature-card:nth-child(5){
  margin-top:24px;
}

/* 各卡的背景圖（已切好 p1~p5.png） */
.feature-card:nth-child(1){ background-image:url('../assets/images/p1.png'); }
.feature-card:nth-child(2){ background-image:url('../assets/images/p2.png'); }
.feature-card:nth-child(3){ background-image:url('../assets/images/p3.png'); }
.feature-card:nth-child(4){ background-image:url('../assets/images/p4.png'); }
.feature-card:nth-child(5){ background-image:url('../assets/images/p5.png'); }

/* 左上文字 */
.feature-card__text{
  position:absolute; top:24px; left:24px;
  line-height:1.35;
  z-index:1;
  color: #373737;
  text-align: left;
}
.feature-card__text{ display:block; font-size:16px; font-weight:600; }

/* ===== 3 steps block ===== */
.step3-wrap,
.point5-wrap{
  width:100%;
  background:#25909A;          /* 綠背景，可依品牌調整 */
  color:#fff;
  padding: 64px 24px;
  overflow:hidden;              /* 防止裝飾超出 */
}
.step3-inner,
.point5-wrap-inner{
  width:100%;
  max-width:1130px;             /* 中間資訊區 w1000px 置中 */
  margin:0 auto;
  position:relative;
  text-align:center;
}

/* 左右裝飾線條 */
.step3-eye{
  position:absolute;
  top:-8px;
  user-select:none; -webkit-user-drag:none; pointer-events:none;
  opacity:.95;
}
.step3-eye--left{ left:160px;  width:70px; max-width:30vw; }
.step3-eye--right{ right:180px; top: 0; width:50px; max-width:26vw; }

/* 標題（圖片3 + 文字） */
.step3-title{
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-size:32px;
  line-height:1.3;
  margin:0 0 10px;
  font-weight:800;
}
.step3-num{
  width:54px; height:auto; display:block;
  margin-top: -12px;
}

/* 短說明 */
.step3-lead{
  margin:6px auto 28px;
  font-size:15px;
  line-height:1.9;
  opacity:.95;
}

/* 下方一大張圖（含三圓） */
.step3-illustration img{
  width: 760px;
  margin: 24px auto;
}
.top-bg-wrap {
  background: linear-gradient(#F5F0E7, #FAF7F3);
}
.reasons{
  width: 100%;
  margin: 0 auto;
  min-height: 640px;
}
.reasons__in {
  max-width: 960px;   /* 固定內容寬度 */
  margin: 0 auto;      /* 置中 */
  display: flex;
  justify-content: space-between; /* 左右分開 */
  align-items: flex-start;        /* 頂端對齊 */
  gap: 32px;                      /* 左右間距 */
}
.reasons .top-cta{
  margin: 24px 0;
}

.blogBlock{
  background-color: #F5F0E7;
  padding: 64px;
}
.blogUp{
  width: 950px;
  margin: auto;
}

.tutors{
  padding: 64px 24px;
  background: linear-gradient(175deg, #FAF6F1 10%, #F0FAF8 60%);
}
.tutors__inner{
  max-width: 1130px;         /* 你要的內容寬 */
  margin: 0 auto;
  text-align: center;
}

.tutors .eyebrow{
  width: 180px;
  margin: 10px auto;
}

/* 卡片網格 */
.tutor-grid{
  list-style:none;
  margin: 24px 0 40px 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0,1fr));
  gap: 20px;
}

/* 卡片 */
.tutor-card{
  background-color: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 300px;
  transition: transform 0.25s ease, box-shadow 0.25s ease; /* 加過渡 */
  cursor: pointer;
}
.tutor-card:nth-child(1),
.tutor-card:nth-child(3),
.tutor-card:nth-child(5){
  margin-top: 24px;  /* 第 2、4 張卡片往下 */
}

.tutor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

/* 上半文字區 */
.tutor-card__meta{
  text-align: left;
  padding: 16px;
}
.tutor-card__name{
  font-size: 18px;
  font-weight: 800;
  margin-right: 6px;
}
.tutor-card__role{
  font-size: 13px;
}
.tutor-card__loc{
  color: #1aa7ad;
  margin: 6px 0 4px;
  font-size: 14px;
}
.tutor-card__bio{
  color: #444;
  font-size: 13px;
  line-height: 1.5;
}

/* 下半照片 */
.tutor-card__photo{
  position: relative;
  background: radial-gradient(240px 240px at 40% 100%, #D6EBE8 0, #D6EBE8 49%, transparent 50%);
}

.tutor-card__photo img{
  width: 100%;
  height: auto;
  display: block;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}



/* 左欄固定寬，右欄自動伸展 */
.reasons__left {
  flex: 0 0 350px; /* 不縮不長，固定 300px 寬 */
  margin-top: 120px;
  position: relative;
}

.reasons__grid {
  flex: 1;         /* 佔滿剩餘空間 */
  position: relative;
  background-color: #00a0e9;
  margin-top: -130px;
}

.reasons .eyebrow{
  width: 122px;
  left: -10px;
  top: -40px;
  position: absolute;
}

h2.topPage{
  font-family: "Murecho", sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  margin:12px 0 12px 0;
}

.leadWord{
  display: inline-block;      /* 讓行高生效更穩定 */
  font-size: 16px;
  line-height: 26px;
}
.top-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  margin: 12px auto;
  background-color: #25909A; /* 按鈕背景色 */
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 999px; /* 膠囊形狀 */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.top-cta--reverse {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  margin: 12px auto; /* 左右 auto 就置中 */
  background-color: #FFFFFF; /* 按鈕背景色 */
  color: #25909A;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 999px; /* 膠囊形狀 */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.top-cta--reverse:hover {
  transform: translateY(-1px);
}

.reasons__grid li {
  background: #fff;
  width: 250px;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.reasons__grid li img {
  width: 170px;
  height: auto;
  margin-bottom: 8px;
}

.reasons__grid li h3 {
  font-size: 18px;
  font-weight: 700;
}

.reasons__grid li p {
  font-size: 16px;
  margin: 0;
  color: #555;
}

.reasons__grid li{position: absolute;}
.reasons__grid .materials { top: 0; right:0; }
.reasons__grid .teacher   { top: 160px; right:280px;}
.reasons__grid .video     { top: 290px; right:0; }
.reasons__grid .jp        { top: 450px; right:280px;}
.reasons__grid .hours     { top: 580px; right:0; }

.top-cta img,
.top-cta--reverse img{
  width: 18px;
  height: 18px;
}
.top-cta:hover {
  background-color: #149ca1;
  transform: translateY(-1px);
}
.peach-cta{
  position: absolute;
  right: 240px;
  top: 414px;
  --size: 140px;
  width:var(--size);
  height:var(--size);
  border:0;
  border-radius:50%;
  color:#fff;
  cursor:pointer;
  box-shadow:
      0 14px 20px rgba(255,120,110,.35),
      0 4px 12px rgba(0,0,0,.05);
  isolation:isolate;
  background: linear-gradient(160deg, #ffa9a0 0%, #ff8f86 100%);
  transition: background 0.4s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

/* 內圈高光 */
.peach-cta::before{
  content:"";
  position:absolute; inset:0.8%;
  border-radius:50%;
  box-shadow: inset 0 0 0 10px rgba(255,255,255,.1);
}

/* 外圈光暈（初始） */
.peach-cta::after {
  content:"";
  position:absolute; inset:-4%;
  border-radius:50%;
  box-shadow: 0 0 0 2px rgba(255,150,140,.18);
  z-index:-1;
  transition: box-shadow 0.4s ease;
}

/* hover 時外圈光暈加深 */
.peach-cta:hover::after {
  box-shadow: 0 0 0 2px rgba(255,150,140,.28),
  0 0 10px rgba(255,150,140,.25);
}

.peach-cta:hover {
  transform: translateY(-2px);
  background: linear-gradient(200deg, #ffb1a9 25%, #ff958d 75%); /* 原色加亮 */
  box-shadow: 0 12px 24px rgba(255,120,110,0.35);
}


.peach-cta span{
  display:grid;
  gap:.14em;
  line-height:1;
  text-align:center;
  font-weight:800;
  letter-spacing:.06em;
  text-shadow: 0 1px 0 rgba(0,0,0,.05);
  font-size: 24px;
  margin-top: 6px;
}
.peach-cta img{
  width: 72px; margin: 8px auto 0 auto;
}


.top-section {
  margin-top: -36px;
  width: 100%;
  background:
      url('../assets/images/netkorea_topbg.png') center top no-repeat;
  background-size: 1920px auto;
}

.top-section .content {
  width: 1130px;
  margin: 0 auto -30px auto;
  height: 920px;
  position: relative;
}


.mobile-section,
.mobile-btn{
  display: none;
}

@media screen and (max-width: 520px) {
  .blogBlock{
    padding: 32px;
  }
  .blogUp{
    width: 100%;
  }
  .mobile-btn{
    display: flex;
    margin: 0 auto !important;
  }
  .step3-title{font-size:24px; margin-top: 24px;}
  .step3-eye--left,
  .step3-eye--right{
    display: none;
  }
  .reasons,
  .tutors,
  .step3-wrap,
  .count{
    padding: 32px 0;
    position: relative;
  }
  .tutor-card{
    height: auto;
    min-height: 270px;
  }
  .tutor-card__photo{
    background: radial-gradient(240px 240px at 40% 120%, #eaf0f2 0, #eaf0f2 49%, transparent 50%);
  }

  .tutor-card__photo img{
    bottom: 0;
    position: absolute;
  }
  .tutor-card:nth-child(1),
  .tutor-card:nth-child(3),
  .tutor-card:nth-child(5){
    margin-top: 0;  /* 第 2、4 張卡片往下 */
  }
  .tutor-grid{
    width: 96%;
    margin: 16px auto;
    position: static;
    background: transparent;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .tutor-card__name{ font-size: 16px; }
  .tutor-card__bio{ font-size: 12px; }
  .tutor-grid .tutor-card:last-child{
    display: none;
  }


  .reasons{ min-height: auto; }


  .top-cta{
    margin:auto;
  }
  .reasons__in  .top-cta{
    display: none;
  }

  .reasons__in,
  .tutors__inner,
  .step3-inner,
  .count-inner{
    padding: 0 16px;
    margin: 0 auto;
    display: block;                /* 左右改上下 */
    gap: 0;
  }
  .reasons__left{
    flex: none;
    width: 100%;
    margin-top: 32px;
    position: relative;
    text-align: center;
  }
  .reasons .eyebrow{
    position: static;              /* 眉標置中 */
    display: block;
    margin: 0 auto 8px;
  }
  h2.topPage{
    font-size: 28px;
    width: 90%;
    margin: 8px auto;
    line-height: 38px;
  }
  .leadWord{
    font-size: 15px;
    text-align: center;
    width: 90%;
  }

  /* 右側卡片：兩欄網格；取消 absolute */
  .reasons__grid{
    width: 96%;
    margin: 16px auto 0 auto;
    position: static;
    background: transparent;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .reasons__grid li{
    position: static;              /* 取消桌機的 absolute */
    width: 100%;
    padding: 16px 14px;
  }
  .reasons__grid li img{
    width: 120px;                  /* 手機縮小一點 */
    margin-bottom: 10px;
  }
  .reasons__grid li h3{
    font-size: 18px;
    margin: 0 0 2px;
  }
  .reasons__grid li p{
    font-size: 14px;
    margin: 0 auto;
  }
  /* 最後一張卡片滿版（佔兩欄） */
  .reasons__grid .hours{
    grid-column: 1 / -1;
    margin-bottom: 20px;
  }
  .top-section {
    display: none;
  }
  .mobile-section {
    display: block;
    width: 100%;
    margin-top: 26px;
  }
  .m1-img {
    width: 100%;
    display: block;
  }
  .m2-block {
    width: 100%;
    background: url('../assets/images/netkorea_topbg_m2.png') center top / cover no-repeat;
    position: relative;
    height: 80px;
  }
  .mobile-cta-btn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 76%;
    padding: 14px;
    min-height: 48px;
    background: linear-gradient(200deg, #ffa297 25%, #ff867e 75%);
    border-radius: 8px;
    border: none;
    color: #fff;
    font-size: 21px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px; /* 文字和箭頭間距 */
    box-shadow: 0 6px 16px rgba(255, 120, 110, 0.4);
  }
  .mobile-cta-btn img {
    height: 20px;
  }
  .feature-grid{
    grid-template-columns: 1fr; /* 單欄 */
    gap: 12px;
  }
  .feature-card{
    height: 120px;
    border-radius: 12px;
  }
  .feature-card__text{
    top: 24px;
    left: 24px;
    font-size: 17px;
    font-weight: bold;
  }
  .feature-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2) 0%,   /* 左上 白色透明度20% */
        rgba(255, 255, 255, 0.05) 50%, /* 中間淡白 透明度5% */
        rgba(255, 255, 255, 0) 100%    /* 右下 完全透明 */
    );
    pointer-events: none;
    z-index: 0;
  }
  /* 手機版背景圖 */
  .feature-card:nth-child(1){ background-image:url('../assets/images/p1_m.png'); margin-top: 0; }
  .feature-card:nth-child(2){ background-image:url('../assets/images/p2_m.png'); }
  .feature-card:nth-child(3){ background-image:url('../assets/images/p3_m.png'); margin-top: 0; }
  .feature-card:nth-child(4){ background-image:url('../assets/images/p4_m.png'); }
  .feature-card:nth-child(5){ background-image:url('../assets/images/p5_m.png'); margin-top: 0; }
}
</style>
