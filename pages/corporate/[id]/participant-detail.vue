<template>
	<div class="col gap-xl">
    <n-card v-if="info" title="学生信息">
      <n-table :bordered="true">
        <tr>
          <td>学生ID</td>
          <td>{{info.id}}</td>
        </tr>
        <tr>
          <td>学生名</td>
          <td>{{info.last_name}}{{info.first_name}}</td>
        </tr>
        <tr>
          <td>部署名</td>
          <td>{{info.corporate_name}}</td>
        </tr>
        <tr>
          <td>電話番号</td>
          <td>{{info.tel}}</td>
        </tr>
        <tr>
          <td>メールアドレス（ログインID）</td>
          <td>{{info.email}}</td>
        </tr>
<!--        <tr>-->
<!--          <td>SkypeID</td>-->
<!--          <td>{{info.skype_id}}</td>-->
<!--        </tr>-->
        <tr>
          <td>TeamsID</td>
          <td>{{info.teams_id}}</td>
        </tr>
        <tr>
          <td>WeChatID</td>
          <td>{{info.wechat}}</td>
        </tr>
        <tr>
          <td>催促メールの利用</td>
          <td>
            <span v-if="info.speed_alram_email == 0">ON</span>
            <span v-else>OFF</span>
          </td>
        </tr>
      </n-table>
    </n-card>
    <n-card title="受講中のプラン">
      <n-table :bordered="true">
        <tr>
          <th>期間</th>
          <th>プラン名</th>
          <th>レッスン回数</th>
          <th>受講済み回数</th>
          <th>受講率</th>
        </tr>
        <tr v-if="planInfo.length !== 0" >
          <td>{{info.monthly_plan_validity_period_start_day}}～{{info.monthly_plan_validity_period_end_day}}</td>
          <td>{{info.monthly_plan_name}}</td>
          <td>{{planInfo.number_of_lessons}}</td>
          <td>{{planInfo.number_of_lessons_taken}}</td>
          <td>{{planInfo.lesson_attendance_rate}}</td>
        </tr>
        <tr v-if="tplanInfo.length !== 0" >
          <td>{{info.ticket_plan_validity_period_start_day}}～{{info.ticket_plan_validity_period_end_day}}</td>
          <td>{{info.ticket_plan_name}}</td>
          <td>{{tplanInfo.number_of_lessons}}</td>
          <td>{{tplanInfo.number_of_lessons_taken}}</td>
          <td>{{tplanInfo.lesson_attendance_rate}}</td>
        </tr>
      </n-table>
    </n-card>
    <n-card title="過去の受講プラン利用履歴">
      <n-table :bordered="true">
        <tr>
          <th>期間</th>
          <th>プラン名</th>
          <th>レッスン回数</th>
          <th>受講済み回数</th>
          <th>受講率</th>
        </tr>
        <tr v-for="attendance in attendanceList">
          <td>{{attendance.start_day}}～{{attendance.end_day}}</td>
          <td>{{attendance.plan_name}}</td>
          <td>{{attendance.number_of_lessons}}</td>
          <td>{{attendance.number_of_lessons_taken}}</td>
          <td>{{attendance.lesson_attendance_rate}}</td>
        </tr>
      </n-table>
    </n-card>
    <n-card v-if="setting.length !== 0" title="利用中の動画研修プラン">
      <div>
        <n-table :bordered="true">
          <tr>
            <th>期間</th>
            <th>対象動画本数</th>
            <th>受講済み数</th>
            <th>目標受講数(率)</th>
            <th>実際受講率</th>
            <th>達成状況</th>
          </tr>
          <tr v-if="videoInfo.length !== 0">
            <td>{{setting.video_begin_date}}～{{setting.video_end_date}}</td>
            <td>{{setting.video_target_base}}</td>
            <td>{{videoInfo.video_complete_num}}</td>
            <td>{{setting.video_target_base}}({{setting.target_complete_rate}}%)</td>
            <td>{{videoInfo.video_complete_rate}}%</td>
            <td><span v-if="videoInfo.is_complete == 1">達成済み</span><span v-else>未達成</span></td>
          </tr>
        </n-table>
      </div>
    </n-card>
    <n-card v-if="setting.length !== 0"  title="過去の動画研修プラン利用履歴">
      <n-table :bordered="true">
        <tr>
          <th>期間</th>
          <th>対象動画本数</th>
          <th>受講済み数</th>
          <th>目標受講数(率)</th>
          <th>実際受講率</th>
          <th>達成状況</th>
        </tr>
        <tr v-for="video in videoList">
          <td>{{video.video_begin_date}}～{{video.video_end_date}}</td>
          <td>{{video.video_target_base}}</td>
          <td>{{video.video_complete_num}}</td>
          <td>{{video.video_target_base}}({{video.target_complete_rate}}%)</td>
          <td>{{video.video_complete_rate}}%</td>
          <td><span v-if="video.is_complete == 1">達成済み</span><span v-else>未達成</span></td>
        </tr>
      </n-table>
    </n-card>
	</div>
</template>
<script setup>
import { ref } from 'vue'
import { PersonOutline } from '@vicons/ionicons5'
import {useBusinessMemberPlanInfoApi, useDownloadAttendanceApi, useMemberListApi} from "~/apis/corporate";
import {NCard,NTabs,NTabPane,NTable} from "naive-ui";
let list = ref([]);
// let total = ref(0);
// let complete = ref(0);
let info = ref([]);
let planInfo = ref([]);
let tplanInfo = ref([]);
let videoInfo = ref([]);
let videoList = ref([]);
let setting = ref([]);
let attendanceList = ref([]);
// let id = ref(0);
const route = useRoute();

const getInfo = async () => {
  if (route && route?.query?.id) {
    const { data:vinfo } = await useBusinessMemberPlanInfoApi(route?.query?.id);
    if (vinfo?.value) {
      console.log('vinfo?.value:'+JSON.stringify(vinfo?.value));
      info.value = vinfo.value?.info ?? [];
      planInfo.value = vinfo.value?.monthly_plan ?? [];
      tplanInfo.value = vinfo.value?.ticket_plan ?? [];
      videoInfo.value = vinfo.value?.videoInfo ?? [];
      videoList.value = vinfo.value?.videoList ?? [];
      attendanceList.value = vinfo.value?.old_attendances ?? [];
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