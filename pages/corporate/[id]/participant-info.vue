<template>
	<div class="col gap-xl">
    <n-card v-if="planInfo && planInfo.monthly_plan_id" title="月套餐">
      {{planInfo.monthly_plan_name}}
    </n-card>
    <n-card v-if="planInfo && planInfo.ticket_plan_id" title="券套餐">
      {{planInfo.ticket_plan_name}}
    </n-card>
    <n-card v-if="videoInfo && videoInfo.total_num"  title="视频培训套餐">
      <div v-if="setting">
        目标进度
        {{setting.video_target_volume}}册共{{setting.video_target_class}}课
        有效期{{setting.video_end_date}}之前
      </div>
      <div>
        实际进度
        {{videoInfo.complete_num}}课÷总计{{videoInfo.total_num}}课
      </div>
      <div>
        每册进度
        <div v-for="(item) in videoInfo.list">
          {{item.name}}:{{item.video_complete}}/{{item.video_total}}
        </div>
      </div>
    </n-card>
	</div>
</template>
<script setup>
import { ref } from 'vue'
import { PersonOutline } from '@vicons/ionicons5'
import {useBusinessMemberPlanInfoApi, useDownloadAttendanceApi, useMemberListApi} from "~/apis/corporate";
import {NCard,NTabs,NTabPane} from "naive-ui";
let list = ref([]);
// let total = ref(0);
// let complete = ref(0);
let planInfo = ref([]);
let videoInfo = ref([]);
let setting = ref([]);
// let id = ref(0);
const route = useRoute();

const getInfo = async () => {
  if (route && route?.query?.id) {
    const { data:vinfo } = await useBusinessMemberPlanInfoApi(route?.query?.id);
    if (vinfo?.value) {
      console.log('vinfo?.value:'+JSON.stringify(vinfo?.value));
      planInfo.value = vinfo.value?.planInfo ?? [];
      videoInfo.value = vinfo.value?.videoInfo ?? [];
      setting.value = vinfo.value?.setting ?? [];
      // total.value = vinfo?.value?.info?.total_num ?? 0;
      // complete.value = vinfo?.value?.info?.complete_num ?? 0;
    }
  }

}

onMounted(() => {
  getInfo();
})

</script>
<style lang="scss" scoped>
.list {
	font-size: 12px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	p {
		line-height: 18px;
	}

	.item {
		height: 50px;
	}

	.tr {
		display: grid;
		grid-template-columns: 1fr 3fr 5fr 2fr 2fr;

		.td {
			padding: 10px;
			background-color: var(--color-yellow-light);
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 5px;
			position: relative;
			overflow: hidden;

			svg {
				color: #fff;
				position: absolute;
				bottom: -10px;
				width: 50px;
			}
		}

		.td:nth-of-type(1),
		.td:nth-of-type(2) {
			background-color: var(--color-third);
		}

		.bordered {
			// border: 1px solid var(--border-color-black);
			border-radius: 10px;
			width: fit-content;
			padding: 0 10px;
			display: flex;
			gap: 10px;
			font-size: 10px;
			background: var(--color-third);
		}
	}
}
</style>