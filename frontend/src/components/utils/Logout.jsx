import React from "react";
import Cookie from "js-cookie";

export default function Logout() {
  function logout() {
    Cookie.remove("user");
    localStorage.clear();
    window.location.reload();
  }

  return (
    <a href="/#" className="nav-link mx-3" onClick={logout}>
      Se déconnecter
    </a>
  );
}
