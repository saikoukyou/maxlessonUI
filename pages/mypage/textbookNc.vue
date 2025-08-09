<template>

  <section>

    <div class="textBookT">NetCHINA教材一覧</div>
  <div class="blockW courseTable-wrapper">
    <div style="text-align: center;margin:10px 0;">
      <h2 style="font-size: 18px;font-weight: bolder;">【NetChinaの教材の利用期限に関するお知らせ】</h2>
      <p>
        サイトリニューアルに伴い、NetChinaの教材に利用期限を設ける運びとなりました。<br>
        →利用期限：2025年9月30日　　<br>
        ※NetChina教材は「総合コース」のみ利用可能
      </p>
    </div>

    <table class="courseTable">
      <tr class="tr1">
        <th rowspan="2" class="th1"></th>
        <th colspan="3" class="th2">必修科目群</th>
        <th colspan="5" class="th3">選択科目群</th>
      </tr>
      <tr class="tr2">
        <th v-for="(course, index) in requiredCourses" :key="'required-' + index" class="tha">
          {{ courseList[course] }}
        </th>
        <th v-for="(course, index) in optionalCourses" :key="'optional-' + index" class="thb">
          {{ courseList[course] }}
        </th>
      </tr>
      <tr v-for="(levelCourses, level) in textbookMatrix" :key="'level-' + level" :class="'tr' + (level + 2)">
        <th class="th1" v-html="levelView[level]"></th>
        <td v-for="(courseInfo, course) in levelCourses" :key="'course-' + course" class="tdCommon">
          <template v-if="courseInfo.num">
            <a @click="changeCourse(course,level)"
               class="search_textbooks"
               :data-level="level"
               :data-course="course">
              <span>{{ courseInfo.name }}</span>
              <em>（{{ courseInfo.num }}課）</em>
            </a>
          </template>
          <template v-else>
            <span></span>
          </template>
        </td>
      </tr>
    </table>
  </div>
    <div class="blockW listB">
      <div v-if="texts.length" v-for="text in texts" :key="text.id" class="mBottom">
        <p class="headline">{{ text.name }}</p>
        <div class="headline-des" v-html="text.explanation"></div>
        <div v-for="item in text.items" :key="item.id">
          <div v-if="item.teacher_only == 0" class="textbook_container">
            <div>
              <div>
                <span class="textbook-name">{{ item.title }}</span>
                <span v-if="item.member_only">
                  <span class="studentonly">会員限定</span>
                  <span v-if="isStudied(item.id)">
                    <span class="unopen">受講済み</span>
                  </span>
                  <span v-else>
                    <span v-if="isAvailable(item.id)" class="unopen">未受講</span>
                    <span class="unopen" v-else>未公開</span>
                  </span>
                </span>
                <span v-else>
                  <span v-if="isStudied(item.id)" class="unopen">受講済み</span>
                </span>
              </div>

              <div class="resource-container">
                <div v-if="!item.is_web">
                  <div v-for="(audio, index) in ['audio_1', 'audio_2', 'audio_3', 'audio_4', 'audio_5']">
                    <div v-if="item[audio]">
                      <a
                          :href="item[audio]"
                          target="_blank"
                          class="dhbtn"
                      >
                        <img src="../../assets/images/3_27.png" />音声{{ index + 1 }}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <div v-for="(pdf, index) in ['pdf_1', 'pdf_2', 'pdf_3', 'pdf_4', 'pdf_5']">
                    <div v-if="item[pdf]">
                      <a
                          :href="item[pdf]"
                          target="_blank"
                          class="dhbtn"
                      >
                        <img src="../../assets/images/3_25.png" />教材{{ index + 1 }}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <div v-for="(video, index) in ['video_1', 'video_2', 'video_3', 'video_4', 'video_5']">
                    <div v-if="item[video]">
                      <nuxt-link
                          :to="'/mypage/textbookNcAudio?msg='+item[video]"
                          class="dhbtn"
                      >
                        <img src="../../assets/images/3_27.png" />動画{{ index + 1 }}
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </section>

</template>


<script setup>
import { register } from 'swiper/element/bundle';
import {useHomeCategoryListDataApi, useOldTextbookListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {usePage} from "~/composables/usePage";
import {useMainStore} from "~/composables/store";

// register Swiper custom elements
register();

let selected_index = ref(0);

let courseList = ref([]);
let level_map_list = ref([]);
const useStore = useMainStore();
const learnType = useStore.learn_type;
const availableTextbookIds = ref([]);
const studiedTextbookIds = ref([]);
let requiredCourses = ref([]);
let optionalCourses = ref([]);
let textbookMatrix = ref([]);
let levelView = ref([]);
let texts = ref([]);
let courseParam = ref('');
let levelParam = ref('');

const getCategorys = async () => {
  let {data: courseinfos  } = await useHomeCategoryListDataApi(2);
  if (courseinfos?.value) {
    courseList.value = courseinfos?.value.courses ?? [];
    level_map_list.value = courseinfos?.value.tag_level_maps ?? [];
    requiredCourses.value = courseinfos?.value.require_course ?? [];
    optionalCourses.value = courseinfos?.value.no_require_course ?? [];
    textbookMatrix.value = courseinfos?.value.textbook_matrix ?? [];
    levelView.value = courseinfos?.value.level_view ?? [];
  }
};

onMounted(() => {

  getCategorys();

})


const getTextbookList = async() => {
  const { data: info} = await useOldTextbookListDataApi(courseParam.value,levelParam.value);
  if (info?.value) {
    texts.value = info?.value?.texts ?? [];
    availableTextbookIds.value = info?.value?.available_textbook_ids ?? [];
    studiedTextbookIds.value = info?.value?.studied_textbook_ids ?? [];
  }
}

function changeCourse(course,level) {
  courseParam.value = course;
  levelParam.value = level;
  getTextbookList();
// 滚动到目标元素
  const targetElement = document.querySelector(".listB");
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth", // 平滑滚动
      block: "start",     // 对齐到顶部
    });
  }
}

function isStudied(itemId) {
  return studiedTextbookIds.value.includes(itemId);
}
function isAvailable(itemId) {
  return availableTextbookIds.value.includes(itemId);
}
function isUnavailable(itemId) {
  return !availableTextbookIds.value.includes(itemId);
}
</script>


<style scoped>
.contentsWrap{
  width: auto;
}
.courseTable {
  width: 100%;
  border-radius: 9px;
}
.courseTable td, .courseTable th {
  text-align: center;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
}
.courseTable .th1 {
  width: 117px;
  font-size: 14px;
  color: #fff;
  padding: 10px;
  justify-content: center;
  text-align: center;
  height: 64px;
}
.courseTable .tr1 .th1 {
  border-top-left-radius: 12px;
}
.courseTable .tr1 .th3 {
  border-top-right-radius: 12px;
  border-right: none;
}
.courseTable .tr10 .th1 {
  border-bottom-left-radius: 12px;
}
.courseTable .tr10 .tdCommon.last {
  border-bottom-right-radius: 12px;
}
.courseTable td {
  font-size: 16px;
}
.courseTable td em {
  display: block;
  color: #aaa;
}
.courseTable td.tdCommon {
  width: 128px;
  cursor: pointer;
  vertical-align: middle; /* 垂直置中 */
  text-align: center; /* 水平置中 */
  height: 100%; /* 確保單元格的高度一致 */
  padding: 10px;
}
.courseTable td.tdCommon:hover {
  background: #fad7c8;
}
.courseTable td.tdCommon a {
  display: block;
}
.courseTable td.tdCommon a:hover {
  background: #fad7c8;
  color: #e5191a;
  font-weight: bold;
}
.courseTable td.tdCommon a:hover em {
  color: #e5191a;
}
.courseTable .tr1 th.th2,
.courseTable .tr1 th.th3 {
  background: #f8b551;
  font-size: 18px;
  color: #fff;
  padding: 10px;
}
.courseTable .tr1 th.th3 {
  background: #00a0e9;
}
.courseTable .tr2 .tha {
  background: #fbd295;
  font-size: 16px;
  padding: 10px;
}
.courseTable .tr2 .thb {
  background: #63c5f2;
  padding: 10px;
  font-size: 16px;
}

.courseTable .tr1 .th1 {
  background: linear-gradient(to bottom, #f8b551, #f6ab4d) !important;
}
.courseTable .tr12 .th1 {
  background: linear-gradient(to bottom, #f6ab4d, #f59947) !important;
}
.courseTable .tr22 .th1 {
  background: linear-gradient(to bottom, #f59947, #f28340) !important;
}
.courseTable .tr32 .th1 {
  background: linear-gradient(to bottom, #f28340, #ef6a37) !important;
}
.courseTable .tr42 .th1 {
  background: linear-gradient(to bottom, #ef6a37, #ec512e) !important;
}
.courseTable .tr52 .th1 {
  background: linear-gradient(to bottom, #ec512e, #e93925) !important;
}
.courseTable .tr62 .th1 {
  background: linear-gradient(to bottom, #e93925, #e6221d) !important;
}
.courseTable .tr72 .th1 {
  background: linear-gradient(to bottom, #e6221d, #e31017) !important;
}
.courseTable .tr82 .th1 {
  background: linear-gradient(to bottom, #e31017, #e20213) !important;
}

.textbook_container {
  background-color: #FFFFFF;
  outline: 1px solid #E7E7E7; /* 替代边框 */
  padding: 16px 0;
  position: relative;
}

.textbook-name{
  font-size: 17px;
  font-weight: bold;
  padding-left: 16px;
}

.resource-container {
  position: absolute; /* 绝对定位 */
  top: 50%; /* 定位到父容器的垂直中心 */
  right: 0; /* 紧贴父容器右边 */
  transform: translateY(-50%); /* 垂直居中 */
  display: flex; /* 子元素水平排列（可选） */
  gap: 10px; /* 子元素之间的间距 */
}

.resource-container > div {
  flex-grow: 1;   /* 允许容器宽度根据内容扩展 */
}
.resource-container {
  display: flex;
  justify-content: center; /* 横向居中 */
  align-items: center; /* 纵向居中 */
  gap: 10px;
  margin-right: 6px;
}
.resource-container > div img{
  width: 20px;
  display: inline-block;
  margin-right: 4px;
}
.resource-container div span{
  color: darkgrey;
}
.resource-container div:nth-child(2) {
  padding: 0 8px;
}
.resource-container div:nth-child(3) {
  margin-right: 16px;
}


.dhbtn{
  display: flex;          /* 啟用 Flexbox */
  align-items: center;    /* 垂直置中 */
  justify-content: center; /* 水平置中（如果需要） */
  height: 100%;           /* 確保高度撐滿父容器，必要時調整 */
  text-align: center;
  text-decoration: underline;
}
.studentonly{
  background-color: #EF6D20;
  color: #FFFFFF;
  font-weight: bold;
  padding: 4px;
  margin-left: 10px;
  font-size: 10px;
  border-radius: 4px;
}
.unopen{
  background-color: darkgrey;
  color: #FFFFFF;
  font-weight: bold;
  padding: 4px;
  margin-left: 4px;
  font-size: 10px;
  border-radius: 4px;
  margin-top: -2px;
}
.mBottom{
  margin-bottom: 30px;
}


@media screen and (max-width: 520px) {
  .courseTable-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* 支援觸控滑動 */
  }

  .courseTable {
    width: 100%; /* 確保在大螢幕上正常顯示 */
    min-width: 800px; /* 定義最小寬度，確保表格不會過於壓縮 */
  }
  .resource-container{
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    margin-top: 10px;
  }
  .resource-container div img{
    width: 15px;
  }
  .resource-container div span{
    margin: auto;
    text-align: center;
    display: none;
  }
  .textbook-name{
    display: block;
    margin-bottom: 4px;
  }
  .studentonly{
    margin-left: 16px;
  }
  .dhbtn{
    background-color: #EEEEEE;
    border-radius: 16px;
    padding: 8px 4px;
    text-align: center;
    margin: auto;
    text-decoration: none;
  }
  .resource-container > div:nth-child(1){
    margin-left: 16px;
  }
}

</style>