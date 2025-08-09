// 登录
export function useTeacherLoginApi(body) {
	return useHttpPost("teacherLogin", "/open/teacher/login", {
		body,
		$: true,
	})
}

// 教师信息
export function useTeacherAccount() {
	return useHttpGet("teacherInfo", "/teacher/account/index", {
		$: true,
	})
}

// 预约时间设置信息
export function useTeacherAccountReservationInfo() {
	return useHttpGet("teacherReservationInfo", "/teacher/account/reservation-info", {
		$: true,
	})
}

// 获取指定老师上我课最多的学生/点赞最多的学生/差评最多的学生
export function useTeacherAccountStudentNum() {
	return useHttpGet("teacherStudentNum", "/teacher/account/get-student-num", {
		$: true,
	})
}

// 支付信息
export function useTeacherAccountPayInfo() {
	return useHttpGet("teacherPayInfo", "/teacher/account/get-pay-info", {
		$: true,
	})
}

// 获取老师相关评价
export function useTeacherAccountEvaluations(has_avg, page) {
	return useHttpGet("teacherEvaluations", `/teacher/account/evaluations?has_avg=${has_avg}&page=${page}`, {
		$: true,
	})
}

// 课时费
export function useTeacherPayslip() {
	return useHttpGet("teacherPayslip", "/teacher/payslip/index", {
		$: true,
	})
}

// 通知
export function useTeacherAnnounce(category_id,type) {
	return useHttpGet("teacherAnnounce", `/teacher/announce/get-announce?announce_category_id=${category_id}&type=${type}`, {
		$: true,
	})
}

// 获取老师推荐的老师
export function useTeacherIntroInfo() {
	return useHttpGet("teacherIntroInfo", "/teacher/account/get-intro-info", {
		$: true,
	})
}

//获取老师端首页显示预约信息
export function useTeacherTimesIndexInfo(selected_day) {
	return useHttpGet("teacherTimesIndexInfo", `/teacher/times/index?selected_day=${selected_day}`, {
		$: true,
	})
}
//老师端查看学生预约课程详细信息
export function useTeacherLessonInfo(lesson_id) {
	return useHttpGet("TeacherLessonInfo", `/teacher/lesson/preview?lesson_id=${lesson_id}`, {
		$: true,
	})
}
export function useTeacherUpdateClassStatus(id,status,lesson_unixtime) {
	return useHttpPost("TeacherUpdateClassStatus", `/teacher/lesson/update-class-status`, {
		$: true,
		body: {
			timetable_id:id,
			status:status,
			lesson_unixtime:lesson_unixtime
		},
	})
}

//获取分类列表
export function useCategoryListData(textbook_level,textbook_course,business_id,is_corporate_member,type,student_id,is_old,is_business) {
	return useHttpPost("CategoryListData", `/teacher/textbook/get-textbook-category-list`, {
		$: true,
		body: {
			textbook_level:textbook_level,
			textbook_course:textbook_course,
			business_id:business_id,
			is_corporate_member:is_corporate_member,
			type:type,
			student_id:student_id,
			is_old:is_old,
			is_business:is_business,
		},
	})
}

//获取教材列表
export function useTextBooksListData(textbook_category,type,student_id) {
	return useHttpPost("TextBooksListData", `/teacher/textbook/get-textbook-list`, {
		$: true,
		body: {
			type:type,
			textbook_category:textbook_category,
			student_id:student_id
		},
	})
}
//课后记录检查
export function useReportValidationData(body) {
	return useHttpPost("ReportValidationData", `/teacher/lesson/report-validation`, {
		$: true,
		body: body,
	})
}
//
export function useReportData(body) {
	return useHttpPost("ReportData", `/teacher/lesson/report`, {
		$: true,
		body: body,
	})
}

//老师给学生发送迟到提醒邮件
export function useSendLateEmailData(lesson_id) {
	return useHttpGet("SendLateEmailData", `/teacher/lesson/send-late-email?lesson_id=${lesson_id}`, {
		$: true,
	})
}
//老师给学生发送账号有误提醒邮件
export function useSendAccountIdWrongEmailData(lesson_id) {
	return useHttpGet("SendAccountIdWrongEmailData", `/teacher/lesson/send-account-id-wrong-email?lesson_id=${lesson_id}`, {
		$: true,
	})
}

export function useCancelLessonData(lesson_id) {
	return useHttpGet("CancelLessonData", `/teacher/lesson/cancel?lesson_id=${lesson_id}`, {
		$: true,
	})
}

export function useSetLessonData(query) {
	let q = useQueryToString(query);
	return useHttpGet("SetLessonData", `/teacher/time/set-lesson${q}`, {
		$: true,
	})
}

export function useSaveLessonData(alltimes) {
	return useHttpPost("SaveLessonData", `/teacher/time/save-lesson`, {
		$: true,
		body: {
			alltimes : alltimes
		}
	})
}

export function useIndexLessonsData(month) {
	return useHttpGet("IndexLessonsData", `/teacher/times/index-lesson?month=${month}`, {
		$: true
	})
}

export function useOnlineQuestionData() {
	return useHttpGet("OnlineQuestionData", `/teacher/online-questions`, {
		$: true
	})
}

export function useOnlineQuestionReplyedData() {
	return useHttpGet("OnlineQuestionReplyedData", `/teacher/online-questions/replyed`, {
		$: true
	})
}

export function useOnlineQuestionReadData() {
	return useHttpGet("OnlineQuestionReadData", `/teacher/online-questions/read`, {
		$: true
	})
}

export function useOnlineQuestionUnReadData() {
	return useHttpGet("OnlineQuestionUnReadData", `/teacher/online-questions/unread`, {
		$: true
	})
}

export function useAddOnlineQuestionData(question) {
	return useHttpPost("AddOnlineQuestionData", `/teacher/online-questions/add`, {
		$: true,
		body: {
			question : question
		}
	})
}

export function useDeleteOnlineQuestionData(id) {
	return useHttpGet("DeleteOnlineQuestionData", `/teacher/online-questions/delete?id=${id}`, {
		$: true,
	})
}

export function useReadAnnounceData(id) {
	return useHttpPost("ReadAnnounceData", `/teacher/announce/read`, {
		$: true,
		body: {
			id : id
		}
	})
}

export function useApplyCheckoutData() {
	return useHttpGet("ApplyCheckoutData", `/teacher/payslip/checkout`, {
		$: true,
	})
}

export function useAgreementInfoData() {
	return useHttpGet("AgreementInfoData", `/teacher/index/agrement`, {
		$: true,
	})
}

export function useSaveAgreementData(body) {
	return useHttpPost("SaveAgreementData", `/teacher/index/save-agrement`, {
		$: true,
		body: body
	})
}
export function useTeacherUpdateInfoData(body) {
	return useHttpPost("TeacherUpdateInfoData", `/teacher/account/update-info`, {
		$: true,
		body: body
	})
}

export function useResetReservationData(reservation_deadline_block,is_advance) {
	return useHttpPost("ResetReservationData", `/teacher/account/reset-reservation`, {
		$: true,
		body: {
			reservation_deadline_block: reservation_deadline_block,
			is_advance: is_advance
		}
	})
}

export function useUpdatePayInfoData(body) {
	return useHttpPost("UpdatePayInfoData", `/teacher/account/update-pay-info`, {
		$: true,
		body: body
	})
}

export function useApplyDefaultInfoData() {
	return useHttpGet("ApplyDefaultInfoData", `/open/teacher/apply-default`, {
		$: true,
	})
}

export function useApplyInfoData(body) {
	return useHttpPost("ApplyInfoData", `/open/teacher/apply`, {
		$: true,
		body: body
	})
}

export function usePayslipDetailData(query) {
	let q = useQueryToString(query);
	return useHttpGet("PayslipDetailData", `/teacher/payslip/detail${q}`, {
		$: true,
	})
}

export function usePayslipNoApplyDetailData(query) {
	let q = useQueryToString(query);
	return useHttpGet("PayslipNoApplyDetailData", `/teacher/payslip/noapply${q}`, {
		$: true,
	})
}

export function usePayslipCheckedHistoryData(query) {
	let q = useQueryToString(query);
	return useHttpGet("PayslipNoApplyDetailData", `/teacher/payslip/checked-history${q}`, {
		$: true,
	})
}

export function useUpdateTeacherTimezoneData(timezone) {
	return useHttpPost("UpdateTeacherTimezoneData", `/teacher/account/timezone`, {
		$: true,
		body: {timezone: timezone}
	})
}

export function useTeacherForgetApi(body) {
	return useHttpPost("TeacherForgetApi", "/open/teacher/teacher-forgot-password-sendmail", {
		body,
		$: true,
		initialCache: false
	})
}

export function useTeacherCodeCheckApi(code) {
	return useHttpGet("TeacherCodeCheckApi", `/open/teacher/teacher-reset-password?code=${code}`, {
		$: true,
	})
}
//修改密码
export function useTeacherResetPasswordApi(body) {
	return useHttpPost("TeacherResetPassword", "/open/teacher/teacher-reset-password-success", {
		body,
		$: true
	})
}

export function useTeacherCancelServiceApi(id) {
	return useHttpGet("TeacherCancelServiceApi", `/teacher/service/cancel?id=${id}`, {
		$: true
	})
}

export function useTeacherOpenTextbookNumApi() {
	return useHttpGet("useTeacherOpenTextbookNumApi", `/teacher/account/open-textbook-num`, {
		$: true
	})
}