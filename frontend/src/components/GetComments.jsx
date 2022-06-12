import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import DeleteComment from "./DeleteComment";

export default function GetComments(props) {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const { id } = useParams();
  const [result, setResult] = useState();
  const [count, setCount] = useState(0);

  useEffect(
    function () {
      fetch("http://localhost:4200/api/post/getComment/" + id, {
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
          setResult(result);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token, id, props.comment1, count]
  );

  if (result === undefined) {
    return <div>Chargement . . .</div>;
  } else {
    return (
      <div>
        {result.map(function (result, index) {
          return (
            <div
              key={`${result.id}-${index}`}
              className="formGetArticles card mt-3 mb-3"
              style={{ width: "45%" }}
            >
              <div className="card-header d-flex justify-content-between">
                <span className="d-flex align-items-center">
                  <img
                    src={result.imageUrl}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                    alt="la miniature de l'avatar de l'utilisateur"
                  />
                  <h6 className="">
                    {result.firstName + " " + result.lastName}
                  </h6>
                </span>
                <DeleteComment
                  idUser={result.userId}
                  idComment={result.id}
                  count1={count}
                  setCount1={setCount}
                />
              </div>
              <div className="card-body text-center">
                <p className="card-text">{result.message} </p>
              </div>
              <div className="card-footer text-center">
                <p className="mb-0">
                  {" "}
                  <Moment fromNow>{result.createdAt}</Moment>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
