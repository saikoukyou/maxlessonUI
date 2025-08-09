<template>
	<div class="font-size teacher-class-fee">
		<div class="padding-l padding-x-xl gap-xl bg-white">
			<h1 class="font-size-l padding-y-s">{{teacher_info.name_cn}}老师，您好</h1>

      <span>您现在的讲师等级是：<span class="orangew">{{teacher_info.rank}}</span></span>
			<span>｜当前积分：<span class="orangew">{{teacher_info.integral_num}} </span>分，再累积 <span class="orangew">{{teacher_info.next_rank_diff}}</span>积分即可升级。请加油！</span>


      <n-popover style="max-width: 500px" trigger="hover">
        <template #trigger>
          <span style="float: right;">积分等级？</span>
        </template>
        <table class="border-n">
          <tr style="margin: 10px;" v-for="(ritem,rindex) in teacher_info.ranks">
            <td>等级:{{rindex}}</td>
            <td>最小值:{{ritem.lowest_value}}</td>
            <td>最大值:{{ritem.highest_value}}</td>
            <td>课时费:{{ritem.salary}}</td>
            <td>下一等级:{{ritem.next_rank}}</td>
          </tr>
        </table>
      </n-popover>
		</div>



      <div class="bg-white padding-xl">
      <p class="font-size-l">本月课时费统计</p>

        <table class="stat-table">
          <tr>
            <td class="header-cell">统计期间</td>
            <td>{{data.search_start_day}} ～ {{data.search_end_day}}</td>
          </tr>
          <tr>
            <td class="header-cell">课时费金额</td>
            <td>{{data.salary_balance}} 元</td>
          </tr>
        </table>

			<p class="font-size-m margin-top-l" style="max-width: 1000px;">课时费明细</p>
        <div>
          <n-date-picker v-model:formatted-value="searchDay" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @update:value="dateChange" placeholder="请选择日期" />
        </div>
        <div class="reservedList">
          <swiper
              class="reservedList-swiper"
              :modules="modules"
              :slides-per-view="1"
              :space-between="50"
              :initial-slide="initialSlideIndex"
              navigation
              Mousewheel
              @swiper="onSwiper"
              @slideChange="changeDay"
          >
            <swiper-slide v-for="(day, index) in days">
              <span style="font-size: 16px;">{{day.day}}&nbsp;{{day.week}}</span><br>
              <span>课时费:{{salaryDay}}｜积分:{{integralDay}}</span>
            </swiper-slide>
          </swiper>
        </div>
			<table class="course-record-table" style="margin-top: 0;">
				<tr>
					<th>课程时间</th>
					<th>学生姓名</th>
          <th>所属等级</th>
          <th>课时费增减</th>
					<th>积分增减</th>
					<th>备注</th>
				</tr>
				<tr v-for="(item, index) in noCheckList" :key="index">
					<td>{{ item.lesson_start_unixtime_str }}～{{ item.lesson_end_unixtime_str }}<br>
            (课程ID：{{ item.lesson_id }})
          </td>
					<td>{{ item.last_name }}{{ item.first_name }}</td>
          <td>{{ item.rank }}</td>
					<td>
            <span v-if="item.price && item.price !== '0.00'">{{ item.price }}</span>
            <span v-if="item.reward_adjustment && item.reward_adjustment !== '0.00'">{{ item.reward_adjustment }}</span>
          </td>
          <td>{{ item.num }}</td>
					<td>{{ item.remark }}</td>
				</tr>
			</table>
<!--      <n-pagination size="large" style="margin-top:10px;" :item-count="utotal" :page="upage" :page-size="limit"-->
<!--                    :on-update:page="handlePageChange" />-->

      </div>

      <div class="bg-white padding-xl">
			<p class="font-size-l">待支付劳务费</p>
			<div>

        <table class="stat-table">
          <tr>
            <td class="header-cell">统计期间</td>
            <td>{{un_checkout.start_day}} ～ {{un_checkout.end_day}}</td>
          </tr>
          <tr>
            <td class="header-cell">课时费金额</td>
            <td>{{un_checkout.reward}} 元 <span @click="showPayInfo(un_checkout,un_checkout.start_day)">支付明细</span> </td>
          </tr>
        </table>

			</div>
      <p class="font-size-m margin-top-l">课时费明细</p>
        <table class="course-record-table">
        <tr>
          <th>课程时间</th>
          <th>学生姓名</th>
          <th>所属等级</th>
          <th>课时费增减</th>
          <th>积分增减</th>
          <th>备注</th>
        </tr>
        <tr v-for="(item, index) in checkList" :key="index">
          <td>{{ item.lesson_start_unixtime_str }}～{{ item.lesson_end_unixtime_str }}<br>
            (课程ID：{{ item.lesson_id }})
          </td>
          <td>{{ item.last_name }}{{ item.first_name }}</td>
          <td>{{ item.rank }}</td>
          <td>
            <span v-if="item.price && item.price !== '0.00'">{{ item.price }}</span>
            <span v-if="item.reward_adjustment && item.reward_adjustment !== '0.00'">{{ item.reward_adjustment }}</span>
          </td>
          <td>{{ item.num }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </table>
      <n-pagination size="large" style="margin-top:10px;" :item-count="ctotal" :page="cpage" :page-size="limit"
                    :on-update:page="handlePageChangeCheck" />

      </div>

      <div class="bg-white padding-xl">
      <p class="font-size-l">已支付劳务费</p>
        <span class="moneytotal">累计总金额：<span class="orangew">{{checked_total_reward}}元</span></span>
      <div class="padding-y-xl">
        <table class="course-record-table">
          <tr v-for="(citem,cindex) in checked_history">
            <td>期间：{{citem.start_day}} ～ {{citem.end_day}}</td>
            <td>课时费金额：{{citem.reward}} 元</td>
            <td>已发放</td>
            <td>
              <span class="orangew" @click="showPayInfo(citem,citem.start_day)">支付明细</span>|
              <span class="orangew" @click="showList(citem.id,citem.start_day,citem.end_day)">课时费明细</span>
            </td>
          </tr>
        </table>
      </div>
      <n-pagination size="large" style="margin-top:10px;" :item-count="htotal" :page="hpage" :page-size="limit"
                    :on-update:page="handlePageChangeChecked" />
      </div>

		</div>


  <n-modal
      v-model:show="show"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="列表"
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    <template #header-extra>
      {{dtitle}}<br/>
      课时费明细
    </template>
    <p>
      <table>
        <tr>
          <th>课程日期</th>
          <th>课程ID</th>
          <th>等级</th>
          <th>积分变化</th>
          <th>课时费变化</th>
          <th>备注</th>
        </tr>
        <tr v-for="(citem, cindex) in dlist" :key="cindex">
          <td>{{ citem.settlement_date }}</td>
          <td>{{ citem.lesson_id }}</td>
          <td>{{ citem.rank }}</td>
          <td>{{ citem.num }}({{citem.integral_num}})</td>
          <td>
            <span v-if="citem.price && citem.price !== '0.00'">{{ citem.price }}</span><br />
            <span v-if="citem.reward_adjustment && citem.reward_adjustment !== '0.00'">{{ citem.reward_adjustment }}</span>
            ({{citem.salary_balance}})
          </td>
          <td>{{ citem.remark }}</td>
        </tr>
      </table>
    </p>
    <template #footer>
    </template>
  </n-modal>

  <n-modal
      v-model:show="showPay"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title=""
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    <template #header-extra>
      <h1>{{ptitle}}</h1>
      <h2>支付明细</h2>
    </template>
      <table class="stat-table">
        <tr>
          <td class="header-cell">统计期间</td>
          <td>{{ payInfo.start_day }} ～ {{ payInfo.end_day }}</td>
        </tr>
        <tr>
          <td class="header-cell">课时费金额</td>
          <td>{{ payInfo.reward }}元</td>
        </tr>
      </table>

      <table class="fee-detail-table">
        <tr>
          <td class="ttitle">课时费总金额</td>
          <td>{{ payInfo.lesson_reward }}元</td>
        </tr>
        <tr>
          <td class="ttitle">劳务税款</td>
          <td><span class="fontw">{{ payInfo.reward_rate }}元</span><span class="fgray">{{ payInfo.reward_rate_ex }}</span></td>
        </tr>
        <tr>
          <td class="ttitle">课时费补助金额</td>
          <td><span class="fontw">{{ payInfo.reward_supply }}元</span><span class="fgray">{{ payInfo.reward_supply_ex }}</span></td>
        </tr>
        <tr>
          <td class="ttitle">补助后劳务费总额</td>
          <td><span class="fontw">{{ payInfo.reward_supply_total }}</span>元<span class="fgray">{{ payInfo.reward_supply_total_ex }}</span></td>
        </tr>
        <tr>
          <td class="ttitle">补助后老师应缴税款</td>
          <td><span class="fontw">{{ payInfo.reward_supply_total_rate }}</span>元<span class="fgray">{{ payInfo.reward_supply_total_rate_ex }}</span></td>
        </tr>
        <tr>
          <td class="ttitle">转账金额</td>
          <td><span class="fontw">{{ payInfo.reward }}</span>元<span class="fgray">{{ payInfo.reward_ex }}</span></td>
        </tr>
      </table>
    <template #footer>
    </template>
  </n-modal>

</template>
<script setup>
import {
  useApplyCheckoutData, usePayslipCheckedHistoryData,
  usePayslipDetailData,
  usePayslipNoApplyDetailData,
  useTeacherPayslip
} from "~~/apis/teacher";
import {createDiscreteApi, NButton, NDatePicker, NModal, NPagination, NPopover} from "naive-ui";
import {onMounted} from "vue";
import {formatDate} from "~/composables/useUtil";
// import { register } from "swiper/element/bundle";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const modules = [Navigation, Pagination, Scrollbar, A11y];
// register();
let checked_history = ref([]);
let checkout_history = ref([]);
let un_checkout = ref({});
let checked_total_reward = ref(0);
let teacher_info = ref([]);
let data = ref([]);
let show = ref(false);
let bodyStyle = {
  width: '600px'
};
let segmented =  {
  content: 'soft',
  footer: 'soft'
};
let dlist = ref([]);
let dtitle = ref('');
let noCheckList = ref([]);
let dlimit = ref(10);
let dpage = ref(1);
let dtotal = ref(0);
let did = ref(0);
let limit = ref(10);
let checkLoading = ref(false);
let checkList = ref([]);
let cpage = ref(1);
let ctotal = ref(0);
let hpage = ref(1);
let htotal = ref(0);
let showPay = ref(false);
let ptitle = ref('');
let payInfo = ref({});
let searchDay = ref(formatDate(new Date()));
let integralDay = ref(0);
let salaryDay = ref(0);
const days = ref([]);
const days2 = ref([]);
let initialSlideIndex = ref(31);
const swiperInstance = ref(null);


async function getList() {
  const {data: lists  } = await useTeacherPayslip();
  if (lists?.value) {
    data.value = lists?.value ?? [];
    checked_history.value = lists?.value?.checked_history?.data ?? [];
    htotal.value = lists?.value?.checked_history?.total ?? [];
    // checkout_history.value = lists?.value?.checkout_history ?? [];
    un_checkout.value = lists?.value?.un_checkout ?? {};
    checkList.value = lists?.value?.un_checkout_list?.data ?? [];
    ctotal.value = lists?.value?.un_checkout_list?.total ?? 0;
    teacher_info.value = lists?.value?.teacher_info ?? [];
    checked_total_reward.value = lists?.value?.checked_total_reward ?? [];
    // utotal.value = lists?.value?.un_apply_list?.list?.total ?? 0;
    days.value = lists?.value?.days ?? [];
    days2.value = lists?.value?.days2 ?? [];
    initialSlideIndex.value = days?.value?.length ? (days?.value?.length - 1) : 0;
    noCheckList.value = lists?.value?.un_apply_list?.list ?? [];
    integralDay.value = lists?.value?.un_apply_list?.integral_day ?? 0;
    salaryDay.value = lists?.value?.un_apply_list?.salary_day ?? 0;
    // console.log('initialSlideIndex:::'+initialSlideIndex.value);
    if (swiperInstance.value) {
      swiperInstance.value.slideTo(initialSlideIndex.value);
    }
  }
  // getNoCheckDetail();
}

onMounted(() => {

  getList();

})

async function getNoCheckDetail() {
  const { data } = await usePayslipNoApplyDetailData({
    cur_mon: 1,
    searchDay: searchDay.value,
  })
  if (data?.value) {
    noCheckList.value = data?.value.list ?? [];
    integralDay.value = data?.value?.integral_day ?? 0;
    salaryDay.value = data?.value?.salary_day ?? 0;
  }
}

async function getCheckDetail() {
  const {
    pending,
    error,
    data,
    rows,
    total,
    refresh
  } = await usePage(() => {
    return usePayslipNoApplyDetailData({
      per_page: limit.value,
      page: cpage?.value || 1,
      get_count: true,
      checkout_id: un_checkout?.value['checkout_id'] ?? ''
    })
  })

  if (data?.value) {
    ctotal.value = total?.value ?? 0;
    checkList.value = rows?.value ?? [];
  }
}

async function getCheckedHistory() {
  const {
    pending,
    error,
    data,
    rows,
    total,
    refresh
  } = await usePage(() => {
    return usePayslipCheckedHistoryData({
      per_page: limit.value,
      page: hpage?.value || 1,
    })
  })

  if (data?.value != null) {
    htotal.value = total.value;
    checked_history.value = rows.value;
  }
}

const getDetailList = async () => {
  const { data } = await usePayslipDetailData({
    id: did.value,
  })
  if (data?.value) {
    dlist.value = data?.value?.list ?? [];
    show.value = true;
  }
}

async function showList(id,start,end) {
  dtitle.value = start.substr(0,7);
  did.value = id;
  // const { data:dinfo } = await usePayslipDetailData(id);
  // if (dinfo?.value !== null) {
  //   dlist.value = dinfo?.value.history ?? [];
  //   show.value = true;
  // }
  getDetailList();
}

function showPayInfo(item,title) {
  ptitle.value = title.substr(0,7);
  payInfo.value = item;
  showPay.value = true;
}

function handlePageChangeDetail(p) {
  dpage.value = p;
  getDetailList();
}

function handlePageChangeCheck(p) {
  cpage.value = p;
  if (un_checkout?.value['checkout_id']) {
    getCheckDetail();
  }
}

function handlePageChangeChecked(p) {
  hpage.value = p;
  getCheckedHistory();
}

function dateChange(value, strValue) {
  searchDay.value = strValue;
  initialSlideIndex.value = days2?.value[strValue];
  getNoCheckDetail();
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(initialSlideIndex.value);
  }
}

function changeDay(swiper) {
  let index = swiper?.activeIndex ?? 0;
  searchDay.value = days?.value[index]?.day ?? formatDate(new Date());
  // console.log('changeDay:::走到这里');
  //重新提交请求
  getNoCheckDetail();
}

function onSwiper(swiper) {
  swiperInstance.value = swiper;
}

</script>
<style lang="scss" scoped>


.bg-white{
  margin-bottom: 10px;
}
table {
	width: 100%;
	margin-top: 10px;

	td,
	th {
		padding: 10px 10px;
		text-align: center;
		border-right: 1px solid #000000;
		border-bottom: 1px solid #000000;
	}

	tr {

		th:last-of-type,
		td:last-of-type {
			border-right: none;
		}
	}

	tr:last-of-type {
		td {
			border-bottom: none;
		}
	}
}
.border-n {
  border: none;
  tr {
    td {
      border: none;
    }
  }
}
.apply_btn {
  margin-left:10px;
  text-align: center;
  height: 28px;
  width: 50px;
  background-color: #ff6c00;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease;
  cursor: default;
  border-radius: 8px;
  -ms-box-shadow: 2px 2px 10px 3px rgba(250, 192, 20, 0.5);
  box-shadow: 2px 2px 10px 3px rgba(250, 192, 20, 0.5);
}
.apply_btn:active {
  background-color: #FAB793; /* 设置点击时的背景色 */
}
.font-size-l{
  font-weight: bold;
}
.col{
  background-color: white;
  margin-top: 16px;
  border-radius: 8px;
}
/* 表格樣式 */
.stat-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
}

.stat-table td {
  border: 1px solid #ccc;
  padding: 8px 24px;
  text-align: right;
  font-weight: bold;
}
table tr:last-of-type td{
  border-bottom: 1px solid #ccc;
}
.stat-table td span{
  color: #F86800;
  text-decoration: underline;
  margin-left: 10px;
  font-size: 13px;
}
/* 標題單元格樣式 */
.header-cell {
  background-color: #F2B705;
  font-weight: bold;
  text-align: left !important;
}
/* 表格樣式 */
.course-record-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 13px;
  vertical-align: center;
  line-height: 13px;
}

.course-record-table th,
.course-record-table td {
  border: 1px solid #ccc !important;
  padding: 8px;
  text-align: center;
}

/* 標題行樣式 */
.course-record-table thead th {
  background-color: #e0e0e0;
  font-weight: bold;
  color: #333;
}

/* 表格內容的行樣式 */
.course-record-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.orangew{
  color: #F86800;
  font-weight: bold;
  margin: 0 4px 0 0;
}
.moneytotal{
  margin-top: 4px;
  display: block;
}
.n-card-header h1{
  font-size: 24px;
}
/* 表格樣式 */
.fee-detail-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}


.fee-detail-table td {
  border: 1px solid #ccc !important;
  padding: 4px 24px;
  text-align: right;
  font-weight: bold;
  font-size: 13px;
}

.fee-detail-table .ttitle{
  text-align: left;
  width: 210px;
}


/* 標題單元格樣式 */
.header-cell {
  background-color: #F2B706;
  font-weight: bold;
  width: 40%;
}

/* 註解單元格樣式 */
.note-cell {
  color: #888;
  font-size: 0.9em;
  text-align: right;
}
.fgray{
  color: gray;
}
.fontw{
  font-weight: bold;
}
.reservedList{
  margin-top: 12px;
  height: 50px;
  background-color: #F2B706;
}
.reservedList-swiper{
  max-width: 800px;
  text-align: center;
  height: 50px;
  line-height: 23px;
  font-weight: bolder;
}
@media screen and (max-width: 520px) {
  .mainsp .row{
    display: inline-grid;
  }
  .mainsp .gap-xl{
    gap: 10px;
  }
  .bg-white-yellow{
    width: 100%;
  }
}

swiper-container::part(button-next){
  color: rgba(255, 255, 255, 0);
  background-image: url("../assets/images/sw_next.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 0 10px;
}
swiper-container::part(button-prev) {
  color: rgba(255, 255, 255, 0);
  background-image: url("../assets/images/sw_prev.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 9px 10px;
}
</style>