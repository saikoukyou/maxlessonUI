//将接收的对象数据转为请求url接口参数
import {useAddBookmarkApi, useDownloadTextbookApi, useUpdateStudentInfoDataApi} from "~/apis/student";
import {createDiscreteApi} from "naive-ui";
import {useMainStore} from "~/composables/store";

export function useQueryToString(query = {}) {
  let q = "";
  for (const key in query) {
    if (q == "") {
      q = `?${key}=${query[key]}`;
    } else {
      q += `&${key}=${query[key]}`;
    }
  }
  return q;
}

//回车事件
export function useEnterEvent(event) {
  let handleEnterEvent = (e) => {
    if (e.key === "Enter") {
      event();
      e.preventDefault();
    }
  };
  onBeforeMount(() => {
    document.addEventListener("keydown", handleEnterEvent);
  });

  //移除事件
  onUnmounted(() => {
    document.removeEventListener("keydown", handleEnterEvent);
  });
}

//时间状态判断
export function useTimeStatus(start, end) {
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  const now = Date.now();

  let status = "";
  if (start < now && now < end) {
    status = "ing";
  } else if (start >= now) {
    status = "pending";
  } else {
    status = "end";
  }

  return status;
}

export function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year,month,day].join('-');
}

export async function addBookmark(teacher_id) {
  const useStore = useMainStore(); // ⬅️ 在最一開始就取得 useStore（因為要先檢查收藏數）
  // console.log('addBookmark:'+JSON.stringify(res));
  const { message } = createDiscreteApi(["message"]);
  const currentBookmarks = useStore?.studentInfo?.bteachers ?? [];
  if (!currentBookmarks.includes(teacher_id) && currentBookmarks.length >= 30) {
    message.error("お気に入りは最大30名まで登録できます");
    return;
  }
  const { data: res } = await useAddBookmarkApi(teacher_id);
  if (res?.value?.err == false) {
    useStore.useRefreshUserInfo();
    message.success(res?.value?.err_msg);
  } else {
    message.error(res?.value.err_msg);
  }
}

async function changeTimezoneFun(timezone) {
  const useStore = useMainStore();
  const {data: info } = await useUpdateStudentInfoDataApi({flag : 'timezone',timezone : timezone});
  if (info.value !== null && info.value !== undefined) {
    if (info.value.err === false) {
      await useStore?.useRefreshUserInfo();
      const { message } = createDiscreteApi(["message"]);
      message.success('変更を保存しました。');
      location.reload()
    }
  }
}

export async function changeTimezone(timezone) {
  let msg = timezone === 'cn' ? '中国時間' : '日本時間';
  const { dialog } = createDiscreteApi(["dialog"])
  dialog.warning({
    content: "予約済みのレッスンを含めて、マイページでの時間表示は-"+msg+"に変わります。",
    positiveText: "確定",
    negativeText: "取り消し",
    onPositiveClick: async () => {
      await changeTimezoneFun(timezone);
    },
    onNegativeClick: async () => {
    },
  })
}

export async function preview (id,flag=''){
  await useDownloadTextbookApi(id,flag);
}