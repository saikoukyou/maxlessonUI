//用户登录操作权限控制中间件
import { createDiscreteApi } from "naive-ui";
import {useMainStore} from "~/composables/store";
export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log('authto:'+to.path);
  const userStore = useMainStore();
  //未登录
  if (!userStore?.studentLoggedIn) {
    if (process.client) {
      // const { message } = createDiscreteApi(["message"]);
      // message.error("まず会員登録してください");
      return navigateTo("/login", { replace: true });
    }
    if (from?.path === '/login') {
      return navigateTo("/", { replace: true });
    }
  }
});

