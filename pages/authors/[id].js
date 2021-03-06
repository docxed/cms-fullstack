import React from "react";
import Axios from "axios";
import moment from "moment";
import Link from "next/link";

export default function Authors({ thisUser, posts }) {
  return (
    <div>
      <h2>
        {thisUser.name}
        {`'`} post ({posts.filter((raw) => raw.author === thisUser.id).length})
      </h2>
      <hr />
      <br />
      <div className="row">
        {posts
          .filter((raw) => raw.author === thisUser.id)
          .map((post, index) => {
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
    </div>
  );
}

export async function getServerSideProps(context) {
  const params = { id: context.params.id };
  const url = `https://fswd-wp.devnss.com/wp-json/wp/v2/users/${params.id}`;
  const urlPosts = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";
  try {
    let result = await Axios.get(url);
    const thisUser = result.data;
    result = await Axios.get(urlPosts);
    const posts = result.data;
    return {
      props: {
        thisUser,
        posts,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
