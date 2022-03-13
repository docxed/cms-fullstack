import React from "react";
import Axios from "axios";
import moment from "moment";
import Link from "next/link";

export default function Comments({ comments }) {
  return (
    <>
      <h2>Comments Page</h2>
      <hr />
      <br />
      {comments.map((comment, index) => {
        return (
          <div className="content mb-3 col-6 mx-auto" key={index}>
            <div
              dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
            ></div>
            <div className="text-end text-secondary" style={{ fontSize: 13 }}>
              <b>{comment.author_name}</b> <br />
              {moment(comment.date).format("LL")}{" "}
            </div>
            <p className="text-center mt-3">
              <Link href={"/post/" + comment.post}>
                <a>
                  <button className="btn btn-outline-primary">
                    Go to post
                  </button>
                </a>
              </Link>
            </p>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const url = "https://fswd-wp.devnss.com/wp-json/wp/v2/comments";
  try {
    const result = await Axios.get(url);
    const comments = result.data;
    return {
      props: {
        comments,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
