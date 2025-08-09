import {
    createDiscreteApi
} from "naive-ui"
import axios from "axios";
import {useMainStore} from "~/composables/store";
export const fetchConfig = {
    // baseURL:"http://127.0.0.1:8881/api/",
    // baseURL:"https://admin.bizchina.jp/api/",
    // baseURL:"https://test.bizchina.jp/api/",
    baseURL:"http://localhost/api/",
    // baseURL: "http://8.209.252.165:8881/api/",
    headers: {
        appid: "bd9d01ecc75dbbaaefce"
    },
}

//请求体封装
function useGetFetchOptions(options = {}){
    options.baseURL = options.baseURL ?? fetchConfig.baseURL
    options.credentials = 'include';
    options.headers = options.headers ?? {
        appid:fetchConfig.headers.appid
    }
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? false
    options.stream = options.stream ?? false

    const useStore = useMainStore();
    if (useStore?.studentToken) {
        options.headers['Authorization'] = useStore?.studentToken;
    }
    else if (useStore?.teacherToken) {
        options.headers['Authorization'] = useStore?.teacherToken;
    }
    else if (useStore?.corporateToken) {
        options.headers['Authorization'] = useStore?.corporateToken;
    }
    if (options.clientid) {
        options.headers['Client-Id'] = options.clientid;
    }

    return options
}

//http请求封装
export async function useHttp(key,url,options = {}){
    const useStore = useMainStore();
    if(useStore.client_id) {
        options.clientid = useStore.client_id
    } else {
        const res = await $fetch(fetchConfig.baseURL+'open/client-id',{key: 'client2',method: "GET"}).then(res=>{

            if (res?.client_id) {
                useStore.setClientId(res.client_id);
                options.clientid = res.client_id;
            } else {
                const { message } = createDiscreteApi(["message"])
                message.error('数据加载失败，请刷新后重试')
            }
            return res;

            }).catch(err=>{

                const msg = err?.data?.data
                if(process.client){
                    const { message } = createDiscreteApi(["message"])
                    message.error(msg || 'サービス側エラー')
                }

            })
    }

    options = useGetFetchOptions(options)
    options.key = key

    if (options.open) {
        try {
            const file = await $fetch(url, options);
            const arrayBuffer = await file.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: file.type }); // 'application/pdf'
            const fileUrl = URL.createObjectURL(blob);

            // 判断是否为 iOS 设备
            const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isIOS()) {
                // **iOS 特殊处理：直接 window.open + 用户交互**
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    newWindow.location.href = fileUrl;
                } else {
                    // 如果弹窗被拦截，显示一个按钮让用户手动点击
                    showManualDownloadButton(fileUrl);
                }
            } else {
                // **非 iOS 设备：使用 <a> 标签下载**
                const a = document.createElement('a');
                a.href = fileUrl;
                a.target = '_blank';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();

                // 延迟清理
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileUrl);
                }, 1000); // 延长清理时间，确保 iOS 也能处理
            }

            // **所有移动端（包括 iOS）都显示一个备选按钮**
            const isMobile = () => /Android|iPhone|iPad/i.test(navigator.userAgent);
            if (isMobile()) {
                showManualDownloadButton(fileUrl);
            }
        } catch (error) {
            console.error('文件打开失败:', error);
            alert('文件打开失败，请重试或更换浏览器。'); // 用户友好的提示
        }

    }
    else if (options.stream) {
        const file = await $fetch(url,options);
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });//'application/pdf'
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.target = '_blank';
        link.download = options.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        return;
    }

    if(options.$){
        const data = ref(null)
        const error = ref(null)
        return await $fetch(url,options).then(res=>{
            data.value = res
            if (res?.need_login == 1) {
                if (useStore.studentLoggedIn) {
                    useStore.setStudentToken('');
                    useStore.setTeacherToken('');
                    useStore.setCorporateToken('');
                    useStore.setStudentLoggedIn(false);
                    useStore.setTeacherLoggedIn(false);
                    useStore.setCorporateLoggedIn(false);
                    return navigateTo('/login', { replace: true });
                } else if (useStore.teacherLoggedIn) {
                    useStore.setStudentToken('');
                    useStore.setTeacherToken('');
                    useStore.setCorporateToken('');
                    useStore.setStudentLoggedIn(false);
                    useStore.setTeacherLoggedIn(false);
                    useStore.setCorporateLoggedIn(false);
                    return navigateTo("/teacher/login", { replace: true });
                } else if (useStore.corporateLoggedIn) {
                    useStore.setStudentToken('');
                    useStore.setTeacherToken('');
                    useStore.setCorporateToken('');
                    useStore.setStudentLoggedIn(false);
                    useStore.setTeacherLoggedIn(false);
                    useStore.setCorporateLoggedIn(false);
                    return navigateTo('/corporate/login', { replace: true });
                }
                // else {
                //     useStore.setStudentToken('');
                //     useStore.setTeacherToken('');
                //     useStore.setCorporateToken('');
                //     useStore.setStudentLoggedIn(false);
                //     useStore.setTeacherLoggedIn(false);
                //     useStore.setCorporateLoggedIn(false);
                //     return navigateTo('/login', { replace: true });
                // }

            }

            if (res?.err === true) {
                const { message } = createDiscreteApi(["message"])
                if (res?.errors) {
                    if (options?.errShow === true) {

                    } else {
                        Object.keys(res.errors).forEach(key=>{
                            // console.log('error:'+res.errors[key][0]);
                            message.error(res.errors[key][0]);
                        })
                    }
                } else if (res?.err_msg) {
                    message.error(res.err_msg);
                }

            }
            return {
                data,
                error
            }
        }).catch(err=>{
            const msg = err?.data?.data
            if(process.client){
                if (err?.data?.type === 'app_client') {
                    const { message } = createDiscreteApi(["message"])
                    message.error('数据加载失败，请刷新后重试')
                } else if (err?.data?.need_login == 1) {
                    if (useStore.studentLoggedIn) {
                        useStore.setStudentToken('');
                        useStore.setTeacherToken('');
                        useStore.setCorporateToken('');
                        useStore.setStudentLoggedIn(false);
                        useStore.setTeacherLoggedIn(false);
                        useStore.setCorporateLoggedIn(false);
                        return navigateTo('/login', { replace: true });
                    } else if (useStore.teacherLoggedIn) {
                        useStore.setStudentToken('');
                        useStore.setTeacherToken('');
                        useStore.setCorporateToken('');
                        useStore.setStudentLoggedIn(false);
                        useStore.setTeacherLoggedIn(false);
                        useStore.setCorporateLoggedIn(false);
                        return navigateTo("/teacher/login", { replace: true });
                    } else if (useStore.corporateLoggedIn) {
                        useStore.setStudentToken('');
                        useStore.setTeacherToken('');
                        useStore.setCorporateToken('');
                        useStore.setStudentLoggedIn(false);
                        useStore.setTeacherLoggedIn(false);
                        useStore.setCorporateLoggedIn(false);
                        return navigateTo('/corporate/login', { replace: true });
                    }
                    // else {
                    //     useStore.setStudentToken('');
                    //     useStore.setTeacherToken('');
                    //     useStore.setCorporateToken('');
                    //     useStore.setStudentLoggedIn(false);
                    //     useStore.setTeacherLoggedIn(false);
                    //     useStore.setCorporateLoggedIn(false);
                    //     return navigateTo('/login', { replace: true });
                    // }
                } else {
                    const { message } = createDiscreteApi(["message"])
                    message.error(msg || 'サービス側エラー')
                }
            }
            error.value = msg
            return {
                data,
                error
            }
        })
    }
    let res = await useFetch(url,{
        ...options,
        // 相当于响应拦截器
        transform:(res)=>{
            if (res?.need_login == 1) {
                if (useStore.studentLoggedIn) {
                    useStore.setStudentToken('');
                    useStore.setTeacherToken('');
                    useStore.setCorporateToken('');
                    useStore.setStudentLoggedIn(false);
                    useStore.setTeacherLoggedIn(false);
                    useStore.setCorporateLoggedIn(false);
                    return navigateTo('/login', { replace: true });
                } else if (useStore.teacherLoggedIn) {
                    useStore.setStudentToken('');
                    useStore.setTeacherToken('');
                    useStore.setCorporateToken('');
                    useStore.setStudentLoggedIn(false);
                    useStore.setTeacherLoggedIn(false);
                    useStore.setCorporateLoggedIn(false);
                    return navigateTo("/teacher/login", { replace: true });
                } else if (useStore.corporateLoggedIn) {
                    useStore.setStudentToken('');
                    useStore.setTeacherToken('');
                    useStore.setCorporateToken('');
                    useStore.setStudentLoggedIn(false);
                    useStore.setTeacherLoggedIn(false);
                    useStore.setCorporateLoggedIn(false);
                    return navigateTo('/corporate/login', { replace: true });
                }
                // else {
                //     useStore.setStudentToken('');
                //     useStore.setTeacherToken('');
                //     useStore.setCorporateToken('');
                //     useStore.setStudentLoggedIn(false);
                //     useStore.setTeacherLoggedIn(false);
                //     useStore.setCorporateLoggedIn(false);
                //     return navigateTo('/login', { replace: true });
                // }
            } else if (err?.data?.type === 'app_client') {
                const { message } = createDiscreteApi(["message"])
                // useStore.useRefreshUserClientId();
                message.error('数据加载失败，请刷新后重试')
            }

            if (res.err == true) {
                const { message } = createDiscreteApi(["message"])
                if (res.errors) {
                    if (options.errShow) {

                    } else {
                        Object.keys(res.errors).forEach(key=>{
                            message.error(res.errors[key][0]);
                        })
                    }
                } else if (res.err_msg) {
                    message.error(res.err_msg);
                }

            }
            return res
        },
    })
    // 客户端错误处理
    if(process.client && res?.error?.value){
        const msg = res.error.value?.data?.data
        if(!options.lazy){
            const { message } = createDiscreteApi(["message"])
            message.error(msg || 'サービス側エラー')
        }

    }

    return res
}

// GET请求
export function useHttpGet(key,url,options = {}){
    options.method = "GET"
    return useHttp(key,url,options)
}

// POST请求
export function useHttpPost(key,url,options = {}){
    options.method = "POST"
    return useHttp(key,url,options)
}

export function useHttpPut(key,url,options = {}){
    options.method = "PUT"
    return useHttp(key,url,options)
}

/** 显示一个按钮让用户手动点击下载 */
function showManualDownloadButton(fileUrl) {
    const tempBtn = document.createElement('button');
    tempBtn.textContent = '点击打开文件';
    tempBtn.style.position = 'fixed';
    tempBtn.style.bottom = '20px';
    tempBtn.style.left = '50%';
    tempBtn.style.transform = 'translateX(-50%)';
    tempBtn.style.zIndex = '1000';
    tempBtn.style.padding = '10px 20px';
    tempBtn.style.backgroundColor = '#007aff'; // iOS 风格蓝色
    tempBtn.style.color = 'white';
    tempBtn.style.border = 'none';
    tempBtn.style.borderRadius = '5px';

    tempBtn.onclick = () => {
        // 再次尝试用 window.open（适用于 iOS）
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.location.href = fileUrl;
        } else {
            // 如果弹窗被拦截，直接跳转（可能仅适用于非 Blob URL）
            window.location.href = fileUrl;
        }
        document.body.removeChild(tempBtn);
        setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
    };

    document.body.appendChild(tempBtn);

    // 30秒后自动移除按钮
    setTimeout(() => {
        if (document.body.contains(tempBtn)) {
            document.body.removeChild(tempBtn);
            URL.revokeObjectURL(fileUrl);
        }
    }, 30000);
}