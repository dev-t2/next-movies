import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

const URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const response = await fetch(URL);
  const movies = await response.json();

  return movies;
}

export default async function HomePage() {
  const movies = await getMovies();

  return <div>{JSON.stringify(movies)}</div>;
}
