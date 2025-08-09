<template>
  <div v-if="popShow">
    <div class="plan_modal_contents_bg"></div>
    <div class="plan_pop_div">
      <span @click="closeModal" class="modal_close_btn">閉じる</span>
      <div style="line-height: 1em;">
        <ul>
          <li class="li-text" v-if="studentInfo.monthly_plan_name">
            <p>月額プラン：{{studentInfo.monthly_plan_name}}</p>
            <p v-if="studentInfo.monthly_plan_type == 0">残りレッスン数：{{studentInfo.lesson_stock}}</p>
            <p v-else>残りポイント数：{{studentInfo.lesson_integral_stock}}</p>
            <p>有効期限：{{studentInfo.monthly_plan_validity_period_end_day}}</p>
          </li>
          <li class="li-btn">
            <n-button class="button_confirm" @click="useMonthlyPlan()"><span>月額プランを利用する</span></n-button>
          </li>
        </ul>
      </div>
      <hr class="plan-hr" />
      <div style="line-height: 1em;" v-if="studentInfo.ticket_plan_name">
        <ul>
          <li class="li-text">
            <p>チケットプラン：{{studentInfo.ticket_plan_name}}</p>
            <p v-if="studentInfo.ticket_plan_type == 0">残りチケット数：{{studentInfo.ticket_stock}}枚</p>
            <p v-else>残りポイント数：{{studentInfo.ticket_integral_stock}}枚</p>
            <p>有効期限：{{studentInfo.ticket_plan_validity_period_end_day}}</p>
          </li>
          <li class="li-btn">
            <n-button class="button_confirm" @click="useTicketPlan()"><span>チケットプランを利用する</span></n-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  setup (props, context) {-->
<!--    const handleChange = (event) => {-->
<!--      context.emit('changeEvent');-->
<!--    }-->
<!--    return {-->
<!--      handleChange-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<script setup>
import {useCheckPlanApi, useShowPayPlansApi, useStudentMonthlyPlanApi, useStudentTicketPlanApi} from "~/apis/student";
import {createDiscreteApi} from "naive-ui";

definePageMeta({
  middleware: 'auth',
// layout: 'mypage'
});

const props = defineProps({
  parameters: {
    type: [String],
    default: ''
  },
  learnType: {
    type: [String],
    default: ''
  }
});

const emit = defineEmits(['changeEvent','reloadData']);

let studentInfo = ref({});
let popShow = ref(false);
let loading = ref(false);

let { data: info } = await useCheckPlanApi(props.parameters,props.learnType);
// console.log('info:'+JSON.stringify(info));
if (info.value.err === true) {
  if (info.value.err_code == "please_select_reserved_methods") {
    showReservedMethods();
  } else if (info.value.err_code == "not_found_plan") {
    const { message } = createDiscreteApi(["message"]);
    message.error('レッスンをご購入されていません。');
    navigateTo('/plan',{ replace: true });
  } else if (info.value.err_code == "not_found_teacher") {
    const { message } = createDiscreteApi(["message"]);
    message.error('先生は存在しません。先生をもう一度選んでください。');
    emit("reloadData");
    emit("changeEvent");
    // location.reload();
  } else if (info.value.err_code == "not_talk_teacher") {
    const { message } = createDiscreteApi(["message"]);
    message.error('この先生は会話の先生ではありません。先生をもう一度選び直してください。');
    emit("reloadData");
    emit("changeEvent");
    // location.reload();
  } else {
    emit("changeEvent");
  }
} else {

  navigateTo('/mypage/confirm',{ replace: true });
}

async function showReservedMethods() {
  let { data: showinfo } = await useShowPayPlansApi(props.parameters);
  studentInfo.value = showinfo?.value?.student_info;
  popShow.value = true;
}
async function useMonthlyPlan() {
  loading.value = true;
  let { data: monthInfo } = await useStudentMonthlyPlanApi(props.parameters);
  if (monthInfo.value.err === true) {
    loading.value = false;
    await showReservedMethods();
  } else {
    // console.log('zoudaozhelemonth');
    loading.value = false;
    navigateTo('/mypage/confirm',{ replace: true });
  }
}
async function useTicketPlan() {
  let { data: ticketInfo } = await useStudentTicketPlanApi(props.parameters);
  if (ticketInfo.value.err === true) {
    loading.value = false;
    await showReservedMethods();
  } else {
    // console.log('zoudaozheleticket');
    loading.value = false;
    navigateTo('/mypage/confirm',{ replace: true });
  }
}

function closeModal() {
  popShow.value = false;
  emit("changeEvent");
}

</script>
<style lang="scss" scoped>
/* モーダルウィンドウの背景要素 */
.plan_modal_contents_bg {
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .56);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
}
.plan_pop_div {
  background: white;
  padding: 3vh 7vh;
  border-radius: 8px;
  -ms-box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
  box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
  position: fixed; /* 修改为 fixed */
  top: 50%;
  left: 50%;
  width: 800px;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.modal_close_btn {
  position: absolute;
  right: 8px;
  top: 0;
}
.li-text {
  display: inline-block;
  width: 50%;
  font-size: 0.9rem;
}
.li-btn {
  display: inline-block;
  text-align: right;
  vertical-align: bottom;
  width: 50%;
}
.plan-hr {
  border-bottom: 1px solid #C6C6C6;
  margin:10px 0;
}
.button_confirm{
  cursor: pointer;
  font-size: 1.1em;
}
@media screen and (max-width: 520px) {
  .li-text{
    width: 100%;
    font-size: 1rem;
    text-align: center;
  }
  .plan_pop_div {
    width: 90%; /* 手机端缩小宽度 */
    padding: 5vh 10vw 3vw 10vw; /* 调整内边距 */
    top: 50%; /* 固定在视口中间 */
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .li-btn{
    width: 100%;
  }
}
</style>