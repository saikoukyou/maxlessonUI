<template>
	<div class="col gap-xl subscribeblock">
		<LoadingSkeleton :count="1" v-if="loading" />
		<div class="row gap-xl" v-if="!loading">
			<div>
				<p>预约截止时间</p>
				<p>（越短越容易被预约，平均是 2 小时左右）</p>
			</div>
			<div class="radio">
<!--				<span :class="{ 'radio-item ': 1, 'checked ': item.value == teacherInfo.time }" v-for="item in timeOptions"-->
<!--					:key="item.value" @click="form.time = item.value">-->
<!--					<span class="radio-check"></span>-->
<!--					{{ item.text }}-->
<!--				</span>-->
        <n-radio-group v-model:value="teacherInfo.reservation_deadline_block" name="reservation_deadline_block">
          <n-space>
            <n-radio v-for="(titem,tindex) in timeOptions" :key="tindex" :value="Number(titem.value)">
              {{ titem.text }}
            </n-radio>
          </n-space>
        </n-radio-group>
			</div>
		</div>

		<div class="row gap-xl" v-if="!loading">
			<div>
				<p>早上 5 点 -6 点 55 的课</p>
				<p>需要提前 8 小时预约</p>
			</div>
			<div class="radio">
<!--				<span :class="{ 'radio-item ': 1, 'checked ': item.value == teacherInfo.early }" v-for="item in earlyOptions"-->
<!--					:key="item.value" @click="form.early = item.value">-->
<!--					<span class="radio-check"></span>-->
<!--					{{ item.text }}-->
<!--				</span>-->
        <n-radio-group v-model:value="teacherInfo.is_advance" name="is_advance">
          <n-space>
            <n-radio v-for="(eitem,eindex) in earlyOptions" :key="eindex" :value="Number(eitem.value)">
              {{ eitem.text }}
            </n-radio>
          </n-space>
        </n-radio-group>
			</div>
		</div>
    <div style="text-align: center;">
      <n-button class="Submit" type="button" @click="submitReservation" :loading="loading">
        <span style="padding-top: 8px; display: inline-block">下一步</span>
      </n-button>
    </div>
	</div>
</template>
<script setup>
import { ref, inject, watch } from "vue"

import {useResetReservationData, useTeacherAccount, useTeacherAccountReservationInfo} from "~~/apis/teacher";
import {createDiscreteApi, NButton, NRadio, NRadioGroup, NSpace} from "naive-ui";

const props = defineProps({
  nkey: {
    type: [String],
    default: ''
  }
});

const timeOptions = ref([])
const earlyOptions = ref([])
// const form = ref({
// 	time: 60,
// 	early: 1,
// })
const loading = ref(true)
const useStore = useMainStore();
const teacherInfo = useStore.teacherInfo;

useTeacherAccountReservationInfo()
	.then(result => {
		loading.value = false
		const data = result.data
		for (var i in data.value[0]) {
			timeOptions.value.push({
				value: i,
				text: data.value[0][i] < 60 ? data.value[0][i] + '分钟' : parseFloat(data.value[0][i] / 60) + '小时'
			})
		}

		for (var i in data.value[1]['is_advance']) {
			earlyOptions.value.push({
				value: i,
				text: data.value[1]['is_advance'][i]
			})
		}

	});

const emit = defineEmits(['changeTab']);
async function submitReservation() {
  let { data } = await useResetReservationData(teacherInfo.reservation_deadline_block,teacherInfo.is_advance);
  if (data.value !== null && data.value.err === false) {
    const { message } = createDiscreteApi(["message"]);
    emit('changeTab',props.nkey);
    message.success('保存成功');
  }
}

</script>
<style lang="scss" scoped>
.row>div:first-of-type {
	width: 300px;
}
.subscribeblock{
  padding: 50px 100px;
}
@media screen and (max-width: 520px) {
  .subscribeblock{
    padding: 20px;
    font-size: 15px;
  }
  .subscribeblock .row{
    display: block;
  }
  .subscribeblock .n-space{
    margin-top: 16px;
  }
}
</style>