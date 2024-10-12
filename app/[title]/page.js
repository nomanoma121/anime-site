"use client";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./detailPage.module.css";
import { Rating, Skeleton } from "@mui/material";
import { StayCurrentLandscapeSharp } from "@mui/icons-material";
export default function AnimeDetail({ params }) {
  const { title } = params;
  const decodedTitle = decodeURIComponent(title);
  const [loading, setLoading] = useState(false);
  const [anime, setAnimes] = useState();

  const fetchAnimeData = async () => {
    setLoading(true);
    const query = `
    query {
      Media(search: "${decodedTitle}", type: ANIME) {
        episodes
        genres
        averageScore
        popularity
        siteUrl
        title {
          native
        }
        coverImage {
          extraLarge
        }
        startDate {
          year
          month
          day
        }
        studios {
          nodes {
            name
          }
        }
        format
        relations {
          nodes {
            title {
              native
            }
            coverImage {
              small
            }
          }
        }
        characters(role: MAIN) {
          nodes {
            name {
              native
            }
            image {
              large
              medium
            }
          }
        }
      }
    }
  `;

    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const { data } = await response.json();
      setAnimes(data?.Media);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  // アニメの放送データ
  const startYear = parseInt(anime?.startDate.year) ? anime.startDate.year : "";
  const startMonth = parseInt(anime?.startDate?.month)
    ? anime.startDate.month
    : "";
  const startDay = parseInt(anime?.startDate?.day) ? anime.startDate.day : "";
  // 曜日取得用
  const date = new Date(`${startYear}-${startMonth}-${startDay}`);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeek = startDay == "" ? "" : days[date.getDay()];
  const schedule =
    startYear == ""
      ? "未定"
      : startYear +
        "年" +
        startMonth +
        "月" +
        startDay +
        "日" +
        `(${dayOfWeek})` +
        "  ～  ";

  const studio =
    anime?.studios?.nodes?.length == 0
      ? "未定"
      : anime?.studios?.nodes.map((e) => e.name + ", ");
  const format = anime?.format ? anime.format : "未定";
  const episodes = anime?.episodes ? anime.episodes + "話" : "未定";
  const mainCharacters = anime?.characters.nodes?.slice(0, 5);
  const averageScore =
    anime?.averageScore !== undefined ? anime?.averageScore : 0;
  const rating = averageScore / 20;

  return (
    <div style={{minHeight: "700px"}}>
      {loading ? (
        <div className={styles.spinner}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img
              src={anime?.coverImage.extraLarge}
              className={styles.animeImage}
            />
          </div>
          <div className={styles.detailContainer}>
            <h1 className={styles.title}>{anime?.title.native}</h1>

            <div>
              <div className={styles.reviewContainer}>
                <Rating readOnly value={rating} precision={0.5} />

                <h3 className={styles.popularity}>POPULARITY:</h3>

                <p className={styles.popularityValue}>{anime?.popularity}</p>
              </div>
            </div>
            <div className={styles.genres}>
              {anime?.genres.map((e) => (
                <div key={e} className={styles.genre}>
                  {e}
                </div>
              ))}
            </div>
            <>
              <div className={styles.details}>
                <h3 className={styles.detailTitle}>形式:</h3>
                <p className={styles.detail}>{format}</p>
              </div>
              <div className={styles.details}>
                <h3 className={styles.detailTitle}>放送:</h3>
                <p className={styles.detail}>{schedule}</p>
              </div>
              <div className={styles.details}>
                <h3 className={styles.detailTitle}>話数:</h3>
                <p className={styles.detail}>{episodes}</p>
              </div>
              <div className={styles.details}>
                <h3 className={styles.detailTitle}>制作スタジオ:</h3>
                <p className={styles.detail}>{studio?.slice(0, 3)}</p>
              </div>
            </>
            <h3 className={styles.characterTitle}>メインキャラクター</h3>

            <div className={styles.characters}>
              {mainCharacters?.map((e, index) => (
                <div
                  className={styles.characterDetail}
                  key={`container${index}`}
                >
                  <img
                    src={e.image.medium}
                    key={index}
                    className={styles.characterImage}
                  />
                  <h3 key={e.name.native} className={styles.characterName}>
                    {e.name.native}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
