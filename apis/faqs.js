//获取首页的套餐
export function useHomeFaqListDataApi() {
  return useHttpGet("HomeFaqListData", `/open/faqs/index`, {
    // 懒加载
    lazy: false,
    $: true
  });
}