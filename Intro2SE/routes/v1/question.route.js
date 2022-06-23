const express = require ('express');
const auth = require('../../middlewares/auth');
const validate = require ('../../middlewares/validate');
const questionValidation = require ('../../validations/question.validation');
const questionControlller = require ('../../controllers/question.controller');
const route = express.Router();

route
    .route('/')
    .post(auth('createQuestion'), validate(questionValidation.createQuestion),questionControlller.createQuestion );

route
    .route('/search/:offset/:limit')
    .post(auth('searchQuestion'), validate(questionValidation.searchQuestion), questionControlller.searchQuestion);

module.exports = route;