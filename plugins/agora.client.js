// plugins/agora.client.js
import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM from 'agora-rtm';

export default defineNuxtPlugin(nuxtApp => {
    // 确保只在客户端环境中引入 Agora SDK
    if (process.client) {
        nuxtApp.provide('agoraRTC', AgoraRTC);
        nuxtApp.provide('agoraRTM', AgoraRTM);
    }
});
