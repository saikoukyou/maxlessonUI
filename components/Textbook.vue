<template>
  <div class="container textNone">
    <div class="image-container">
      <!-- 動態顯示當前圖片 -->
      <img :src="currentImage" alt="Main Image">
    </div>
    <ul class="image-list">
      <!-- 遍歷圖片列表並處理鼠標懸停事件 -->
      <li
          v-for="(image, index) in images"
          :key="index"
          @mouseover="updateImage(image.url)"
      >
        <div
            class="circle"
            :style="{ backgroundColor: currentImage === image.url ? image.color : '#E2D6CD' }"
        >
          {{ image.char }}
        </div>
        <div class="content">
          <h3>{{ image.name }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="carousel">
    <ul>
      <li style="margin-left: 6%;"><img src="../assets/images/textbook1_m.png" alt="圖片1"></li>
      <li><img src="../assets/images/textbook2_m.png" alt="圖片2"></li>
      <li><img src="../assets/images/textbook3_m.png" alt="圖片3"></li>
      <li><img src="../assets/images/textbook4_m.png" alt="圖片4"></li>
      <li><img src="../assets/images/textbook5_m.png" alt="圖片5"></li>
    </ul>
  </div>

</template>

<script>
import textbook1 from '../assets/images/textbook1.png';
import textbook2 from '../assets/images/textbook2.png';
import textbook3 from '../assets/images/textbook3.png';
import textbook4 from '../assets/images/textbook4.png';
import textbook5 from '../assets/images/textbook5.png';

export default {
  data() {
    return {
      images: [
        {
          name: '初級〜上級の文法',
          url: textbook1,
          color: '#FFC83B',
          description: '初心者から上級者までの文法を学ぶ。',
          char: '文法'
        },
        {
          name: 'リスニング理解',
          url: textbook2,
          color: '#F09C19',
          description: '話し言葉を理解する能力を向上させるための聴解練習。',
          char: '聴解'
        },
        {
          name: 'ビジネス会話',
          url: textbook3,
          color: '#DD6D22',
          description: 'ビジネスシーンで使われる会話や表現を学ぶ。',
          char: 'ビジネス'
        },
        {
          name: '実践会話フリートーク',
          url: textbook4,
          color: '#8FC321',
          description: '日常会話やフリートークの実践を通じて会話力を向上させる。',
          char: '会話'
        },
        {
          name: 'HSK教材',
          url: textbook5,
          color: '#5FBDF0',
          description: '中国語能力試験（HSK）のための教材。',
          char: 'HSK'
        }
      ],
      currentImage: textbook1 // 初始顯示的圖片
    };
  },
  methods: {
    updateImage(imageUrl) {
      this.currentImage = imageUrl;
    }
  }
};
</script>


<style scoped>

.textNone{
  display: block;
}
.container {
  width: 1130px;
  height: 640px;
  display: flex;
  margin-top: 20px;
}

.image-container {
  width: 495px;
  height: 640px;
  margin-left: 60px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-list {
  list-style: none;
  padding: 0;
  margin: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.image-list li {
  width: 480px;
  height: 120px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #E9E9E9;
  text-align: left;
  position: relative;
  line-height: 120px;
}

.circle {
  width: 94px;
  height: 94px;
  border-radius: 94px;
  position:absolute;
  color: white;
  font-weight: bold;
  margin-right: 20px;
  transition: background-color 0.3s;
  line-height: 94px;
  text-align: center;
  font-size: 20px;
  display: inline-block;
}

.content {
  display: inline-block;
  flex-direction: column;
  margin-left: 110px;
}

.image-list li:hover {
  color: #FA8373;
}

.content h3 {
  margin: 0;
  font-size: 14pt;
  font-weight: bold;
  line-height: 16px;
}

.content p {
  margin: 5px 0 0;
  font-size: 11pt;
  line-height: 22px;
}

.image-list li:nth-child(2) .content{margin-top: 16px;}
.image-list li:nth-child(4) .content{margin-top: 16px;}

.carousel{
  display: none;
}

@media screen and (max-width: 520px) {
  .textNone{
    display: none;
  }

  .carousel {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    padding: 20px 0; /* 調整間距 */
    display: block;
    position: relative;
  }
  .carousel li {
    display: inline-block;
    width: 85%; /* 圖片寬度為畫面寬度的 85% */
    margin-right: 16px; /* 圖片間距 */
    vertical-align: top;
  }
  .carousel img {
    width: 100%;
    height: auto;
    display: block;
  }
}

</style>
