<template>
    <div style="height: 90px; width: 100%;"></div>

    <div class="netchina_contents">

      <div style="height: 40px;"></div>

      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/video"><li class="">所有视频课</li></nuxt-link>
        <nuxt-link to="/mypage/videoComplete"><li class="selected">我的学习任务</li></nuxt-link>
        <nuxt-link to="/mypage/videoSetting"><li class="">视频培训记录</li></nuxt-link>
      </ul>
      <div class="userInfoContents">
        <div style="height:200px;">
          我的学习任务({{setting.video_begin_date}}-{{setting.video_end_date}})
          <div v-if="setting.video_target_type == 1">
            {{setting.video_target_volume}}册
          </div>
          <div v-else>
            {{setting.video_target_class}}课
          </div>
          <div>已完成{{setting.video_complete_class_num}}课</div>
          <div>目标完成数量：{{setting.video_target_base}}</div>
          <div>实际完成数量：{{setting.video_complete_num}}</div>
          <div>每课问题答对90%为完成。</div>
          <div>否则需重新回答。</div>
        </div>
        <div v-for="(item,key) in list">
          <div>
            {{item.name}}(共计{{item.video_total}}课 已完成{{item.video_complete}} 完成率{{item.video_complete_rate}})
            <div v-for="(vitem) in item.childs">
              <nuxt-link to="">
                <li class="">
                  {{vitem.title}}
                  <div>
                    {{vitem.question_correct}}/{{vitem.question_total}}
                  </div>
                  <div v-if="vitem.is_complete === 1">
                    已通过
                  </div>
                  <div v-else>
                    未通过
                  </div>
                </li>
              </nuxt-link>
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
  useGetPlanVideoListApi,
} from "~/apis/student";
 import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio, NTabs, NTabPane} from "naive-ui";
import {useMainStore} from "~/composables/store";

 //加载效果
const loading = ref(false)
const list = ref([]);
const setting = ref([]);
const total = ref(0);
const complete = ref(0);
const useStore = useMainStore();
const user = useStore.studentInfo;

onMounted(async () => {
  const {pending, data: info  } = await useGetPlanVideoCompleteListApi(user?.id);
  if (info?.value) {
    list.value = info?.value?.list ?? [];
    total.value = info?.value?.total_num ?? 0;
    complete.value = info?.value?.complete_num ?? 0;
    setting.value = info?.value?.setting ?? 0;
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