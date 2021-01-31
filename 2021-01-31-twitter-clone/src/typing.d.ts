interface Tweet {
  name: string;
  userImage: string;
  handle: string;
  timeLapsed: string;
  tweetImage: Blob | string;
  description: string;
  likes: number;
  upVoted: boolean;
}

declare module 'vue-dragscroll';
declare module 'vue-property-decorator';
