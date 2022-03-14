import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/index.css";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoriesContext from "../src/context/CategoriesContext";
import Categories from "../src/data/categories";
import TagsContext from "../src/context/TagsContext";
import Tags from "../src/data/tags";
import Router from "next/router";
import "../assets/css/loaders.css";
import Nprogress from "nprogress";

export default function _app({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
  }, []);
  Router.events.on("routeChangeStart", (url) => {
    Nprogress.start();
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    Nprogress.done();
    setLoading(false);
  });
  return (
    <>
      <Head>
        <title>CMS System</title>
        {/* Responsive meta tag */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <CategoriesContext.Provider value={Categories}>
        <TagsContext.Provider value={Tags}>
          <Navbar />
        </TagsContext.Provider>
      </CategoriesContext.Provider>
      <div className="container" style={{ marginTop: 80, marginBottom: 50 }}>
        {loading && <div id="loader"></div>}
        <Component {...pageProps} />
      </div>
    </>
  );
}
