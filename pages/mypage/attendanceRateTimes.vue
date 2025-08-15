<template>

  <div class="blockW">
    <h5>受講証明の発行</h5>
    <span>ご受講のサイクルが終了しているもののみ表示しております。現在進行中のサイクルは表示されていません。</span>


    <n-card>
      <n-tabs
          class="card-tabs"
          default-value="signin"
          size="large"
          animated
          pane-wrapper-style="margin: 0 -4px"
          pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="サブスクタイプ">
          <table class="pctable">
            <tr class="header-row">
              <th>受講期間</th>
              <th>サブスクタイプ</th>
              <th>受講可能回数</th>
              <th>受講回数</th>
              <th>受講率</th>
              <th>手続き</th>
            </tr>
            <tr v-for="mplan in mplans">
              <td>{{mplan.start_day}}<br>{{mplan.end_day}}</td>
              <td>{{mplan.plan_name}}</td>
              <td>{{mplan.number_of_lessons}}</td>
              <td>{{mplan.number_of_lessons_taken}}</td>
              <td>{{mplan.lesson_attendance_rate}}</td>
              <td class="actionBtn"><a @click="downFile(mplan.id)">ダウンロ-ド</a></td>
            </tr>
          </table>

          <div class="table-container">
            <table v-for="mplan in mplans">
              <tbody>
              <tr>
                <td>受講期間</td>
                <td>{{mplan.start_day}}<br>{{mplan.end_day}}</td>
              </tr>
              <tr>
                <td>サブスクタイプ</td>
                <td>{{mplan.plan_name}}</td>
              </tr>
              <tr>
                <td>受講可能回数</td>
                <td>{{mplan.number_of_lessons}}</td>
              </tr>
              <tr>
                <td>受講回数</td>
                <td>{{mplan.number_of_lessons_taken}}</td>
              </tr>
              <tr>
                <td>受講率</td>
                <td>{{mplan.lesson_attendance_rate}}</td>
              </tr>
              <tr>
                <td>手続き</td>
                <td class="actionBtn"><a @click="downFile(mplan.id)">ダウンロ-ド</a></td>
              </tr>
              </tbody>
            </table>
          </div>


        </n-tab-pane>
        <n-tab-pane name="signup" tab="チケットタイプ">
          <table class="pctable">
            <tr>
              <th>受講期間</th>
              <th>チケットタイプ</th>
              <th>受講可能回数</th>
              <th>受講回数</th>
              <th>受講率</th>
              <th>手続き</th>
            </tr>
            <tr v-for="tplan in tplans">
              <td>{{tplan.start_day}}-{{tplan.end_day}}</td>
              <td>{{tplan.plan_name}}</td>
              <td>{{tplan.number_of_lessons}}</td>
              <td>{{tplan.number_of_lessons_taken}}</td>
              <td>{{tplan.lesson_attendance_rate}}</td>
              <td>ダウンロ-ド</td>
            </tr>
          </table>

          <div class="table-container">
            <table v-for="tplan in tplans">
              <tbody>
              <tr>
                <td>受講期間</td>
                <td>{{tplan.start_day}}<br>{{tplan.end_day}}</td>
              </tr>
              <tr>
                <td>チケットタイプ</td>
                <td>{{tplan.plan_name}}</td>
              </tr>
              <tr>
                <td>受講可能回数</td>
                <td>{{tplan.number_of_lessons}}</td>
              </tr>
              <tr>
                <td>受講回数</td>
                <td>{{tplan.number_of_lessons_taken}}</td>
              </tr>
              <tr>
                <td>受講率</td>
                <td>{{tplan.lesson_attendance_rate}}</td>
              </tr>
              <tr>
                <td>手続き</td>
                <td class="actionBtn"><a @click="downFile(tplan.id)">ダウンロ-ド</a></td>
              </tr>
              </tbody>
            </table>
          </div>



        </n-tab-pane>
      </n-tabs>
    </n-card>
    <div class="HelpBackBtn" @click="goBack">戻る</div>
  </div>

</template>


<script setup>

import {
  useDownloadAttendanceApi, useDownloadAttendanceRateApi,
} from "~/apis/student";
import {createDiscreteApi, NButton, NInput, NModal, NTable, NCard, NTabs, NTabPane} from "naive-ui";
import {useMainStore} from "~/composables/store";

//加载效果
const loading = ref(false)
const list = ref([]);
const useStore = useMainStore();
const user = ref([]);
const { dialog } = createDiscreteApi(["dialog"]);
const mplans = ref([]);
const tplans = ref([]);
// 使用 Vue Router
const router = useRouter();

onMounted(async () => {
  const { pending, data: info3 } = await useDownloadAttendanceApi();
  if (info3?.value) {
    mplans.value = info3.value.mlist ?? [];
    tplans.value = info3.value.tlist ?? [];
  }
});
onMounted(async () => {
  const {pending, data: info3  } = await useDownloadAttendanceApi();
  if (info3?.value) {
    mplans.value = info3.value.mlist ?? [];
    tplans.value = info3.value.tlist ?? [];
  }
});

async function downFile(plan_id) {
  await useDownloadAttendanceRateApi(plan_id);
}
// 返回上一页
function goBack() {
  if (window.history.length > 1) {
    router.go(-1);  // 使用 Vue Router 返回上一页
  } else {
    router.push('/');  // 没有上一页时，跳转到首页或其他指定页面
  }
}
</script>
<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 30%;
}
.n-select {
  width: 30%;
}
.n-card{
  border: 0;
}



.actionBtn{color: #FA8373; text-decoration: underline; font-weight: bold;}

.actionBtn a{cursor: pointer;}

.header-row {color: #fff;background-color: #424242 !important;}

/* 奇數列背景顏色 */
table tr:nth-child(odd) {
  background-color: #F1F1F1;
  min-height: 48px;
}

/* 偶數列背景顏色 */
table tr:nth-child(even) {
  background-color:#F8F8F8;
  min-height: 48px;
}

/* 調整表格的字體顏色和大小 */
th, td {
  padding: 10px;
  min-height: 48px;
  vertical-align: center;
  align-content: center;
  text-align: center;
}

table{width: 100%;}
.netchina_contents{
  margin-top: 40px;
}
.table-container{
  display: none;
}
@media screen and (max-width: 520px) {
  .pctable{
    display: none;
  }
  .table-container{
    display: block;
  }
  table tbody tr td:first-child{
    background-color: #424242;
    color: #FFFFFF;
  }
  .table-container table{
    margin-bottom: 20px;
  }
  ::v-deep(.n-card__content) {
    padding: 0;
  }
}
</style>