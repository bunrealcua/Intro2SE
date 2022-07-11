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

const updateQuestion = async (req) => {
  const { questionId } = req.params;
  const question = await prisma.questions.findUnique({
    where: {
      id: questionId,
    },
  });
};

const getQuestionByID = async (req) =>
{
  const questionRecord = await prisma.questions.findUnique ({
    where : {id: req.params.questionId,},
  }); 
  const userRecord = await prisma.users.findUnique ({
    where : {id: questionRecord.uid,},
  }
  );
  return {questionInfo: questionRecord, userName: userRecord.name, userAvatarUrl: userRecord.profilepictureurl};
}
const GetAnswersByQuestionIDPagination = async(req) => {
  const answers = await prisma.answers.findMany({
    skip: req.params.page * req.params.limit,
    take: req.params.limit,
    where : {qid: req.params.questionId,},
  });

  return answers;
};

const GetAnswersAndVotings = async (answers) => {
  answersAndvotings = []
  for (let i = 0; i < answers.length; i++)
  {
    const upvotes = await prisma.voting.findMany({
      where : {aid: answers[i].id, status : true }
    });

    const downvotes = await prisma.voting.findMany({
      where : {aid: answers[i].id, status : false }
    });

    const user = await prisma.users.findUnique({
      where : {id: answers[i].uid}
    });

    answersAndvotings.push({
      answer: answers[i], 
      count_upvotes: upvotes.length,
      count_downvotes: downvotes.length,
      minus_upvote_downvote: upvotes.length - downvotes.length,
      username: user.username,
      profilepictureurl: user.profilepictureurl})
  }

  return answersAndvotings;
};

const countAnswerByQuestionID = async (req) =>
{
  const answers = await prisma.answers.findMany({
    where : {qid: req.params.questionId,},
  });

  return answers.length;
};


module.exports = {
  createQuestion,
  searchQuestion,
  deleteQuestionById,
  updateQuestion,
  getQuestionByID,
  GetAnswersByQuestionIDPagination,
  GetAnswersAndVotings,
  countAnswerByQuestionID,
};
