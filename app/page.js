"use client";
import { useContext, useEffect, useState } from "react";
import AnimeCard from "./components/AnimeCard";
import { SearchContext } from "./context/SearchContext";
import styles from "./listPage.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Home() {
  const { searchTerm, selectedYear, selectedSeason } =
    useContext(SearchContext);
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstRender, setFirstRender] = useState(true);

  const fetchAnimeData = async () => {
    setLoading(true);
    const query = `
      query($search: String, $seasonYear: Int, $season: MediaSeason, $page: Int) {
        Page(page: $page, perPage: 10) {
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
      page: currentPage || 1,
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
      setAnimes(data.Page.media || []);
    } finally {
      setLoading(false);
      setFirstRender(false); //初回用のフラグ
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchAnimeData();
    setCurrentPage(1);
  }, [searchTerm, selectedYear, selectedSeason]);

  useEffect(() => {
    fetchAnimeData();
  }, [currentPage]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prePage = currentPage - 1;
      setCurrentPage(prePage);
    }
  };

  const onLoading = () => setLoading(true);

  // 検索結果表示/で仕切る
  const searchArray = [];
  let searchValue = "";
  if (searchTerm) searchArray.push(searchTerm);
  if (selectedYear) searchArray.push(selectedYear);
  if (selectedSeason) searchArray.push(selectedSeason);
  searchArray.forEach((e, index) => {
    if (index != 0) e = "/" + e;
    searchValue += e;
  });

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.spinner}>
          <CircularProgress />
        </div>
      )}
      {searchTerm ? (
        <h1 className={styles.pageTitle}>Search: {searchValue}</h1>
      ) : (
        <h1 className={styles.pageTitle}>Latest Popular Anime</h1>
      )}
      <div className={styles.cardList}>
        {animes.length > 0
          ? animes.map((anime) => (
              <AnimeCard key={anime?.id} anime={anime} onLoading={onLoading} />
            ))
          : !loading && !firstRender && <p>No anime found</p>}
      </div>
      {!firstRender && (
        <div className={styles.pagination}>
          <div
            className={`${styles.changePageButton} ${
              currentPage === 1 && styles.disabled
            }`}
            onClick={handlePreviousPage}
          >
            <KeyboardArrowLeftIcon />
            <span>Previous</span>
          </div>
          <div className={styles.pageNumber}>Page {currentPage}</div>
          <div className={styles.changePageButton} onClick={handleNextPage}>
            <span>Next</span>
            <KeyboardArrowRightIcon />
          </div>
        </div>
      )}
    </div>
  );
}
