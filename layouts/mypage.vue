<template>
    <div class="body hbg">
        <NavBarMypage v-if="!isAgoraVideo"/>
        <img v-if="spMenuShow && !isAgoraVideo" src="../assets/images/logo_close_w.png" class="spMenu_icon" @click="changeSpMenu"/>
        <img v-else-if="!isAgoraVideo"  src="../assets/images/logo_menu_w.png" class="spMenu_icon" @click="changeSpMenu"/>
        <AsideMypage v-show="spMenuShow && !isAgoraVideo" @changeSpMenu="changeSpMenu" :menus="menus"/>

        <main v-if="info" class="netchina_ui">
          <AsideMypage v-if="!isAgoraVideo" :menus="menus" class="pcMenu"/>
          <section class="netchina_main">

            <div class="netchina_contents">
              <BlogMarquee v-if="showBlogMarquee && topBlogs.length" :items="topBlogs" />
              <ul
                  :class="useStore.studentInfo.lesson.learn_type === 0 ? 'learnbg' : 'speakbg'"
                  v-if="useStore?.studentInfo?.lesson?.lesson_time && !isAgoraVideo"
                  class="head_navi swiper-slide">
                <li>次回レッスン<br><span class="fs18 Bit">{{ useStore.studentInfo.lesson.lesson_time }}</span></li>
                <li>講師<br><span class="fs18 Bit">{{ useStore.studentInfo.lesson.name_kanji }} {{ useStore.studentInfo.lesson.name_pinyin }}</span></li>
                <li>レッスン種類<br><span class="fs18 Bit">{{ useStore.studentInfo.lesson.learn_type === 0 ? '総合' : '会話' }}</span></li>
              </ul>


              <!--              <swiper-container v-if="planShow" navigation="true">-->
<!--                <swiper-slide v-if="useStore?.studentInfo?.lesson" class="member_slide">-->
<!--                  -->
<!--                </swiper-slide>-->
<!--                <swiper-slide v-if="useStore?.studentInfo?.ticket_plan_id" class="member_slide">-->
<!--                  <ul class="head_navi swiper-slide">-->
<!--                    <li>単発プラン<br><span class="fs18 Bit">{{useStore?.studentInfo?.ticket_plan_name}}</span></li>-->
<!--                    <li>有効期限<br><span class="fs18 Bit">{{useStore?.studentInfo?.ticket_plan_validity_period_end_day}}</span></li>-->
<!--                    <li v-if="useStore?.studentInfo?.ticket_plan_type == 1">ポイント残高<br><span class="fs18 Bit">{{useStore?.studentInfo?.ticket_integral_stock}}</span></li>-->
<!--                    <li v-else>レッスン残数<br><span class="fs18 Bit">{{useStore?.studentInfo?.ticket_stock}}</span></li>-->
<!--                  </ul>-->
<!--                </swiper-slide>-->
<!--              </swiper-container>-->
              <slot/>
            </div>
          </section>

        </main>
        <PageFooter v-if="!isAgoraVideo"/>
    </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useMainStore } from "../composables/store"
import { useStudentInfoDataApi } from "../apis/student"
import { useStudentIndexDataApi } from "~/apis/student"
import BlogMarquee from '@/components/BlogMarquee.vue'

// icons
import iconTop from "../assets/images/icon_top.png"
import iconTopActive from "../assets/images/icon_top_active.png"
import iconPlan from "../assets/images/icon_plan.png"
import iconPlanActive from "../assets/images/icon_plan_active.png"
import iconPanda from "../assets/images/icon_panda.png"
import iconPandaActive from "../assets/images/icon_panda_active.png"
import iconReservation from "../assets/images/icon_reservation.png"
import iconReservationActive from "../assets/images/icon_reservation_active.png"
import iconRoadmap from "../assets/images/icon_roadmap.png"
import iconRoadmapActive from "../assets/images/icon_roadmap_active.png"
import iconTextbook from "../assets/images/icon_textbook.png"
import iconTextbookActive from "../assets/images/icon_textbook_active.png"
import iconReserveInfo from "../assets/images/icon_reserveInfo.png"
import iconReserveInfoActive from "../assets/images/icon_reserveInfo_active.png"
import iconVideo from "../assets/images/icon_video.png"
import iconVideoActive from "../assets/images/icon_video_active.png"
import iconService from "../assets/images/icon_service.png"
import iconServiceActive from "../assets/images/icon_service_active.png"
import iconOpenCode from "../assets/images/icon_openCode.png"
import iconOpenCodeActive from "../assets/images/icon_openCode_activve.png"
import iconVideoCategorys from "../assets/images/icon_videoCategorys.png"
import iconVideoCategorysActive from "../assets/images/icon_videoCategorys_active.png"
import iconMessage from "../assets/images/icon_message.png"
import iconMessageActive from "../assets/images/icon_message_active.png"
import iconMark from "../assets/images/icon_mark.png"
import iconMarkActive from "../assets/images/icon_mark_active.png"

const useStore = useMainStore()
const route = useRoute()
const router = useRouter()
const navigateTo = router.push

const topBlogs = ref([])
const info = ref([])
const spMenuShow = ref(false)
const show = ref(false)
const planShow = ref(false)
const menus = reactive([])

const showBlogMarquee = ref(false)
onMounted(() => {
  // 頁面初次載入也需要跑一次
  showBlogMarquee.value = ['/mypage/mypageReserved'].includes(router.currentRoute.value.path)

  router.afterEach((to) => {
    showBlogMarquee.value = ['/mypage/mypageReserved'].includes(to.path)
  })
})

// 抓 top blogs
const getTopBlogs = async () => {
  try {
    const { data: lists } = await useHomeTeacherListDataApi()
    if (lists?.value?.topbloglist) {
      topBlogs.value = lists.value.topbloglist
    }
  } catch (error) {
    console.error('取得 topBlogs 發生錯誤：', error)
  }
}
const isAgoraVideo = computed(() => {
  return route.fullPath.includes('agoraVideo')
})

onMounted(async () => {
  const { data } = await useStudentInfoDataApi()
  if (data?.value) {
    info.value = data.value
    useStore.setStudentInfo(data.value)

    // 動態建構選單
    const student = useStore.studentInfo

    if (!student?.monthly_plan_id && student?.contract_status === 'Trial' && student?.is_corporate_member === 0) {
      menus.push({ name: 'TOP', path: '/mypage/mypage', img: `background-image: url(${iconTop})`, active_img: `background-image: url(${iconTopActive})` })
    } else {
      menus.push({ name: 'TOP', path: '/mypage/mypageReserved', img: `background-image: url(${iconTop})`, active_img: `background-image: url(${iconTopActive})` })
    }

    if (student?.is_corporate_member === 1) {
      menus.push({ name: '料金プラン', path: '/mypage/businessPlan', img: `background-image: url(${iconPlan})`, active_img: `background-image: url(${iconPlanActive})` })
    } else {
      menus.push({ name: '料金プラン', path: '/mypage/mypagePlan', img: `background-image: url(${iconPlan})`, active_img: `background-image: url(${iconPlanActive})` })
    }

    if (student?.is_corporate_member === 1) {
      if (student?.business_is_routemap === 1) {
        menus.push({ name: 'MYカリキュラム', path: '/mypage/roadmap', img: `background-image: url(${iconRoadmap})`, active_img: `background-image: url(${iconRoadmapActive})` })
      } else if (student?.corporate_member_payment_method == 0) {
        menus.push({ name: 'BizCHINA法人教材', path: '/mypage/textbookBusiness', img: `background-image: url(${iconTextbook})`, active_img: `background-image: url(${iconTextbookActive})` })
      }

      if (student?.business_is_auto_reserve === 1) {
        menus.push({ name: '自動予約', path: '/mypage/reserveInfo', img: `background-image: url(${iconReserveInfo})`, active_img: `background-image: url(${iconReserveInfoActive})` })
      }

      if (student?.student_video_plan_enable === 1) {
        menus.push({ name: '動画研修', path: '/mypage/video', img: `background-image: url(${iconVideo})`, active_img: `background-image: url(${iconVideoActive})` })
      }

      menus.push({ name: 'カウンセリング', path: '/mypage/service', img: `background-image: url(${iconService})`, active_img: `background-image: url(${iconServiceActive})` })

      if (student?.isOld === 1) {
        menus.push({ name: 'NetCHINA法人66段教材', path: '/mypage/textbookBusinessOld', img: `background-image: url(${iconTextbook})`, active_img: `background-image: url(${iconTextbookActive})` })
      }
    } else {
      if (student?.learn_type === 3) {

      } else {
        menus.push({ name: '教材一覧', path: '/mypage/textbook', img: `background-image: url(${iconTextbook})`, active_img: `background-image: url(${iconTextbookActive})` })
      }
    }

    if (student?.isOld === 1) {
      menus.push({ name: 'NetCHINA教材一覧', path: '/mypage/textbookNc', img: `background-image: url(${iconTextbook})`, active_img: `background-image: url(${iconTextbookActive})` })
    }

    if ((student?.open_plan_code === 1 && student?.is_corporate_member === 0) || student?.status === 99) {
      menus.push({ name: '特別受講プラン', path: '/mypage/openCode', img: `background-image: url(${iconOpenCode})`, active_img: `background-image: url(${iconOpenCodeActive})` })
    }

    if (student?.videos_payments_id) {
      menus.push({ name: '動画視聴', path: '/mypage/videoCategorys', img: `background-image: url(${iconVideoCategorys})`, active_img: `background-image: url(${iconVideoCategorysActive})` })
    }

    if (student?.monthly_plan_id || student?.contract_status !== 'Trial' || student?.is_corporate_member !== 0) {
      menus.push({ name: 'お問い合わせ', path: '/mypage/question', img: `background-image: url(${iconMessage})`, active_img: `background-image: url(${iconMessageActive})` })
      menus.push({ name: 'よくある質問', path: '/mypage/faqs', img: `background-image: url(${iconMark})`, active_img: `background-image: url(${iconMarkActive})` })
    }

    planShow.value = true
  }
})

// 顯示 spMenu
function changeSpMenu() {
  spMenuShow.value = !spMenuShow.value
}

// 抓 top blogs
onMounted(() => {
  getTopBlogs()
})
</script>


<style scoped>
swiper-container::part(button-next){
  color: rgba(255, 255, 255, 0);
  background-image: url("../assets/images/sw_next.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 0 10px;
}
swiper-container::part(button-prev) {
  color: rgba(255, 255, 255, 0);
  background-image: url("../assets/images/sw_prev.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: 9px 10px;
}
.body{
  background-color: var(--bg--light);
}
.fs18{
  color: navajowhite !important;
}
.learnbg{background-color: var(--green-dark);}
.speakbg{background-color: #30A186;}

.netchina_contents .head_navi li{
  color: #FFFFFF;
}
</style>