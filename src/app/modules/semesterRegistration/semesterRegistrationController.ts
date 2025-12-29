import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationService } from "./semesterRegistrationService";

const createSemesterRegistration = catchAsync(async (req:Request, res:Response) => {
  
  const result = await semesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: 'Semester Registration is created successfully',
    data: result,
  });
});

const getAllSemesterRegistration= catchAsync(async (req, res) => {
  
  const result = await semesterRegistrationService.getAllRegistrationSemesterFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Semester is retrieve successfully',
    data: result
  });
})


const getSingleSemesterRegistration = catchAsync(async (req:Request, res:Response) => {
  
  const { id } = req.params;
  const result = await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: 'Semester Registration is retrieved successfully',
    data: result,
  });
});


const updateSemesterRegistrationController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await semesterRegistrationService.updateSemesterRegistrationFromDB( id ,req.body);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: 'Semester is updated successfully',
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistrationController,
}