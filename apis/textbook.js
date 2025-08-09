//获取首页的套餐
export function useHomeCategoryListDataApi(type,bid=0) {
  return useHttpGet("HomeCategoryListData", `/open/category/index?type=${type}&bid=${bid}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useTextbookListDataApi(category_id,sid) {
  return useHttpGet("TextbookListData", `/open/textbook/index?category_id=${category_id}&sid=${sid}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useOldTextbookListDataApi(course,level,sid) {
  return useHttpGet("TextbookListData", `/open/textbook/index?course=${course}&level=${level}&flag=1&sid=${sid}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}