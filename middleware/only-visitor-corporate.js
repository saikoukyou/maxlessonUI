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

    if (useStore?.corporateLoggedIn) {
        if (from?.path.includes('/corporate')) {
            if (to?.path === '/corporate/login') {
                if (process.client) {
                    // const { message } = createDiscreteApi(["message"])
                    // message.warning("ログインしました。繰り返しログインしないでください ");
                    const router = useRouter();
                    router.replace("/corporate/centre/dashboard");
                    // return navigateTo("/corporate/centre/dashboard", { replace: true });
                }
            }
            if (from?.path === '/corporate/login') {
                const router = useRouter();
                router.replace("/corporate/centre/dashboard");
                // return navigateTo("/corporate/centre/dashboard", { replace: true });
            }
        }

    }
});
