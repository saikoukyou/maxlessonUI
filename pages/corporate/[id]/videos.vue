<template>
	<div class="col gap-xl">
		<h1 class="bold">購入済みリスト</h1>
		<div class="list">
			<div v-for="(bitem,bindex) in buyList">
				<div class="td">
					<p>冊：{{bindex}}</p>
				</div>
        <div class="td" v-for="(vitem) in bitem">
          課：{{vitem}}
        </div>
			</div>
		</div>
    <h1 class="bold">未購入リスト</h1>
    <div class="list">
      <div v-for="(nitem,nindex) in noBuyList">
        <div class="td">
          <p>冊：{{nindex}}</p>
        </div>
        <div class="td" v-for="(vitem) in nitem">
          課：{{vitem}}
        </div>
      </div>
    </div>
	</div>
</template>
<script setup>
import {useBusinessVideoVolumeListApi} from "~/apis/corporate";

let buyList = ref([]);
let noBuyList = ref([]);
const useStore = useMainStore();
const corporate = useStore.corporateInfo;
const getList = async (id) => {
  let { data: data } = await useBusinessVideoVolumeListApi(id);
  if (data?.value) {
    console.log('视频：'+JSON.stringify(data.value));
    buyList.value = data?.value?.list?.buy ?? [];
    noBuyList.value = data?.value?.list?.noBuy ?? [];
  }
}
onMounted(() => {
  getList(corporate?.id ?? 0);
})

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
		height: 90px;
	}

	.tr {
		display: grid;
		grid-template-columns: 0.8fr 3fr 2fr 2fr 2fr 1.5fr;

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
				bottom: -10px;
				width: 60px;
			}
		}

		.td:nth-of-type(1),
		.td:nth-of-type(2) {
			background-color: var(--color-third);
		}

		.bordered {
			border: 1px solid var(--border-color-black);
			border-radius: 10px;
			width: fit-content;
			padding: 0 10px;
			display: flex;
			gap: 10px;
			font-size: 10px;
		}
	}
}
</style>