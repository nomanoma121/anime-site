"use client";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import styles from "./detailPage.module.css";
import Rating from "@mui/material/Rating";

export default async function AnimeDetail({ params }) {
  const { title } = params;
  const decodedTitle = decodeURIComponent(title);

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
              large
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

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();
  const anime = data?.Media;

  const schedule =
    anime?.startDate.year +
    "年" +
    anime?.startDate.month +
    "月" +
    anime?.startDate.day +
    "日 ～ ";
  const studio = anime?.studios.nodes?.map((e) => e.name + ", ");
  const mainCharacters = anime?.characters.nodes?.slice(0, 5);
  const averageScore =
    anime?.averageScore !== undefined ? anime?.averageScore : 0;
  const rating = averageScore / 20;

  return (
    <>
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
          <div className={styles.details}>
            <h3 className={styles.detailTitle}>形式:</h3>
            <p className={styles.detail}>{anime?.format}</p>
          </div>
          <div className={styles.details}>
            <h3 className={styles.detailTitle}>放送:</h3>
            <p className={styles.detail}>{schedule}</p>
          </div>
          <div className={styles.details}>
            <h3 className={styles.detailTitle}>話数:</h3>
            <p className={styles.detail}>{anime?.episodes}話</p>
          </div>
          <div className={styles.details}>
            <h3 className={styles.detailTitle}>制作スタジオ:</h3>
            <p className={styles.detail}>{studio?.slice(0, 3)}</p>
          </div>
          <h3 className={styles.characterTitle}>メインキャラクター</h3>
          <div className={styles.characters}>
            {mainCharacters?.map((e, index) => (
              <div className={styles.characterDetail} key={`container${index}`}>
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
          <div>
            <a></a>
          </div>
        </div>
      </div>
    </>
  );
}
