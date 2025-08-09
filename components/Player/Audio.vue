<!-- Plyr音频组件 -->
<template>
  <audio ref="audioElement" :src="props.url" controls></audio>

</template>
<script setup>
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'
const props = defineProps({
    title: String,
    cover: String,
    url: String
})

const audioElement = ref(null);

onMounted(() => {
  // 设置音频源

  new Plyr(audioElement.value, {
    // 配置项...
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    settings: {
      quality: {
        default: 576,
        options: [432, 576, 720, 1080]
      }
    }
  });

});

const playPause = () => {
  audioElement.value.plyr.togglePlay();
};

// //销毁播放器
onBeforeUnmount(() => {
  if (audioElement?.value) {
    audioElement?.value?.destroy()
  }
})
</script>