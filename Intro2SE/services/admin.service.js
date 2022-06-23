const httpStatus = require('http-status');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');

const setConfiguration = async (req) =>
{

  const isConfigExist = await prisma.configuration.findUnique({
    where : {slug: req.params.slug},
  });

  if (!isConfigExist)
  {
    const config = await prisma.configuration.create({
      data: {
        slug: req.params.slug, value:req.body.value},
    });

    return config;
  }
  else
  {
    const config = await prisma.configuration.update({
      where : { slug: req.params.slug,},
      data: 
      {
        value: req.body.value,
      }
    });

    return config;
  }

};




module.exports = {
  setConfiguration,
};
