
export function useCorporateLoginApi(body) {
    return useHttpPost("CorporateLoginApi", "/open/business/login", {
        body,
        $: true,
    })
}
export function useCorporateLogoutApi() {
    return useHttpGet("CorporateLogoutApi", "/open/business/logout", {
        $: true,
    });

}
export function useCorporateAccountInfoApi() {
    return useHttpGet("CorporateAccountInfoApi", "/business/account/index", {
        $: true,
    });

}
export function useBusinessIndexApi() {
    return useHttpGet("BusinessIndexApi", "/business/index/home", {
        $: true,
    })
}
export function useAttendanceLastListApi(plan_id) {
    return useHttpGet("AttendanceLastListApi", `/business/member/attendance-last-list?plan_id=${plan_id}`, {
        $: true,
    })
}
export function useDownloadAttendanceApi(plan_id,student_id) {
    return useHttpGet("DownloadAttendanceApi", `/business/index/download-attendance?plan_id=${plan_id}&student_id=${student_id}`, {
        $: true,
        stream: true,
        filename: '受講証明書.csv'
    })
}

export function useMemberListApi(body) {
    return useHttpPost("MemberListApi", `/business/member/list`, {
        $: true,
        body: body
    })
}

export function useMemberInviteApi() {
    return useHttpGet("MemberInviteApi", `/business/member/invite`, {
        $: true,
    })
}

export function useMemberUnListApi(body) {
    return useHttpPost("MemberUnListApi", `/business/member/unlist`, {
        $: true,
        body: body
    })
}

export function useMemberInviteCompleteApi(body) {
    return useHttpPost("MemberInviteCompleteApi", `/business/member/invite-complete`, {
        $: true,
        body: body
    })
}

export function useMemberInviteApproveApi(auth_key) {
    return useHttpGet("MemberInviteApproveApi", `/open/approve/index?auth_key=${auth_key}`, {
        $: true,
    })
}

export function useApproveCompleteApi(body) {
    return useHttpPost("ApproveCompleteApi", `/open/approve/complete`, {
        $: true,
        body: body
    })
}

export function useReInviteApi(id) {
    return useHttpGet("ReInviteApi", `/business/member/reinvite?id=${id}`, {
        $: true,
    })
}

export function useInviteDeleteApi(id) {
    return useHttpGet("InviteDeleteApi", `/business/member/invite-delete?id=${id}`, {
        $: true,
    })
}

export function useBusinessBillingLogsApi() {
    return useHttpGet("BusinessBillingLogsApi", `/business/billing/pay-logs`, {
        $: true,
    })
}

export function useBusinessAccountIndexApi() {
    return useHttpGet("BusinessAccountIndexApi", `/business/account/index`, {
        $: true,
    })
}

export function useBusinessAccountUpdateApi(body) {
    return useHttpPost("BusinessAccountUpdateApi", `/business/account/update-info`, {
        $: true,
        body: body
    })
}

export function useMemberInfoApi(id) {
    return useHttpGet("MemberInfoApi", `/business/member/info/${id}`, {
        $: true,
    })
}

export function useEmailSwitchApi(body) {
    return useHttpPost("EmailSwitchApi", `/business/member/email-switch`, {
        $: true,
        body: body
    })
}

//忘记密码
export function useBusinessForgetApi(body) {
    return useHttpPost("BusinessForgetApi", "/open/business/business-forgot-password-sendmail", {
        body,
        $: true,
        initialCache: false
    })
}

export function useBusinessCodeCheckApi(code) {
    return useHttpGet("BusinessCodeCheckApi", `/open/business/business-reset-password?code=${code}`, {
        $: true,
    })
}
//修改密码
export function useBusinessResetPasswordApi(body) {
    return useHttpPost("BusinessResetPassword", "/open/business/business-reset-password-success", {
        body,
        $: true
    })
}
//商家端套餐列表
export function useBusinessPlansApi() {
    return useHttpGet("BusinessPlansApi", `/business/index/plans`, {
        $: true,
    })
}
//商家端保存设置
export function useBusinessMemberSettingsApi(body) {
    return useHttpPost("BusinessMemberSettingsApi", `/business/member/setting`, {
        body,
        $: true,
    })
}
//商家端设置信息
export function useBusinessMemberSettingInfoApi() {
    return useHttpGet("BusinessMemberSettingInfoApi", `/business/member/settinginfo`, {
        $: true,
    })
}
export function useBusinessMemberPlanInfoApi(id) {
    return useHttpGet("BusinessMemberPlanInfoApi", `/business/member/plan-info?id=${id}`, {
        $: true,
    })
}

export function useBusinessVideoVolumeListApi(id) {
    return useHttpGet("BusinessVideoVolumeListApi", `/business/account/video-volume-list?id=${id}`, {
        $: true,
    })
}

export function useComplteListApi(query) {
    let q = useQueryToString(query);
    return useHttpGet("ComplteListAp", `/business/member/complete-list${q}`, {
        $: true,
    })
}

export function useChangeVideoPlanApi(body) {
    return useHttpPost("ChangeVideoPlanApi", `/business/member/change-video-plan`, {
        body,
        $: true,
    })
}

export function useMemberVideoInviteCompleteApi(body) {
    return useHttpPost("MemberVideoInviteCompleteApi", `/business/member/invite-video-complete`, {
        $: true,
        body: body
    })
}

export function useBizListApi() {
    return useHttpGet("BizListApi", `/open/business/bizlist`, {
        $: true,
    })
}

export function useChangeSpeedAlarmApi(speed_alram_email,student_id) {
    return useHttpGet("ChangeSpeedAlarm", `/business/member/change-speed-alarm?student_id=${student_id}&speed_alram_email=${speed_alram_email}`, {
        $: true,
    })
}