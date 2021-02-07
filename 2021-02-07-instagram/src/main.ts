import mitt from 'mitt';
import { createApp } from 'vue';
import VueDragscroll from 'vue-dragscroll';
import App from './App.vue';
import router from './router';
import store from './store';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore

const app = createApp(App);
app.config.globalProperties.emitter = mitt();

app.use(store).use(VueDragscroll).use(router)
  .mount('#app');
