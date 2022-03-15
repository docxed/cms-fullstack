import React from "react";
import Axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Authors({ authors, posts }) {
  return (
    <div>
      <h2>All authors ({authors.length})</h2>
      <hr />
      <br />
      <div className="row">
        {authors.map((author, index) => {
          return (
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3" key={index}>
              <div className="content h-100">
                <div>
                  <Image
                    className="rounded-circle"
                    src={author.avatar_urls[`96`]}
                    alt="logo"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="ps-2 mt-2">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
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
