<template>
	<div class="border border-color-third">
		<div class="tabs bg-third row border-bottom border-color-third">
			<div v-for="item in tabs"
				:class="{ 'flex padding-l row justify-center cursor-pointer': 1, 'bg-white ': tab == item.key }"
				:key="item.key" @click="tab = item.key">
				{{ item.label }}
			</div>
			<div class="flex"></div>
			<div class="flex"></div>
			<div class="flex"></div>
			<div class="flex"></div>
		</div>

    <div v-if="ashow" class="border border-color-third padding-xl whiteBg">
      <agrement v-if="content" :desc="content"></agrement>
      <div class="bg-third padding-l border-radius-s padding-x-xl col gap-l" style="margin-top: 50px;">
        <p>我已阅读并理解了老师合约。自愿签署本合约。</p>
        <div class="row justify-center gap-xl">
          <button class="contract_btn" @click="sign()">签约</button>
        </div>
      </div>
    </div>
    <div v-else class="border border-color-third padding-xl whiteBg">
      <agrement v-if="content" :desc="content"></agrement>
    </div>
	</div>

  <n-modal v-model:show="ishow">
    <div class="col gap padding-xl font-size-s bg-white-yellow">
      <p>
        <label for="">老师姓名</label>
        <span>
          <input id="name_cn" name="name_cn" class="SignInput" v-model="name_cn_input" />
        </span>
      </p>
      <p>
        <label for="">身份证号</label>
        <span>
          <input id="identity_card" name="identity_card" class="SignInput" v-model="identity_card" />
        </span>
      </p>
      <p>
        <label for="">手机号</label>
        <span>
          <input id="tel" name="tel" class="SignInput" v-model="tel" />
        </span>
      </p>
      <div class="bg-third padding-l border-radius-s padding-x-xl col gap-l" style="margin-top: 50px;">
        <div class="row justify-center gap-xl">
          <button class="contract_btn" @click="submitForm(2)">不同意</button>
          <button class="contract_btn" @click="submitForm(1)">同意并签署</button>
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script setup>
import {useAgreementInfoData, useSaveAgreementData} from "~/apis/teacher";
import {formatDate} from "~/composables/useUtil";
import {createDiscreteApi, NModal} from "naive-ui";
import {onMounted} from "vue";
import Agrement from "~/components/Agrement.vue";
const tabs = [
	{ key: "clause", label: "条款" },
]
const tab = ref("clause");
let ashow = ref(false);
let ishow = ref(false);
let name_cn = ref('');
let name_cn_input = ref('');
let teacherAgrement = ref([]);
let content = ref('');
let identity_card = ref('');
let tel = ref('');
const useStore = useMainStore();

const getAgreementInfo = async () => {
  const {data: info  } = await useAgreementInfoData();
  if (info.value != null) {
    content.value = info?.value.agrement ? info?.value.agrement : '';
    name_cn.value = info?.value.name_cn ?? '';
    tel.value = info?.value.tel ?? '';
    identity_card.value = info?.value.identity_card ?? '';
    teacherAgrement.value = info?.value.teacherAgrement ?? [];
    ashow.value = info?.value?.flag == 0 ? true : false;
  }
}

onMounted(() => {
  getAgreementInfo();
})

async function submitForm(status) {
  const { message } = createDiscreteApi(["message"]);
  if (name_cn_input.value !== name_cn.value) {
    message.error('您填写的姓名和系统登录内容不一致，请填写真实姓名或联系管理员');
    return false;
  }

  const {data: saveInfo  } = await useSaveAgreementData({status:status,name_cn:name_cn_input.value,identity_card:identity_card.value,tel:tel.value});
  if (saveInfo.value != null && saveInfo.value.err === false) {
    if (status === 1) {
      useStore.useRefreshTeacherInfo();
      message.success('恭喜您，签约成功');

      useStore.setActiveTeacherUrl("/teacher/centre/dashboard");
      const router = useRouter();
      return router.replace({ path: "/teacher/centre/dashboard" });
      // location.reload();
    } else {
      message.success('如果您不同意本协议您将无法成为老师');//确认框 只有确定按钮
    }
  }
}

async function sign() {
  ishow.value = true;
}
</script>
<style lang="scss" scoped>
label {
	display: inline-block;
	width: 150px;
}
.SignInput {
  background: #fff;
  height: 1.6em;
  width: 200px;
  margin-top: 6px;
  font-size: 14px;
  padding: 2px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.contract_btn {
  height: 48px;
  width: 100%;
  //min-width: 166px;
  max-width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E63737;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  /* margin: 12px auto; */
  letter-spacing: 0.2rem;
  transition: background-color .2s ease;
  cursor: pointer;
  padding: 0 20px;
  border-radius: 8px;
  -ms-box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
  box-shadow: 2px 2px 10px 3px rgb(250 192 20 / 50%);
}
button:active {
  background-color: #E88639; /* 设置点击时的背景色 */
}
.bg-white-yellow p{
  font-size: 16px;
  font-weight: bold;
}
.whiteBg{
  background-color: #FFFFFF;
}
@media screen and (max-width: 520px) {

}

</style>