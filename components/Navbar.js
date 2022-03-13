import React, { useContext, useState } from "react";
import Link from "next/link";
import CategoriesContext from "../src/context/CategoriesContext";
import TagsContext from "../src/context/TagsContext";

export default function Navbar() {
  const [cats, setCats] = useState([]);
  const [tags, setTags] = useState([]);
  const categories = useContext(CategoriesContext);
  const tagss = useContext(TagsContext);
  categories.then((res) => {
    setCats(res);
  });
  tagss.then((res) => {
    setTags(res);
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">CMS System</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse text-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {cats.map((value, index) => {
                    return (
                      <li key={index}>
                        <Link href={"/categories/" + value?.id}>
                          <a className="dropdown-item">{value?.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tags
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {tags.map((value, index) => {
                    return (
                      <li key={index}>
                        <Link href={"/tags/" + value?.id}>
                          <a className="dropdown-item">{value?.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/comments">
                  <a className="nav-link">Comments</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/authors">
                  <a className="nav-link">Authors</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
