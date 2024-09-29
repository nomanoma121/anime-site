import React from 'react'
import Link from "next/link"

function AnimeCard({ anime }) {
  return (
    <div>
      <img src={anime.coverImage.large}/>
      <h1>{anime.title.native}</h1>
      <div>
        <Link href={`/${anime.title.native}`}>View Detail</Link>
      </div>
    </div>
  )
}

export default AnimeCard