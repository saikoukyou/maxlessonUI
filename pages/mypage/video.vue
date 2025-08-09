<template>
    <div class="netchina_contents">
      <div class="blockW">
        <h5>{{user.corporate_name}} 専用動画研修プラ</h5>
        <ul class="videoUl">
          <li>ご利用可能動画カテゴリ</li>
          <li>{{user.video_name}}</li>
          <li>ご利用期限</li>
          <li>{{user.video_end_date}}</li>
          <li>受講目標</li>
          <li>{{user.video_target_base}}<span v-if="user.video_target_type == 1">册</span><span v-else>课</span></li>
          <li>達成状況</li>
          <li>{{user.video_complete_num}}<span v-if="user.video_target_type == 1">册</span><span v-else>课</span></li>
          <li>達成比率</li>
          <li>{{user.video_complete_rate}}%</li>
        </ul>


        <h5>動画研修内容一覧</h5>

        <div
            class="vList"
            v-for="(item, key) in list"
            :key="item.id"
            @click="toggleList(key)"
        >
          <!-- 列的標題和摘要 -->
          <div>
            <span class="vTitle">{{ item.name }}</span>
            <span class="vLesson">
        <span class="blueW">{{ item.video_complete }}課</span> / 全{{ item.video_total }}課
      </span>
            <n-progress class="circleV" type="circle" :percentage="item.complete_rate" />
            <div
                class="pointB"
                :class="{ open: item.isOpen }"
            ></div>
          </div>

          <!-- 子列表顯示/隱藏 -->
          <div class="vLessonList" v-if="item.isOpen">
            <ul v-for="(vitem) in item.child" :key="vitem.id">
              <nuxt-link :to="'/mypage/videoInfo?id=' + vitem.id">
                <li>{{ vitem.title }}<span class="completeMark" v-if="vitem.is_complete == 1">クリア</span></li>
              </nuxt-link>
            </ul>
          </div>
        </div>

        <h5 style="margin-top: 40px;">未契約動画研修コンテンツ一覧</h5>
        <div class="noneList" v-for="(nitem,key) in noList">
          <div v-if="nitem.open == 1">
            {{nitem.name}}
            <span>
              {{nitem.count}}課
            </span>
            <div v-for="(ncitem) in item.child">
              <nuxt-link :to="'/mypage/videoInfo?id='+ncitem.id">
                <li class="">{{ncitem.title}}</li>
              </nuxt-link>
            </div>
          </div>

          <div v-else>
            {{nitem.name}}<span>{{nitem.count}}課</span>
          </div>
        </div>

      </div>
      </div>



</template>


<script setup>
import { ref, onMounted } from "vue";
import {
  useGetPlanVideoListApi,
} from "~/apis/student";
import {NProgress} from "naive-ui";
import {useMainStore} from "~/composables/store";


// 加載效果
const loading = ref(false);
const list = ref([]);
const noList = ref([]);
const useStore = useMainStore();
const user = useStore?.studentInfo ?? {};

const toggleList = (key) => {
  list.value[key].isOpen = !list.value[key].isOpen;
};

onMounted(async () => {
  const { pending, data: info } = await useGetPlanVideoListApi(user?.id);
  if (info?.value) {
    list.value = info?.value?.buy ?? [];
    noList.value = info?.value?.nobuy ?? [];
  }
});

</script>
<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 30%;
}
.n-select {
  width: 30%;
}

.videoUl{
  margin: 10px 0 40px 0;
  font-size: 14px;
  line-height: 26px;
  width: 50%;
}
.videoUl li{
  width: 200px;
}
.videoUl li:nth-child(odd){
  display: block;
  position: relative;
  float: left;
}
.videoUl li:nth-child(even){
  float: right;
  text-align: left;
  color: #2E6190;
  font-weight: bold;
}
.videoUl::after {
  content: "";
  display: block;
  clear: both;
}
::v-deep(.n-progress-text){
  font-size: 18px !important;
  color: #2E6190 !important;
  font-weight: bold !important;
}
.vList{
  border: 1px solid #B1D4FF; border-radius: 8px;
  padding: 20px 30px 10px 30px;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}
.vList::after {
  content: "";
  display: block;
  clear: both;
}
.vTitle{
  font-size: 19px;
  font-weight: bold;
  color: #2E6190;
}
.vLesson{
  font-size: 12px;
  display: block;
  margin-top: 4px;
  color: darkgrey;
  margin-bottom: 10px;
}
.circleV{
  width: 56px;
  top: 12px;
  right: 80px;
  position: absolute;
}
.blueW{
  color: #2E6190;
}
.pointB{
  width: 24px;
  height: 24px;
  position: absolute;
  right: 32px;
  top: 36px;
  background-image: url("../../assets/images/dropdown_B.png");
  background-size: 16px;
  background-repeat: no-repeat;
}
.pointB.open {
  transform: rotate(180deg);
  background-position: 8px 14px;
}
.vLessonList{
  width: 100%;
  margin-top: 20px;
  z-index: 999;
}
.vLessonList ul li{
  background-color: #f4f4f4;
  padding: 16px 10px;
  border-bottom: 1px solid #FFFFFF;
  background-image: url("../../assets/images/blackarrow.png");
  background-repeat: no-repeat;
  background-position: 712px center;
  background-size: 8px;
  position: relative;
}
.vLessonList ul li:hover{
  background-color: #F5F8FD;
}
.noneList{
  background-color: #EEEEEE;
  text-align: center;
  padding: 10px;
  display: inline-block;
  border-radius: 4px;
  font-size: 14px;
  color: #6F6F6F;
  margin-bottom: 10px;
  width: 19%;
  margin-right: 1%;
  vertical-align: top;
  min-height: 72px;
  position: relative;
}
.noneList span{
  display: block;
  margin-top: 4px;
}

.completeMark{
  position: absolute;
  display: block;
  right: 46px;
  top: 18px;
  font-size: 13px;
  background-image: url("../../assets/images/complete.png");
  background-repeat: no-repeat;
  background-size: 13px;
  background-position: 2px -1px;
  width: 60px;
  padding-left: 16px;
  color: #BEBEBE;
  font-weight: bold;
}
@media screen and (max-width: 520px) {
  .videoUl{
    width: 100%;
  }
  .videoUl li{
    height: 2rem;
  }
  .videoUl li:nth-child(odd){
    width: 60%;
  }
  .videoUl li:nth-child(even){
    width:40%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
  .vList{
    padding: 20px 16px 8px 16px;
  }
  .pointB{
    right: 16px;
    top: 30px;
  }
  .circleV{
    width: 48px;
    right: 48px;
  }
  .vTitle{
    font-size: 17px;
  }
  .vLessonList{
    margin-top: 12px;
  }
  .noneList{
    width: 49%;
  }

}

</style>