import "./global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SearchProvider } from "./context/SearchContext";
import Head from "next/head";

export const metadata = {
  title: "Anime List",
  description: "A list of popular anime.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" /> 
      </Head>
      <body
        style={{
          backgroundColor: "#F5E2FF",
        }}
      >
        <SearchProvider>
          <Header />
          {children}
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
