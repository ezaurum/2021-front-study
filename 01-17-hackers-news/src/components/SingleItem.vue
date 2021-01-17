<template>
  <div class="story">
    <span class="score">{{ url(item.title) }}</span>
    <router-link :to="{ path: '/story/' + item.id }"
    >{{ item.title }}
    </router-link>
    <br/>
    <span class="own-url">{{ item.url }}</span><br/>
    <span class="meta">
by: <span class="author">@{{ item.by }} </span> | Time: {{ item.time }} Ago | {{
        item.descendants
      }} comments
</span>
  </div>
</template>
<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'SingleItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    url(str: string) {
      return str.substring(0, 2)
        .toUpperCase();
    },
  },
})
export default class SingleItem extends Vue {
}
</script>
<style scoped lang="scss">
.item {
  border-radius: 5px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.salepill {
  background: rgb(232, 35, 25);
  color: white;
  font-family: 'Barlow', sans-serif;
  position: absolute;
  right: 30px;
  top: 60px;
  padding: 2px 10px 4px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  border-radius: 1000px;
}

.author {
  color: #FFF;
  border-radius: 10px;
  background: teal;
}

.own-url {
  font-size: .8rem;
  color: black;
}

.story {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}

.score {
  color: #f60;
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px;
}

.story a {
  color: #34495e;
  font-weight: 600;
  text-decoration: none;
}

.story a span {
  font-size: 0.85em;
  margin-left: 10px;
  color: #828282;
}

.story .meta {
  font-size: 0.85em;
  color: #828282;
}
</style>
