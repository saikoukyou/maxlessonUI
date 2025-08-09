//用户登录操作权限控制中间件
import { createDiscreteApi } from "naive-ui";
import {useMainStore} from "~/composables/store";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const userStore = useMainStore();
	//未登录
	if (!userStore?.corporateLoggedIn) {
		if (process.client) {
			// const { message } = createDiscreteApi(["message"]);
			// message.error("まず登録してください");
			return navigateTo("/corporate/login");
		}
	}
});
