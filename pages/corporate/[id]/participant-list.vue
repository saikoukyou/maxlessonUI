<template>

<!--		<h1 class="bold">受講者の名簿一覧</h1>-->
    <n-card title="受講者の名簿一覧" style="margin-bottom: 16px">
      <n-tabs type="line" animated>
        <n-tab-pane name="person" tab="自己啓発">
          <div class="bg-white-yellow padding-xl font-size-s border-radius-s col gap-l">
            <div class="selectBlock">
            <div class="titlePlan row items-center gap">
              <p>学習プラン</p>
              <select id="time_select" class="input" v-model="form.plan_id">
                <option value="null">お選びください</option>
                <option v-for="(pitem, pindex) in planList" :value="pindex">
                  {{pitem}}
                </option>
              </select>
            </div>
            <div class="titlePlan2 row items-center gap">
              <p>ステ-タス</p>
              <select id="expired_select" class="input" v-model="form.is_expired">
                <option value="null">お選びください</option>
                <option v-for="(eitem, eindex) in expiredOptions" :value="eitem.value">
                  {{eitem.label}}
                </option>
              </select>
<!--              <n-select name="is_expired" id="is_expired" v-model:value="form.is_expired" :options="expiredOptions" placeholder="">-->
<!--              </n-select>-->
            </div>
            </div>

            <div class="selectBlock">
            <div class="titlePlan row items-center gap">
              <p>受講者名</p>
              <input type="text" class="input" v-model="form.name" placeholder="お名前" />
            </div>
            <div class="titlePlan2 row items-center gap">
              <p>メ-ルアドレス</p>
              <input type="text" class="input" v-model="form.email" placeholder="メ-ルアドレス" />
            </div>
            </div>

            <div class="titlePlan row items-center gap">
              <p>携带番号</p>
              <input type="text" class="input" v-model="form.tel" placeholder="携带番号" />
            </div>

            <div class="row items-center justify-center">
              <div class="button-submit" @click="searchList">検索
              </div>
            </div>
          </div>

          <div class="list">
            <div class="tr bold tablehou">
              <span class="th">番号</span>
              <span class="th">氏名</span>
              <span class="th">メ-ルアドレス</span>
              <span class="th">携带番号</span>
              <span class="th">受講プラン</span>
              <span class="th">ステータス</span>
              <span class="th">受講証明</span>
            </div>
            <div class="tr item" v-for="(item,index) in list">
              <div class="td bold">
                {{index+1}}
                <PersonOutline class="svg" />
              </div>
              <div class="td">
                <p><b>{{item.last_name}}　{{item.first_name}}</b></p>
              </div>
              <div class="td">
                <p>{{item.email}}</p>
              </div>
              <div class="td">
                <p>{{item.tel}}</p>
              </div>
              <div class="td">
                <p>{{item.plan_name}}</p>
              </div>
              <div class="td">
                <p>{{item.status}}</p>
              </div>
              <div class="td">
                <p class="bordered" @click="downloadAttendance(item.monthly_plan_id,item.student_id)">
                  <span>ダウンロード</span>
                </p>
              </div>
            </div>

          </div>
        </n-tab-pane>
        <n-tab-pane name="business" tab="法人研修">
          <div class="bg-white-yellow padding-xl font-size-s border-radius-s col gap-l">
<!--            <div class="row items-center gap">-->
<!--              <p>キーワード</p>-->
<!--              <input type="text" class="input" v-model="form.keyword" placeholder="お名前、社員番号、メールアドレス" />-->
<!--            </div>-->

            <div class="selectBlock">
            <div class="titlePlan row items-center gap">
              <p>学習プラン</p>
              <select id="time_select" class="input" v-model="form.plan_id">
                <option value="null">お選びください</option>
                <option v-for="(pitem, pindex) in planList" :value="pindex">
                  {{pitem}}
                </option>
              </select>
            </div>
            <div class="titlePlan2 row items-center gap">
              <p>ステ-タス</p>
              <select id="expired_select" class="input" v-model="form.is_expired">
                <option value="null">お選びください</option>
                <option v-for="(eitem, eindex) in expiredOptions" :value="eitem.value">
                  {{eitem.label}}
                </option>
              </select>
            </div>
            </div>

            <div class="selectBlock">
            <div class="titlePlan row items-center gap">
              <p>受講者名</p>
              <input type="text" class="input" v-model="form.name" placeholder="お名前" />
            </div>
            <div class="titlePlan2 row items-center gap">
              <p>メ-ルアドレス</p>
              <input type="text" class="input" v-model="form.email" placeholder="メ-ルアドレス" />
            </div>
            </div>

            <div class="titlePlan row items-center gap">
              <p>携带番号</p>
              <input type="text" class="input" v-model="form.tel" placeholder="携带番号" />
            </div>

            <div class="row items-center justify-center">
              <div class="button-submit" @click="searchBusinessList">検索
              </div>
            </div>
          </div>

          <div class="list">
            <div class="tr bold tablehou" style="grid-template-columns: 2fr 2fr 1fr 2fr 2fr 2fr 2fr 1fr;">
              <span class="th">学生</span>
              <span class="th">受講プラン</span>
              <span class="th">催促メ-ル</span>
              <span class="th">レッスン予約状況</span>
              <span class="th">動画学習進捗状況</span>
              <span class="th">ステータス</span>
              <span class="th">受講証明</span>
              <span class="th">詳細</span>
            </div>
            <div class="tr item" v-for="(item,index) in blist" style="grid-template-columns: 2fr 2fr 1fr 2fr 2fr 2fr 2fr 1fr;">
              <div class="td bold">
                {{index+1}}
<!--                <NuxtLink :to="`/corporate/center/participant-info?id=${item.id}`">-->
                  <p><b>{{item.last_name}}　{{item.first_name}}</b></p>
<!--                </NuxtLink>-->
              </div>
              <div class="td">
                <p>{{item.plan_name}}</p>
                <p>{{item.video_name}}</p>
              </div>
              <div class="td">
                <p><n-switch v-model:value="item.speed_alram_email" unchecked-value="0" checked-value="1" @update:value="changeAlaram(item.speed_alram_email,item.id)" /></p>
              </div>
              <div class="td">
                <p>{{item.lesson_info}}</p>
                <p>{{item.lesson_rate}}</p>
              </div>
              <div class="td">
                <span v-if="item.video_info">
                  <p>{{item.video_info}}</p>
                  <p>{{item.video_rate}}</p>
                </span>
                <span v-else>
                  対象外
                </span>
              </div>
              <div class="td">
                <p>{{item.status}}</p>
              </div>
              <div class="td">
                <p class="bordered" @click="downloadAttendance(item.monthly_plan_id,item.student_id)">
                  <span>ダウンロード</span>
                </p>
              </div>
              <div class="td">
                <nuxt-link :to="`/corporate/center/participant-detail?id=${item.id}`">
                  詳細
                </nuxt-link>
              </div>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>


</template>
<script setup>
import { ref } from 'vue'
import { PersonOutline } from '@vicons/ionicons5'
import {useChangeSpeedAlarmApi, useDownloadAttendanceApi, useMemberListApi} from "~/apis/corporate";
import {NCard, NTabs, NTabPane, NSelect, NSwitch, createDiscreteApi} from "naive-ui";
const form = reactive({
	// keyword: '',
  plan_id: null,
  is_expired: null,
  name: '',
  email: '',
  tel: '',
  pmethod: 0
})
let list = ref([]);
let blist = ref([]);
let planList = ref([]);
let bplanList = ref([]);
let expiredOptions = [{label: '有効',value: 0},{label: '期限切れ',value: 1}]

const getList = async () => {
  if (form.plan_id == 'null') {
    form.plan_id = '';
  }
  if (form.is_expired == 'null') {
    form.is_expired = '';
  }
  // console.log('form:'+JSON.stringify(form));
  const { data:mlist } = await useMemberListApi(form);
  if (mlist?.value) {
    list.value = mlist?.value?.person_plans ?? [];
    blist.value = mlist?.value?.business_plans ?? [];
    planList.value = mlist?.value?.plans ?? [];
    bplanList.value = mlist?.value?.bplans ?? [];
  }
}

onMounted(() => {
  getList();
})

async function downloadAttendance(plan_id,student_id) {
  await useDownloadAttendanceApi(plan_id,student_id);
}

function searchList() {
  form.pmethod = 0;
  getList();
}
function searchBusinessList() {
  form.pmethod = 1;
  getList();
}
function changeAlaram(value,student_id) {
  const { data:info } = useChangeSpeedAlarmApi(value,student_id);
  if (info?.value && info?.value?.err == false) {
    const { message } = createDiscreteApi(["message"])
    message.success(info?.value?.err_msg)
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
		height: 50px;
	}

	.tr {
		display: grid;
		grid-template-columns: 1fr 2fr 2fr 2fr 2fr 1fr 2fr;

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

.selectBlock{
  width: 100%;
}

.titlePlan{
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
  width: 50%;
}
.titlePlan2{
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
  width: 50%;
}
.titlePlan p{
  width: 80px;
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
}
.titlePlan2 p{
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
}
.input{
  width: 70%;
  background-color: white;
}
.button-submit{
  width: 200px;
  text-align: center;
  font-size: 14px;
}
.list{
  gap: 1;
}
</style>