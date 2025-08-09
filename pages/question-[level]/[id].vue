<template>
<div style="height: 90px; width: 100%;"></div>
  <div style="height: 80px;"></div>
  <p class="headline">MY学習ロードマップ</p>
  <div class="notice_yellow">
    <img src="~/assets/SVG/icon_notice.svg" alt="" class="icon_notice">
    <p class="notice_descript">ビズチャイナ中国語では、多くの教材が提供されていますため、 お客様に最適な学習内容と教材を決めるには、下記問題にお答えください。<br>
      中国語学習歴のある弊社日本人スタッフが、お客様にとって最適な学習ロードマップを作成します。</p>
  </div>
  <form action="">
    <div v-for="(question,qindex) in questionArr">
      <p>{{qindex + 1}}.{{question.title.replaceAll('%s','_')}}</p>
      <div class="roadmap_container">
        <div class="wrapper">
          <span v-if="question.question_status == 1" >
              <span v-for="(item,itemindex) in question.items">
                <label :for="'option-'+qindex+itemindex" class="option option-1">
                  <div class="dot"></div>
                  <span>{{item.content}}</span>
                </label>
                <input type="radio" :name="'question'+qindex" :id="'option-'+qindex+itemindex" :value="item.id" v-model="form[qindex].value" />
              </span>
            </span>
          <span v-else-if="question.question_status == 0">
                <span v-for="(citem,citemindex) in question.items">
                <input type="checkbox" :name="'question'+citemindex+qindex+'[]'" :id="'coption-'+citemindex" :value="citem.id" v-model="form[qindex].value">
                  {{citem.content}}
              </span>
            </span>
        </div>
      </div>
    </div>

    <div style="height: 80px;"></div>

    <div class="button_confirm" @click="onSubmit">保存して次へ</div>

  </form>

</template>

<script setup>
import {
  useQuestionnInfoApi,
  useStoreAnswerApi,
} from "~/apis/student";
import {createDiscreteApi, NSelect} from "naive-ui";

definePageMeta({
  middleware: 'auth',
  layout: 'mypage'
});


//加载效果
const loading = ref(false)
const form = reactive([])
let showHsk = ref(true);
let row = ref({});
let questionArr = ref([]);
let route = useRoute();
const getQuestionnaireInfo = async() => {
  const { data: info, refresh,error } = await useQuestionnInfoApi(route?.params?.id);
  // console.log('QuestionnaireInfo:'+JSON.stringify(info));
  if (info?.value) {
    questionArr.value = info?.value.row?.questions ?? [];
    row.value = info?.value.row ?? [];
    // console.log('row:'+JSON.stringify(row));
    questionArr.value.map((question,index) => {
      if (question.question_status == 0) {//复选框
        form.push({id:question.id,value:[]});
      } else if (question.question_status == 2) {//填空题
        form.push({id:question.id,value:[{key:1,value:''},{key:2,value:''},{key:3,value:''},{key:4,value:''}]});
      } else {
        form.push({id:question.id,value:null});
      }
    });
  }

}
getQuestionnaireInfo();
function changHsk(value) {
  showHsk.value = value;
}
async function onSubmit() {
  const { data: data, refresh,error } = await useStoreAnswerApi({
    answers:form,
    exam_room_id:row.value.exam_room_id,
    type:2,
    level:route?.params?.level ?? 0
  });
  if (data?.value && data?.value.err == false) {
    const { message } = createDiscreteApi(["message"])
    message.success("送信成功");
    let examRoomId = data?.value.exam_room_id;
    let level = data?.value.level;
    navigateTo(`/questionSec-${level}/${examRoomId}`);
  }

  console.log('data:'+JSON.stringify(data));
}
</script>

<style scoped>
.wrapper{
  display: inline-flex;
  flex-wrap: wrap;
  background: #fff;
  height: auto;
  min-height: 120px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 20px 15px;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
}

.wrapper .option {
  background: #fff;
  height: 100%;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 10px 12px 0;
  border-radius: 5px;
  cursor: pointer;
  padding: 12px 10px;
  border: 2px solid lightgrey;
  transition: all 0.3s ease;
}

.wrapper .option .dot {
  height: 20px;
  width: 20px;
  background: #d9d9d9;
  border-radius: 50%;
  position: relative;
  margin-right: 24px;
}

.wrapper .option .dot::before {
  position: absolute;
  content: "";
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  background: #F2B705;
  border-radius: 50%;
  opacity: 0;
  transform: scale(1.5);
  transition: all 0.3s ease;
}

.wrapper .option {
  font-size: 16px;
  color: #555555;
}

input[type="radio"] {
  display: none;
}

#option-1:checked:checked~.option-1,
#option-2:checked:checked~.option-2,
#option-3:checked:checked~.option-3,
#option-4:checked:checked~.option-4,
#option-5:checked:checked~.option-5 {
  border-color: #F2B705;
  background: #F2B705;
  color: #fff;
}

#learn-1:checked:checked~.learn-1,
#learn-2:checked:checked~.learn-2,
#learn-3:checked:checked~.learn-3,
#learn-4:checked:checked~.learn-4,
#learn-5:checked:checked~.learn-5 {
  border-color: #F2B705;
  background: #F2B705;
  color: #fff;
}

#goal-1:checked:checked~.goal-1,
#goal-2:checked:checked~.goal-2,
#goal-3:checked:checked~.goal-3,
#goal-4:checked:checked~.goal-4,
#goal-5:checked:checked~.goal-5 {
  border-color: #F2B705;
  background: #F2B705;
  color: #fff;
}

#option-1:checked:checked~.option-1 .dot,
#option-2:checked:checked~.option-2 .dot,
#option-3:checked:checked~.option-3 .dot,
#option-4:checked:checked~.option-4 .dot,
#option-5:checked:checked~.option-5 .dot {
  background: #fff;
}

#learn-1:checked:checked~.learn-1 .dot,
#learn-2:checked:checked~.learn-2 .dot,
#learn-3:checked:checked~.learn-3 .dot,
#learn-4:checked:checked~.learn-4 .dot,
#learn-5:checked:checked~.learn-5 .dot {
  background: #fff;
}

#goal-1:checked:checked~.goal-1 .dot,
#goal-2:checked:checked~.goal-2 .dot,
#goal-3:checked:checked~.goal-3 .dot,
#goal-4:checked:checked~.goal-4 .dot,
#goal-5:checked:checked~.goal-5 .dot {
  background: #fff;
}

#option-1:checked:checked~.option-1 .dot::before,
#option-2:checked:checked~.option-2 .dot::before,
#option-3:checked:checked~.option-3 .dot::before,
#option-4:checked:checked~.option-4 .dot::before,
#option-5:checked:checked~.option-5 .dot::before {
  opacity: 1;
  transform: scale(1);
}

#learn-1:checked:checked~.learn-1 .dot::before,
#learn-2:checked:checked~.learn-2 .dot::before,
#learn-3:checked:checked~.learn-3 .dot::before,
#learn-4:checked:checked~.learn-4 .dot::before,
#learn-5:checked:checked~.learn-5 .dot::before {
  opacity: 1;
  transform: scale(1);
}

#goal-1:checked:checked~.goal-1 .dot::before,
#goal-2:checked:checked~.goal-2 .dot::before,
#goal-3:checked:checked~.goal-3 .dot::before,
#goal-4:checked:checked~.goal-4 .dot::before,
#goal-5:checked:checked~.goal-5 .dot::before {
  opacity: 1;
  transform: scale(1);
}

#option-1:checked:checked~.option-1 span,
#option-2:checked:checked~.option-2 span {
  color: #fff;
}
</style>