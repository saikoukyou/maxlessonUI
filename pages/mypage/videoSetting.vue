<template>
    <div style="height: 90px; width: 100%;"></div>

    <div class="netchina_contents">

      <div style="height: 40px;"></div>

      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/video"><li class="">所有视频课</li></nuxt-link>
        <nuxt-link to="/mypage/videoComplete"><li>我的学习任务</li></nuxt-link>
        <nuxt-link to="/mypage/videoSetting"><li class="selected">视频培训记录</li></nuxt-link>
      </ul>
      <div class="userInfoContents">
        <div v-for="(item,key) in list">
          <div>
            <div>
              {{item.video_begin_date}}-{{item.video_end_date}}
            </div>
            <div>
              目标
              <span v-if="item.video_target_type == 1">
                {{item.video_target_volume}}册
                完成{{item.video_complete_num}}册
            </span>
              <span v-else>
                {{item.video_target_volume}}课
                完成{{item.video_complete_num}}课
              </span>
              完成率{{item.video_complete_rate}}
            </div>

          </div>

        </div>
      </div>
    </div>


    <div style="height: 200px;"></div>



</template>


<script setup>

import {
  useGetPlanVideoCompleteListApi,
  useGetPlanVideoListApi, useGetPlanVideoSettingListApi,
} from "~/apis/student";
 import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio, NTabs, NTabPane} from "naive-ui";
import {useMainStore} from "~/composables/store";

 //加载效果
 const loading = ref(false)
const list = ref([]);
const useStore = useMainStore();
const user = useStore.studentInfo;

onMounted(async () => {
  const {pending, data: info  } = await useGetPlanVideoSettingListApi(user?.id);
  if (info?.value) {
    list.value = info?.value?.list ?? [];
    // console.log('info:'+JSON.stringify(info.value));
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
</style>