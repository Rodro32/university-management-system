import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentService } from "./student.service";
import { promise, z } from "zod";
// import   studentZodSchema from "./student.zod.validation";
import catchAsync from "../../utils/catchAsync";
 "./student.zod.validation";



const getAllStudent :RequestHandler= catchAsync(async (req, res) => {

    // console.log(req.query);

    const result = await studentService.getAllStudentFromDB(req.query);
    res.status(200).json({
      success: true,
      message: 'student are retrieve successfully',
      data: result
    });
})


// get single student data from data
const getSingleStudent = catchAsync(async (req, res) => {
  
    const { id } = req.params;
    const result = await studentService.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'student is retrieve successfully',
      data: result
    });
})

const updateSingleStudent = catchAsync(async (req, res,next) => {
  
  const { id} = req.params;
  const {student} = req.body;
  const result = await studentService.updateStudentIntoDB(id, student);
  res.status(200).json({
    success: true,
    message: 'student is updated successfully',
    data: result
  });
  

})

const deleteSingleStudent = catchAsync(async (req, res,next) => {
  
  const { id} = req.params;

  const result = await studentService.deleteStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: 'student is deleted successfully',
    data: result
  });
  

})



export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
}