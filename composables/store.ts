import { defineStore } from 'pinia';
import {useLoginApi, useLogoutApi, useStudentLogoutApi} from "~/apis/user";
import {useTeacherAccount, useTeacherLoginApi} from "~/apis/teacher";
import {createDiscreteApi, NButton} from "naive-ui";
import {useCorporateAccountInfoApi, useCorporateLoginApi, useCorporateLogoutApi} from "~/apis/corporate";
import {useClientIdApi, useGoogleLoginApi, useStudentInfoDataApi, useUpdateStudentInfoDataApi} from "~/apis/student";
interface State {
    studentToken: string,
    teacherToken: string,
    corporateToken: string,
    studentLoggedIn: boolean,
    teacherLoggedIn: boolean,
    corporateLoggedIn: boolean,
    studentInfo: any,
    teacherInfo: any,
    corporateInfo: any,
    client_id: string,
    learn_type: number,
    monthly_learn_type: string,
    contract_status: string,
    is_corporate_member: boolean,
    studentLoginDatetime: any,
    teacherLoginDatetime: any,
    corporateLoginDatetime: any,
    activeUrl: string,
    activeTeacherUrl: string,
    teacherMenu: any,
}
// @ts-ignore
export const useMainStore = defineStore('main', {
    state: ():State => ({
        studentToken: '',
        teacherToken: '',
        corporateToken: '',
        studentLoggedIn: false,
        teacherLoggedIn: false,
        corporateLoggedIn: false,
        studentInfo: null,
        teacherInfo: null,
        corporateInfo: null,
        client_id: '',
        learn_type: 2,
        monthly_learn_type: '',
        contract_status: '',
        is_corporate_member: false,
        studentLoginDatetime: null,
        teacherLoginDatetime: null,
        corporateLoginDatetime: null,
        activeUrl: '',
        activeTeacherUrl: '',
        teacherMenu: null
    }),
    actions: {
        setStudentToken(studentToken: string | '') {
            this.studentToken = studentToken;
        },
        setTeacherToken(teacherToken: string | '') {
            this.teacherToken = teacherToken;
        },
        setCorporateToken(corporateToken: string | '') {
            this.corporateToken = corporateToken;
        },
        setStudentLoggedIn(studentLoggedIn: boolean | false) {
            this.studentLoggedIn = studentLoggedIn;
        },
        setTeacherLoggedIn(teacherLoggedIn: boolean | false) {
            this.teacherLoggedIn = teacherLoggedIn;
        },
        setCorporateLoggedIn(corporateLoggedIn: boolean | false) {
            this.corporateLoggedIn = corporateLoggedIn;
        },
        setClientId(client_id: string | '') {
            this.client_id = client_id;
        },
        setStudentInfo(studentInfo: any | null) {
            const now = (new Date()).getTime();
            if (now > this.studentLoginDatetime) {
                this.studentLogout();
            } else {
                this.studentInfo = studentInfo;
                this.learn_type = studentInfo?.learn_type ?? '';
                this.monthly_learn_type = studentInfo?.monthly_learn_type ?? '';
                this.contract_status = studentInfo?.contract_status ?? '';
                this.is_corporate_member = this.studentInfo.is_corporate_member == 1 ? true : false;
            }
        },
        setActiveUrl(url: string | '') {
            this.activeUrl = url;
        },
        setActiveTeacherUrl(url: string | '') {
            this.activeTeacherUrl = url;
        },
        setTeacherMenu(menu: any | null) {
            this.teacherMenu = menu;
        },
        async studentLogin(postData: any) {
            let {
                data,
                error
            } = await useLoginApi(postData)

            const { message } = createDiscreteApi(["message"])
            if (data?.value && data?.value?.err === false) {
                this.studentToken = 'Bearer '+data.value.token;
                this.teacherToken = '';
                this.corporateToken = '';
                this.studentInfo = data.value.info;
                this.teacherInfo = null;
                this.corporateInfo = null;
                this.studentLoggedIn = true;
                this.teacherLoggedIn = false;
                this.corporateLoggedIn = false;
                this.studentLoginDatetime = (new Date(data.value.expired_at * 1000)).getTime();
                // 跳转
                if (this.studentInfo) {
                    this.is_corporate_member = this.studentInfo.is_corporate_member == 1 ? true : false;
                    if (!this.studentInfo?.monthly_plan_id && this.studentInfo?.contract_status == 'Trial' && this.studentInfo?.is_corporate_member === 0) {
                        this.activeUrl = "/mypage/mypage";
                        return navigateTo("/mypage/mypage",{ replace: true });
                    } else {
                        this.activeUrl = "/mypage/mypageReserved";
                        return navigateTo("/mypage/mypageReserved", { replace: true })
                    }
                }
            } else {
                if (data?.value?.errors) {
                    Object.keys(data?.value?.errors).forEach(key=>{
                        message.error(data?.value?.errors[key][0]);
                    })
                    return;
                }
                if (data?.value?.err_msg) {
                    return message.error(data?.value?.err_msg || 'サービス側エラー');
                }
            }
        },
        async studentGoogleLogin(decodedCredential: any) {
            let {
                data,
                error
            } = await useGoogleLoginApi(decodedCredential);

            const { message } = createDiscreteApi(["message"])
            if (data?.value && data.value.err === false) {
                if (data?.value?.token) {
                    const { message } = createDiscreteApi(["message"])
                    this.studentToken = 'Bearer '+data.value.token;
                    this.teacherToken = '';
                    this.corporateToken = '';
                    this.studentInfo = data.value.info;
                    this.teacherInfo = null;
                    this.corporateInfo = null;
                    this.studentLoggedIn = true;
                    this.teacherLoggedIn = false;
                    this.corporateLoggedIn = false;
                    this.studentLoginDatetime = (new Date(data.value.expired_at * 1000)).getTime();

                    message.success("ログイン成功")
                    // 跳转
                    if (this.studentInfo) {
                        this.is_corporate_member = this.studentInfo.is_corporate_member == 1 ? true : false;
                        if (!this.studentInfo?.monthly_plan_id && this.studentInfo?.contract_status == 'Trial' && this.studentInfo?.is_corporate_member === 0) {
                            this.activeUrl = "/mypage/mypage";
                            return navigateTo("/mypage/mypage",{ replace: true });
                        } else {
                            this.activeUrl = "/mypage/mypageReserved";
                            return navigateTo("/mypage/mypageReserved", { replace: true })
                        }
                    }
                }
            } else {
                if (data?.value?.errors) {
                    Object.keys(data?.value?.errors).forEach(key=>{
                        message.error(data?.value?.errors[key][0]);
                    })
                    return;
                }
                if (data?.value?.err_msg) {
                    return message.error(data?.value?.err_msg || 'サービス側エラー');
                }
            }
        },
        async studentLogout() {
            const is_corporate_member_tt = this.is_corporate_member;
            await useStudentLogoutApi();
            this.studentToken = '';
            this.teacherToken = '';
            this.corporateToken = '';
            this.studentInfo = null;
            this.teacherInfo = null;
            this.corporateInfo = null;
            this.studentLoggedIn = false;
            this.teacherLoggedIn = false;
            this.corporateLoggedIn = false;
            this.studentLoginDatetime = '';
            console.log('is_corporate_member:'+this.is_corporate_member);
            if (is_corporate_member_tt) {
                return navigateTo("/corporate/login", { replace: true });
            } else {
                return navigateTo("/login", { replace: true });
            }
        },
        async useRefreshUserInfo() {
            // 用户已登录，直接获取用户信息
            if (this.studentToken) {
                const now = (new Date()).getTime();
                // console.log('now:'+now);
                // console.log('this.studentLoginDatetime:'+this.studentLoginDatetime);
                if (now > this.studentLoginDatetime) {
                    this.studentLogout();
                } else {
                    let { data,error } = await useStudentInfoDataApi();

                    if (data?.value) {
                        this.studentInfo = data?.value ?? [];
                        this.learn_type = data?.value?.learn_type ?? '';
                        this.monthly_learn_type = data?.value?.monthly_learn_type ?? '';
                        this.contract_status = data?.value?.contract_status ?? '';
                        this.is_corporate_member = this.studentInfo.is_corporate_member == 1 ? true : false;
                    } else {
                        this.studentToken = '';
                        this.studentInfo = null;
                        if (this.is_corporate_member) {
                            return navigateTo("/corporate/login", { replace: true });
                        } else {
                            return navigateTo("/login", { replace: true });
                        }
                    }
                }

            } else {
                // this.studentToken = '';
                // this.studentInfo = null;
                // return navigateTo("/login", { replace: true });
            }
        },
        async teacherLogin(postData: any) {
            let {
                data,
                error
            } = await useTeacherLoginApi(postData);
            const { message } = createDiscreteApi(["message"])
            if (data?.value?.err == false) {
                this.studentToken = '';
                this.teacherToken = 'Bearer '+data.value.token;
                this.corporateToken = '';
                this.studentInfo = null;
                this.teacherInfo = data.value.info;
                this.corporateInfo = null;
                this.studentLoggedIn = false;
                this.teacherLoggedIn = true;
                this.corporateLoggedIn = false;
                this.teacherLoginDatetime = (new Date(data.value.expired_at * 1000)).getTime();
                // console.log('teacherLoginDatetime:'+this.teacherLoginDatetime);

                message.success("登录成功");
                if (this.teacherInfo) {
                    if (this.teacherInfo?.apply_status === 5) {//填写补充信息
                        this.setActiveTeacherUrl("/teacher/centre/info");
                        return navigateTo("/teacher/centre/info", { replace: true })
                    } else if (this.teacherInfo.apply_status === 6) {//合同
                        this.setActiveTeacherUrl("/teacher/centre/contract");
                        return navigateTo("/teacher/centre/contract", { replace: true })
                    } else {
                        this.setActiveTeacherUrl("/teacher/centre/dashboard");
                        const router = useRouter();
                        return router.replace("/teacher/centre/dashboard");
                        // 跳转
                        // return navigateTo("/teacher/centre/dashboard", { replace: true })
                    }
                } else {
                    this.setActiveTeacherUrl("/teacher/centre/dashboard");
                    // 跳转
                    return navigateTo("/teacher/centre/dashboard", { replace: true })
                }

            } else {
                if (data?.value?.errors) {
                    Object.keys(data?.value?.errors).forEach(key=>{
                        message.error(data?.value?.errors[key][0]);
                    })
                    return;
                }
                if (data?.value?.err_msg) {
                    return message.error(data?.value?.err_msg || 'サービス側エラー');
                }
            }
        },
        async teacherLogout() {
            await useLogoutApi();
            this.studentToken = '';
            this.teacherToken = '';
            this.corporateToken = '';
            this.studentInfo = null;
            this.teacherInfo = null;
            this.corporateInfo = null;
            this.studentLoggedIn = false;
            this.teacherLoggedIn = false;
            this.corporateLoggedIn = false;
            this.teacherLoginDatetime = '';
            return navigateTo("/teacher/login", { replace: true });
        },
        async useRefreshTeacherInfo() {
            // 用户已登录，直接获取用户信息
            if (this.teacherToken) {
                const now = (new Date()).getTime();
                if (now > this.teacherLoginDatetime) {
                    this.teacherLogout();
                } else {
                    let { data, error } = await useTeacherAccount();
                    if (data?.value) {
                        this.teacherInfo = data?.value ?? null;
                        if (this.teacherInfo.apply_status === 5) {
                            this.setActiveTeacherUrl("/teacher/centre/info");
                            this.setTeacherMenu([
                                { key: "/teacher/centre/info", text: "我的账户", icon: "PersonOutline" },
                            ]);
                            const router = useRouter();
                            return router.replace({ path: "/teacher/centre/info" });
                            // return navigateTo("/teacher/centre/info", { replace: true });
                        } else if (this.teacherInfo.apply_status === 6) {//合同
                            this.setActiveTeacherUrl("/teacher/centre/contract");
                            this.setTeacherMenu([
                                { key: "/teacher/centre/info", text: "我的账户", icon: "PersonOutline" },
                                { key: "/teacher/centre/contract", text: "讲师协议", icon: "FileTrayOutline" },
                            ]);
                            const router = useRouter();
                            return router.replace({ path: "/teacher/centre/contract" });
                            // return navigateTo("/teacher/centre/contract", { replace: true });
                        } else if (this.teacherInfo.apply_status === 8) {//合同
                            this.setTeacherMenu([
                                { key: "/teacher/centre/dashboard", text: "工作台", icon: "StatsChartOutline" },
                                { key: "/teacher/centre/calendar", text: "所有预约一览", icon: "CalendarOutline" },
                                { key: "/teacher/centre/class", text: "公开课表", icon: "ListCircleOutline" },
                                { key: "/teacher/centre/class-evaluate", text: "我的课程评价", icon: "AccessibilityOutline" },
                                { key: "/teacher/centre/solution", text: "解疑答惑", icon: "RibbonOutline" },
                                { key: "/teacher/centre/message", text: "信息一览", icon: "InformationOutline" },
                                { key: "/teacher/centre/class-fee", text: "课时费管理", icon: "DiamondOutline" },
                                { key: "/teacher/centre/contract", text: "讲师协议", icon: "FileTrayOutline" },
                                { key: "/teacher/centre/info", text: "我的账户", icon: "PersonOutline" },
                                // { key: "/teacher/centre/recommend", text: "讲师推荐", icon: "StarOutline" },
                            ]);
                        }
                    } else {
                        this.teacherToken = '';
                        this.teacherInfo = null;
                        return navigateTo("/teacher/login", { replace: true });
                    }
                }

            } else {
                this.teacherToken = '';
                this.teacherInfo = null;
                return navigateTo("/teacher/login", { replace: true });
            }
        },
        async corporateLogin(postData: any) {
            let {
                data,
                error
            } = await useCorporateLoginApi(postData)

            const { message } = createDiscreteApi(["message"])
            if (data?.value && data?.value?.err == false) {
                this.teacherToken = '';
                this.studentToken = '';
                this.corporateToken = 'Bearer '+data.value.token;
                this.teacherInfo = null;
                this.studentInfo = null;
                this.corporateInfo = data.value.info;
                this.studentLoggedIn = false;
                this.teacherLoggedIn = false;
                this.corporateLoggedIn = true;
                this.corporateLoginDatetime = (new Date(data.value.expired_at * 1000)).getTime();

                message.success("ログイン成功");

                const router = useRouter();
                router.replace("/corporate/centre/dashboard");

                // 跳转
                // return navigateTo("/corporate/centre/dashboard", { replace: true })
            } else {
                if (data?.value?.errors) {
                    Object.keys(data?.value?.errors).forEach(key=>{
                        message.error(data?.value?.errors[key][0]);
                    })
                    return;
                }
                if (data?.value?.err_msg) {
                    return message.error(data?.value?.err_msg || 'サービス側エラー');
                }
            }
        },
        async corporateLogout() {
            await useCorporateLogoutApi();
            this.studentToken = '';
            this.teacherToken = '';
            this.corporateToken = '';
            this.studentInfo = null;
            this.teacherInfo = null;
            this.corporateInfo = null;
            this.studentLoggedIn = false;
            this.teacherLoggedIn = false;
            this.corporateLoggedIn = false;
            this.corporateLoginDatetime = '';
            return navigateTo("/corporate/login", { replace: true });
        },
        async useRefreshCorporateInfo() {
            // 用户已登录，直接获取用户信息
            if (this.corporateToken) {
                const now = (new Date()).getTime();
                if (now > this.corporateLoginDatetime) {
                    this.corporateLogout();
                } else {
                    let { data, error } = await useCorporateAccountInfoApi();
                    if (data?.value !== null && data?.value !== undefined) {
                        this.corporateInfo = data?.value.info ?? null;
                    } else {
                        this.corporateToken = '';
                        this.corporateInfo = null;
                        return navigateTo("/corporate/login", { replace: true });
                    }
                }
            } else {
                this.corporateToken = '';
                this.corporateInfo = null;
                return navigateTo("/corporate/login", { replace: true });
            }
        },
        async useRefreshUserClientId() {
            if (this.client_id) {

            } else {
                let { data: clientInfo, error } = await useClientIdApi();
                if (clientInfo?.value) {
                    this.client_id = clientInfo?.value?.client_id;
                }
            }
        },
    },

    // 持久化配置
    //persist定义要做判断，因为localStorage是客户端参数，所以需要加process.client
    persist: process.client && {
        paths: [
            'studentToken',
            'teacherToken',
            'corporateToken',
            'studentLoggedIn',
            'teacherLoggedIn',
            'corporateLoggedIn',
            'studentInfo',
            'teacherInfo',
            'corporateInfo',
            'client_id',
            'learn_type',
            'monthly_learn_type',
            'contract_status',
            'studentLoginDatetime',
            'teacherLoginDatetime',
            'corporateLoginDatetime',
            'activeUrl',
            'activeTeacherUrl',
            'teacherMenu'
        ],
    }
    // persist: true

});