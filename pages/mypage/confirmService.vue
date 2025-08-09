<template>
  <div class="mypageTemplate">

    <div style="height: 40px;"></div>

    <p class="lessonConfirmAttention ">▼レッスン予約はまだ確定していません。</p>


    <div class="lessonConfirm">
      <ul class="date">
        <li>レッスン予約はまだ確定していません。</li>
        <li>{{start_time}}〜{{end_time}}</li>
        <li>（UTC+9 日本時間）</li>
      </ul>
    </div>

      <div class="lessonConfirmContents">
        <div class="selectdiv block">
          <p>予約を確定するため以下の情報を記入ください</p>
          <div class="content">
            <div class="left">
              <p class="subtitle">受講用ソフト</p>
              <div class="selectDivInner">
                <select id="time_select" onchange="" v-model="useSoftware">
                  <option :value="skey" v-for="(software,skey) in softwares" data-number="0">
                    {{software}}</option>
                </select>
              </div>
            </div>
            <div class="right">
              <p class="subtitle">アカウントID</p>
              <input type="text" name="" v-model="account" id="Keyword" placeholder="12345678" class="KeywordTextbox">
            </div>
          </div>
        </div>
      </div>

      <div class="ChineseLevel_wrap">
        <div>
          <p>相談内容</p>
          <n-checkbox-group v-model:value="serviceChecked">
            <n-space item-style="display: flex;">
              <n-checkbox  v-for="(tag,tindex) in service_type_tag" :value="tindex" :label="tag" />
            </n-space>
          </n-checkbox-group>
        </div>
      </div>
    <div class="ChineseLevel_wrap">
      <div>
        <p>詳細内容100文字以内</p>
        <textarea v-model="comment" class="question-text" id="onlineQuestionId">

        </textarea>
      </div>
    </div>

      <div style="height: 60px;"></div>
        <div class="button_confirm" @click="submitForm">予約を確定する</div>

    <div style="height: 200px;"></div>

  
  </div>
  </template>

<script setup>
import {
  useReserveServiceApi, useReserveServiceDefaultInfoApi,
} from "~/apis/student";
import {createDiscreteApi, NCheckboxGroup, NCheckbox, NSpace} from "naive-ui";
import {onMounted} from "vue";
import {useMainStore} from "~/composables/store";

let softwares = ref([]);
let useSoftware = ref('');
let account = ref('');
let serviceChecked = ref('');
let time = ref(0);
let start_time = ref('');
let end_time = ref('');
let service_type_tag = ref([]);
let comment = ref('');
const route = useRoute();
const useStore = useMainStore();
const user = useStore.studentInfo;

const getInfo = async () => {
  let {
    pending,
    data,
    error,
    rows,
    total,
  } = await useReserveServiceDefaultInfoApi(time.value);

  if (data?.value) {
    start_time.value = data?.value?.start_time ?? '';
    end_time.value = data?.value?.end_time ?? '';
    softwares.value = data?.value?.software ?? [];
    useSoftware.value = data?.value?.default_software ?? '';
    service_type_tag.value = data?.value?.service_content ?? [];
  }
}

onMounted(() => {
  if (route?.query) {
    time.value = route?.query?.time;
    getInfo();
  }
})

async function submitForm() {
  const { message } = createDiscreteApi(["message"]);
  let { data: info } = await useReserveServiceApi({
    lesson_unixtime:time.value,
    id:user?.id,
    service_content : serviceChecked.value.join(','),
    student_comment : comment.value,
    software : useSoftware.value,
    account: account.value
  });
  if (info.value.err === false) {
    if (info.value.flag === 1) {
      message.error('本月咨询次数已用完。');
    } else if (info.value.flag === 2) {
      message.error('这个时间段的老师不存在。');
    } else if (info.value.flag === 3) {
      message.error('咨询已过期。');
    } else {
      message.success('预约成功');
      navigateTo({path:'/mypage/decisionService',query:{
          id: info.value.data.lessons_id,
        }}, { replace: true })
    }
  } else {
    if (info?.value?.err_msg) {
      message.error(info?.value?.err_msg);
    } else {
      message.error('预约失败');
    }
  }

}

</script>

<style scoped>
.radio-003 {
border: none;
}

.radio-003 label {
display: flex;
align-items: center;
gap: 0 .5em;
position: relative;
max-width: 286px;
margin-bottom: .4em;
padding: .5em .7em;
border: 1px solid #f2b705;
border-radius: 25px;
background-color: #f2b70526;
cursor: pointer;
}

.radio-003 label:has(:checked) {
background-color: #f2b705;
color: #fff;
}

.radio-003 label::before,
.radio-003 label:has(:checked)::after {
border-radius: 50%;
content: '';
}

.radio-003 label::before {
width: 14px;
height: 14px;
background-color: #fff;
}

.radio-003 label:has(:checked)::after {
position: absolute;
top: 50%;
left: calc(7px + .7em);
transform: translate(-50%, -50%);
width: 7px;
height: 7px;
background-color: #f2b705;
}

.radio-003 input {
display: none;
}

.question-text {
  height:150px;
  width:100%;
  border:1px solid #C5C5C5;
  margin-bottom: 20px;
}
</style>
  