import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/index.css";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoriesContext from "../src/context/CategoriesContext";
import Categories from "../src/data/categories";
import TagsContext from "../src/context/TagsContext";
import Tags from "../src/data/tags";

export default function _app({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
  }, []);
  return (
    <>
      <Head>
        <title>CMS System</title>
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CategoriesContext.Provider value={Categories}>
        <TagsContext.Provider value={Tags}>
          <Navbar />
        </TagsContext.Provider>
      </CategoriesContext.Provider>
      <div className="container" style={{ marginTop: 80, marginBottom: 50 }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
