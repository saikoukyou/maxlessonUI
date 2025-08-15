
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

  <div class="video-home">
    <header class="channel-header">
      <img class="avatar" src="../../assets/images/video_photo.png" alt="BizCHINA" />
      <div class="channel-info">
        <h1 class="channel-name">動画でわかる！</h1>
        <p class="channel-desc">あなたの中国語学習をしっかり応援します。</p>
      </div>
    </header>

    <div class="featured-video-section horizontal">
      <div class="video-thumb">
        <iframe
            src="https://www.youtube.com/embed/gLbGcuRLQw4?si=k8k0ufQXg0R06pkI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
      </div>
      <div class="video-description">
        <h3 class="video-title">中国語ってどんな言語？</h3>
        <p class="video-text">
          日本人にとって、中国語の語順、発音、漢字などの特徴を紹介します。中国語学習の第一歩としておすすめの動画です。
        </p>
      </div>
    </div>

    <hr class="topBlock">

    <div
        v-for="(data, key, index) in videoCategories"
        :key="key"
        class="section-wrapper"
    >
      <div class="section-header">
        <h2>{{ data.emoji }} {{ data.title }}</h2>
        <router-link
            :to="{ path: `/video/${key}` }"
            class="more-button desktop-only"
        >▶ 全部見る</router-link>
      </div>
      <p class="section-desc">{{ data.description }}</p>


      <div class="video-slider">
        <div class="video-viewport">
          <div
              class="video-list"
              :style="{ transform: `translateX(-${scrollIndex[key] * (267 + 20)}px)` }"
          >
            <router-link
                v-for="video in data.videos"
                :key="video.id"
                :to="{ path: `/video/${key}`, query: { videoId: video.id } }"
                class="video-card"
            >
              <img :src="getThumbnail(video.youtubeUrl)" />
              <div class="video-title">{{ video.title }}</div>
            </router-link>
          </div>
        </div>

        <button
            v-if="scrollIndex[key] > 0"
            class="nav left"
            @click="prev(key)"
        >←</button>

        <button
            v-if="scrollIndex[key] + 4 < data.videos.length"
            class="nav right"
            @click="next(key)"
        >→</button>
      </div>

      <!-- 手機版用的 more -->
      <router-link
          :to="{ path: `/video/${key}` }"
          class="more-button mobile-only"
      >▶ 全部見る</router-link>

      <hr v-if="index < Object.keys(videoCategories).length - 1" />
    </div>
  </div>
</template>

<script setup>
const { videoCategories } = useVideoData()
const scrollIndex = reactive({})

onMounted(() => {
  for (const key in videoCategories) {
    scrollIndex[key] = 0
  }
})

const prev = (key) => {
  scrollIndex[key] = Math.max(scrollIndex[key] - 4, 0)
}
const next = (key) => {
  const max = videoCategories[key].videos.length - 4
  scrollIndex[key] = Math.min(scrollIndex[key] + 4, max)
}

const getThumbnail = (youtubeUrl) => {
  const match = youtubeUrl.match(/embed\/([^?&]+)/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : ''
}
</script>

<style scoped>
p{
  line-height: normal;
}
.topBlock{
  margin-bottom: 50px;
}
.featured-video-section.horizontal {
  display: flex;
  max-width: 1130px;
  gap: 20px;
  margin: 20px auto 40px auto;
  align-items: flex-start;
}

.featured-video-section .video-title{
  font-size: 24px !important;
  font-weight: bold;
}

.video-thumb {
  flex: 0 0 50%;
  aspect-ratio: 16 / 9;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

.video-thumb iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  top: 0;
  left: 0;
}

.video-description {
  flex: 1;
  padding-top: 4px;
}

.video-title {
  margin-bottom: 4px;
}

.video-text {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}


.video-home {
  width: 1130px;
  margin: 0 auto;
  padding: 30px 0;
  font-family: sans-serif;
}
.channel-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}
.channel-name {
  font-size: 24px;
  font-weight: bold;
}
.channel-desc {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}
.section-wrapper {
  margin-bottom: 50px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-header h2 {
  font-size: 22px;
  font-weight: bold;
}
/* 共通樣式：漂亮的圓角按鈕 */
.more-button {
  font-size: 14px;
  text-decoration: none;
  background-color: #f7c942;
  color: #000;
  border-radius: 24px;
  font-weight: bold;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: background-color 0.2s ease;
}

.more-button:hover {
  background-color: #f0b500;
}

/* 控制桌機與手機顯示位置 */
.desktop-only {
  display: inline-block;
  margin-left: auto;
}

.mobile-only {
  display: none;
}

.video-slider {
  position: relative;
  margin-top: 12px;
}
.video-viewport {
  width: 1130px;
  overflow: hidden;
  margin: 0 auto;
}
.video-list {
  display: flex;
  gap: 20px;
  transition: transform 0.4s ease;
  will-change: transform;
}
.video-card {
  flex: 0 0 auto;
  width: 267px;
  text-decoration: none;
}
.video-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd; /* 淡灰色邊框 */
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05); /* 淡淡的陰影讓整體更有層次 */
}
.video-title {
  font-size: 15px;
  padding: 8px 2px;
}
.nav {
   position: absolute;
   top: 40%;
   transform: translateY(-50%);
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background: #fff;
   border: none;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
   font-size: 18px;
   font-weight: bold;
   cursor: pointer;
   z-index: 10;
   display: flex;
   align-items: center;
   justify-content: center;
   transition: background 0.2s ease;
 }

.nav:hover {
  background: #f0f0f0;
}

.nav.left {
  left: -20px;
}
.nav.right {
  right: -20px;
}
hr {
  margin-top: 40px;
  border: none;
  border-top: 1px solid #DDD;
}
.section-desc {
  font-size: 14px;
  color: #666;
  margin: 4px 0 12px;
}
.avatar {
   width: 80px;
   height: 80px;
   border-radius: 50%;
   border: 3px solid #f7c942; /* 可依品牌色調整 */
   background-color: #fff;
 }
@media (max-width: 520px) {
  .featured-video-section .video-title{
    font-size: 20px !important;
    font-weight: bold;
  }
  .video-home {
    width: 100%;
    padding: 20px 16px;
  }
  .channel-header {
    display: flex;
    align-items: center;
    gap: 16px; /* avatar 和文字間距 */
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #f7c942;
    background-color: #fff;
    flex-shrink: 0; /* 避免圖片縮小 */
    margin-right: 0;
  }

  .channel-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .channel-name {
    font-size: 20px;
  }

  .channel-desc {
    font-size: 15px;
    line-height: normal;
  }

  .featured-video-section.horizontal {
    flex-direction: column;
    gap: 12px;
  }

  .video-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .video-description {
    padding-top: 0;
  }

  .video-title {
    font-size: 18px !important;
  }
  .video-text {
    font-size: 14px;
    line-height: normal;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .section-header h2 {
    font-size: 20px;
    font-weight: bold;
  }

  .video-viewport {
    width: 100%;
    overflow-x: auto;
  }

  .video-list {
    flex-wrap: nowrap;
    gap: 12px;
    margin:10px 0 10px 0;
  }

  .video-card {
    width: 240px;
    flex-shrink: 0;
  }

  .video-card img {
    height: 130px;
  }

  .video-title {
    font-size: 15px !important;
    font-weight: bold;
  }

  .nav {
    display: none;
  }

  .section-desc {
    font-size: 14px;
    line-height: normal;
    margin: 12px 0;
  }
  .topBlock{
    margin-bottom: 30px;
  }
  .section-wrapper {
    margin-bottom: 30px;
  }
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
    width: fit-content;
    margin: 16px auto 0;
    text-align: center;
  }
  .more-button {
    width: 50%;
    padding:14px;
    font-size: 14px;
    margin-top: 30px;
  }

}


</style>
