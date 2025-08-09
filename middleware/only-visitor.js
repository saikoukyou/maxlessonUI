//游客权限
import {
    createDiscreteApi
} from "naive-ui"
import {useMainStore} from "~/composables/store";

export default defineNuxtRouteMiddleware((to, from) => {
    const useStore = useMainStore();

    if (useStore?.client_id) {

    } else {
        useStore.useRefreshUserClientId();
    }

    //已登录，强制重定向到首页
    if (useStore?.studentLoggedIn) {
        if (from?.path.includes('/teacher')) {

        } else if (from?.path.includes('/corporate')) {

        } else {
            // if (to?.path === '/login') {
            //     if (process.client) {
            //         // const { message } = createDiscreteApi(["message"])
            //         // message.warning("ログインしました。繰り返しログインしないでください ");
            //         const router = useRouter();
            //         router.replace("/mypage/mypageReserved");
            //     }
            // }
            if (from?.path === '/login') {
                const router = useRouter();
                router.replace("/mypage/mypageReserved");
                // return navigateTo("/mypage/mypageReserved", { replace: true });
            }
        }
    }

    // if (useStore?.teacherLoggedIn) {
    //     if (from?.path.includes('/teacher')) {
    //         if (to?.path === '/teacher/login') {
    //             if (process.client) {
    //                 const { message } = createDiscreteApi(["message"])
    //                 message.warning("ログインしました。繰り返しログインしないでください ");
    //                 return navigateTo("/teacher/centre/dashboard", { replace: true });
    //             }
    //         }
    //         if (from?.path === '/teacher/login') {
    //             return navigateTo("/teacher/centre/dashboard", { replace: true });
    //         }
    //         // return navigateTo(from?.path || "/teacher/centre/dashboard", { replace: true });
    //     }
    //
    // }

    // if (useStore?.corporateLoggedIn) {
    //     if (from?.path.includes('/corporate')) {
    //         if (to?.path === '/corporate/login') {
    //             if (process.client) {
    //                 const { message } = createDiscreteApi(["message"])
    //                 message.warning("ログインしました。繰り返しログインしないでください ");
    //             }
    //         }
    //         // if (from?.path === '/corporate/login') {
    //         //     return navigateTo("/corporate/centre/dashboard", { replace: true });
    //         // }
    //         // return navigateTo(from?.path || "/corporate/centre/dashboard", { replace: true });
    //     }
    //
    // }
});
