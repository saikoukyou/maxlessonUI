//获取首页的套餐
export function useStudentIndexDataApi(day) {
  return useHttpGet("StudentIndexData", `/student/index?day=${day}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
export function useClientIdApi(day) {
  return useHttpGet("ClientId", `/open/client-id`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
export function useStudentSimpleInfoDataApi() {
  return useHttpGet("StudentSimpleInfoData", `/student/account/simple-info`, {
    // 懒加载
    // lazy: false,
    $: true
  });
}
//获取学生信息
export function useStudentInfoDataApi() {
  return useHttpGet("StudentInfoData", `/student/account/info`, {
    // 懒加载
    // lazy: false,
    $: true
  });
}
//领取免费的套餐
export function useSubscribeFreePlanApi(plan_id) {
  return useHttpGet("SubscribeFreePlan", `/student/plan/subscribe-free-plan?plan_id=${plan_id}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
//添加喜欢的老师
export function useAddBookmarkApi(id) {
  return useHttpPost("AddBookmark", `/student/add-bookmark`, {
    body: {
      teacher_id:id,
    },
    $: true
  });
}
export function useCompletedLessonListApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("CompletedLessonList", `/student/lesson/completed${q}`, {
    $: true
  });
}
export function usePendingLessonListApi(day) {
  return useHttpGet("PendingLessonList", `/student/lesson/pending?day=${day}`, {
    $: true
  });
}

export function useStudentRoutemapListApi() {
  return useHttpGet("StudentRoutemapList", `/student/routemap/last`, {
    $: true
  });
}
export function useStudentProxyInfotApi() {
  return useHttpGet("StudentProxyInfo", `/student/proxy/info`, {
    $: true
  });
}
//检查套餐状态
export function useCheckPlanApi(parameters,learnType) {
  return useHttpGet("CheckPlan", `/student/reservation/gw?parameters=${parameters}&learn_type=${learnType}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
//显示学生购买的套餐
export function useShowPayPlansApi(parameters) {
  return useHttpGet("ShowPayPlans", `/student/reservation/show-reserved-methods?parameters=${parameters}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useStudentMonthlyPlanApi(parameters) {
  return useHttpGet("StudentMonthlyPlan", `/student/reservation/use-monthly-plan?parameters=${parameters}`, {
    $: true
  });
}
export function useStudentTicketPlanApi(parameters) {
  return useHttpGet("StudentTicketPlan", `/student/reservation/use-ticket-plan?parameters=${parameters}`, {
    $: true
  });
}
export function useStudentSelectedLessonApi() {
  return useHttpGet("StudentSelectedLesson", `/student/reservation/get-selected-lessons`, {
    lazy: false,
    $: true
  });
}

export function useDeleteSelectedLessonApi(parameters) {
  return useHttpGet("DeleteSelectedLesson", `/student/reservation/delete-selected-lessons?parameters=${parameters}`, {
    $: true
  });
}

export function useToCompleteSelectedLessonsApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("ToCompleteSelectedLessons", `/student/reservation/to-complete-selected-lessons${q}`, {
    $: true,
    errShow: true,
  });
}
export function useLessonsPreviewApi(id) {
  let q = useQueryToString(id);
  return useHttpGet("LessonsPreview", `/student/lesson/preview?id=${id}`, {
    $: true
  });
}
export function useLessonsListApi(lesson_ids) {
  return useHttpGet("LessonsList", `/student/lesson/confirm-list?lesson_ids=${lesson_ids}`, {
    $: true
  });
}

export function useUpdateStudentInfoDataApi(body) {
  return useHttpPost("UpdateStudentInfo", `/student/account/update`, {
    body,
    // 懒加载
    lazy: false,
    $: true
  });
}
export function useBookmarkTeachersListApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("BookmarkTeachersList", `/student/bookmark/teachers${q}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
export function useDownloadAttendanceApi() {
  return useHttpGet("DownloadAttendance", `/student/account/attendance`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useDownloadAttendanceRateApi(id) {
  return useHttpGet("DownloadAttendanceRate", `/student/account/attendance-rate/${id}`, {
    // 懒加载
    lazy: false,
    $: true,
    stream: true,
    filename: '受講証明書.pdf'
    // mode: 'no-cors'
  });
}
export function useRestInfoApi() {
  return useHttpGet("RestInfo", `/student/account/rest`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useSaveRestInfoApi(body) {
  return useHttpPost("SaveRestInfo", `/student/account/rest-save`, {
    // 懒加载
    lazy: false,
    $: true,
    body
  });
}
export function useQuestionnInfoApi(id) {
  return useHttpGet("QuestionInfo", `/student/papers/${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useStoreAnswerApi(body) {
  return useHttpPost("StoreAnswer", `/student/answers/store`, {
    // 懒加载
    lazy: false,
    $: true,
    body
  });
}
export function useCheckRoutemapApi() {
  return useHttpGet("CheckRoutemap", `/student/routemap/check`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useActiveStudentApi(id) {
  return useHttpGet("ActiveStudentApi", `/open/student/active/${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useGetTrailPlansApi(plan_ids) {
  return useHttpGet("GetTrailPlansApi", `/student/plan/get-pay-trial-plans?plan_ids=${plan_ids}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useGoogleLoginApi(body) {
  return useHttpPost("GoogleLoginApi", "/open/student/google-login", {
    body,
    $: true,
  });
}

export function useGetBusinessFreePlansApi(bid) {
  return useHttpGet("GetBusinessFreePlansApi", `/open/business/free-plans?bid=${bid}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useBusinessApprovePayApi(bid) {
  return useHttpGet("BusinessApprovePayApi", `/open/approve/pay?bid=${bid}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useBusinessApproveFreeApi(bid) {
  return useHttpGet("BusinessApproveFreeApi", `/open/approve/free?bid=${bid}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useBusinessApproveCompletePayApi(body) {
  return useHttpPost("BusinessApproveCompletePayApi", `/open/approve-complete/pay`, {
    body,
    $: true,
  });
}
export function useBusinessApproveCompleteFreeApi(body) {
  return useHttpPost("BusinessApproveCompleteFreeApi", `/open/approve-complete/free`, {
    body,
    $: true,
  });
}
//激活法人会员
export function useActiveBusinessStudentApi(id) {
  return useHttpGet("ActiveBusinessStudentApi", `/open/student/business-active/${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
//保存法人学生自动预约时间
export function useAddAutoReserveTimeApi(body) {
  return useHttpPost("AddAutoReserveTimeApi", `/student/account/save-auto-time`, {
    body,
    $: true,
  });
}
//保存法人学生老师范围
export function useSaveAutoReserveTypeApi(body) {
  return useHttpPost("SaveAutoReserveTypeApi", `/student/account/save-reserve-type`, {
    body,
    $: true,
  });
}

//根据code获取套餐信息
export function useGetPlanInfoByCodeApi(code) {
  return useHttpGet("GetPlanInfoByCodeApi", `/student/plan/code-info?code=${code}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useGetPlanVideoListApi(id=0) {
  return useHttpGet("GetPlanVideoListApi", `/student/plan/video-list?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useGetPlanVideoInfoApi(id=0) {
  return useHttpGet("GetPlanVideoInfoApi", `/student/plan/video-info?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useGetPlanVideoCompleteListApi(id=0) {
  return useHttpGet("GetPlanVideoCompleteListApi", `/student/plan/video-complete-list?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useGetPlanVideoSettingListApi(id=0) {
  return useHttpGet("GetPlanVideoCompleteListApi", `/student/plan/video-setting-list?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

//保存法人学生视频课后练习答案
export function useStoreVideoAnswerApi(body) {
  return useHttpPost("StoreAnswer", `/student/answer/store-video-answer`, {
    // 懒加载
    lazy: false,
    $: true,
    body
  });
}
//获取咨询管理员列表
export function useGetServiceTeacherTimeListApi(day) {
  return useHttpGet("GetServiceTeacherTimeListApi", `/student/index/service-times?search_day=${day}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useReserveServiceDefaultInfoApi(time) {
  return useHttpGet("ReserveServiceDefaultInfoApi", `/student/service/reserve-service-default?lesson_unixtime=${time}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
//将预约信息提交，并检查当前学生的咨询次数是否已经用完
export function useReserveServiceApi(body) {
  return useHttpPost("ReserveServiceApi", `/student/service/reserve-service`, {
    // 懒加载
    lazy: false,
    $: true,
    body
  });
}
//获取已完成服务列表
export function useServiceCompleteListApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("ServiceCompleteListApi", `/student/service/complete?${q}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useServiceIndexListApi(day) {
  return useHttpGet("ServiceIndexListApi", `/student/service/index?day=${day}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useCancelServiceApi(id) {
  return useHttpGet("CancelServiceApi", `/student/service/cancel?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useUpdateSortApi(body) {
  return useHttpPost("UpdateSortApi", `/student/bookmark/update-sort`, {
    // 懒加载
    lazy: false,
    $: true,
    body
  });
}

export function useBillListApi(id) {
  return useHttpGet("BillListApi", `/student/bill/list?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useDownloadBillApi(body) {
  return useHttpPost("DownloadBillApi", `/student/bill/download`, {
    // 懒加载
    lazy: false,
    $: true,
    body,
    stream: true,
    filename: '领収书.pdf'
  });
}

export function useNoAttendApi(id,img) {
  return useHttpGet("NoAttendApi", `/teacher/lesson/no-attend?id=${id}&img=${img}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useLastCancelApi(id,img) {
  return useHttpGet("LastCancelApi", `/teacher/lesson/last-cancel?id=${id}&img=${img}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useStudentLessonEvaluationDataApi(body) {
  return useHttpPost("StudentLessonEvaluationDataApi", `/student/lesson/evaluation`, {
    body,
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useCancelLessonApi(id) {
  return useHttpGet("CancelLessonApi", `/student/lesson/cancel?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useStudentApplyTroubleApi(id,body) {
  return useHttpPost("StudentApplyTroubleApi", `/student/lesson/trouble/create/${id}`, {
    body,
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentVideoCategorysApi(id) {
  return useHttpGet("StudentVideoCategorysApi", `/student/plan/video-categorys?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentVideosApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("StudentVideosApi", `/student/plan/videos${q}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentVideoInfoApi(id) {
  return useHttpGet("StudentVideoInfoApi", `/student/plan/video-detail?id=${id}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentOpenTextbookApi(body) {
  return useHttpPost("StudentOpenTextbookApi", `/student/textbook/open-textbook`, {
    body,
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentUpdateCardApi(body) {
  return useHttpPost("StudentUpdateCardApi", `/student/account/card-update`, {
    body,
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentDeleteCardApi() {
  return useHttpGet("StudentDeleteCardApi", `/student/account/card-delete`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentExitMonthApi() {
  return useHttpGet("StudentExitMonthApi", `/open/payjp/delete`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useOnlineQuestionStudentData() {
  return useHttpGet("OnlineQuestionStudentData", `/student/online-questions`, {
    $: true
  })
}

export function useOnlineQuestionReplyedStudentData() {
  return useHttpGet("OnlineQuestionReplyedStudentData", `/student/online-questions/replyed`, {
    $: true
  })
}

export function useOnlineQuestionReadStudentData() {
  return useHttpGet("OnlineQuestionReadStudentData", `/student/online-questions/read`, {
    $: true
  })
}

export function useOnlineQuestionUnReadStudentData() {
  return useHttpGet("OnlineQuestionUnReadStudentData", `/student/online-questions/unread`, {
    $: true
  })
}

export function useAddOnlineQuestionStudentData(question) {
  return useHttpPost("AddOnlineQuestionStudentData", `/student/online-questions/add`, {
    $: true,
    body: {
      question : question
    }
  })
}

export function useDeleteOnlineQuestionStudentData(id) {
  return useHttpGet("DeleteOnlineQuestionStudentData", `/student/online-questions/delete?id=${id}`, {
    $: true
  })
}

export function useUploadStudentImgData(body) {
  return useHttpPost("UploadStudentImgData", `/home/upload/index`, {
    $: true,
    body
  })
}

export function useResetPasswordApi(body) {
  return useHttpPost("StudentPassword", "/student/account/reset-password", {
    body,
    $: true
  })
}


export function useDownloadTextbookApi(id,flag) {
  return useHttpGet("DownloadTextbook", `/open/textbook/preview?id=${id}&type=pdf&flag=${flag}`, {
    // 懒加载
    lazy: false,
    $: true,
    stream: true,
    open: true,
    filename: 'textbook.pdf'
    // mode: 'no-cors'
  });
}