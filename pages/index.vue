<template>
    <div class="topTemplate">

      <div class="FVspace"></div>
      <div class="FV">
        <div class="maskBg"></div>
        <div class="FVimg">
          <div class="no1Wrap">
            <div class="FV_title"></div>
            <div class="FV_model"></div>
            <router-link v-if="logged == false" to="/plan">
              <p class="TopBtn">{{register_text}}</p>
            </router-link>
          </div>
        </div>
      </div>

      <div class="FV_m">
        <img width="100%" src="../assets/images/KV_m1.png" />
        <router-link v-if="logged == false" to="/plan">
          <img width="100%" src="../assets/images/KV_m2.png" />
        </router-link>
      </div>

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

      <main id="main" class="main" style="position: relative">
<!--        <div class="GridBg">-->
<!--          <div class="GridBgContents">-->
<!--            <p class="intro_title">オンライン中国語学習を、気軽に 身近に。</p>-->
<!--            <p class="intro_content">中国語も現地の事情も<br>-->
<!--              手軽に、スマートに<br>-->
<!--              楽しく、着実に学ぶ<br>-->
<!--              ビズチャイナだから上達できる。</p>-->
<!--          </div>-->
<!--          <div class="GridBgSide"></div>-->
<!--        </div>-->


          <div class="messageSpace">
            <p class="intro_title">ビズチャイナが選ばれている理由</p>
            <ul class="tsuyomiul">
              <li><img src="../assets/images/tsuyomi_1.png" /><span class="tsuyomititle">講師と1対1</span><span class="tsuyomides">中国語ネイティブ</span></li>
              <li><img src="../assets/images/tsuyomi_2.png" /><span class="tsuyomititle">日本語でレッスン</span><span class="tsuyomides">初心者にも安心</span></li>
              <li><img src="../assets/images/tsuyomi_3.png" /><span class="tsuyomititle">オリジナルweb教材</span><span class="tsuyomides">2000課無料</span></li>
              <li><img src="../assets/images/tsuyomi_4.png" /><span class="tsuyomititle">文法の解説動画</span><span class="tsuyomides">予習・復習</span></li>
              <li><img src="../assets/images/tsuyomi_5.png" /><span class="tsuyomititle">朝6時～深夜25時</span><span class="tsuyomides">年中無休</span></li>
            </ul>
          </div>
          <div class="aboutSide"></div>
          <div class="aboutContents"></div>


        <div class="teacherBG">
          <div class="maskBg"></div>
          <div class="teacherContent">
            <div class="teacherTitle">
              <span class="intro_title">多彩な講師陣から</span><br>
              <span class="intro_content">自分にあった講師を選べる</span>
            </div>
            <div class="teacherPossible">
              <img width="20" src="../assets/images/teachericon.png" />受付中の講師
            </div>
            <Scroll :items="teachers_today"></Scroll>
            <div class="teacherMore"><NuxtLink to="/timetable" @click="closeMenu">もっと見る →</NuxtLink></div>
          </div>
        </div>



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



                <div class="CV_bg">
                  <div>中国語初心者の方もご安心ください。<br>
                    総合コースでは、8割以上の講師が日本語能力試験最上級の「N1」を保持しています。</div>
                  <router-link v-if="logged == false" to="/plan"><p class="MiddleBtn">{{register_text}}</p></router-link>
                </div>
                <div class="CV_color"></div>

                        <div class="textbookContent">
                          <p class="intro_title">2000以上の無料オリジナルweb教材</p>
                          <p class="intro_content">初心者から上級者向けの多彩なジャンルの教材をご提供、<br>
                          ご自身の中国語レベルと学習目的に合わせて教材を選べます。</p>
                          <Textbook></Textbook>
                        </div>



                      <div class="videoContent">
                        <div class="videoWord">
                        <p class="intro_title">インプット用の解説動画</p>
                        <p class="intro_content">初心者も安心。日本人による文法解説</p>
                          <p class="intro_span">
                            動画・音声コンテンツも豊富！<br>
                            忙しい方でも手軽にインプット<br>
                            自習はもちろん、レッスンの予習・復習にも
                          </p>
                        </div>
                      </div>
        <img class="video_m" src="../assets/images/video_m.png" width="100%"/>


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


                                     <section class="pageCV">
                                       <div class="CVarea">
                                         <p class="intro_title">教材数、講師数、動画数 NO.1</p>
                                         <p class="intro_content">オンライン中国語学習を、 気軽に 身近に。</p>
                                         <router-link to="/plan">
                                           <NuxtLink v-if="logged" to="/plan" >
                                             <p class="MiddleBtn">
                                             100円体験
                                             </p>
                                           </NuxtLink>
                                           <NuxtLink v-else to="/plan" ><p class="MiddleBtn">{{register_text}}</p></NuxtLink>
                                         </router-link>
                                       </div>
                                     </section>

        <div class="cv_container">
          <div class="sectionDiv">
            <div class="intro_title">ビズチャイナはオンライン中国語サービスの使い勝手の良さを追求しています。</div>

            <div class="section">
              <img src="../assets/images/newpoint1.png">
              <div>
                <p class="highlight">学習目的に合わせて、二つのコース</p>
                <p><span>総合コースは</span>、９割以上の講師が日本語で説明可能です。学習内容は文法、練習、会話、ビジネス、HSKなどと幅広くなっており、中国語初心者や中国語を体系的に習得したい方向けのコースです。</p>
                <p><span>会話コースは</span>、中国各出身地の講師がレッスンを担当します。講師は日本語が出来ないため、より実践に近い形で中国語の会話力を磨いていただくコースになります。会話能力の向上を図りたい方に最適です。</p>
              </div>
            </div>
            <div class="section">
              <img src="../assets/images/newpoint2.png">
              <div>
                <p class="highlight">ネット学習に特化した教材、２５分で完結</p>
                <p>中国語能力試験のHSKの基準に合わせて、教材は社内で開発しており、文法や会話をはじめ、ビジネスやニュース教材など、体系的に中国語を習得していただけます。ネット学習の特徴に合わせて、基本的に２５分で1課を完結できるように作っており、学習タイムパフォーマンスの最大化を目指しています。</p>
              </div>
            </div>
            <div class="section">
              <img src="../assets/images/newpoint3.png">
              <div>
                <p class="highlight">「１００円」で７日間体験可能</p>
                <p>ビズチャイナは利用しやすさを最大限に追及しています。予約は最短５分前から予約可能で、体験プランは100円でご利用いただけます。総合コース・会話コースのどちらかをお選びいただけます。</p>
              </div>
            </div>
          </div>
        </div>

        <div class="cvimg_container">
          <div class="cvcontent">
          <div class="intro_word">
            <div class="intro_title">ビズチャイナが考える<br>オンライン中国語学習の在り方</div>
            私たちは、時間とお金をかけてオンラインで中国語を学んでいる方々を最大限にサポートしたいと考えています。
            そのため、講師のあっせんだけにとどまらず、講師の採用、サイトの構築、教材の開発、日本人による学習サポートなど、多方面から総合的にサポートを行いたいと考えています。
            中国語学習においては、タイムパフォーマンスが非常に重要です。ビズチャイナを選んで利用いただいている皆様の貴重な時間が、しっかりと成果に結びつくように、スタッフ一同、全力で努めてまいります。
          </div>
          </div>
        </div>



                                             <section class="topix column">
                                               <p class="intro_title">コラム</p>
                                               <p class="intro_content">自分が興味のある日本語記事、ニュース、論文などを講師に中国語で紹介するという練習方法はいかがでしょうか。<br>
                                                 語学の練習だけでなく、マンツーマンで説明することで実用的な知識の定着も図れます。</p>
                                               <div class="columnArea">
                                                 <div v-for="(bcategory,bkey) in blog_list" :class="bkey == 0 ? 'reportChina' : bkey == 1 ? 'learnChina' : 'newsChina'">
                                                   <div>{{bcategory.name}}</div>
                                                   <ul v-for="(blog2) in bcategory.child" @click="goBlogInfo(blog2.id)">
                                                     <li class="columnDate">{{blog2.registered}}</li>
                                                     <li class="columnDes">{{blog2.title}}</li>
                                                   </ul>

                                                   <button class="more-button-c more-button-p">
                                                     <router-link :to="`/blogs?id=${bcategory.id}`">もっと見る
                                                       <span class="arrow-circle-c">→</span>
                                                     </router-link>
                                                   </button>

                                                 </div>
                                               </div>
                                             </section>

                                             <div class="CV_short">
                                               <div class="CV_shortContent">
                                                 <div class="intro_title">オンライン中国語<br>気軽に、身近に</div>
                                                 <router-link v-if="logged == false" to="/plan"><p class="RightBtn">{{register_text}}</p>
                                                 </router-link>
                                               </div>
                                             </div>
                                             <GotoTop />
      </main>

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
ul {
  list-style-type: none;
  padding: 0;
}

.card {
  background: #fefefe;
  height: 300px;
}

.slider-container {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
}

.slider-slides-group {
  width: 100%;
  height: 600px;
  left: 0%;
  transition: 0.5s all ease-out;
  position: absolute;
  z-index: 10;
}

.slider-slide {
  position: absolute;
  top: 0%;
  width: 100%;
  height: 86vh;
  background-size: cover;
  background-color: ;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 0px;
  border-radius: 0px;
  z-index: 10;
  transition: 0.5s all ease-out;
}

.slider-slide.active-slide {
  left: 0%;
}

.slider-cursor-left {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #a5ced2;
  position: absolute;
  z-index: 30;
  top: calc(50% - 32px);
  left: 12px;
  cursor: pointer;
  border-radius: 50%;
}

.slider-cursor-left img {
  position: relative;
  left: -2px;
}

.slider-cursor-right {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #a5ced2;
  position: absolute;
  z-index: 30;
  top: calc(50% - 32px);
  right: 12px;
  cursor: pointer;
  border-radius: 50%;
}

.slider-cursor-righ img {
  position: relative;
  right: -2px;
}

div.slider-indicators-container {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 60px;
  position: relative;
}

ul.slider-indicators {
  list-style: none;
  padding: 0px;
  margin-bottom: 32px;
  position: absolute;
  top: 12px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  z-index: 20;
}

li.slider-indicator {
  width: 12px;
  height: 12px;
  margin: 32px 12px 32px 8px;
  background: #3a3a3a;
  border-radius: 50%;
  cursor: pointer;
}

li.slider-indicator.active-indicator {
  transform: scale(1.1);
  background: #f2b705;
  /* background: linear-gradient(90deg, rgba(214, 189, 98, 1) 0%, rgba(114, 101, 54, 1) 100%); */
}

ul {
  /* display: block; */
}

.button_slider-indicator {
  color: #fff;
  letter-spacing: 0.1em;
  list-style: none;
  background-color: ;
  width: 100%;
  height: 96px;
  cursor: pointer;
}

.button_slider-indicator:nth-of-type(1),
.button_slider-indicator:nth-of-type(4) {
  background-color: ;
}

.button_slider-indicator:nth-of-type(2),
.button_slider-indicator:nth-of-type(5) {
  background-color: ;
}

.button_slider-indicator:nth-of-type(3) {
  background-color: ;
}

.btn_movie {
  height: 18px;
  width: 230px;
  cursor: pointer;
  margin-top: 16px;
}

header .header_inner .header_nav {
  margin-right: 24px;
}

.notosans {
  font-family: "Noto Sans JP", sans-serif;
}
.teacherTitle .intro_title{
  padding-right: 3%;
}
.teacherTitle .intro_content{
  padding-right: 3%;
  width: 100%;
}
.teacherTitle{
  background-size: 90px;
  background-position: 0 40px;
}
.intro_title{
  font-size: 26px;
  line-height: normal;
}
.CV_shortContent{
  width: 840px;
}
.CV_shortContent{
  padding-top: 20px;
}
.RightBtn{
  margin-top: 12px;
}

@media screen and (max-width: 520px) {
  .RightBtn{
    display: block;
    line-height: 56px;
  }
  .CV_short{
    height: auto;
    padding-bottom: 4%;
  }
  .intro_title{
    font-size: 26px;
    line-height: normal;
  }
  .CV_shortContent{
    width: 100%;
  }
  .CV_shortContent{
    padding-top: 20px;
  }
  .RightBtn{
    margin-top: 12px;
  }
}
</style>
