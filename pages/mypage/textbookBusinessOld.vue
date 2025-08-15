<template>
  <div>
    <div class="mt clearfix">
      <!-- 共通メニュー -->
      <div class="rightside bgf r">
        <div class="pl10 pr10 pt10 pb10 b_t b_r">
          <div v-for="(tpackage, packageIndex) in packages" :key="packageIndex">
            <div class="textBookT">NetCHINA法人教材一覧(66段)</div>
            <div class="blockT" v-for="(category, categoryIndex) in tpackage.categories" :key="categoryIndex">
                <div class="listTitle">
                  <span>{{ category.category_name }}</span>
                </div>
                    <table class="textbook-table">
                      <tr v-for="(item, itemIndex) in category.textbooks" :key="itemIndex" class="bb_d">
                        <td class="blockTitle">{{ item.title }}</td>
                        <td v-if="item.is_web == 1" class="materialArea"><a :href="item.web_url" target="_blank" class="link1">Web教材</a></td>
                        <td v-else class="materialArea">
                          <div v-for="(audio, audioIndex) in ['audio_1', 'audio_2', 'audio_3', 'audio_4', 'audio_5']">
                            <div v-if="item[audio]">
                              <a :href="item[audio]" target="_blank" class="link1">
                                <img src="" alt="" />音声{{ audioIndex + 1 }}
                              </a>
                            </div>
                          </div>
                          <div v-for="(pdf, pdfIndex) in ['pdf_1', 'pdf_2', 'pdf_3', 'pdf_4', 'pdf_5']">
                            <div v-if="item[pdf]">
                              <a :href="item[pdf]" target="_blank" class="link1">
                                <img src="" alt="" />教材{{ pdfIndex + 1 }}
                              </a>
                            </div>
                          </div>
                          <div v-for="(video, videoIndex) in ['video_1', 'video_2', 'video_3', 'video_4', 'video_5']">
                            <div v-if="item[video]">
                              <nuxt-link :to="'/mypage/textbookNcAudio?msg='+item[video]" target="_blank" class="link1">
                                <img src="" alt="" />動画{{ videoIndex + 1 }}
                              </nuxt-link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useHomeCategoryListDataApi} from "~/apis/textbook";
import {onMounted} from "vue";
import {useMainStore} from "~/composables/store";

let selected_index = ref(0);

let packages = ref([]);
let level_map_list = ref([]);
const useStore = useMainStore();
const learnType = useStore.learn_type;
const getCategorys = async () => {
  if (useStore?.studentInfo?.business_id) {
    let bid = useStore?.studentInfo?.business_id;
    let {data: courseinfos  } = await useHomeCategoryListDataApi(4,bid);
    if (courseinfos?.value) {
      packages.value = courseinfos?.value.packages ?? [];
    }
  }

};

onMounted(() => {

  getCategorys();

})
</script>

<style scoped>
.link1{
  text-decoration: underline; color: #FA8373;
  cursor: pointer;
  margin-top: 4px;
  display: block;
}

.blockT {
  margin-bottom: 30px;
  border-radius: 8px;

  /* 改進後的陰影效果 */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
}

.listTitle{
  font-weight: bold;
  font-size: 16px;
  padding: 16px;
  background-color: #EAF0F9;
  color: #333;
  border-radius: 4px;
}
.listTitle::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("../../assets/images/houbook.svg");
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 8px;
  margin-top: 1px;
  vertical-align: top;
}

.materialArea {
  text-align: right;
  vertical-align: top;
  white-space: nowrap; /* ✅ 讓內容不折行 */
}

.textbook-table{
  width: 100%;
  font-size: 15px;
}
.textbook-table td {
  padding: 10px 38px;
  vertical-align: middle;
}
.textbook-table tr{
  background-color: #FFFFFF;
  transition: background-color 0.1s ease-in-out;
}
.textbook-table a {
  display: inline-block;
  padding: 4px 8px;
  font-size: 14px;
  background-color: darkorange;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  text-decoration: none;         /* 移除超連結底線 */
  font-weight: bold;             /* 加粗字體讓更像按鈕 */
  box-shadow: 0 1px 2px rgba(0,0,0,0.2); /* 加陰影 */
  transition: background-color 0.3s, box-shadow 0.2s; /* 加動畫效果 */
}

.textbook-table a:hover {
  background-color: #FF8C42;  /* 溫和好看的橘紅 */
  box-shadow: 0 2px 3px rgba(0,0,0,0.3); /* 懸停時陰影更深 */
}
.bb_d {
  border-bottom: 1px solid #DDDDDD;
}
.textbook-table tr:hover {
  background-color: #FFF9F0; /* 淡橘色 */
}



@media screen and (max-width: 520px) {
  .blockT{
    width: 90%;
    text-align: center;
    margin: 10px auto;
  }
  .blockTitle{
    text-align: left;width: 80%;
    padding: 10px;
  }
  .link1{
    padding: 10px;
  }
  .textbook-table td{
    padding: 16px;
  }
}
</style>