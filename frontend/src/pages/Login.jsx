import React from "react";
import AuthApi from "../components/utils/AuthApi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";

export default function Login() {
  const Auth = React.useContext(AuthApi);
  const { register, handleSubmit } = useForm();

  const onSubmit = function (data) {
    fetch("http://localhost:4200/api/users/login", {
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
        localStorage.setItem("token", JSON.stringify(result));
        let storage = JSON.parse(localStorage.getItem("token"));
        if (storage.token === undefined) {
          Auth.setAuth(false);
          alert(JSON.stringify(result.message));
        } else {
          Auth.setAuth(true);
          Cookie.set("user", "true", { expires: 0.3 });
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-signin"
      id="formLogin"
    >
      <h1 className="h3 mb-3 fw-normal">Veuillez vous connecter</h1>
      <div className="form-floating mb-2">
        <input
          autoFocus
          required
          type="email"
          className="form-control"
          name="email"
          {...register("email")}
        />
        <label htmlFor="floatingInput">Adresse email</label>
      </div>

      <div className="form-floating">
        <input
          required
          type="password"
          className="form-control"
          name="password"
          {...register("password")}
        />
        <label htmlFor="floatingPassword">Mot de passe</label>
      </div>

      <button className="mt-2 w-100 btn btn-lg btn-primary" type="submit">
        Se connecter{" "}
      </button>
      <div className="mt-3 text-end">
        <p>Vous n'avez pas encore de compte ? </p>
        <Link to="/signup">
          <button className="btn btn-outline-danger">S'inscrire</button>
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