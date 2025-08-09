<template>
	<div class="info-students col ">
		<div class="border-bottom padding-xl col gap">
			<p>上我课最多的学生</p>
			<LoadingSkeleton :count="1" v-if="lessonList == null" />
			<div class="studentsblock" v-else style="">
				<div class="border border-color-third border-radius-s" v-for="(item, index) in lessonList" :key="index">
					<div class="padding-s col gap-s justify-center items-center bg-third">
						<p>第{{ index + 1 }}名</p>
						<p>({{ item.lnum }}节)</p>
					</div>
					<div class="padding padding-y-xl col justify-center items-center">
						{{ getName(item) }}
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script setup>
import { ref } from "vue"
import { useTeacherAccountStudentNum } from "~~/apis/teacher";
const topCountList = ref(null)
const badList = ref(null)
let lessonList = ref(null);

function getName(item) {
	return item.last_name + ' ' + item.first_name
}

let { data } = await useTeacherAccountStudentNum();
if (data.value != null) {
  topCountList.value = data?.value.good_arr;
  badList.value = data?.value.bad_arr;
  lessonList.value = data?.value.lesson_arr;
}

</script>
<style>
  .studentsblock{
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap:20px;
  }
  @media screen and (max-width: 520px) {
    .studentsblock{
      display: block;
    }
    .studentsblock .padding-y-xl{
      padding: 0 10px 20px 10px;
    }
    .studentsblock .border-color-third{
      margin-bottom: 10px;
    }
  }
</style>