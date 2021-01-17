import {
  createRouter, createWebHistory, LocationAsRelativeRaw, RouteRecordRaw,
} from 'vue-router';
import SingleStoryItem from '@/components/SingleStoryItem.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/story/:id',
    name: 'Story',
    component: SingleStoryItem,
    // 주소에서 props 로 값을 넘겨준다
    // https://router.vuejs.org/guide/essentials/passing-props.html
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
