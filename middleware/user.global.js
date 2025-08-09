// 全局用户信息中间件
import {useMainStore} from "~/composables/store";

export default defineNuxtRouteMiddleware(async (to, from)=>{
    const useStore = useMainStore();
    useStore.useRefreshUserClientId();

    if (to.path.startsWith('/teacher/')) {

    } else {
        useHead({
            script: [
                {
                    src: 'https://www.googletagmanager.com/gtag/js?id=AW-16972081559',
                    async: true
                },
                {
                    innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16972081559', {
              page_path: '${to.path}'
            });
          `,
                    type: 'text/javascript',
                    body: true
                }
            ]
        })
    }
})