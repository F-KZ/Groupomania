import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function PostComment(props) {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const { id } = useParams();
  const nameUser = storage.firstName + " " + storage.lastName;
  const idOfUser = storage.userId;

  const [comment, setComment] = useState("");

  const { handleSubmit } = useForm();

  const onSubmit = function (e) {

    const data = { idOfUser, id, comment };

    fetch("http://localhost:4200/api/post/postComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        alert(result.message);
        props.setComment1(props.comment1 + 1);
        setComment("")
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formGetArticles card mt-3 mb-5"
      style={{ width: "45%" }}
    >
      <div className="card-header">
        <h6>{nameUser}</h6>
      </div>
      <div className="card-body">
        <textarea
          required
          value={comment}
          className="form-control"
          style={{ height: "100px" }}
          onChange={function (e) {
            setComment(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button className="btn btn-primary btn-sm">Commenter</button>
      </div>
    </form>
  );
}
