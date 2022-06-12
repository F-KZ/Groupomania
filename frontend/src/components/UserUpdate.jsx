import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import UserDelete from "./UserDelete";

export default function UserUpdate() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const [count, setCount] = useState(0);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(
    function data() {
      fetch("http://localhost:4200/api/users/getuser", {
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
          setFirstName(result.firstName);
          setLastName(result.lastName);
          setImage(result.imageUrl);
          if (result.bio === null) {
            setBio("");
          } else {
            setBio(result.bio);
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    [token, count]
  );

  const onSubmit = function () {
    let fd = new FormData();

    fd.append("image", document.querySelector(".file").files[0]);
    fd.append("firstName", firstName);
    fd.append("lastName", lastName);
    fd.append("bio", bio);

    axios
      .post("http://localhost:4200/api/users/userUpdate", fd, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(function (res) {
        alert(res.data.message);
        setCount(count + 1);
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-signin"
      id="formUser"
    >
      <h2 className="text-center">Modifier mon profil</h2>
      <div className="text-center">
        <img
          src={image}
          alt="avatar d'un membre de Groupomania"
          style={{ width: 150, height: 150 }}
        />
      </div>
      <div className="mb-3 text-left">
        <label htmlFor="formFile" className="form-label">
          <strong>Avatar</strong>
        </label>
        <input className="form-control file" type="file" name="image" />
      </div>

      <div className="form-floating mb-2">
        <input
          required
          autoFocus
          type="text"
          className="form-control"
          value={firstName}
          onChange={function (e) {
            setFirstName(e.target.value);
          }}
        />
        {errors.firstName && (
          <p className="text-center text-danger mt-1">
            Le prénom ne doit contenir que des lettres !
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Prénom</label>
      </div>

      <div className="form-floating mb-2">
        <input
          required
          type="text"
          className="form-control"
          value={lastName}
          onChange={function (e) {
            setLastName(e.target.value);
          }}
        />
        {errors.lastName && (
          <p className="text-center text-danger mt-1">
            Le nom ne doit contenir que des lettres !
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Nom</label>
      </div>

      <div className="form-floating mb-2">
        <textarea
          type="text"
          className="form-control formBio"
          value={bio}
          onChange={function (e) {
            setBio(e.target.value);
          }}
        />
        <label htmlFor="floatingPassword">Votre bio</label>
      </div>

      <div className="d-lg-flex justify-content-evenly text-center mt-4 mb-3">
        <button className="btn btn-lg btn-primary btnUser mb-2" type="submit">
          Modifier{" "}
        </button>
        <UserDelete />
      </div>
    </form>
  );
}
