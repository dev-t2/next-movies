import { API_URL } from '@/app/(home)/page';

async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  const movie = await response.json();

  return movie;
}

export default async function Infomation({ id }: { id: string }) {
  const movie = await getMovie(id);

  return <h4>{JSON.stringify(movie)}</h4>;
}
