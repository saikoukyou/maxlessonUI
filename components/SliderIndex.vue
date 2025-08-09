<template>
    <div class="slider">
      <div class="slider-container">
        <div class="slider-slides-group" :style="sliderStyles">
          <div v-for="(slide, index) in slides" :key="index" class="slider-slide" :style="slideStyles(index)">
            <img :src="slide.video_img" alt="" width="100%" height="auto">
          </div>
        </div>
      </div>
      <ul class="slider-buttons">
        <li v-for="(button, index) in buttons" :key="index" class="slider-button"
          :class="{ 'active': currentSlide === index }" @mouseover="changeSlide(index)"></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type:[Object,Array],
        default: function () {
          return {};
        }
      },
    },
    data() {
      return {
        slides: this.value,
        // slides: [
        //   { image: 'https://nc-app-test.netlify.app/_nuxt/ex_textbook.73ad2c60.jpg' },
        //   { image: 'https://s3.ap-northeast-1.amazonaws.com/staging.netchina.jp/face/student_face_image_1277.jpg' },
        //   { image: 'https://s3.ap-northeast-1.amazonaws.com/staging.netchina.jp/uploads/images/2023/06/15/MUi6qVaeclAgHSTaVbGLSwZn3WDjJrxI6VHfXbci.webp' },
        //   { image: 'https://s3.ap-northeast-1.amazonaws.com/staging.netchina.jp/uploads/images/2023/06/15/MUi6qVaeclAgHSTaVbGLSwZn3WDjJrxI6VHfXbci.webp' },
        //   { image: 'https://nc-app-test.netlify.app/_nuxt/ex_textbook.73ad2c60.jpg' },
        // ],
        buttons: this.value,
        // buttons: [
        //   { content: 'ボタン1' },
        //   { content: 'ボタン2' },
        //   { content: 'ボタン3' },
        //   { content: 'ボタン4' },
        //   { content: 'ボタン5' },
        // ],
        currentSlide: 0,
        startX: 0,
        moveX: 0,
        dist: 30,
      };
    },
    computed: {
      sliderStyles() {
        return {
          transform: `translateX(-${this.currentSlide * 100}%)`,
        };
      },
    },
    methods: {
      slideTo(index) {
        this.currentSlide = index;
      },
      slideStyles(index) {
        return {
          left: `${index * 100}%`,
        };
      },
      changeSlide(index) {console.log('index:'+index);
        this.slideTo(index);
      },
      prevSlide() {
        if (this.currentSlide === 0) {
          this.slideTo(this.slides.length - 1);
        } else {
          this.slideTo(this.currentSlide - 1);
        }
      },
      nextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
          this.slideTo(0);
        } else {
          this.slideTo(this.currentSlide + 1);
        }
      },
      handleTouchStart(e) {
        this.startX = e.touches[0].pageX;
      },
      handleTouchMove(e) {
        this.moveX = e.changedTouches[0].pageX;
      },
      handleTouchEnd() {
        if (this.startX > this.moveX && this.startX > this.moveX + this.dist) {
          this.nextSlide();
        } else if (this.startX < this.moveX && this.startX + this.dist < this.moveX) {
          this.prevSlide();
        }
      },
    },
    mounted() {
      document.addEventListener('touchstart', this.handleTouchStart);
      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
    },
    beforeUnmount() {
      document.removeEventListener('touchstart', this.handleTouchStart);
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
    },
  };
  </script>
  
  <style scoped>
  .slider {
    position: relative;
    width: 100%;
    height: 400px;
  }

    .slider .slider-container {
  overflow: hidden;
}

.slider .slider-slides-group {
  display: grid;
  grid-template-columns: 100% 100% 100% 100% 100% ;
  transition: transform 0.3s ease-in-out;
}

.slider .slider-slide {
  position: relative;
  width: 100%;
}
.slider .slider-slide img{
    width: 100%;
    min-height: 360px;
    max-height: 400px;
}

.slider-buttons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.slider-button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 5px;
  cursor: pointer;
}

.slider-button.active {
  background-color: #000;
}
</style>