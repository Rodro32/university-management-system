import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  


  const result = await 
  AcademicFacultyServices.
  createAcademicFacultyIntoDB(req.body);

  
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success: true,
    message:'Academic faculty Created Successfully',
    data: result,
  })

}
)
// get all faculty
const getAllFaculty= catchAsync(async (req, res) => {
  
  const result = await AcademicFacultyServices.getAllAcademicFaculty();
  res.status(200).json({
    success: true,
    message: 'Faculties are retrieve successfully',
    data: result
  });
})

export const academicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
}