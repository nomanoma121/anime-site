"use client";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const { updateSearchTerm, updateYear, updateSeason } =
    useContext(SearchContext);
  const [input, setInput] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 4 },
    (_, i) => 2000 + i
  );
  years.reverse();

  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      updateSearchTerm(input);
      router.push("/");
    }
  };

  const handleYearChange = (e) => {
    updateYear(e.target.value);
    router.push("/");
  };

  const handleSeasonChange = (e) => {
    updateSeason(e.target.value);
    router.push("/");
  };
  
  const backHome = () => {
    updateSeason(null);
    updateSearchTerm(null);
    updateYear(null);
    router.push("/");
  }

  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle} onClick={() => backHome()}>AnimeList</h1>
      <input
        className={styles.input}
        placeholder="Search anime..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleSearch}
      />
      <select className={styles.select} onChange={handleYearChange}>
        <option value="">Any</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}年
          </option>
        ))}
      </select>
      <select className={styles.select} onChange={handleSeasonChange}>
        <option value="">Any</option>
        <option value="SPRING">Spring</option>
        <option value="SUMMER">Summer</option>
        <option value="FALL">Fall</option>
        <option value="WINTER">Winter</option>
      </select>
    </div>
  );
}

export default Header;
