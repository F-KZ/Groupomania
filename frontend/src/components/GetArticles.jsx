import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/fr";

export default function GetArticles(props) {
  const storage = JSON.parse(localStorage.getItem("token"));
  const token = "Bearer " + storage.token;

  const [articles, setArticles] = useState();

  useEffect(
    function () {
      fetch("http://localhost:4200/api/post", {
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
          setArticles(result[0]);
          window.scroll(0, 300);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token, props.article1]
  );

  if (articles === undefined) {
    return <div>Chargement...</div>;
  } else {
    return articles.map(function (article, index) {
      return (
        <div
          className="formGetArticles card mb-5"
          key={`${article.id}-${index}`}
        >
          <div className="card-header d-flex justify-content-between">
            <span className="d-flex align-items-center">
              <img
                src={article.imageUrl}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
                alt="la miniature de l'avatar de l'utilisateur"
              />
              <h5 className="m-0">
                {article.firstName + " " + article.lastName}
              </h5>
            </span>
            <Link to={`/article/${article.id}`}>
              <button type="button" className="btn btn-outline-primary d-flex">
                <i className="bi bi-plus-lg"></i>
              </button>
            </Link>
          </div>
          <div className="card-body text-center">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.content} </p>
            {article.postImage ? (
              <img
                src={article.postImage}
                alt={article.postImage}
                style={{
                  width: "80%",
                  height: "auto",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <></>
            )}
            <a
              href={article.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="card-text d-block mt-2"
            >
              {article.attachment}
            </a>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between">
            <p className="mb-0">
              <Moment fromNow>{article.createdAt}</Moment>
            </p>
            <Link
              to={`/article/${article.id}`}
              className="justify-self-center"
              style={{ color: "black" }}
            >
              <h6>{article.comments} commentaires</h6>
            </Link>
          </div>
        </div>
      );
    });
  }
}
