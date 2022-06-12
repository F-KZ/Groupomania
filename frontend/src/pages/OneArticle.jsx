import React, { useState } from "react";
import GetComments from "../components/GetComments";
import GetOneArticle from "../components/GetOneArticle";
import PostComment from "../components/PostComment";

export default function OneArticle() {
  const [comment, setComment] = useState(0);

  return (
    <>
      <GetOneArticle />
      <GetComments comment1={comment} />
      <PostComment comment1={comment} setComment1={setComment} />
    </>
  );
}
