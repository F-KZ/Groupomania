import React, { useEffect, useState } from "react";
import Moment from "react-moment";

export default function UserArticles() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const [articles, setArticles] = useState([]);

  useEffect(
    function () {
      fetch("http://localhost:4200/api/users/UserArticles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (result) {
          setArticles(result);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token]
  );

  if (articles === undefined) {
    return <div>Chargement ...</div>;
  } else {
    return articles.map(function (article, index) {
      return (
        <div
          className="formGetArticles card mb-5"
          key={`${article.id}-${index}`}
        >
          <div className="card-header d-flex justify-content-between align-middle">
            <h6 className="mt-auto">
              {article.firstName + " " + article.lastName}
            </h6>
          </div>
          <div className="card-body text-center">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.content} </p>
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.imageUrl}
                style={{ width: "60%", height: "100%" }}
              />
            ) : (
              <></>
            )}{" "}
            <a
              href={article.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="card-text"
            >
              {article.attachment}
            </a>
          </div>
          <div className="card-footer text-center">
            <p className="mb-0">
              <Moment fromNow>{article.createdAt}</Moment>
            </p>
          </div>
        </div>
      );
    });
  }
}
