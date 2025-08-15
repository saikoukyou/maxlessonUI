<template>
    <div class="mypageTemplate">
      <span v-if="list.length" v-for="(lesson) in list">
        <div class="lessonConfirm Decision">
          <ul class="date">
            <li>カウンセリングの予約が確定されました。</li>
            <li>{{lesson.day.time_sart}}〜{{lesson.day.time_end}}</li>
            <li>
              <span v-if="useStore?.studentInfo?.timezone === 'cn'">（UTC+8 中国時間）</span>
              <span v-else>（UTC+9 日本時間）</span>
            </li>
          </ul>
        </div>
        <div class="lessonDes">
        <div class="ccontent">
          <h2>カウンセラーの連絡方法</h2>
          <div class="softtitle" v-if="lesson.software == 'teams'">
            TeamsID: {{lesson.teacher_teams_id}}
          </div>
          <div class="softtitle" v-else-if="lesson.software == 'wechat'">
            WeChatID: {{lesson.teacher_wechat}}
            <img :src="lesson.teacher_wechat_img" height="406" width="300" />
            <span class="scanWord">スキャンして連絡先追加することができます。</span>
          </div>
          <div class="softtitle" v-else-if="lesson.software == 'web'">
            web
          </div>
        </div>

          <div class="ccontent">
          <h2>ご相談内容</h2>
          <div>
            {{lesson.service_content}}
          </div>
        </div>
          <div class="ccontent">
          <h2>詳細内容100文字以内</h2>
          <div>
            {{lesson.student_comment}}
          </div>
        </div>

          <div class="btnGroup">
            <div class="backBtn" @click="goBack">戻る</div>
            <div class="confirmBtn" @click="cancelLesson(lesson.id)">予約のキャンセル</div>
          </div>

        </div>

      </span>

    </div>

</template>

<script setup>
import {addBookmark, formatDate} from "~/composables/useUtil";
import {useCancelServiceApi, useLessonsListApi} from "~/apis/student";
import {createDiscreteApi} from "naive-ui";
import { useRouter } from 'vue-router';
import {useMainStore} from "~/composables/store";
const router = useRouter();
const useStore = useMainStore();

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);  // 返回上一页
  } else {
    router.push('/');  // 跳转到首页
  }
}

let list = ref([]);
const route = useRoute();
const lesson_id = ref(0);

if (route && route?.query) {
  lesson_id.value = route.query.id;
}

const getInfo = async () => {
  let { data: info } = await useLessonsListApi(lesson_id.value);
  if (info?.value) {
    list.value = info?.value?.list ?? [];
  }
}

onMounted(() => {
  getInfo();
});

const cancelLesson = async (id) => {
  let { data: info } = await useCancelServiceApi(id);
  if (info.value.err === false) {
    const { message } = createDiscreteApi(["message"]);
    message.success(info.value.err_msg);
    navigateTo("/mypage/serviceReserved",{ replace: true });
  }
}

</script>

<style scoped>
.lessonConfirm >.date{
  margin: auto;
}
.lessonDes{
  background-color: #F8F8F8;
  text-align: center;
  padding: 26px 0;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #E8E8E8;
  color: #424242;
  margin-bottom: 30px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}
.lessonDes h2{
  font-weight: bold;
  margin-bottom: 10px;
}
.lessonDes .softtitle{
  background-color: #FFFFFF;
  line-height: 40px;
  width: 400px;
  margin: auto;
  font-weight: bold;
}
.lessonDes .softtitle img{
  width: 300px;
  height: 406px;
  margin: auto;
}
.scanWord{
  display: block;
  font-size: 13px;
  font-weight: normal;
  background-color: #FFFFFF;
}
.lessonConfirm{
  margin-top: 16px;
  border-radius: 8px 8px 0 0;
  padding-top: 30px;
}
.lessonConfirm.Decision .date li{
  font-size: 24px;
}
.ccontent{
  width: 400px;
  margin: 10px auto;
  background-color: white;
  padding-bottom: 10px;
}
.ccontent h2{
  background-color: #F4f4f4;
  padding: 10px;
}
.content div{
  background-color: #FFFFFF;
}
.btnGroup{
  width: 300px;
  margin: auto;
}
.btnGroup .backBtn{
  width: 120px;
  height: 54px;
  background-color: #FA8373;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 54px;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.btnGroup .confirmBtn{
  width: 170px;
  height: 54px;
  background-color: #FA8373;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 54px;
  display: inline-block;
  cursor: pointer;
}
@media screen and (max-width: 520px) {
  .mypageTemplate{
    width: 90%;
    margin: auto;
  }
  .ccontent{
    width: 80%;
    margin: auto;
  }
  .lessonDes .softtitle{
    width: 80%;
    margin: auto;
  }
  .backBtn{
    width: 100px;
    font-size: 14px;
  }
  .btnGroup .confirmBtn{
    width: 150px;
    font-size: 14px;
  }
  .btnGroup{
    margin: 20px auto;
  }
  
}
</style>


  