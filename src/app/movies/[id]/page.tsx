import { Suspense } from 'react';

import { Movie, Videos } from '@/components/pages/movies';

export default function MoviePage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h3>Movie</h3>

      <Suspense fallback={<h1>Loading Movie...</h1>}>
        <Movie id={id} />
      </Suspense>

      <h3>Videos</h3>

      <Suspense fallback={<h1>Loading Videos...</h1>}>
        <Videos id={id} />
      </Suspense>
    </div>
  );
}
