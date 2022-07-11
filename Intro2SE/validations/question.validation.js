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

const updateQuestion = {
    body : Joi.object().keys({
        content: Joi.string().required(),
        title : Joi.string().required(),
    }),
};

const getAllAnswersAndVotings = {
    params : Joi.object().keys({
        questionId: Joi.string().uuid().required(),
        page: Joi.number().required(),
        limit: Joi.number().required(),
    }),
};
module.exports = {
    createQuestion,
    searchQuestion,
    deleteQuestion,
    updateQuestion,
    getAllAnswersAndVotings,
};

