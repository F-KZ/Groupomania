"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");

// Error Class
const HttpError = require("../models/http-error");

const validateToken = (authorizationHeader, userIdFromRequest) => {
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const isNotUserIdValid = userIdFromRequest && userIdFromRequest !== decodedToken.userId;

    if (isNotUserIdValid) throw next(new HttpError("Non authorisé", 401));
}

// Middleware config.
module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) throw next(new HttpError("Header authorization non renseigné", 400));
    validateToken(authorizationHeader, req.body.userId);

    next();
};
