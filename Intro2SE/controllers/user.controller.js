const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { use } = require('passport');



const getMyQuestions = catchAsync (async(req, res) => {
  const countQuestions = await userService.countMyQuestions(req);
  const myQuestions = await userService.getMyQuestionsPagination(req);

  res.send({count:countQuestions, questions: myQuestions});
});

module.exports = {
  getMyQuestions,
};
