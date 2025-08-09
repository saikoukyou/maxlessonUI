<template>
	<div class="col gap-xl">
    <n-card title="請求書 & 領収書" style="margin-bottom: 16px">
		<div class="list">
			<div class="tr bold tablehou">
				<span class="th">番号</span>
				<span class="th">請求日</span>
				<span class="th">金额</span>
				<span class="th">請求書</span>
				<span class="th">確認ステータス</span>
				<span class="th">領収書</span>
			</div>
			<div class="tr item" v-for="(ritem,rindex) in list">
				<div class="td bold">
					{{rindex+1}}
					<NewspaperOutline class="svg" />
				</div>
				<div class="td">
					<p><b>{{ritem.date}}</b></p>
				</div>
				<div class="td">
					<p>{{ritem.pay_amount}} 円</p>
				</div>
				<div class="td">
					<p class="bordered">
						<span v-if="ritem.file"><a :href="ritem.file">ダウンロード</a></span>
					</p>
				</div>
				<div class="td">
					<p>{{checkOption[ritem.check_status]}}</p>
				</div>
				<div class="td">
					<p class="bordered">
						<span v-if="ritem.vote_img"><a :href="ritem.vote_img">ダウンロード</a></span>
					</p>
				</div>
			</div>

<!--			<div class="tr item">-->
<!--				<div class="td bold">-->
<!--					2-->
<!--					<NewspaperOutline class="svg" />-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p><b>2023 年 12 月 12 日</b></p>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p>768,900 円</p>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p class="bordered">-->
<!--						<span>ダウンロード</span>-->
<!--					</p>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p>未確定</p>-->
<!--				</div>-->
<!--				<div class="td">-->
<!--					<p class="bordered">-->
<!--						<span>ダウンロード</span>-->
<!--					</p>-->
<!--				</div>-->
<!--			</div>-->
		</div>
    <n-pagination size="large" style="margin-top:10px;" :item-count="totalRows" :page="page"
                  :on-update:page="handlePageChange" />
    </n-card>
	</div>
</template>
<script setup>
import { NewspaperOutline } from '@vicons/ionicons5'
import {useBusinessBillingLogsApi} from "~/apis/corporate";
import {NPagination} from "naive-ui";
import {ref} from "vue";
import {NCard} from "naive-ui";

let list = ref([]);
// const { data } = await useBusinessBillingLogsApi();
// if (data?.value != null) {
//   list.value = data?.value ?? [];
// }
const page = ref(1);
let totalRows = ref(0);
let checkOption = ref([]);
const getList = async () => {
  const {
    pending,
    error,
    data,
    rows,
    total,
    refresh
  } = await usePage(() => {
    return useBusinessBillingLogsApi(() => {
      return {
        page: page?.value || 1,
      }
    })
  })
  if (data?.value) {
    list.value = rows?.value ?? [];
    totalRows.value = total?.value ?? 0;
    checkOption.value = data?.value?.maps?.check_status ?? [];
  }

}

onMounted(() => {
  getList();
})

function handlePageChange(p) {
  page.value = p;
  getList();
}
</script>
<style lang="scss" scoped>
.list {
	font-size: 12px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	p {
		line-height: 18px;
	}

	.item {
		height: 50px;
	}

	.tr {
		display: grid;
		grid-template-columns: 1fr 3fr 3fr 3fr 2fr 2fr;

		.td {
			padding: 10px;
			background-color: var(--color-yellow-light);
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 5px;
			position: relative;
			overflow: hidden;

			svg {
				color: #fff;
				position: absolute;
				bottom: 0px;
				width: 30px;
				right: 10px;
			}
		}

		.td:nth-of-type(1),
		.td:nth-of-type(2) {
			background-color: var(--color-third);
		}

		.bordered {
			// border: 1px solid var(--border-color-black);
			border-radius: 10px;
			width: fit-content;
			padding: 0 10px;
			display: flex;
			gap: 10px;
			font-size: 10px;
			background: var(--color-third);
		}
	}
}
</style>