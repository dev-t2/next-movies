import { Suspense } from 'react';

import { Movie, Videos } from '@/components/pages/movies';
import { getMovie } from '@/components/pages/movies/Movie';

interface IMoviePage {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IMoviePage) {
  const movie = await getMovie(id);

  return { title: movie.title };
}

export default function MoviePage({ params: { id } }: IMoviePage) {
  return (
    <div>
      <Suspense fallback={<h1>Loading Movie...</h1>}>
        <Movie id={id} />
      </Suspense>

      <Suspense fallback={<h1>Loading Videos...</h1>}>
        <Videos id={id} />
      </Suspense>
    </div>
  );
}
