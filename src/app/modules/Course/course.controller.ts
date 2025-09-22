import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { courseServices } from "./course.service";


const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
});


const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCoursesFromDB( id );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.updateCourse( id ,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const {  id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is update successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  deleteCourse,
  getAllCourses,
  updateCourse
};