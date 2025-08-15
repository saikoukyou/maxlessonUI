<template>
    <div class="netchina_contents blockW">

      <ul class="userInfoMenu">
        <nuxt-link to="/mypage/reserveInfo"><li class="">Step1.予約対象のご選択</li></nuxt-link>
        <nuxt-link to="/mypage/userMail"><li class="selected">Step2.週間スケジュールの設定</li></nuxt-link>
      </ul>
      <div class="userInfoContents">
        <n-form  :model="form" size="small">
          <n-tabs type="line" animated>
            <n-tab-pane v-for="(typeItem) in typeOptions" :name="typeItem['name']" :tab="typeItem['label']">
              <n-form-item v-if="autoArr" v-for="(item,key) in autoArr[typeItem['value']]" :show-label="false" path="time">
                <label>时间</label>
                <n-select :name="'time'+typeItem['value']+'_'+key" :id="'time'+typeItem['value']+'_'+key" v-model:value="autoArr[typeItem['value']][key]['time']" :options="timeOptions" placeholder="">
                </n-select>
              </n-form-item>
            </n-tab-pane>
          </n-tabs>
        <div style="height: 40px;"></div>
        <div class="userInfoButtonArea">
          <n-button class="Submit" type="submit" @click="onSubmit" :loading="loading">
            <span>送信</span>
          </n-button>
        </div>
        </n-form>
      </div>


    </div>


    <div style="height: 200px;"></div>



</template>


<script setup>

import {useAddAutoReserveTimeApi, useStudentInfoDataApi, useUpdateStudentInfoDataApi} from "~/apis/student";
 import {createDiscreteApi, NButton, NForm, NFormItem, NInput, NSelect, NRadioGroup, NRadio, NTabs, NTabPane} from "naive-ui";

 //加载效果
 const loading = ref(false)
 // const formRef = ref(null)
 let typeOptions = [{label: '星期一',value: '1',name: 'monday'},{label: '星期二',value: '2',name: 'tuesday'},{label: '星期三',value: '3',name: 'wednesday'},{label: '星期四',value: '4',name: 'thursday'},{label: '星期五',value: '5',name: 'friday'},{label: '星期六',value: '6',name: 'saturday'},{label: '星期日',value: '7',name: 'sunday'}]
const form = reactive({
})

// const rules = computed(() => {
//   let r = {
//     reserve_type: [{
//       required: true,
//       message: "老师类型を入力してください",
//       trigger: "blur"
//     }],
//   }
//
//   return r
// });
let uinfo = ref(null);
let autoArr = ref([]);
let times = ref([]);
let timeOptions = ref([]);
const useStore = useMainStore();

onMounted(async () => {
  const {pending, data: info  } = await useStudentInfoDataApi();
  if (info?.value) {
    useStore.setStudentInfo(info?.value);
    uinfo.value = info?.value;
    autoArr.value = info?.value.auto ?? [];
    times.value = info?.value.times ?? [];
    timeOptions.value = Object.keys(times.value).map(
        key => ({
          label: times.value[key],
          value: key
        })
    );
    // console.log('auto:'+JSON.stringify(autoArr.value));
  }
});

 const onSubmit = async () => {
     loading.value = true
     let {
       data,
       error
     } = await useAddAutoReserveTimeApi({arr:autoArr.value,id:uinfo.value.id})

     loading.value = false

   const { message } = createDiscreteApi(["message"])
   if (data?.value && data?.value?.err === false) {
     message.success(data.value.err_msg)
   } else {
     return message.error(data?.value.err_msg || 'サービス側エラー');
   }

 }

 useEnterEvent(() => onSubmit())
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
.netchina_contents .userInfoMenu li{
  width: 50%;
  font-size: 15px;
  padding: 4px 0;
}
.userInfoMenu{
  height: auto;
}
.userInfoContents{
  padding: 20px 40px;
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