import React from "react";
import { Link } from "react-router-dom";

import balloons from "../assets/homeBalloons.png";

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
            Si vous avez déja un compte,{" "}
            <Link id="linkLogin" to="/login">
              connectez vous !
            </Link>
          </p>
          <p>
            Si vous souhaitez vous inscrire{" "}
            <Link id="linkSignup" to="/signup">
              c'est par la !
            </Link>
          </p>
        </div>
      </div>

      <div className=" text-center">
        <img
          className="img-fluid"
          src={balloons}
          alt="Des personnages type cartoon pour embellir la page accueil du site"
        />
      </div>
    </React.Fragment>
  );
};

export default Home;
