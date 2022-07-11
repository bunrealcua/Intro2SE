const Joi = require ('joi');

const createQuestion = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
    }),
};

const searchQuestion = {
    body: Joi.object().keys({
        keyword: Joi.string().required(),
    }),
};

const deleteQuestion = {
    params: Joi.object().keys({
        questionId : Joi.string().uuid().required(),
    }),
};
module.exports = {
    createQuestion,
    searchQuestion,
    deleteQuestion,
};

