const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { adminService } = require('../services');


const setConfiguration = catchAsync(async (req, res) =>
{
  const config = await adminService.setConfiguration(req);
  res.send({success: !! config});
});



module.exports = {
  setConfiguration,
};
