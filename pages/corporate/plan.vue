<template>
	<NuxtLayout name="corporate">
    <div class="plan-toggle">
      <div class="slider" :style="{ transform: selected_plan === 1 ? 'translateX(100%)' : 'translateX(0%)' }"></div>
      <button :class="{ active: selected_plan === 0 }" @click="changePlan(0)">
        法人研修プラン
      </button>
      <button :class="{ active: selected_plan === 1 }" @click="changePlan(1)">
        自己啓発プラン
      </button>
    </div>

    <div v-if="selected_plan === 0" class="plan-content corporate-plan">
      <div class="background-image">
        <h2>法人研修プラン</h2>
        <p>貴社と弊社で契約するプランです。</p>
      </div>
      <n-card title="">
        <n-tabs type="line" animated>
          <n-tab-pane name="plan" tab="法人研修プラン">
            <div>
              <div class="scTitle">1対１中国語レッスン</div>
              <div>
                <n-table :bordered="false" :single-line="false" class="table-style1">
                  <thead>
                  <tr>
                    <th>プラン名</th>
                    <th>レッスン数</th>
                    <th>月額料金</th>
                    <th>最低契約人数</th>
                    <th>最低契約期間</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(plan) in plist">
                    <td style="background-color: #3682E0;">{{plan.name}}</td>
                    <td>{{plan.lesson}}</td>
                    <td>{{plan.amount}}円(税込)</td>
                    <td>{{plan.low_pnum}}名~</td>
                    <td>{{plan.low_mnum}}ヶ月~</td>
                  </tr>
                  </tbody>
<!--                  <tbody>-->
<!--                  <tr>-->
<!--                    <td style="background-color: #3682E0;">月8回</td>-->
<!--                    <td>25分×8回</td>-->
<!--                    <td>9,998円（税込）</td>-->
<!--                    <td>1名～</td>-->
<!--                    <td>3ヶ月～</td>-->
<!--                  </tr>-->
<!--                  <tr>-->
<!--                    <td style="background-color: #3682E0;">月16回</td>-->
<!--                    <td>25分×16回</td>-->
<!--                    <td>16,980円（税込）</td>-->
<!--                    <td>1名～</td>-->
<!--                    <td>3ヶ月～</td>-->
<!--                  </tr>-->
<!--                  <tr>-->
<!--                    <td style="background-color: #3682E0;">每日1回</td>-->
<!--                    <td>毎日25分×1回</td>-->
<!--                    <td>23,980円（税込）</td>-->
<!--                    <td>1名～</td>-->
<!--                    <td>3ヶ月～</td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
                </n-table>
              </div>
            </div>

            <div v-if="plist.length">
              <div class="subTitle">研修費用イメージ</div>
              <div class="toggle-container">
                <div class="toggle-buttons">
                  <button
                      v-for="(pname,pindex) in plist"
                      :class="pindex == selected_image_plan ? 'active' : ''" @click="changeImagePlan(pindex)">
                    {{pname.name}}
                  </button>
                  <!--                <button-->
                  <!--                    :class="{ active: selectedOption === 'month16' }"-->
                  <!--                    @click="selectOption('month16')"-->
                  <!--                >-->
                  <!--                  月16日-->
                  <!--                </button>-->
                  <!--                <button-->
                  <!--                    :class="{ active: selectedOption === 'everyday' }"-->
                  <!--                    @click="selectOption('everyday')"-->
                  <!--                >-->
                  <!--                  每日1回-->
                  <!--                </button>-->
                </div>
                <div class="pricing-table">
                  <table>
                    <thead>
                    <tr>
                      <th>人数</th>
                      <th>
                        {{plist[selected_image_plan].pnum1}}名
                      </th>
                      <th>
                        {{plist[selected_image_plan].pnum2}}名
                      </th>
                      <th>
                        {{plist[selected_image_plan].pnum3}}名
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>月額料金（税込）</td>
                      <td>
                        {{plist[selected_image_plan].total_amount1}}円
                      </td>
                      <td>
                        {{plist[selected_image_plan].total_amount2}}円
                      </td>
                      <td>
                        {{plist[selected_image_plan].total_amount3}}円
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!-- Static Data in Template -->
<!--                <div style="display: none;">-->
<!--                  <div id="month8">-->
<!--                    <span data-people="30名" data-amount="299,940円"></span>-->
<!--                    <span data-people="50名" data-amount="499,900円"></span>-->
<!--                    <span data-people="100名" data-amount="999,800円"></span>-->
<!--                  </div>-->
<!--                  <div id="month16">-->
<!--                    <span data-people="30名" data-amount="599,880円"></span>-->
<!--                    <span data-people="50名" data-amount="999,800円"></span>-->
<!--                    <span data-people="100名" data-amount="1,999,600円"></span>-->
<!--                  </div>-->
<!--                  <div id="everyday">-->
<!--                    <span data-people="30名" data-amount="899,820円"></span>-->
<!--                    <span data-people="50名" data-amount="1,499,700円"></span>-->
<!--                    <span data-people="100名" data-amount="2,999,400円"></span>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </div>

<!--            <div v-if="plist.length">-->
<!--              <div class="subTitle">研修費用イメージ</div>-->
<!--              <div>-->
<!--                <span v-for="(pname,pindex) in plist" :class="pindex == selected_plan ? 'active' : ''" @click="changgePlan(pindex)">{{pname.name}}</span></div>-->
<!--              <div>-->
<!--                <n-table :bordered="false" :single-line="false">-->
<!--                  <tbody>-->
<!--                  <tr>-->
<!--                    <td>人数</td>-->
<!--                    <td>{{plist[selected_plan].pnum1}}名</td>-->
<!--                    <td>{{plist[selected_plan].pnum2}}名</td>-->
<!--                    <td>{{plist[selected_plan].pnum3}}名</td>-->
<!--                  </tr>-->
<!--                  <tr>-->
<!--                    <td>月額料金(税込)</td>-->
<!--                    <td>{{plist[selected_plan].total_amount1}}円</td>-->
<!--                    <td>{{plist[selected_plan].total_amount2}}円</td>-->
<!--                    <td>{{plist[selected_plan].total_amount3}}円</td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
<!--                </n-table>-->
<!--              </div>-->
<!--            </div>-->
            <div>
              <div class="scTitle">ビデ才動画学習</div>
              <div>
                <n-table :bordered="false" :single-line="false" class="table-style3">
                  <thead>
                  <tr>
                    <th>プラン名</th>
                    <th>月視聴上限</th>
                    <th>月額料金</th>
                    <th>最低契約人数</th>
                    <th>最低契約期間</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(video) in vlist">
                      <td style="background-color: #3476E0;">{{video.name}}</td>
                      <td>{{video.lesson}}</td>
                      <td>{{video.amount}}円(税込)</td>
                      <td>{{video.low_pnum}}名~</td>
                      <td>{{video.low_mnum}}ヶ月~</td>
                    </tr>
                  </tbody>
<!--                  <tbody>-->
<!--                  <tr>-->
<!--                    <td style="background-color: #3476E0;">中国語学習</td>-->
<!--                    <td>30コマ</td>-->
<!--                    <td>6,480円（税込）</td>-->
<!--                    <td>1名～</td>-->
<!--                    <td>3ヶ月～</td>-->
<!--                  </tr>-->
<!--                  <tr>-->
<!--                    <td style="background-color: #3476E0;">異文化理解講座</td>-->
<!--                    <td>30コマ</td>-->
<!--                    <td>8,480円（税込)</td>-->
<!--                    <td>1名～</td>-->
<!--                    <td>3ヶ月～</td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
                </n-table>
              </div>
            </div>
          </n-tab-pane>

        </n-tabs>
      </n-card>

      <div class="scTitle">オプション</div>

      <div class="p724">
      <div class="optionBlock">
        <img src="../../assets/images/option1.png" height="190"/>
        <span class="tt">モニタリングサイト</span>
        <span class="des">法人契約企業様には、受講モニタリングサービスを有償提供しております。サイトより受講のお申込み、また受講状況・登録状況のご確認や、受講者様へ受講を促すメールを送信することも可能です。効率的に研修を運用管理することができます。</span>
      </div>

        <div class="optionBlock fright">
          <img src="../../assets/images/option2.png" height="190"/>
          <span class="tt">異文化理解講座</span>
          <span class="des">独自進化が激しい中国の異文化について、「知ってる」と「知らない」で仕事で大差がつきます。中国ビジネスに密着した内容を動画研修講座としてご提供します。動画講座1課毎に小テストがついており、学習効果の可視化も実現。</span>
        </div>

        <div class="optionBlock">
          <img src="../../assets/images/option3.png" height="190"/>
          <span class="tt">中国語動画レッスン</span>
          <span class="des">中国語の勉強にインプット（覚える）とアウトプット（話す）が欠かせません。インプットの部分は講師と一緒に進めることは無論可能だが、気軽に独学で予習復習のため、文法と単語の教材内容をそれぞれ数百課分の動画教材をご提供しています。</span>
        </div>

        <div class="optionBlock fright">
          <img src="../../assets/images/option4.png" height="190"/>
          <span class="tt">66段階学習法</span>
          <span class="des">中国語0基礎からHSK5級レベル相当までの学習を66の段階に分けて、確実に上達するカリキュラムを実現しました。さらに、1段毎にテストとFBレポートも提供しています。受講者一人一人に合わせて、66段階学習法に基づいたロードマップを作成することで、オーダーメイドの学習プランをご提供します。</span>
        </div>
      </div>

      <div class="scTitle">ご利用の流れ</div>
      <ul class="stepBlock">
        <li><span>企業様のニーズを把握</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>研修プランの作成</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>ご提案お見積り</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>ご発注</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>受講開始前テスト</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>ご受講開始</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
      </ul>

    </div>

    <div v-if="selected_plan === 1" class="plan-content self-development-plan">
      <div class="background-image">
        <h2>自己啓発プラン</h2>
        <p>従業員様が直接お申込みいただくプラン</p>
      </div>
      <div class="selfTitle">
        ご利用の流れ貴社従業員様向けに特別割引プランをご提供いたします。導入に費用は一切かかりません。社員様向けに告知していただければ、すぐにご利用開始できます。
      </div>

      <div class="w720">
      <div class="selfPoint fleft">
        <img src="../../assets/images/self1.png" width="100"/>
        <span>貴社専用お申込サイト</span>
      </div>
      <div class="selfPoint m24">
        <img src="../../assets/images/self2.png" width="100"/>
        <span>導入費用無料</span>
      </div>
      <div class="selfPoint fright">
        <img src="../../assets/images/self3.png" width="100"/>
        <span>特別割引プラン</span>
      </div>
      </div>

      <div class="scTitle">ご利用の流れ</div>
      <ul class="stepBlock">
        <li><span>お問い合わせ</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>法人企業登録</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>貴社専用申し込みサイト作成</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>社内のご告知</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
        <li><span>受講開始</span>御社中国語研修の導入目的や研修現状及び課題をお聞きし、導入ニーズを把握します。</li>
      </ul>

    </div>

		<div>
		</div>
    <GotoTop />
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBusinessShowPlanListDataApi } from "~/apis";
import { useBizListApi } from "~/apis/corporate";
import { NTable, NButton } from 'naive-ui';

definePageMeta({
  layout: false,
  middleware: ["only-visitor-corporate"]
});

const selected_plan = ref(0);
const tableData = ref([]);
const plist = ref([]);
const vlist = ref([]);
let title = ref('');
const selected_image_plan = ref(0);

const columns = [
  { title: 'プラン名', key: 'name' },
  { title: 'レッスン数', key: 'lessons' },
  { title: '月額料金', key: 'price' },
  { title: '最低契約人数', key: 'min_people' },
  { title: '最低契約期間', key: 'min_period' },
];

onMounted(async () => {
  // API 1: Fetch business show plan list data
  let { data: planData, error: planError } = await useBusinessShowPlanListDataApi();
  if (planData?.value) {
    tableData.value = planData.value.plans ?? [];
    plist.value = planData.value.plans ?? [];
    vlist.value = planData.value.videos ?? [];
  }

  // API 2: Fetch additional biz list data if needed
  // let { data: bizData, error: bizError } = await useBizListApi();
  // if (bizData?.value) {
  //   // 假設你需要對 bizData 做一些處理，可以在這裡添加
  //   // plist 或 vlist 等其他數據可以在這裡進行合併
  // }
});

function changePlan(index) {
  selected_plan.value = index;
  title.value = index === 0 ? '法人研修プラン' : '自己啓発プラン';
}

function changeImagePlan(index) {
  selected_image_plan.value = index;
}
</script>


<style scoped lang="scss">
.plan-toggle {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 380px;
  padding: 5px;
  border-radius: 30px;
  background-color: #FFFFFF;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 防止滑動效果溢出 */
  z-index: 999;
  text-align: center;
  margin: 50px auto 0 auto;

  button {
    flex: 1;
    z-index: 1; /* 保证按钮位于滑动效果之上 */
    padding: 10px 10px 10px 0;
    border: none;
    border-radius: 25px;
    background-color: transparent;
    color: #999;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s;

    &.active {
      color: white;
    }
  }

  .slider {
    position: absolute;
    top: 5px;
    left: 6px;
    width: 48.5%; /* 初始宽度为一半 */
    height: calc(100% - 10px);
    border-radius: 25px;
    background-color: #007bff; /* 蓝色背景 */
    transition: transform 0.3s ease; /* 滑动效果 */
  }
}


.plan-content {
  color: #FFFFFF;
  position: relative;
  margin-top: -98px;
  background-color: #EAF0F9;

  .background-image {
    height: 300px;
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
    opacity: 0; /* 初始時不顯示 */
    transition: opacity 0.5s ease-in-out; /* 使用 opacity 进行过渡 */
  }

  &.corporate-plan .background-image {
    background-image: url('../../assets/images/img_houjinplan.png');
    opacity: 1; /* 切換到此背景時顯示 */
  }

  &.self-development-plan .background-image {
    background-image: url('../../assets/images/img_selfplan.png');
    opacity: 1; /* 切換到此背景時顯示 */
  }

  h2 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 34px;
    font-weight: bold;
    padding-top: 136px;
    transition: opacity 0.5s ease-in-out; /* 确保标题也有平滑过渡 */
  }

  p {
    text-align: center;
    font-size: 18px;
    transition: opacity 0.5s ease-in-out; /* 确保文本也有平滑过渡 */
  }
}

.p724{
  width: 724px; margin: auto;
}

.w720{
  width: 720px;
  margin: 30px auto 0 auto;
}

.m24{
  margin-left: 24px;
}

.scTitle{
  background-image: url("../../assets/images/circleTitle.png");
  background-repeat: no-repeat;
  background-size:60px;
  background-position: left 30px;
  font-family: Murecho;
  font-size: 32px;
  font-weight: bold;
  color: #2E6190;
  padding:40px 0 20px 24px;
  width: fit-content;
  margin: 10px auto 5px auto;
  text-align: center;
}

.subTitle{
  font-family: Murecho;
  font-size: 21px;
  font-weight: bold;
  color: #2E6190;
  padding:30px 0 16px 0;
  width: fit-content;
  margin: auto;
  text-align: center;
}

.fleft{
  float: left;
}
.fright{
  float: right;
}

.table-style1,
.table-style2,
.table-style3 {
  width: 725px;
  margin: auto;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.table-style2{
  margin-bottom: 80px;
}

.table-style1 th,
.table-style2 th,
.table-style3 th,
.table-style1 td,
.table-style2 td,
.table-style3 td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.table-style1 th,
.table-style2 th,
.table-style3 th {
  background-color: #2b5d9f;
  color: white;
}

.table-style1 tbody tr:nth-child(odd),
.table-style2 tbody tr:nth-child(odd),
.table-style3 tbody tr:nth-child(odd) {
  background-color: #f5f5f5;
}

.table-style1 tbody tr:nth-child(even),
.table-style2 tbody tr:nth-child(even),
.table-style3 tbody tr:nth-child(even) {
  background-color: #e7eff9;
}

.table-style1 td:first-child,
.table-style2 td:first-child,
.table-style3 td:first-child {
  background-color: #2b5d9f;
  color: white;
  font-weight: bold;
}

.table-style2 th:first-child,
.table-style2 td:first-child {
  background-color: #2b5d9f;
  color: white;
}

.table-style1 th:first-child,
.table-style3 th:first-child {
  border-radius: 0;
}

.table-style1 th:last-child,
.table-style3 th:last-child {
  border-radius: 0;
}

.table-style1 td:last-child,
.table-style3 td:last-child {
  border-radius: 0;
}

.table-style1 td:first-child,
.table-style3 td:first-child {
  border-radius: 0;
}

.table-style2 th:first-child,
.table-style2 td:first-child,
.table-style2 th:last-child,
.table-style2 td:last-child {
  border-radius: 0;
}

.optionBlock{
  width: 354px; position: relative; display: inline-block;
  height: 370px; background-color: #ffffff;
  color: #424242;
  border-radius: 8px;
  margin-bottom: 16px;
}
.optionBlock img{
  border-radius: 8px 8px 0 0;
}
.optionBlock .tt{
  display: block;
  font-size: 18px;
  color: #2E6190;
  font-weight: bold;
  margin: 20px 0 5px 20px;
}
.optionBlock .des{
  font-size: 13px;
  display: block;
  margin: 0 20px;
  line-height: 18px;
}
.stepBlock{
  margin: auto;
  width: 750px;
  }
.stepBlock li{
  height: 76px;
  background-color: #FFFFFF;
  color: #424242;
  padding: 20px 30px 0 180px;
  line-height: 20px;
  margin-bottom: 14px;
  background-repeat: no-repeat;
  background-size: 148px;
  background-position: left top;
  border-radius: 8px;
}
.stepBlock li:nth-child(1){background-image: url("../../assets/images/img_s1.png");}
.stepBlock li:nth-child(2){background-image: url("../../assets/images/img_s2.png");}
.stepBlock li:nth-child(3){background-image: url("../../assets/images/img_s3.png");}
.stepBlock li:nth-child(4){background-image: url("../../assets/images/img_s4.png");}
.stepBlock li:nth-child(5){background-image: url("../../assets/images/img_s5.png");}
.stepBlock li:last-child{background-image: url("../../assets/images/img_s6.png"); margin-bottom: 0;}

.corporate-plan,
.self-development-plan{
  padding-bottom: 50px;
}



.selfTitle{
  width: 750px; margin: auto; font-size: 22px; text-align: center;
  color: #3682E0; font-weight: bold; font-family: Murecho;
  line-height: 36px;
  padding-top: 16px;
}

.selfPoint{
  width: 224px; height: 224px; border-radius: 224px;
  background-color: #FFFFFF;
  text-align: center;
  color: #2E6190;
  font-size: 17px;
  line-height: 24px;
  font-weight: bold;
  display: inline-block;
}
.selfPoint img{margin: 0 auto 4px auto; padding-top: 30px;}

.selfPoint span{
  display: block;
  height: 42px;
  line-height: 42px;
}

.toggle-container {
  width: 100%;
  max-width: 724px;
  margin: 0 auto 40px auto;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-buttons button {
  background-color: #e0e0e0;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 15px;
  color: #A7A7A7;
  font-weight: bold;
}

.toggle-buttons .active {
  background-color: #3682E0;
  color: white;
}

.pricing-table {
  width: 100%;
}

.pricing-table table {
  width: 100%;
  border-collapse: collapse;
}

.pricing-table th,
.pricing-table td {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 15px;
  width: 25%;
}

.pricing-table th {
  background-color: #004c91;
  color: white;
}

.pricing-table td {
  background-color: #f8f9fa;
}

.pricing-table tbody{
  color: #424242;
  background-color: #F6FAFF;
}

@media screen and (max-width: 520px) {

  .plan-toggle{
    width: 80%;
    font-size: 16px;
  }

  .table-style1,
  .table-style2,
  .table-style3 {
    width: 90%; /* 表格滿版 */
    font-size: 12px; /* 縮小字體 */
  }

  .pricing-table th,
  .pricing-table td {
    font-size: 12px;
    padding: 8px;
  }

  .p724{
    width: 90%;
  }
  .optionBlock{
    height: fit-content;
    font-size: 15px;
    padding-bottom: 5%;
  }
  .stepBlock{
    width: 90%;
    margin: auto;
  }
  .stepBlock li{
    height: fit-content;
    padding-bottom: 20px;
  }
  .selfTitle{
    width: 90%;
    margin: auto;
  }
  .m24{
    margin: auto;
  }
  .fleft{
    float: none;
  }
  .fright{
    float: none;
  }
  .w720{
    width: 100%;
  }
  .selfPoint{
    display: block;
    width: 90%;
    height: fit-content;
    border-radius: 4px;
    margin: 10px auto;
    padding-bottom: 4px;
  }
  .selfPoint img{
    padding-top: 10px;
    width: 20%;
    display: block;
    clear: both;
  }
  .selfPoint span{
    margin-bottom: 10px;
  }
  .table-style1,
  .table-style2,
  .table-style3 {
    transform: scale(0.9);
    margin: auto;
  }
  .optionBlock{
    width: auto;
  }


}

</style>