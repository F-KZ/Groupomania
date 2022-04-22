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
const db = require("../config/db");

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

const createUserAndSendResponse = (firstName, lastName, email, hash, res, next) => {
    // Enregistrement des donnés de l'utilisateur sur la BD //
    const sqlQuery = "INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)";
    const sqlQueryValues = [firstName, lastName, email, hash];

    db.query(sqlQuery, sqlQueryValues)
        .then(user => {
            // Signe le id de l'utilisateur et retourne un JWT dans l'entete
            console.log("POST Signup - END - Status 201");
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
        })
        .catch(error => {
            if (error.code === 'ER_DUP_ENTRY') {
                console.log("POST Signup - END - Status 422");
                return next(new HttpError("utilisateur déjà existant", 422));
            }

            console.error("POST Signup - ERROR - Status 500");
            console.error(error.stack);
            throw error;
        });
}

// POST Create User Controller
exports.signup = async (req, res, next) => {
    console.log("POST - SIGNUP - START");
    

    const {firstName, lastName, email, password} = req.body;

    // RegEx Text
    const regExText = /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ \'\- ]+$/i;

    // Validation donnés de l'utilisateur
    let isFirstName = validator.matches(String(firstName), regExText);
    let isLastName = validator.matches(String(lastName), regExText);
    let isEmail = validator.isEmail(String(email));
    let isPassword = passValid.validate(String(password), options).valid;

    if (!isFirstName || !isLastName || !isEmail || !isPassword) {
        // Error Handling
        let errorMessages = [];

        let anws = !isFirstName ? errorMessages.push(" Prénom") : "";
        anws = !isLastName ? errorMessages.push(" Nom") : "";
        anws = !isEmail ? errorMessages.push(" E-mail") : "";
        anws = !isPassword ? errorMessages.push(" Mot de passe") : "";
        errorMessages = errorMessages.join();

        console.log("POST Signup - END - Status 400");
        return next(new HttpError("Veuillez vérifier les champs suivants :" + errorMessages, 400));
    }
    

    // Hash du mot de pass de l'utilisateur
    const hash = await bcrypt.hash(password, 10);
    createUserAndSendResponse(firstName, lastName, email, hash, res, next);
};
