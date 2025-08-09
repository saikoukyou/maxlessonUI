<template>
	<div class="teacher-info font-size">
		<div class="border border-color-third">
			<div class="tabs bg-third row border-bottom border-color-third">
				<div v-for="item in tabs"
					:class="{ 'flex padding-l row justify-center cursor-pointer': 1, 'bg-white ': tab == item.key }"
					:key="item.key" @click="changeTab(item.key)">
					{{ item.label }}
				</div>
			</div>

			<div class="bg-white padding-l">
				<keep-alive>
					<Info v-if="tab == 'info'" @changeTab="changeTab" nkey="subscribe" />
				</keep-alive>
				<keep-alive>
					<Subscribe v-if="tab == 'subscribe'" @changeTab="changeTab" nkey="pay" />
				</keep-alive>
				<keep-alive>
					<Students v-if="tab == 'students'" />
				</keep-alive>
				<keep-alive>
					<Pay v-if="tab == 'pay'" />
				</keep-alive>
			</div>
		</div>
	</div>
</template>
<script setup>
// 教师信息，包括基本信息、预约设置、我的学生们、支付信息

import Info from "./info/info.vue"
import Subscribe from "./info/subscribe.vue"
import Students from "./info/students.vue"
import Pay from "./info/pay.vue"

import { ref, provide } from "vue"
const tabs = [
	{ key: "info", label: "基本信息" },
	{ key: "subscribe", label: "预约设置" },
	{ key: "students", label: "我的学生们" },
	{ key: "pay", label: "支付信息" },
]
const tab = ref("info")
const useStore = useMainStore();
const teacher = useStore.teacherInfo;

let changeTab = (key) => {
  tab.value = key;
}

provide("teacher", teacher)
</script>

<style scoped>
  @media screen and (max-width: 520px) {
    .border-color-third{
      width: 100%;
    }
    .bg-white{
      width: 100%;
    }
  }
</style>