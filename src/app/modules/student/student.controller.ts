import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import { z } from "zod";
import   studentZodSchema from "./student.zod.validation";
 "./student.zod.validation";

const getAllStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await studentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'student are retrieve successfully',
      data: result
    });
  } catch (err) {
    next(err);
  }
}


// get single student data from data
const getSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieve successfully',
      data: result
    });
  } catch (err) {
    next(err)
  }
}


const deleteSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;

    const result = await studentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is deleted successfully',
      data: result
    });
    
  } catch (err) {
    next(err);
  }
}



export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent
}