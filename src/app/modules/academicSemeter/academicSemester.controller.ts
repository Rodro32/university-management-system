import { NextFunction, Request, Response } from "express";
// import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  


  const result = await 
  AcademicSemesterServices.
  createAcademicSemesterIntoDB(req.body);

  
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success: true,
    message:'Student Created Successfully',
    data: result,
  })

}
)
export const academicSemesterController = {
  createAcademicSemester,
}