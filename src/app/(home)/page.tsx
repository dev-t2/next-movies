import { Metadata } from 'next';

import { Poster } from '@/components/pages/home';
import styles from '@/styles/home.module.css';

export const metadata: Metadata = {
  title: 'Home',
};

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

async function getMovies() {
  const response = await fetch(API_URL);
  const movies = await response.json();

  return movies;
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie: { id: string; title: string; poster_path: string }) => {
        return <Poster key={movie.id} id={movie.id} title={movie.title} path={movie.poster_path} />;
      })}
    </div>
  );
}
