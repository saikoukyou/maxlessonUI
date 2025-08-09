<template>
	<div class="col gap-l">
		<NoticeAndMessage />

		<div class="bg-third border-radius row gap-xl font-size padding padding-x-xl">
      <div class="padding bg-light-yellow padding-x-xl" :class="cindex === 0 ? '' : 'border-radius-l'" v-for="(category,cindex) in category_list" @click="changeCategory(category.id)">{{category.name}}</div>
<!--			<div class="padding bg-light-yellow padding-x-xl">重要通知</div>-->
<!--			<div class="padding bg-light-yellow padding-x-xl border-radius-l">你不知道的日语与日本</div>-->
<!--			<div class="padding bg-light-yellow padding-x-xl border-radius-l">难讲的中文词汇</div>-->
<!--			<div class="padding bg-light-yellow padding-x-xl border-radius-l">日本新闻</div>-->
		</div>

		<div class="bg-white-yellow border-radius font-size col gap">
			<div class="border border-radius border-color-third padding-l padding-x-xl row">
				<label for="" >编号</label>
				<label for="" >状态</label>
				<label for="" class="flex">标题</label>
				<label for="" >同意与否</label>
				<label for="" >同意日期/开封日期</label>
			</div>

			<div class="col normal list">
				<NSpin :show="loading">
					<div v-for="(item, key) in list" :key="item.id"
               @click="showContent(key,item.announce_schedule_teacher_id,item.is_read)"
						:class="{ 'row padding-l padding-x-xl border-bottom border-style-dotted': 1, 'bg-third': item.status == 0 }"
						:status="item.status">
						<div style="width: 80px;">{{ item.id }}</div>
						<div style="width: 100px;">{{ item.status_text }}</div>
						<div class="flex">{{ item.title }}</div>
						<div style="width: 100px;">{{ item.agree }}</div>
						<div style="width: 150px;">{{ item.agree_date }}</div>
					</div>

					<Empty v-if="!loading && list.length < 1" />
				</NSpin>
			</div>
		</div>
	</div>

  <n-modal
      v-model:show="show"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="詳細"
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    <template #header-extra>
      {{list[selected_index].title}}
    </template>
    <p v-html="list[selected_index].body"></p>
    <template #footer>
      {{list[selected_index].memo}}
    </template>
  </n-modal>

</template>
<script setup>
import NoticeAndMessage from "../components/notice-and-message.vue"

import {createDiscreteApi, NModal, NSpin} from "naive-ui";

import { ref } from "vue"

import {useReadAnnounceData, useTeacherAnnounce} from "~~/apis/teacher";

const list = ref([
	// { id: 1, status: 0, status_text: "未读", title: "春节期间的假期规定", agree: "同意", agree_date: "2023年12月11日 12:30" },
])

const loading = ref(false)
let category_list = ref([]);
let selected_category = ref(0);
let selected_index = ref(0);
let show = ref(false);
let bodyStyle = {
  width: '600px'
};
let segmented =  {
  content: 'soft',
  footer: 'soft'
};
const { dialog } = createDiscreteApi(["dialog"])

function loadData() {
	loading.value = true
	useTeacherAnnounce(selected_category.value,1)
		.then(result => {
			loading.value = false
			list.value = result?.data?.value?.announces ?? [];
      category_list.value = result?.data?.value?.category_list ?? [];
      selected_category.value = result?.data?.value?.announce_category_id ?? 0;
		})
}

loadData();

function changeCategory(category_id) {
  selected_category.value = category_id;
  loadData()
}

async function showContent(key,id,read) {
  show.value = true;
  selected_index.value = key;
  if (read == 0) {
    let { data: info } = await useReadAnnounceData(id);
    if (info.value.err === false) {
      loadData();
    }
  }
  console.log('show:'+show.value);
}
</script>
<style lang="scss" scoped>
.list {
	>div:last-of-type {
		border: none;
	}
}
</style>