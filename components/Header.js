
import React from 'react';
import styles from './Header.module.css';
import { changeYear, changeSeason } from "../app/page"

function Header() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1940 + 4 }, (_, i) => 1940 + i);
  years.reverse();

  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>AnimeList</h1>
      <input className={styles.input} placeholder="Search anime..." />
      <select className={styles.select} >
        <option>Any</option>
        {years.map((e) => (
          <option key={e} value={e}>{e}年</option>
        ))}
      </select>
      <select className={styles.select} >
        <option >Any</option>
        <option value="SPRING">Spring</option>
        <option value="SUMMER">Summer</option>
        <option value="FALL">Fall</option>
        <option value="WINTER">Winter</option>
      </select>
    </div>
  )
}

export default Header