import AnimeCard from "../components/AnimeCard";
import styles from "./listPage.module.css";

export default async function Home() {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(season: FALL, seasonYear: 2024, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            native
          }
          coverImage {
            extraLarge
          }
          genres
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();

  const animes = data?.Page?.media;
  const numberOfAnime = animes.lenght;

  return (
    <div>
      <h1 className={styles.pageTitle}>Popular Anime</h1>
      <div className={styles.cardList}>
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} length={numberOfAnime}/>
        ))}
      </div>
    </div>
  );
}
