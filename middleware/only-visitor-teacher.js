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

    if (useStore?.teacherLoggedIn) {
        if (from?.path.includes('/teacher')) {
            if (to?.path === '/teacher/login') {
                if (process.client) {
                    // const { message } = createDiscreteApi(["message"])
                    // message.warning("ログインしました。繰り返しログインしないでください ");
                    const router = useRouter();
                    router.replace("/teacher/centre/dashboard");
                    // return navigateTo("/teacher/centre/dashboard", { replace: true });
                }
            }
            if (from?.path === '/teacher/login') {
                const router = useRouter();
                router.replace("/teacher/centre/dashboard");
                // return navigateTo("/teacher/centre/dashboard", { replace: true });
            }
            // return navigateTo(from?.path || "/teacher/centre/dashboard", { replace: true });
        }

    }
});
