const httpStatus = require ('http-status');
const catchAsync = require ('../utils/catchAsync');
const ApiError = require ('../utils/ApiError');
const questionService = require ('../services/question.service');


const createQuestion = catchAsync( async (req, res) => {
    const question = await questionService.createQuestion(req);
    if (!!question)
    {
        throw new ApiError(httpStatus.NOT_FOUND, "Cannot create");
    }
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


const updateQuestion = catchAsync ( async (req, res) =>
{
    const question = await questionService.updateQuestion (req);
    res.send(question);
}

);


const getAllAnswersAndVotings = catchAsync ( async (req, res) => {
    const questionRecord = await questionService.getQuestionByID(req);
    const countAnswer = await questionService.countAnswerByQuestionID(req);
    const answers = await questionService.GetAnswersByQuestionIDPagination (req);
    const answersAndvotings = await questionService.GetAnswersAndVotings (answers);
    res.send({question: questionRecord, 
        answers: {count: countAnswer, data: answersAndvotings}});

}); 
module.exports = {
    createQuestion,
    searchQuestion,
    deleteQuestion,
    updateQuestion,
    getAllAnswersAndVotings,
};
