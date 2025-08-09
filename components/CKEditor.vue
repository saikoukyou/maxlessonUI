<template>
  <div ref="editorContainer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

// 触发父组件事件的定义
const emit = defineEmits(['update:editorData'])

// 动态导入 CKEditor 和 Font 插件
const ClassicEditor = ref(null)

const editorContainer = ref(null)

onMounted(async () => {
  if (process.client) {
    // 动态导入 CKEditor
    const { default: Editor } = await import('@ckeditor/ckeditor5-build-classic')

    // 配置 CKEditor
    const editorConfig = {
      toolbar: {
        items : [
        'bold', 'italic', 'fontSize', 'fontFamily', 'fontColor', 'link', '|',
        'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo'
        ]
      },
      language: 'ja'
    }

    ClassicEditor.value = Editor
    ClassicEditor.value
        .create(editorContainer.value, editorConfig)
        .then(editor => {
          // 监听编辑器内容变化
          editor.model.document.on('change:data', () => {
            const editorContent = editor.getData()  // 获取编辑器的 HTML 内容
            emit('update:editorData', editorContent)  // 向父组件发送更新的值
          })
          console.log('CKEditor initialized:', editor)
          console.log('props.modelValue:', props.modelValue)
          // 设置初始值
          editor.setData(props.modelValue)
        })
        .catch(error => {
          console.error('There was an error initializing the editor:', error)
        })
  }
});

</script>

<style scoped>
/* 你可以根据需要添加样式 */
</style>
