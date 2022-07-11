const { PrismaClient, Prisma } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = new PrismaClient();

const createQuestion = async (req) => {
  const userId = req.user.id;
  const question = prisma.questions.create({
    data: {
      uid: userId,
      content: req.body.content,
      title: req.body.title,
    },
  });
  return question;
};

const searchQuestion = async (req) =>
{
    const countQuestions = await prisma.questions.count({});
    if (req.params.offset > countQuestions / req.params.limit)
    {
        throw new ApiError (httpStatus.NOT_FOUND, "Not Found Questions Related");
    }

    const listQuestions = await prisma.questions.findMany(
        {
            skip: parseInt(req.params.offset) * parseInt(req.params.limit),
            take: parseInt(req.params.limit),
            where : {
                title : {
                   contains : req.body.keyword,
                },
            },
        }
    );

    if (!listQuestions)
    {
        throw new ApiError (httpStatus.NOT_FOUND, "There is no questions related to keywords");  
    }
    return listQuestions;
};

const deleteQuestionById = async (questionId) => {
  const existQuestion = await prisma.questions.findUnique({
    where: {
      id: questionId,
    },
  });
};

module.exports = {
  createQuestion,
  searchQuestion,
  deleteQuestionById
};
