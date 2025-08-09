<template>
<div class="blogBg">
  <div class="blogContent">
    <span class="blogTime">{{ blogdate }}</span>
    <br>
    <span class="blogTitle">{{ blogtitle }}</span>

    <div
        class="navtag"
        v-for="(category) in categorys"
        :key="category.id"
        @mouseenter="hoverTag = category.id"
        @mouseleave="hoverTag = null"
        :style="{
    color: hoverTag === category.id ? '#fff' : (categoryColorMap[category.id] || '#e86c00'),
    backgroundColor: hoverTag === category.id ? (categoryColorMap[category.id] || '#e86c00') : '#fff',
    border: '1px solid ' + (categoryColorMap[category.id] || '#e86c00'),
    transition: 'all 0.25s ease'
  }"
    >
      <nuxt-link
          :to="'/blogs?id=' + category.id"
          style="text-decoration: none; color: inherit;"
      >
        {{ category.name }}
      </nuxt-link>
    </div>



    <hr class="dashed-line">
  <section class="ColumnArticle">
    <div class="inner">
      <p class="text">
        <div class="ck-content" v-html="bodyhtml"></div>
      </p>
    </div>
  </section>
</div>



  <div v-if="categorys.length > 0" class="BtnPosition">
    <button class="back-button"
            @click="goBack"
            :style="{
  color: isHover ? '#fff' : (categoryColorMap[categorys[0]?.id] || '#ED7E32'),
  border: '1px solid ' + (categoryColorMap[categorys[0]?.id] || '#ED7E32'),
  backgroundColor: isHover ? (categoryColorMap[categorys[0]?.id] || '#ED7E32') : '#fff'
}"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
    >
  <span class="icon"
        :style="{
    backgroundColor: '#fff',
    color: categoryColorMap[categorys[0]?.id] || '#ED7E32'
  }"
  >
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
    <path fill="currentColor" d="M15 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 0 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h9.69A.75.75 0 0 1 15 8z"/>
  </svg>
</span>

      <span class="label">
    <span v-for="(category) in categorys">{{ category.name }}</span>一覧に戻る
  </span>
    </button>

  </div>


</div>
</template>
  
<script setup>
import {
  useBlogInfoApi
} from "~/apis";
import '~/assets/css/content.css'

import { useRouter } from 'vue-router';
import {onMounted} from "vue";
const router = useRouter();

function goBack() {
  const categoryId =
      backCategoryId.value ||
      (categorys.value.length > 0 ? categorys.value[0].id : null);

  if (categoryId) {
    router.push(`/blogs?id=${categoryId}`);
  } else {
    console.warn('無法取得分類 ID，無法返回分類頁');
  }
}


let flag = ref(1);
let categorys = ref([]);
let blogtitle = ref('');
let blogdate = ref('');
let bodyhtml = ref('');
let blogId = ref('');
let backCategoryId = ref(null);

const route = useRoute();

const getBlogInfo = async () => {
  const { pending, data: blogData } = await useBlogInfoApi(blogId.value,flag.value);
  // console.log('blogData:'+JSON.stringify(blogData));
  if (blogData?.value) {
    const allCategories = blogData?.value?.clist ?? [];
    const blogCategoryId = blogData?.value?.info?.category_id;

    // 只找出這篇文章所屬的那一筆分類
    const matchedCategory = allCategories.find(cat => cat.id === blogCategoryId);
    categorys.value = matchedCategory ? [matchedCategory] : [];

    blogtitle.value = blogData?.value.info.title;
    blogdate.value = blogData?.value.info.registered;

    // ✅ 這邊加入 oembed 替換為 iframe
    let rawBody = blogData?.value.info.body || '';
    rawBody = rawBody.replace(
        /<oembed url="https:\/\/www\.youtube\.com\/watch\?v=([^"]+)"><\/oembed>/g,
        (match, videoId) => {
          return `<iframe width="100%" height="315"
                  src="https://www.youtube.com/embed/${videoId}"
                  frameborder="0" allowfullscreen></iframe>`;
        }
    );
    bodyhtml.value = rawBody;
    flag.value = 0;
  }
}

const isHover = ref(false);
const hoverTag = ref(null);


const categoryColorMap = {
  18: '#D92332', // 更新情報
  17: '#7c344d', // その他
  12: '#ED7E32', // 生徒向けニュース
  11: '#499849', // 豆知識
  10: '#3682E0'  // 中国語オンリー
};

onMounted(() => {
  const encodedBid = route.query?.bid ?? '';
  if (encodedBid) {
    blogId.value = decodeURIComponent(atob(encodedBid));
  }

  // 👇 加這段：取得分類來源 ID
  if (route.query?.fromCategoryId) {
    backCategoryId.value = route.query.fromCategoryId;
  }

  getBlogInfo();
});


</script>
<style scoped>
.navtag {
  width: fit-content;
  text-align: center;
  font-size: 12px;
  border-radius: 24px;
  font-weight: bold;
  padding: 0 12px;
  height: 26px;
  line-height: 26px;
  background-color: #fff;
  white-space: nowrap;
  margin: 16px 0;
}


.back-button {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background-color: #FFFFFF;
    color: #000;
    border: none;
    border-radius: 999px;
    padding: 1rem 2rem;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  .back-button .icon {
    background-color: white;
    color: #ED7E32; /* 深藍箭頭 */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  .back-button:hover .icon {
    background-color: white; /* icon 保持白底 */
    color: #ED7E32; /* 箭頭改成藍色 */
  }

  .blogContent{
    width: 1130px;
    margin:auto;
    padding: 32px 48px;
    background-color: #FFFFFF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
  .blogTime{
    display: block;
    font-size: 16px;
    color: #333333;
  }
  .blogBg{
    background-color: #f4f4f4; padding-top: 30px;
  }
  .blogTitle{
    font-size: 32px;
    display: block;
  }
  .dashed-line {
    border: none;
    border-top: 1px dashed #dddddd; /* 可調整線條粗細與顏色 */
    margin: 16px 0 20px 0; /* 上下間距 */
  }
  .BtnPosition{
    margin: auto; text-align: center; padding: 32px;
  }

:deep(.ck-content iframe) {
  width: 900px;
  margin: 16px auto 0 auto;
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  display: block;
}


@media screen and (max-width: 520px) {
  .blogBg{
    padding-top: 0;
  }
  .blogContent{
    width: 100%;
    padding: 24px;
    margin-top: 48px;
  }
  .ColumnArticle .inner{
    padding: 0;
  }
  .back-button{
    padding: 1rem 1.6rem;
  }
  :deep(.ck-content iframe) {
    width: 100%;
  }
}
</style>