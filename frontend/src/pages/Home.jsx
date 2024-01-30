import React from "react";
import { Link } from "react-router-dom";

//import balloons from "../assets/sociale.jpeg";

const Home = () => {
  return (
    <React.Fragment>
      <div className="card cardHome">
        <div className="card-header">
          <h2>Bienvenue sur Groupomania !</h2>
        </div>
        <div className="card-body">
          <p>
            Groupomania est un réseau social d'entreprise ou vous pourrez
            échanger avec vos collègues !
          </p>
        </div>
        <div className="card-footer">
          <p>
            Déjà inscrit ? {" "}
            <Link id="linkLogin" to="/login">
              Connectez vous !
            </Link>
          </p>
          <p>
            Rejoignez nous{" "}
            <Link id="linkSignup" to="/signup">
              Inscription
            </Link>
          </p>
        </div>
      </div>

      <div className=" text-center">
        <img
          className="img-fluid"
          src=''
          alt=""
        />
      </div>
    </React.Fragment>
  );
};

export default Home;