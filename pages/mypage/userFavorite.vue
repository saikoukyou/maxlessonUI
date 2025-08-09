<template>
    <div class="netchina_contents">

      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/userInfo"><li class="">基本情報</li></nuxt-link>
        <nuxt-link to="/mypage/userMail"><li class="">メール受信管理</li></nuxt-link>
        <nuxt-link to="/mypage/userFavorite"><li class="selected">お気に入り講師</li></nuxt-link>
        <nuxt-link to="/mypage/userProxy"><li class="">代講設定</li></nuxt-link>
        <nuxt-link to="/mypage/userProcedure"><li class="">各種お手続き</li></nuxt-link>
      </ul>
      <div class="userInfoContents">
        <div class="userMessage">最大30名まで追加できます。代講設定を「お気に入り講師で探す」に設定している場合、講師キャンセル発生時、お気に入り講師の表示順でシステムが代講検索を行います。
        </div>
        <p data-v-9af5bd41="" class="userBorder"></p>
        <div class="userInfoColumnGrid">
          <div id="sortable-list">
            <ul>
              <li class="w30" v-if="allrows.length" v-for="(teacher, index) in allrows" :key="teacher.id">
              <div class="teacherInfo">
                  <div class="teacherPhoto">
                    <div class="sortIndexWrapper">
                      <div class="sortIndex">{{ index + 1 }}</div>
                    </div>
                    <p class="heartPosition" @click="handleBookmarkToggle(teacher.teacher_id, index)">
                      <img :src="useStore?.studentInfo?.bteachers?.includes(teacher.teacher_id) ? IconHeart : IconHeartNone" alt="" />
                    </p>
                    <img :src="teacher.face_img5" alt="" class="tphoto">
                  </div>

                  <ul>
                    <li class="pinyin">{{teacher.teacher_name_pinyin}}</li>
                    <li class="name">{{ teacher.teacher_name_cn }}
                      <span class="teacherID">ID:{{teacher.teacher_id}}</span></li>
                    <span v-if="teacher.learn_type == 0" class="tagL">総合</span>
                    <span v-else class="tagS">会話</span>
                    <li class="cityT">{{teacher.province_addr}}{{teacher.current_address}}</li>
                    <li v-if="teacher.learn_type == 0">
                      <span class="sptitle">日本語</span>
                      <span class="spdes">{{teacher.japanese_level}}{{maps['japanese_level'][teacher.japanese_level]}}</span>
                      <br>
                      <span class="sptitle">英語</span>
                      <span class="spdes">{{teacher.english_level}}{{maps['english_level'][teacher.english_level]}}</span>
                    </li>
                    <li v-else>
                      <span class="sptitle">業界の得意分野</span>
                      <span class="spdes">{{teacher.topic_str}}</span>
                      <br>
                      <span class="sptitle">対応可能な方言</span>
                      <span class="spdes">{{teacher.dialect}}</span>
                    </li>
<!--                    <li>{{teacher.integral_rank}}ポイント</li>-->
                  </ul>

                </div>
                <div class="moveBtnG">
                  <button class="moveBtn moveBtn--prev" @click="moveUp(index)" :disabled="index === 0" title="移動">
                    <span class="arrow"></span>
                  </button>
                  <button class="moveBtn moveBtn--next" @click="moveDown(index)" :disabled="index === allrows.length - 1" title="移動">
                    <span class="arrow"></span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
        <n-button class="btnStyle Submit" @click="submitSort">
          <span>確定</span>
        </n-button>
        </div>
      </div>
    </div>

</template>


<script setup>
import IconHeart from "../../assets/SVG/icon_heart.svg";
import IconHeartNone from "../../assets/SVG/icon_heart_none.svg";
import {
  useBookmarkTeachersListApi, useStoreAnswerApi, useUpdateSortApi,
} from "~/apis/student";
import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NPagination, NSelect} from "naive-ui";
import {usePage} from "~/composables/usePage";
import {addBookmark} from "~/composables/useUtil";
import {onMounted} from "vue";
import Sortable from 'sortablejs'
import {useMainStore} from "~/composables/store";
const { dialog, message } = createDiscreteApi(['dialog', 'message']);

// definePageMeta({
//     middleware: 'auth',
//     layout: 'mypage'
// });
 //加载效果
const loading = ref(false)
let allrows = ref([]);
const sortable = ref();
let maps = ref([]);
const useStore = useMainStore();

const bookTeachers = async () => {
  let {
    pending,
    data,
    error,
    rows,
    total
    // refresh
  } = await usePage(() => {
    return useBookmarkTeachersListApi({
      per_page: 30,
      page: 1,
      get_count: false,
    })
  })
  if (data?.value) {
    allrows.value = rows?.value ?? [];
    maps.value = data?.value.maps ?? [];
  }

}
onMounted( () => {
  bookTeachers();

  const el = document.querySelector('#sortable-list ul')
  sortable.value = Sortable.create(el, {
    animation: 150,
    onEnd: ({ newIndex, oldIndex }) => {
      const movedItem = allrows.value.splice(oldIndex, 1)[0]
      allrows.value.splice(newIndex, 0, movedItem)
    }
  })
})

const moveUp = (index) => {
  if (index > 0) {
    // Move item up
    const movedItem = allrows.value.splice(index, 1)[0]
    allrows.value.splice(index - 1, 0, movedItem)

    // Update the UI
    // sortable.value.sort()
  }
}
const moveDown = (index) => {
  if (index < allrows.value.length - 1) {
    // Move item down
    const movedItem = allrows.value.splice(index, 1)[0]
    allrows.value.splice(index + 1, 0, movedItem)

    // Update the UI
    // sortable.value.sort();
  }
}
const handleBookmarkToggle = (teacher_id, index) => {
  const useStore = useMainStore();
  const currentBookmarks = useStore?.studentInfo?.bteachers ?? [];
  const isBookmarked = currentBookmarks.includes(teacher_id);

  // 如果是要取消收藏，才跳出彈窗確認
  if (isBookmarked) {
    dialog.warning({
      title: "お気に入り解除",
      content: "この講師をお気に入りから削除してもよろしいですか？",
      positiveText: "はい",
      negativeText: "いいえ",
      onPositiveClick: async () => {
        await toggleBookmark(teacher_id, index);
      }
    });
  } else {
    // 如果是新增收藏，直接執行
    toggleBookmark(teacher_id, index);
  }
}

const toggleBookmark = async (teacher_id, index) => {
  const useStore = useMainStore();
  const currentBookmarks = useStore?.studentInfo?.bteachers ?? [];
  const isBookmarked = currentBookmarks.includes(teacher_id);

  const { data: res } = await useAddBookmarkApi(teacher_id);

  if (res?.value?.err === false) {
    await useStore.useRefreshUserInfo();
    message.success(res?.value?.err_msg);

    if (isBookmarked) {
      allrows.value.splice(index, 1); // 移除畫面上的講師
    }
  } else {
    message.error(res?.value?.err_msg);
  }
}


async function submitSort() {
  let sortArr = ref([]);
  for(var i = 0; i < allrows.value.length; i ++) {
    sortArr.value[i] = {'id' : allrows.value[i]['id'],'sort' : i};
  }
  // console.log('allrows.value:'+JSON.stringify(allrows.value));
  // console.log('sortArr:'+JSON.stringify(sortArr.value));

  const { data: data} = await useUpdateSortApi({'sortArr' : sortArr.value});
  if (data.value.err === false) {
    const { message } = createDiscreteApi(["message"]);
    message.success('修改成功');
  }
}

</script>
<style lang="scss" scoped>
.sptitle{
  padding: 2px 4px;
}
.sortIndexWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border-top-left-radius: 4px;
  overflow: hidden;
  z-index: 2;
}
.sortIndex {
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  z-index: 2;
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 4px 0 0 6px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-top: 36px solid #ff9800;
    border-right: 36px solid transparent;
    z-index: -1;
  }
}
.heartPosition{
  position: absolute;
  bottom: 10px;
  right: 26px;
}
.heartPosition img{
  width:20px;
  cursor: pointer;
  opacity: 0.9;
}
.heartPosition img:hover{
  width:20px;
  cursor: pointer;
  opacity: 1;
}
.teacherPhoto {
  position: relative;
  padding: 10px 0 4px 0;
}

.cnRibbon{
  left: 20px;
}
.n-input:not(.n-input--autosize) {
  width: 30%;
}
.n-select {
  width: 30%;
}
.userInfoColumnGrid{
  line-height: normal;
}
.userMessage{
  padding: 40px 40px 20px 40px;
  font-size: 14px;
  line-height: 20px;
}
.userInfoContents{
  padding-bottom: 20px;
}
.userInfoContents .teacherInfo{
  display: block;
}

#sortable-list ul li{
  display: inline-block;
  vertical-align: top;
  margin-right: 1%;
  letter-spacing: 0;
}

#sortable-list ul li.cityT{
  display: block;
  margin-top: -4px !important;
  margin-bottom: 4px !important;
}
#sortable-list ul li:nth-child(5n) {
  margin-right: 0;
}
.userInfoColumnGrid{
  padding: 10px 40px;
  margin-bottom: 0;
}
.userInfoContents .teacherInfo>a>img{
  margin: 10px auto;
}
.userInfoContents .teacherInfo .favorite{
  margin: auto;
  display: block;
}
.teacherInfo .favorite{
  top: auto;
  margin: auto;
  line-height: 26px;
  letter-spacing: 0;
}
.teacherInfo{
  display: block;
}
.userInfoContents .teacherInfo .favorite img{
  margin-top: 2px;
  width: 14px;
  height: 14px;
}
.teacherInfo ul{
  margin-left: 0;
}
.userInfoContents .teacherInfo ul{
  padding: 0 20px;
}
.userInfoContents .teacherInfo ul li{
  padding-bottom: 0;
}
.userInfoContents .teacherInfo ul .name{
  margin-bottom: 0;
}
.teacherInfo ul .cityT{
  margin: 2px 0;
}
.teacherInfo ul .pinyin{
  margin: 0;
}
.moveBtnG{
  width: 80%;
  margin: auto;
}
.moveBtn {
  padding: 4px 16px;
  margin: 8px 4px;
  font-size: 16px;
  line-height: 1;
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.moveBtn .arrow::before {
  content: "←"; // 預設為桌面用的左右箭頭
}

.moveBtn--next .arrow::before {
  content: "→";
}

.moveBtn:hover:not(:disabled) {
  background-color: #ddd;
}

.moveBtn:disabled {
  background-color: #eee;
  color: #aaa;
  cursor: not-allowed;
}

.w30 {
  width: 19%;
  min-height: 340px;
  border: 1px solid #f4f4f4;
  transition: border 0.1s ease, box-shadow 0.1s ease;
  background-color: #f9f9f9;
  vertical-align: top;
  border-radius: 6px;
  margin-bottom: 2%;
}

.n-button__content{
  width: 30%;
  margin: auto;
}
.btnStyle{
  display: block;
  margin: 0 auto 30px auto;
}
.btnStyle span{
  display: block; margin: auto;
}
.teacherPhoto{
  margin-left: auto;
}
.teacherInfo .tphoto{
  overflow: hidden;
  object-fit: cover;
  margin: auto;
  border: 0;
}
.teacherInfo .tagL{
  position: relative;
  padding: 1px 5px;
  margin: 0 0 4px 0;
  font-size: 10px;
}
.teacherInfo .tagS{
  position: relative;
  padding: 1px 5px;
  margin: 0 0 4px 0;
  font-size: 10px;
}

@media screen and (max-width: 520px) {
  .moveBtn{
    padding: 12px 40px;
  }
  .moveBtn .arrow::before {
    content: "↑";
  }

  .moveBtn--next .arrow::before {
    content: "↓";
  }
  .heartPosition{
    top: 10px;
    right: 8px;
  }
  .cnRibbon{
    left: 0;
  }
  .w30{
    width: 100%;
    min-height: auto;
    padding: 4% 0;
  }
  .userInfoContents .teacherInfo ul{
    display: inline-block;
    padding: 0 0 0 16px;
  }
  .userInfoContents .teacherInfo>a>img{
    display: inline-block;
    width: 110px;
    height: 110px;
    margin: 0 20px 20px 36px;
  }
  .teacherInfo{
    display: grid !important;
    width: auto;
    grid-template-rows:auto ;
  }
  .teacherPhoto{
    margin-left: auto;
    padding: 0;
  }
  .teacherInfo .tphoto{
    width: 116px;
    height: 116px;
    margin: 0;
    object-fit: cover;
  }
  .teacherInfo .tagL{
    display: block;
  }
  .teacherInfo .tagS{
    display: block;
  }
  .moveBtnG{
    text-align: center;
  }
}

</style>