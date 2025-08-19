<template>
	<div>
    <div class="blockW">
        <h5>中国語文法FAQ</h5>
        <span class="des">ビズチャイナ会員様限定サービス！<br>
        中国語の文法知識について、ご不明なところは何でもパンダ先生に聞いてみてください！</span>
      <!-- Slider 部分 -->
      <!-- Slider 部分 -->
      <div class="slider">
        <button class="arrow left" @click="prevSlide">
          <img src="../../assets/images/sw_prev.png" width="14" />
        </button>

        <div class="slides" ref="slides">
          <div class="slide" :key="0">
            <ul class="faqitem">
              <li
                  v-for="(item, index) in oftenArr.slice(0, 6)"
                  :key="index"
                  @click="showPopup(item.answer, item.question)"
              >
                <span>{{ item.question }}</span>
              </li>
            </ul>
          </div>
          <div class="slide" :key="1">
            <ul class="faqitem">
              <li
                  v-for="(item2, index2) in oftenArr.slice(6, 12)"
                  :key="index2"
                  @click="showPopup(item2.answer, item2.question)"
              >
                <span>{{ item2.question }}</span>
              </li>
            </ul>
          </div>
          <div class="slide" :key="2">
            <ul class="faqitem">
              <li
                  v-for="(item3, index3) in oftenArr.slice(12, 18)"
                  :key="index3"
                  @click="showPopup(item3.answer, item3.question)"
              >
                <span>{{ item3.question }}</span>
              </li>
            </ul>
          </div>
        </div>

        <button class="arrow right" @click="nextSlide">
          <img src="../../assets/images/sw_next.png" width="14" />
        </button>

        <div class="dots">
          <span
              v-for="(dot, index) in totalSlides"
              :key="index"
              class="dot"
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </div>


<!--        <div class="padding-xl bg-white">-->
<!--          <p v-for="(oitem,oindex) in oftenArr"><span @click="showAnswer(oitem.answer)">{{oitem.question}}</span></p>-->
<!--        </div>-->

    <div class="pandaBlock">
      <div class="pandaTitle"></div>
      <textarea v-model="question_msg" class="question-text" id="onlineQuestionId" placeholder="ここに質問を入力してください">
      </textarea>
      <n-button class="submit_btn" @click="addQuestion()">パンダ先生に聞く</n-button>
    </div>

    <div class="blockW mt">
				<h6>回答待ちの内容</h6>
      <div v-if="noReplyArr.length">
        <div v-for="(nitem,nindex) in noReplyArr">
          <div class="quBlock">
            <p v-html="nitem.question"></p>
            <span class="deleteBtn" @click="deleteQuestion(nitem.id)">削除</span>
          </div>
        </div>
      </div>
      <div class="noq" v-else>
        質問はありません。
      </div>

      <br><br>
				<h6>回答済みの内容</h6>
      <div v-if="replyedArr.length">
        <div v-for="(ritem,rindex) in replyedArr">
          <div class="quBlock btmClear">
            <p v-html="ritem.question"></p>
            <span class="doneBtn">回答済み</span>
          </div>
          <div class="ansBlock">
            <p v-html="ritem.answer"></p>
          </div>
        </div>
        <n-pagination size="medium" :item-count="alltotal" :page="page" :page-size="limit"
                      :on-update:page="handlePageChange" />
      </div>
      <div class="noq" v-else>
        質問はありません。
      </div>
    </div>

	</div>

  <!-- 弹窗 -->
  <div v-if="isPopupVisible" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <span class="close" @click="closePopup">&times;</span>
      <h3 class="popup-title">{{ popupTitle }}</h3>
      <p class="popup-info">{{ popupText }}</p>
    </div>
  </div>

</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useAddOnlineQuestionData, useOnlineQuestionData, useOnlineQuestionReplyedData } from "~/apis/teacher";
import { createDiscreteApi, NPagination } from "naive-ui";
import {
  useAddOnlineQuestionStudentData, useDeleteOnlineQuestionStudentData,
  useOnlineQuestionReadStudentData, useOnlineQuestionReplyedStudentData,
  useOnlineQuestionStudentData
} from "~/apis/student";

import faqData from "@/assets/faqData.json"; // 引入 JSON 文件

// 弹窗状态
const isPopupVisible = ref(false);
const popupTitle = ref(""); // 用于存储弹窗的标题
const popupText = ref(""); // 用于存储弹窗的详细内容

// FAQ 数据
const faqItems = ref([]);
const itemsPerSlide = 6; // 每个滑块展示的项目数

// 动态生成分组数据
const chunkedFaqItems = computed(() => {
  const chunks = [];
  for (let i = 0; i < faqItems.value.length; i += itemsPerSlide) {
    chunks.push(faqItems.value.slice(i, i + itemsPerSlide));
  }
  return chunks;
});

// 总滑块数
const totalSlides = computed(() => chunkedFaqItems.value.length);

// 当前滑块索引
const currentIndex = ref(0);
const slides = ref(null); // 滑块 DOM 引用

// 显示弹窗
function showPopup(info, title) {
  popupTitle.value = title; // 设置标题
  popupText.value = info; // 设置详细内容
  isPopupVisible.value = true;
}

// 关闭弹窗
function closePopup() {
  isPopupVisible.value = false;
}

// 滑块导航
function updateSlidePosition() {
  if (slides.value) {
    slides.value.style.transform = `translateX(-${currentIndex.value * 770}px)`;
  }
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
  updateSlidePosition();
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
  updateSlidePosition();
}

function goToSlide(index) {
  currentIndex.value = index;
  updateSlidePosition();
}

// 問題管理部分
let oftenArr = ref([]);
let noReplyArr = ref([]);
let replyedArr = ref([]);
let question_msg = ref('');
let alltotal = ref(0);
let page = ref(1);
let limit = ref(10);

async function readQuestions() {
  const { data: info } = await useOnlineQuestionReadStudentData();
}

async function getReplyedQuestions() {
  const { pending, error, rows, total, refresh } = await usePage(() => {
    return useOnlineQuestionReplyedStudentData(() => {
      return {
        limit: limit.value,
        page: page?.value || 1,
      };
    });
  });

  replyedArr.value = rows.value ?? [];
  alltotal.value = total.value ?? 0;
  await readQuestions();
}

async function getQuestions() {
  const { data: lists } = await useOnlineQuestionStudentData();
  if (lists?.value) {
    oftenArr.value = lists?.value?.oftenQuestions ?? [];
    noReplyArr.value = lists?.value?.noReplayQuestions ?? [];
    // console.log('oftenArr?.value:'+JSON.stringify(oftenArr?.value));
    await getReplyedQuestions();
  }
}


async function addQuestion() {
  const { message } = createDiscreteApi(["message"]);
  if (question_msg.value === '' || question_msg.value === null) {
    message.error('質問を入力してください。');
    return;
  }
  const { data: addInfo } = await useAddOnlineQuestionStudentData(question_msg.value);
  if (addInfo?.value.err === false) {
    message.success("提出が成功しました。");
    question_msg.value = '';
    getQuestions();
  }
}

function handlePageChange(p) {
  page.value = p;
  getReplyedQuestions();
}

function showAnswer(answer) {
  const { dialog } = createDiscreteApi(["dialog"]);
  dialog.info({
    content: answer,
    positiveText: "戻る",
    onPositiveClick: async () => {
      navigateTo('/mypage/solution');
    },
  });
}

async function deleteQuestion(id) {
  const { data: info } = await useDeleteOnlineQuestionStudentData(id);
  if (info?.value && info?.value?.err == false) {
    getQuestions();
    const { message } = createDiscreteApi(["message"]);
    message.success(info?.value?.err_msg);
  }
}

// 初始化
onMounted(() => {
  getQuestions();
  faqItems.value = faqData.flatMap((group) => group.slide); // 加载 JSON 数据
});
</script>



<style scoped>

.popup-content {
  position: relative;
  width: 100%;
}

.popup-content .close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  color: #333;
}

.popup-content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}

/* 半透明背景覆盖 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* 黑色半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保弹窗位于最顶层 */
}

/* 弹窗标题 */
.popup-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
  text-align: center;
}

/* 弹窗内容 */
.popup-info {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  white-space: pre-line; /* 支持换行符 */
}


/* 弹窗内容 */
.popup-content {
  background-color: #fff;
  padding: 30px;
  width: 640px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.1s ease-in-out; /* 添加弹窗淡入动画 */
  z-index: 9999;
}

/* 关闭按钮 */
.popup-content .close {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  font-size: 38px;
  color: #333;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;

  }
  to {
    opacity: 1;

  }
}

.faqitem li {
  cursor: pointer;
  margin: 10px 0;
  text-decoration: none
}



.blockW h6{font-size: 16px; font-weight: bold; margin: 8px 0;}

#onlineQuestionId{
  background-color: white; width: 810px;
  left: 40px;
  display: block;
  padding: 24px 180px 16px 16px;
  position: absolute;
  border: 1px solid #f4f4f4;
  height: 72px;
  border-radius: 4px;
  font-size: 15px;
  line-height: 24px;
  overflow: hidden;
}

.submit_btn {
  right: 55px;
  top: 90px;
  height: 44px;
  width: 150px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: var(--pink-dark);
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  transition: background-color .2s ease;
}

.pandaBlock{
  background-image: url('../../assets/images/panda_bg.png');
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 10px;
  position: relative;
  height: 170px;
}

.pandaTitle{
  background-image: url('../../assets/images/panda.png');
  height: 55px;
  background-size:contain;
  background-repeat: no-repeat;
  margin: auto;
  width:790px ;
}

.deleteBtn{
  display: block;
  background-color: white;
  position: absolute;
  right: 24px;
  top: 12px;
  padding: 6px 12px 4px 30px;
  width: fit-content;
  border-radius: 40px;
  color: var(--pink-dark);
  background-image: url('../../assets/images/delete_btn.png');
  background-size: 22px;
  background-repeat: no-repeat;
  background-position: 7px;
  font-size: 12px;
  font-weight: bold;
  line-height: 18px;
  cursor: pointer;
}
.mt{
  margin-top: 24px;
}

.quBlock{
  background-color: #F4F4F4;
  margin-bottom: 16px;
  padding: 16px 100px 16px 58px;
  position: relative;
  background-image: url("../../assets/images/qmark.png");
  background-size: 26px;
  background-position: 20px 16px;
  background-repeat: no-repeat;
}
.quBlock p{font-size: 15px;line-height: 22px;}
.noq{color: #B7B7B7;}

.slider {
  position: relative;
  width: 800px;
  overflow: hidden;
}

.arrow img{
  cursor: pointer;
}

.slides {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 740px; /* 每個區塊寬度設為 720px */
  margin-left: 30px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.faqitem li {
  background-color: #f4f4f4;
  height: 52px;
  width: 238px;
  margin: 4px 4px;
  padding: 2px 10px 2px 16px;
  text-align: left;
  display: inline-block;
  vertical-align: middle; /* 外層 inline-block 元素的對齊 */
  font-size: 14px;
  border-radius: 4px;
}
.faqitem li span {
  display: table-cell;
  vertical-align: middle;
  width: 100%; /* 確保 span 占滿 li */
  height: 52px; /* 和 li 高度相同 */
  line-height: 18px;
}

.arrow {
  position: absolute;
  top: 44%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #ff6600;
}

.arrow.left {
  left: 0; /* 精確定位到滑動區域的左側 */
  z-index: 999;
  cursor: pointer;
}

.arrow.right {
  right: 0; /* 精確定位到滑動區域的右側 */
  cursor: pointer;
}

.dots {
  text-align: center;
}

.dot {
  height: 8px;
  width: 8px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.dot.active {
  background-color: #ff6600;
}
.submit_btn{
  cursor: pointer;
}
.btmClear{
  margin-bottom: 0;
}
.ansBlock{
  border-left: 1px solid #F4F4F4;
  border-right: 1px solid #F4F4F4;
  border-bottom: 1px solid #F4F4F4;
  margin-bottom: 16px;
  background-image: url("../../assets/images/amark.png");
  background-size: 26px;
  background-position: 20px 16px;
  background-repeat: no-repeat;
  padding: 16px 32px 16px 58px;
}

.doneBtn{
  display: block;
  position: absolute;
  right: 16px;
  top: 10px;
  padding: 8px 12px 6px 30px;
  width: fit-content;
  border-radius: 40px;
  color: var(--pink-dark);
  background-image: url('../../assets/images/done_btn.png');
  background-size: 11px;
  background-repeat: no-repeat;
  background-position: 16px 11px;
  font-size: 11px;
  font-weight: bold;
  line-height: 18px;
}
.ansBlock p{
  line-height: 24px;
  font-size: 15px;
}

@media screen and (max-width: 520px) {
  .pandaBlock{
    width: 90%;
    margin: auto;
    position: relative;
    text-align: center;
    height: fit-content;
  }
  #onlineQuestionId{
    width: 90%;
    margin: auto;
    left: 0;
    position: relative;
    padding:10px;
    text-align: left;
  }
  .pandaTitle{
    width: 100%;
    background-image: url("../../assets/images/panda_m.png");
    background-position: center bottom;
    height: 64px;
  }
  .question-text{
    margin: auto;
  }
  .submit_btn{
    position: relative;
    right: 0;
    top: 0;
    margin: auto;
    width: 90%;
  }
  .slider{
    display: none;
  }
  .mt{
    margin-top:4%;
  }
  .quBlock{
    padding: 16px 32px 16px 58px;
  }
  .deleteBtn{
    right: 10px;
  }
  .doneBtn{
    display: none;
  }
}

</style>