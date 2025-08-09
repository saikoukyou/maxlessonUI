<template>
  <div style="width:20%;">
    <!-- 不在客户端渲染会有不能上传图片的bug -->
    <ClientOnly>
      <template #fallback>
        <!-- 加载中 -->
        <div class="border rounded bg-gray-50 flex items-center justify-center"
             style="width:94px;height:94px;">
          <n-spin show />
          <div><n-button>共有する</n-button></div>
        </div>
      </template>
      <n-upload
          :action="action"
          :headers="headers"
          v-model:file-list="fileList"
          name="file"
          :data="data"
          list-type="image-card"
          :max="1"
          :on-error="handleError"
          :on-finish="handleSuccess"
          :multiple="false"
          :on-preview="handlePreview"
          :on-remove="removeImg"
      />
    </ClientOnly>
  </div>
</template>
<script setup>
import {
  NSpin,
  NUpload,
  createDiscreteApi
} from "naive-ui"
import {useUploadConfig} from "~/apis/user";
import {useDeleteImgDataApi} from "~/apis";

const {
  action,
  headers
} = useUploadConfig()

const props = defineProps({
  modelValue:String,
  data:{
    type:Object
  }
})

const fileList = ref([]);
const emit = defineEmits(["update:modelValue","handlePreview","refreshImg"]);
const { dialog } = createDiscreteApi(["dialog"]);
const { message } = createDiscreteApi(["message"]);

initFileList()

// 上传成功
const handleSuccess = (...e)=>{
  console.log(e);
  const { file,event } = e[0]
  const response = JSON.parse(event.target.response)
  // console.log('response:'+JSON.stringify(response));
  file.url = response.url;
  const { message } = createDiscreteApi(["message"])
  emit("refreshImg");
  message.success("アップロード成功");
  return file
}

// 上传失败
const handleError = (e)=>{
  const { message } = createDiscreteApi(["message"])
  message.error("アップロード失敗")
}

// 初始化filelist
function initFileList(){
  fileList.value = props.modelValue ? [{
    id: props.modelValue,
    name: props.modelValue,
    status: 'finished',
    url: props.modelValue
  }] : []
}

// 监听fileList变化
const stopWatch = watch(()=>fileList,(newVal)=>{
  updateModelValue()
},{
  deep:true
})

function handlePreview () {
  emit("handlePreview")
}

async function removeImg(fileData) {
  props.data.url = fileData.file.url; // 提前设置 URL

  await dialog.warning({
    title: "フアイルを削除しますか?",
    content: "一度削除すると、元に戾せません。",
    positiveText: "削除する",
    negativeText: "キャンセル",
    onPositiveClick: async () => {
      const { data, error } = await useDeleteImgDataApi(props.data);
      if (data?.value?.err === false) {
        fileList.value = []; // 清空 fileList
        emit("update:modelValue", ""); // 通知父组件更新
        handlePreview();
        message.success("削除に成功しました");
      }
    },
    onNegativeClick: () => {
    },
  });

  return false;
}

onBeforeUnmount(()=>stopWatch())

function updateModelValue(){
  let urls = []
  fileList.value.forEach(o=>{
    if(o.status === "finished" && o.url){
      urls.push(o.url)
    }
  })
  emit("update:modelValue",urls[0] || "")
}

</script>
