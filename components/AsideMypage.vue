<template>
  <aside class="netchina_menu">
    <div class="mypageBarArea">
      <span v-if="useStore?.studentInfo">
      <ul class="userFile">
        <div
            class="corner-ribbon-wrapper trial"
            v-if="useStore?.studentInfo?.contract_status === 'Trial' && !useStore?.studentInfo?.is_corporate_member"
        >
          <div class="corner-ribbon"><span>体験中</span></div>
        </div>
        <li class="hello">アンニョンハセヨ</li>
        <li class="userPhoto">
          <img v-if="useStore?.studentInfo?.face_image" :src="useStore?.studentInfo?.face_image" alt="" />
          <img v-else src="../assets/images/userfile.png" alt="" />
        </li>
        <li class="company" v-if="useStore?.studentInfo?.is_corporate_member">{{useStore?.studentInfo?.corporate_name}}</li>
        <li class="name">{{ useStore?.studentInfo?.last_name }}{{ useStore?.studentInfo?.first_name }}</li>
        <li class="userid">会員ID {{ useStore?.studentInfo.showId }}</li>
        <li class="userid">累積学習時間
          <span class="orangew">
          {{ useStore?.studentInfo?.learning_hour }} 時間 {{ useStore?.studentInfo?.learning_minute }} 分
          </span>
        </li>
        <li class="userid">計<span class="orangew">{{ useStore?.studentInfo?.lesson_count }} コマ</span></li>
      </ul>
        <div v-if="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id && useStore?.studentInfo?.contract_status == 'Trial'">

        </div>
        <div v-else>
          <div class="planBlock" v-if="(!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id) || useStore?.studentInfo?.status === 99">
          <ul class="planDetail">
            <li>ご利用プラン</li>
            <li>なし</li>
            <li>レッスン残数</li>
            <li><span class="numcolor">0</span>回</li>
          </ul>
          <nuxt-link v-if="useStore?.studentInfo?.is_corporate_member == 1 && useStore?.studentInfo?.corporate_member_payment_method == 0" to="/mypage/businessPlan">
            <button class="lbutton">料金プランへ</button>
          </nuxt-link>
          <nuxt-link v-else to="/mypage/mypagePlan">
            <button class="lbutton">料金プランへ</button>
          </nuxt-link>
        </div>
          <div v-else>
          <div class="planBlock" v-if="useStore?.studentInfo?.contract_status == 'Trial'">
            <div class="planTitle">
              プラン
              <div>
                <span :class="useStore?.studentInfo?.monthly_learn_type === 0 ? 'lt' : 'st'">{{ useStore?.studentInfo?.monthly_plan_name }}</span>
              </div>
            </div>
            <div class="planSTitle">レッスン残数
              <span class="planSDes">{{useStore?.studentInfo?.lesson_stock}}回</span>
            </div>
            <div class="planSTitle">
              <span v-if="useStore?.studentInfo?.use_trial_plan == 1">有効期限</span>
              <span v-else>次回更新時間</span>
              <span class="planSDes">
                {{useStore?.studentInfo?.monthly_plan_validity_period_end_day}} <span v-if="useStore?.studentInfo?.payjp_time">{{useStore?.studentInfo?.payjp_time.substr(0,5)}}</span>
              </span>
            </div>
            <nuxt-link :to="'/mypage/searchTeacher?learnType=' + useStore?.studentInfo?.monthly_learn_type" @click="closeMenu">
  <button :class="useStore?.studentInfo?.monthly_learn_type === 0 ? 'lbutton' : 'sbutton'">レッスン予約</button>
</nuxt-link>
          </div>
          <div v-else>
            <div v-if="useStore?.studentInfo?.is_corporate_member == 1 && useStore?.studentInfo?.corporate_member_payment_method == 0">
              <div class="planBlock" v-if="useStore?.studentInfo?.monthly_plan_id">
                <div class="planTitle">
                  プラン
                  <div>
                    <span class="st">
                      {{ useStore?.studentInfo?.monthly_plan_name }}
                    </span>
                  </div>
                </div>
                <div class="planSTitle">レッスン残数
                  <span class="planSDes">{{useStore?.studentInfo?.lesson_stock}}回</span>
                </div>
                <div v-if="useStore?.studentInfo?.total_compensate">
                      <div class="planSTitle">
                        <button @click="showPopup = true" class="reComa">※返却コマ
                          <img class="pcBtn" src="../assets/images/studentlink.png">
                          <img class="spBtn" src="../assets/images/studentlink_w.png">
                        </button>
                        <span class="planSDes reTotal">{{useStore.studentInfo.total_compensate}}回</span>
                        <Teleport to="body">
                        <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
                          <div class="popup">
                            <div class="refund-title">返却コマ</div>
                            <p class="refund-description">
                              予約上限を超えて予約する時に、返却コマが自動的に適用されます。
                            </p>
                            <div class="refund-details">
                              <div class="refund-summary">
                                <span>返却コマ｜合計 <span class="lightw"> {{useStore.studentInfo.total_compensate}}</span> 回</span>
                                <span class="expiry_w">有効期限</span>
                              </div>
                              <div class="refund-row">
                                <span class="count"><span class="lightw">{{useStore.studentInfo.total_compensate}}</span> 回</span>
                                <span class="expiry">{{useStore.studentInfo.monthly_plan_validity_period_end_day}}</span>
                              </div>
                              <div class="note">
                                ※レッスン残数 = 通常コマ数 + 返却コマ数
                              </div>
                            </div>
                            <button class="lbutton" @click="closePopup">了解です</button>
                          </div>
                        </div>
                        </Teleport>
                      </div>
                </div>
                <div class="planSTitle">次回更新時間
                  <span class="planSDes">
                    {{useStore?.studentInfo?.monthly_plan_validity_period_end_day}}
                  </span>
                </div>
                <nuxt-link  :to="'/mypage/searchTeacher?learnType='+useStore.studentInfo?.monthly_learn_type" @click="closeMenu">
                  <button class="sbutton">レッスン予約</button>
                </nuxt-link>
              </div>

              <div class="planBlock" v-if="useStore?.studentInfo?.ticket_plan_id">
                <div class="planTitle">チケットプラン</div>
                <div>
                  <span class="lt" v-if="useStore.studentInfo.ticket_learn_type == 0">{{ useStore.studentInfo.ticket_plan_name }}</span>
                  <span class="st" v-else>{{ useStore.studentInfo.ticket_plan_name }}</span>
                  <span class="lt" v-if="useStore.studentInfo.ticket_plan_name"></span>
                </div>
                  <div class="planSTitle">レッスン残数
                  <span class="planSDes">{{useStore.studentInfo.ticket_stock}}回</span></div>
                <!--          <div>補填レッスン<span>useStore.studentInfo.lesson_stock</span>回</div>-->
                <div class="planSTitle">有効期限
                  <span class="planSDes">{{useStore.studentInfo.ticket_plan_validity_period_end_day}}</span>
                </div>
                <nuxt-link  :to="'/mypage/searchTeacher?learnType='+useStore.studentInfo?.ticket_learn_type" @click="closeMenu">
                  <button class="sbutton">レッスン予約</button>
                </nuxt-link>
            </div>

            </div>
            <div v-else>
              <div class="planBlock" v-if="useStore?.studentInfo?.monthly_plan_id">
                <div class="planTitle">サブスクプラン</div>
                  <div>
                    <span class="lt" v-if="useStore?.studentInfo?.monthly_learn_type == 0"></span>
                    <span class="st" v-else></span>
                    <span :class="useStore?.studentInfo?.monthly_learn_type == 0 ? 'lt' : 'st'" v-if="useStore?.studentInfo?.monthly_plan_name">
                       {{ useStore?.studentInfo?.monthly_plan_name }}
                    </span>
                  </div>

                <div class="planSTitle">レッスン残数
                  <span class="planSDes">{{useStore?.studentInfo?.lesson_stock}}回</span>
                </div>
                <div v-if="useStore?.studentInfo?.total_compensate">
                      <div class="planSTitle">
                        <button @click="showPopup = true" class="reComa">※返却コマ
                          <img class="pcBtn" src="../assets/images/studentlink.png">
                          <img class="spBtn" src="../assets/images/studentlink_w.png">
                        </button>
                        <span class="planSDes reTotal">{{useStore.studentInfo.total_compensate}}回</span>
                        <Teleport to="body">
                        <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
                          <div class="popup">
                            <div class="refund-title">返却コマ</div>
                            <p class="refund-description">
                              予約上限を超えて予約する時に、返却コマが自動的に適用されます。
                            </p>
                            <div class="refund-details">
                              <div class="refund-summary">
                                <span>返却コマ｜合計 <span class="lightw"> {{useStore.studentInfo.total_compensate}}</span> 回</span>
                                <span class="expiry_w">有効期限</span>
                              </div>
                              <div class="refund-row">
                                <span class="count"><span class="lightw">{{useStore.studentInfo.monthly_plan_last_compensate_num}}</span> 回</span>
                                <span class="expiry">{{useStore.studentInfo.monthly_plan_validity_period_end_day}}</span>
                              </div>
                              <div class="refund-row">
                                <span class="count"><span class="lightw">{{useStore.studentInfo.monthly_plan_compensate_num}}</span> 回</span>
                                <span class="expiry">{{useStore.studentInfo.monthly_plan_validity_period_end_day}}<span class="plusmark">+</span>1ヶ月</span>
                              </div>
                              <div class="note">
                                ※レッスン残数 = 通常コマ数 + 返却コマ数
                              </div>
                            </div>
                            <button class="lbutton" @click="closePopup">了解です</button>
                          </div>
                        </div>
                        </Teleport>
                      </div>
                </div>
                <div class="planSTitle" v-if="useStore?.studentInfo?.payjp_cancel == 1 && useStore?.studentInfo?.contract_status == 'Regular'">
                  次回更新時間
                  <span class="planSDes">{{useStore?.studentInfo?.monthly_plan_validity_period_end_day}}
                    <span v-if="useStore?.studentInfo?.payjp_time">{{useStore?.studentInfo?.payjp_time.substr(0,5)}}</span>
                  </span>
                  <span class="planRed">*自動更新停止済み</span>
                </div>
                <div class="planSTitle" v-else>次回更新時間
                  <span class="planSDes">
                    {{useStore?.studentInfo?.monthly_plan_validity_period_end_day}}
                    <span v-if="useStore?.studentInfo?.payjp_time">{{useStore?.studentInfo?.payjp_time.substr(0,5)}}</span>
                  </span>
                </div>
                <div class="planSTitle" v-if="useStore?.studentInfo?.next_plan_name">
                  次回プラン
                  <span class="planSDes">{{useStore?.studentInfo?.next_plan_name}}</span>
                </div>
                <nuxt-link v-if="useStore?.studentInfo?.monthly_learn_type == 0" @click="closeMenu" to="/mypage/searchTeacher?learnType=0">
                  <button class="lbutton">レッスン予約</button>
                </nuxt-link>
                <nuxt-link v-else  to="/mypage/searchTeacher?learnType=1" @click="closeMenu">
                  <button class="sbutton">会話レッスン予約</button>
                </nuxt-link>
            </div>
              <div class="planBlock" v-if="useStore?.studentInfo?.ticket_plan_id">
                <div class="planTitle">チケットプラン</div>
                <div>
                  <span class="lt" v-if="useStore.studentInfo.ticket_learn_type == 0">{{ useStore.studentInfo.ticket_plan_name }}</span>
                  <span class="st" v-else>{{ useStore.studentInfo.ticket_plan_name }}</span>
                  <span class="lt" v-if="useStore.studentInfo.ticket_plan_name"></span>
                </div>
                  <div class="planSTitle">レッスン残数
                  <span class="planSDes">{{useStore.studentInfo.ticket_stock}}回</span></div>
                  <!--          <div>補填レッスン<span>useStore.studentInfo.lesson_stock</span>回</div>-->
                <div class="planSTitle">有効期限
                  <span class="planSDes">{{useStore.studentInfo.ticket_plan_validity_period_end_day}}</span>
                </div>
                <nuxt-link v-if="useStore.studentInfo.ticket_learn_type == 0" @click="closeMenu" to="/mypage/searchTeacher?learnType=0">
                  <button class="lbutton">レッスン予約</button>
                </nuxt-link>
                <nuxt-link v-else to="/mypage/searchTeacher?learnType=1" @click="closeMenu">
                  <button class="sbutton">会話レッスン予約</button>
                </nuxt-link>
            </div>
          </div>
          </div>

          <div class="planBlock" v-if="useStore?.studentInfo?.student_video_plan_enable === 1">
            <div class="planTitle">動画研修</div>
            <span class="vt">{{useStore?.studentInfo?.video_name}}</span>
            <div class="planSTitle">
              有効期限
              <span class="planSDes">{{useStore?.studentInfo?.video_end_date}}</span>
            </div>
            <div class="planSTitle">達成比率
              <span class="planSDes"><span class="blueW">{{useStore?.studentInfo?.video_complete_rate}}</span>%</span>
            </div>
            <nuxt-link to="/mypage/video" @click="closeMenu">
              <button class="vbutton">動画研修へ</button>
            </nuxt-link>
          </div>

        </div>
        </div>

      </span>
    </div>
    <ul class="mypageSideMenu">
      <li
          v-for="(menu, index) in menus"
          :key="index"
          :style="useStore?.activeUrl === menu.path ? menu.active_img : menu.img+';'+(!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id && index != 0 ? 'opacity:0.5' : '')"
          :class="{ active: useStore?.activeUrl === menu.path }"
          @click="setActive(menu.path,index)"
      >
        <NuxtLink :to="!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id && index != 0 ? '' : menu.path" class="pathBlock">{{ menu.name }}</NuxtLink>
      </li>
      <li class="bannerTrial" v-if="useStore?.studentInfo?.has_cpt_lesson !== 0 && useStore?.studentInfo?.monthly_plan_id && useStore?.studentInfo?.contract_status === 'Trial' && useStore?.studentInfo?.receive_trial_count == 1&& useStore?.studentInfo?.is_corporate_member === 0">
        <nuxt-link to="/mypage/mypageTrialPlan">
          <img v-if="useStore?.studentInfo?.monthly_learn_type === 0" src="../assets/images/learnbanner.png" alt="学習バナー">
          <img v-else src="../assets/images/speakbanner.png" alt="会話バナー">
        </nuxt-link>
      </li>
    </ul>

<!--    <ul class="mypageContact">-->
<!--      <router-link to="/mypage/faqs">-->
<!--        <li>お問い合わせ</li>-->
<!--      </router-link>-->
<!--      <router-link to="/mypage/question">-->
<!--        <li>よくある質問</li>-->
<!--      </router-link>-->
<!--    </ul>-->
  </aside>

</template>
<script setup>
import { ref} from 'vue';
import { useMainStore } from '~/composables/store';
import { NPopover } from 'naive-ui'

const showPopup = ref(false); // 控制彈窗顯示
function closePopup() {
  showPopup.value = false;
}

const props = defineProps({
  menus: {
    type: [Object, Array],
    default: () => []
  }
});

const useStore = useMainStore();
const emit = defineEmits(['changeSpMenu'])

function setActive(path,index) {
  if (!useStore?.studentInfo?.monthly_plan_id && !useStore?.studentInfo?.ticket_plan_id && index != 0) {

  } else {
    emit('changeSpMenu');
    useStore.setActiveUrl(path);
  }

}
function closeMenu() {
  emit('changeSpMenu');
}
</script>
<style>

.pathBlock{
  width: 210px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  display: block;
}
.smallW{
  font-size: 10px !important;
  line-height: 12px;
}


.mypageSideMenu li {
  width: 210px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  margin-bottom: 10px; /* Adjust as needed */
  line-height: 48px;
  cursor: pointer;
  background-size: 24px;
  background-position: 16px 12px;
  padding-left: 54px;
  background-repeat: no-repeat;
  font-weight: normal;
  color: #333333;
}
/* Default state background images */
//.mypageSideMenu li:nth-child(1) {background-image: url('../assets/images/icon_top.png');}
//.mypageSideMenu li:nth-child(2) {background-image: url('../assets/images/icon_reservation.png');}
//.mypageSideMenu li:nth-child(3) {background-image: url('../assets/images/icon_plan.png');}
//.mypageSideMenu li:nth-child(2) {background-image: url('../assets/images/icon_reservation.png');}
//
///* Active state background images */
//.mypageSideMenu li:nth-child(1).active {
//  background-image: url('../assets/images/icon_top_active.png');
//  background-color: #FFFFFF;
//  border-radius: 8px;
//  color:#E4670C;
//}
//.mypageSideMenu li:nth-child(2).active {background-image: url('../assets/images/icon_reservation_active.png');
//  background-color: #FFFFFF;
//  border-radius: 8px;
//  color:#E4670C;
//}
//.mypageSideMenu li:nth-child(3).active {background-image: url('../assets/images/icon_plan_active.png');
//  background-color: #FFFFFF;
//  border-radius: 8px;
//  color:#E4670C;
//}
.mypageSideMenu li:not(.bannerTrial):not(.active):hover {
  font-weight: bold;
  background-color: #FFFFFF;
  border-radius: 8px;
}

.mypageSideMenu li.active {
  background-color: #FFFFFF;
  border-radius: 8px;
  color:#000000;
  font-weight: bold;
}

.mypageContact li {
  width: 210px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  margin-bottom: 10px; /* Adjust as needed */
  line-height: 48px;
  cursor: pointer;
  background-size: 24px;
  background-position: 16px 12px;
  padding-left: 54px;
  background-repeat: no-repeat;
  font-weight: normal;
  color: #000000;
}

.mypageContact li.active {
  background-color: #FFFFFF;
  border-radius: 8px;
  color:#E4670C;
}

.userFile{padding: 24px 24px 12px 24px; text-align: center; background-color: white; border-radius: 8px 8px 0 0; border-bottom: 1px solid #EEEEEE; margin-top: 32px;}
.userFile .hello{font-size: 11px; color: #848484; margin-bottom: 10px; text-align: center;}
.userFile .userPhoto img{margin: auto; width: 70px; height: 70px; object-fit: cover; border-radius: 100px;}
.userFile .company{font-size: 15px; font-weight: bold; margin: 10px 0 0 0;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.userFile .name{font-size: 24px; font-weight: bold; margin-top: 4px;
  white-space: normal; /* 允許換行 */
  word-wrap: break-word; /* 遇到長單詞換行 */
  overflow-wrap: break-word; /* 確保長單詞換行 */
  }
.userFile .userid{color: #ACACAC; font-size: 11px; margin-top: 6px; font-weight: bold;}
.userFile .orangew{color: #333333; margin-left: 6px;}

.lightw{color: var(--pink-dark);}

.planBlock{
  background-color: #F9F9F9;
  padding: 12px 24px 12px 24px; text-align: left;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.mypageSideMenu{
  margin-top: 16px;
}

.planTitle{font-size: 11px; color: #848484; margin-bottom: 4px; font-weight: bold;}
.lt{color: var(--green-darker); font-size: 15px; font-weight: bold; display: block; margin: 2px 0;}
.st{color: var(--green-dark); font-size: 15px; font-weight: bold; display: block; margin: 2px 0;}
.vt{color: #2E6190; font-size: 15px; font-weight: bold; display: block; margin: 2px 0;}

.lbutton {
  background-color: var(--green-darker);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.lbutton:hover {
  background-color: var(--green-dark);
}

.sbutton {
  background-color: var(--green-dark);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.sbutton:hover {
  background-color: #279277;
}

.vbutton{
  background-color:#2E6190;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  width: 100%;
  text-align: center;
  border-radius: 8px;
}

.planDetail {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px; /* 調整列與列之間的距離 */
  font-size: 11px;
  color: #6F6F6F;
  margin-bottom: 6px;
}

.planDetail li:nth-child(odd) {
  text-align: left;
  font-weight: bold;
}

.planDetail li:nth-child(even) {
  text-align: right;
}

.planDetail .numcolor{
  color: orange;
  margin-right: 5px;
  font-weight: bold;
}

.planSTitle{
  font-size: 10px;
  margin:4px 0;
  color: #6F6F6F;
  font-weight: bold;
}

.planSDes{
  display: block; float: right;
  font-size: 10px;
}
//.v-binder-follower-content{
//  width: 200px;
//  line-height: 20px;
//  padding: 21px 10px;
//  margin-top: 26px;
//  margin-left: -16px;
//}
.pluslesson{
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
}
.pluslesson span{
  color: darkred;
  font-weight: bold;
  margin-left: 3px;
}
.blueW{
  color: #2E6190;
}
.planRed{
  color:red;
  text-align: right;
  display: block;
  font-size: 9px;
  margin-top: 2px;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 40px 60px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 540px;
}
.reComa{
  color:var(--pink-dark);
  font-weight: bold;
  font-size: 10px;
  margin: 0 0 0  8px;
}

.refund-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #424242;
}

.refund-description {
  font-size: 15px;
  line-height: normal;
  font-weight: normal;
  color: #424242;
  margin: 20px;
}

.refund-details {
  text-align: left;
  font-size: 15px;
  color: #333;
  margin-bottom: 20px;
}

.refund-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
}

.refund-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.count {
  color: #333;
}

.count.orange {
  color: #E4670C;
}

.expiry {
  color: #A94442;
  font-weight: bold;
}
.expiry_w {
  color: #6F6F6F;
}
.note {
  font-size: 13px;
  color: #6F6F6F;
  margin-top: 20px;
}
.pcBtn{
    width: 10px;
    display: inline-block;
    margin:0 0 1px -2px;
}
.spBtn{
  display: none;
}
.reTotal{margin-top: 1px;}
.plusmark{
  color: #424242;
  font-weight: bold;
  font-size: 13px;
  margin: 0 2px;
}

@media screen and (max-width: 520px) {
  .pcBtn{
    display: none;
  }
  .spBtn{
    width: 10px;
    display: inline-block;
    margin:0 0 1px 1px;
  }
  .mypageBarArea{
    width: 210px;
  }
  .popup{
    width: 90%;
    padding: 10%;
    transform: scale(0.92);
    margin: auto;
    z-index: 99999;
  }
  .reComa{
    font-weight: bold;
    font-size: 10px;
    background-color: #E4670C;
    color: #FFFFFF;
    margin: auto;
    padding: 6px 10px;
    border-radius: 24px;
  }
  .reTotal{margin-top: 6px;}
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
  }
}

</style>
<style scoped>
.userFile{
  position: relative;
}
.bannerTrial {
  padding-left: 0 !important;
  margin: 20px auto !important;
  padding-bottom: 30px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bannerTrial:hover {
  transform: translateY(-5px); /* 往上移動 5px */
}

.bannerTrial img{
  margin: auto;
  width: 80%;
  padding-bottom: 30px !important;
}
</style>