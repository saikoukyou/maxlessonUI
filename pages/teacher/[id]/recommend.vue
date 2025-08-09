<template>
	<div class="col gap teacher-recommend">
		<div class="top bg-third padding-l padding-x-xl col gap border-radius-s">
			<p class="white">Campaign</p>
			<p>NETCHINA 老师推荐制度</p>
			<div class="font-size-s">
				<p>欢迎您介绍朋友来 NetChina 当老师。</p>
				<p>我们向每一位老师都提供了宣传用的网站链接。宣传链接里不会显示您的任何个人信息，系统会自动进行标定。</p>
				<p>介绍成功标准：被介绍者通过您的链接提交申请，面试合格后，成功上完 1 节课即为介绍成功。</p>
			</div>
		</div>

		<div class="bg-white" style="margin-top: 30px;">
			<img src="@/assets/SVG/campaignBanner.svg" alt="" />

			<NSpin :show="loading">
				<div class="bg-white-yellow" style="padding-top: 20px;">
					<div class="bg-grey padding-l padding-x-xl col gap-xl">
						<div class="col gap">
							<p class=" border-bottom fit-content padding-y">您的老师介绍链接</p>
							<a class="font-size-s normal" v-if="!loading && url" :href="url" target="_blank">
								{{ url }}
							</a>
							<span v-else>无</span>
						</div>

						<p class="row gap-l items-center">
							<span>您累积获得的谢礼金额</span>
							<span class="border padding-s padding-x-l normal bg-white">
								{{ reward }} 元
							</span>
						</p>
						<p class="font-size-s row justify-center">※谢礼金会在被介绍着完成第 1 节课之后，自动以课时费的形式加入到您的账户里。</p>
					</div>

					<div class="padding-xl col gap-l">
						<p>介绍履历</p>

						<div class="font-size-s row center">
							<span class="flex">被介绍者注册时间</span>
							<span class="flex">被介绍者姓名</span>
							<span class="flex">被介绍者完成首次课的时间</span>
							<span class="flex">礼金金额</span>
							<!-- <span class="flex">介绍状态</span> -->
						</div>

						<div class="col">
							<div :class="{ 'font-size-s row center items-center padding-y border-bottom border-color-grey ': 1, ' bg-light-yellow ': index % 2 == 0, ' bg-light-yellow2 ': index % 2 != 0 }"
								v-for="(item, index) in list" :key="index">
								<span class="flex">{{ item.registered }}</span>
								<span class="flex">{{ item.name_cn }}</span>
								<span class="flex">{{ item.lesson_start_datetime_cn }}</span>
								<span class="flex">{{ item.reward_adjustment }}</span>
								<!-- <span class="flex">{{ item.status_text }}</span> -->
							</div>
						</div>
					</div>
				</div>
			</NSpin>
		</div>
	</div>
</template>
<script setup>
import { ref } from "vue"
import { NSpin } from "naive-ui";
import { useTeacherIntroInfo } from "~~/apis/teacher";

const url = ref(null)

const list = ref([
	// { date: "2022 年 11 月 11 日 18 時 32 分 12 秒", name: "张三", finish_class_date: "2023 年 11 月 22 日", money: 20, status_text: "成功" },
	// { date: "2022 年 11 月 11 日 18 時 32 分 12 秒", name: "张三", finish_class_date: "2023 年 11 月 22 日", money: 20, status_text: "待上课" },
	// { date: "2022 年 11 月 11 日 18 時 32 分 12 秒", name: "张三", finish_class_date: "2023 年 11 月 22 日", money: 20, status_text: "待上课" },
])

const reward = ref(null)

const loading = ref(true)

useTeacherIntroInfo()
	.then(result => {
		loading.value = false
		url.value = result.data.value.proxy_url
		reward.value = result.data.value.reward
		list.value = result.data.value.intro_list
	})

</script>