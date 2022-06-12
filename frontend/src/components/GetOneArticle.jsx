import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Moment from "react-moment";

export default function GetOneArticle() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const idOfUser = storage.userId;
  const isAdmin = storage.isAdmin;
  const { id } = useParams();

  const [dataArticle, setDataArticle] = useState();

  useEffect(
    function () {
      fetch("http://localhost:4200/api/post/" + id, {
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
          setDataArticle(result[0]);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token, id]
  );

  const history = useHistory();
  const handler = function () {
    history.push("/articles");
  };

  const deleteArticle = function (e) {
    e.preventDefault();
    if (isAdmin === 1 || idOfUser === dataArticle.userId) {
      if (
        window.confirm("Voulez vous vraiment supprimer cette publication ?")
      ) {
        fetch("http://localhost:4200/api/post/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (result) {
            alert(JSON.stringify(result.message));
            handler();
          })
          .catch(function (error) {
            return error;
          });
      } else {
      }
    } else {
      alert(
        "Vous ne pouvez pas supprimer les publications d'autres utilisateurs !"
      );
    }
  };

  if (dataArticle === undefined) {
    return <div>Chargement . . .</div>;
  } else {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          <h5>Retour aux publications</h5>

          <Link to="/articles">
            <button className="btn btn-outline-primary mx-3">
              <i className="bi bi-arrow-90deg-left"></i>
            </button>
          </Link>
        </div>
        <div
          className="formGetArticles card mt-4"
          style={{ minHeight: "200px" }}
        >
          <div className="card-header d-flex justify-content-between align-middle">
            <span className="d-flex align-items-center">
              <img
                src={dataArticle.imageUrl}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
                alt="la miniature de l'avatar de l'utilisateur"
              />
              <h6>{dataArticle.firstName + " " + dataArticle.lastName}</h6>
            </span>
            <button
              onClick={deleteArticle}
              type="button"
              className="btn btn-outline-danger d-flex"
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
          <div className="card-body text-center">
            <h5 className="card-title">{dataArticle.title}</h5>
            <p className="card-text">{dataArticle.content} </p>
            {dataArticle.postImage ? (
              <img
                src={dataArticle.postImage}
                alt={dataArticle.postImage}
                style={{ width: "60%", height: "100%" }}
              />
            ) : (
              <></>
            )}
            <a
              href={dataArticle.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="card-text d-block mt-2"
            >
              {dataArticle.attachment}
            </a>
          </div>
          <div className="card-footer d-flex justify-content-start">
            <p className="mb-0">
              {" "}
              <Moment fromNow>{dataArticle.createdAt}</Moment>
            </p>
          </div>
        </div>
      </>
    );
  }
}
