import { Vue } from 'vue-class-component';
import { Emitter } from 'mitt';

export interface Post {
  username: string;
  userImage: string;
  postImage: string;
  likes: number;
  caption: string;
  filter: string;
  hasBeenLiked: boolean;
}

export class EmitterVue extends Vue {
  emitter!: Emitter
}
