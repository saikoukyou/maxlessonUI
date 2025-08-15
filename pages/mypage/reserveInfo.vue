<template>
    <div class="netchina_contents blockW">
      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/reserveInfo"><li class="selected">Step1.予約対象のご選択</li></nuxt-link>
        <nuxt-link to="/mypage/reserveTime"><li class="">Step2.週間スケジュールの設定</li></nuxt-link>
      </ul>
      <div class="userInfoContents">
        <n-form  ref="formRef" :model="form" :rules="rules" size="small">
          <n-form-item :show-label="false" path="chinese_level">
            <label for="">老师范围</label>
            <n-radio-group v-model:value="form.reserve_type" name="reserve_type">
              <n-space>
                <n-radio v-for="rtype in typeOptions" :key="rtype.value" :value="rtype.value" @change="changeReserveType(rtype.value)">
                  {{ rtype.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
        <div class="userInfoButtonArea">
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span>送信</span>
          </n-button>
        </div>
        </n-form>
      </div>
    </div>
</template>


<script setup>

import {useSaveAutoReserveTypeApi, useStudentInfoDataApi, useUpdateStudentInfoDataApi} from "~/apis/student";
 import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio} from "naive-ui";
import {useMainStore} from "~/composables/store";

 //加载效果
 const loading = ref(false)
 const formRef = ref(null)
 let typeOptions = [{label: '只接受收藏的老师',value: 1},{label: '优先收藏的老师',value: 2}]
const form = reactive({
  reserve_type:""
});
 const bnum = ref(0);

const rules = computed(() => {
  let r = {
    reserve_type: [{
      required: true,
      message: "老师类型を入力してください",
      trigger: "blur"
    }],
  }

  return r
});
let uinfo = ref(null);
const useStore = useMainStore();

onMounted(async () => {
  const {pending, data: info  } = await useStudentInfoDataApi();
  if (info?.value) {
    useStore.setStudentInfo(info?.value);
    uinfo.value = info?.value ?? [];
    form.id = uinfo?.value?.id ?? 0;
    form.reserve_type = info?.value?.reserve_type ?? 0;
    bnum.value = uinfo?.value?.bnum ?? 0;
  }
});

 const onSubmit = () => {
   formRef.value.validate(async (errors) => {
     if (errors) return;

     loading.value = true

     let {
       data,
       error
     } = await useSaveAutoReserveTypeApi(form)

     loading.value = false

     const { message } = createDiscreteApi(["message"])
     if (data?.value && data?.value?.err === false) {
       message.success(data.value.err_msg)
     } else {
       return message.error(data?.value.err_msg || 'サービス側エラー');
     }

   })
 }

 useEnterEvent(() => onSubmit())

function changeReserveType(value) {
  if (value === 1) {
    //判断当前学生的收藏老师数量是否大于10；后台需要计算出学生收藏老师的数量
    if (bnum.value < 10) {
      const { message } = createDiscreteApi(["message"])
      message.error('老师收藏数量小于10，请去添加收藏的老师');
      form.reserve_type =  info?.value?.reserve_type ?? 0;
    }
  }
}

</script>
<style lang="scss" scoped>
.n-input:not(.n-input--autosize) {
  width: 30%;
}
.n-select {
  width: 30%;
}
.netchina_contents .userInfoMenu{
  margin-top: 0;
}
.netchina_contents .userInfoMenu{
  margin-top: 0;
}
.netchina_contents .userInfoMenu li{
  width: 50%;
  font-size: 15px;
  padding: 4px 0;
}
.userInfoMenu{
  height: auto;
}
.userInfoContents{
  padding: 40px;
}
.netchina_contents .userInfoMenu .selected{
  background-color: #FA8373;
  color: #FFFFFF;
}
@media screen and (max-width: 520px) {
  .netchina_contents .userInfoMenu li{
    padding: 10px 10px 0 10px;
  }
  .netchina_contents .userInfoMenu .selected{
    height: auto;
  }
  .userInfoContents{
    padding: 20px 0;
  }
}

</style>