import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentService } from "./student.service";
import { promise, z } from "zod";
// import   studentZodSchema from "./student.zod.validation";
import catchAsync from "../../utils/catchAsync";
 "./student.zod.validation";



const getAllStudent= catchAsync(async (req, res) => {
  
    const result = await studentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'student are retrieve successfully',
      data: result
    });
})


// get single student data from data
const getSingleStudent = catchAsync(async (req, res) => {
  
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieve successfully',
      data: result
    });
})


const deleteSingleStudent = catchAsync(async (req, res,next) => {
  
  const { studentId } = req.params;

  const result = await studentService.deleteStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'student is deleted successfully',
    data: result
  });
  

})



export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent
}