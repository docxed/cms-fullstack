import React from "react";
import Axios from "axios";
import moment from "moment";
import Link from "next/link";

export default function Comments({ comments }) {
  return (
    <>
      <h2>All post comments ({comments.length})</h2>
      <hr />
      <br />
      <div className="row">
        {comments.map((comment, index) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={index}>
              <div className="content h-100">
                <div
                  dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                ></div>
                <div
                  className="text-end text-secondary"
                  style={{ fontSize: 13 }}
                >
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
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
