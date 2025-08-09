//用户登录操作权限控制中间件
import {useMainStore} from "~/composables/store";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const useStore = useMainStore();
  //判断进入页面
  if (to?.path === "/mypage/mypage") {
    if (useStore?.studentInfo) {
      if (!useStore?.studentInfo?.monthly_plan_id && useStore?.studentInfo?.contract_status == 'Trial' && useStore?.studentInfo?.is_corporate_member === 0) {

      } else {
        return navigateTo("/mypage/mypageReserved",{ replace: true });
      }
      // if (user?.has_lesson === 1 || user?.is_corporate_member === 1) {
      //   return navigateTo("/mypage/mypageReserved",{ replace: true });
      // }
    }
  }
});
