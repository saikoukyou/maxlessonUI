<template>
  <div class="overview topTemplate">
    <section class="PlanPrice">
      <div class="PlanPrice__inner">
      <div class="subPosition">
        <span class="subTitle">特定商取引法に基づく表記</span>
      </div>
      </div>
    </section>

    <div class="table-container">
      <table>
        <tbody>
        <tr>
          <th>社名</th>
          <td>株式会社ネットスター</td>
        </tr>
        <tr>
          <th>住所</th>
          <td>〒111-0052 東京都台東区柳橋2-14-4 セントラルビル4階</td>
        </tr>
        <tr>
          <th>代表</th>
          <td>斉　紅強</td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td>03-6380-8893</td>
        </tr>
        <tr>
          <th>お問い合わせ先</th>
          <td>info@netkorea.jp</td>
        </tr>
        <tr>
          <th>支払方法</th>
          <td>•クレジットカード　•銀行振込　•PayPay</td>
        </tr>
        <tr>
          <th>販売価格</th>
          <td>原則、税抜き価格と税込価格同時表示しておりますが、税に関する表示がない場合、税抜き価格となります。</td>
        </tr>
        <tr>
          <th>レッスン料金以外の必要料金・手数料</th>
          <td>振り込み手数料や送金手数料はお客様負担となります。</td>
        </tr>
        <tr>
          <th>お引き渡し</th>
          <td>入金が確認でき次第、お客様マイページに反映されます。ご入金確認の通知メールを持ちまして引渡しとなります。</td>
        </tr>
        <tr>
          <th>返品について</th>
          <td>サービスの性質上、返品はできません。</td>
        </tr>
        </tbody>
      </table>
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