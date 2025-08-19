<template>
  <div class="topTemplate">
  <section class="PlanPrice">
    <div class="PlanPrice__inner">
    <div class="subPosition">
      <span class="subTitle">記事一覧</span>
    </div>
    </div>
  </section>

  <div class="blogListBg" >
    <ul class="BlogArticleMenu">
      <li
          v-for="(category) in categorys"
          :key="category.id"
          :class="{ active: category.id == categoryId }"
          @click="changeCategory(category.id)"
          @mouseenter="hoverMenu = category.id"
          @mouseleave="hoverMenu = null"
          :style="{
  backgroundColor: (category.id == categoryId || hoverMenu === category.id)
    ? (categoryColorMap[category.id] || '#e86c00')
    : '',
  color: (category.id == categoryId || hoverMenu === category.id)
    ? '#fff'
    : '#333',
}"
      >
        {{ category.name }}
      </li>
    </ul>



    <section class="blogArticle">
      <ul class="bloglist">
        <li
            v-for="(blog2) in blogs"
            :key="blog2.id"
            class="blogitem"
            @click="goBlogInfo(blog2.id)"
        >
          <div class="meta">
            <span class="date">{{ blog2.registered }}</span>
            <span
                class="category-tag"
                :style="{
    color: categoryColorMap[categoryId] || '#ED7E32',
    borderColor: categoryColorMap[categoryId] || '#ED7E32'
  }"
            >
  {{ currentCategoryName }}
</span>

          </div>
          <div class="title">
            <h3>{{ blog2.title }}</h3>
          </div>
          <div class="arrow">→</div>
        </li>
      </ul>
      <n-pagination size="large" style="margin-top:10px;" :item-count="alltotal" :page="page" :page-size="limit"
                    :on-update:page="handlePageChange" />
    </section>

  </div>
  </div>
</template>

<script setup>
import {
  useBlogInfoApi, useBlogListDataApi,
  useHomeBlogAndVideoListDataApi,
  useHomeLessonAndInfoListDataApi, useIndexDataApi,
  useIndexListDataApi,
} from "~/apis";
import {onMounted, ref} from "vue";
import {usePage} from "~/composables/usePage";
import {formatDate} from "~/composables/useUtil";
import {NPagination} from "naive-ui";

const currentCategory = computed(() => {
  return categorys.value.find(cat => cat.id == categoryId.value);
});


let flag = ref(1);
let categorys = ref([]);
let blogs = ref([]);
const page = ref(1);
let limit = ref(10);
let alltotal = ref(0);
let categoryId = ref(0);

const route = useRoute();
if (route && route?.query?.id) {
  categoryId.value = route.query.id;
}

const hoverMenu = ref(null);

const categoryColorMap = {
  18: '#FA8373', // 更新情報
  17: '#7c344d', // その他
  12: '#ED7E32', // 生徒向けニュース
  11: '#499849', // 豆知識
  10: '#3682E0'  // 中国語オンリー
};

const currentCategoryName = computed(() => {
  return categorys.value.find(cat => cat.id == categoryId.value)?.name || '';
});


const getBlogs = async () => {
  let {
    pending,
    data,
    error,
    rows,
    total
  } = await usePage(() => {
    return useBlogListDataApi(categoryId.value ,{
      per_page: limit.value,
      page: page?.value || 1,
      get_count: true
    })
  })
  if (data?.value) {
    blogs.value = rows?.value ?? [];
    alltotal.value = total?.value ?? 0;
  }

}

function changeCategory(categoryid) {
  categoryId.value = categoryid;
  getBlogs();
}

const getCategories = async () => {
  const { pending, data: blogData } = await useBlogInfoApi(null, 1);
  if (blogData?.value) {
    const list = blogData?.value?.clist ?? [];

    // 排序邏輯放在這裡：
    const desiredOrder = [18, 10, 11, 12, 17];
    categorys.value = desiredOrder
        .map(id => list.find(c => c.id === id))
        .filter(Boolean);
  }
}


onMounted(() => {
  getCategories();  // 取得分類清單
  changeCategory(categoryId.value);  // 取得該分類下的文章
});

function handlePageChange(p) {
  page.value = p;
  getBlogs();
}

function goBlogInfo(bid) {
  const encodedBid = btoa(encodeURIComponent(bid+''));
  navigateTo({path:'/blog/info',query:{
      bid: encodedBid,
      fromCategoryId: categoryId.value
    }}, { replace: true })
}


</script>

<style scoped>

.bloglist {
  list-style: none;
  padding: 0;
  margin: 0;
}

.BlogArticleMenu {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #333333;
  width: 1048px;
  margin:auto;
}

.BlogArticleMenu li {
  list-style: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 12px 12px 0 0;
  background-color: transparent;
  position: relative;
  height: 54px;
  line-height: 54px;
  width: 202px;
  text-align: center;
  font-size: 16px;
}

.BlogArticleMenu li:hover {
  background-color: #f8f8f8;
}

.BlogArticleMenu li.active {
  position: relative;
  z-index: 2;
}
.blogListBg{
  padding: 30px 0 60px 0;
}
.blogArticle{
  width: 1048px;
  margin: auto;
}
.category-tag{
  margin-left: 16px;
}
@media screen and (max-width: 520px) {
  .blogListBg{
    padding: 20px 0;
  }
  .BlogArticleMenu {
    flex-wrap: wrap;
    width: 100%;
    padding: 0 24px;
    gap: 8px;
    border-bottom: none;
    margin-bottom: 20px;
  }

  .BlogArticleMenu li {
    width: calc(50% - 8px);
    height: auto;
    line-height: normal;
    padding: 8px 0;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
  }

  .BlogArticleMenu li.active {
    color: white !important;
    background-color: var(--hoverColor, #e86c00);
    border: none;
  }
}

</style>

