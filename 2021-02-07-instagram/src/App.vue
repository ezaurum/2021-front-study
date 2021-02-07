<template>
  <div id="main">
    <div class="app-phone">
      <div class="phone-header">
        <img src="./assets/vuestagram.png">
        <a class="cancel-cta" v-if="step === 2 || step === 3" @click="goToHome">Cancel</a>
        <a class="next-cta" v-if="step === 2" @click="step++">Next</a>
        <a class="next-cta" v-if="step === 3" @click="sharePost">Share</a>
      </div>
      <PhoneBody
        :step="step"
        :posts="posts"
        :filters="filters"
        :image="image"
        :selectedFilter="selectedFilter"
        v-model="caption"
      />
      <div class="phone-footer">
        <div class="home-cta" @click="goToHome">
          <i class="fas fa-home fa-lg"></i>
        </div>
        <div class="upload-cta">
          <input
            type="file"
            name="file"
            id="file"
            class="inputfile"
            @change="uploadImage"
            :disabled="step !== 1"
          >
          <label for="file">
            <i class="far fa-plus-square fa-lg"></i>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PhoneBody from '@/components/PhoneBody.vue';
import { Options } from 'vue-class-component';

// mock data
import posts from '@/assets/jsons/post.json';
import filters from '@/assets/jsons/filter.json';
import { Post, EmitterVue } from '@/types';

@Options({
  components: {
    PhoneBody,
  },
})
export default class App extends EmitterVue {
  step = 1

  image: string | ArrayBuffer = ''

  selectedFilter = ''

  caption = ''

  posts = posts

  filters = filters

  created() {
    this.emitter.on('filter-selected', (evt: any) => {
      this.selectedFilter = evt.filter;
    });
  }

  goToHome() {
    this.image = '';
    this.selectedFilter = '';
    this.caption = '';
    this.step = 1;
  }

  uploadImage(evt: any) {
    const { files } = evt.target;
    if (!files.length) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (evv) => {
      this.image = evv?.target?.result ?? '';
      this.step = 2;
    };

    // To enable reuploading of same files in Chrome
    const querySelector = document.querySelector('#file') as HTMLInputElement;
    if (querySelector) {
      querySelector.value = '';
    }
  }

  sharePost() {
    const post = {
      username: 'webmaster95',
      userImage: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      postImage: this.image,
      likes: 0,
      caption: this.caption,
      filter: this.selectedFilter,
    } as Post;
    this.posts.unshift(post);
    this.goToHome();
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/app.scss";
</style>
