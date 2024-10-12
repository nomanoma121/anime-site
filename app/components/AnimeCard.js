import Link from "next/link";
import styles from "./AnimeCard.module.css";

function AnimeCard({ anime, onLoading }) {
  const genres = anime.genres.slice(0, 4);

  return (
    <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src={anime.coverImage.extraLarge} />
        </div>
      <div className={styles.text}>
        <div className={styles.titleContainer}>
          <h1 className={styles.animeTitle}>{anime.title.native}</h1>
        </div>
        <div className={styles.genres}>
          {genres.map((e) => (
            <div className={styles.genre} key={e}>{e}</div>
          ))}
        </div>
      </div>
      <Link href={`/${anime.title.native}`} onClick={() => onLoading()}>
        <div className={styles.button}>View Detail</div>
      </Link>
    </div>
  );
}

export default AnimeCard;
