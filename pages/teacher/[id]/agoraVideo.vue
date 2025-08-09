<template>
  <div class="agora-room-wrapper">
    <div id="headerBar">
      <!-- 右上角 Hamburger Icon（手機版顯示）-->
      <!-- 手機版選單 icon -->
      <div class="mobile-menu-icon" @click="showMobileMenu = !showMobileMenu">
        <img v-if="!showMobileMenu" src="../../../assets/images/logo_menu.png" alt="menu" />
        <img v-else src="../../../assets/images/logo_close.png" alt="close" />
      </div>
      <!-- 漢堡選單內容（手機版用）-->
      <transition name="fade">
        <div v-if="showMobileMenu" class="mobile-menu">
          <button @click="openMobileChat(); showMobileMenu = false">
            <img src="../../../assets/images/message-solid.svg"> 打开消息框
          </button>
          <button @click="enableVideo(); showMobileMenu = false">
            <img src="../../../assets/images/video_on.svg"> 打开摄像头
          </button>
          <button @click="disableVideo(); showMobileMenu = false">
            <img src="../../../assets/images/video_off.svg"> 关闭摄像头
          </button>
          <button @click="enableAudio(); showMobileMenu = false">
            <img style="transform:scale(0.9);" src="../../../assets/images/audio_on.svg"> 打开麦克风
          </button>
          <button @click="disableAudio(); showMobileMenu = false">
            <img style="transform:scale(1.6);" src="../../../assets/images/audio_off.svg"> 关闭麦克风
          </button>
          <button @click="goLesson">
            <img src="../../../assets/images/list-solid.svg"> 返回课程页</button>
          <button @click="teacherOutAgora(); showMobileMenu = false">
            <img src="../../../assets/images/arrow-right-from-bracket-solid.svg"> 离开教室
          </button>
          <button @click="showLesson">显示课程详情</button>
        </div>
      </transition>

      <div class="leftInfo">
        <img src="../../../assets/images/logo_head.png" class="logo">
        <!-- 分隔線 -->
        <div class="divider"></div>
        <div class="user-info">
          <div class="avatar-wrapper" :class="{ active: teacherState }">
            <img class="avatar" :src="timg"/>
            <div class="status-dot-text" :class="{ active: teacherState }">
              {{ teacherState ? 'ON' : 'OFF' }}
            </div>
          </div>
          <span class="user-name" :class="{ active: teacherState }">{{ uname }}</span>
        </div>
        <div class="user-info">
          <div class="avatar-wrapper" :class="{ active: studentState }">
            <img class="avatar" :src="simg"/>
            <div class="status-dot-text" :class="{ active: studentState }">
              {{ studentState ? 'ON' : 'OFF' }}
            </div>
          </div>
          <span class="user-name" :class="{ active: studentState }">{{ sname }}</span>
        </div>
        <!--        <img :class="teacherState ? 'show' : ''" :src="timg" />{{tname}}-->
        <!--        <img :class="studentState ? 'show' : ''" :src="simg" />{{uname}}-->
        <!--      <button class="my-btn" id="checkButton" :disabled="joined" @click="checkDevice">デバイスチェック</button>-->
      </div>




      <div id="count_time_leave" v-if="count_down_time2_show">{{formatTime(count_down_time2)}}</div>
      <div class="rightInfo">
        <div class="lesson-time">
          <div class="lesson-schedule">
            授業時間：{{ lesson_start_datetime_sub }} ～ {{ lesson_end_datetime_sub }}
          </div>
          <div class="lesson-clock">
            現在時刻：{{ currentTime }}
            <span class="timezone" v-if="useStore?.teacherInfo?.timezone === 'CN'">（中国時間）</span>
            <span class="timezone" v-else>（日本時間）</span>
          </div>
        </div>
        <!--      <button class="my-btn" :disabled="joined" @click="join">教室に参加</button>-->
        <button class="my-btn" @click="showLesson">
          <img style="transform: scale(0.85);" class="list" src="../../../assets/images/bookmark-regular.svg">
          显示课程详情</button>

        <button
            class="my-btn"
            @click="goLesson"
        >
          <img class="list" src="../../../assets/images/list-solid.svg">
          返回课程页
        </button>
        <button  class="btn-exit-room"  @click="teacherOutAgora">
          <img src="../../../assets/images/arrow-right-from-bracket-solid.svg" @click="teacherOutAgora" alt="退出" class="icon" />
          离开教室
        </button>

      </div>
<!--      <n-button type="primary" :disabled="joined" @click="goLesson">返回</n-button>-->
<!--      <n-button type="primary" :disabled="!joined" @click="leave">離開教室</n-button>-->
    </div>
<!--    <div v-if="joined" class="mt-10">-->
<!--      <div class="text">我</div>-->
<!--      <AgoraVideoPlayer :audioTrack="audioTrack" :videoTrack="videoTrack" :isLocal="true" :videoEnable="videoEnable" width="100px" height="100px"></AgoraVideoPlayer>-->
<!--    </div>-->
<!--    <div v-if="Object.keys(remoteUsers).length">-->
<!--      <div class="text">学生</div>-->
<!--      <AgoraVideoPlayer v-for="item in remoteUsers" :key="item.uid" :videoTrack="item.videoTrack"-->
<!--                        :audioTrack="item.audioTrack" :text="item.uid">-->
<!--      </AgoraVideoPlayer>-->
<!--    </div>-->
    <div id="mainContainer">
      <div id="leftContent">
        <div id="video-container">
          <!-- 本地视频 -->
          <div id="local-video" ref="localVideo">
          </div>
          <!-- 远程视频 -->
          <div id="remote-video"></div>
        </div>
        <div id="video-control">
          <button
              id="video-set-enabled"
              @click="enableVideo"
              :disabled="localTrackState.videoTrackEnabled"
          >
            打开摄像头
          </button>
          <button
              id="video-set-disable"
              @click="disableVideo"
              :disabled="!localTrackState.videoTrackEnabled"
          >
            关闭摄像头
          </button>
          <span style="color: #CCCCCC; margin: 0 4px;"> ｜ </span>
          <button
              id="audio-set-enabled"
              @click="enableAudio"
              :disabled="localTrackState.audioTrackEnabled"
          >
            打开麦克风
          </button>
          <button
              id="audio-set-disable"
              @click="disableAudio"
              :disabled="!localTrackState.audioTrackEnabled"
          >
            关闭麦克风
          </button>
        </div>

        <div class="mobile-mask" v-show="showMobileChat" @click="closeMobileChat"></div>

        <div id="container" :class="{ 'mobile-open': showMobileChat }">
          <button class="close-button" @click="closeMobileChat">
            <img src="../../../assets/images/logo_close_w.png" alt="关闭">
          </button>

          <div id="textDisplay" ref="textDisplay"></div>
          <div id="inputContainer">
            <input type="text" id="textInput" v-model="msg" placeholder="输入文字">
            <button id="submitButton" @click="buttonClick()">发送</button>
          </div>
        </div>

      </div>
      <div id="showTextbooks" style="width: 100%;">
        <div class="button-group">
          <button :class="{'active': activeTab === 1}" @click="toggleTab(1)">选择教材</button>
          <button :class="{'active': activeTab === 2}" @click="toggleTab(2)">教材显示</button>
          <button :class="{'active': activeTab === 3}" @click="toggleTab(3)">レッスンボード</button>
        </div>
        <!-- 顯示教材選擇區域 -->
        <div class="tab1" v-if="activeTab === 1">
          <!-- 切換教材按鈕 -->
          <div class="material-toggle" v-if="is_corporate_member === 1">
            <button
                class="toggle-btn"
                :class="currentMaterial === 'corporate' ? 'orange' : 'blue'"
                @click="toggleMaterial"
            >
              {{ currentMaterial === 'corporate' ? '一般教材に切り替え →' : '法人教材に切り替え →' }}
            </button>
          </div>

          <!-- 教材顯示 -->
          <TeacherBusinessTextbookList
              v-if="currentMaterial === 'corporate' && bid"
              :learnType="learnType"
              :bid="bid"
              :sid="sid"
              @shareLink="sendLink"
              @openLink="openLink"
          />

          <TeacherTextbookList
              v-else
              :learnType="learnType"
              :sid="sid"
              @shareLink="sendLink"
              @openLink="openLink"
          />
        </div>

        <div class="tab2" v-if="activeTab === 2">
          <iframe :src="iframeSrc"></iframe>
        </div>
        <div class="tab3" v-else-if="activeTab === 3">
          <div class="lessonHead">
            <div class="textBookT">レッスンボード</div>
            <h5>受講者と講師がファイルを共有できるエリアです。</h5>
            <div v-if="!imgSrc" class="no-file-box">
              <img src="../../../assets/images/sharenofile.png" style="width: 120px;" />
              <p>現在、共有されているファイルはありません。</p>
            </div>
            <div v-else>
              <!-- PDF -->
              <div v-if="isPdf" class="pdf-wrapper">
                <object :data="imgSrc" type="application/pdf" class="pdf-embed">
                  <!-- 瀏覽器不支援時的備援 -->
                  <a :href="imgSrc" target="_blank" rel="noopener">打开 PDF</a>
                </object>
              </div>

              <!-- 圖片 -->
              <div v-else class="img-wrapper">
                <img :src="imgSrc" alt="预览" class="preview-img" />
              </div>
            </div>
          </div>
          <div class="upload-section">
            <table class="upload-table">
              <tr>
                <td class="upload-title">
                  ▍受講者のアップロード<br>
                  <span>対応形式：JPG・PNG・PDF</span>
                </td>
                <td class="upload-cell">
                  <div class="upload-number">①</div>
            <img class="face-img" :class="{ 'clickable': simg1, 'not-clickable': !simg1 }" :src="simg1 || defaultImg" alt="" @click="previewImg(simg1)" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">②</div>
            <img class="face-img" :class="{ 'clickable': simg2, 'not-clickable': !simg2 }" :src="simg2 || defaultImg" alt="" @click="previewImg(simg2)" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">③</div>
            <img class="face-img" :class="{ 'clickable': simg3, 'not-clickable': !simg3 }" :src="simg3 || defaultImg" alt="" @click="previewImg(simg3)" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">④</div>
            <img class="face-img" :class="{ 'clickable': simg4, 'not-clickable': !simg4 }" :src="simg4 || defaultImg" alt="" @click="previewImg(simg4)" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">⑤</div>
            <img class="face-img" :class="{ 'clickable': simg5, 'not-clickable': !simg5 }" :src="simg5 || defaultImg" alt="" @click="previewImg(simg5)" />
                </td>
              </tr>
            </table>
            <table class="upload-table">
              <tr>
                <td class="upload-title">▍講師のアップロード</td>
                <td class="upload-cell">
                  <div class="upload-number">①</div>
              <UploaderLesson class="face-img" v-model="timg1" :data="{type : 'lesson',lessonId : channel,name : 'timg1',url : timg1}" @handlePreview="previewImg(timg1)" @refreshImg="refreshImg" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">②</div>
              <UploaderLesson class="face-img" v-model="timg2" :data="{type : 'lesson',lessonId : channel,name : 'timg2',url : timg2}" @handlePreview="previewImg(timg2)" @refreshImg="refreshImg" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">③</div>
              <UploaderLesson class="face-img" v-model="timg3" :data="{type : 'lesson',lessonId : channel,name : 'timg3',url : timg3}" @handlePreview="previewImg(timg3)" @refreshImg="refreshImg" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">④</div>
              <UploaderLesson class="face-img" v-model="timg4" :data="{type : 'lesson',lessonId : channel,name : 'timg4',url : timg4}" @handlePreview="previewImg(timg4)" @refreshImg="refreshImg" />
                </td>
                <td class="upload-cell">
                  <div class="upload-number">⑤</div>
              <UploaderLesson class="face-img" v-model="timg5" :data="{type : 'lesson',lessonId : channel,name : 'timg5',url : timg5}" @handlePreview="previewImg(timg5)" @refreshImg="refreshImg" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <n-modal v-model:show="showCheck">
    <n-card
        style="width: 600px; text-align: center;"
        title="Media Device Test"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <span class="cursorBtn" @click="closeCheck">关闭</span>
      </template>

      <div class="form-group">
        <label for="mic-select">麦克风</label>
        <select
            id="mic-select"
            ref="micList"
            class="form-control mic-list"
            @change="switchMicrophone($event.target.value)"
        >
          <option value="">选择麦克风</option>
        </select>
        <div class="progress mt-2 mb-2">
          <div class="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0"
               aria-valuemax="100"></div>
        </div>
      </div>

      <!-- 摄像头选择 -->
      <div class="form-group">
        <label for="cam-select">摄像头</label>
        <select
            id="cam-select"
            ref="camList"
            class="form-control cam-list"
            @change="switchCamera($event.target.value)"
        >
          <option value="">选择摄像头</option>
        </select>
        <div id="pre-local-player" class="player mt-2" style="width: 334px;height: 200px;"></div>
      </div>

    </n-card>

  </n-modal>

  <n-modal v-model:show="lesson_show" :block-scroll="false">
    <LessonReport ref="childReport" v-if="lesson_show" :lesson_id="channel" :open_show_stime="open_show_stime" :open_show_etime="open_show_etime" @cancelLesson="cancelLesson" @cancelService="cancelService" :status="1" :is_web="false" :is_wrong="false" style="z-index:1000;width:60%;margin:0 20%;" >
    </LessonReport>
  </n-modal>

  <n-modal v-model:show="showWarning">
    <n-card
        title="教室の利用時間が終了します。"
        :bordered="false"
        size="huge"
        style="width: 600px; text-align: center;"
        role="dialog"
        aria-modal="true"
    >
      <n-button
          @click="backLesson"
      >
        マイページに戻ります（{{ count_down_time2 }}）
      </n-button>
    </n-card>
  </n-modal>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue"
import {createDiscreteApi, NButton, NInput, NModal, NCard} from "naive-ui";
import {useNuxtApp} from "#app";
import {useGetTokenDataApi, useSaveTalkHistoryDataApi, useSaveTimeDataApi} from "~/apis";
import TeacherTextbookList from "~/components/TeacherTextbookList.vue";
import TeacherBusinessTextbookList from "~/components/TeacherBusinessTextbookList.vue";
import { nextTick } from 'vue';
import {useMainStore} from "~/composables/store";

const showMobileMenu = ref(false);
const isPdf = computed(() => {
  if (!imgSrc.value) return false;
  const url = imgSrc.value.split('?')[0].toLowerCase();
  return url.endsWith('.pdf') || imgSrc.value.startsWith('data:application/pdf');
});

// const props = defineProps({
//   channel: {
//     type: [String],
//     default: ''
//   },
//   uid: {
//     type: [String],
//     default: ''
//   },
// })

const nuxtApp = useNuxtApp();
const AgoraRTC = nuxtApp.$agoraRTC;
const AgoraRTM = nuxtApp.$agoraRTM;
const { $config } = useNuxtApp();

let client = null
let codec = 'h264'
const route = useRoute()
const { query } = route
let rtm;
let msg = ref('');
let textDisplay = ref();


const joined = ref(false)
const remoteUsers = ref({})
const audioTrack = ref(null)
const videoTrack = ref(null)
const appId = $config.public.agoraKey;
// const appId = 'a5dc5f4d1cb246e7bdc0aad809437775';
let token = ref('');
let channel = ref('');
// let msgChannel = ref('');
let uid = ref('');
let uname = ref('');
let linkStrTeacher = ref('');
let category_id = ref(0);
const showCheck = ref(false)
const micList = ref(null)
const camList = ref(null)
const currentMic = ref(null)
const currentCam = ref(null)
const mics = ref([])
const cams = ref([])
const volumeAnimation = ref(null)
const localTracks = ref({
  audioTrack: null,
  videoTrack: null
})
const localTrackState = ref({
  audioTrackEnabled: true,
  videoTrackEnabled: true
})
let videoEnable = ref(true);
let localVideo = ref();
let startUnixtime = ref(0);
let endUnixtime = ref(0);
let learnType = ref(0);
let sid = ref(0);
let timg = ref('');
let simg = ref('');
let sname = ref('');
let teacherState = ref(false);
let studentState = ref(false);
let count_down_time1 = ref(0);
let count_down_time2 = ref(0);
let timer1 = null;
let timer2 = null;
let timer3 = null
let count_down_time2_show = ref(false);
const useStore = useMainStore();
const defaultImg = new URL('@/assets/images/uploadnone.png', import.meta.url).href;

const { dialog } = createDiscreteApi(["dialog"]);
// 控制當前顯示的Tab
const activeTab = ref(1);  // 默認顯示教材選擇Tab
let bid = ref(0);
let lesson_show = ref(false);
let is_corporate_member = ref(false);
let open_show_stime = ref('');
let open_show_etime = ref('');
let showWarning = ref(false);
let countdownEnd1;
let countdownEnd2;
let nowTimer = null;
let currentTime = ref('');
let localTimezone = ref('');
let lesson_start_datetime_sub = ref('');
let lesson_end_datetime_sub = ref('');
let imgSrc = ref('');
let simg1 = ref('');
let simg2 = ref('');
let simg3 = ref('');
let simg4 = ref('');
let simg5 = ref('');
let timg1 = ref('');
let timg2 = ref('');
let timg3 = ref('');
let timg4 = ref('');
let timg5 = ref('');


// 切換Tab
const toggleTab = (tab) => {
  if (tab === 2 && !linkStrTeacher.value) {
    dialog.warning({
      title: '尚未选择教材。',
      content: '请从左侧选择教材后点击PDF按钮。',
      positiveText: '了解',
    });
    return; // 不進行 Tab 切換
  }
  activeTab.value = tab;
};

const currentMaterial = ref('corporate');

const toggleMaterial = () => {
  currentMaterial.value = currentMaterial.value === 'corporate' ? 'general' : 'corporate';
  publishMessage([currentMaterial.value],'FLAG');
  msg.value = '';
};


// 監聽 linkStr 的變化
watch(linkStrTeacher, (newVal, oldVal) => {
  if (newVal) {
    activeTab.value = 2;  // 當 linkStr 變化時，切換到 Tab 2
  }
});

function startTimer() {
  const now = new Date();
  currentTime.value = now.toLocaleString('default', {
    timeZone: localTimezone.value,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  nowTimer = setTimeout(startTimer, 1000);
}

function previewImg(img) {
  if (!img) return; // 沒圖就不處理
  imgSrc.value = img;
  publishMessage([img], 'IMAGE');
}


const isMobile = ref(false)

onMounted(() => {
  const ua = navigator.userAgent
  isMobile.value = /Android|iPhone|iPad|iPod/i.test(ua)
})

const iframeSrc = computed(() => {
  if (!linkStrTeacher.value) return ''
  const isPDF = linkStrTeacher.value.toLowerCase().endsWith('.pdf')
  if (isMobile.value && isPDF) {
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(linkStrTeacher.value)}`
  }
  return linkStrTeacher.value
})


const showMobileChat = ref(false);

const openMobileChat = () => {
  showMobileChat.value = true;
};
const closeMobileChat = () => {
  showMobileChat.value = false;
};



const handleUserPublished = async (user, mediaType) => {
  await client.subscribe(user, mediaType)
  if (mediaType === 'video') {
    // 播放远程视频
    const remoteVideoTrack = user.videoTrack;
    remoteVideoTrack.play('remote-video');
    // studentState.value = true;
  }

  if (mediaType === 'audio') {
    // 播放远程音频
    const remoteAudioTrack = user.audioTrack;
    remoteAudioTrack.play();
    // studentState.value = true;
  }
  delete remoteUsers.value[user.uid]
  remoteUsers.value[user.uid] = user
}

const handleUserUnpublished = (user, mediaType) => {
  if (mediaType === 'video') {
    const remoteVideoTrack = user.videoTrack;
    remoteVideoTrack?.stop(); // 停止播放
    delete remoteUsers.value[user.uid]
  }
  // studentState.value = false;
}

const handleUserJoined = (user) => {
  studentState.value = true;
};

const handleUserLeft = (user) => {
  studentState.value = false;
};

// const handleUserInfoUpdate = (uid, msg) => {
//   console.log('msg::::'+msg);
//   if (msg === "mute-video") {
//     document.getElementById("remote-video").innerHTML =
//         "";
//     console.log(`用户 ${uid} 关闭了摄像头（setEnabled(false)）`);
//     // 显示提示或处理UI（如显示"摄像头已关闭"图标）
//   } else if (msg === "unmute-video") {
//     // remoteVideoTrack.value.play('remote-video');
//     console.log(`用户 ${uid} 重新开启了摄像头（setEnabled(true)）`);
//   }
// }

const initTracks = async () => {
  if (audioTrack.value && videoTrack.value) {
    return
  }
  const tracks = await Promise.all([
    AgoraRTC.createMicrophoneAudioTrack(),
    AgoraRTC.createCameraVideoTrack()
  ])
  audioTrack.value = tracks[0];
  videoTrack.value = tracks[1];
}

const join = async () => {
  saveTime('join');
  try {
    if (!client) {
      client = AgoraRTC.createClient({
        mode: "rtc",
        codec: codec
      });
    }

    // Add event listeners to the client.
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    // client.on("user-info-updated", handleUserInfoUpdate);

    // const options = props.value.getValue();
    // const options = props.value;
    // Join a channel
    // console.log('appId:'+appId);
    // console.log('channel:'+channel.value);
    // console.log('token:'+token.value || null);
    // console.log('uid:'+uid.value || null);
    uid.value = await client.join(appId, channel.value, token.value || null, uid.value || null)
    await initTracks()
    // 播放本地视频
    if (localVideo.value) {
      videoTrack.value.play(localVideo.value);
    }

    const tracks = [audioTrack.value, videoTrack.value]
    await client.publish(tracks)
    joined.value = true;
    teacherState.value = true;

    // showJoinedMessage(options)
  } catch (error) {
    console.error(error)
    console.log(error.message)
    // const { message } = createDiscreteApi(["message"])
    // message.error('加入失败')
  }
}

const leave = async () => {
  if (audioTrack.value) {
    audioTrack.value.close()
    audioTrack.value = null
  }
  if (videoTrack.value) {
    videoTrack.value.close()
    videoTrack.value = null
  }
  remoteUsers.value = {}
  if (client) {
    await client.leave()
  }
  joined.value = false;
  localTrackState.value.audioTrackEnabled = false;
  localTrackState.value.videoTrackEnabled = false;

  teacherState.value = false;
  // const { message } = createDiscreteApi(["message"])
  // message.success("leave channel success!")
}

const saveTime = async (type) => {

  if (rtm) {
    // const result = await rtm.getHistoryMessages(
    //     channel.value,
    //     "MESSAGE", {
    //       // messageCount: 100,
    //       start: startUnixtime.value,
    //       end: endUnixtime.value
    //     });

    // const result = await rtm.history.getMessages( channel.value, "MESSAGE", {
    //   start: startUnixtime.value,
    //   end: endUnixtime.value,
    //   messageCount: 50
    // });

    const result = await rtm.history.getMessages(
        channel.value,
        "MESSAGE", {
          // messageCount: 100,
          // start: startUnixtime.value,
          // end: endUnixtime.value,
          messageCount: 100
        }
    );

    let {
      data,
      error
    } = await useSaveTimeDataApi({"channel":channel.value,"flag":"teacher","type":type, "talk": JSON.stringify(result)});
    if (data?.value && data?.value.err === false) {
      console.log("保存成功");
    }
  } else {
    let {
      data,
      error
    } = await useSaveTimeDataApi({"channel":channel.value,"flag":"teacher","type":type, "talk": ''});
    if (data?.value && data?.value.err === false) {
      console.log("保存成功");
      // const { message } = createDiscreteApi(["message"])
      // message.success("保存成功")
    }
  }

}

const profileChange = async (val) => {
  await videoTrack.value?.setEncoderConfiguration(val)
}

const codecChange = (val) => {
  codec = val
}

const publishMessage = async (message,customType="STRING") => {
  const payload = { type : "text", message: message, nickname: uname.value };
  const publishMessages = JSON.stringify(payload);
  // const publishOptions = { channelType: 'MESSAGE'}
  // const publishOptions = {
  //   channelType: "MESSAGE",
  //   customType: customType,
  //   storeInHistory:true,
  // };
  const publishOptions = { customType: customType,channelType: 'MESSAGE',storeInHistory:true,}
  try {
    const result = await rtm.publish(channel.value, publishMessages, publishOptions);
    // showMessage(uname.value, message);
    console.log(result);
  } catch (status) {
    console.log(status);
  }
}

const showMessage = (user, msg, flag) => {
  // Get text from the text box.
  // const inputText = textInput.value;
  let showMsg = '';
  if (flag === 1) {
    const publishMessages = JSON.parse(msg);
    showMsg = publishMessages.nickname + ": " + publishMessages.message;
  } else if (flag === 2) {
    const publishMessages = JSON.parse(msg);
    showMsg = publishMessages.nickname + ": " + publishMessages.message[2];
  } else {
    showMsg = user + ": " + msg;
  }
  // msg = user + ': '+msg;
  // const newText = document.createTextNode(user + ": " + msg);
  const newSpan = document.createElement("span");
  newSpan.innerHTML = showMsg;
  const newLine = document.createElement("br");
  // textDisplay.value.appendChild(newText);
  textDisplay.value.appendChild(newSpan);
  textDisplay.value.appendChild(newLine);
  // 確保 DOM 更新後再執行 scroll
  nextTick(() => {
    textDisplay.value.scrollTop = textDisplay.value.scrollHeight;
  });
}

const buttonClick = () => {
  // var input = document.getElementById("textInput");
  if (msg?.value) {
    publishMessage(msg.value);
    msg.value = '';
  }

}

const sendLink = (url1,url2, text) => {
  // var input = document.getElementById("textInput");
  publishMessage([url1,url2, text],'LINK');
  // publishMessage('<a href="#" style="color:blue;" onclick="clickLink('+msg+')">'+name+'</a>','link');
  msg.value = '';
}

const openLink = (url) => {
  linkStrTeacher.value = url;
  console.log('linkStrTeacher.value:'+linkStrTeacher.value);
}

const getHistoryMessage = async (flag='') => {
  try {
    const result = await rtm.history.getMessages(
        channel.value,
        "MESSAGE",{
          messageCount: 100,
          // start: startUnixtime.value,
          // end: endUnixtime.value
        });

    if (flag === 'save') {
      await saveHistory(result);
    } else {
      result.messageList.reverse().map(function (item) {
        if (item.customType === 'LINK') {
          showMessage('',item.message,2);
        } else if (item.customType === 'FLAG') {

        } else if (item.customType === 'IMAGE') {

        } else if (item.customType === 'REFRESH') {

        } else {
          showMessage('',item.message,1);
        }
      })
    }
  } catch (status) {
    const { operation, reason, errorCode } = status;
    console.log(`${operation} failed, the error code is ${errorCode}, due to: ${reason}.`);
  }

}
const setupRTM = async () => {
  // Initialize the RTM client.
  try {
    const rtmConfig = {
      logLevel : "debug",
      logUpload : true
    };
    rtm = new AgoraRTM.RTM(appId, uid.value,rtmConfig);
  } catch (status) {
    console.log("RTM报错");
    console.log("Error");
    console.log(status);
    // const { message } = createDiscreteApi(["message"])
    // message.error('RTM创建失败');
    return;
  }

  // Add the event listener.
  // Message event handler.
  rtm.addEventListener("message", event => {
    // console.log('event:'+JSON.stringify(event));
    if (event.customType === 'LINK') {
      const publishMessages = JSON.parse(event.message);
      // console.log('老师端消息链接');
      // console.log(publishMessages);
      if (event.publisher !== uid.value) {
        dialog.warning({
          title: '学生分享了教材，要打开查看吗？',
          positiveText: '打开',
          negativeText: '不打开',
          onPositiveClick: () => {
            linkStrTeacher.value = publishMessages.message[1];
          },
          onNegativeClick: () => {
            // 什么都不做
          },
        });
      } else {
        linkStrTeacher.value = publishMessages.message[1];
      }
      showMessage(publishMessages.nickname, '已分享教材'+publishMessages.message[2]+'，请查看', 0);
    } else if (event.customType === 'FLAG') {
      const publishMessages = JSON.parse(event.message);
      currentMaterial.value = publishMessages.message[0];
      const {message} = createDiscreteApi(["message"])
      message.success('已切换到'+(currentMaterial.value === 'corporate' ? '法人' : '个人')+'教材')
    } else if (event.customType === 'IMAGE') {
      const publishMessages = JSON.parse(event.message);
      imgSrc.value = publishMessages.message[0];
    } else if (event.customType === 'REFRESH') {
      getinfo2();
    } else {
      showMessage(event.publisher, event.message, 1);
    }
  });
  // Pressence event handler.
  rtm.addEventListener("presence", event => {
    if (event.eventType === "SNAPSHOT") {
      showMessage("INFO", "已连接",0);
    }
    else {
      // showMessage("INFO", event.publisher + " is " + event.eventType,0);
    }
  });
  // Connection state changed event handler.
  rtm.addEventListener("status", event => {
    // The current connection state.
    const currentState = event.state;
    // if (currentState === 'DISCONNECTED') {
    //   rtmLogout();
    // } else if (currentState === 'CONNECTED') {
    //   console.log('用户已登录');
    // }
    // else if (currentState === 'FAILED') {
    //   rtmLogout();
    // }
    console.log('消息报错');
    console.log(currentState);
    // The reason why the connection state changes.
    const changeReason = event.reason;
    // if (changeReason === 'SAME_UID_LOGIN') {
    // }
    console.log(changeReason);
    // showMessage("INFO", JSON.stringify(event));
  });

  if (rtm && rtm.getConnectionState === 'CONNECTED') {
    console.log('消息已连接');
    return;
  }

  // Log in the RTM server.
  try {
    const result = await rtm.login({  token: token.value });
    await getHistoryMessage();
    console.log(result);
  } catch (status) {
    console.log("loginerror::");
    console.log(status);
    // const { message } = createDiscreteApi(["message"])
    // message.error('RTM加入失败');
  }
  // Subscribe to a channel.
  try {
    const result = await rtm.subscribe(channel.value);
    console.log(result);
  } catch (status) {
    console.log(status);
  }
}

const rtmLogout = async () => {
  try{
    if (rtm) {
      const result = await rtm.logout();
      console.log('rtm登出');
      console.log(result);
    }
  } catch (status){
    console.log('rtm登出报错');
    console.log(status);
  }
}

const getinfo = async () => {
  let {
    data,
    error
  } = await useGetTokenDataApi({"channel": channel.value, "flag": "teacher" });
  // let {
  //   data,
  //   error
  // } = await useGetTokenDataApi({"channel":'322821',"uid":'1','flag':'student'});
  if (data?.value && data?.value.err === false) {
    // console.log('token:'+JSON.stringify(data.value));
    // console.log('appid:'+appId);
    // console.log('uid:'+uid.value);
    token.value = data?.value?.token ?? "";
    // token.value = '007eJxTYDhj/rG92bvHyzCk6m37nD4J9s1z5dl01/1bOyFL9pFnt4QCQ6JpSrJpmkmKYXKSkYlZqnlSSrJBYmKKhYGlibG5ubmpyvbn6Sa5LAydrL7MTAyMDCxADOIzgUlmMMkCJtkYjI2MLIwMWRkMgMAYpBiiFCoAAEwKIj0=';
    // uid.value = '00003';
    // channel.value = '322821';
    startUnixtime.value = data?.value?.start_unixtime ?? 0;
    endUnixtime.value = data?.value?.end_unixtime ?? 0;
    uid.value = '0000'+data?.value?.teacher_id ?? "";
    uname.value = data?.value?.teacher_name ?? "";
    sname.value = data?.value?.student_name ?? "";
    learnType.value = data?.value?.learn_type ?? 0;
    sid.value = data?.value?.student_id ?? 0;
    timg.value = data?.value?.teacher_img ?? "";
    simg.value = data?.value?.student_img ?? "";
    bid.value = data?.value?.business_id ?? 0;
    is_corporate_member.value = data?.value?.is_corporate_member ?? 0;
    open_show_stime.value = data?.value?.stime ?? '';
    open_show_etime.value = data?.value?.etime ?? '';
    learnType.value = 0;
    lesson_start_datetime_sub.value = data?.value?.lesson_start_datetime_sub ?? "";
    lesson_end_datetime_sub.value = data?.value?.lesson_end_datetime_sub ?? "";
    simg1.value = data?.value?.simg1 ?? "";
    simg2.value = data?.value?.simg2 ?? "";
    simg3.value = data?.value?.simg3 ?? "";
    simg4.value = data?.value?.simg4 ?? "";
    simg5.value = data?.value?.simg5 ?? "";
    timg1.value = data?.value?.timg1 ?? "";
    timg2.value = data?.value?.timg2 ?? "";
    timg3.value = data?.value?.timg3 ?? "";
    timg4.value = data?.value?.timg4 ?? "";
    timg5.value = data?.value?.timg5 ?? "";


    if (data?.value?.teacher_timezone === 'CN') {
      localTimezone.value = 'Asia/Shanghai';
    } else {
      localTimezone.value = 'Asia/Tokyo';
    }

    startTimer();

    if (token?.value) {
      count_down_time1.value = data?.value?.end_time_count ?? 0;
      count_down_time2.value = data?.value?.end_time_count2 ?? 0;

      startCountdown1();
      // await rtmLogout();

      // token.value = '007eJxTYHh00Pj+ATkuI1enMNnmQ06xgUvdGKz7WBRf/v1aYxieoa/AkGiakmyaZpJimJxkZGKWap6UkmyQmJhiYWBpYmxubm5a95Uvw+QUI8MKR2kGJgZGBhYgBvGZwCQzmGQBk2wMZqYmZsYG7AwGQGBmZgxSDlEMFwIAekojsw==';
      // channel.value = '654630';
      // uid.value = '0000663';

      await join();
      await setupRTM();
    } else {
      const { message } = createDiscreteApi(["message"])
      message.error("生成错误")
    }
  } else {
    if (data?.value?.err === true && data?.value?.flag == 1) {//课程不存在
      const { message } = createDiscreteApi(["message"])
      message.error("课程不存在")
    } else if (data?.value?.err === true && data?.value?.flag == 2) {//课程过期
      const { message } = createDiscreteApi(["message"])
      message.error("课程过期");
      //页面跳转
      return navigateTo("/teacher/centre/dashboard", { replace: true });
    }
  }
}

const getinfo2 = async () => {
  let {
    data,
    error
  } = await useGetTokenDataApi({"channel": channel.value, "flag": "teacher" });
  if (data?.value && data?.value.err === false) {
    simg1.value = data?.value?.simg1 ?? "";
    simg2.value = data?.value?.simg2 ?? "";
    simg3.value = data?.value?.simg3 ?? "";
    simg4.value = data?.value?.simg4 ?? "";
    simg5.value = data?.value?.simg5 ?? "";
    timg1.value = data?.value?.timg1 ?? "";
    timg2.value = data?.value?.timg2 ?? "";
    timg3.value = data?.value?.timg3 ?? "";
    timg4.value = data?.value?.timg4 ?? "";
    timg5.value = data?.value?.timg5 ?? "";
  }
}

const teacherOutAgora = () => {
  console.log('退出');
  dialog.warning({
    title: "确定要退出教室吗？",
    content: "退出后，只要在课程有效时间内，可以从学生预约页面重新进入教室。",
    positiveText: "是的，我要退出",
    negativeText: "不退出",
    onPositiveClick: async () => {
      await saveTime('leave');
      await leave();
      goLesson(); // 如果老师的跳转页面不一样，可以改成 goLessonTeacher()
    },
    onNegativeClick: () => {
      getHistoryMessage('save');
      // 什么都不做，留在教室
    },
  });
};


const saveHistory = async (result) => {
  let {
    data,
    error
  } = await useSaveTalkHistoryDataApi({"channel":channel.value,"talk":JSON.stringify(result)});
  if (data?.value && data?.value.err === false) {
    // const { message } = createDiscreteApi(["message"])
    // message.success("保存成功")
  }
}

const checkDevice = async () => {
  // const deviceTestModel = new bootstrap.Modal('#model-device-test')
  // deviceTestModel.show()
  showCheck.value = true;

  // document.getElementById('model-device-test').addEventListener('hidden.bs.modal', event => {
  //   cancelAnimationFrame(volumeAnimation);
  // })

  // $(".mic-list").change(function (e) {
  //   switchMicrophone(this.value);
  // })
  //
  // $(".cam-list").change(function (e) {
  //   switchCamera(this.value);
  // });

  await mediaDeviceTest();
}

// 媒体设备测试
const mediaDeviceTest = async () => {
  try {
    // 创建本地音视频轨道
    [localTracks.value.audioTrack, localTracks.value.videoTrack] = await Promise.all([
      AgoraRTC.createMicrophoneAudioTrack({ encoderConfig: "music_standard" }),
      AgoraRTC.createCameraVideoTrack()
    ])

    // 播放视频轨道
    localTracks.value.videoTrack.play("pre-local-player")

    // 开始音量动画
    volumeAnimation.value = requestAnimationFrame(setVolumeWave)

    await initDevices()
  } catch (error) {
    console.error('媒体设备测试失败:', error)
  }
}

// 初始化设备
const initDevices = async () => {
  try {
    // 获取麦克风
    mics.value = await AgoraRTC.getMicrophones();
    // console.log('麦克风列表');
    // console.log(mics.value);
    micList.value.innerHTML = ''
    mics.value.forEach(mic => {
      const value = mic.label.replace(/\s/g, '')
      const micOption = document.createElement("option")
      micOption.value = value
      micOption.textContent = mic.label
      micList.value.appendChild(micOption)
    })

    const audioTrackLabel = localTracks.value.audioTrack.getTrackLabel()
    currentMic.value = mics.value.find(item => item.label === audioTrackLabel)
    micList.value.value = audioTrackLabel.replace(/\s/g, '')

    // 获取摄像头
    cams.value = await AgoraRTC.getCameras()
    camList.value.innerHTML = ''
    cams.value.forEach(cam => {
      const value = cam.label.replace(/\s/g, '')
      const camOption = document.createElement("option")
      camOption.value = value
      camOption.textContent = cam.label
      camList.value.appendChild(camOption)
    })

    const videoTrackLabel = localTracks.value.videoTrack.getTrackLabel()
    currentCam.value = cams.value.find(item => item.label === videoTrackLabel)
    camList.value.value = videoTrackLabel.replace(/\s/g, '')
  } catch (error) {
    console.error('初始化设备失败:', error)
  }
}

// 切换摄像头
const switchCamera = async (label) => {
  try {
    currentCam.value = cams.value.find(cam => cam.label.replace(/\s/g, '') === label)
    await localTracks.value.videoTrack.setDevice(currentCam.value.deviceId)
  } catch (error) {
    console.error('切换摄像头失败:', error)
  }
}

// 切换麦克风
const switchMicrophone = async (label) => {
  try {
    currentMic.value = mics.value.find(mic => mic.label.replace(/\s/g, '') === label)
    await localTracks.value.audioTrack.setDevice(currentMic.value.deviceId)
  } catch (error) {
    console.error('切换麦克风失败:', error)
  }
}

// 设置音量波形
const setVolumeWave = () => {
  volumeAnimation.value = requestAnimationFrame(setVolumeWave)
  if (localTracks.value.audioTrack) {
    const volumeLevel = localTracks.value.audioTrack.getVolumeLevel() * 100
    document.querySelector(".progress-bar").style.width = `${volumeLevel}%`
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", volumeLevel)
  }
}

// 清理资源
const cleanup = () => {
  if (volumeAnimation.value) {
    cancelAnimationFrame(volumeAnimation.value)
  }
  if (localTracks.value.audioTrack) {
    localTracks.value.audioTrack.close()
  }
  if (localTracks.value.videoTrack) {
    localTracks.value.videoTrack.close()
  }
}
const closeCheck = () => {
  showCheck.value = false;
  cleanup()
}


// 启用/禁用媒体轨道
const setEnabled = async (type, state) => {
  try {
    if (type === "audio") {
      await audioTrack.value?.setEnabled(state)
      localTrackState.value.audioTrackEnabled = state
    } else if (type === "video") {
      await videoTrack.value?.setEnabled(state)
      localTrackState.value.videoTrackEnabled = state
    }
  } catch (err) {
    console.error('设置媒体轨道状态失败:', err)
    // 如果你使用了消息提示组件，可以这样调用：
    // message.error(err.message)
  }
}

// 启用视频
const enableVideo = async () => {
  // videoEnable.value = true;
  await setEnabled("video", true)
}

// 禁用视频
const disableVideo = async () => {
  await setEnabled("video", false)
  localVideo.value.innerHTML = '';
}

const enableAudio = async () => {
  // videoEnable.value = true;
  await setEnabled("audio", true)
}

// 禁用视频
const disableAudio = async () => {
  await setEnabled("audio", false)
}

// 模态框关闭时清理
const onModalHidden = () => {
  cleanup()
  showCheck.value = false
}

const goLesson = () => {
  dialog.warning({
    title: "确定要返回课程页吗？",
    content: "返回课程页后，如果想再次进入教室，请点击进入教室按钮。",
    positiveText: "我要返回",
    negativeText: "不返回",
    onPositiveClick: async () => {
      await saveTime('leave');
      await leave();
      await rtmLogout();
      navigateTo({ path: '/teacher/centre/dashboard' }, { replace: true });
    },
    onNegativeClick: () => {
      // 什么都不做，留在当前页面
    },
  });
}

function startCountdown1() {
  clearTimeout(timer1);
  // count_down_time1.value = 10;
  // count_down_time2.value = 120;
  countdownEnd1 = Date.now() + parseInt(count_down_time1.value)*1000;
  updateCountdown1();
}

function updateCountdown1() {
  const remaining = Math.max(0, countdownEnd1 - Date.now());

  if (remaining > 0) {
    timer1 = setTimeout(updateCountdown1, 1000);
  } else {
    count_down_time2_show.value = true;
    clearTimeout(timer1);
    startCountdown2();

    dialog.destroyAll();
    dialog.warning({
      title: '教室剩余时间：2:00',
      content:'（教室可在课程结束后5分钟内使用）',
      positiveText: '确定',
      onPositiveClick: () => {
      },
    });

    return false;
  }
}

function startCountdown2() {
  clearTimeout(timer2);
  let time2 = count_down_time2.value;
  countdownEnd2 = Date.now() + parseInt(time2)*1000;
  updateCountdown2();
}

function updateCountdown2() {
  const remaining2 = Math.max(0, countdownEnd2 - Date.now());

  if (remaining2 > 6000) {
    count_down_time2.value --;
    timer2 = setTimeout(updateCountdown2, 1000);
  } else {
    clearTimeout(timer2);
    saveTime('leave');
    startCountdown3();
    showWarning.value = true;
  }
}

// const startCountdown1 = () => {
//
//   timer1 = setInterval(() => {
//     if (count_down_time1.value > 0) {
//       count_down_time1.value--
//     } else {
//
//       count_down_time2_show.value = true;
//       clearInterval(timer1);
//       startCountdown2();
//
//       dialog.warning({
//         title: '教室剩余时间：2:00',
//         content:'（教室可在课程结束后5分钟内使用）',
//         positiveText: '确定',
//         onPositiveClick: () => {
//         },
//       });
//
//     }
//   }, 1000)
// }
//
// const startCountdown2 = () => {
//
//   timer2 = setInterval(() => {
//     if (count_down_time2.value > 6) {
//       count_down_time2.value--
//     } else {
//       clearInterval(timer2);
//       startCountdown3();
//       showWarning.value = true;
//       // dialog.warning({
//       //   title: '课堂时间结束了。',
//       //   content: '',
//       //   positiveText: `返回我的页面（${count_down_time2.value} ）`,
//       //   onPositiveClick: async () => {
//       //     await saveTime('leave');
//       //
//       //     cleanup();
//       //     await leave();
//       //     await rtmLogout();
//       //
//       //     return navigateTo({ path: '/teacher/centre/dashboard' }, { replace: true });
//       //   },
//       // });
//     }
//   }, 1000)
// }

const backLesson = async () => {
  await saveTime('leave');

  cleanup();
  await leave();
  await rtmLogout();
  showWarning.value = false;

  return navigateTo({ path: '/teacher/centre/dashboard' }, { replace: true });
}

const startCountdown3 = () => {

  let remaining3 = Math.max(0, countdownEnd2 - Date.now());
  if (remaining3 > 0) {
    count_down_time2.value --;
    if (remaining3 <= 1000) {
      saveTime('leave');
    }
    timer3 = setTimeout(startCountdown3, 1000);
  } else {
    clearTimeout(timer3);
    dialog.destroyAll();

    cleanup();
    leave();
    rtmLogout();

    navigateTo({ path: '/teacher/centre/dashboard' }, { replace: true });
  }

  // timer3 = setInterval(() => {
  //   if (count_down_time2.value > 0) {
  //     count_down_time2.value--;
  //     if (count_down_time2.value === 1) {
  //       saveTime('leave');
  //     }
  //   } else {
  //     clearInterval(timer3);
  //     dialog.destroyAll();
  //
  //     cleanup();
  //     leave();
  //     rtmLogout();
  //
  //     navigateTo({ path: '/teacher/centre/dashboard' }, { replace: true });
  //   }
  // }, 1000)
}

function formatTime(seconds) {
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':');
}

function showLesson() {
  lesson_show.value = true;
}

function cancelLesson() {
  lesson_show.value = false;
}

function cancelService() {
  lesson_show.value = false;
}

function refreshImg() {
  publishMessage([], 'REFRESH');
}


// 组件卸载时清理
onBeforeUnmount(() => {
  cleanup();
  rtmLogout();
})

onMounted(async () => {
  // window.clickLink = (url,type) => {
  //   if (type === 'student') {
  //
  //   } else {
  //     linkStrTeacher.value = url+'';
  //   }
  //   console.log('teacherlink'+url);
  //   console.log('teachertype'+(type === 'student'));
  // }

  await leave();
  await rtmLogout();
  clearTimeout(nowTimer);

  // await initTracks();
  if (query.channel) {
    channel.value = query.channel;
    // msgChannel.value = channel.value;
    // uid.value = '0000'+query.uid;
    // uname.value = query.uname ?? query.uid;
    // category_id.value = query.category_id ?? 0;
    // learnType.value = query.learn_type ?? 0;
    // sid.value = query.sid ?? 0;
    // token.value = query.token+'';
    // console.log('query.channel:'+query.channel);
    // console.log('query.uid:'+query.uid);
    await getinfo();
    // console.log('query.token:'+query.token);
    // token.value = '007eJxTYOi22VI07evBr5c1bGzucX1MF4hZw2Hy/PmKE26RDubeAt0KDImmKcmmaSYphslJRiZmqeZJKckGiYkpFgaWJsbm5uamyqX/07e8FWLYUqDIwsTAyMACxCA+E5hkBpMsYJKNwczI0tzSkp3BAAiMDY1ByiGK4UIAfFQqaQ==';
    // channel.value = '629799';
    // uid.value = '0000313';
    // await setupRTM();

    // await getInfo();
    // props.value.setValue(query)
  }
})

onUnmounted(() => {
  // if (joined.value) {
  leave();
  rtmLogout();
  clearTimeout(timer1);
  clearTimeout(timer2);
  clearTimeout(timer3);
  clearTimeout(nowTimer);
  // }
})

useEnterEvent(() => buttonClick());
</script>

<style scoped>
.img-wrapper {
  max-height: 70vh;     /* 長圖時容器限制高度 */
  overflow-y: auto;     /* 可捲動 */
  -webkit-overflow-scrolling: touch;
}

.preview-img {
  display: block;
  width: 100%;          /* ✅ 寬100% */
  height: auto;         /* ✅ 高度自動，維持比例 */
}

.pdf-wrapper {
  /* 讓 PDF 區塊置中、與其他內容留白一致（可選） */
}

.pdf-embed {
  width: 100%;
  height: 70vh;         /* 給 PDF 一個視窗高度 */
  border: none;
}


.lesson-time {
  font-size: 14px;
  color: #444;
  background-color: #fdfdfd;
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  transform: scale(0.86);
}
.lesson-schedule {
  font-weight: bold;
  margin-bottom: 4px;
}
.lesson-clock {
  color: #666;
  font-size: 13px;
}
.timezone {
  font-size: 13px;
  color: #999;
  margin-left: 4px;
}
.no-file-box{
  background: #fff;
  border: 1px solid #EEEEEE;
  margin: 20px auto;
  padding: 3% 0;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 800px;
  color: #666666;
}
.no-file-box img{ margin: auto;}
.tab3{
  height: 100%;
  background-color: #FFFFFF;
  padding: 12px 32px;
  overflow-y: scroll;
}
.preview-iframe {
  flex-grow: 1;
  width: 100%;
  margin: 20px auto;
  border: none;
  min-height: 460px !important; /* 設一個最低高度以防萬一 */
}

.lessonHead h5{
  text-align: center;
  margin: 20px auto;
  font-size: 14px;
}
.upload-section {
  margin: 32px auto;
  padding: 0 16px;
}
.upload-table {
  margin: 0 auto 10px auto;
  border-collapse: separate;
  border-spacing: 12px;
}

.upload-title {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.6;
  vertical-align: top;
  white-space: nowrap;
  text-align: left;
  width: 190px !important;
  padding-top: 16px;
}

.upload-title span {
  font-weight: normal;
  font-size: 12px;
  color: #888;
}

.upload-cell {
  width: 100px;
  text-align: center;
  vertical-align: top;
}
.upload-cell .face-img {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 6px;
  object-fit: cover;
}
.clickable {
  cursor: pointer;
}
.not-clickable {
  cursor: default; /* 或 none 也可以 */
}


.upload-number {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
  font-weight: bold;
}

.material-toggle{
  position: relative;
  z-index: 999;
}
.toggle-btn {
  border-radius: 6px;
  padding: 6px 12px 6px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  transition: all 0.2s ease-in-out;
  position: absolute;
  right: 20px;
  top: 16px;
}

/* 橘色主題 */
.toggle-btn.orange {
  background-color: #fff;
  color: #EF6D20;
  border-color: #EF6D20;
}
.toggle-btn.orange:hover {
  background-color: #EF6D20;
  color: #fff;
}

/* 藍色主題 */
.toggle-btn.blue {
  background-color: #fff;
  color: #479EEA;
  border-color: #479EEA;
}
.toggle-btn.blue:hover {
  background-color: #479EEA;
  color: #fff;
}

.arrow {
  margin-left: 8px;
  font-size: 14px;
  transition: transform 0.3s ease;
}

.status-dot-text {
  font-size: 9px;
  font-weight: bold;
  color: white;
  border-radius: 12px;
  padding: 2px 6px;
  background-color: #ccc; /* 預設灰色 */
  position: absolute;
  bottom: -8px;
  transform: scale(0.9);
}

.status-dot-text.active {
  background-color: #3AA87D; /* 綠色 */
}




/*Audio*/

#audio-set-enabled {
  font-size: 13px;
  height: 32px;
  color: #CCCCCC;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  background-image: url("../../../assets/images/audio_on_g.svg");
  background-repeat: no-repeat;
  background-position: center left;
  padding-left: 16px;
  margin-right: 4px;
  background-size: 11px;
}

#audio-set-disable {
  margin-left: 4px;
  font-size: 13px;
  height: 32px;
  color: #CCCCCC;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  background-image: url("../../../assets/images/audio_off_g.svg");
  background-repeat: no-repeat;
  padding-left: 20px;
  background-size: 23px;
  background-position: center left;
}

#audio-set-enabled:disabled {
  color: #EF6D20;
  background-image: url("../../../assets/images/audio_on.svg");
  background-size: 11px
}

#audio-set-disable:disabled {
  color: #EF6D20;
  background-image: url("../../../assets/images/audio_off.svg");
  background-size: 23px;
  background-position: center left;
}

#audio-set-enabled .icon,
#audio-set-disable .icon {
  width: 13px;
  height: 13px;
  margin-right: 6px;
  vertical-align: middle;
}

.agora-room-wrapper {
  background-color: #f5f5f5;
  height: 100vh;
  overflow-y: hidden;
}
.loading-hidden {
  visibility: hidden;
}
.agora-room-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
}

/**/

.button-group {
  display: flex;
}

.button-group button {
  padding: 10px 20px;
  background-color: #FFFFFF;
  cursor: pointer;
  flex: 1;
  text-align: center;
  border-bottom: 1px solid #EF6D20;
}

.button-group button.active {
  background-color: #EF6D20;
  color: white;
  border-color: #EF6D20;
}

/* ===== Header ===== */
#headerBar {
  height: 60px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
  font-size: 16px;
}

#headerBar .logo {
  width: 128px;
}

.leftInfo, .rightInfo {
  display: flex;
  align-items: center;
}

/* ===== Main Layout ===== */
#mainContainer {
  flex: 1;
  display: flex;
  overflow: hidden;
  height: 100vh;
}

/* ===== Left Section ===== */
#leftContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
}

/* ===== Video ===== */
#video-container {
  height: 350px;
  width: 100%;
  margin-bottom: 12px;
  position: relative;
  background-color: #ddd;
  border-radius: 8px;
  overflow: hidden;
}

#remote-video {
  width: 100%;
  height: 100%;
  background-color: #444444;
  object-fit: cover;
}

#local-video {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 140px;
  height: 100px;
  border-radius: 6px;
  z-index: 10;
  overflow: hidden;
  background: url("../../../assets/images/video_off_g.svg") center center no-repeat;
  background-size: 32px;
  background-color: #666666; /* 更淡的灰，帶透明感 */
}


/* ===== Video Control Toggle Buttons ===== */
#video-control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 12px;
}

#video-set-enabled {
  height: 32px;
  font-size: 13px;
  color: #CCCCCC;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  background-image: url("../../../assets/images/video_on_g.svg");
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 15px;
  padding-left: 20px;
  margin-right: 4px;
}
#video-set-disable {
  margin-left: 4px;
  height: 32px;
  font-size: 13px;
  color: #CCCCCC;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  background-image: url("../../../assets/images/video_off_g.svg");
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 15px;
  padding-left: 20px;
}

#video-set-enabled:disabled{
  color: #EF6D20;
  background-image: url("../../../assets/images/video_on.svg");
}
#video-set-disable:disabled{
  color: #EF6D20;
  background-image: url("../../../assets/images/video_off.svg");
}

#video-set-enabled .icon,
#video-set-disable .icon {
  width: 13px;
  height: 13px;
  margin-right: 6px;
  vertical-align: middle;
}

/* ===== Chat Area ===== */
#container {
  flex: 1;
  min-height: 0;
  background: #ffffff;
  border: 1px solid #ddd;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
}

#textDisplay {
  position: absolute;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
  padding: 16px;
  overflow-y: auto;
  line-height: 1.5;
  font-size: 14px;
  background-color: #fff;
  max-height: 100%; /* 或其他你需要的高度 */
}
#inputContainer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #f5f5f5;
  border-top: 1px solid #dcdcdc;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

#textInput {
  flex: 1;
  height: 38px;
  font-size: 14px;
  padding: 0 12px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
}

#submitButton {
  height: 38px;
  margin-left: 8px;
  padding: 0 16px;
  background-color: #EF6D20;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#submitButton:hover {
  background-color: #e56e1f;
}

/* ===== 教材區 ===== */
#showTextbooks {
  flex: 2; /* 右邊的區塊占據更多空間 */
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%; /* 確保它填滿剩餘空間 */
}

#showTextbooks .tab1 {
  padding: 12px 32px;
  background-color: #FFFFFF;
  overflow-y: auto;
  flex-grow: 1; /* 讓 tab1 填滿父容器 */
}

#showTextbooks .tab2 {
  flex-grow: 1;
  overflow: hidden;
  height: 100%; /* 確保有高度供 iframe 撐開 */
  display: flex;
}
#showTextbooks iframe {
  flex-grow: 1;
  overflow: auto; /* 讓 iframe 內部有 scroll */
  height: 100%;
  border: none;
  min-height: 0;
}

/* ===== 全域按鈕樣式 ===== */

.my-btn {
  padding: 6px 14px; /* 建議微調 padding 讓高度更自然 */
  border: none;
  color: #555555;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}

.my-btn:hover:not(:disabled) {
  background-color: #f4f4f4;
  color: #555555;
}

.my-btn .list{
  width: 13px; margin-right: 6px;
}


.btn-exit-room .icon {
  width: 13px; margin-right: 6px;
}

.btn-exit-room {
  display: inline-flex;
  align-items: center;
  background-color: white;
  color: #c0392b;
  padding: 6px 14px; /* 建議微調 padding 讓高度更自然 */
  font-size: 14px;
  transition: background-color 0.3s;
  margin-left: 8px;
  justify-content: center;
  vertical-align: middle;
  cursor: pointer;
}

.btn-exit-room:hover {
  background-color: #f4f4f4;
  border-color: #e74c3c;
  color: #e74c3c;
  cursor: pointer;
}
.user-info {
  display: flex;
  align-items: center; /* 垂直置中 */
  gap: 8px; /* 照片與名字的間距 */
  line-height: 1;
  margin-right: 10px;
}

.avatar-wrapper {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #ccc; /* 預設灰色 */
  box-sizing: border-box;
}

.avatar-wrapper.active {
  border-color: #3AA87D; /* 上線：綠色 */
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 50%; /* 確保圖片也是圓的 */
}


.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.1); /* 淡灰色遮罩 */
  pointer-events: none;
  border-radius: 28px;
}
.status-dot {
  position: absolute;
  bottom: -2px;  /* 負值讓它超出外框 */
  right: -2px;
  width: 12px;
  height: 12px;
  background-color: #ccc; /* 預設灰色 */
  border: 2px solid white;
  border-radius: 50%;
  z-index: 999;
}
.status-dot.active {
  background-color: #3AA87D; /* 綠色表示登入 */
}

.user-name {
  font-size: 16px;
  color: #555555; /* 預設灰色 */
}
.user-name.active {
  color: #333; /* 登入後變深色 */
}
.divider {
  width: 1px;
  height: 32px;
  margin: 0 16px; /* 分隔線左右間距 */
  background: linear-gradient(to bottom,
  rgba(0, 0, 0, 0),
  rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0)
  );
}
.mobile-menu-icon {
  display: none;
}

.mobile-menu {
  position: absolute;
  top: 48px; /* 根據 header 高度調整 */
  right: 10px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border-radius: 6px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.mobile-menu button {
  background: none;
  border: none;
  padding: 12px 10px;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
}
.mobile-menu img{
  width: 16px;
  margin-right: 6px;
  display: inline-block;
}

#count_time_leave {
  font-size: 14px;
  font-weight: bold;
  color: #d93025;
  background-color: #fff3f3;
  border-radius: 6px;
  padding: 4px 16px;
  display: inline-block;
  margin-right: 10px;
  margin-top: 2px;
}

#count_time_leave::before {
  content: "倒计时： ";
  font-size: 14px;
  font-weight: bold;
  color: #d93025;
}

/* 如果內容為空，整個不顯示 */
#count_time_leave:empty {
  display: none;
}


@media (max-width: 520px) {
  .img-wrapper { max-height: 65vh; }
  .pdf-embed { height: 65vh; }
  .toggle-btn {
    margin: 2% auto 4% auto;
    display: block;
    padding: 3% 10%;
    width: 90%;
    position: relative;
    right: auto;
    text-align: center;
    top: auto;
  }
  #count_time_leave {
    position: absolute;
    top: 48px; /* 與 header 高度一致 */
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    z-index: 999;
    background-color: #fff3f3;
    border-radius: 0;
    padding: 8px 12px;
    font-size: 14px;
    color: #d93025;
    font-weight: bold;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  #headerBar {
    height: 48px;
    padding: 0;
    position: relative;
  }
  #headerBar .logo{
    width: 120px;
    margin-left: 20px;
  }
  .rightInfo{
    display: none;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: green;
    z-index: 999;
  }
  .user-name{
    display: none;
  }
  #mainContainer {
    flex-direction: column;
    height: auto; /* 自動高度以支援彈性內容 */
  }
  #leftContent
  {width: 100%;
    padding: 12px;
    box-sizing: border-box;
  }
  #showTextbooks {
    height: calc(100vh - 48px - 48px); /* header 高度 + tab 高度 */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0 16px 16px 16px;
  }
  .button-group {
    display: flex;
  }
  .button-group button {
    width: 50%;
    margin-bottom: 6px;
  }

  /* 手機版遮罩 */
  .mobile-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1999;
  }

  /* ===== Chat Area ===== */
  #container.mobile-open {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 40%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 2000;
    border-radius: 0;
    padding: 16px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    justify-content: space-between;
  }

  .close-button {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
  }
  .close-button img {
    width: 40px;
    height: 40px;
  }


  #video-container{
    height: 100%;
  }
  #leftContent{
    height: 30vh;
    display: block;
  }
  .mobile-menu-icon {
    display: block;
    width: 48px;
    position: absolute;
    right: 10px;
  }
  .rightInfo {
    display: none !important;
  }
  #showTextbooks .tab1,
  #showTextbooks .tab2 {
    flex-grow: 1;
    overflow-y: auto;
  }
  #showTextbooks .tab1{
    padding: 16px;
  }
  #showTextbooks iframe {
    width: 100%;
    height: 100%;
    border: none;
    overflow: auto;
    -webkit-overflow-scrolling: touch; /* 為 iOS 啟用慣性滑動 */
  }

  .upload-table {
    width: 100%;
    display: block;
  }
  .upload-table tr {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .upload-title {
    display: block;
    width: 100% !important;
    text-align: center;
    padding-top: 8px;
    padding-bottom: 12px;
    margin-top: 60px;
  }
  .upload-cell {
    margin: 10px 10px;
  }
}
</style>
