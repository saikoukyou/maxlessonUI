<template>
    <div class="netchina_contents">

      <div class="userInfoContents blockW">
        <h5>領収書の発行</h5>
        <span class="des">
          領収書の自動発行はクレジットカード支払いのお客様のみが対象となります。<br>
          それ以外の方法でお支払いされたお客様は<NuxtLink class="actionBtn" to="/mypage/question">こちら</NuxtLink>よりお問い合わせください。<br>
        </span>
          <n-table class="pctable" :single-line="false">
            <thead>
            <tr>
              <th>決済日</th>
              <th>プラン名</th>
              <th>区分</th>
              <th>金額（税込）</th>
              <th>手続き</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,key) in list">
              <td>{{item.bill_day}}</td>
              <td>{{item.plan_name}}</td>
              <td>{{item.flag_text}}</td>
              <td>{{ Math.floor(item.bill_num) }}</td>
              <td>
                <div v-if="item.down_num == 2"><span class="bill-font" @click="showBill(key)">発行する</span></div>
                <div v-else-if="item.down_num == 1"><span>発行済み</span> | <span class="bill-font" @click="showBill(key)">再発行する</span></div>
                <div v-else><span>発行済み</span> | <span>発行済み</span></div>
              </td>
            </tr>
            </tbody>
          </n-table>



        <div class="mtable">
          <n-table :single-line="false" v-for="(item,key) in list">
            <tbody>
            <tr>
              <td>決済日</td>
              <td>{{item.bill_day}}</td>
            </tr>
            <tr>
              <td>プラン名</td>
              <td>{{item.plan_name}}</td>
            </tr>
            <tr>
              <td>区分</td>
              <td>{{item.flag_text}}</td>
            </tr>
            <tr>
              <td>金額（税込）</td>
              <td>{{ Math.floor(item.bill_num) }}</td>
            </tr>
            <tr>
              <td>手続き</td>
              <td>
                <div v-if="item.down_num == 2"><span class="bill-font" @click="showBill(key)">発行する</span></div>
                <div v-else-if="item.down_num == 1"><span>発行済み</span> | <span class="bill-font" @click="showBill(key)">再発行する</span></div>
                <div v-else><span>発行済み</span> | <span>発行済み</span></div>
              </td>
            </tr>
            </tbody>
          </n-table>
        </div>


        <div class="HelpBackBtn" @click="goBack">戻る</div>
      </div>
    </div>


  <n-modal
      v-model:show="show"
      preset="dialog"
      :style="bodyStyle"
      title=""
      size="huge"
      :bordered="false"
      :segmented="segmented"
      positive-text="発行する"
      negative-text="前に戻る"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
  >
    <n-table :bordered="true">
      <tbody>
      <tr>
        <td>発行日</td>
        <td>{{today}}</td>
      </tr>
      <tr>
        <td>宛名</td>
        <td><n-input name="sname" v-model:value="studentName" placeholder="30文字まで"></n-input></td>
      </tr>
      <tr>
        <td>税込金額</td>
        <td>{{ Math.floor(list[selectedIndex].bill_num) }}</td>
      </tr>
      <tr>
        <td>但し書き</td>
        <td>クレジットカードでお支払い<br>
          中国語研修費用　{{list[selectedIndex].bill_day}}のお支払い分</td>
      </tr>
      </tbody>
    </n-table>
    <template #footer>

    </template>
  </n-modal>

  <n-modal
      v-model:show="dshow"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title=""
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    領収書のPDF版をダウンロードしました。
    お客様のログインメールアドレス「{{mail}}」にも転送しております。
    ご確認ください。
    <template #footer>
      <n-button @click="goBack">マイページに戻る</n-button>
    </template>
  </n-modal>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  useBillListApi, useDownloadBillApi,
  useGetPlanVideoListApi,
} from "~/apis/student";
import {
  createDiscreteApi,
  NButton,
  NTable,
  NInput,
  NModal
} from "naive-ui";
import { formatDate } from "~/composables/useUtil";
import { useMainStore } from "~/composables/store";

// 加载效果
const loading = ref(false);
const list = ref([]);
const { dialog } = createDiscreteApi(["dialog"]);
let show = ref(false);
let bodyStyle = {
  width: '600px'
};
let segmented = {
  content: 'soft',
  footer: 'soft'
};
let selectedIndex = ref(0);
let studentName = ref('');
let mail = ref('');
let dshow = ref(false);
const useStore = useMainStore();
const user = useStore.studentInfo;
let today = ref(formatDate(new Date()));
const router = useRouter();  // 引入 Vue Router 对象

const getBills = async () => {
  const { pending, data: info  } = await useBillListApi(user?.id ?? 0);
  if (info?.value) {
    list.value = info?.value?.list ?? [];
    // console.log('info:'+JSON.stringify(info.value));
  }
}

onMounted(() => {
  getBills();
})

const showBill = (key) => {
  selectedIndex.value = key;
  show.value = true;
}

// 提交
async function onPositiveClick () {
  // console.log('studentName:' + studentName?.value);
  if (!studentName?.value) {
    const { message } = createDiscreteApi(["message"]);
    message.error("宛名を入力してください");
    return false;
  }
  // 请求后台下载并发送邮件，弹框提示
  await useDownloadBillApi({ id: user?.id ?? 0, bid: list.value[selectedIndex.value].id, name: studentName.value });

  mail.value = list.value[selectedIndex.value].receive_email;
  show.value = false;
  dshow.value = true;
  getBills();
}

// 返回
function onNegativeClick () {
  show.value = false;
}

function goBack() {
  // 回到前一页
  if (window.history.length > 1) {
    router.go(-1);  // 如果使用 Vue Router
  } else {
    router.push('/');  // 如果没有前一页，则跳转到首页或其他页面
  }
}
</script>

<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 70%;
}
.n-select {
  width: 30%;
}
.bill-font {
  color: var(--pink-dark);
  cursor: pointer;
}


.n-table{margin: 20px 0;}

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

.actionBtn{
  color: var(--pink-dark);
  text-decoration: underline;
  font-weight: bold;
}

.mtable{
  display: none;
}
.n-card__footer{
  margin: auto;
  text-align: center;
}
.n-button{
  margin: auto !important;
  text-align: center;
  padding: 4% 8%;
  border-radius: 6px;
  --n-border:0 !important;
  font-size: 15px;
}
.n-base-wave{
  margin: auto;
  position: relative;
}

@media screen and (max-width: 520px) {
  .pctable{
    display: none;
  }
  .mtable{
    display: block;
  }
  table tbody tr td:first-child{
    background-color: #F4F4F4;
  }
}

</style>

<style>
  .n-card.n-card--footer-segmented > .n-card__footer:not(:first-child), .n-card.n-card--footer-soft-segmented > .n-card__footer:not(:first-child){
    text-align: center;
  }
</style>