"use strict";

// Middleware Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validator = require("validator");
const passValid = require("secure-password-validator");
// const passBlackList = require("secure-password-validator/build/main/blacklists/first10_000");

// Error Class
const HttpError = require("../models/http-error");

// Database Route
const {pool} = require ("../config/db");

// Password Validator Options
const options = {
    // min password length, default = 8, cannot be less than 8
    minLength: 8,
    // max password length, default = 100, cannot be less than 50
    maxLength: 50,
    //array with blacklisted passwords default black list with first 1000 most common passwords
    // blacklist: passBlackList,
    // password Must have numbers, default = false
    digits: true,
    // password Must have letters, default = false
    letters: true,
    // password Must have uppercase letters, default = false
    uppercase: true,
    // password Must have lowercase letters, default = false
    lowercase: true,
    // password Must have symbols letters, default = false
    symbols: false,
};

// POST Create User Controller
exports.signup = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // RegEx Text
    const regExText = /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ \'\- ]+$/i;

    // Validation donnés de l'utilisateur
    let isFirstName = validator.matches(String(firstName), regExText);
    let isLastName = validator.matches(String(lastName), regExText);
    let isEmail = validator.isEmail(String(email));
    let isPassword = passValid.validate(String(password), options).valid;

    if (isFirstName && isLastName && isEmail && isPassword) {
        // Hash du mot de pass de l'utilisateur
        bcrypt.hash(password, 10, (error, hash) => {
            // Enregistrement des donnés de l'utilisateur sur la BD //
            const sqlQuery = "INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)";
            const sqlQueryValues = [firstName, lastName, email, hash];
            //const sql = db.format(string, inserts);

            const signupUser = pool.query(sqlQuery,sqlQueryValues, (error, user) => {
                if (!error) {
                    if (!user){
                        return next(new HttpError("utilisateur déjà existant", 422));
                    }
                    // Signe le id de l'utilisateur et retourne un JWT dans l'entete
                    res.status(201).json({
                        message: "Utilisateur créé correctement",
                        userId: user.insertId,
                        account: "user",
                        token: jwt.sign(
                            {
                                userId: user.insertId,
                                account: "user",
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: process.env.JWT_EXPIRES,
                            }
                        ),
                    });
                } else {
                    console.log("erreur lors du signup : ",error);
                    return next(new HttpError("erreur innatendu", 500));
                }
            });
        });
    } else if (!isFirstName || !isLastName || !isEmail || !isPassword) {
        // Error Handling
        let errorMessages = [];

        let anws = !isFirstName ? errorMessages.push(" Prénom") : "";
        anws = !isLastName ? errorMessages.push(" Nom") : "";
        anws = !isEmail ? errorMessages.push(" E-mail") : "";
        anws = !isPassword ? errorMessages.push(" Mot de passe") : "";
        errorMessages = errorMessages.join();

        return next(new HttpError("Veuillez vérifier les champs suivants :" + errorMessages, 400));
    }
};
