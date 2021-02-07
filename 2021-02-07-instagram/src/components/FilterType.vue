<template>
  <div class="filter-type">
    <p>{{ filter.name }}</p>
    <!-- styling coming from cssgram -->
    <div
      class="img"
      :class="filter.name"
      :style="{ backgroundImage: 'url(' + image + ')' }"
      @click="selectedFilter"
    ></div>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { EmitterVue } from '@/types';

@Options({
  props: {
    filter: Object,
    image: String,
  },
})
export default class FilterType extends EmitterVue {
  filter!: Record<string, any>

  image!: string

  selectedFilter() {
    // this
    this.emitter.emit('filter-selected', { filter: this.filter.name });
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/filter-type.scss";
</style>
