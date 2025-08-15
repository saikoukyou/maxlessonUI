<template>

    <div class="roadmap_next">
      <img src="../../assets/images/icon_alert.png"/>
        残り課数少ないため、そろそろMYカリキュラムを更新しましょう。　
      <nuxt-link class="actionBtn" to="/mypage/roadmapMake">更新</nuxt-link>
    </div>

  <div class="blockW">
    <h5>MYカリキュラム</h5>
    <div class="des">
      ヒアリングシートと中国語テスト結果に基づいて、お客様におすすめのＭＹカリキュラムを作成しました。
      下記順番でのご受講をお勧めいたします。なお、ご受講時にＭＹカリキュラム以外の内容を利用することも可能です。
      その際は、予約時のリクエスト欄に書いて頂くか、レッスン時に直接講師にお伝えください。
      もしくはレッスン時にいつでも先生にお申し付けください。
    </div>
    <div class="desdes">
      ※ＭＹカリキュラムの構成がが合わないと思い、再度テストを受けてＭＹカリキュラムを作成したい場合はこちらをクリックしてください。<br>
      ※過去のMYカリキュラム一覧は<a>こちら</a>へ
    </div>

    <div id="app">
      <table>
        <thead>
        <tr>
          <th>順番</th>
          <th>教材ジャンル</th>
          <th>難易度</th>
          <th>課番号</th>
          <th>教材内容</th>
          <th>教材リンク</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(textbook, tindex) in routemapList" :key="tindex">
          <td>{{ tindex + 1 }}</td>
          <td>{{ textbook.courses_name }}</td>
          <td>初級上</td> <!-- Assuming fixed value as per the provided table -->
          <td>{{ textbook.reference_key }}</td>
          <td>{{ textbook.textbooks_title }}</td>
          <td>
            <span class="received" v-if="textbook.class_flag == 1">受講済み</span>
            <span v-else>未受講</span>
            ｜
            <a v-if="textbook.textbook_zip_student" :href="textbook.textbook_zip_student" target="_blank" class="link">教材へ</a>
            <a v-else :href="textbook.pdf_1" target="_blank" class="link">教材へ</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


  </div>

</template>

<script setup>
import {onMounted} from "vue";
import {useTextBooksListData} from "~/apis/teacher";

definePageMeta({
  middleware: ['roadmap-auth'],
  // layout: 'mypage'
});

let routemapList = ref([]);
const route = useRoute();

const getMapList = async(sid) => {
  const {data: textbookInfo  } = await useTextBooksListData('',5,sid);
  if (textbookInfo?.value) {
    routemapList.value = textbookInfo?.value?.list ?? [];
  }
}
onMounted(() => {
  if (route && route?.query?.sid) {
    getMapList(route?.query?.sid);
  }
})

</script>

<style scoped>
  .des{margin: 10px 0;}
  .desdes{font-size: 12px; line-height: 16px;}
  .desdes a {color: #FA8373; text-decoration: underline;}

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    color: #424242;
  }

  thead th {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: left;
  }

  tbody td {
    border: 1px solid #FFFFFF;
    padding: 10px;
    text-align: left;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  thead th:nth-child(5) {
    width: 30%; /* Increase the width of the 教材内容 column */
  }
  thead th:nth-child(6) {
    width: fit-content; /* Decrease the width of the 教材リンク column */
  }

  .received {
    color: #ABABAB;
  }

  .link {
    color: #FA8373;
    text-decoration: underline;
  }

  .link:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 520px) {
    .roadmap_next{
      width: 90%;
      margin: auto;
      height: auto;
      font-size: 14px;
      position: relative;
      padding: 10px 50px 10px 40px;
    }
    .roadmap_next img{
      position: absolute;
      top: 0;
      left: 10px;
    }
    .roadmap_next .actionBtn{
      right: 16px;
    }
  }
</style>