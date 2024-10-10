"use client";
import { useContext, useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { SearchContext } from "./context/SearchContext";
import styles from "./listPage.module.css";

export default function Home() {
  const { searchTerm, selectedYear, selectedSeason } = useContext(SearchContext);
  const [animes, setAnimes] = useState([]);

  // Fetch anime data with dynamic query
  const fetchAnimeData = async () => {
    const query = `
      query($search: String, $seasonYear: Int, $season: MediaSeason) {
        Page(page: 1, perPage: 50) {
          media(search: $search, season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC) {
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

    const variables = {
      search: searchTerm || null,
      seasonYear: selectedYear ? parseInt(selectedYear) : null,
      season: selectedSeason || null,
    };

    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const { data } = await response.json();
    setAnimes(data?.Page?.media || []);
  };

  // Fetch anime data whenever searchTerm, selectedYear, or selectedSeason changes
  useEffect(() => {
    fetchAnimeData();
  }, [searchTerm, selectedYear, selectedSeason]);

  return (
    <div>
      <h1 className={styles.pageTitle}>Popular Anime</h1>
      <div className={styles.cardList}>
        {animes.length > 0 ? (
          animes.map((anime) => <AnimeCard key={anime.id} anime={anime} />)
        ) : (
          <p>No anime found</p>
        )}
      </div>
    </div>
  );
}
