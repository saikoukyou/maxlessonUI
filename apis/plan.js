//获取首页的套餐
export function useHomePlanListDataApi() {
  return useHttpGet("HomePlanListData", `/open/plan/index`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}
export function useStudentPlanListDataApi() {
  return useHttpGet("StudentPlanListData", `/student/plan/index`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useStudentChangeMonthPlanPayjpApi(plan_code,token='',flag=1) {
  return useHttpGet("StudentChangeMonthPlanPayjp", `/open/payjp/change-payjp-subscription?new_plan_code=${plan_code}&payjp-token=${token}&flag=${flag}`, {
    // 懒加载
    lazy: false,
    $: true,
  });
}

export function useStudentChangeTicketPlanPayjpApi(plan_code,token='',form = {}) {
  let q = useQueryToString(form);
  console.log('变量内容：：：：');
  console.log(q);
  if (q) {
    return useHttpGet("StudentChangeTicketPlanPayjp", `/open/payjp/set-express-checkout${q}&plan_code=${plan_code}&payjp-token=${token}`, {
      // 懒加载
      lazy: false,
      $: true,
    });
  } else {
    return useHttpGet("StudentChangeTicketPlanPayjp", `/open/payjp/set-express-checkout?plan_code=${plan_code}&payjp-token=${token}`, {
      // 懒加载
      lazy: false,
      $: true,
    });
  }

}

export function useStudentPaypalPayApi(plan_code) {
  return useHttpGet("StudentPaypalPay", `/open/payment/set-express-checkout?plan_code=${plan_code}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}

export function useStudentDoExpressCheckoutApi(token) {
  return useHttpGet("StudentDoExpressCheckout", `/open/payment/get-express-checkout-detail?token=${token}`, {
    // 懒加载
    lazy: false,
    $: true
  });
}
//法人支付学生领取月套餐
export function useBusinessStudentChangeMonthPlanPayjpApi(body) {
  return useHttpPost("BusinessStudentChangeMonthPlanPayjp", `/student/account/change-free-month-plan`, {
    // 懒加载
    lazy: false,
    $: true,
    body,
  });
}
export function useBusinessStudentChangeTicketPlanPayjpApi(body) {
  return useHttpPost("BusinessStudentChangeTicketPlanPayjp", `/student/account/change-free-ticket-plan`, {
    // 懒加载
    lazy: false,
    $: true,
    body,
  });
}