<script setup>
import {
  createDiscreteApi,
  NSelect,
  NModal,
  NCard,
  NButton,
  NFormItem,
  NInput,
  NTabs,
  NTabPane,
  NCountdown
} from "naive-ui";
import {
  useCancelLessonData,
  useCategoryListData,
  useReportData,
  useReportValidationData, useSendAccountIdWrongEmailData, useSendLateEmailData, useTeacherCancelServiceApi,
  useTeacherLessonInfo, useTeacherUpdateClassStatus,
  useTextBooksListData
} from "~/apis/teacher";
import {useLastCancelApi, useNoAttendApi} from "~/apis/student";
import {ref} from "vue";

const props = defineProps({
  // lesson_show: {
  //   type: [Boolean],
  //   default: false
  // },
  lesson_id: {
    type: [Number],
    default: 0
  },
  open_show_stime: {
    type: [String],
    default: ''
  },
  open_show_etime: {
    type: [String],
    default: ''
  },
  selected_day: {
    type: [String],
    default: ''
  },
  status: {
    type: [String],
    default: '1'
  },
  is_web: {
    type: [Boolean],
    default: true
  },
  is_wrong: {
    type: [Boolean],
    default: true
  },
});

let lesson_info = ref([]);
let selected_lesson_unixtime = ref(0);
let comment_msg = ref('');
let course_options = ref([]);
let course_selected = ref('');
let level_selected = ref('');
let taglevels = ref([]);
let cat_selected = ref('');
let cat_options = ref([]);
// let type_options = [
//   {label: '没有使用网站教材（自由会话，学生自备等）',value: 1},
//   {label: '使用了新版教材',value: 2},
//   {label: '使用了旧版教材/市面教材（有【旧版】【市販】字样的教材）',value: 3},
//   {label: '使用了教材',value: 4},
// ];
let type_selected = ref('1');
let textbooks_options = ref([]);
let textbooks_selected = ref([]);
let type_err = ref(false);
let textbook_level_err = ref(false);
let textbook_course_err = ref(false);
let textbook_category_err = ref(false);
let current_textbook_id_err = ref(false);
let over_current_textbook_id_err = ref(false);
let max_updated_num_err = ref(false);
let report_due_date_err = ref(false);
let showUpload = ref(false);
let uimage = ref('');
let selectedLesson = ref(0);
let submitType = ref(0);
let loading = ref(false);
let loading2 = ref(false);
let showErr = ref(false);
let category_id = ref(0);
let lessonShow = ref(true);
let showCancel = ref(false);
const cactive = ref(true);
const duration = ref(0);
const videoShow = ref(false);
const mode = ref('create');
const showOld = ref(false);
let type_old_selected = ref('');
let studentMsg = ref('');
let cancelLoading = ref(false);
let imgSrc = ref('');
let timg1 = ref('');
let timg2 = ref('');
let timg3 = ref('');
let timg4 = ref('');
let timg5 = ref('');
let showImg = ref(false);
let countdownImg;
let timerImg;
const uploadShow = ref(false);

async function getLessonInfo(lesson_id) {
  loading.value = true;
  const {pending, data: lessonData  } = await useTeacherLessonInfo(lesson_id);
  if (lessonData?.value && lessonData?.value.err === false) {
    loading.value = false;
    lesson_info.value = lessonData.value;
    //获取数据之后设置窗口状态
    let courseArr = lesson_info?.value?.course;
    let levelArr = lesson_info?.value?.taglevel;
    taglevels.value = Object.keys(levelArr).map(
        key => ({
          label: levelArr[key],
          value: key
        })
    );
    course_options.value = Object.keys(courseArr).map(
        key => ({
          label: courseArr[key],
          value: key
        })
    );

    if (lesson_info.value.has_comment === true) {
      mode.value = 'update';
      if (lesson_info?.value?.report_by_lesson) {
        level_selected.value = lesson_info?.value?.report_by_lesson?.level ?? '' ;
        level_selected.value = level_selected?.value == 0 ? '' : level_selected?.value+'';
        course_selected.value = lesson_info.value.report_by_lesson.course ?? '' ;
        course_selected.value = course_selected?.value == 0 ? '' : course_selected?.value+'';

        comment_msg.value = lesson_info.value.report_by_lesson?.comment ?? '' ;
        type_selected.value = lesson_info.value.report_by_lesson?.type+'' ?? '1' ;
        if (type_selected.value === '2' || type_selected.value === '3' || type_selected.value === '4') {
          type_old_selected.value = type_selected.value;
          type_selected.value = '10';
        }
        // console.log('type_selected.value:'+type_selected.value);

        if ((props.status == 6 || props.status == 7) && lesson_info?.value?.student_type === 0) {
          await Categoryfun(lesson_info.value.business_id,lesson_info.value.is_corporate_member,lesson_info.value.student_id);

          cat_selected.value = lesson_info.value.report_by_lesson?.textbook_category_id ?? '' ;
          cat_selected.value = cat_selected?.value == 0 ? '' : cat_selected?.value+'';
          await changeCategory(lesson_info.value.student_id)
        }


        if (lesson_info?.value?.report_by_lesson?.selected_textbook_ids) {
          let textbook_ids_arr = (lesson_info.value.report_by_lesson?.selected_textbook_ids+"").split(',');
          textbooks_selected.value = textbook_ids_arr.map(item => parseInt(item))
          // console.log('textbooks_selected.value:'+JSON.stringify(textbooks_selected.value));
        } else {
          textbooks_selected.value = [];
        }

      }

    } else {
      mode.value = 'create';
      level_selected.value = '';
      course_selected.value = '';

      comment_msg.value = '★注意事项：\n★下节课起点：';
      if (lesson_info.value.isOld == 0) {
        type_selected.value = lesson_info.value.isBusiness == 1 ? lesson_info.value.routemapable ? '5' :'6' : '7';
      } else {
        type_selected.value = '10';
        type_old_selected.value = lesson_info.value.isBusiness == 1 ? '4' : '2';
      }

      if ((props.status == 6 || props.status == 7) && lesson_info?.value?.student_type === 0) {
        await Categoryfun(lesson_info.value.business_id,lesson_info.value.is_corporate_member,lesson_info.value.student_id);
        await changeCategory(lesson_info.value.student_id)
      }

      cat_selected.value = '';
      let textbook_ids_arr = '';
      textbooks_selected.value = [];

    }

    loading.value = false;
    if (type_selected.value === '10') {
      showOld.value = true;
    }

    videoShow.value = lesson_info?.value?.videoShow == 1 ? true : false;
    duration.value = lesson_info?.value?.duration ? lesson_info?.value?.duration : 0;
    cactive.value = lesson_info?.value?.cactive == 1 ? true : false;
    timg1.value = lesson_info?.value?.timg1 ?? "";
    timg2.value = lesson_info?.value?.timg2 ?? "";
    timg3.value = lesson_info?.value?.timg3 ?? "";
    timg4.value = lesson_info?.value?.timg4 ?? "";
    timg5.value = lesson_info?.value?.timg5 ?? "";
    startCountdown(lesson_info?.value?.duration2 ? lesson_info?.value?.duration2 : 0);
    if (lessonData?.value?.end_img_count >= 0) {
      startCountdownImg(lesson_info?.value?.end_img_count ? lesson_info?.value?.end_img_count : 0);
    }

    // let startTime = Number(lesson_info?.value['lesson_video_start_unixtime_jp'])*1000;
    // let endTime = Number(lesson_info?.value['lesson_video_end_unixtime_jp'])*1000;
    // if (startTime > Date.now()) {
    //   cactive.value = true;
    //   videoShow.value = false;
    //   duration.value = startTime - Date.now();
    //   // console.log('duration.value:'+duration.value);
    // } else if (startTime < Date.now() && endTime > Date.now()) {
    //   videoShow.value = true;
    //   duration.value = 0;
    //   cactive.value = false;
    // } else {
    //   videoShow.value = false;
    //   cactive.value = false;
    // }

    studentMsg.value = lesson_info?.value?.student_msg ?? '';
  }
}

onMounted(() => {
  clearTimeout(timer);
  clearTimeout(timerImg);
  getLessonInfo(props.lesson_id);
});

defineExpose({getLessonInfo})
async function submitComment(lesson_id) {
  showErr.value = false;
  type_err.value = false;
  textbook_level_err.value = false;
  textbook_course_err.value = false;
  textbook_category_err.value = false;
  current_textbook_id_err.value = false;
  over_current_textbook_id_err.value = false;

  if (!type_selected.value) {
    type_err.value = true;
    showErr.value = true;
  }
  if (type_selected.value == 2 || type_selected.value == 3 || type_selected.value == 7) {
    if (!level_selected.value) {
      textbook_level_err.value = true;
      showErr.value = true;
    }
    if (!course_selected.value) {
      textbook_course_err.value = true;
      showErr.value = true;
    }
    if (!cat_selected.value) {
      textbook_category_err.value = true;
      showErr.value = true;
    }
    if (!textbooks_selected.value.length) {
      current_textbook_id_err.value = true;
      showErr.value = true;
    }
    if (textbooks_selected?.value.length > 3) {
      over_current_textbook_id_err.value = true;
      showErr.value = true;
    }
  } else if (type_selected.value == 1) {//没有使用教材
    level_selected.value = '';
    course_selected.value = '';
    cat_selected.value = '';
    textbooks_selected.value = [];
    // current_textbook_ids.value = '';
    // textbook_category.value = '';
  } else if (type_selected.value == 4 || type_selected.value == 5 || type_selected.value == 6) {//法人学生使用了教材
    if (!cat_selected.value) {
      textbook_category_err.value = true;
      showErr.value = true;
    }
    if (!textbooks_selected.value.length) {
      current_textbook_id_err.value = true;
      showErr.value = true;
    }
    if (textbooks_selected?.value.length > 3) {
      over_current_textbook_id_err.value = true;
      showErr.value = true;
    }
  }
  if (showErr.value) {
    loading2.value = false;
    return;
  }

  loading2.value = true;

  const body = {
    lesson_id:lesson_id,
    textbook_level:level_selected.value,
    textbook_course:course_selected.value,
    textbook_category:cat_selected.value,
    current_textbook_ids:textbooks_selected.value.length ? textbooks_selected.value.join(',') : '',
    type:type_selected.value === '10' ? type_old_selected.value : type_selected.value,
    comment:comment_msg.value,
    level:level_selected.value,
    course:course_selected.value,
    mode:mode.value
  }
  const {pending, data: checkInfo  } = await useReportValidationData(body);
  if (checkInfo?.value && checkInfo?.value?.err === true) {
    textbook_level_err.value = checkInfo?.value.textbook_level_err;
    textbook_course_err.value = checkInfo?.value.textbook_course_err;
    textbook_category_err.value = checkInfo?.value.textbook_category_err;
    current_textbook_id_err.value = checkInfo?.value.current_textbook_id_err;
    over_current_textbook_id_err.value = checkInfo?.value.over_current_textbook_id_err;
    max_updated_num_err.value = checkInfo?.value.max_updated_num_err;
    report_due_date_err.value = checkInfo?.value.report_due_date_err;
    loading2.value = false;
  } else {
    const {pending, data: reportInfo  } = await useReportData(body);
    const { message } = createDiscreteApi(["message"])
    if (reportInfo?.value !== null && reportInfo?.value.err === false) {
      loading2.value = false;
      message.success("填写成功");
      emit('cancelLesson');
      await getLessonInfo(lesson_id);
    } else {
      message.error("填写失败");
    }
  }
  // console.log('checkinfo:'+JSON.stringify(checkInfo.value));
}

const Categoryfun = async () => {
  // const { message } = createDiscreteApi(["message"]);
  // if (level_selected.value === '') {
  //   message.success("请选择等级");
  //   return false;
  // }
  // if (course_selected.value === '') {
  //   message.success("请选择科目");
  //   return false;
  // }
  let type_value = ref('');
  if (type_selected.value === '10') {
    type_value.value = type_old_selected.value;
  } else {
    type_value.value = type_selected.value;
  }
  const {pending, data: categoryInfo  } = await useCategoryListData(level_selected.value,course_selected.value,
      lesson_info?.value?.business_id ?? 0,lesson_info?.value?.is_corporate_member ?? 0,type_value.value,
      lesson_info?.value?.student_id ?? 0,lesson_info?.value?.isOld,lesson_info?.value?.isBusiness);
  // console.log('categoryInfo:'+JSON.stringify(categoryInfo));
  if (categoryInfo?.value) {
    let textbook_category_list  = categoryInfo?.value?.textbook_category_list ?? [];
    cat_options.value = Object.keys(textbook_category_list).map(
        key => ({
          label: textbook_category_list[key].name+'',
          value: textbook_category_list[key].id+''
        })
    );
    cat_selected.value = '';
    textbooks_selected.value = [];

    //获取数据之后设置窗口状态
    if (categoryInfo?.value?.course) {
      let courseArr = categoryInfo?.value?.course;
      course_options.value = Object.keys(courseArr).map(
          key => ({
            label: courseArr[key],
            value: key
          })
      );
    }
    if (categoryInfo?.value?.taglevel) {
      let levelArr = categoryInfo?.value?.taglevel;
      taglevels.value = Object.keys(levelArr).map(
          key => ({
            label: levelArr[key],
            value: key
          })
      );
    }

    // console.log('cat_selected.value:'+cat_selected.value);
    // console.log('textbooks_selected.value:'+textbooks_selected.value);
    // console.log('cat_options:'+cat_options.value);
    // level_selected.value = '';
    // course_selected.value = '';
  }
}

async function changeClass(status) {
  const {pending, data: changeInfo  } = await useTeacherUpdateClassStatus(selected_timetable_id.value,status,selected_lesson_unixtime.value);
  if (changeInfo.value.err == false) {
    const { message } = createDiscreteApi(["message"])
    // message.success("変更に成功しました");
    open_show.value = false;
    getTimesInfo(teacherDays.value[searchDayIndex.value].day);
  }
}

function changeCourse() {
  if (type_selected.value === '1') {
    // console.log('changeCourseempty'+type_selected.value);
    // console.log('changeCourseempty');
    return false;
  } else if (level_selected.value !== '' && course_selected.value !== '') {
    Categoryfun();
  } else {
    cat_selected.value = '';
    textbooks_selected.value = [];
  }
}
function changeLevel() {
  if (type_selected.value == '1') {
    // console.log('changeLevelempty');
    return false;
  } else if (level_selected.value !== '' && course_selected.value !== '') {
    Categoryfun();
  } else {
    cat_selected.value = '';
    textbooks_selected.value = [];
  }
}
async function changeCategory(student_id) {
  let type_value = ref('');
  if (type_selected.value === '10') {
    type_value.value = type_old_selected.value;
  } else {
    type_value.value = type_selected.value;
  }
  textbooks_selected.value = [];
  const {pending, data: textbookInfo  } = await useTextBooksListData(cat_selected.value,type_value.value,student_id);
  // console.log('textbookInfo:'+JSON.stringify(textbookInfo.value));
  if (textbookInfo?.value) {
    let textbookList = textbookInfo?.value?.textbook_list ?? [];
    // console.log('type_selected.value:'+type_selected.value);
    if (type_selected.value === '10' || type_selected.value == '2' || type_selected.value == '3' || type_selected.value == '4') {
      textbooks_options.value = Object.keys(textbookList).map(key => ({
        label: textbookList[key].title,
        value: parseInt(textbookList[key].id)
      }));
    } else {
      textbooks_options.value = Object.keys(textbookList).map(key => ({
        label: '第'+(Number(key)+1)+'课'+textbookList[key].title,
        value: parseInt(textbookList[key].id)
      }));
    }

    // console.log('textbooks_options.value:'+JSON.stringify(textbooks_options.value));
  }

}

async function sendLateEmail(lesson_id) {
  const {pending, data: sendInfo  } = await useSendLateEmailData(lesson_id);
  if (sendInfo.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success("邮件发送成功");
    await getLessonInfo(props.lesson_id);
  }

}

async function sendAccountIdWrongEmail(lesson_id) {
  const {pending, data: wrongInfo  } = await useSendAccountIdWrongEmailData(lesson_id);
  if (wrongInfo.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success("邮件发送成功");
    await getLessonInfo(props.lesson_id);
  }

}

const emit = defineEmits(['cancelLesson','cancelService'])
async function cancelLesson(lesson_id) {
  cancelLoading.value = true;
  const {pending, data: cancelInfo  } = await useCancelLessonData(lesson_id);
  if (cancelInfo.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success("取消成功");
    emit('cancelLesson');
    // await getLessonInfo(props.lesson_id);
  }

}

async function cancelService(lesson_id) {
  const {pending, data: cancelInfo  } = await useTeacherCancelServiceApi(lesson_id);
  if (cancelInfo.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success("取消成功");
    emit('cancelService');
    // await getLessonInfo(props.lesson_id);
  }

}

function cancelUpload() {
  lessonShow.value = true;
  showUpload.value = false;
  showCancel.value = false;
}

function submitUpload() {
  // return;
  if (submitType.value === 15) {
    submitNoAttend();
  } else if (submitType.value === 14) {
    submitLastCancel();
  }
}
function noAttend(lesson_id) {
  lessonShow.value = false;
  showUpload.value = true;
  selectedLesson.value = lesson_id;
  submitType.value = 15;
}

function closeUpload() {
  showUpload.value = false;
  showCancel.value = false;
}

async function submitNoAttend() {
  const {pending, data: info  } = await useNoAttendApi(selectedLesson.value,uimage.value);
  if (info?.value && info?.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success('操作成功');
    showUpload.value = false;
    selectedLesson.value = 0;
    uimage.value = '';
    emit('cancelService');
  }
}
function lastCancel(lesson_id) {
  lessonShow.value = false;
  showCancel.value = true;
  selectedLesson.value = lesson_id;
  submitType.value = 14;
}
async function submitLastCancel() {
  const {pending, data: info  } = await useLastCancelApi(selectedLesson.value,uimage.value);
  if (info?.value && info?.value.err === false) {
    const { message } = createDiscreteApi(["message"])
    message.success('操作成功');
    showUpload.value = false;
    selectedLesson.value = 0;
    uimage.value = '';
    emit('cancelService');
  }
}

function changeType() {
  cat_selected.value = '';
  textbooks_selected.value = [];
  level_selected.value = '';
  course_selected.value = '';
  taglevels.value = [];
  course_options.value = [];

  if (type_selected.value === '10') {
    showOld.value = true;
    if (type_old_selected.value === '') {
      type_old_selected.value = lesson_info.value.isBusiness == 1 ? '4' : '2';
    }

    Categoryfun();
  } else {
    showOld.value = false;
    type_old_selected.value = '';

    if (type_selected.value === '1') {

    } else {
      Categoryfun();
    }
  }

  // if (type_selected.value == 5) {

  // }
}

function finishCount() {
  cactive.value = false;
}

// const startCountdown = (num) => {
//   let timer1 = null;
//   timer1 = setInterval(() => {
//     if (num > 0) {
//       num--;
//     } else {
//       clearInterval(timer1);
//       videoShow.value = true;
//     }
//   }, 1000)
// };

let countdownEnd;
let timer;

function startCountdown(duration) {
  clearTimeout(timer);
  countdownEnd = Date.now() + duration;
  updateCountdown();
}

function updateCountdown() {
  const remaining = Math.max(0, countdownEnd - Date.now());

  if (remaining > 0) {
    timer = setTimeout(updateCountdown, 1000);
  } else {
    videoShow.value = true;
  }
}

function startCountdownImg(duration) {
  clearTimeout(timerImg);
  countdownImg = Date.now() + duration;
  updateCountdownImg();
}

function updateCountdownImg() {
  const remaining = Math.max(0, countdownImg - Date.now());

  if (remaining > 0) {
    timerImg = setTimeout(updateCountdownImg, 1000);
  } else {
    uploadShow.value = true;
  }
}

const renderTime = ({ hours, minutes, seconds }) => {
  const pad = (n) => String(n).padStart(2, '0');
  return h(
      'span',
      { style: 'color: red; font-weight: bold;' },
      `${pad(hours)}小时${pad(minutes)}分${pad(seconds)}秒`
  );
};

function previewImg(img) {
  showImg.value = true;
  imgSrc.value = img;
}

</script>

<template>
  <n-tabs
      v-if="lessonShow"
      type="card"
      class="MyTab"
  >
    <n-tab-pane
        style="z-index:1000;padding-top: 0;"
        name="预约基本信息"
    >
      <!-- 课程详情 -->
      <div class="teacher-dashboard" style="z-index:1000;">
        <div class="course-detail">
          <LoadingGroup :pending="loading">
            <div class="baseinfo">
              <div class="date">
                <p class="dateinfo">{{props.open_show_stime}}～{{props.open_show_etime}}</p>
                <p class="classId">课程 ID：{{lesson_info.id}}</p>
              </div>
              <div class="student">
                <p class="row">
                  <span class="font-size-l">{{lesson_info.student_last_name}}{{lesson_info.student_first_name}}</span>
                </p>
                <p><span>学生ID：{{lesson_info.student_id}}</span></p>
              </div>
            </div>

            <div class="recordForm" v-if="(props.status == 6 || props.status == 7) && lesson_info?.student_type === 0">
              <p class="edit_form">
                <span class="h1title">请添加课程记录</span>
                ※每节课都要记录，没有记录，不会计入课时费。（课后{{lesson_info.app_report_edit_deadline}}小时内）<br>
                ※您的记录决定了学生能否看到下一课教材，请正确记录。
              </p>
              <div v-if="lesson_info.reservation_status === 1 && lesson_info.service_type !== 1 && lesson_info.reportable === true">
                <div v-if="lesson_info.has_comment === true">
                  <div v-if="lesson_info.editable === true">
                    <div v-if="lesson_info.report_by_lesson.update_count > lesson_info.number_of_times_lessons_report_can_be_updated">
                      <p class="redWord">课程记录只能修改2次</p>
                    </div>
                  </div>
                  <div v-else>
                    <p class="redWord">课程记录只能{{lesson_info.app_report_edit_deadline}}小时以内修改</p>
                  </div>
                </div>
                <div v-else-if="lesson_info.writable === false">
                  <p class="redWord">课程记录只能{{lesson_info.app_report_edit_deadline}}小时以内修改</p>
                </div>
                <div v-else-if="props.status === 8">
                  <p class="redWord"> 已过期，无法填写课后记录</p>
                </div>

                <div v-if="lesson_info.writable === true || (lesson_info.editable === true && lesson_info.report_by_lesson.update_count <= lesson_info.number_of_times_lessons_report_can_be_updated)">



                  <div>
                    <span class="qtitle">本节课使用教材了吗？</span>
                    <!--            <n-select id="type_selected" name="type_selected" :options="type_options" v-model:value="type_selected" placeholder="请选择"></n-select>-->
<!--                    <select id="type_selected" name="type_selected" v-model="type_selected" @change="changeType()">-->
<!--                      <option value="1">没有使用网站教材（自由会话，学生自备）</option>-->
<!--                      <option v-if="lesson_info.is_corporate_member === 0" value="2">使用了新版教材</option>-->
<!--                      <option v-if="lesson_info.is_corporate_member === 0" value="3">使用了市贩教材</option>-->
<!--                      <option value="4">使用了教材</option>-->
<!--                      <option v-if="lesson_info.routemapable" value="5">使用了路线图</option>-->
<!--                    </select>-->
                    <div class="qfourBlock">
                      <label class="radio-button">
                        <input
                            type="radio"
                            value="1"
                            v-model="type_selected"
                            @change="changeType()"
                        >
                        没有使用网站教材<br>（自由会话，学生自备）
                      </label>

                      <span v-if="lesson_info.isOld == 1">
                        <label class="radio-button">
                          <input
                              type="radio"
                              value="10"
                              v-model="type_selected"
                              @change="changeType()"
                          >
                          原NETCHINA教材
                        </label>
                      </span>
                      <span v-if="lesson_info.isBusiness === 1">
                          <!--      路线图                    -->
                          <label class="radio-button" v-if="lesson_info.routemapable">
                            <input
                                type="radio"
                                value="5"
                                v-model="type_selected"
                                @change="changeType()"
                            >
                            BC版法人教材
                          </label>
                          <label class="radio-button" v-else>
                            <input
                                type="radio"
                                value="6"
                                v-model="type_selected"
                                @change="changeType()"
                            >
                            BC版法人教材
                          </label>
                        </span>
                      <span>
                          <label class="radio-button">
                            <input
                                type="radio"
                                value="7"
                                v-model="type_selected"
                                @change="changeType()"
                            >
                            BC版学生教材
                          </label>
                        </span>

                    </div>
                    <div style="margin-bottom: 10px;" v-show="showOld">
                      <label class="qlabel" for="tag_level">教材版本：</label>
                      <span v-if="lesson_info.isBusiness === 0">
                        <label class="radio-button" v-if="lesson_info.isBusiness === 0">
                          <input
                              type="radio"
                              value="2"
                              v-model="type_old_selected"
                              @change="changeType()"
                          >
                          NC学生教材
                        </label>

                        <label class="radio-button" v-if="lesson_info.is_corporate_member === 0">
                          <input
                              type="radio"
                              value="3"
                              v-model="type_old_selected"
                              @change="changeType()"
                          >
                            NC市贩教材
                        </label>
                      </span>
                      <span v-else>
                          <label class="radio-button" style="margin-right: 0;">
                            <input
                                type="radio"
                                value="4"
                                v-model="type_old_selected"
                                @change="changeType()"
                            >
                            NC法人教材
                          </label>
                        </span>
                    </div>

                    <p v-if="type_err" class="form_err_not_margin">请选择教材类型</p>
                  </div>

                  <div v-if="type_selected === '2' || type_selected === '3' || type_selected === '7' || type_old_selected === '2'">
                    <div class="form-group">
                    <label class="qlabel" for="tag_level">难易度：</label>
                    <n-select id="tag_level" name="tag_level" :options="taglevels" v-model:value="level_selected" @update:value="changeLevel()" placeholder="请选择"></n-select>
                    </div>
                    <p v-if="textbook_level_err" class="form_err_not_margin">请选择难易度</p>
                    <!--            <select id="tag_level" name="tag_level" v-model="level_selected" @click="changeLevel(lesson_info.is_corporate_member,lesson_info.business_id)">-->
                    <!--              <option value="0" selected>请选择</option>-->
                    <!--              <option v-for="(level,lindex) in taglevels" :value="lindex">{{level}}</option>-->
                    <!--            </select>-->
                    <!--                <p v-if="textbook_level_err" class="form_err_not_margin">请选择难易度</p>-->

                    <div class="form-group">
                      <label class="qlabel" for="course_cat">分类：</label>
                    <n-select id="course_cat" name="course_cat" :options="course_options" v-model:value="course_selected" @update:value="changeCourse()" placeholder="请选择"></n-select>
                    <!--            <select id="course_cat" name="course_cat" v-model="course_selected" @click="changeCourse(lesson_info.is_corporate_member,lesson_info.business_id)">-->
                    <!--              <option value="0" selected>请选择</option>-->
                    <!--              <option v-for="(course,cindex) in course_options" :value="cindex">{{course}}</option>-->
                    <!--            </select>-->

                    </div>
                    <p v-if="textbook_course_err" class="form_err_not_margin">请选择分类</p>

                  </div>
                  <div v-if="type_selected !== '1'">
                    <div class="form-group">
                    <label class="qlabel" for="course_cat">课本名：</label>
                    <n-select id="textbook_cat" name="textbook_cat" :options="cat_options" v-model:value="cat_selected" @update:value="changeCategory(lesson_info.student_id)" placeholder="请选择"></n-select>
                    <!--            <select v-if="course_selected !== ''" id="textbook_cat" name="textbook_cat" v-model="cat_selected">-->
                    <!--              <option value="0" selected>请选择</option>-->
                    <!--              <option v-for="(category,catindex) in cat_options" :value="catindex">{{category}}</option>-->
                    <!--            </select>-->
                    </div>
                      <p v-if="textbook_category_err" class="form_err_not_margin">请选择课本名</p>

                    <div class="form-group"><label class="qlabel" for="course_cat">课时数：</label>
                    <n-select id="textbooks_selected" name="textbooks_selected" :options="textbooks_options" v-model:value="textbooks_selected" multiple placeholder="请选择"></n-select>
                    </div>
                      <p v-if="current_textbook_id_err" id="current_textbook_id_err" class="form_err_not_margin">请选择课</p>
                    <p v-if="over_current_textbook_id_err" class="form_err_not_margin" id="over_current_textbook_id_err">最多可选3课</p>

                  </div>

                  <p v-if="max_updated_num_err" class="form_err_not_margin" id="max_updated_num_err">课程记录只能修改2次</p>
                  <p v-if="report_due_date_err" class="form_err_not_margin" id="report_due_date_err">已过期，不能填写课后记录</p>
                  <div>
                    <!--                <div class="col gap bg-third padding-l padding-x-xl">-->
                    <!--                  <p>本节课内容：</p>-->
                    <!--                  <p>学生注意事项：</p>-->
                    <!--                  <p>下节课起点：</p>-->
                    <!--                  <p>本节课使用的教材：</p>-->
                    <!--                </div>-->
                    <div style="width: 100%;">
                      <label class="qtitle" for="">详细记录</label>
                      <div class="msgLink" v-html="lesson_info?.report_by_lesson?.textbookcnt"></div>
                      <n-input id="comment_msg" name="comment_msg" type="textarea" class="SignInput" v-model:value="comment_msg" :autosize="{minRows: 8,maxRows: 12,}" clearable placeholder="">
                      </n-input>
                      <div class="msgLink" v-html="lesson_info?.report_by_lesson?.remark"></div>
                      <!--                  <textarea v-model="comment_msg" style="width: 100%;height:100%;"></textarea>-->
                    </div>
                  </div>
                  <n-button style="margin: 10px auto;" class="Submit_search" type="submit" @click="submitComment(lesson_info.id)" :loading="loading2">
                    <span>提交</span>
                  </n-button>

                </div>

              </div>
            </div>
            <div class="cancelMsg" v-else-if="lesson_info?.student_type === 1">
              无需记录，已加50%课时费
            </div>

            <div v-else class="info font-size col gap-l">
              <div class="row infoBlock">
                <div class="software col">
                  <div class="row gap padding-l">
                    <label for="">上课软件</label>
                    <span class="flex">{{lesson_info.software_name}}</span>
                  </div>
                  <div class="row gap padding-l">
                    <label for="">软件账号</label>
                    <span class="flex" v-if="lesson_info.software == 'wechat'">{{lesson_info['student_wechat']}}</span>
                    <span class="flex" v-else-if="lesson_info.software == 'skype'">{{lesson_info['student_skype_id']}}</span>
                    <span class="flex" v-else-if="lesson_info.software == 'teams'">{{lesson_info['student_teams_id']}}</span>
                  </div>
                </div>

                <div class="qrcodeBlock">
                  <img :src="lesson_info.wechat_img" />
                </div>
              </div>

              <div v-if="lesson_info.service_type == 0" class="gap-l">
                <div class="padding-l ttable">
                  <label for="">学生喜欢的上课风格</label>
                  <span v-if="lesson_info.ask_language">{{lesson_info.maps.ask_language_cn[lesson_info.ask_language]}}</span>
                </div>
                <div class="padding-l ttable">
                  <label for="">本节课学生要求</label>
                  <span v-if="lesson_info.ask_lesson">{{lesson_info.maps.ask_lesson_cn[lesson_info.ask_lesson]}}</span>
                </div>
                <div class="padding-l ttable boderm">
                  <label for="">管理员提示</label>
                  <p>{{lesson_info.admin_comment}}</p>
                  <!--						<p>这个学生是法人体验的学生。第一节课用的教材是固定的。</p>-->
                  <!--						<p>请使用体验课教材第 1 课的内容。之后的内容和学生商量着 来。内容。之后的内容和学生商量着来。</p>-->
                </div>
              </div>

<!--              <div class="row">-->
<!--                <div class="flex border padding-l row" style="height: 100px;">-->
<!--                  <label for="">其他要求</label>-->
<!--                  <p>{{lesson_info.student_comment}}</p>-->
<!--                </div>-->
<!--              </div>-->

              <div v-if="lesson_info.service_type == 1">
                <div class="flex border padding-l col gap">
                  <label for="">相談内容</label>
                  <p>{{lesson_info.service_content}}</p>
                </div>
              </div>
              <div class="centerAlign">
              <div class="roomDiv" v-if="lesson_info.software === 'web' && lesson_info.reservation_status === 1 && lesson_info.lesson_status === 1 && lesson_info.service_type !== 1 && props.is_web">
                <span v-if="videoShow">
                  <nuxt-link :to="'/teacher/center/agoraVideo?channel='+lesson_info.id">
                    <n-button class="report_btn webBtn">
                      進入Web教室
                    </n-button>
                  </nuxt-link>
                </span>
                <span v-else>
                  <n-button class="report_btn webBtn" disabled>
                    進入Web教室
                  </n-button>
                </span>
                课程开始前
                <n-countdown
                    :duration="duration"
                    :active="cactive"
                    :on-finish="finishCount"
                    :render="renderTime"
                    class="countdown-red"
                />
                <span class="webNotice">（课程开始前5分钟可进入教室。）</span>
              </div>
                <div class="uploadList" v-if="lesson_info.software === 'web'">
                  <h1>レッスンボード</h1>
                  <p>レッスンの60分前からアップロ-ドが可能です。レッスン中にフアイルを共有できます。<br/>対応形式:JPG、PNG、PDF</p>
                  <div v-if="uploadShow">
                    <UploaderLesson class="face-img" v-model="timg1" :data="{type : 'lesson',lessonId : lesson_info.id,name : 'timg1',url : timg1}" @handlePreview="previewImg(timg1)" />
                    <UploaderLesson class="face-img" v-model="timg2" :data="{type : 'lesson',lessonId : lesson_info.id,name : 'timg2',url : timg2}" @handlePreview="previewImg(timg2)" />
                    <UploaderLesson class="face-img" v-model="timg3" :data="{type : 'lesson',lessonId : lesson_info.id,name : 'timg3',url : timg3}" @handlePreview="previewImg(timg3)" />
                    <UploaderLesson class="face-img" v-model="timg4" :data="{type : 'lesson',lessonId : lesson_info.id,name : 'timg4',url : timg4}" @handlePreview="previewImg(timg4)" />
                    <UploaderLesson class="face-img" v-model="timg5" :data="{type : 'lesson',lessonId : lesson_info.id,name : 'timg5',url : timg5}" @handlePreview="previewImg(timg5)" />
                  </div>
                </div>

              <div style="vertical-align: top; margin:0 4px; display: contents;" v-if="lesson_info.reservation_status === 1 && lesson_info.service_type !== 1">
                  <div style="display: contents; vertical-align: top; margin:0 4px;" v-if="lesson_info.service_type == 0 && lesson_info.lesson_status == 1">
                    <div style="display: inline-block; vertical-align: top; margin:0 4px;" v-if="lesson_info.send_late_email_history.length > 0">
                        <n-button class="report_btn disabled">学生迟到</n-button>
                      <div class="report_btn_msg">
                      <span>
                        过了开课时间5分钟后学生仍没有来的，务必通过按此键发邮件给学生。
                      <br>
                      <span class="red">已发送 (发送时间 : {{lesson_info.send_late_email_history[0]["sent_at_cn"]}})</span>
                      </span>
                      </div>
                    </div>
                    <div style="display: inline-table;" v-else>
                        <n-button class="report_btn" v-if="!lesson_info.cancelable" @click="sendLateEmail(lesson_info.id)">学生迟到</n-button>
                      <div class="report_btn_msg"></div>
                    </div>

                    <div style="display: contents;" v-if="props.is_wrong">
                      <div style="vertical-align: top; margin:0 4px; display: inline-block;" v-if="lesson_info.send_account_id_wrong_history.length > 0">
                        <n-button class="report_btn disabled">学生帐户ID有误</n-button>
                        <div class="report_btn_msg">
                      <span>
                        在添加好友时如果检索无对应结果，再次确认后仍没有的，尽早按此键通知学生。<br>
                      <span class="red">已发送 (发送时间 : {{lesson_info.send_account_id_wrong_history[0]["sent_at_cn"]}})</span>
                      </span>
                        </div>
                      </div>
                      <div style="display: inline-block; vertical-align: top; margin:0 4px;" v-else>
                        <n-button class="report_btn" @click="sendAccountIdWrongEmail(lesson_info.id)">学生帐户ID有误</n-button>
                        <div class="report_btn_msg"></div>
                      </div>
                    </div>

<!--                    <div  v-if="lesson_info.attendable === true">-->
<!--                      <div>-->
<!--                        <n-button class="report_btn" @click="noAttend(lesson_info.id)">学生没来</n-button>-->
<!--                      </div>-->
<!--                    </div>-->
                  </div>


                  <div style="display: inline-block; vertical-align: top; margin:0 4px;" v-if="lesson_info.attendable === true">
                    <n-button class="report_btn2"  @click="noAttend(lesson_info.id)">学生迟到12分钟</n-button>
                  </div>
                  <div style="display: inline-block; vertical-align: top; margin:0 4px;">
                    <span v-if="lesson_info.lastcancelable === true">
                      <n-button class="report_btn"  @click="lastCancel(lesson_info.id)">学生临时有事取消</n-button>
                    </span>
                    <span v-else-if="lesson_info.student_type === 1">
                      <n-button class="report_btn" disabled>学生临时有事取消</n-button>
                      <span class="red"> (已点击时间 : {{lesson_info.report_by_lesson["registered"]}})</span>
                    </span>
                  </div>

                <div style="display: inline-block; text-align: center;" v-if="lesson_info.cancelable === true && !cancelLoading">
                  <n-button class="report_btn" style="background-color: #DA2237;" @click="cancelLesson(lesson_info.id)">老师取消课程</n-button>
                  <div class="report_btn_msg">
                      <span>
                        因个人或者网络故障等原因无法讲课时，务必通过按此键取消预约。
                      </span>
                  </div>
                </div>

              </div>
              <div v-else>
                <div  v-if="lesson_info.cancelable === true">
                  <div>
                    <n-button class="report_btn" style="background-color: #DA2237;" @click="cancelService(lesson_info.id)">老师取消课程</n-button>
                  </div>
                  <div class="report_btn_msg">
                <span>
                  因个人或者网络故障等原因无法讲课时，务必通过按此键取消预约。
                </span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </LoadingGroup>
        </div>
      </div>

    </n-tab-pane>
    <n-tab-pane
        style="z-index:1000;padding-top: 0;"
        name="学生上课履历"
    >
        <div class="teacher-dashboard" style="z-index:1000;background-color: #FFFFFF; gap:0;">
        <div class="baseinfo">
          <div class="student">
            <p class="row">
              <span class="font-size-l">{{lesson_info.student_last_name}}{{lesson_info.student_first_name}}</span>
            </p>
            <p><span>学生ID：{{lesson_info.student_id}}</span></p>
          </div>
          <div class="studentlink" v-if="lesson_info.is_corporate_member == 1">
            <div v-if="lesson_info.routemapable === 1">
              <nuxt-link :to="'/teacher/center/roadmap?sid='+lesson_info.student_id">
                法人教材一览<img class="studentarrow" src="../assets/images/studentlink.png"/>
              </nuxt-link>
            </div>
            <div v-else>
              <nuxt-link :to="'/teacher/center/textbookBusiness?bid='+lesson_info.business_id">
                法人教材一览<img class="studentarrow" src="../assets/images/studentlink.png"/>
              </nuxt-link>
            </div>
            <div v-if="lesson_info.isOld == 1">
               |
              <nuxt-link :to="'/teacher/center/textbookBusinessOld?bid='+lesson_info.business_id">
                原NetCHINA法人教材一览<img class="studentarrow" src="../assets/images/studentlink.png"/>
              </nuxt-link>
            </div>
            <div>
               |
              <nuxt-link :to="'/teacher/center/textbook?sid='+lesson_info.student_id">
                BizCHINA学生教材一览<img class="studentarrow" src="../assets/images/studentlink.png"/>
              </nuxt-link>
            </div>
          </div>
          <div class="studentlink" v-else>
            <div>
              <nuxt-link :to="'/teacher/center/textbook?sid='+lesson_info.student_id">
                BizCHINA学生教材一览<img class="studentarrow" src="../assets/images/studentlink.png"/>
              </nuxt-link>
            </div>
            <div>
               |
              <nuxt-link v-if="lesson_info.isOld == 1" :to="'/teacher/center/textbookNc?sid='+lesson_info.student_id">
                原NetCHINA教材一览<img class="studentarrow" src="../assets/images/studentlink.png"/>
              </nuxt-link>
            </div>
            <a href="https://jinshuju.net/f/h80aY5" target="_blank">
              <div class="errorreport">教材错误报告
                <img src="../assets/images/whitearrow.png"/>
              </div>
            </a>
          </div>
        </div>

      <div class="studentrecord">
        <span class="studentMsg">{{studentMsg}}</span>
        <div class="course-detail" v-if="lesson_info.first_lesson == 1 && !lesson_info.reports_by_student.length && lesson_info.is_corporate_member == 0">
          <div v-if="lesson_info.learn_type == 1">
            <ul class="firstBlock">
            <li>体验课的上课流程(会话):</li>
              <li>1，老师主动添加学生联系方式。切勿迟到。</li>
              <li>2，使用体验教材，和学生做测试，了解学生基本水平。</li>
              <li>3，依据体验教材提示，推荐学生接下来使用的教材内容。</li>
            </ul>
          </div>
          <div v-else>
            <ul class="firstBlock">
              <li>体验课的上课流程(学习):</li>
            <li>1，老师主动添加学生联系方式。切勿迟到。</li>
            <li>2，使用体验教材，和学生做测试，了解学生基本水平。</li>
            <li>3，依据体验教材提示，推荐学生接下来使用的教材内容。</li>
            </ul>
          </div>
        </div>
          <div v-else class="course-detail" >
            <div v-if="lesson_info?.report_by_lesson?.id">
              本节课课程记录
              <p class="studenttitle">{{lesson_info?.report_by_lesson?.lesson_start_datetime_cn}} {{lesson_info?.report_by_lesson?.name_cn}} </p>
              <div>
                <!--              <div class="col gap bg-third padding-l padding-x-xl">-->
                <!--                <p>本节课内容：</p>-->
                <!--                <p>学生注意事项：</p>-->
                <!--                <p>下节课起点：</p>-->
                <!--                <p>本节课使用的教材：</p>-->
                <!--              </div>-->
                <div>
                  <p class="report-old-content" v-html="lesson_info?.report_by_lesson?.textbookcnt"></p>
                  <p class="report-old-content">{{lesson_info?.report_by_lesson?.comment}}</p>
                  <p class="report-old-content" v-html="lesson_info?.report_by_lesson?.remark"></p>
                </div>
              </div>
            </div>
            <div v-for="(report,index) in lesson_info.reports_by_student">
              <span class="ltag" v-if="report.learn_type == 0">学习</span>
              <span class="stag" v-else>会话</span>
              <p class="studenttitle">{{report.lesson_start_datetime_cn}} {{report.name_cn}} </p>
              <div>
                <!--              <div class="col gap bg-third padding-l padding-x-xl">-->
                <!--                <p>本节课内容：</p>-->
                <!--                <p>学生注意事项：</p>-->
                <!--                <p>下节课起点：</p>-->
                <!--                <p>本节课使用的教材：</p>-->
                <!--              </div>-->
                <div>
                  <p class="report-old-content" v-html="report.textbookcnt"></p>
                  <p class="report-old-content">{{report.comment}}</p>
                  <p class="report-old-content" v-html="report.remark"></p>
                </div>
              </div>
            </div>
        </div>
          </div>
      </div>

    </n-tab-pane>
  </n-tabs>

  <n-modal v-model:show="showUpload">
    <n-card
        style="width: 600px; text-align: center;"
        title="已等待12分钟"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <span class="cursorBtn" @click="closeUpload">关闭</span>
      </template>
      <div class="popDiv">
        请注意<br/>您需要在等待期间向学生发送两次视频呼叫提醒<br/>若等待时间结束，请留言告知<br/>
          <div style="text-align: left;">
            (中)今天的等待時間已過，下節课見!<br/>
            (日)今日は待機時間が過ぎたため、次回のレッスンてお会いしましょう。
          </div>
          <ul class="studentUl">
            <li><span>学生姓名</span>{{lesson_info.student_last_name}}{{lesson_info.student_first_name}}</li>
            <li><span>上课时间</span>{{props.open_show_stime}}-{{props.open_show_etime}}</li>
            <li><span>取消理由</span>包含2次呼叫和1个留言的完整截图</li>
          </ul>
          <uploader v-model="uimage"/>
      </div>
      <template #footer>
        <n-button v-if="uimage" @click="cancelUpload">取消</n-button>
        <n-button v-if="uimage" @click="submitUpload">提交</n-button>
      </template>
    </n-card>
  </n-modal>

  <n-modal v-model:show="showCancel">
    <n-card
        style="width: 600px; text-align: center;"
        title="学生临时有事取消"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <span class="cursorBtn" @click="closeUpload">关闭</span>
      </template>

        <ul class="studentUl">
          <li><span>学生姓名</span>{{lesson_info.student_last_name}}{{lesson_info.student_first_name}}</li>
          <li><span>上课时间</span>{{props.open_show_stime}}-{{props.open_show_etime}}</li>
          <li><span>取消理由</span>联系截图的上传</li>
        </ul>
          <uploader v-model="uimage"/>

      <template #footer>
        <n-button v-if="uimage" @click="cancelUpload">取消</n-button>
        <n-button v-if="uimage" @click="submitUpload">提交</n-button>
      </template>
    </n-card>
  </n-modal>

  <n-modal
      v-model:show="showImg"
      preset="card"
      style="width: 90%; max-width: 800px"
  >
    <!-- 如果是圖片 -->
    <img
        v-if="/\.(jpe?g|png|gif|webp)$/i.test(imgSrc)"
        :src="imgSrc"
        style="width: 100%; height: auto; display: block;"
    />

    <!-- 如果是 PDF -->
    <iframe
        v-else
        :src="imgSrc"
        style="width: 100%; height: 80vh; border: none;"
    />
  </n-modal>
</template>

<style scoped>
::v-deep(.n-modal) img {
  max-width: 100%;
  height: auto;
}

.uploadList{
  width: 600px;
  text-align: center;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #f4f4f4;
  vertical-align: top;
}
.uploadList p{
  font-size: 12px;
  line-height: normal;
  margin: 10px auto;
}
.uploadList h1{
  font-size: 18px;
  font-weight: bold;
}


.face-img {
  width: 96px !important;
  height: 96px !important;
  border-radius: 8px;
  margin: 0 4px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.face-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}


.webNotice{margin: 8px auto; display: block; font-size: 13px;}
.webBtn{margin: 0 auto 10px auto;}

body{
  overflow: auto !important;
}

.roomDiv{
  width: 30%; margin: auto; text-align: center;
}

::v-deep(.n-tabs-wrapper){
  width: 100%;
  background-color: white;
}

::v-deep(.n-tabs-tab-wrapper) {
  width: 50%;
}

::v-deep(.n-tabs-tab){
  width: 100%;
  background-color: #cccccc !important;
  text-align: center;
  border: 0 !important;
  padding: 4%;
  font-size: 18px !important;
}
::v-deep(.n-tabs-tab span){
  margin: auto;
}
::v-deep(.n-tabs-tab--active){
  background-color: white !important;
  font-weight: bold !important;
  color: #F86800 !important;
}
label{
  cursor: auto;
  min-width: fit-content;
}
.h1title{
  font-size: 22px; font-weight: bold; margin: 0 auto 8px auto;
  display: block;
}
.qlabel{
  font-size: 15px;
  margin: 5px 0;
  font-weight: bold;
  width: 12%;
  display: block;
  float: left;
}
::v-deep(.n-base-selection .n-base-selection-label) {
  height: auto;
  background-color: white;
  vertical-align: center !important;
}
::v-deep(.n-base-selection) {
  padding: 8px;
  background-color: #FFFFFF;
}
::v-deep(.n-base-selection__border){
  border: 1px solid #DDDDDD;
}

::v-deep(.n-input.n-input--textarea){
  height: 120px;
  font-size: 14px;
  margin: 6px 0;
}

.recordForm{
  background-color: #FFFCF5; padding: 20px 50px; width: 90%; margin: auto;
}

.qtitle{
  text-align: center; font-size: 16px; font-weight: bold;
  margin: 20px auto 6px auto; color: #F86800; display: block;
}
.form-group {
  display: flex;
  align-items: center; /* 垂直對齊 */
  gap: 8px; /* 控制標籤和選單之間的間距 */
  margin-bottom: 8px;
}
.radio-button {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 10px 20px 12px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fff;
  font-size: 14px;
  margin-right: 1%;
  display: inline-block;
  vertical-align: top; margin:0 4px;
}

.form_err_not_margin {
  padding: 3px 0 3px 18px;
  color: #ff0303;
  font-size: 12px;
  margin: 0;
  border-radius: 4px;
  width: 100%;
  display: block;
  text-align: right;
}
.old-reports-div {
  height:140px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.lesson-btn {
  display: inline-block;
  padding: 0 10px;
}
::v-deep(.disabled){
  background-color: #C5C5C5 !important;
  cursor: not-allowed !important;
}
.lesson-btn .disabled {
  background-color: #C5C5C5;
}
.report_btn {
  height: 48px;
  width: 100%;
  min-width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F2B705;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  /* margin: 12px auto; */
  cursor: pointer;
  border-radius: 8px;
}
.report_btn2 {
  height: 48px;
  width: 132px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F2B705;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  /* margin: 12px auto; */
  cursor: pointer;
  border-radius: 8px;
}
.MyTab{
  width:60%;margin:2% 20%;background-color: #FFFFFF;
}
.report_btn:active {
  background-color: #E88639; /* 设置点击时的背景色 */
}
.report-old-content {
  margin:10px 60px 10px 0;
  white-space: pre-line;
  line-height: 20px;
  font-size: 14px;
}

::v-deep(.report-old-content) a{
  text-decoration: underline !important;
}

.report_btn_msg {
  display: contents;
  margin: 0 auto;
}

.report_btn_msg > span {
  width: 200px;
  font-size: 13px;
  line-height: 1.4;
  text-align: center;
  margin: auto;
  display: block;
}

.student .font-size-l{
  font-size: 26px;
  font-weight: bold;
}
.infoBlock{
  background-color: #FFFCF5;
  padding: 10px 50px;
}
.studentrecord{
  padding: 0 40px;
  overflow: scroll;
  margin-bottom: 50px;
}
.studentrecord .course-detail{
  background-color: #FFFCF5;
  padding:10px 50px;
  border-bottom: 1px solid #EEEEEE;
  border-radius: 0;
}
.software{
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  width: fit-content;
}
.ttable{
  padding: 0;
  display: block;
  border: 1px solid #DDDDDD;
  border-bottom: 0;
}
.ttable label{
  min-width: fit-content;
  width: 200px;
  background-color: #D9D9D9;
  padding: 10px;
  display: inline-block;
}
.ttable span{
  display: inline-block;
  margin-left: 2%;
}
.red{
  color: rgb(218, 34, 55);
  font-size: 12px;
}
.redWord{
  color: red;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  background-color: #F4F4F4;
  line-height: 30px;
}
.boderm{
  border-bottom: 1px solid #DDDDDD;
}
.edit_form{
  text-align: center;
}

.studentlink{
  font-size: 17px;
  font-weight: bold;
  color: #F86800;
}
.studentarrow{
  width: 16px;
  display: inline-block;
  margin-left: 4px;
  margin-bottom: 3px;
}
.errorreport{
  background-color: #FF2727;
  font-size: 10px;
  color: #FFFFFF;
  padding: 4px 10px;
  border-radius: 16px;
  cursor: pointer;
}
.errorreport img{
  width: 6px;
  margin-bottom: 1px;
  display: inline-block;
}
.studenttitle{
  font-size: 15px;
  font-weight: bold;
}
.ltag{
  background-color: #FA8373;
  color: #FFFFFF;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 12px;
  float: left;
  font-weight: bold;
  margin-right: 8px;
  line-height: 14px;
  margin-top: 1px;
}
.stag{
  background-color: #30A186;
  color: #FFFFFF;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 12px;
  float: left;
  font-weight: bold;
  margin-right: 8px;
  line-height: 14px;
  margin-top: 1px;
}
.qfourBlock{
  display: flex; margin-bottom: 16px;
}
.firstBlock li{
  margin: 8px 0;
}
.firstBlock li:nth-child(1){
  font-weight: bold;
  font-size: 16px;
}
.centerAlign{
  text-align: center;
  vertical-align: top; margin:0 4px;
}
.centerAlign button{
  box-shadow: none;
  text-align: center;
  margin: 8px 0;
}
.popDiv{
  text-align: center;
  line-height: normal;
  position: relative;
  clear: both;
}
.studentUl{
  border: 1px solid #eeeeee;
  margin: 20px 0;
}
::v-deep(.n-card-header){
  background-color: #FAE0E0;
  color: #FFFFFF !important;
  padding: 10px;
  border-radius: 4px 4px 0 0;
}
.studentUl li{
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #eeeeee;
}
.studentUl span{
  display: block;
  width: 100px;
  position: absolute;
  background-color: #f4f4f4;
}
.cursorBtn{
  cursor: pointer;
}
.studentMsg{
  width: 80%;
  margin: 10px auto 20px auto;
  text-align: center;
  display: block;
}
::v-deep(.msgLink) a{
  text-decoration: underline !important;
}
.disable{
  background-color: darkgrey;
}
.qrcodeBlock{
  width: 200px;
  border: 1px solid #ACACAC;
  position: relative;
  margin-left: 215px;
}
.cancelMsg{
  width: 100%;
  padding: 20px;
  text-align: center;
}


@media screen and (max-width: 520px) {
  .uploadList{
    width: 100%;
  }
  .MyTab{
    width:90%;
    margin:0 auto;
  }
  .teacher-dashboard .baseinfo{
    padding: 10px;
    display: inline-block;
    height: auto;
  }
  .teacher-dashboard .baseinfo .student{
    margin-top: 10px;
  }
  .teacher-dashboard .baseinfo .studentlink{
    margin-top: 10px;
  }
  .teacher-dashboard .course-detail .dateinfo{
    font-size: 20px !important;
  }
  .font-size-l{
    font-size: 20px !important;
  }
  .studentrecord{
    padding: 0 20px;
  }

  .course-detail{
    padding: 10px 20px !important;
    margin: auto;
  }
  .report-old-content{
    margin: auto;
  }
  .recordForm{
    padding: 10px;
    width: 100%;
  }
  .qfourBlock{
    display: block;
  }
  .radio-button{
    width: 100%;
    display: block;
    min-height:auto;
    margin-bottom: 2%;
  }
  .form-group{
    display: block;
  }
  .qlabel{
    width: 100%;
  }
  .h1title{
    font-size: 20px;
    margin-top: 10px;
  }
  .teacher-dashboard{
    display: block;
  }
  .teacher-dashboard .course-detail .info{
    padding: 0;
  }
  .infoBlock{
    padding: 10px;
  }
  .ttable label{
    width: 100%;
  }
  .ttable span{
    margin-left: 0;
    padding: 10px;
  }
  .course-detail{
    margin-bottom: 20px;
  }
  .roomDiv{
    width: 64%;
  }
}

.face-img {
  display: inline-block;
  width: 96px;
  height: 96px;
}
</style>