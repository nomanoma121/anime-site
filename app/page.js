import React from "react";
import AnimeCard from "../components/AnimeCard";

// サーバー側でデータを取得
export default async function Home() {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(season: FALL, seasonYear: 2024, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            native
          }
          coverImage {
            large
          }
          siteUrl
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

  return (
    <div>
      <h1>2024年秋アニメ</h1>
      <ul>
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime}/>
        ))}
      </ul>
    </div>
  );
}
