<template>
  <div class="padding-20">
    <div class="btn-wrapper mt-10">
      <n-button type="primary" :disabled="joined" @click="join">Join</n-button>
      <n-button type="primary" :disabled="!joined" @click="leave">Leave</n-button>
    </div>
    <div v-if="joined" class="mt-10">
      <div class="text">Local User</div>
      <AgoraVideoPlayer :audioTrack="audioTrack" :videoTrack="videoTrack" :isLocal="true"></AgoraVideoPlayer>
    </div>

    <div v-if="Object.keys(remoteUsers).length">
      <div class="text">Remote Users</div>
      <AgoraVideoPlayer v-for="item in remoteUsers" :key="item.uid" :videoTrack="item.videoTrack"
                        :audioTrack="item.audioTrack" :text="item.uid">
      </AgoraVideoPlayer>
    </div>
  </div>
  <div id="container">
    <h1>Hello RTM !</h1>
    <div>
      <div id="textDisplay" ref="textDisplay"></div>
    </div>
    <div id="inputContainer">
      <input type="text" id="textInput" v-model="msg" placeholder="Enter text">
      <button id="submitButton" @click="buttonClick()"> Send </button>
    </div>
  </div>
</template>

<script setup>
// import AgoraRTC from "agora-rtc-sdk-ng"

import { onMounted, onUnmounted, ref } from "vue"
import {createDiscreteApi,NButton,NInput} from "naive-ui";
import {useNuxtApp} from "#app";
import {useGetVideoTokenDataApi} from "~/apis";
import {useRegApi} from "~/apis/user";

const props = defineProps({
  channel: {
    type: [String],
    default: ''
  },
  uid: {
    type: [String],
    default: ''
  },
})

const nuxtApp = useNuxtApp();
const AgoraRTC = nuxtApp.$agoraRTC;
const AgoraRTM = nuxtApp.$agoraRTM;

let client = null
let codec = 'vp8'
const route = useRoute()
const { query } = route
let rtm;
let msg = ref('');
let textDisplay = ref();


const joined = ref(false)
const remoteUsers = ref({})
const audioTrack = ref(null)
const videoTrack = ref(null)
const appId = process.env.AGORA_KEY;
let token = ref('');

// const formRef = reactive({
//   appId: "a5dc5f4d1cb246e7bdc0aad809437775",
//   token: "",
//   channel: "test",
//   uid: "1"
// })

const getInfo = async () => {
  let {
    data,
    error
  } = await useGetVideoTokenDataApi();
  if (data?.value) {
    // console.log('data111:'+JSON.stringify(data.value));
    token.value = data?.value?.token ?? "";
    if (token?.value) {
      await setupRTM();
    } else {
      const { message } = createDiscreteApi(["message"])
      message.error("生成错误")
    }
  } else {
    const { message } = createDiscreteApi(["message"])
    message.error("生成错误")
  }

}

const handleUserPublished = async (user, mediaType) => {
  await client.subscribe(user, mediaType)
  delete remoteUsers.value[user.uid]
  remoteUsers.value[user.uid] = user
}

const handleUserUnpublished = (user, mediaType) => {
  if (mediaType == 'video') {
    delete remoteUsers.value[user.uid]
  }
}

const join = async () => {
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

    // const options = props.value.getValue();
    // const options = props.value;
    // Join a channel
    // console.log('appId:'+appId);
    // console.log('channel:'+props.channel);
    // console.log('token:'+props.token || null);
    // console.log('uid:'+props.uid || null);
    props.uid = await client.join(appId, props.channel, props.token || null, props.uid || null)
    await initTracks()
    const tracks = [audioTrack.value, videoTrack.value]
    await client.publish(tracks)
    // showJoinedMessage(options)
    joined.value = true
  } catch (error) {
    console.error(error)
    const { message } = createDiscreteApi(["message"])
    message.error(error.message)
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
  await client.leave()
  joined.value = false;
  const { message } = createDiscreteApi(["message"])
  message.error("leave channel success!")
}


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


const profileChange = async (val) => {
  await videoTrack.value?.setEncoderConfiguration(val)
}

const codecChange = (val) => {
  codec = val
}

const publishMessage = async (message) => {
  const payload = { type: "text", message: message };
  const publishMessage = JSON.stringify(payload);
  const publishOptions = { channelType: 'MESSAGE'}
  try {
    const result = await rtm.publish(props.channel, message, publishOptions);
    // showMessage(props.uid, message);
    console.log(result);
  } catch (status) {
    console.log(status);
  }
}
const showMessage = (user, msg) => {
  // Get text from the text box.
  // const inputText = textInput.value;
  const newText = document.createTextNode(user + ": " + msg);
  const newLine = document.createElement("br");
  textDisplay.value.appendChild(newText);
  textDisplay.value.appendChild(newLine);
}

const buttonClick = () => {
  // var input = document.getElementById("textInput");
  publishMessage(msg.value);
  msg.value = '';
}
const setupRTM = async () => {
  // Initialize the RTM client.
  try {
    rtm = new AgoraRTM.RTM(appId, props.uid);
  } catch (status) {
    console.log("Error");
    console.log(status);
  }
  // Add the event listener.
  // Message event handler.
  rtm.addEventListener("message", event => {
    showMessage(event.publisher, event.message);
  });
  // Pressence event handler.
  rtm.addEventListener("presence", event => {
    if (event.eventType === "SNAPSHOT") {
      showMessage("INFO", "I Join");
    }
    else {
      showMessage("INFO", event.publisher + " is " + event.eventType);
    }
  });
  // Connection state changed event handler.
  rtm.addEventListener("status", event => {
    // The current connection state.
    const currentState = event.state;
    // The reason why the connection state changes.
    const changeReason = event.reason;
    showMessage("INFO", JSON.stringify(event));
  });
  // Log in the RTM server.
  try {
    const result = await rtm.login({  token: props.token });
    console.log(result);
  } catch (status) {
    console.log("loginerror::");
    console.log(status);
  }
  // Subscribe to a channel.
  try {
    const result = await rtm.subscribe(props.channel);
    console.log(result);
  } catch (status) {
    console.log(status);
  }
}

onMounted(async () => {
  await getInfo();
  await initTracks();
  if (query.appId && query.channel) {
    // props.value.setValue(query)
    join()
  }
})

onUnmounted(() => {
  if (joined.value) {
    leave()
  }
})


</script>

<style>
#container {
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}
#textDisplay {
  width: 100%;
  height: 800px;
  border: 1px solid #b0b0b0;
  margin-bottom: 20px;
  overflow: auto;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
}
#inputContainer {
  display: flex;
  align-items: center;
}
#textInput {
  width: calc(100% - 100px);
  padding: 5px;
  margin-right: 10px;
}
#submitButton {
  width: 90px;
  padding: 5px;
}
</style>