const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */


/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */

const countMyQuestions = async(req) => {
  const questions = await prisma.questions.findMany({
    where : {uid: req.params.userId},
  });

  return questions.length;
};

const getMyQuestionsPagination = async (req) => {
  const questions = await prisma.questions.findMany({
    skip: req.params.page * req.params.limit,
    take: req.params.limit,
    where : {
      uid: req.params.userId,
    },
  });

  return questions;
};

module.exports = {
  countMyQuestions,
  getMyQuestionsPagination,
};
