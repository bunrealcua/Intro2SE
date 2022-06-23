const Joi = require('joi');

const setConfiguration = {
  params: Joi.object().keys(
    {
      slug: Joi.string().required(),
    }),
  body: Joi.object().keys({
    value: Joi.string(),
  }),
};


module.exports = {
  setConfiguration,
};
