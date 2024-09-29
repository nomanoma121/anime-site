import React from "react";
import Link from "next/link";

// サーバー側でデータを取得
export default async function Home() {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(season: FALL, seasonYear: 2024, type: ANIME) {
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
          <li key={anime.title.native}>
            <h2>{anime.title.native}</h2>
            <img src={anime.coverImage.large} alt={anime.title.native} />
            <Link href={`/${anime.title.native}`}>詳細をみる</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
