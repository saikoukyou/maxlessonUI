<template>
	<div class="col gap-xl">
    <n-card title="専用サイト表示内容の修正（自己啓発）" style="margin-bottom: 16px">
      <div class="form bg-white-yellow padding padding-x-xl bold border-radius col gap font-size-s">
        <n-form  ref="formRef" :model="formVal" size="large">
          <div class="row items-center gap">
            リンク：<div class="linkBlock">{{registerLink}}</div>
          </div>
          <div class="row items-center gap">
            <n-form-item path="paytype"  class="w-200">
              <label>责社からのお知らせの表示</label>
              <n-radio-group v-model:value="formVal.notice_show" name="radiogroup">
                <n-space>
                  <n-radio v-for="item in bnoticeRadios" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
          </div>
          <div class="row items-center gap">
            <label>貴社からのお知らせ内容</label>
            <CKEditor v-if="hasInfo" v-model:editorData="formVal.notice1" id="note1" :modelValue="formVal.notice1"  />
          </div>
          <div class="row items-center gap">
            <n-form-item path="paytype"  class="w-200">
              <label>指定プランの一斉有効開始日</label>
              <n-radio-group v-model:value="setDateType" name="radiogroup">
                <n-space>
                  <n-radio v-for="item in setDates" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
          </div>
          <div v-if="setDateType" class="row items-center gap">
            <div class="row items-center gap">
              <n-form-item  class="w-200">
                <label>利用開始日</label>
                <n-date-picker v-model:formatted-value="formVal.start_date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @update:value="dateChange" placeholder="利用開始日" />
                <!--          <input type="text" class="input" v-model="form.starttime" />-->
              </n-form-item>
            </div>
          </div>
          <div class="row items-center gap">
            <n-form-item  class="w-200">
              <label>リンク有効開始日時</label>
              <n-date-picker v-model:formatted-value="formVal.open_time_begin" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @update:value="openTimeBeginChange" placeholder="利用開始日" />
              <!--          <input type="text" class="input" v-model="form.starttime" />-->
            </n-form-item>
          </div>
          <div class="row items-center gap">
            <n-form-item  class="w-200">
              <label>リンク有効終了日時</label>
              <n-date-picker v-model:formatted-value="formVal.open_time_end" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @update:value="openTimeEndChange" placeholder="利用開始日" />
              <!--          <input type="text" class="input" v-model="form.starttime" />-->
            </n-form-item>
          </div>
          <div class="row justify-center" style="margin-top: 20px;" @click="onSubmitSetting">
            <div class="button-submit">確認</div>
          </div>
        </n-form>
      </div>
    </n-card>
	</div>
</template>
<script setup>
import { ref } from "vue"
import {
  useBusinessMemberSettingInfoApi,
  useBusinessMemberSettingsApi,
} from "~/apis/corporate";
import {
  NForm,
  NFormItem,
  NDatePicker,
  NRadioGroup,
  NRadio,
  NSpace,
  createDiscreteApi,
  NCard,
  NCheckbox, NCheckboxGroup
} from "naive-ui";
import CKEditor from "~/components/CKEditor.vue";

const setDates = [
  { value: 0, label: '指定しない' },
  { value: 1, label: '指定' },
];

const bnoticeRadios = [
  { value: 0, label: '表示しない' },
  { value: 1, label: '表示する' },
];

const formVal = reactive({
  id: 0,
  start_date: null,
  open_time_begin: null,
  open_time_end: null,
  notice_show: 0,
  notice1: ''
});

const formRef = ref(null);
const rules = computed(() => {
  let r = {
    first_name: [{
      required: true,
      message: "名前を入力してください",
      trigger: "blur",
      max: 32
    }],
    last_name: [{
      required: true,
      message: "苗字を入力してください",
      trigger: "blur",
      max: 32
    }],
    email: [{
      type: 'email',
      required: true,
      message: "正しいメールアドレスを入力してください。",
      trigger: "blur",
      min: 4,
      max: 30,
    }],
    plan_id: [{
      required: true,
      message: "プランを選択してください。",
      trigger: "blur",
    }],
  }

  return r
});

const loading = ref(false);
let setting = ref([]);
let registerLink = ref('');
let businessRegisterLink = ref('');
let setDateType = ref(0);
let hasInfo = ref(false);

const getInfo = async () => {
  const { data:info } = await useBusinessMemberSettingInfoApi();
  if (info?.value) {
    setting.value = info?.value?.setting ?? [];
    registerLink.value = info?.value?.setting?.register_link ?? '';
    businessRegisterLink.value = info?.value?.setting?.business_register_link ?? '';
    formVal.id = info?.value?.setting?.id ?? 0;
    formVal.id = info?.value?.setting?.id ?? 0;
    formVal.id = info?.value?.setting?.id ?? 0;
    if (info?.value?.setting?.start_date) {
      setDateType.value = 1;
      formVal.start_date = info?.value?.setting?.start_date ?? null;
    }
    formVal.notice_show = info?.value?.setting?.notice_show ?? 0;
    formVal.notice1 = info?.value?.setting?.notice1 ?? '';
    hasInfo.value = true;
  }
}

onMounted(() => {
  getInfo();
})

function dateChange(value,strValue) {
  formVal.start_date = strValue;
}
function openTimeBeginChange(value,strValue) {
  formVal.open_time_begin = strValue;
}
function openTimeEndChange(value,strValue) {
  formVal.open_time_end = strValue;
}

const onSubmitSetting = async () => {

  const { message } = createDiscreteApi(["message"]);
  console.log('onSubmitSetting:'+JSON.stringify(formVal));
  if (setDateType.value === 1 && !formVal.start_date) {
    message.info("指定プランの一斉有効開始日は必ず入力してください。");
    return;
  }

  loading.value = true;

  const {data, error  } = await useBusinessMemberSettingsApi(formVal);

  loading.value = false;

  if (error.value) return;

  if (data?.value && data?.value.err === false) {
    message.success("変更に成功しました")
  } else {
    let return_errors = data.value.errors;
    if (return_errors) {
      Object.keys(return_errors).forEach(key=>{
        message.error(return_errors[key][0]);
      })
      return;
    }
    return message.error(data?.value.err_msg || 'サービス側エラー');
  }
}

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
</style>