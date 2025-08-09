<template>
  <div>
    <button @click="startCall">Start Call</button>
    <div id="video-container" style="width: 640px;height: 480px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const nuxtApp = useNuxtApp();
const agoraRTC = nuxtApp.$agoraRTC;

const startCall = async () => {
  if (!agoraRTC) return;

  const client = agoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  client.on('user-published', handleUserPublished);
  client.on('user-unpublished', handleUserUnpublished);

  try {
    await client.join('a5dc5f4d1cb246e7bdc0aad809437775', 'test', '007eJxTYJhl+vWl/onP/xNbj3rtab201fRyqnnIEpPrXil2kZbiEhcVGBJNU5JN00xSDJOTjEzMUs2TUpINEhNTLAwsTYzNzc1NeV0fpjUEMjLcNYpnZGSAQBCfhaEktbiEgQEAxNMgTA==');

    const localStream = await agoraRTC.createMicrophoneAudioTrack();
    const localStream2 = await agoraRTC.createCameraVideoTrack();
    await client.publish([localStream,localStream2]);

    const remoteContainer = document.getElementById('video-container');
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(remoteContainer);
      }
    });
  } catch (error) {
    console.error('Failed to join the channel:', error);
  }
};

const handleUserPublished = async (user, mediaType) => {
  // Handle user published
};

const handleUserUnpublished = async (user) => {
  // Handle user unpublished
};

onMounted(() => {
  startCall();
  // Ensure Agora SDK is initialized on the client side
});
</script>
