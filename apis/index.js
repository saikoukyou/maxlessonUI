//接口调用抽离管理
//nuxt3下composables目录中导出方法可以被直接调用
//老师检索页默认接口
export function useIndexDataApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("IndexData", `/open/teachers/index${q}`,{
    $: true
  });
}
//老师检索之后分页及搜索条件接口
export function useIndexListDataApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("IndexListData", `/open/teachers/index-list${q}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

//获取老师详细信息接口
export function usePreviewTeacherDataApi(id,searchDay='',flag='') {
  // let q = useQueryToString(id);
  return useHttpGet("PreviewTeacherData", `/open/teachers/preview?id=${id}&search_day=${searchDay}&flag=${flag}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

//获取首页人气老师和今日老师
export function useHomeTeacherListDataApi() {
  // useRefreshClientId();
  return useHttpGet("HomeTeacherListData", `/open/teacher/home`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
//获取首页上课数量和最新情报
export function useHomeLessonAndInfoListDataApi() {
  // useRefreshClientId();
  return useHttpGet("HomeLessonAndInfoListData", `/open/home`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
//获取首页的博客和视频
export function useHomeBlogAndVideoListDataApi() {
  // useRefreshClientId();
  return useHttpGet("HomeBlogAndVideoListData", `/open/home/blog-and-video`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
//时间检索之后分页及搜索条件接口
export function useTimeTeacherListDataApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("TimeTeacherListData", `/open/teachers/index-time${q}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
//帮助页面提交问题
export function useSaveContactDataApi(query) {
  let q = useQueryToString(query);
  return useHttpGet("SaveContact", `/open/faqs/contact${q}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

//博客详情页面
export function useBlogInfoApi(id,flag) {
  return useHttpGet("BlogInfo", `/open/blog/info/${id}?flag=${flag}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
//根据分类获取blog列表
export function useBlogListDataApi(id,query) {
  let q = useQueryToString(query);
  return useHttpGet("BlogListData", `/open/blog/list/${id}${q}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
export function useSelectedTimeTeacherListData(query) {
  let q = useQueryToString(query);
  return useHttpGet("SelectedTimeTeacherListData", `/open/teachers/list${q}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

//帮助页面提交问题
export function useBusinessSaveContactDataApi(body) {
  return useHttpPost("BusinessSaveContactData", `/open/business/contact`, {
    // 懒加载
    lazy: false,
    $: true,
    body: body
  });
}
//
export function useBusinessShowPlanListDataApi() {
  return useHttpGet("BusinessShowPlanListData", `/open/business/planlist`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useBusinessSendAlarmEmailDataApi(body) {
  return useHttpPost("BusinessSendAlarmEmailData", `/open/business/alarm-email`, {
    // 懒加载
    lazy: false,
    $: true,
    body: body
  });
}

export function useGetTokenDataApi(body) {
  return useHttpPost("GetTokenData", `/home/index/atoken`, {
    // 懒加载
    lazy: false,
    $: true,
    body: body
  });
}

export function useSaveTalkHistoryDataApi(body) {
  return useHttpPost("SaveTalkHistoryData", `/home/index/save-history`, {
    // 懒加载
    lazy: false,
    $: true,
    body: body
  });
}
export function useSaveTimeDataApi(body) {
  return useHttpPost("SaveTimeData", `/home/index/save-time`, {
    // 懒加载
    lazy: false,
    $: true,
    body: body
  });
}

export function useDeleteImgDataApi(body) {
  return useHttpPost("DeleteImgData", `/home/upload/delete`, {
    // 懒加载
    lazy: false,
    $: true,
    body: body
  });
}