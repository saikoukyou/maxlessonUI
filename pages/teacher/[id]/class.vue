<template>
  <n-pagination size="medium" style="margin-bottom: 10px;" :item-count="total" :page="page" :page-size="limit"
                :on-update:page="handlePageChange" />
  <div class="status-bar">
    <button class="status-btn active">状态说明</button>

    <div class="status-group">
      <span class="group-title">没过上课时间</span>
      <span class="status-item checked">开课</span>
      <span class="status-item">未开课</span>
      <span class="status-item checked light-checked">已被预约</span>
    </div>
    ｜
    <div class="status-group">
      <span class="group-title">已过上课时间</span>
      <span class="status-item disabled2">开课未被预约</span>
      <span class="status-item light-border">未开课</span>
      <span class="status-item checked light-checked">已被预约</span>
    </div>
  </div>


  <div id="form_timetable" ref="form_timetable" class="teacher-class border-radius overflow-hidden font-size-s border-left"
		style="border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
		<!-- 表头 -->
		<div class="bg-dark th row items-center">
			<div class="row padding-y ">
				<div v-if="timezone === 'CN'" class="padding white border-right col">
					<p class="nowrap">日期/時間</p>
					<p class="nowrap">(北京時間)</p>
				</div>
				<div v-else class="padding white border-right col">
					<p class="nowrap">日期/時間</p>
					<p class="nowrap">(日本時間)</p>
				</div>
			</div>
			<div class="padding-y  bg-third row flex" v-for="(days, key) in times_tree">
        <div v-for="(item, index) in days" :key="index" class="padding-y col items-center border-right flex">
          <p>{{ item.day }}</p>
          <p>{{ item.week }}</p>
        </div>
				<div class="padding-y col items-center flex">
          <p>00/00</p>
          <p></p>
				</div>
			</div>
		</div>

		<!-- 行 -->
		<div class="tr row">
			<div class="bg-white row" style="width: 80px;">
				<div v-if="timezone === 'CN'" class="padding  padding-y-l  flex col items-center border-right border-bottom justify-center">
					<p>开始时间</p>
				</div>
				<div v-else class="padding padding-y-l flex col items-center border-right border-bottom justify-center">
					<p>开始时间</p>
				</div>
			</div>
			<div class="bg-color-main row flex" v-for="(days, key) in times_tree">
				<div class="flex col  gap-s padding-y-s  items-center border-right border-bottom font-size-xs"
					v-for="(date, ditem, dindex) in days" :key="dindex">
					<span class="checkall bg-third border-radius-s padding-xs padding-x-s" @click="markAllDay(dindex)">全选</span>
					<span class="uncheckall bg-grey border-radius-s padding-xs padding-x-s" @click="unMarkAllDay(dindex)">解除</span>
				</div>
				<div class="col items-center  padding-y-l  flex h-full  border-right border-bottom">
				</div>
			</div>
		</div>
		<div class="tr row" v-for="(times, tindex) in alltimes" :key="tindex">
			<div class="bg-white row" style="width: 80px;">
				<div v-if="timezone === 'CN'" class="padding  padding-y-l  flex col items-center border-right border-bottom">
					{{ times.time }}
				</div>
				<div v-else class="padding padding-y-l flex col items-center border-right border-bottom">
					{{ times.timejp }}
				</div>
			</div>
			<div class="bg-color-main row flex">
				<div class="flex col  padding-y-l  items-center border-right border-bottom" v-for="(citem, cindex) in times.child"
					:key="cindex">
<!--					<span class="checkbox">-->
<!--            <n-checkbox :name="times[citem.name]" :checked="citem.checked" :value="citem.value" :disabled="citem.disable === true || citem.expired === true"></n-checkbox>-->
<!--					</span>-->
<!--          <n-checkbox :name="times[citem.name]" :checked="citem.checked" :value="citem.value" :disabled="citem.disable === true || citem.expired === true"></n-checkbox>-->
          <input v-if="citem.expired === true && citem.checked === true && !citem.is_reserved" type="checkbox" :name="citem.name" class="styled-checkbox" :value="citem.value" :disabled="true" :checked="true" />
          <input v-else type="checkbox" :name="citem.name" :class="'day_'+citem.day+' time_'+citem.time" :value="citem.value" :disabled="citem.disable === true || citem.expired === true" :checked="citem.checked" @click="changeChecked(tindex,cindex)" />
				</div>
				<div class="col items-center  padding-y-l  flex h-full  border-right border-bottom">
          <span class="checkall bg-third border-radius-s padding-xs padding-x-s" @click="markAllTime(tindex)">全选</span>
          <span class="uncheckall bg-grey border-radius-s padding-xs padding-x-s" @click="unMarkAllTime(tindex)">解除</span>
				</div>
			</div>
		</div>
	</div>
  <div class="Submit_search" @click="saveLesson">
    提交
  </div>
</template>
<script setup>
import {useSaveLessonData, useSetLessonData} from "~/apis/teacher";
import {createDiscreteApi, NCheckbox, NPagination} from "naive-ui";

const page = ref(1);
let limit = ref(15);
let total = ref(0);
let times_tree = ref([]);
let alltimes = ref([]);
let form_timetable = ref(null);
let timezone = ref('');

const getAllTimes =  async () => {
  const {
    pending,
    error,
    rows,
    data,
    refresh
  } = await usePage(() => {
    return useSetLessonData({
      page: page?.value || 1,
    })
  })
  if (data.value !== null && data.value !== undefined) {
    times_tree.value = data.value.times_tree ?? [];
    alltimes.value = data.value.alltimes ?? [];
    total.value = data.value.list.total ?? 0;
    limit.value = data.value.list.limit ?? 15;
    timezone.value = data.value.timezone ?? '';
    console.log('total:'+total.value);
    // console.log('alltimes:'+JSON.stringify(alltimes));
  }
}

getAllTimes();

async function changeChecked(tindex,cindex) {
  let item = alltimes.value[tindex].child[cindex];
  // console.log('item:'+JSON.stringify(item));
  if (item.disabled || item.expired) {
    // console.log('daozhele:'+JSON.stringify(item));
  } else {
    // console.log('item2:'+JSON.stringify(item));
    if (item.checked === false) {
      alltimes.value[tindex].child[cindex].checked = true;
      alltimes.value[tindex].child[cindex].value = 1;
    } else {
      alltimes.value[tindex].child[cindex].checked = false;
      alltimes.value[tindex].child[cindex].value = 0;
    }
  }
}

//全选方法
function markAllDay(index) {
  alltimes.value.map((item) => {
    if (item.child[index].disabled || item.child[index].expired) {
      return item;
    }
    // console.log('item.child[index]:'+JSON.stringify(item.child[index]));
    item.child[index].checked = true;
    item.child[index].value = 1;
    return item;
  });

  // console.log('_className:'+_className);
  // const elements = document.querySelectorAll(_className);
  //
  // elements.forEach((element) => {
  //   console.log('element:'+JSON.stringify(element));
  //   if (!element.disabled) {
  //     if (!element.checked) {
  //       element.value = 1;
  //       element.checked = true;
  //     }
  //   }
  // });
}

//解除方法
function unMarkAllDay(index){
  alltimes.value.map((item) => {
    if (item.child[index].disabled || item.child[index].expired) {
      return item;
    }
    item.child[index].checked = false;
    item.child[index].value = 0;
    return item;
  });
  // const elements = document.querySelectorAll(_className);
  // elements.forEach((element) => {
  //   console.log('element:'+JSON.stringify(element));
  //   if (!element.disabled) {
  //     element.value = 0;
  //     element.checked = false;
  //   }
  // });
}

function markAllTime(index){
  alltimes.value[index].child.map((item) => {
    if (item.disabled || item.expired) {
      return item;
    }
    item.checked = true;
    item.value = 1;
    return item;
  });

}

//全解除
function unMarkAllTime(index){
  alltimes.value[index].child.map((item) => {
    if (item.disabled || item.expired) {
      return item;
    }
    item.checked = false;
    item.value = 0;
    return item;
  });
}

async function saveLesson() {
  // console.log('alltimes:'+JSON.stringify(alltimes.value));
  const {pending, data: saveInfo  } = await useSaveLessonData(JSON.stringify(alltimes.value));
  if (saveInfo.value !== null && saveInfo.value.err === false) {
    const { message } = createDiscreteApi(["message"]);
    message.success('保存成功');
  }
}

function handlePageChange(p) {
  page.value = p;
  getAllTimes();
}

const dates = ref([
	{ date: "09/13", weekday: "星期三" },
	{ date: "09/14", weekday: "星期四" },
	{ date: "09/15", weekday: "星期五" },
	{ date: "09/16", weekday: "星期六" },
	{ date: "09/17", weekday: "星期日" },
	{ date: "09/18", weekday: "星期一" },
	{ date: "09/19", weekday: "星期二" },
	{ date: "09/20", weekday: "星期三" },
	{ date: "09/21", weekday: "星期四" },
	{ date: "09/22", weekday: "星期五" },
	{ date: "09/23", weekday: "星期六" },
	{ date: "09/24", weekday: "星期日" },
	{ date: "09/25", weekday: "星期一" },
	{ date: "09/26", weekday: "星期二" },
])

let list = ref([

])

for (var hour = 6; hour <= 12; hour++) {
	list.value.push({
		time1: hour + ':' + ':00',
		time2: hour + 1 + ':' + ':00',
	})
	list.value.push({
		time1: `${hour}:30`,
		time2: `${hour + 1}:30`,
	})
}
</script>
<style lang="scss" scoped>
.checkbox {
	display: block;
	width: 16px;
	height: 16px;
	border: 1px solid var(--border-color-black);
	position: relative;
	background-color: #fff;
}
.checkbox.checked:after {
	display: block;
	content: "✓";
	color: var(--border-color-black);
}
.checkall {
  cursor: default;
}
.uncheckall {
  cursor: default;
}
.Submit_search{
  margin: 20px auto;
}



@media screen and (max-width: 520px) {
  .items-center{
    width: 110px;
    text-align: center;
    vertical-align: center;
    font-size: 14px;
  }
  .items-center input{
    width: 24px;
    height: 24px;
  }
}

</style>

<style>
  /* 選擇器針對 n-message__content 修改 */
  .n-message__content {
    font-size: 22px !important; /* 增大文字大小 */
    padding: 8px 0;   /* 增加內邊距，讓框變大 */
    margin-left: 20px !important;
  }

  /* 如果想讓整個 n-message-wrapper 大一些 */
  .n-message-wrapper {
    padding: 20px;    /* 調整內邊距 */
  }
  /* 調整 icon 的大小 */
  .n-message__icon {
    font-size: 36px !important; /* 修改 icon 的大小 */
    display: block;
    margin-top: -20px !important;
  }

  /* 隐藏默认的复选框 */
  .styled-checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 13px;
    height: 13px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    position: relative;
    vertical-align: middle;
  }

  /* 复选框选中时的样式 */
  .styled-checkbox:checked {
    background-color: #D0CECC;
    border-color: #D0CECC;
  }

  .styled-checkbox:checked::after {
    content: "-";
    position: absolute;
    color: white;
    font-size: 16px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }



  .status-bar {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    font-family: sans-serif;
    font-size: 14px;
    gap: 16px;
    background-color: #FFFFFF;
    margin: 16px 0;
    /* 加陰影 */
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  .status-btn {
    background-color: #f7c360;
    color: #333;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: default;
    font-weight: bold;
    margin: 0 16px 0 8px;
  }

  .status-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .group-title {
    font-weight: bold;
    margin-right: 6px;
  }

  .status-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding-left: 20px; /* space for checkbox */
    color: #333;
  }

  .status-item::before {
    content: "";
    position: absolute;
    left: 0;
    width: 14px;
    height: 14px;
    border: 1px solid #999;
    border-radius: 2px;
    background-color: #fff;
  }
  /* 開課（正常checked） */
  .status-item.checked::before {
    background-color: #424242;
    border-color: #424242;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-item.checked::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  /* 已被預約（更淡的灰） */
  .status-item.checked.light-checked::before {
    background-color: #bbb;  /* 更淡 */
    border-color: #bbb;
  }

  .status-item.checked.light-checked::after {
    /* 保持原來的白色勾即可，不變 */
  }

  /* 灰色disabled樣式 */
  .status-item.disabled::before {
    background-color: #eee;
    border-color: #ddd;
  }

  /* 另一種灰條（你圖裡「开课未被预约」的樣式像灰條） */
  .status-item.disabled2::before {
    content: "";
    position: absolute;
    left: 0;
    width: 14px;
    height: 14px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-item.disabled2::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 2px;
    width: 10px;
    height: 3px;
    background-color: #f4f4f4;
    transform: translateY(-50%);
  }
  .status-item.light-border::before {
    border-color: #ddd;  /* 比預設更淺 */
  }


  @media (max-width: 520px) {
    .status-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
    }

    .status-btn {
      margin: 0 0 8px 0;
    }

    .status-group {
      flex-wrap: wrap; /* 換行 */
      gap: 6px 8px;    /* item上下左右間距 */
    }

    .group-title {
      width: 100%;
      margin-bottom: 4px;
    }
  }

</style>