const {PrismaClient, Prisma} = require ('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require ('../utils/ApiError');
const prisma = new PrismaClient();

const VoteAnswer = async (req) =>
{
    const answer = await prisma.answers.findUnique ({
        where : {
            id : req.params.answerId,
        },
    });

    if (!answer)
    {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer Not Found');
    }

    const checkVotingExist = await prisma.voting.findFirst({
        where : {
            aid : req.params.answerId
        },
    });
    
    if (req.body.status == 2)
    {
        const voting = await prisma.voting.delete({
            where : {
                aid : req.params.answerId,
            }
        });
    }


    let flag = true;
    if (req.body.status == 0)  flag = true; else flag = false;
    if (!checkVotingExist)
    {
        const voting = await prisma.voting.create ({
        data: 
        {
            uid: answer.uid,
            aid: answer.id,
            status: flag, 
        },
    });
        return voting;
    }
    else
    {
        const voting = await prisma.voting.update({
            data:
            {
                status: flag,
            }
        });
        return voting;
    }

}
module.exports = {
    VoteAnswer,
};