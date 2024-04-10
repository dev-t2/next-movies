import { Suspense } from 'react';

import { Movie, Videos } from '@/components/pages/movies';

export default function MoviePage({ params: { id } }: { params: { id: string } }) {
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
