"use client";
import { useContext, useEffect, useState } from "react";
import AnimeCard from "./components/AnimeCard";
import { SearchContext } from "./context/SearchContext";
import styles from "./listPage.module.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const { searchTerm, selectedYear, selectedSeason } =
    useContext(SearchContext);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnimeData = async () => {
    setLoading(true);
    const query = `
      query($search: String, $seasonYear: Int, $season: MediaSeason) {
        Page(page: 1, perPage: 10) {
          media(search: $search, season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC, countryOfOrigin: "JP",) {
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

    try {
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
    } finally {
      setLoading(false);
    }
  };

  // Fetch anime data whenever searchTerm, selectedYear, or selectedSeason changes
  useEffect(() => {
    fetchAnimeData();
  }, [searchTerm, selectedYear, selectedSeason]);

  return (
    <div>
      {loading && (
        <div className={styles.spinner}>
          <CircularProgress />
        </div>
      )}
      {searchTerm ? (
        <h1 className={styles.pageTitle}>Search: {searchTerm}</h1>
      ) : (
        <h1 className={styles.pageTitle}>Popular Anime</h1>
      )}
      <div className={styles.cardList}>
        {animes.length > 0
          ? animes.map((anime) => <AnimeCard key={anime.id} anime={anime} />)
          : !loading && <p>No anime found</p>}
      </div>
    </div>
  );
}
