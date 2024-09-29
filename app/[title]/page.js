export default async function AnimeDetail({ params }) {
  const { title } = params;
  const decodedTitle = decodeURIComponent(title);

  const query = `
    query {
      Media(search: "${decodedTitle}") {
        siteUrl
        title {
          native
        }
        coverImage {
          large
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
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();
  const anime = data?.Media;

  return (
    <div>
      <h1>{anime.title.native}</h1>
    </div>
  );
}
