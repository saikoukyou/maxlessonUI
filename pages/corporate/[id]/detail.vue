<template>
	<div class="col gap-xl">
		<h1 class="bold">详细</h1>

		<div class="list">
			<div class="tr item">
				<div class="td bold">
          <PersonOutline class="svg" />
				</div>
				<div class="td" style="grid-column-start: 2;grid-column-end: 6;">
					<p class="bold" style="font-size: 18px;">{{studentInfo.last_name}}　{{studentInfo.first_name}}</p>
					<p>（会員番号：{{studentInfo.id}}）</p>
					<p><b></b></p>
				</div>
				<div class="td" style="grid-column-start: 6;grid-column-end: 8;">
					<p>社員番号：{{studentInfo.employee_number}}</p>
				</div>
			</div>
      <div class="tr item">
        <div class="td bold">
          利用中のプラン
        </div>
        <div class="td" style="grid-column-start: 2;grid-column-end: 8;">
          <p>{{studentInfo.monthly_plan_name}}</p>
          <p>{{studentInfo.monthly_plan_validity_period_start_day}}～{{studentInfo.monthly_plan_validity_period_end_day}}</p>
          <p>有効期限：{{studentInfo.validity_term}}日 総回数：{{studentInfo.buy_issued_lesson_num}}回</p>
        </div>
      </div>
      <div class="tr item">
        <div class="td bold">
          ご利用状況
        </div>
        <div class="td">
          <p class="bold">時間経過</p>
          <p class="bold">受講済み回数</p>
        </div>
        <div class="td">
          <p>{{last_record.use_days}}/{{studentInfo.validity_term}}日</p>
          <p>{{last_record.number_of_lessons_taken}}/{{studentInfo.buy_issued_lesson_num}}回</p>
        </div>
        <div class="td">
          <p class="bold">経過率</p>
          <p class="bold">コンプリート率</p>
        </div>
        <div class="td">
          <p>{{last_record.use_day_rate}}</p>
          <p>{{last_record.use_day_rate}}</p>
        </div>
        <div class="td">
          <p class="bold">時間残数</p>
          <p class="bold">レッスン残数</p>
        </div>
        <div class="td">
          <p>{{last_record.days_surplus}}日</p>
          <p>{{last_record.lessons_surplus}}回</p>
        </div>
      </div>
      <div class="tr item">
        <div class="td bold">
          上達状況
        </div>
        <div class="td" style="grid-column-start: 2;grid-column-end: 4;">
          <p class="bold">受講開始前テスト</p>
          <p class="bold">直近のテスト</p>
        </div>
        <div class="td">
          <p v-if="scoreList.length > 0">{{scoreList[0].category_name}}</p>
          <p v-if="scoreList.length > 0">{{scoreList[1].category_name}}</p>
        </div>
        <div class="td">
          <p v-if="scoreList.length > 0">{{scoreList[0].score}}</p>
          <p v-if="scoreList.length > 0">{{scoreList[1].score}}</p>
        </div>
        <div class="td"><p></p></div>
        <div class="td"><p></p></div>
      </div>
      <div class="tr item">
        <div class="td bold">
          直近のご利用
        </div>
        <div class="td" style="grid-column-start: 2;grid-column-end: 4;">
          <p class="bold">直近のログイン 長時間</p>
          <p class="bold">直近のご受講</p>
        </div>
        <div class="td">
          <p>{{studentInfo.login_last_time}}</p>
          <p>{{studentInfo.last_lesson_time}}</p>
        </div>
        <div class="td" style="grid-column-start: 5;grid-column-end: 7;">
          <p>ログインしないときに催促メール</p>
          <p>長時間受講しないときに催促メール</p>
        </div>
        <div class="td">
          <p>
            <n-switch
              checked-value="1"
              unchecked-value="0"
              v-model:value="studentInfo.login_alram_email"
              @update:value="handleChange(studentInfo.student_id,'login_alram_email',studentInfo.login_alram_email)" />
          </p>
          <p>
            <n-switch
              checked-value="1"
              unchecked-value="0"
              v-model:value="studentInfo.lesson_alram_email"
              @update:value="handleChange(studentInfo.student_id,'lesson_alram_email',studentInfo.lesson_alram_email)" />
          </p>
        </div>
        <div class="td"><p></p></div>
      </div>
      <div class="tr item">
        <div class="td bold">
          アカウント情報
        </div>
        <div class="td">
          <p>メールアドレス</p>
          <p>TeamID</p>
          <p>WeChatID</p>
        </div>
        <div class="td" style="grid-column-start: 3;grid-column-end: 5;">
          <p>{{studentInfo.email ?? '--'}}</p>
          <p>{{studentInfo.teams_id ?? '--'}}</p>
          <p>{{studentInfo.wechat ?? '--'}}</p>
        </div>
        <div class="td"><p></p></div>
        <div class="td"><p></p></div>
        <div class="td"><p></p></div>
      </div>
      <div class="tr item">
        <div class="td bold">
          過去の受講暦
        </div>
        <div class="td" style="grid-column-start: 2;grid-column-end: 8;">
          <table>
            <thead>
            <tr>
              <td>受講期間</td><td>受講可能回数</td><td>実際受講回数</td><td>受講率</td>
            </tr>
            </thead>
            <tr v-for="(item,index) in alist">
              <td>{{item.start_day}}～{{item.end_day}}</td>
              <td>{{item.number_of_lessons}}</td>
              <td>{{item.number_of_lessons_taken}}</td>
              <td>{{item.lesson_attendance_rate}}</td>
            </tr>
          </table>
        </div>
      </div>
		</div>
	</div>
</template>
<script setup>
import { PersonOutline } from '@vicons/ionicons5';
import {createDiscreteApi, NSwitch} from "naive-ui";
import {useEmailSwitchApi, useMemberInfoApi} from "~/apis/corporate";

const route = useRoute();
let id = ref('');
let studentInfo = ref([]);
let last_record = ref([]);
let scoreList = ref([]);
let alist = ref([]);

if (route && route?.query?.id) {
  id.value = route.query.id;
}

const getInfo = async () => {
  let { data: data } = await useMemberInfoApi(id.value);
  if (data?.value) {
    studentInfo.value = data?.value?.info ?? [];
    last_record.value = data?.value?.last_record ?? [];
    scoreList.value = data?.value?.score ?? [];
    alist.value = data?.value?.attendance_list ?? [];
  }
}

onMounted(() => {
  getInfo();
})

async function handleChange(id,type,val) {
  let sdata;
  if (type === 'login_alram_email') {
    sdata = {id:id,'login_alram_email':val};
  } else {
    sdata = {id:id,'lesson_alram_email':val};
  }
  let { data: info } = await useEmailSwitchApi(sdata);
  if (info.value !== null && info.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success("保存成功")
  }
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
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

		.td {
			padding: 10px;
			background-color: var(--color-yellow-light);
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 5px;
			position: relative;
			overflow: hidden;
      text-align: center;

      thead {
        height:20px;
        font-weight: bold;
      }
      td {
        padding: 5px;
      }
			svg {
				color: #fff;
				position: absolute;
				bottom: -10px;
				width: 60px;
			}
		}

		.td:nth-of-type(1) {
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