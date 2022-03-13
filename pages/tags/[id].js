import React from "react";
import Axios from "axios";
import moment from "moment";
import Link from "next/link";

export default function categories({ thisTags, posts }) {
  return (
    <div>
      <h2>
        <span className="badge rounded-pill bg-primary position-relative">
          {thisTags.name}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {posts.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </span>
      </h2>
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
    </div>
  );
}

export async function getStaticProps({ params }) {
  async function findPost(tagId) {
    let res = await Axios.get("https://fswd-wp.devnss.com/wp-json/wp/v2/posts");
    let resultPosts = [];
    res.data.forEach((post) => {
      post.tags.forEach((raw) => {
        if (raw === tagId) {
          resultPosts.push(post);
        }
      });
    });
    return resultPosts;
  }
  const url = `https://fswd-wp.devnss.com/wp-json/wp/v2/tags/${params.id}`;
  try {
    const result = await Axios.get(url);
    const thisTags = result.data;
    const posts = await findPost(thisTags.id);
    return {
      props: {
        thisTags,
        posts,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticPaths() {
  const url = "https://fswd-wp.devnss.com/wp-json/wp/v2/tags";
  try {
    const result = await Axios.get(url);
    const tags = result.data;
    const paths = tags.map((tag) => {
      return { params: { id: tag.id.toString() } };
    });
    return {
      paths,
      fallback: false, // false or 'blocking'
    };
  } catch (error) {
    console.log(error);
  }
}
