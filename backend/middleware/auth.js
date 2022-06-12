const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.token);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valide !";
    } else {
      req.body.decodedToken = decodedToken;
      next();
    }
  } catch (error) {
    res.status(401).json("Requête non authentifiée !" );
  }
};
