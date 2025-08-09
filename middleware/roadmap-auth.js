//用户登录操作权限控制中间件
import { createDiscreteApi } from "naive-ui";
import {useCheckRoutemapApi} from "~/apis/student";
import {useMainStore} from "~/composables/store";
export default defineNuxtRouteMiddleware(async (to, from) => {

  const useStore = useMainStore();
  const studentInfo = useStore.studentInfo;

  console.log('studentInfo:'+JSON.stringify(studentInfo));
  if (studentInfo?.is_corporate_member == 1) {
    const { data: info, refresh,error } = await useCheckRoutemapApi();

    if (info?.value && info?.value?.err) {
      return navigateTo("/mypage/mypageReserved");
    } else {
      if (info?.value && info?.value?.has_routemap == 0) {//制作路线图
        return navigateTo("/mypage/roadmapMake");
      } else if (info?.value && info?.value?.has_routemap == 2) {//审核未通过
        return navigateTo("/mypage/roadmapCheck");
      }
    }
  } else {
    return navigateTo("/mypage/mypageReserved");
  }

});
