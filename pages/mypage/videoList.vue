<template>
<div class="mypageTemplate">

  <div>
    <table>
      <tr v-for="(video) in videoList">
        <td>
          {{video.title}}
        </td>
        <td>
          {{name}}
        </td>
        <td style="color:blue;">
          <NuxtLink :to="'/mypage/videoDetail?id='+video.id">
            視聴
          </NuxtLink>
        </td>
      </tr>
    </table>
  </div>

  <div style="height: 200px;"></div>
  <n-pagination size="large" style="margin-top:10px;" :item-count="alltotal" :page="page" :page-size="limit"
                :on-update:page="handlePageChange" />
</div>
</template>

<script setup>
import {ref} from "vue";
import {useBookmarkTeachersListApi, useStudentVideosApi} from "~/apis/student";
import {usePage} from "~/composables/usePage";
import {NPagination} from "naive-ui";

let videoList = ref([]);
const route = useRoute();
let alltotal = ref(0);
let limit = ref(10);
let page = ref(1);
const name = ref('');

if (route && route?.query?.name) {
  name.value = route?.query?.name;
}

const getList = async () => {
  if (route && route?.query?.id) {
    let {
      pending,
      data,
      error,
      rows,
      total
      // refresh
    } = await usePage(() => {
      return useStudentVideosApi({
        id: route?.query?.id,
        per_page: limit.value,
        page: page?.value || 1,
        get_count: true,
      })
    })

    if (data?.value) {
      videoList.value = rows?.value ?? [];
      alltotal.value = total?.value ?? 0;
    }

  }


  // const {data: list  } = await useStudentVideosApi(route?.query?.id);
  // if (data?.value) {
  //   videoList.value = list?.value?.data ?? [];
  // }
}
// getList();
onMounted(() => {
  getList();
})

function handlePageChange(p) {
  page.value = p;
  getList();
}
</script>
    