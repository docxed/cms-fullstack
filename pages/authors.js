import React from "react";
import Axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Authors({ authors, posts }) {
  return (
    <div>
      <h2>Authors</h2>
      <hr />
      <br />
      {authors.map((author, index) => {
        return (
          <div className="content col-6 mb-3 mx-auto" key={index}>
            <p>
              <b>
                ID: <span className="text-primary">{author.id}</span>
              </b>
            </p>
            <p>Name: {author.name}</p>
            <div>
              {author.name}
              {`'`} post:
              {posts
                .filter((raw) => raw.author === author.id)
                .map((post, index) => {
                  return (
                    <Link key={index} href={"/post/" + post.id}>
                      <a>
                        <span>
                          <span className="badge bg-success mx-1">
                            {post.id}
                          </span>
                        </span>
                      </a>
                    </Link>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const url = "https://fswd-wp.devnss.com/wp-json/wp/v2/users";
  const urlPosts = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";
  try {
    let result = await Axios.get(url);
    const authors = result.data;
    result = await Axios.get(urlPosts);
    const posts = result.data;
    return {
      props: {
        authors,
        posts,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
