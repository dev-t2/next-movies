import { API_URL } from '@/constants';

import styles from '@/styles/movie.module.css';

export async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  const movie = await response.json();

  return movie;
}

export default async function Movie({ id }: { id: string }) {
  const movie = await getMovie(id);

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={movie.poster_path} alt={movie.title} />

      <div className={styles.info}>
        <h2 className={styles.title}>{movie.title}</h2>

        <h3>⭐{movie.vote_average.toFixed(1)}</h3>

        <p>{movie.overview}</p>

        <a href={movie.homepage} target="_blank">
          Link &rarr;
        </a>
      </div>
    </div>
  );
}
