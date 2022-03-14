import React, { useState } from "react";
import Axios from "axios";
import moment from "moment";
import Link from "next/link";

export default function Post({ post, author, categories, tags, comments }) {
  const [ccoms, setCcoms] = useState([]);
  const [mind, setMind] = useState("");
  const sending = (event) => {
    if (!mind) return;
    let old = ccoms;
    old.push({
      post: post.id,
      content: {
        rendered: mind,
      },
      author_name: "guest",
      date: new Date(),
    });
    old.reverse();
    setCcoms(old);
    setMind("");
  };
  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <hr />
      <br />
      <p>
        Author:{" "}
        <Link href={"/authors/" + author.id}>
          <a>
            <span>
              <span className="badge bg-success mx-1">{author.name}</span>
            </span>
          </a>
        </Link>
      </p>
      <p>Date: {moment(post.date).format("LL")}</p>
      <p>
        Categories:
        {categories.map((value, index) => {
          return (
            <Link key={index} href={/categories/ + value.id}>
              <a>
                <span>
                  <span className="badge bg-primary mx-1">{value.name}</span>
                </span>
              </a>
            </Link>
          );
        })}
      </p>
      <p>
        Tags:
        {tags.map((value, index) => {
          return (
            <Link key={index} href={/tags/ + value.id}>
              <a>
                <span>
                  <span className="badge bg-info mx-1">{value.name}</span>
                </span>
              </a>
            </Link>
          );
        })}
      </p>
      <hr />
      <br />
      <div
        className="px-5"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      ></div>
      <br />
      <br />
      <h2>Send Comment</h2>
      <hr />
      <br />

      <div className="row g-2">
        <div className="col-auto"></div>
        <div className="col-6 ms-auto">
          <input
            type="text"
            className="form-control mb-2"
            value={mind}
            placeholder="comment..."
            onChange={(e) => setMind(e.target.value)}
            required
          />
        </div>
        <div className="col-auto me-auto">
          <input
            type="button"
            onClick={sending}
            className="btn btn-primary"
            value={"Send"}
          />
        </div>
      </div>

      <br />
      {ccoms.length !== 0 ? (
        <div>
          {ccoms.map((value, index) => {
            return (
              <div className="content mb-3" key={index}>
                <div
                  dangerouslySetInnerHTML={{ __html: value.content.rendered }}
                ></div>
                <div
                  className="text-end text-secondary"
                  style={{ fontSize: 13 }}
                >
                  <b>{value.author_name}</b> <br />
                  {moment(value.date).format("LL")}{" "}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}

      {comments.map((value, index) => {
        return (
          <div className="content mb-3" key={index}>
            <div
              dangerouslySetInnerHTML={{ __html: value.content.rendered }}
            ></div>
            <div className="text-end text-secondary" style={{ fontSize: 13 }}>
              <b>{value.author_name}</b> <br />
              {moment(value.date).format("LL")}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export async function getStaticProps({ params }) {
  async function findAuthor(authorId) {
    let res = await Axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/users/${authorId}`
    );
    return res.data;
  }

  async function findCategories(categories) {
    let res = await Axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/categories`
    );
    let resultCategories = [];
    categories.forEach((category) => {
      res.data.forEach((raw) => {
        if (category === raw.id) {
          resultCategories.push(raw);
        }
      });
    });
    return resultCategories;
  }

  async function findTags(tags) {
    let res = await Axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/tags`);
    let resultTags = [];
    tags.forEach((tag) => {
      res.data.forEach((raw) => {
        if (tag === raw.id) {
          resultTags.push(raw);
        }
      });
    });
    return resultTags;
  }

  async function findComments(postId) {
    let res = await Axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/comments`
    );
    let resultComments = res.data.filter((raw) => raw.post === postId);
    return resultComments;
  }

  try {
    const result = await Axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${params.id}`
    );
    const post = result.data;
    const author = await findAuthor(post.author);
    const categories = await findCategories(post.categories);
    const tags = await findTags(post.tags);
    const comments = await findComments(post.id);

    return {
      props: {
        post,
        author,
        categories,
        tags,
        comments,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticPaths() {
  const url = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";
  try {
    const result = await Axios.get(url);
    const posts = result.data;
    const paths = posts.map((post) => {
      return { params: { id: post.id.toString() } };
    });
    return {
      paths,
      fallback: false, // false or 'blocking'
    };
  } catch (error) {
    console.log(error);
  }
}
