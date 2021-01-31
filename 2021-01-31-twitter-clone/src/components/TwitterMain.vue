<template>
  <div id="app">
    <div class="iphone">
      <div class="iphone-top">
        <span class="camera"></span>
        <span class="sensor"></span>
        <span class="speaker"></span>
      </div>
      <div class="top-bar"></div>
      <div class="iphone-screen">
        <div v-if="!step" class="loading" key="app_transition_1">
          <i class="fab fa-twitter fa-3x" aria-hidden="true"></i>
        </div>
        <div v-if="step" class="app" key="app_transition_2">
          <div class="phone-header">
            <div v-if="step === 1"
                 style="border-bottom: 1px solid #e6ecf1; padding-bottom: 10px;">
              <p>Home</p>
              <img class="img-1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/codepen_logo.png"/>
              <img class="img-2"
                   src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/tweet_icon.png"
                   @click="step++"/>
            </div>
            <div v-if="step === 2">
              <i class="fas fa-times" @click="goToHome"></i>
              <button class="button is-primary is-small"
                      @click="shareTweet"
                      :disabled="description === ''">
                Tweet
              </button>
            </div>
          </div>
          <div class="feed" id="feed" v-if="step === 1" v-dragscroll.y="true">
            <TweetComponent
              v-for="(tweet, idx) in tweets"
              :tweet-data="tweet"
              :key="idx"
            />
          </div>
          <div class="make-tweet" v-if="step === 2">
            <img class="img-1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/codepen_logo.png"/>
            <div class="caption-container">
                <textarea
                  placeholder="What's happening?"
                  type="text"
                  class="caption-input"
                  maxlength="280"
                  v-model="description">
                </textarea>
              <i></i>
            </div>
            <div class="text-limit">
              {{ description.length }}/280
              <span class="right">Tag others with
                    <span class="highlighted">@</span>
                    and create hashtags with <span
                  class="highlighted">#</span></span>
            </div>
            <div class="image-container" v-if="image">
              <img :src="image" alt=""/>
              <i class="fas fa-times-circle"
                 @click="image = ''">
              </i>
            </div>
          </div>
          <div class="phone-footer">
            <div v-if="step === 1" class="step-1">
              <div class="home-cta" @click="goToHome">
                <i class="fas fa-home fa-lg"></i>
              </div>
            </div>
            <div v-if="step === 2" class="step-2">
              <div class="home-cta" @click="goToHome">
                <i class="fas fa-home fa-lg"></i>
              </div>
              <div class="upload-cta">
                <input type="text"
                       name="file"
                       id="file"
                       class="inputfile"
                       @change="fileUpload"
                       v-model="fileInput"
                       :disabled="step !== 2"/>
                <label for="file">
                  <i class="fas fa-image fa-lg"></i>
                </label>
              </div>
              <p class="helper-text">Click
                <a @click="uploadRandomImage">here for a random image!</a>
                or upload your own!
                <i class="fas fa-chevron-right"></i></p>
            </div>
          </div>
        </div>
      </div>
      <div class="iphone-buttons">
        <span class="on-off"></span>
        <span class="sleep"></span>
        <span class="up"></span>
        <span class="down"></span>
      </div>
      <div class="bottom-bar"></div>
      <div class="iphone-bottom">
        <span></span>
      </div>
    </div>

    <div class="details">
      <a class="button is-primary is-small is-info"
         v-if="!showDetails" @click="showDetails = !showDetails">Details</a>
      <ul v-else>
        <li>Navigate the feed by <span>dragging (or scrolling)</span></li>
        <li>Like a post with <span><i class="far fa-heart fa-lg"></i></span></li>
        <li>Create tweets and upload photos!</li>
      </ul>
    </div>
    <a href="https://twitter.com/djirdehh" target="_blank" class="footer-contact">
      <i class="fab fa-twitter" aria-hidden="true"></i>
    </a>
  </div>

  <!--  Prefetch random images -->
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/tropical_beach.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/nice_for_what.jpeg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/toronto_skyline.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/puppers.jpg"/>

  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_mobile.png"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/cn-tower.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/prism-goggles-at-concert.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/working-at-night.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/busy-beach.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/grand-canyon.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/carnival-lights-at-dusk.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/codepen_logo.png"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/jaden_twitter_profile.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/drizzy_twitter.png"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me-formal.jpg"/>
  <link rel="prefetch" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/pug_personal.jpg"/>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import tweetJsonList from '@/assets/tweets.json';
import TweetComponent from '@/components/TweetComponent.vue';
import { dragscroll } from 'vue-dragscroll';

@Options({
  components: { TweetComponent },
  directives: {
    dragscroll,
  },
})
export default class TwitterMain extends Vue {
  tweets = tweetJsonList as Tweet[]

  image: Blob | string = ''

  description = ''

  step = 0

  showDetails = false

  fileInput = ''

  created() {
    setTimeout(() => {
      this.step = 1;
    }, 1000);
  }

  fileUpload(e: any) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    // eslint-disable-next-line prefer-destructuring
    this.image = files[0];
    this.createImage();
  }

  createImage() {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.image = e.target.result as string;
      this.step = 2;
    };
    reader.readAsDataURL(this.image as unknown as Blob);
  }

  uploadRandomImage() {
    const randomImages = [
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_mobile.png',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/cn-tower.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/prism-goggles-at-concert.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/working-at-night.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/busy-beach.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/grand-canyon.jpg',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/carnival-lights-at-dusk.jpg',
    ];

    this.image = randomImages[Math.floor(Math.random() * randomImages.length)];
    this.step = 2;
  }

  goToHome() {
    this.image = '';
    this.description = '';
    this.step = 1;

    this.$nextTick(() => {
      const feed = document.getElementById('feed');
      if (feed) feed.scrollTop = 0;
    });
  }

  shareTweet() {
    const tweet: Tweet = {
      name: 'CodePen.IO',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/codepen_logo.png',
      handle: '@CodePen',
      timeLapsed: '1m',
      tweetImage: this.image,
      description: this.description,
      likes: 0,
      upVoted: false,
    };

    this.tweets.unshift(tweet);
    this.goToHome();
  }
}
</script>

<style lang="scss" scoped>
$small: 520px;
$medium: 768px;
$large: 1216px;

@import url('https://fonts.googleapis.com/css?family=Roboto:400,700, 900');

$secondaryColor: #657685;
$borderColor: #e6ecf1;
$redColor: #e0245e;
$blueColor: #1ca0f3;

*, *:after, *:before {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #e6ecf1;
  font-family: 'Roboto', sans-serif;
  color: #13171b;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.iphone {
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #999, 0 0 30px 0px rgba(0, 0, 0, 0.7);
  border: 5px solid #d9dbdc;
  background: #f8f8f8;
  padding: 15px;
  border-radius: 50px;
  height: 780px;
  position: relative;
  margin: 30px auto;
  // Scale so that the iPhone fits in view
  transform: scale(.8);
}

.iphone-top {
  padding: 5px 110px 25px;
  position: relative;

  .speaker {
    display: block;
    width: 70px;
    height: 6px;
    margin: 0 auto;
    border-radius: 6px;
    background: #292728;
  }

  .camera {
    display: block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin: 0 auto 13px;
    background: #333;
  }

  .sensor {
    display: block;
    width: 15px;
    height: 15px;
    float: left;
    background: #333;
    margin-top: -5px;
    border-radius: 50%;
  }
}

.top-bar, .bottom-bar {
  display: block;
  width: 423px;
  height: 15px;
  border: {
    left: 5px solid #BBB;
    right: 5px solid #BBB;
  }
  position: absolute;
  left: -5px;
}

.top-bar {
  top: 65px;
}

.bottom-bar {
  bottom: 65px;
}

.iphone-screen {
  position: relative;
  background-color: #FFF;
  height: 640px;
  width: 375px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .app {
    position: relative;
    height: 100%;
  }

  .loading {
    background: $blueColor;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .fa-twitter {
      color: #FFF;
    }
  }
}

.iphone-buttons {
  .on-off, .up, .down, .sleep {
    display: block;
    background: #CCC;
    position: absolute;
    border-radius: 2px 0px 0px 2px;
  }

  .on-off {
    height: 40px;
    width: 3px;
    top: 100px;
    left: -8px;
  }

  .up, .down, .sleep {
    height: 60px;
    width: 5px;
    left: -10px;
  }

  .up {
    top: 170px;
  }

  .down {
    top: 250px;
  }

  .sleep {
    left: auto;
    right: -10px;
    top: 170px;
    border-radius: 0px 2px 2px 0px;
  }
}

.iphone-bottom {
  padding: 7px 0 0;

  span {
    display: block;
    margin: 0 auto;
    width: 40px;
    height: 40px;
    background: #ccc;
    border-radius: 50%;
    background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
    position: relative;

    &:after {
      content: "";
      display: block;
      width: 34px;
      height: 34px;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      left: 3px;
      top: 3px;
    }
  }
}

.phone-header {
  height: 50px;
  width: 375px;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 99;
  text-align: center;

  p {
    font-weight: 900;
    font-size: 19px;
    padding-top: 11px;
  }

  .img-1 {
    max-width: 35px;
    position: absolute;
    top: 7px;
    left: 10px;
    border-radius: 99px;
  }

  .img-2 {
    max-width: 30px;
    position: absolute;
    top: 7px;
    right: 10px;
    cursor: pointer;
  }

  .fa-times {
    color: #1ca0f3;
    font-size: 25px;
    position: absolute;
    top: 12px;
    left: 20px;
    cursor: pointer;
  }

  .button.is-primary {
    background-color: $blueColor;
    border-radius: 12px;
    position: absolute;
    top: 12px;
    right: 20px;
  }

  .cancel-cta,
  .next-cta {
    position: absolute;
    top: 12px;
    color: #209cee;
    font-weight: bold;
    cursor: pointer;
  }

  .cancel-cta {
    left: 10px;
  }

  .next-cta {
    right: 10px;
  }
}

.feed {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: -15px;

  .tweet {
    padding: 10px;
    border-bottom: 1px solid $borderColor;

    .user-image {
      border-radius: 99px;
    }

    .verified-icon {
      width: 15px;
    }

    p {
      font-size: 16px;
    }

    small {
      color: $secondaryColor;
    }

    .description .highlighted {
      color: $blueColor;
    }

    .tweet-image img {
      border-radius: 10px;
      padding-bottom: 5px;
    }

    .level-left .level-item {
      margin-right: 3rem;
      color: $secondaryColor;
      cursor: initial;
    }

    .level-left .level-item.heart {
      cursor: pointer;
      color: $blueColor;
    }

    .level-left p {
      padding-left: 4px;
      font-size: 13px;
      color: $blueColor;
    }

    .level-left .fa-heart.fas {
      color: $redColor;
    }

    .level-left p.bold {
      color: $redColor;
    }
  }

  .tweet:last-of-type {
    margin-bottom: 85px;
  }
}

.make-tweet {
  padding: 15px;
  position: relative;
  height: 100%;

  .img-1 {
    max-width: 35px;
    border-radius: 99px;
    position: relative;
    top: -45px;
  }

  .caption-container {
    display: inline-block;
    position: relative;
    width: 80%;
    top: 10px;
    left: 5px;
    height: 15%;

    textarea {
      border: 0;
      font-size: 1.0rem;
      resize: none;
      width: 100%;
      height: 100%;
      border-bottom: 1px solid #eeeeee;
    }

    i {
      position: absolute;
      width: 1px;
      height: 30%;
      background-color: $blueColor;
      left: 0px;
      top: -2px;
      animation-name: blink;
      animation-duration: 2500ms;
      animation-iteration-count: infinite;
      opacity: 1;
    }

    textarea:focus {
      outline: 0;
    }
  }

  .text-limit {
    font-size: 11px;
    margin-left: 45px;
    padding-top: 10px;

    span.right {
      float: right;
      padding-right: 20px;
    }

    span.highlighted {
      color: $blueColor;
      font-weight: 600;
    }
  }

  .caption-container textarea:focus + i {
    display: none;
  }

  .image-container {
    position: relative;
    padding-top: 10px;
    width: 90%;
    margin-left: 40px;

    .fa-times-circle {
      position: absolute;
      top: 15px;
      right: 5px;
      cursor: pointer;
    }
  }

  .image-container img {
    border-radius: 10px;
  }
}

.phone-footer {
  height: 35px;
  width: 375px;
  position: absolute;
  bottom: 0;
  background: #FFF;
  border-top: 1px solid #eeeeee;
  z-index: 99;

  .step-1 {
    .home-cta {
      position: absolute;
      left: 10px;
      top: 6px;
      cursor: pointer;
      color: $secondaryColor;
    }

    .upload-cta {
      position: absolute;
      right: 10px;
      top: 6px;
      color: $secondaryColor;

      p {
        font-size: 0.63rem;
        position: absolute;
        left: -25px;
        top: 5px;
      }
    }
  }

  .step-2 {
    .home-cta {
      position: absolute;
      left: 10px;
      top: 6px;
      cursor: pointer;
      color: $blueColor;
    }

    .upload-cta {
      position: absolute;
      right: 10px;
      top: 6px;
      cursor: pointer;
      color: $blueColor;
    }

    .helper-text {
      font-size: 11px;
      position: absolute;
      right: 40px;
      top: 7.5px;
    }
  }

  input[name="file"] {
    visibility: hidden;
  }

  label {
    cursor: pointer;
    z-index: 99;
  }
}

.details {
  position: absolute;
  left: 10px;
  bottom: 10px;

  li {
    font-size: 0.8rem;

    span {
      font-weight: bold;
    }
  }
}

.footer-contact {
  position: absolute;
  right: 10px;
  bottom: 10px;

  .fa-twitter {
    color: #209cee;
    font-size: 2.0rem;

    &:hover {
      color: #1496ed;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

// Media Queries
@media(max-width: $small) {
  #app {
    height: 100% !important;
    padding-top: 0 !important;
  }

  .app__phone,
  .app__phone__scroll__cover {
    height: 100%;
    width: 100%;
  }

  .phone-header,
  .phone-footer {
    width: 100%;
  }
}

@media(max-width: $large) and (max-height: $small) {
  .iphone {
    transform: scale(.5);
  }
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>
