<template>
  <div>
    <div class="mt clearfix">
      <!-- 共通メニュー -->
      <div class="rightside bgf r">
        <div class="pl10 pr10 pt10 pb10 b_t b_r">
          <div v-for="(tpackage, packageIndex) in packages" :key="packageIndex">
            <h3 class="f16 title01 pl10 pb10">
              <span class="dnb v_m pt10 pb10">{{ tpackage.title }}</span>
            </h3>
            <div v-for="(category, categoryIndex) in tpackage.categories" :key="categoryIndex">
              <div class="bod">
                <div class="bgcolor f16 c_title c_p" style="border-bottom: none;">
                  <span class="t_c dnb bgc02 pspan">
                    <img src="" alt="" />
                  </span>
                  <span class="pl10">{{ category.category_name }}</span>
                </div>
                <div class="c_box">
                  <div class="mt lh30 pl10 pr10 pb10 f14 t_c">
                    <table style="width:100%;">
                      <tr v-for="(item, itemIndex) in category.textbooks" :key="itemIndex" class="bb_d">
                        <td style="text-align: left;width: 50%;">{{ item.title }}</td>
                        <td v-if="item.is_web == 1"><a :href="item.web_url" target="_blank" class="link1">Web教材</a></td>
                        <td v-else style="text-align: left;">
                          <div v-for="(audio, audioIndex) in ['audio_1', 'audio_2', 'audio_3', 'audio_4', 'audio_5']">
                            <div v-if="item[audio]">
                              <a :href="item[audio]" target="_blank" class="link1">
                                <img src="" alt="" />音声{{ audioIndex + 1 }}
                              </a>
                            </div>
                          </div>
                          <div v-for="(pdf, pdfIndex) in ['pdf_1', 'pdf_2', 'pdf_3', 'pdf_4', 'pdf_5','pdf_1_backup']">
                            <div v-if="item[pdf]">
                              <a v-if="pdf === 'pdf_1_backup'" :href="item[pdf]" target="_blank" class="link1">
                                <img src="" alt="" />教材{{ pdfIndex + 1 }}(备用)
                              </a>
                              <a v-else :href="item[pdf]" target="_blank" class="link1">
                                <img src="" alt="" />教材{{ pdfIndex + 1 }}
                              </a>
                            </div>
                          </div>
                          <div v-for="(video, videoIndex) in ['video_1', 'video_2', 'video_3', 'video_4', 'video_5']">
                            <div v-if="item[video]">
                              <nuxt-link :to="'/teacher/center/textbookNcAudio?msg='+item[video]" target="_blank" class="link1">
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
const route = useRoute();

const getCategorys = async () => {
  if (route && route?.query?.bid) {
    let bid = route?.query?.bid;
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
/* 样式代码保持不变 */
</style>