<template>
	<div class="col gap-l font-size teacher-calendar">
		<NoticeAndMessage />

		<div class="calendar col border border-color-yellow">
      <div>
        <n-date-picker v-model="searchMonth" type="month" value-format="yyyy-MM" format="yyyy-MM" @update:value="dateChange" placeholder="请选择月份" />
      </div>
			<div class="header row bg-third">
				<div class="flex padding row justify-center border-right border-color-yellow"
					v-for="item in ['周一', '周二', '周三', '周四', '周五', '周六', '周日']" :key="item">{{ item }}
				</div>
			</div>
			<div class="body normal bg-light-yellow border-left border-bottom tcalendar">
				<div v-for="(item, index) in calendar" :key="index"
					:class="{ 'day col gap items-flex-end padding border-right border-top tday ': 1, 'row-last ': (index + 1) % 7 == 0, disabled: item.month != month }"
					style="min-height:150px;">
					<span class="">{{ item.date }}</span>

					<div class="col gap telement">
            <span v-for="(v, k) in lessonList[item.datetime]" :key="k">
<!--              <span v-if="v.disabled" class="value-disable border-radius" @click="closeLesson()">-->
<!--                <span>{{ v.stime }}</span>-->
<!--                <span>{{ v.last_name }}</span>-->
<!--                <span>{{ v.first_name }}</span>-->
<!--              </span>-->
              <span :class="v.expire ? 'value-disable' : 'value' + ' border-radius'" @click="openLesson(v.id,v.stime,v.etime,v.day)">
                <span>{{ v.stime }}</span>
                <span>{{ v.last_name }}</span>
                <span>{{ v.first_name }}</span>
						  </span>
            </span>

					</div>
				</div>
			</div>
		</div>
	</div>
  <n-modal v-model:show="lesson_show">
    <LessonReport v-if="lesson_show" ref="lessonRef" :lesson_id="selected_lesson_id" :open_show_stime="open_show_stime" :open_show_etime="open_show_etime" :selected_day="selected_day"></LessonReport>
  </n-modal>
</template>
<script setup>
import NoticeAndMessage from '../components/notice-and-message.vue';
import {useIndexLessonsData} from "~/apis/teacher";
import {formatDate} from "~/composables/useUtil";
import {NDatePicker, NModal} from "naive-ui";
import {onMounted} from "vue";
import {watch } from "vue";

let lessonList =  ref([]);
let lesson_show = ref(false);
let selected_lesson_id = ref(0);
let open_show_stime = ref('');
let open_show_etime = ref('');
let selected_day = ref('');
let lessonRef = ref();
let searchMonth = ref('');

const getLessons = async () => {
  const { data: lessonInfo  } = await useIndexLessonsData(searchMonth.value);
  if (lessonInfo?.value !== null) {
    lessonList.value = lessonInfo?.value.lessons ?? [];
    // console.log('lessonList.value:'+JSON.stringify(lessonList.value));
  }
}

// 获取某个月的天数
function getDaysOfMonth(year, month) {
	return new Date(year, month, 0).getDate()
}

// 获取某个月份的每一天对应周几
function getCalendaryOfMonth(year, month) {
  // console.log('year11:'+year);
  // console.log('month22:'+month);
	let calendar = []

	// 这个月的总天数
	const dates = getDaysOfMonth(year, month)

	// 判断这个月的第一天是不是周一，如果不是，则需要这周上月的最后几天
	const firstDayWeekday = new Date(year, month - 1, 1).getDay()
	if (firstDayWeekday > 1) {
		const lastMonthDays = getDaysOfMonth(year, month - 1)
		for (var i = firstDayWeekday - 2; i >= 0; i--) {
			var tmp = new Date(year, month - 2, lastMonthDays - i)
			calendar.push({
				year: tmp.getFullYear(),
				month: tmp.getMonth() + 1,
				date: tmp.getDate(),
				weekday: tmp.getDay(),
        datetime: formatDate(tmp)
			})
		}
	}

	for (var i = 1; i <= dates; i++) {
		var tmp = new Date(year, month - 1, i)
		calendar.push({
			year: tmp.getFullYear(),
			month: tmp.getMonth() + 1,
			date: tmp.getDate(),
			weekday: tmp.getDay(),
      datetime: formatDate(tmp)
		})
	}

	// 判断这个月最后一天是不是周日，如果不是，则需要取出下个月的前几天
	const lastDayWeekday = new Date(year, month - 1, dates).getDay()
  // console.log('dates:'+JSON.stringify(dates));
  // console.log('lastDayWeekday:'+JSON.stringify(lastDayWeekday));
	if (lastDayWeekday < 7) {
		for (var i = 1; i <= (7 - lastDayWeekday); i++) {
			var tmp = new Date(year, month, i)
			calendar.push({
				year: tmp.getFullYear(),
				month: tmp.getMonth() + 1,
				date: tmp.getDate(),
				weekday: tmp.getDay(),
        datetime: formatDate(tmp)
			})
		}
	}
  // console.log('calendar:'+JSON.stringify(calendar));
	return calendar;
}

let now = new Date();
// console.log('now'+JSON.stringify(now));
// console.log('month:'+JSON.stringify((now.getMonth() + 1)));
// console.log('month:'+now.getFullYear());

const year = now.getFullYear();
const month = (now.getMonth() + 1);
// const year = 2023;
// const month = 2;
const tmp = getCalendaryOfMonth(year, month);
const calendar = ref(tmp)

// function getSubscribeListOfDate(date) {
// 	const tmp = [
// 		{ time: '6:00', name: "澤熊耕平" },
// 		{ time: '7:00', name: "杉本健二" },
// 		{ time: '8:00', name: "衣笠健一" },
// 		{ time: '9:00', name: "杉本健二" },
// 		{ time: '10:00', name: "衣笠健一" },
// 		{ time: '11:00', name: "澤熊耕平" },
// 		{ time: '12:00', name: "衣笠健一" },
// 	];
// 	const start = Math.floor(Math.random() * 3);
// 	const end = tmp.length - Math.floor(Math.random() * 3);
// 	return tmp.slice(start, end)
// }

function openLesson(lesson_id,stime,etime,day) {
  selected_lesson_id.value = lesson_id;
  open_show_stime.value = stime;
  open_show_etime.value = etime;
  selected_day.value = day;
  lesson_show.value = true;
  lessonRef.value.getLessonInfo(lesson_id);
}
function closeLesson() {
  lesson_show.value = false;
}

onMounted(async () => {
  getLessons();
})
function dateChange(value, strValue) {
  searchMonth.value = strValue;
  calendar.value = getCalendaryOfMonth(searchMonth.value.substring(0, 4), searchMonth.value.substring(5, 7));
  getLessons();
}
watch(lesson_show, (newValue) => {
  if (!newValue) {
    // 確保彈窗關閉時恢復滾動
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
});
</script>
<style scoped>
html, body {
  height: auto;
  min-height: 100vh;
}
</style>