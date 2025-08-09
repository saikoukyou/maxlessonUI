<template>
	<div class="col gap padding-xl">
		<LoadingSkeleton :count="1" v-if="loading" />
		<div class="col gap padding-xl" v-else>
      <div class="payinfo">
        请老师提供本人名义的银行账户。禁止使用本人名义以外的银行账户。
      </div>
      <n-form  ref="formRefPay" :model="pay_info" :rules="rulesPay" size="large">
<!--        <n-form-item :show-label="false" path="alipay">-->
<!--          <label>支付宝账号</label>-->
<!--          <n-input class="SignInput" clearable v-model:value="pay_info.alipay" placeholder="支付宝账号" />-->
<!--        </n-form-item>-->
        <div class="item">
          <label for="">银行账户</label>
        </div>
        <n-form-item :show-label="false" path="bank_city">
          <label>开户城市</label>
          <n-input class="SignInput" clearable v-model:value="pay_info.bank_city" placeholder="开户城市" />
        </n-form-item>
        <n-form-item :show-label="false" path="bank_name">
          <label>银行账户</label>
          <n-select name="question" id="question" v-model:value="pay_info.bank_type" :options="bankOptions" placeholder="银行账户">
          </n-select>
<!--          <n-input class="SignInput" clearable v-model:value="pay_info.bank_type" placeholder="银行账户" />-->
        </n-form-item>
        <n-form-item :show-label="false" path="bank_name">
          <label>支行名称</label>
          <n-input class="SignInput" clearable v-model:value="pay_info.bank_name" placeholder="支行名称" />
        </n-form-item>
        <div style="padding-left: 150px;">示例：6217000000000000000(卡号中间不含空格。)</div>
        <n-form-item :show-label="false" path="bank_accounts">
          <label>银行卡号</label>
          <n-input class="SignInput" clearable v-model:value="pay_info.bank_accounts" placeholder="银行卡号" />
        </n-form-item>
        <n-form-item :show-label="false" path="name_cn">
          <label>持卡人姓名</label>
          <n-input class="SignInput" clearable disabled v-model:value="pay_info.name_cn" placeholder="持卡人姓名" />
        </n-form-item>
        <div style="text-align: center;">
          <n-button class="Submit" type="submit" @click="submitPay" :loading="loading">
            <span>提交</span>
          </n-button>
        </div>
      </n-form>
<!--			<div class="item">-->
<!--				<label for="">支付宝账号</label>-->
<!--				<input class="input" v-model="pay_info.alipay" />-->
<!--			</div>-->
<!--			<div class="item">-->
<!--				<label for="">银行账户</label>-->
<!--			</div>-->
<!--			<div class="item">-->
<!--				<label for="">开户城市</label>-->
<!--				<input class="input" v-model="pay_info.bank_city" />-->
<!--			</div>-->
<!--			<div class="item">-->
<!--				<label for="">支行名称</label>-->
<!--				<input class="input" v-model="pay_info.bank_name" />-->
<!--			</div>-->
<!--			<div class="item">-->
<!--				<label for="">银行卡号</label>-->
<!--				<input class="input" v-model="pay_info.bank_accounts" />-->
<!--			</div>-->
<!--			<div class="item">-->
<!--				<label for="">持卡人姓名</label>-->
<!--				<input class="input" v-model="pay_info.name_cn" />-->
<!--			</div>-->

		</div>
	</div>
</template>
<script setup>
import { ref } from "vue"
import {useTeacherAccountPayInfo, useTeacherUpdateInfoData, useUpdatePayInfoData} from "~~/apis/teacher";
import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NSelect} from "naive-ui";

// const form = ref({
// 	alipay: null,
// 	bankcard: {
// 		city: null,
// 		branch: null,
// 		number: null,
// 		realname: null,
// 	},
// })
let pay_info = ref([]);
const loading = ref(true);
const formRefPay = ref(null);
const rulesPay = computed(() => {
  let r = {
    // alipay: [{
    //   required: true,
    //   message: "请输入小于255位字符的支付宝账号",
    //   trigger: "blur",
    //   max: 255
    // }],
    bank_city: [{
      required: true,
      message: "请输入小于255位字符的开户城市",
      trigger: "blur",
      max:255
    }],
    bank_type: [{
      required: true,
      message: "请选择银行账户",
      trigger: "blur",
      max:255
    }],
    bank_name: [{
      required: true,
      message: "请输入小于255位字符的支行名称",
      trigger: "blur",
      max:255
    }],
    bank_accounts: [{
      required: true,
      message: "请输入正确的银行卡号",
      trigger: "blur",
      max:255
    }],
    // name_cn: [{
    //   required: false,
    //   message: "请输入小于32位的持卡人姓名",
    //   trigger: "blur",
    //   max:32
    // }],
  }
  return r
});
const useStore = useMainStore();
let bankOptions = ref([]);

let { data:payInfo } = await useTeacherAccountPayInfo();
if (payInfo.value != null) {
  loading.value = false
  pay_info.value = payInfo.value;
  // pay_info.value.bank_type = payInfo?.value?.bank_type;
  bankOptions.value = Object.keys(payInfo?.value?.bank_type_map).map(
      key => ({
        label: payInfo?.value?.bank_type_map[key],
        value: Number(key)
      })
  );
  // form.value.alipay = payInfo.value.alipay
  // form.value.bankcard.city = payInfo.value.bank_city
  // form.value.bankcard.branch = payInfo.value.bank_name
  // form.value.bankcard.number = payInfo.value.bank_accounts
  // form.value.bankcard.realname = payInfo.value.name_cn

}

const submitPay = () => {
  formRefPay.value.validate(async (errors) => {
    if (errors) return;

    loading.value = true

    const {data, error } = await useUpdatePayInfoData({
      bank_type:pay_info.value.bank_type,
      bank_name:pay_info.value.bank_name,
      bank_city:pay_info.value.bank_city,
      // alipay:pay_info.value.alipay,
      bank_accounts:pay_info.value.bank_accounts,
      name_cn:pay_info.value.name_cn,
    });

    loading.value = false

    if (error.value) return;

    const { message } = createDiscreteApi(["message"])
    if (data.value != null && data?.value.err === false) {
      useStore.useRefreshTeacherInfo();
      message.success("保存成功")
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

  })
}
// async function submitPay() {
//   let { data } = await useUpdatePayInfoData({
//     bank_name:pay_info.value.bank_name,
//     bank_city:pay_info.value.bank_city,
//     alipay:pay_info.value.alipay,
//     bank_accounts:pay_info.value.bank_accounts,
//     name_cn:pay_info.value.name_cn,
//   });
//   if (data.value !== null && data.value.err === false) {
//     const { message } = createDiscreteApi(["message"]);
//     message.success('保存成功');
//   }
// }
// useTeacherAccountPayInfo()
// 	.then(result => {
// 		loading.value = false
// 		const value = result.data.value
// 		form.value.alipay = value.alipay
// 		form.value.bankcard.city = value.bank_city
// 		form.value.bankcard.branch = value.bank_name
// 		form.value.bankcard.number = value.bank_accounts
// 		form.value.bankcard.realname = value.name_cn
// 	})
</script>
<style lang="scss" scoped>
.item {
	height: 50px;
	display: flex;
	align-items: center;
  font-weight: 800;
}

label {
	width: 150px;
	display: inline-block;
}
.payinfo{
  margin:0 0 20px 0;
}

@media screen and (max-width: 520px) {
  .padding-xl{
    padding: 0;
  }
}
</style>