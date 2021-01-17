import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

/*
 *  Fetch list of the top 50 stories
 *  returns stories[].
*/
export async function getTopStories() {
  const { data } = await axios.get(`${baseUrl}/topstories.json`, {});
  if (data && data.length > 50) {
    return data.slice(0, 50);
  }
  return data;
}

/*
 *  Fetch items based on 'ids' from getTopStories()
 *  returns items[].
 *  */

interface Res {
  data: Sortable;
}

export async function storiesWithItems(): Promise<Sortable[]> {
  const stories = await getTopStories();
  const map = stories.map((id: unknown) => axios.get(`${baseUrl}/item/${id}.json`));
  const d = await Promise.all(map);
  return d.map((el) => {
    const { data } = el as Res;
    return data;
  }) as Sortable[];
}

/*
 *  Makes request based on the 'id' param
 *  returns response[].
*/
export async function getSingleItem(id: number) {
  const { data } = await axios.get(`${baseUrl}/item/${id}.json`);
  return data;
}

/*
 *  Makes request based on the 'id' passed to the
 *  getSingleItem(<id>), loops through kids[];
 *  returns comments[].
*/
export async function getSingleStoryComments(id: number) {
  const item = await getSingleItem(id);
  if (!(item && item.kids)) {
    return [];
  }
  const map = item.kids.map((kid: unknown) => axios.get(`${baseUrl}/item/${kid}.json`));
  const d = await Promise.all(map);
  return d.map((el) => {
    const { data } = el as Res;
    return data;
  });
}

/*
 *  Sorts the result based on the property score;
 *  returns a sorted array.
*/
export interface Sortable {
  score: number;
}

export const sortByScore = (a: Sortable, b: Sortable) => {
  if (a.score < b.score) {
    // a comes before b in the sorted order
    return -1;
  }
  if (a.score > b.score) {
    // a comes before b in the sorted order
    return 1;
  }
  // a and b are the same
  return 0;
};
