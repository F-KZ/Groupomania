import React from "react";

export default function DeleteComment(props) {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const idOfUser = storage.userId;
  const isAdmin = storage.isAdmin;

  const deleteComment = function (e) {
    e.preventDefault();

    const idCommentaire = props.idComment;

    if (props.idUser === idOfUser || isAdmin === 1) {
      if (window.confirm("Voulez vous vraiment supprimer ce commentaire ?")) {
        fetch(
          "http://localhost:4200/api/post/getComment/delete/" + idCommentaire,
          {
            method: "delete",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
          .then(function (res) {
            return res.json();
          })
          .then(function (result) {
            alert(JSON.stringify(result.message));
            props.setCount1(props.count1 + 1);
          })
          .catch(function (error) {
            return error;
          });
      } else {
      }
    } else {
      alert(
        "Vous ne pouvez pas supprimer les commentaires des autres utilisateurs !"
      );
    }
  };

  return (
    <div>
      <button
        onClick={deleteComment}
        type="button"
        className="btn btn-outline-danger d-flex"
      >
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
}
