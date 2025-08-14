<template>
  <div class="overview topTemplate">
    <section class="PlanPrice">
      <div class="subPosition">
        <span class="subTitle">会社概要</span>
      </div>
    </section>

    <div class="planTitleFront">オンライン韓国語教室NetKOREAの運営会社について</div>

    <div class="table-container">
      <table>
        <tbody>
        <tr>
          <th scope="row">販売事業所名</th>
          <td>
            株式会社ネットスター
            </td>
        </tr>
        <tr>
          <th scope="row">所属</th>
          <td>　<img alt="" height="43" src="https://s3.ap-northeast-1.amazonaws.com/production.netchina.jp/textbooks/material/1a703455-9350-40cd-bcbe-db1ff55e2c42.png" width="216" />
            株式会社ネットスターは日本青少年育成協会の会員です。</td>
        </tr>
        <tr>
          <th scope="row">設立</th>
          <td>
            2014年6月
            </td>
        </tr>
        <tr>
          <th scope="row">
            資本金
            </th>
          <td>5,000,000円</td>
        </tr>
        <tr>
          <th scope="row">
            運営責任者
            </th>
          <td>斉　紅強</td>
        </tr>
        <tr>
          <th scope="row">
            所在地
            </th>
          <td>〒111-0052
            東京都台東区柳橋2丁目14-4　セントラルビル4階</td>
        </tr>
        <tr>
          <th scope="row">
            電話番号
            </th>
          <td>03-6380-8893
            <span style="color:#c0392b;">お問い合わせはお問い合わせフォームよりお願いします。</span></td>
        </tr>
        <tr>
          <th scope="row">
            E-mail
            </th>
          <td>info@netkorea.jp</td>
        </tr>
        <tr>
          <th scope="row">
            URL
            </th>
          <td><a href="https://www.bizchina.jp/">https://www.bizchina.jp/</a>
            <br>
            <a href="https://www.netkorea.jp/">https://www.netkorea.jp/</a></td>
        </tr>
        <tr>
          <th scope="row">
            事業内容
            </th>
          <td>オンライン中国語研修サービス<br>オンライン韓国語研修サービス</td>
        </tr>
        <tr>
          <th scope="row">
            商品代金以外の必要料金
            </th>
          <td>オンラインレッスンのため、送料等はかかりません。月会費以外の料金はかかりません。</td>
        </tr>
        <tr>
          <th scope="row">お支払い方法</th>
          <td>銀行振込
            クレジットカード決済 （Paypalを利用）</td>
        </tr>
        <tr>
          <th scope="row">代金の支払い時期</th>
          <td>銀行振込：初回申し込みから７日以内に90日分のお支払いが発生します。以降90日単位にて月会費が発生します。
            クレジットカード決済：初回は申し込み時、次月以降30日単位にて請求します。  </td>
        </tr>
        <tr>
          <th scope="row">商品の引渡し時期</th>
          <td>クレジットカード：注文後、すぐにご利用開始となります。
            銀行振込：入金確認後、3営業日以内にご利用可能です。</td>
        </tr>
        <tr>
          <th scope="row">返品・交換不良品・解約について</th>
          <td>商品特性上、返金・についてはお受けできません。
            退会をご希望の場合、毎月課金日7日前までに退会のお手続きを行ってください。
            詳細はこちらのページに参考してください。<a href="#" @click="goBlogInfo(20)">退会手続き</a></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="planDes">皆様に満足度の高い韓国語レッスンを提供するために、スタッフ一同、全力を尽くしますので、よろしくお願いします。
    </div>

  </div>
</template>



<style scoped>
/* Table container styling */
.table-container {
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  color: #333;
  width: 1000px;
  margin: 30px auto;
}

/* Table header styling */
.table-container th {
  background-color: #ffe5cc;
  color: #c0392b;
  padding: 16px;
  text-align: left;
  font-weight: bold;
  border: 1px solid #ddd;
  width: 200px;
}

/* Table row styling */
.table-container td {
  padding: 16px;
  border: 1px solid #ddd;
}

/* Alternate row color */
.table-container tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.overview{
  margin-bottom: 50px;
}

/* Responsive styling for screens 520px or narrower */
@media (max-width: 520px) {
  .table-container{
    width: 90%;
    margin: 10% auto;
  }
  .table-container table {
    width: 100%;
    border-collapse: collapse;
  }

  /* Stack the headers and content vertically */
  .table-container th, .table-container td {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  /* Style table rows for clarity */
  .table-container tr {
    display: block;
    margin-bottom: 10px;
  }

  /* Align table headers and data separately */
  .table-container th {
    background-color: #ffe5cc;
    color: #c0392b;
    font-weight: bold;
    padding: 10px;
    text-align: left;
  }

  .table-container td {
    padding: 10px;
    border: none;
    background-color: #fff;
  }

  .planTitleFront{
    width: 90%;
    margin: 30px auto 0 auto;
  }
  .planDes{
    width: 86%;
    margin: 30px auto 0 auto;
    line-height: 1.3rem;
  }
}

</style>

<script setup lang="ts">
function goBlogInfo(bid) {
  const encodedBid = btoa(encodeURIComponent(bid+''));
  navigateTo({path:'/blog/info',query:{
      bid: encodedBid,
    }}, { replace: true })
}
</script>