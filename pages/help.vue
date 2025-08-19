<template>
<div class="topTemplate page-wrapper">
  <section class="PlanPrice">
    <div class="PlanPrice__inner">
      <div class="subPosition">
        <span class="subTitle">よくある質問</span>
      </div>
    </div>
  </section>


  <section class="contentsWrap searchTeacher helpPc">
  <div class="help">
  <ul class="select_help">
    <li :class="selected_index == index ? 'selected bold' : ''" @click="changeHelp(index)" v-for="(faq,index) in faq_list">{{faq.name}}</li>
<!--    <li>ログイン</li>-->
<!--    <li>レッスン予約関連</li>-->
<!--    <li>レッスントラブル</li>-->
<!--    <li>レッスンルーム</li>-->
<!--    <li>教材について</li>-->
<!--    <li>Skype</li>-->
<!--    <li>ネットチャイナについて</li>-->
<!--    <li>法人のお客様</li>-->
<!--    <li>トラブル</li>-->
<!--    <li>その他</li>-->
    <li style="border: 0; background: none; box-shadow: 0 0 0 rgba(0, 0, 0, 0);"></li>
    <li @click="openContact" :class="selected_index == faq_list.length ? 'selected bold' : ''">お問い合わせ</li>
  </ul>

  <div v-if="contactShow">
    <contact></contact>
  </div>
  <div v-else class="select_helpContents">
    <div v-if="faq_list[selected_index]">
      <h3>{{faq_list[selected_index].name}}</h3>
      <div v-if="qshow" class="helpContainer" v-for="(faq_info,findex) in faq_list[selected_index].faqs">
        <p class="title fs18" @click="openAnswer(findex)">{{faq_info.question}}
        </p>
        <!--      <NuxtLink class="link" :to="`/help-${selected_index}/${faq_info.id}`"></NuxtLink>-->
      </div>
      <div v-else class="select_helpContents">
        <div class="title fs18">
          <div v-html="faq_list[selected_index].faqs[selected_findex].question" style="display: inline-block;"></div>
        </div>
        <div class="greenBorder" v-html="faq_list[selected_index].faqs[selected_findex].answer"></div>
        <div class="HelpBackBtn" @click="goBackToQuestions">戻る</div>
      </div>
    </div>
  </div>

</div>

</section>

  <section class="contentsWrap searchTeacher helpMobile">
     <!-- 分類列表 -->
        <div
            v-for="(faq, index) in faq_list"
            :key="index"
            :class="selected_index == index ? 'selected bold ' : ''"
            @click="changeHelp(index)"
            class="topTag"
        >
          <span class="faqName" :class="{ 'with-border': selected_index == index }">
            {{ faq.name }}
          </span>

          <!-- 問題列表 -->
          <div v-if="selected_index === index && qshow">
            <p
                class="faqQName"
                style="cursor: pointer;"
                v-for="(faq_info, findex) in faq.faqs"
                :key="findex"
                @click="openAnswer(findex)"
            >
              {{ faq_info.question }}
            </p>
          </div>
          <!-- 顯示詳細答案 -->
          <div v-else-if="selected_index === index && !qshow" class="ansBlock">
              <div class="faqQName" v-html="faq_list[selected_index]?.faqs[selected_findex]?.question"></div>
              <div class="ansBG"><div class="faqAns" v-html="faq_list[selected_index]?.faqs[selected_findex]?.answer"></div></div>
            <div class="backBG"><div class="HelpBackBtn" @click="goBackToQuestions">戻る</div></div>
          </div>
        </div>

    <div class="contactBtn" @click="openContact">お問い合わせ</div>

    <div v-if="contactShow">
      <contact></contact>
    </div>
  </section>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHomeFaqListDataApi } from "~/apis/faqs";
import Contact from "~/pages/contact.vue";

// 響應式數據
const faq_list = ref([]); // FAQ 數據
const selected_index = ref(0); // 當前選中的分類索引
const selected_findex = ref(0); // 當前選中的問題索引
const qshow = ref(true); // 是否顯示問題列表
const contactShow = ref(false); // 是否顯示聯繫頁面

const route = useRoute();
const router = useRouter();

// 加載 FAQ 數據
const getHomeFaqList = async () => {
  const { pending, data: faq_infos } = await useHomeFaqListDataApi();
  if (faq_infos?.value) {
    faq_list.value = faq_infos.value.list ?? [];
    // console.log("FAQ List Loaded:", faq_list.value);
  }
};

// 切換分類
const changeHelp = (index) => {
  selected_index.value = index;
  qshow.value = true;
  contactShow.value = false;
  selected_findex.value = 0;

  // 滚动到对应分类的顶部并偏移 -44px
  setTimeout(() => {
    if (window.innerWidth <= 768) { // 判断是否为移动设备
      const categoryElement = document.querySelectorAll('.faqName')[index];
      if (categoryElement) {
        const rect = categoryElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 计算滚动目标位置，加上偏移量（-48）
        const targetPosition = rect.top + scrollTop - 48;

        // 使用 window.scrollTo 实现平滑滚动到目标位置
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, 0);


  // console.log("Category changed:", selected_index.value);
};

// 顯示答案
const openAnswer = (findex) => {
  selected_findex.value = findex;
  qshow.value = false;
  contactShow.value = false;

  // 更新路由參數
  router.replace({
    path: route.path,
    query: {
      cindex: selected_index.value,
      qindex: selected_findex.value,
    },
  });

  // console.log("Opened answer:", {
  //   question: faq_list.value[selected_index.value]?.faqs[selected_findex.value]?.question,
  //   answer: faq_list.value[selected_index.value]?.faqs[selected_findex.value]?.answer,
  // });
};

// 顯示聯繫頁面
const openContact = () => {
  selected_index.value = faq_list.value.length;
  contactShow.value = true;
  qshow.value = false;
  // console.log("Contact page opened");
};

// 返回問題列表
const goBackToQuestions = () => {
  qshow.value = true;
  contactShow.value = false;
  selected_findex.value = 0;

  // console.log("Back to questions");
};

// 監控路由參數變化
watch(
    () => route.query,
    (newQuery) => {
      if (newQuery.cindex && newQuery.qindex) {
        selected_index.value = parseInt(newQuery.cindex);
        selected_findex.value = parseInt(newQuery.qindex);
        qshow.value = false; // 顯示答案模式
        contactShow.value = false;

        // console.log("Route updated (with answer):", newQuery);
      }
    },
    { immediate: true }
);

// 初始化頁面
onMounted(async () => {
  await getHomeFaqList();

  if (route.query.cindex && route.query.qindex) {
    selected_index.value = parseInt(route.query.cindex);
    selected_findex.value = parseInt(route.query.qindex);
    qshow.value = false;
    contactShow.value = false;

    // console.log("Initialized with category and question:", {
    //   cindex: selected_index.value,
    //   qindex: selected_findex.value,
    // });
  }
});
</script>

<!--<script setup>-->
<!--import {useHomeFaqListDataApi} from "~/apis/faqs";-->
<!--import Contact from "~/pages/contact.vue";-->
<!--import {onMounted} from "vue";-->

<!--let selected_index = ref(0);-->
<!--let selected_findex = ref(0);-->
<!--let qshow = ref(true);-->
<!--let contactShow = ref(false);-->
<!--let faq_list = ref([]);-->
<!--const route = useRoute();-->
<!--const router = useRouter();-->

<!--const getHomeFaqList = async () => {-->
<!--  const {pending, data: faq_infos  } = await useHomeFaqListDataApi();-->
<!--  if (faq_infos?.value) {-->
<!--    faq_list.value = faq_infos?.value?.list ?? [];-->
<!--  }-->
<!--}-->

<!--function changeHelp(index) {-->
<!--  selected_index.value = index;-->
<!--  qshow.value = true;-->
<!--  contactShow.value = false;-->
<!--}-->

<!--function openAnswer(findex) {-->
<!--  selected_findex.value = findex;-->
<!--  qshow.value = false;-->
<!--  contactShow.value = false;-->
<!--  router.replace({-->
<!--    path: route.path, // 保持当前路径不变-->
<!--    query: {"cindex" : selected_index.value,"qindex" : findex},  // 更新查询参数-->
<!--    // 如果你想在URL中保持未指定的查询参数（即那些在当前route.query中但不在newQuery中的参数），-->
<!--    // 你需要手动将它们包含进来，或者编写一个函数来合并它们。-->
<!--    // 这里为了简化，我们假设我们只关心newQuery中的参数。-->
<!--  });-->
<!--}-->

<!--function openContact() {-->
<!--  selected_index.value = faq_list.value.length;-->
<!--  contactShow.value = true;-->
<!--  qshow.value = false;-->
<!--}-->

<!--onMounted(() => {-->

<!--  getHomeFaqList();-->

<!--  if (route && route?.query?.cindex && route?.query?.qindex) {-->
<!--    selected_index.value = route?.query?.cindex ?? 0;-->
<!--    selected_findex.value = route?.query?.qindex ?? 0;-->
<!--    qshow.value = false;-->
<!--    contactShow.value = false;-->
<!--  }-->

<!--})-->

<!--  function goBackToQuestions() {-->
<!--    qshow.value = true;-->
<!--    selected_findex.value = 0; // 根據需求，你可以重置 `selected_findex` 或保留當前的-->
<!--  }-->
<!--</script>-->
<style lang="scss" scoped>

  .HelpBackBtn{
    width: 20%;
    height: 48px;
    line-height: 48px;
    color: #FFFFFF;
    border-radius: 30px;
    background-color: var(--pink-dark);
    text-align: center;
    margin: 60px auto 40px auto;
    cursor: pointer;
  }

.form-lable-custom {
    margin-top: 12px;
  }

  .select_helpContents .title{
    line-height: 32px;
  }

  .select_helpContents{
    margin-top: 20px;
  }
  .select_help{
    margin-top: 20px;
  }
  .helpPc{
    display: block;
  }
  .helpMobile{
    display: none;
  }

  @media screen and (max-width: 520px) {
    .helpMobile{
      display: block;
      padding-bottom: 30px;
    }
    .helpPc{
      display: none;
    }
    .select_help{
      margin-top: 90px;
    }

    .select_help li:last-child {
      position:absolute;
      width: 90%;
      text-align: center;
      top: 24px;
      border: 1px solid #E68E05;
      line-height: 26px;
      align-items: center;
      background-color: #f9f1d8;
      border-radius: 8px;
    }
    .select_help li{
      display: ruby-text;
    }
    .select_helpContents h3{
      width: 90%;
      margin: auto;
    }
    .select_helpContents{
      margin-top: 10px;
    }
    .searchTeacher{
      padding: 6% 4% 0 4%;
    }

    .select_help li {
      // 其他樣式...
      color: inherit; // 保持原來的顏色
    }

    .select_help li.selected {
      // 確保選中的項目除了 "お問い合わせ" 以外，字體顏色變化
      color: white;
    }

    .select_help li:last-child.selected {
      color: inherit; // 確保 "お問い合わせ" 保持原來的顏色，即使被選中
    }
    .select_help li:first-child.selected {
      background-color: var(--pink-dark);
    }
    .faqName{
      background-color: #FFFFFF;
      padding: 16px 16px 16px 14px;
      width: 100%;
      display: block;
      align-items: center;
      vertical-align: center;
      border: 1px solid #EEEEEE;
      border-left: 5px solid #EEEEEE;
      color: #424242;
      font-size: 16px;
    }
    .faqQName{
      font-size: 14px;
      padding: 10px 15px 10px 19px;
      background-color: #FFF9EC;
      border: 1px solid #EEEEEE;
      font-weight: normal;
      line-height: 20px;
    }
    .faqAns{
      padding: 10px 20px;
      background-color: #FFFFFF;
      font-size: 14px;
      font-weight: normal;
    }
    .HelpBackBtn{
      width: 60%;
      margin: 0 auto !important;
    }
    .backBG{
      width: 100%;
      background-color:rgb(255, 249, 236);
      padding: 10px 10px 30px 10px;
      margin-bottom: 30px;
      border-left: 1px solid #EEEEEE;
      border-right: 1px solid #EEEEEE;
      border-bottom: 1px solid #EEEEEE;
    }
    .ansBG{
      padding: 0 10px 10px 10px;
      background-color: #FFF9EC;
      margin-top: -1px;
      border-left: 1px solid #EEEEEE;
      border-right: 1px solid #EEEEEE;
    }
    .with-border {
      border-left: 5px solid var(--pink-dark);
      color: var(--pink-dark);
    }
    .arrow-up {
      color: green; /* 選中時的箭頭顏色 */
      transform: rotate(0deg); /* 確保箭頭朝上 */
    }

    .arrow-down {
      color: gray; /* 未選中時的箭頭顏色 */
      transform: rotate(180deg); /* 確保箭頭朝下 */
    }
    .contactBtn{
      border: 1px solid rgb(242, 183, 5);
      background-color: #FFF9EC;
      line-height: 48px;
      text-align: center;
      border-radius: 4px;
      height: 48px;
      width: 80%;
      margin: 20px auto;
    }

  }

</style>