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
      <p class="title">{{qindex + 1}}.{{question.title.replaceAll('%s','_')}}</p>
      <div class="my-curriculum wrapper">
          <span v-if="question.question_status == 1" >
              <span v-for="(item,itemindex) in question.items">
                <label :for="'option-'+qindex+itemindex" class="option option-1">
                  <input type="radio" :name="'question'+qindex" :id="'option-'+qindex+itemindex" :value="item.id" v-model="form[qindex].value" />
                  <span>{{item.content}}</span>
                </label>
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
        </div>
    </div>

    <div class="button_confirm" @click="onSubmit">保存して次へ</div>

  </form>
    </div>
  </div>
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
let type = ref(1);
const form = reactive([])
let showHsk = ref(true);
let row = ref({});
let questionArr = ref([]);
const useStore = useMainStore();
let route = useRoute();

const getQuestionnaireInfo = async() => {
  const { data: info, refresh,error } = await useQuestionnInfoApi(route?.params?.id);
  if (info?.value) {
    questionArr.value = info?.value.row?.questions ?? [];
    row.value = info?.value.row ?? [];
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
    type:3,
    level:route?.params?.level ?? 0
  });
  if (data?.value && data?.value.err == false) {
    const { message } = createDiscreteApi(["message"])
    message.success("送信成功");
    useStore.setActiveUrl("/mypage/roadmap");
    navigateTo('/mypage/roadmap');
  }
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
  border-left: 20px solid #D9D9D9;
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
  border-left: 20px solid var(--pink-dark);
}
.step:nth-child(1) {
  background-color: #D9D9D9;
}
.step:nth-child(2) {
  background-color: var(--pink-dark);
  font-weight: bold;
}
.step:nth-child(3) {
  background-color: #BDBDBD;
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