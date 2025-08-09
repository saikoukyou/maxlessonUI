// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// export default defineNuxtPlugin((nuxtApp:any) => {
//     nuxtApp.$pinia.use(piniaPluginPersistedstate)
// })
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia()
    // @ts-ignore
    pinia.use(piniaPluginPersistedstate, {
        expires: '4h' // 设置过期时间为4个小时
    })
})
// import { createPinia } from 'pinia';
// import { createPersistedState } from 'pinia-plugin-persistedstate';
//
// export default defineNuxtPlugin((nuxtApp) => {
//     const pinia = createPinia();
// //     pinia.use(piniaPluginPersistedstate, {
// //         expires: '4h' // 设置过期时间为4个小时
// //     })
//     // 使用 pinia-plugin-persistedstate 插件
//     const persistedState = createPersistedState({
//         // 你可以在这里配置插件选项，比如指定哪些状态需要持久化
//         paths: ['user.name', 'user.email'], // 持久化 user store 中的 name 和 email
//     });
//
//     pinia.use(persistedState);
//
//     // 将 pinia 实例添加到应用的上下文中，以便在其他地方使用
//     nuxtApp.provide('pinia', pinia);
// });