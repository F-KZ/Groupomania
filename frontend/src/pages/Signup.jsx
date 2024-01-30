import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Signup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [redirect, setRedirect] = useState(false);

  const onSubmit = async function (data) {
    await fetch("http://localhost:4200/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.sqlMessage);
        } else {
          setRedirect(true);
          alert("Vous pouvez dès à present vous connectez !");
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  if (redirect === true) {
    return <Redirect to="/login" />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-signin"
      id="formSignup"
    >
      <h1 className="h3 mb-3 fw-normal">Inscrivez vous dès maintenant</h1>
      <div className="form-floating mb-2">
        <input
          autoFocus
          required
          type="text"
          className="form-control"
          name="firstName"
          {...register("firstName", {
            minLength: 2,
            maxLength: 26,
            pattern: /[a-zA-ZÀ-ÿ]/,
          })}
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
          name="lastName"
          {...register("lastName", {
            minLength: 2,
            maxLength: 26,
            pattern: /[a-zA-ZÀ-ÿ]/,
          })}
        />
        {errors.lastName && (
          <p className="text-center text-danger mt-1">
            Le nom ne doit contenir que des lettres !
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Nom</label>
      </div>
      <div className="form-floating mb-2">
        <input
          required
          type="email"
          className="form-control"
          name="email"
          {...register("email", {
            minLength: 5,
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
          })}
        />
        <label htmlFor="floatingInput">Adresse email</label>
        {errors.email && (
          <p className="text-center text-danger mt-1">
            Entrer une adresse email valide !
          </p>
        )}
      </div>
      <div className="form-floating mb-2">
        <input
          required
          type="password"
          className="form-control"
          name="password"
          {...register("password", {
            minLength: 8,
          })}
        />
        {errors.password && (
          <p className="text-center text-danger mt-1">
            Attention: Votre mot de passe doit contenir au moins 8 caractères !
          </p>
        )}
        <label htmlFor="floatingPassword">Mot de passe</label>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        S'inscrire{" "}
      </button>
      <div className="mt-3 text-end">
        <p> Vous avez déja un compte ?</p>
        <Link to="/login">
          {" "}
          <button className="btn btn-outline-danger">Connectez vous</button>
        </Link>
      </div>
      <div className="mt-3 text-end">
        <p>Retour à l'accueil</p>
        <Link to="/">
          <button className="btn btn-outline-success">
            <i className="bi bi-arrow-90deg-left"></i>
          </button>
        </Link>
      </div>
    </form>
  );
}