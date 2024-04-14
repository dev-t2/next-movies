'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import styles from '@/styles/poster.module.css';

interface IPoster {
  id: string;
  title: string;
  path: string;
}

export default function Poster({ id, title, path }: IPoster) {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/movies/${id}`);
  }, [router, id]);

  return (
    <div className={styles.movie} onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={path} alt={title} />

      <Link prefetch href={`/movies/${id}`}>
        {title}
      </Link>
    </div>
  );
}
