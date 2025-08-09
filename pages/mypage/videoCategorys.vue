<template>
<div class="mypageTemplate">
  <div class="Pricelist blockW">
    <p class="headline">動画視聴リスト</p>
    <div class="PricelistWrap">
    <div v-for="(category) in categoryList">
      <div>
        <NuxtLink :to="'/mypage/videoList?id='+category.id+'&name='+category.name">
          <h4>{{category.name}}</h4>
          <div class="month-plan-main">
            <img :src="category.sample_image" style="height: 100%;width:100%;"></img>
          </div>
          <div style="height: 50px;">
          </div>
        </NuxtLink>
      </div>
    </div>
    </div>
  </div>

</div>
</template>

<script setup>
import {createDiscreteApi} from "naive-ui";
import {ref} from "vue";
import {useStudentVideoCategorysApi} from "~/apis/student";
import IconLoginRed from "assets/SVG/icon_login_red.svg";
import {useMainStore} from "~/composables/store";

let categoryList = ref([]);
const useStore = useMainStore();
const user = useStore.studentInfo;

const getList = async () => {
  const {data: list  } = await useStudentVideoCategorysApi(user?.id ?? 0);
  if (list?.value) {
    categoryList.value = list?.value ?? [];
  }
}

onMounted(() => {
  getList();
})
</script>
<style scoped>
.Pricelist{
  width: auto;
}
</style>
