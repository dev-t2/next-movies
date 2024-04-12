import { API_URL } from '@/constants';

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  const videos = await response.json();

  return videos;
}

export default async function Videos({ id }: { id: string }) {
  const videos = await getVideos(id);

  return <h4>{JSON.stringify(videos)}</h4>;
}
