<template>
<div class="mypageTemplate">

  <div v-if="info">
    <h2>{{info.title}}</h2>
    <div v-if="info.url" v-html="info.url"></div>
  </div>
  <div style="height: 200px;"></div>
</div>
</template>

<script setup>
import {ref} from "vue";
import {useStudentVideoInfoApi} from "~/apis/student";

let info = ref([]);
const route = useRoute();

if (route && route?.query?.id) {
  let {data} = await useStudentVideoInfoApi(route?.query?.id);
  if (data?.value) {
    info.value = data?.value;
  }
}

</script>
    