import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateArticle(props) {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;
  let firstName = storage.firstName;
  let lastName = storage.lastName;
  let image = storage.imageUrl;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = function (data, e) {
    let fd = new FormData();

    fd.append("title", data.title);
    fd.append("content", data.content);
    fd.append("image", data.image[0]);
    fd.append("attachment", data.attachment);

    axios
      .post("http://localhost:4200/api/post/article", fd, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(function (res) {
        alert(res.data.message);
        props.setArticle1(props.article1 + 1);
        reset();
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-signin"
      id="formCreateArticle"
    >
      <h2 className="h3 mb-3 fw-normal">Partager un nouvel article</h2>
      <div className="d-flex mb-2 align-items-center">
        <img
          src={image}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px",
          }}
          alt="la miniature de l'avatar de l'utilisateur"
        />
        <h5>{firstName + " " + lastName}</h5>
      </div>

      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control formTitle"
          name="title"
          {...register("title", { required: true, minLength: 2 })}
        />
        {errors.title && (
          <p className="text-center text-danger mt-1">
            Le titre ne peut pas être vide !
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Titre de votre post</label>
      </div>

      <div className="form-floating">
        <textarea
          type="text"
          className="form-control formContent"
          name="content"
          {...register("content", { required: true, minLength: 2 })}
        />
        {errors.content && (
          <p className="text-center text-danger mt-1">
            Le contenu ne peut pas être vide!
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Contenu</label>
      </div>

      <div className="mt-2">
        <input
          className="form-control file"
          type="file"
          name="image"
          {...register("image")}
        />
      </div>

      <div className="form-floating mb-2 mt-2">
        <input
          type="text"
          className="form-control formAttachment"
          name="attachment"
          {...register("attachment")}
        />
        <label htmlFor="floatingInput">Lien de l'article</label>
      </div>

      <button
        className="w-100 btn btn-lg btn-primary mb-5 btnArticle"
        type="submit"
      >
        Poster{" "}
      </button>
    </form>
  );
}
