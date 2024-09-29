export default function AnimeDetail({ params }) {
  const { title } = params;
  const decodedTitle = decodeURIComponent(title);

  return (
    <div>
      <h1>{decodedTitle}</h1> {/* デコードされたタイトルを表示 */}
      {/* ここに詳細情報を表示するためのコードが入ります */}
    </div>
  );
}
