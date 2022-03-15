import React, { useContext } from "react";
import Axios from "axios";
import moment from "moment";
import Link from "next/link";

export default function Index({ posts }) {
  return (
    <>
      <h2>All posts ({posts.length})</h2>
      <hr />
      <br />
      <div className="row">
        {posts.map((post, index) => {
          return (
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3" key={index}>
              <div className="content h-100">
                <p>
                  <b>
                    Post No: <span className="text-primary">{post.id}</span>
                  </b>
                </p>
                <p className="h5">{post.title.rendered}</p>
                <p className="text-secondary">
                  {moment(post.date).format("LL")}
                </p>
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
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
