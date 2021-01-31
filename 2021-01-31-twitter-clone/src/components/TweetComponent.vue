<template>
  <div class="tweet">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img class="user-image" :src="tweet.userImage">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ tweet.name }}</strong>
            <img class="verified-icon"
                 src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png"
                 v-if="tweet.verified"/>
            <small>{{ tweet.handle }}</small>
            <small class="time-lapsed">{{ tweet.timeLapsed }}</small>
            <br>
            <span class="description" v-html="computedDescription"></span>
          </p>
        </div>
        <div v-if="tweet.tweetImage" class="tweet-image">
          <img :src="tweet.tweetImage"/>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="far fa-comment"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item heart" @click="like">
                  <span class="icon is-small">
                    <i class="far fa-heart"
                       :class="{'fas': tweet.upVoted}"></i>
                  </span>
              <p :class="{'bold': tweet.upVoted}">
                {{ new Intl.NumberFormat().format(tweet.likes) }}
              </p>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class TwitterComponent extends Vue {
  @Prop() readonly tweet!: Tweet;

  get computedDescription() {
    return this.tweet.description.split(' ').map((word) => (word[0] === '@' || word[0] === '#' ? `<span class="highlighted">${word}</span>` : '')).join(' ');
  }

  like() {
    // 보통 하위 컴포넌트에서는 메세지만 날려주고 상위 컴포넌트에서 처리합니다.
    if (this.tweet.upVoted) {
      this.$emit('voted-down');
    } else {
      this.$emit('voted-up');
    }
  }
}
</script>
