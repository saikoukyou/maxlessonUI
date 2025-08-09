<template>
  <div>


  <div class="FVspaceContents"></div>




  <section class="contentsWrap textbookPage">
    <div class="textBookT">BizCHINA法人教材(66段)</div>

    <div v-if="category_list?.length" class="textArray" v-for="(category,cindex) in category_list">
      <nuxt-link :to="'/teacher/center/textbookListBusiness?category='+category.id" class="textLink">
        <div class="textSubtitle">
          <span class="tagL" v-if="category.learn_type === 0">学习</span>
          <span v-else>会话</span>
          <h3>{{category.name}}</h3>
          <p class="total">{{category.tnum}}課</p>
        </div>
      </nuxt-link>
      <div class="textDetails">
        <nuxt-link :to="'/teacher/center/textbookListBusiness?category='+category.id" class="textLinkAbsolute"></nuxt-link>
        <ul>
          <li v-for="(tag,tindex) in level_map_list" :style="category.tag_level.includes(tindex) ? 'background-color: #E46722;color:white;' : ''">{{tag}}</li>
        </ul>
        <p>{{category.explanation}}</p>
      </div>
    </div>


  </section>


  <div style="height: 24vh;"></div>



  </div>
</template>


<script setup>
import { register } from 'swiper/element/bundle';
import {useHomeCategoryListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";

// register Swiper custom elements
register();

let category_list = ref([]);
let level_map_list = ref([]);
const route = useRoute();

const getCategorys = async () => {
  if (route?.query?.bid) {
    let bid = route?.query?.bid;
    // let ltype = route?.query?.ltype ?? '';
    let {data: courseinfos  } = await useHomeCategoryListDataApi(6,bid);
    if (courseinfos?.value) {
      category_list.value = courseinfos?.value.courses ?? [];
      level_map_list.value = courseinfos?.value.tag_level_maps ?? [];
    }
  }
};

onMounted(() => {

  getCategorys();

})

</script>


<style scoped>
swiper-container::part(button-next),swiper-container::part(button-prev) {
    color: #fff;
}
.teacherImg {
  max-width: 200px;
}


</style>