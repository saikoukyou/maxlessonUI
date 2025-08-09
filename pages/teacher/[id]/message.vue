<template>
	<div class="col gap-l">
		<NoticeAndMessage />

		<div class="bg-third border-radius row gap-xl font-size padding padding-x-xl">
<!--			<div class="padding bg-light-yellow padding-x-xl">重要通知</div>-->
			<div class="padding bg-light-yellow padding-x-xl" :class="cindex === 0 ? '' : 'border-radius-l'" v-for="(category,cindex) in category_list" @click="changeCategory(category.id)">{{category.name}}</div>
		</div>

		<div class="bg-white-yellow border-radius font-size col gap">
			<div class="border border-radius border-color-third padding-l padding-x-xl row">
				<label for="" style="width: 80px;">编号</label>
				<label for="" class="flex">标题</label>
			</div>

			<div class="col normal list">
				<NSpin :show="loading">
					<div v-for="(item, key) in list" :key="item.id" @click="showContent(key,item.announce_schedule_teacher_id,item.is_read)"
						:class="{ 'row padding-l padding-x-xl border-bottom border-style-dotted': 1, 'bg-third': item.is_read == 0 }"
						:status="item.is_read">
						<div style="width: 80px;">{{ item.id }}</div>
						<div class="flex">{{ item.title }}</div>
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
import { NSpin } from "naive-ui";
import {useReadAnnounceData, useTeacherAnnounce} from "~~/apis/teacher";
import {createDiscreteApi, NModal} from "naive-ui";

const list = ref([
	// { id: 1, title: "春节期间的假期规定" },
])

const loading = ref(false)
let selected_category = ref(0);
let category_list = ref([]);
const { dialog } = createDiscreteApi(["dialog"])
let selected_index = ref(0);
let show = ref(false);
let bodyStyle = {
  width: '600px'
};
let segmented =  {
  content: 'soft',
  footer: 'soft'
};
let read_ids = ref([]);

function loadData() {
	loading.value = true
	useTeacherAnnounce(selected_category.value,2)
		.then(result => {
      if (result.data.value !== null) {
        loading.value = false;
        list.value = result.data.value.announces;
        category_list.value = result.data.value.category_list;
        selected_category.value = result.data.value.announce_category_id;
        // list.value = result.data.value.list.data
        // category_list.value = result.data.value.category_list;
        // selected_category.value = category_list.value[0].id;
      }
		})
}

loadData()

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