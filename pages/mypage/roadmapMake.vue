<template>

  <div class="my-curriculum">
  <div class="upBlock">
    <h5>MYカリキュラム</h5>
    <div class="des">
      難易度別やジャンル別に多数教材をご用意しておりますが、お客様のニーズに合わせて、オーダーメイドのMYカリキュラムを作りましょう！
    </div>
<!--    <div><nuxt-link class="actionBtn" to="/mypage/textbookBusiness?type=">教材一覧</nuxt-link></div>-->
  </div>
    <div class="step-container">
      <div class="step">Step1 ヒアリングシート</div>
      <div class="step">Step2 中国語文法テスト</div>
      <div class="step">Step3 MYカリキュラム完成</div>
    </div>
  <div class="downBlock">
    <form action="">
    <div v-for="(question,qindex) in questionArr">
        <p class="title">{{1 + qindex}}.{{question.title.replaceAll('%s','_')}}</p>
          <div class="my-curriculum wrapper">
            <span v-if="question.question_status == 1" >
              <span v-for="(item,itemindex) in question.items">
                <label :for="'option-'+qindex+itemindex" class="option option-1">
                    <input type="radio" :name="'question'+qindex" :id="'option-'+qindex+itemindex" :value="item.id" v-model="form[qindex].value" />
                  <span>{{item.content}}</span>
                </label>
<!--                <input type="radio" :name="'question'+qindex" :id="'option-'+qindex+itemindex" :value="item.id" v-model="form[qindex].value" />-->
              </span>
            </span>
            <span style="width: 100%;" v-else-if="question.question_status == 0">
            <label v-for="(citem, citemindex) in question.items" :key="citemindex" class="checkboxSpan">
              <input
                  type="checkbox"
                  :name="'question'+citemindex+qindex+'[]'"
                  :id="'coption-'+citemindex"
                  :value="citem.id"
                  v-model="form[qindex].value"
              >
              {{ citem.content }}
            </label>
            </span>
            <span style="display: block; width: 100%;" v-else-if="question.question_status == 3">
                <textarea style="width: 100%; height: 100px; border: 1px solid #EEEEEE; border-radius: 4px;" v-model="form[qindex].value" />
            </span>
            <span v-else>
            <span>
<!--              <span v-if="question.id == 21" v-for="(item,itemindex) in question.items">-->
<!--                <label :for="'option-'+qindex+itemindex" class="option option-1">-->
<!--                  <div class="dot"></div>-->
<!--                  <span>{{item.content}}</span>-->
<!--                </label>{{form[qindex].value}}-->
<!--                <input type="radio" :name="'question'+qindex" :id="'option-'+qindex+itemindex" :checked="itemindex == 0 ? true : false" :value="item.id" v-model="form[qindex].value" />-->
<!--              </span>-->
              <span @click="changHsk(false)">
                <label :for="'option-11'+qindex">
                    <input type="radio" name="select11" :id="'option-11'+qindex" value="0" v-model="hskValue" />
                  <span class="radioSelect">受験暦なし</span>
                </label>

              </span>
              <span @click="changHsk(true)">
                <label :for="'option-22'+qindex">
                    <input type="radio" name="select10" :id="'option-22'+qindex" value="1" v-model="hskValue" />
                  <span class="radioSelect">受験暦あり</span>
                </label>
              </span>

              <div class="history" v-if="showHsk">
                {{question.title.substring(0,2)}}
                <input type="text" name="answer1" v-model="form[qindex].value[0].value"/>
                {{question.title.substring(4,5)}}
                <input type="text" name="answer2" v-model="form[qindex].value[1].value" />
                {{question.title.substring(7,8)}}
                <select name="hsklevel" v-model="form[qindex].value[2].value" clearable placeholder="">
                  <option value="3">HSK ３級</option>
                  <option value="2">HSK ２級</option>
                  <option value="1">HSK １級</option>
                </select>
                <input type="text" name="answer4" v-model="form[qindex].value[3].value"/>
                {{question.title.substring(12)}}
              </div>
            </span>
            </span>
          </div>
    </div>

    <div class="button_confirm" @click="onSubmit">保存して次へ</div>

  </form>
  </div>
  </div>

</template>

<script setup>
import {useQuestionnInfoApi, useStoreAnswerApi} from "~/apis/student";
import {createDiscreteApi, NSelect} from "naive-ui";

// definePageMeta({
//   middleware: 'auth',
//   layout: 'mypage'
// });


//加载效果
const loading = ref(false)
// let examRoomId = ref(0);
// let count = ref(0);
// let level = ref(0);
// let type = ref(1);
// const formRef = ref(null)
// let hskOptions = [{label: 'HSK １級',value: '1'},{label: 'HSK ２級',value: '2'},{label: 'HSK ３級',value: '3'}]
const form = reactive([])
let showHsk = ref(true);
let hskValue = ref(1);
let row = ref({});
let questionArr = ref([]);

const getQuestionnaireInfo = async() => {
  const { data: info, refresh,error } = await useQuestionnInfoApi(0);
  if (info?.value) {
    // console.log('QuestionnaireInfo:'+JSON.stringify(info));
    questionArr.value = info?.value?.row?.questions ?? [];
    row.value = info?.value?.row ?? [];
    // console.log('row:'+JSON.stringify(row));
    questionArr.value.map((question,index) => {
      // console.log('question:'+JSON.stringify(question));
      // let arr = [];
      // console.log('questions:'+JSON.stringify(questions));
      // questions.map((question) => {
      if (question.question_status == 0) {//复选框
        form.push({id:question.id,value:[]});
      } else if (question.question_status == 2) {//填空题
        form.push({id:question.id,value:[{key:1,value:''},{key:2,value:''},{key:3,value:''},{key:4,value:''}]});
      } else {
        form.push({id:question.id,value:null});
      }
      // });
      // form.push(arr)
    });
  }

  // console.log('form:'+JSON.stringify(form));
}
getQuestionnaireInfo();
function changHsk(value) {
  showHsk.value = value;
}
async function onSubmit() {
  // console.log('form:'+JSON.stringify(form));return;
  const { data: data, refresh,error } = await useStoreAnswerApi({
    answers:form,
    exam_room_id:row.value.exam_room_id,
    type:1
  });
  if (data?.value && data?.value.err == false) {
    const { message } = createDiscreteApi(["message"])
    message.success("送信成功");
    let examRoomId = data?.value?.exam_room_id;
    let level = data?.value.level;
    navigateTo(`/questionSec-${level}/${examRoomId}`);
    // count.value ++;
    // console.log('count:'+count.value);
    // if (count.value == 2) {
    //   examRoomId.value = data?.value.exam_room_id;
    //   form.length = 0;
    //   type.value = 2;
    //   console.log('examRoomId:'+examRoomId.value);
    //   await getQuestionnaireInfo();
    // } else if (count.value == 3) {
    //   examRoomId.value = data?.value.exam_room_id;
    //   form.length = 0;
    //   type.value = 3;
    //   await getQuestionnaireInfo();
    //   console.log('examRoomId:'+examRoomId.value);
    // }

  }

  // console.log('data:'+JSON.stringify(data));
}

</script>

<style>
.step:nth-child(1)::after {
  content: "";
  position: absolute;
  right: -20px;
  z-index: 999;
  top: 50%;
  transform: translateY(-50%);
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid var(--pink-dark);
}
.step:nth-child(2)::after {
  content: "";
  position: absolute;
  right: -20px;
  z-index: 999;
  top: 50%;
  transform: translateY(-50%);
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid #BDBDBD;
}
.step:nth-child(1) {
  background-color: var(--pink-dark);
  font-weight: bold;
}
.step:nth-child(2) {
  background-color: #BDBDBD;
}
.step:nth-child(3) {
  background-color: #D9D9D9;
}
@media screen and (max-width: 520px) {
  .step:nth-child(1)::after {
    display: none;
  }
  .step:nth-child(2)::after {
    display: none;
  }
}
</style>


