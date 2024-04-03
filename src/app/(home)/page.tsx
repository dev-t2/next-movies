'use client';

import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    const response = await fetch('https://nomad-movies.nomadcoders.workers.dev/movies');
    const movies = await response.json();

    setMovies(movies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return <div>{isLoading ? 'Loading...' : JSON.stringify(movies)}</div>;
}
