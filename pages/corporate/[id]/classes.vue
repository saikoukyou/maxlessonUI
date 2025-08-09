<template>
	<div class="col gap-xl">
    <n-card title="受講状況の確認" style="margin-bottom: 16px">
		<div class="list">
			<div class="tr bold tr tablehou">
				<span class="th">番号</span>
				<span class="th">受講者</span>
				<span class="th">有効期限</span>
				<span class="th">レッスン総回数 コマ 25 分</span>
				<span class="th">直近のご利用</span>
				<span class="th">受講証明</span>
			</div>
			<div class="tr item" v-for="(sitem,sindex) in studentList">
				<div class="td bold">
					{{sindex+1}}
					<PersonOutline class="svg" />
				</div>
				<div class="td">
					<p>{{sitem.employee_number}}</p>
					<p></p>
					<p><b>{{sitem.last_name}}　{{sitem.first_name}}</b></p>
				</div>
				<div class="td">
					<p>{{sitem.days}}日</p>
					<p>開始から {{sitem.use_days}} 日経過中</p>
					<p class="bordered"><span>時間経過率</span><span>{{sitem.use_day_rate}}</span></p>
				</div>
				<div class="td">
					<p>{{sitem.number_of_lessons}} 回</p>
					<p>うち {{sitem.number_of_lessons_taken}} 回受講済み</p>
					<p class="bordered"><span>コンプリート率</span><span>{{sitem.lesson_attendance_rate}}</span></p>
				</div>
				<div class="td">
					<div>
						<p>ログイン</p>
						<p>{{sitem.login_last_time}}</p>
					</div>
					<div>
						<p>ご受講</p>
						<p>{{sitem.lesson_last_time}}</p>
					</div>
				</div>
				<div class="td">
					<p class="bordered" @click="downloadAttendance(sitem.id)">
						<span>ダウンロード</span>
					</p>
          <nuxt-link :to="'/corporate/centre/detail?id='+sitem.id">
            <p class="bordered">
              <span>詳細</span>
            </p>
          </nuxt-link>
				</div>
			</div>

<!--			<div class="tr item">-->
<!--				<div class="td bold">-->
<!--					2-->
<!--					<PersonOutline class="svg" />-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p>N20102</p>-->
<!--					<p>R&D センター品質管理 2 課</p>-->
<!--					<p><b>田中　太郎</b></p>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p>180日</p>-->
<!--					<p>開始から 30 日経過中</p>-->
<!--					<p class="bordered"><span>時間経過率</span><span>18.3%</span></p>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p>36 回</p>-->
<!--					<p>うち 12 回受講済み</p>-->
<!--					<p class="bordered"><span>コンプリート率</span><span>33.3%</span></p>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<div>-->
<!--						<p>ログイン</p>-->
<!--						<p>2023 年 12 月 12 日</p>-->
<!--					</div>-->
<!--					<div>-->
<!--						<p>ご受講</p>-->
<!--						<p>2023 年 12 月 12 日</p>-->
<!--					</div>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p class="bordered">-->
<!--						<span>ダウンロード</span>-->
<!--					</p>-->
<!--				</div>-->
<!--			</div>-->
		</div>
    </n-card>
	</div>
</template>
<script setup>
import { PersonOutline } from '@vicons/ionicons5';
import {useAttendanceLastListApi, useDownloadAttendanceApi} from "~/apis/corporate";
import {NCard} from "naive-ui";

let studentList = ref([]);
const route = useRoute();
let plan_id = ref('');

if (route && route?.query?.plan_id) {
  plan_id.value = route.query.plan_id;
}

const getList = async () => {
  let { data: data } = await useAttendanceLastListApi(plan_id.value);
  if (data?.value) {
    studentList.value = data?.value?.students ?? [];
  }
}
onMounted(() => {
  getList();
})

async function downloadAttendance(student_id) {
  await useDownloadAttendanceApi(plan_id.value,student_id);
}


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
		height: 90px;
	}

	.tr {
		display: grid;
		grid-template-columns: 0.8fr 3fr 2fr 2fr 2fr 1.5fr;

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
				width: 60px;
			}
		}

		.td:nth-of-type(1),
		.td:nth-of-type(2) {
			background-color: var(--color-third);
		}

		.bordered {
			border: 1px solid var(--border-color-black);
			border-radius: 10px;
			width: fit-content;
			padding: 0 10px;
			display: flex;
			gap: 10px;
			font-size: 10px;
		}
	}
}
</style>