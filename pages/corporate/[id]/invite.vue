<template>
	<div class="col gap-xl">
    <n-card title="貴社專用募集サイト" style="margin-bottom: 16px">
      <n-tabs type="line" animated default-value="person_invite">
        <n-tab-pane v-if="pshow" name="person_invite" tab="自己啓発" style="font-size: 20px;">
          <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
          <div class="row items-center gap linkBlock">
            {{registerLink}}
          </div>
          <div>
            <nuxt-link class="siteLink" to="/corporate/center/invite-pay">専用サイト表示内容の修正</nuxt-link>
          </div>
          </div>
        </n-tab-pane>
        <n-tab-pane v-if="bshow" name="business_invite" tab="法人決済" style="font-size: 20px;">
          <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
          <div class="row items-center gap linkBlock">
            {{businessRegisterLink}}
          </div>
          <div>
            <nuxt-link class="siteLink" to="/corporate/center/invite-free">専用サイト表示内容の修正</nuxt-link>
          </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
	</div>
</template>
<script setup>
import { ref } from "vue"
import {
  useBusinessMemberSettingInfoApi,
} from "~/apis/corporate";
import {NCard,NTabs,NTabPane} from "naive-ui";

const loading = ref(false);
let setting = ref([]);
let registerLink = ref('');
let businessRegisterLink = ref('');
let pshow = ref(0);
let bshow = ref(0);

const getInfo = async () => {
  const { data:info } = await useBusinessMemberSettingInfoApi();
  if (info?.value) {
    setting.value = info?.value?.setting ?? [];
    pshow.value = setting?.value?.is_show ?? 0;
    bshow.value = setting?.value?.business_is_show ?? 0;
    registerLink.value = info?.value?.setting?.register_link ?? '';
    businessRegisterLink.value = info?.value?.setting?.business_register_link ?? '';
  }
}

onMounted(() => {
  getInfo();
})

</script>
<style lang="scss" scoped>
.steps {
	>div {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-left: 1px solid #ffffff;
		padding-left: 10px;

		h5 {
			color: white;
		}

		p {
			line-height: 20px;
			text-align: center;
		}
	}
}

.form .row {
	.input {
		width: 200px;
    border: 1px solid var(--input-border-color);
	}
  .n-select {
    width: 200px;
    //border: 1px solid var(--input-border-color);
  }
  .n-input {
    width: 200px;
  }

	p {
		width: 100px;
	}
}

.form .radio {
	.radio-item {
		border: 1px solid var(--input-border-color);
		padding: 10px;
	}
}

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
		grid-template-columns: 1fr 2fr 3fr 3fr 2fr 2fr;

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
				width: 50px;
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
.siteLink{
  font-size: 12px;
  text-decoration: underline;
  color: #3682E0;
  font-weight: bold;
}
</style>