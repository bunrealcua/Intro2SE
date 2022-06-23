const Joi = require('joi');

const getMyQuestions  = {
  params: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
};

module.exports = {
  getMyQuestions,
};
