const db = require("../config_db");
const jwt = require("jsonwebtoken");

exports.getAllPost = function (req, res, next) {
  db.promise()
    .query(
      `SELECT user.firstName, user.lastName, user.imageUrl, post.id, post.userId, 
        post.title, post.content,post.imageUrl AS postImage, post.attachment, post.createdAt, COUNT(comment.postId) AS comments
      FROM user 
      JOIN post on user.id = post.userId 
      LEFT JOIN comment on post.id = comment.postId
      GROUP BY post.id
      ORDER BY post.createdAt DESC 
`
    )
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      res.status(400).json({ error });
    });
};

exports.getOnePost = function (req, res, next) {
  let id = req.params.id;
  db.query(
    `SELECT post.id AS postId, post.title, post.content, post.imageUrl AS postImage, post.attachment, 
            post.createdAt, post.updatedAt, 
            user.firstName, user.lastName,user.imageUrl, user.id AS userId
      FROM post
      JOIN user
      ON post.userId = user.id
      WHERE post.id = ?;`,
    [id],
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.createPost = function (req, res, next) {
  const dateTime = new Date();

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.token);
  const userId = decodedToken.userId;

  let article = {
    userId: userId,
    title: req.body.title,
    content: req.body.content,
    attachment: req.body.attachment,
    createdAt: dateTime,
  };

  if (req.file) {
    article.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  db.query(`INSERT INTO post SET ?`, [article], function (error) {
    if (error) {
      throw error;
    } else {
      res.status(201).json({ message: "Article bien ajouté !" });
    }
  });
};

exports.deletePost = function (req, res, next) {
  let id = req.params.id;

  db.query("DELETE FROM post WHERE id = ?", [id], function (error, result) {
    if (error) {
      throw error;
    } else {
      res.status(201).json({ message: "Publication bien supprimé !" });
    }
  });
};

exports.commentPost = function (req, res, next) {
  const dateTime = new Date();
  const comment = {
    userId: req.body.idOfUser,
    postId: req.body.id,
    message: req.body.comment,
    createdAt: dateTime,
  };

  db.query(`INSERT INTO comment SET ? `, [comment], function (error) {
    if (error) {
      throw error;
    } else {
      res.status(201).json({ message: "Commentaire bien publié !" });
    }
  });
};

exports.getComment = function (req, res, next) {
  let id = req.params.id;

  db.query(
    `SELECT user.id AS userId, user.firstName, user.lastName, user.imageUrl, comment.id, comment.message, comment.createdAt, comment.updatedAt
    FROM comment
    JOIN user ON comment.userId = user.id
    JOIN post ON comment.postId = post.id
    WHERE post.id = ?
    ORDER BY comment.createdAt ASC `,
    [id],
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.deleteComment = function (req, res, next) {
  let id = req.params.id;

  db.query(
    `DELETE FROM comment
     WHERE id = ?`,
    [id],
    function (error) {
      if (error) {
        throw error;
      } else {
        res.status(201).json({ message: "Commentaire bien supprimé !" });
      }
    }
  );
};
