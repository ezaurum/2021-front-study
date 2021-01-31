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
  @Prop() readonly tweetData!: Tweet;

  tweet: Tweet = {
    name: '테스트',
    userImage: 'string',
    handle: 'string',
    timeLapsed: 'string',
    tweetImage: 'Blob | string',
    description: 'string',
    likes: 0,
    upVoted: false,
  }

  created() {
    this.tweet = this.tweetData;
  }

  get computedDescription() {
    return this.tweet.description.split(' ').map((word) => (word[0] === '@' || word[0] === '#' ? `<span class="highlighted">${word}</span>` : '')).join(' ');
  }

  like() {
    console.log('like', this);
    // do nothing
    // this.tweetData.upVoted ? this.tweetData.likes-- : this.tweetData.likes++;
    // this.tweetData.upVoted = !this.tweetData.upVoted;
  }
}
</script>
