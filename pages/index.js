import React, { useContext } from "react";
import Axios from "axios";
import moment from "moment";
import Link from "next/link";

export default function Index({ posts }) {
  return (
    <>
      <h2>Home Page</h2>
      <hr />
      <br />
      <div className="row justify-content-center">
        {posts.map((post, index) => {
          return (
            <div className="content col-6 mb-3 mx-2" key={index}>
              <p className="">
                <b>
                  Post No: <span className="text-primary">{post.id}</span>
                </b>
              </p>
              <p className="h5">{post.title.rendered}</p>
              <p className="text-secondary">{moment(post.date).format("LL")}</p>
              <p className="text-end">
                <Link href={"/post/" + post.id}>
                  <a>
                    <button className="btn btn-outline-primary">
                      Read more
                    </button>
                  </a>
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const url = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";
  try {
    const result = await Axios.get(url);
    const posts = result.data;
    return {
      props: {
        posts: posts,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
