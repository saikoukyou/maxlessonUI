<template>
  <div>
  <div class="FVspaceContents"></div>

  <section class="contentsWrap textbookPage">

    <div class="textBookT">BizCHINA法人教材(66段)</div>

    <div v-if="category_list?.length" class="textArray" v-for="(category,cindex) in category_list">
      <nuxt-link :to="'/mypage/textbookListBusiness?category='+category.id" class="textLink">
        <div class="textSubtitle">
          <span class="tagL" v-if="category.learn_type === 0">総合</span>
          <span v-else>会话</span>
          <h3>{{category.name}}</h3>
          <p class="total">{{category.tnum}}課</p>
        </div>
      </nuxt-link>
      <nuxt-link :to="'/mypage/textbookListBusiness?category='+category.id">
      <div class="textDetails">
        <ul>
          <li v-for="(tag,tindex) in level_map_list" :style="category.tag_level.includes(tindex) ? 'background-color: #479EEA;color:white;' : ''">{{tag}}</li>
        </ul>
        <p>{{category.explanation}}</p>
      </div>
      </nuxt-link>
    </div>


  </section>


  <div style="height: 24vh;"></div>



  </div>
</template>


<script setup>
import { register } from 'swiper/element/bundle';
import {useHomeCategoryListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {usePage} from "~/composables/usePage";
import {useMainStore} from "~/composables/store";

// register Swiper custom elements
register();

let category_list = ref([]);
let level_map_list = ref([]);
const useStore = useMainStore();
const user =  useStore.studentInfo;

const getCategorys = async () => {
  if (user?.business_id) {
    let bid = user?.business_id;
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
.textbookPage{
  width: 890px;
}
.tag-active{
  color:white;
  background-color: rgb(101, 171, 233);
}

.textArray{
  display:grid;
  grid-template-columns:4.7fr 13.5fr !important;
}
.textArray .textDetails ul li{
  font-size: 12px;
}
.textArray .textSubtitle{
  padding: 5% 7% 3% 7%;
}
.textArray .textSubtitle>.total{
  margin: 4px 0;
  font-size: 15px;
}
.contentsWrap h3{
  margin: 6px 0 0 0;
}
.tagL{
  font-size: 12px;
  padding: 2px 6px;
  background-color: #91B6D6;
}
.textArray .textSubtitle{
  background-color: #EAF0F9;
}
.textArray .textSubtitle>.total{
  color: #666666;
}
.tag-active{
  color:white !important;
  background-color: rgb(101, 171, 233) !important;
}
.textArray .textDetails::after{
  background-image:url("../../assets/images/buttonArrowBlue.svg");
}

@media screen and (max-width: 520px) {

  .textbookPage{
    width: 100%;
  }
  .textArray .textLink{
    width: 100%;
  }
  .textArray{
    display: inline-block;
    grid-template-columns: auto;
  }
.textArray .textSubtitle{
  padding-top: 5%;
}

.textArray .textSubtitle>.total {
  text-align: left;
}
.textArray .textLinkAbsolute{
  width: auto;
}

.textArray .textDetails p{
  text-align: left;
  margin-bottom: 30px;
  width: 100%;
}

.textDetails{
  margin-bottom: 20px;
}
}


</style>