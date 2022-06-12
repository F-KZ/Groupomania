import React, { useState } from "react";
import BannerUsers from "../components/BannerUsers";
//import components
import CreateArticle from "../components/CreateArticle";
import GetArticles from "../components/GetArticles";

export default function Articles() {
  const [articles, setArticles] = useState(0);

  return (
    <div>
      <div className="bannerUsers">
        <BannerUsers />
      </div>
        <CreateArticle article1={articles} setArticle1={setArticles} />
        <GetArticles article1={articles} />
    </div>
  );
}
