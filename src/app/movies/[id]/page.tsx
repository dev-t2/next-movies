import { API_URL } from '@/app/(home)/page';

async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  const movie = await response.json();

  return movie;
}

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  const videos = await response.json();

  return videos;
}

export default async function MoviePage({ params: { id } }: { params: { id: string } }) {
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  return <h1>{movie.title}</h1>;
}
