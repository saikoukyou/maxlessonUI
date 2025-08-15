<script setup>
import { ref, reactive, onMounted } from 'vue';
import {useUploadStudentImgData} from "~/apis/student";
import {createDiscreteApi} from "naive-ui";
import 'vue-cropper/dist/index.css'
import {VueCropper}  from "vue-cropper";

const status = ref(true);
const loading = ref(false);
const dialogVisible = ref(true); // 假设dialogVisible是用来控制模态框显示隐藏的变量
const cropper = ref(null);

const optionArr = reactive({
  img: '', // 裁剪图片的地址
  info: true, // 裁剪框的大小信息
  outputSize: 0.8, // 裁剪生成图片的质量
  outputType: 'jpeg', // 裁剪生成图片的格式
  canScale: true, // 图片是否允许滚轮缩放
  canMove: true,
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 100, // 默认生成截图框宽度
  autoCropHeight: 100, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例
  fixedNumber: [6, 6], // 截图框的宽高比例
  canMoveBox: false, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  mode: 'cover', // cover 图片铺满容器
});

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  // console.log(file);
  if (file) {
    status.value = false;
    getImageInfo(file);
    // 这里可以添加文件处理的逻辑，比如读取文件大小、类型等
    // ...
  }
};

const getImageInfo = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = e.target.result;
      optionArr.img = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 确认裁剪并处理图片
const emit = defineEmits(['setImg']);
const finish = async () => {
  // 这里应该包含调用vueCropper的getCroppedCanvas或getDataURL等方法
  // 来获取裁剪后的图片，并做进一步处理（比如上传等）
  // ...
  if (cropper.value) {
    console.log(cropper.value);
    try {
      // 假设 cropper 组件提供了一个 getCroppedCanvas 方法来获取裁剪后的 canvas
      const blob = cropper.value.getCropBlob( async (blob) => {
        console.log(blob);
        const formData = new FormData()
        formData.append('file', blob, 'cropped_image.jpg') // 假设你要上传为jpg格式

        let {
          data,
          error
        } = await useUploadStudentImgData(formData);
        const { message } = createDiscreteApi(["message"])
        if (data?.value) {
          emit("setImg",data?.value.url);
          status.value = true;
          message.success("アップロード成功")
          console.log('上传图片后返回的信息：'+JSON.stringify(data.value));
        } else {
          message.error("アップロード失敗")
        }
      }); // 可能是异步的

    } catch (error) {
      console.error('获取裁剪后的 Blob 时出错:', error);
    }
  }
};

</script>

<template>
  <div>
    <div v-if="status">
      <input id="uploadFileInput" type="file" accept="image/png,image/jpeg" @change="handleFileUpload">
    </div>
    <div class="cropper-content" v-else>
      <div class="cropper" style="text-align:center">
        <client-only>
        <VueCropper
            ref="cropper"
            :img="optionArr.img"
            :outputSize="optionArr.outputSize"
            :outputType="optionArr.outputType"
            :info="optionArr.info"
            :canScale="optionArr.canScale"
            :autoCrop="optionArr.autoCrop"
            :autoCropWidth="optionArr.autoCropWidth"
            :autoCropHeight="optionArr.autoCropHeight"
            :fixedBox="optionArr.fixedBox"
            :fixed="optionArr.fixed"
            :fixedNumber="optionArr.fixedNumber"
            :canMove="optionArr.canMove"
            :canMoveBox="optionArr.canMoveBox"
            :original="optionArr.original"
            :centerBox="optionArr.centerBox"
            :infoTrue="optionArr.infoTrue"
            :mode="optionArr.mode"
        >
        </VueCropper>
        </client-only>
      </div>
      <div class="btnGroup">
        <n-button class="cancelBtn" @click="dialogVisible = false">キャンセル</n-button>
        <n-button class="saveBtn" type="primary" @click="finish" :loading="loading">確認</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cropper-content{
  width: 300px;
  padding-bottom: 20px;
  position: absolute;
  top: 10px;
}
.cropper {
  width: 240px;
  height: 240px;
}
.btnGroup{
  margin-top: 12px;
  margin-right: 15px;
  font-size: 12px;
}
.cancelBtn{background-color: #E4E4E4; padding: 10px 20px; border-radius: 8px; cursor: pointer;}
.saveBtn{margin-left: 10px; background-color: #FA8373; color: #FFFFFF; padding: 10px 20px; border-radius: 8px;cursor: pointer;}

</style>