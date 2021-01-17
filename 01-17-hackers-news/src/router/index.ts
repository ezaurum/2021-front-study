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
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
