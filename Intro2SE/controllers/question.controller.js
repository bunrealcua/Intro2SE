const httpStatus = require ('http-status');
const catchAsync = require ('../utils/catchAsync');
const ApiError = require ('../utils/ApiError');
const questionService = require ('../services/question.service');


const createQuestion = catchAsync( async (req, res) => {
    const question = await questionService.createQuestion(req);

    res.status(httpStatus.CREATED).send(question);
});

const searchQuestion = catchAsync (async (req, res) => {
    const listQuestions = await questionService.searchQuestion(req);
    res.send({ Number: listQuestions.length,
        Questions: listQuestions,});
});

const deleteQuestion = catchAsync ( async(req, res) => {
    const question = await questionService.deleteQuestionById(req.params.questionId);
    res.send ({success : !!question});
});

module.exports = {
    createQuestion,
    searchQuestion,
    deleteQuestion,
};
