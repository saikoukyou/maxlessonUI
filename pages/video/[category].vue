<template>
  <div class="planbg">
    <section class="PlanPrice">
      <div class="PlanPrice__inner">
      <div class="subPosition">
        <span class="subTitle">動画一覧</span>
      </div>
      </div>
    </section>
  </div>

  <div class="video-category">
    <div class="main">
      <iframe
          class="player"
          :src="currentVideo.youtubeUrl"
          frameborder="0"
          allowfullscreen
      ></iframe>
      <h2 class="title">{{ currentVideo.title }}</h2>
      <p class="desc">{{ currentVideo.description }}</p>
      <p class="desc">
        <a href="#" class="link">講師プロフィール・予約はこちら</a>
      </p>
    </div>

    <aside class="playlist">
      <h3>{{ categoryTitle }}</h3>
      <ul>
        <li
            v-for="video in videoList"
            :key="video.id"
            :class="{ active: video.id === currentVideo.id }"
            @click="selectVideo(video)"
        >
          <img :src="getThumbnail(video.youtubeUrl)" />
          <div class="info">
            <p class="v-title">{{ video.title }}</p>
            <p class="v-time">{{ video.duration }}</p>
          </div>
        </li>
      </ul>
    </aside>
  </div>

  <div class="backBtn"><a href="/video">動画一覧に戻る</a></div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const { videoCategories } = useVideoData()

const categoryKey = route.params.category
const categoryData = videoCategories[categoryKey] || {title: '', videos: []}

const categoryTitle = categoryData.title
const videoList = categoryData.videos
const currentVideo = ref(videoList[0])

onMounted(() => {
  const videoId = route.query.videoId
  const found = videoList.find(v => v.id === videoId)
  if (found) currentVideo.value = found
})

function selectVideo(video) {
  currentVideo.value = video
  router.replace({query: {videoId: video.id}})
}

const getThumbnail = (url) => {
  const match = url.match(/embed\/([^?&]+)/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : ''
}
</script>

<style scoped>
.desc a {
  color: #FA8373; /* 基本藍色 */
  text-decoration: underline;
  transition: color 0.3s;
  margin-top: 8px;
  display: block;
  font-weight: bold;
}

.desc a:hover {
  color: #FA8373;
}


p{
  line-height: normal;
}
.video-category {
  display: flex;
  gap: 10px;
  max-width: 1130px;
  margin: 0 auto;
  padding: 40px 20px;
}

.main {
  flex: 3;
}

.player {
  width: 100%;
  height: 420px;
  margin-bottom: 12px;
}

.title {
  font-size: 20px;
  margin-bottom: 4px;
}

.desc {
  font-size: 14px;
  color: #666;
}

.playlist {
  flex: 1.2;
  max-height: 640px;
  overflow-y: auto;
}

.playlist h3 {
  font-size: 16px;
  margin-bottom: 12px;
}

.playlist ul {
  list-style: none;
  padding: 0;
}

.playlist li {
  display: flex;
  gap: 10px;
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.playlist li.active {
  background: #f0f8ff;
}

.playlist img {
  width: 120px;
  height: 70px;
  object-fit: cover;
}

.info {
  flex: 1;
}

.v-title {
  font-size: 14px;
}

.v-time {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
}

.backBtn {
  width: 200px;
  height: 54px;
  background-color: #FA8373;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 54px;
  display: block;
  margin: 30px auto;
  text-align: center;
  cursor: pointer;
}
@media (max-width: 520px) {
  .video-category {
    flex-direction: column;
    padding: 20px 16px;
  }

  .player {
    height: 220px;
  }

  .title {
    font-size: 18px;
  }

  .desc {
    font-size: 13px;
    line-height: 1.6;
  }

  .playlist {
    max-height: none;
    margin-top: 20px;
  }

  .playlist h3 {
    font-size: 15px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .playlist li {
    flex-direction: row; /* 橫向排列 */
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
  }

  .playlist img {
    width: 100px;
    height: 60px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
  }

  .v-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .v-time {
    font-size: 12px;
    color: #888;
  }

  .backBtn {
    width: 46%;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    border-radius: 24px;
    margin: 24px auto;
  }
}

</style>
