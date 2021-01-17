<template>
  <div class="home">
    <div class="banner">
      <h2 class="header">Hacker News API Implementation</h2>
    </div>
    <SingleItem
      v-for="(story, index) in stories"
      :key="index"
      :item="story"
      :index="index"></SingleItem>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SingleItem from '@/components/SingleItem.vue';
import { Sortable, sortByScore, storiesWithItems } from '@/services/storyService';

@Options({
  components: {
    SingleItem,
  },
  data() {
    return {
      stories: [] as Sortable[],
    };
  },
  async created() {
    const res = await storiesWithItems();
    this.stories = res.sort(sortByScore);
  },
})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.content {
  /*no grid support*/
  float: left;
  width: 79.7872%;
  /* grid */
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  padding: 0 !important;
  margin: 30px;
}

.banner {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  background-color: teal;
}

.header {
  font-weight: 900;
  margin: 4rem;
  width: 60%;
}

.home-img {
  width: 40%;
}
</style>
