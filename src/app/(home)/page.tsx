import { Metadata } from 'next';
import Link from 'next/link';

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
    <div>
      {movies.map((movie: any) => {
        return (
          <li key={movie.id}>
            <Link href={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        );
      })}
    </div>
  );
}
