<template>
    <div class="netchina_contents my-curriculum">
      <div class="blockVW" v-if="list">
        <div class="pBlock">
        <div class="headline wordB">{{list.title}}</div>
        <span class="fontL">正解状況 <span class="wordB">{{rnum}}問</span> / {{qnum}}問</span>
        <div v-if="list.type === 1" class="iframeCenter">
          <div v-html="list.video"></div>
<!--          <a :href="list.video" target="_blank">{{list.video}}</a>-->
          <!-- 引入视频播放器 -->
<!--          <PlayerVideo :url="list.video" />-->
          <!-- 引入直播播放器 -->
<!--          <PlayerLive v-else-if="type == 'live'" :url="data.playUrl" />-->
        </div>
        <div v-else-if="list.type === 2">
          <PlayerAudio title="音频" :url="list.audio" />
        </div>
        <div v-else-if="list.type === 3">
          {{list.img}}
        </div>
        <div v-else-if="list.type === 4">
<!--          {{list.ppt}}-->
          <a :href="list.ppt" :download="pdfName">ppt下载链接</a>
        </div>
        <div v-else-if="list.type === 5">
          <a :href="list.pdf" :download="pdfName">pdf下载链接</a>
        </div>
        <div v-else>
          <div v-html="list.content"></div>
        </div>
        <div v-if="list.pdf_download_enable.length">
          <a :href="list.pdf_download_url" :download="pdfDownloadName">pdf下载链接</a>
        </div>
        <div v-if="list.html_enable.length">
          <a :href="list.html_url" target="_blank">html链接</a>
        </div>
        </div>

        <div class="qBlock">
        <h3>課後練習</h3>

        <form action="">
          <div v-for="(question,qindex) in questionArr">
            <p class="title">{{1 + qindex}}.{{question.title.replaceAll('%s','_')}}</p>
            <div class="roadmap_container">
              <div class="wrapper">
                <span v-if="question.question_status == 1" >
                  <span v-for="(item,itemindex) in question.items">
                    <label :for="'option-'+qindex+itemindex" class="option option-1">
                      <div class="dot">
                        <input type="radio" :name="'question'+qindex" :id="'option-'+qindex+itemindex" :value="item.id" v-model="form[qindex].value" />
                      </div>
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
              </div>
            </div>
          </div>


          <div class="groupBtn">
          <div class="backBtn" @click="goBack">戻る</div>
          <div class="conBtn" @click="onSubmit">保存</div>
          </div>
        </form>

        <div class="lossQues" v-if="errAnswerList.length">
          <span class="qtitle">誤答した問題：</span>
          <span v-for="(aitem) in errAnswerList">- {{aitem.title}}</span>
        </div>

        </div>
      </div>
    </div>

    <div style="height: 200px;"></div>



</template>


<script setup>

import {
  useGetPlanVideoInfoApi, useStoreVideoAnswerApi,
} from "~/apis/student";
 import {createDiscreteApi} from "naive-ui";
import {useMainStore} from "~/composables/store";


 //加载效果
 const loading = ref(false)
const list = ref(null);
const pdfDownloadName = ref('');
const pdfName = ref('');
const pptName = ref('');
const form = reactive([]);
let questionArr = ref([]);
const useStore = useMainStore();
const user = useStore.studentInfo;
const route = useRoute()
let errAnswerList = ref([]);
let qnum = ref(0);
let rnum = ref(0);
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);  // 返回上一页
  } else {
    router.push('/');  // 跳转到首页
  }
}

onMounted(async () => {
  const {pending, data: info  } = await useGetPlanVideoInfoApi(route?.query?.id);
  if (info?.value) {
    list.value = info?.value?.data ?? [];
    pdfDownloadName.value = list?.value?.pdf_download_url?.split('/').pop();
    pdfName.value = list?.value?.pdf?.split('/').pop();
    pptName.value = list?.value?.ppt?.split('/').pop();
    questionArr.value = list?.value?.paper_info?.questions ?? [];
    qnum.value = questionArr.value.length;
    questionArr.value.map((question,index) => {
      if (question.question_status == 0) {//复选框
        form.push({id:question.id,value:[]});
      } else {//单选
        form.push({id:question.id,value:null});
      }
    });
  }

});

async function onSubmit() {
  const { data: data, refresh,error } = await useStoreVideoAnswerApi({
    answers : form,
    sid : useStore?.studentInfo?.id,
    eid : list?.value?.exam_room_id,
    vid : list?.value?.id,
  });
  const { message } = createDiscreteApi(["message"])
  if (data?.value && data?.value.err == false) {
    useStore.useRefreshUserInfo();
    errAnswerList.value = data?.value?.err_arr ?? [];
    rnum.value = qnum.value - errAnswerList.value.length;
    message.success(data?.value.err_msg);
  } else {
    message.error(data?.value.err_msg);
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
.wordB{
  color: #2E6190;
  margin-bottom: 20px;
}
.blockW{
  position: relative;
}
.fontL{
  font-size: 16px;
  display: block;
  position: absolute;
  right: 32px;
  top: 32px;
  font-weight: bold;
  color: #4a4a4a;
}
.iframeCenter{
  display: flex; justify-content: center; align-items: center;
}
.blockVW{
    background-color: #FFFFFF;
    margin-bottom: 24px;
    border-radius: 8px;
}
.pBlock{
  position: relative;
  padding: 3% 5% 3% 5%;
}
.qBlock{
  background-color: #F8F8F8; padding: 3% 5%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  border-radius: 0 0 8px 8px;
}
.qBlock h3{
  font-size: 20px;
  font-weight: bold;
  color: #4a4a4a;
}
.lossQues{
  width: 100%;
  background-color: #f4f4f4;
  padding: 10px 20px;
}
.lossQues .qtitle{
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
}
.lossQues span{
  display: block;
  padding: 2px;
  list-style-type: disc;
}

.backBtn{
  padding: 20px;
  border-radius: 10px;
  background-color: #DDDDDD;
  color: #424242;
  width: 16%;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
}
.conBtn{
  display: inline-block;
  margin-left: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #2E6190;
  width: 22%;
  text-align: center;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}
.groupBtn{
  text-align: center;
  margin-top: 40px;
}

@media screen and (max-width: 520px) {
  .fontL{
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 4px;
    font-size: 14px;
  }
  .wordB{
    margin-bottom: 10px;
  }
  .iframeCenter{
    width: 100%;
    display: block;
  }
  ::v-deep(iframe){
    width: 100%;
    height: 220px;
  }
  .blockVW{
    width: 90%;
    margin: 4% auto;
  }

  .backBtn{
    width: 30%;
    padding: 16px 20px;
    font-size: 15px;
  }
  .conBtn{
    width: 50%;
    padding: 16px 20px;
    font-size: 15px;
  }
  .groupBtn{
    text-align: center;
    margin: 20px auto 30px auto;
  }
}
</style>