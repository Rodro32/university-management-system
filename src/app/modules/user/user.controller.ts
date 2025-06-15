import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {

    const { password, student: studentData } = req.body;

    // const zodParseData = studentZodSchema.parse(studentData);

    const result = await userService.createStudentToDB(password,studentData);

    // res.status(200).json({
    //   success: true,
    //   message: 'student is created successfully',
    //   data: result
    // });
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success: true,
      message:'Student Created Successfully',
      data: result,
    })
  }
  catch (err ) {
    next(err);
  }
}

export const userController = {
  createStudent,
}