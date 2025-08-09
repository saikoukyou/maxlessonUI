<template>
	<div class="teacher-class-evaluate col gap-xl">
		<LoadingSkeleton :count="2" v-if="!useStore.teacherInfo" />

		<div class="padding-xl bg-light-yellow col gap" v-if="useStore.teacherInfo">
			<div class="row gap-xl">
				<div>
					<img :src="useStore.teacherInfo.face_img5" alt="" width="100" />
				</div>
				<div class="col gap">
					<p class="row gap">
						<span class="font-size">{{useStore.teacherInfo.name_pinyin}}</span>
            <span class="teacherN">{{ useStore.teacherInfo.name_cn }}</span>
						<span v-if="false" class="grey"></span>
						<span>老师</span>
					</p>
					<p>
            {{useStore.teacherInfo.province_addr}}{{ useStore.teacherInfo.current_address }}
					</p>
					<p v-if="useStore.teacherInfo.learn_type == 0">日本語 <span>{{ useStore.teacherInfo.japanese_level }}</span>
            <span v-if="teacher_japanese_level">{{teacher_japanese_level[useStore.teacherInfo.japanese_level]}} </span>　
            英語 <span>{{ useStore.teacherInfo.english_level }}</span>
            <span v-if="teacher_english_level">{{teacher_english_level[useStore.teacherInfo.english_level]}} </span>
					</p>
          <p v-else>
            <span>{{ useStore.teacherInfo.topic_str }}</span>
            <span>{{ useStore.teacherInfo.dialect }}</span>
          </p>
<!--					<p>５０ポイント</p>-->
					<p class="grey" v-if="score">{{ score }}</p>
				</div>
			</div>

			<div class="row gap-l font-size-s items-center">
				<div class="border border-color-third padding-s fit-content row gap items-center">
					<img src="@/assets/SVG/icon_heart.svg" alt="" style="height:12px;" />
					<span>お気に入り</span>
				</div>
				<img src="@/assets/SVG/label_teacher1.svg" alt="" style="height:20px;" />
				<img src="@/assets/SVG/label_teacher2.svg" alt="" style="height:20px;" />
				<img src="@/assets/SVG/label_teacher3.svg" alt="" style="height:20px;" />
				<img src="@/assets/SVG/label_teacher4.svg" alt="" style="height:20px;" />
			</div>
		</div>

		<div class="padding-xl bg-light-yellow row gap items-center font-size-14" v-if="score != null">
			<span>最近半年平均评分</span>
			<div class="stars row items-center gap" style="margin-left: 100px;">
				<Stars :score="score" />
			</div>
		</div>

		<p class="font-size-14">所有评分（最近的在最前面）</p>
		<div class="padding-xl bg-white col gap-xl font-size-14">
			<n-spin :show="loading">
				<div v-for="(item, index) in comments.data" :key="index" class="col gap">
					<div class="row gap items-center">
						<span style="width: 150px;">{{ item.registered }}</span>
						<div class="stars row items-center gap flex">
							<Stars :score="item.score" />
						</div>
					</div>
					<div class="row gap items-center">
						<span style="width:150px"></span>
						<div class="flex" v-html="item.comment">
						</div>
					</div>
				</div>

				<n-pagination v-if="comments.total != null" style="margin-top:10px;" v-model:page="comments.page" :page-size="comments.per_page"
					:page-count="Math.ceil(comments.total / comments.per_page)" :on-update:page="onChangePage" />
			</n-spin>
		</div>
	</div>
</template>
<script setup>
import { ref } from "vue"
import { useTeacherAccountEvaluations } from "~~/apis/teacher";
import { NPagination, NSpin } from "naive-ui";
const comments = ref({
	total: null,
	page: 1,
	per_page: 0,
	data: []
})

const useStore = useMainStore();
const teacher = useStore.teacherInfo;
const score = ref(null)
const loading = ref(false)
let teacher_japanese_level = ref([]);
let teacher_english_level = ref([]);

function loadData(page) {
	loading.value = true

	useTeacherAccountEvaluations(1, page)
		.then(result => {
			loading.value = false
			const value = result.data.value
			score.value = parseFloat(value.avgScore)
			comments.value.page = value.list.current_page
			comments.value.total = value.list.total
			// comments.value.total = 50
			comments.value.data = value.list.data
			comments.value.per_page = value.list.per_page
		})
}

function onChangePage(page) {
  loadData(page)
}

onMounted(() => {
	loadData(comments.value.page);
  teacher_japanese_level.value = useStore?.teacherInfo?.maps?.japanese_level ?? [];
  teacher_english_level.value = useStore?.teacherInfo?.maps?.english_level ?? [];
})
</script>

<style scoped>
  .font-size{
    display: block;
  }
  .teacherN{
    font-size: 20px;
    display: block;
    font-weight: bold;
  }
</style>