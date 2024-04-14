import { API_URL } from '@/constants';

import styles from '@/styles/video.module.css';

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  const videos = await response.json();

  return videos;
}

export default async function Videos({ id }: { id: string }) {
  const videos = await getVideos(id);

  return (
    <div className={styles.container}>
      {videos.map((video: any) => {
        return (
          <iframe
            key={video.id}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={`https://youtube.com/embed/${video.key}`}
            title={video.name}
          />
        );
      })}
    </div>
  );
}
