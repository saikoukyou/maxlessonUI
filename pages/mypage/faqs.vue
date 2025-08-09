<template>
  <div>

    <section class="contentsWrap searchTeacher">
      <div class="help_my">
        <ul class="select_help">
          <li :class="selected_index == index ? 'selected bold' : ''" @click="changeHelp(index)" v-for="(faq,index) in faq_list">{{faq.name}}</li>
          <li style="border: 0; background: none; box-shadow: 0 0 0 rgba(0, 0, 0, 0);"></li>
      </ul>

        <div v-if="contactShow">
          <contact></contact>
        </div>
        <div v-else class="select_helpContents_my">
          <div v-if="faq_list[selected_index]">
            <h3>{{faq_list[selected_index].name}}</h3>
            <div v-if="qshow" class="helpContainer" v-for="(faq_info,findex) in faq_list[selected_index].faqs">
              <p class="title fs18" @click="openAnswer(findex)">{{faq_info.question}}
              </p>
              <!--      <NuxtLink class="link" :to="`/help-${selected_index}/${faq_info.id}`"></NuxtLink>-->
            </div>
            <div v-else class="select_helpContents">
              <div class="title fs18">
                <div v-html="faq_list[selected_index].faqs[selected_findex].question" style="display: inline-block;"></div>
              </div>
              <div class="greenBorder" v-html="faq_list[selected_index].faqs[selected_findex].answer"></div>

              <div class="HelpBackBtn" @click="goBackToQuestions">戻る</div>

            </div>
          </div>
        </div>

      </div>

    </section>

  </div>
</template>
<script setup>
import {useHomeFaqListDataApi} from "~/apis/faqs";
import Contact from "~/pages/contact.vue";
import {onMounted} from "vue";

let selected_index = ref(0);
let selected_findex = ref(0);
let qshow = ref(true);
let contactShow = ref(false);
let faq_list = ref([]);

const getHomeFaqList = async () => {
  const {pending, data: faq_infos  } = await useHomeFaqListDataApi();
  if (faq_infos?.value) {
    faq_list.value = faq_infos?.value?.list ?? [];
  }
}

function changeHelp(index) {
  selected_index.value = index;
  qshow.value = true;
  contactShow.value = false;
}

function openAnswer(findex) {
  selected_findex.value = findex;
  qshow.value = false;
  contactShow.value = false;
}

function openContact() {
  selected_index.value = faq_list.value.length;
  contactShow.value = true;
  qshow.value = false;
}

onMounted(() => {

  getHomeFaqList();

})

function goBackToQuestions() {
  qshow.value = true;
  selected_findex.value = 0; // 根據需求，你可以重置 `selected_findex` 或保留當前的
}

</script>

<style lang="scss" scoped>
.form-lable-custom {
  margin-top: 12px;
}
.select_helpContents_my {
  background-color: #ffffff;
  border-radius: 4px;
  width: 70%;
}

.select_helpContents_my .greenBorder {
  padding: 0 20px 0 20px;
  width: 90%;
  margin: 30px auto 0 auto;
}

.select_helpContents_my .title {
  font-weight: bold;
  background-color: #F4F4F4;
  width: 90%;
  align-items: center;
  margin: 0 auto 20px auto;
  font-size: 16px;
  padding: 16px;
  color: #424242;
  cursor: pointer;
}

.select_helpContents_my h3 {
  color: #424242;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  padding-top: 26px;
}
.select_helpContents .title{
  line-height: 32px;
}

@media screen and (max-width: 520px) {
  .help_my{
    grid-template-columns:inherit;
  }
  .select_help{
    margin-top: 0;
  }
  .select_help li{
    display: ruby-text;
  }
  .searchTeacher{
    padding: 6% 5% 0 5%;
  }
  .select_help{
    padding: 0;
    overflow: scroll;
  }
  .select_helpContents_my{
    width: 100%;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .HelpBackBtn{
    width: 50%;
  }
  .select_helpContents_my h3 {
    padding-top: 20px;
    font-size: 20px;
    width: 90%;
    margin: auto;
  }
}
</style>