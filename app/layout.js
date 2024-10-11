import "./global.css";
import Header from "./components/Header";
import { SearchProvider } from "./context/SearchContext"; // 追加

export const metadata = {
  title: "Anime List",
  description: "A list of popular anime.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F5E2FF" }}>
        <SearchProvider>
          {" "}
          {/* SearchProviderで全体をラップ */}
          <Header />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
