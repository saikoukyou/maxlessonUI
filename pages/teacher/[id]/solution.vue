<template>
	<div class="border border-color-third font-size teacher-solution border-radius overflow-hidden bg-white-yellow">
		<div class="row items-center padding-l padding-x-xl gap-xl bg-third justify-between">
			<span>答疑解惑</span>
		</div>
		<div class="row items-center padding-xl gap-xl">
			<img src="~/assets/SVG/label_teacher6.svg" width="80" height="80" />
			<div>
				<p>老师在教学中碰到的语法，用法等问题，可以通过这里进行提问。</p>
				<p>会有专门的老师通过网站对您进行回复。</p>
			</div>
		</div>
		<div class="padding-xl col gap-xl">
			<div class="col gap">
				<h5>常问问题</h5>
        <div class="slider">
          <button class="arrow left" @click="prevSlide">
            <img src="../../../assets/images/sw_prev.png" width="14" />
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
            <img src="../../../assets/images/sw_next.png" width="14" />
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
<!--				<div class="padding-xl bg-white">-->
<!--					<p v-for="(oitem,oindex) in oftenArr" v-html="oitem.question"></p>-->
<!--				</div>-->
			</div>
      <div class="col gap">
        <h5>提交问题</h5>
        <div>
          <textarea v-model="question_msg" class="question-text" id="onlineQuestionId"></textarea>
          <n-button v-if="noReplyArr.length == 0" class="submit_btn" @click="addQuestion()">提交</n-button>
        </div>
      </div>
			<div class="col gap">
				<h5>有疑问等待解答</h5>
				<div v-for="(nitem,nindex) in noReplyArr">
					<div class="padding-xl bg-white row items-center gap">
						<img src="~/assets/SVG/iconQuestion.svg" style="height: 30px;" alt="" />
						<p v-html="nitem.question"></p>
            <span @click="deleteQuestion(nitem.id)">删除</span>
					</div>
					<div class="padding-xl bg-light-yellow">
<!--						<p>{{nitem.question}}</p>-->
					</div>
				</div>
			</div>

			<div class="col gap">
				<h5>已回答的问题</h5>
				<div v-for="(ritem,rindex) in replyedArr">
					<div class="padding-xl bg-white row items-center gap">
						<img src="~/assets/SVG/iconQuestion.svg" style="height:30px;" alt="" />
						<p v-html="ritem.question"></p>
					</div>
					<div class="padding-xl bg-light-yellow">
						<p v-html="ritem.answer"></p>
					</div>
				</div>
        <n-pagination size="medium" style="margin-bottom: 10px;" :item-count="alltotal" :page="page" :page-size="limit"
                      :on-update:page="handlePageChange" />
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
import {
  useAddOnlineQuestionData, useDeleteOnlineQuestionData,
  useOnlineQuestionData,
  useOnlineQuestionReadData,
  useOnlineQuestionReplyedData
} from "~/apis/teacher";
import {createDiscreteApi, NPagination} from "naive-ui";
import {ref} from "vue";
import faqData from "@/assets/faqData.json"; // 引入 JSON 文件


let oftenArr = ref([]);
let noReplyArr = ref([]);
let replyedArr = ref([]);
let question_msg = ref('');
let alltotal = ref(0);
let page = ref(1);
let limit = ref(10);

async function readQuestions() {
  const {data: info  } = await useOnlineQuestionReadData();
}
async function getReplyedQuestions() {
  const {
    pending,
    error,
    rows,
    total,
    refresh
  } = await usePage(() => {
    return useOnlineQuestionReplyedData(() => {
      return {
        limit: limit.value,
        page: page?.value || 1,
      }
    })
  })

  replyedArr.value = rows.value ?? [];
  alltotal.value = total.value ?? 0;
  await readQuestions();
}

async function getQuestions() {
  const {data: lists  } = await useOnlineQuestionData();
  if (lists?.value) {
    oftenArr.value = lists?.value.oftenQuestions ?? [];
    noReplyArr.value = lists?.value.noReplayQuestions ?? [];

    await getReplyedQuestions();
    // replyedArr.value = lists?.value.replyedQuestions ?? [];
  }
}

async function addQuestion() {
  const { message } = createDiscreteApi(["message"])
  if (question_msg.value === '' || question_msg.value === null) {
    message.error('请输入问题');
  }
  const {data: addInfo  } = await useAddOnlineQuestionData(question_msg.value);
  if (addInfo?.value.err === false) {
    message.success("提交成功");
    getQuestions();
  }
}

function handlePageChange(p) {
  page.value = p;
  getReplyedQuestions();
}

async function deleteQuestion(id) {
  const {data: info  } = await useDeleteOnlineQuestionData(id);
  if (info?.value && info?.value?.err == false) {
    getQuestions();
    const { message } = createDiscreteApi(["message"])
    message.success(info?.value?.err_msg);
  }

}


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

// 初始化
onMounted(() => {
  getQuestions();
  faqItems.value = faqData.flatMap((group) => group.slide); // 加载 JSON 数据
});
</script>
<style scoped>
.submit_btn {
  height: 48px;
  min-width: 156px;
  max-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F2B705;
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  font-size: 18.8px;
  /* margin: 12px auto; */
  letter-spacing: 0.4em;
  transition: background-color .2s ease;
}

.question-text {
  height:150px;
  width:100%;
  border:1px solid #C5C5C5;
  margin-bottom: 20px;
}

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
    background-image: url("../../../assets/images/panda_m.png");
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
}
</style>