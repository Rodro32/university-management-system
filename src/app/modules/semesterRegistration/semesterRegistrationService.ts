import { Request, Response } from "express";
import AppError from "../../Errors/AppErrors"
import QueryBuilder from "../../builder/QueryBuilder";
import { academicSemester } from "../academicSemeter/academicSemester.model"
import { TSemesterRegistration } from "./semesterRegistrationInterface"
import { SemesterRegistration } from "./semesterRegistrationModel";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createSemesterRegistrationIntoDB = async (payload:TSemesterRegistration)=>{
  
  const semester = payload?.academicSemester;

  //check upcoming registered semester 
  const isAnyUpcomingOngoingSemesterRegistration = await 
  SemesterRegistration.findOne({
    $or:[{status:'ONGOING'},
    {status:'UPCOMING'}
  ]
  })

  if(isAnyUpcomingOngoingSemesterRegistration){
    throw new AppError(404,`there is already a ${isAnyUpcomingOngoingSemesterRegistration.status} registered semester`);
  }

  // is semester already exists
  const isAcademicSemesterExists = await academicSemester.findById(semester)
  if(!isAcademicSemesterExists){
    throw new AppError(404,"Semester not found");
  }

  // is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne(
    {semester}
    );
  if(isSemesterRegistrationExists){
    throw new AppError(404,"Already Registered");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
  
} 



const getAllRegistrationSemesterFromDB= async(
  query:Record<string,unknown>)=>{

    const semesterRegistrationQuery = 
    new QueryBuilder(SemesterRegistration.find()
    .populate('academicSemester'),query)
    .filter().sort().paginate().field()


    const result = await semesterRegistrationQuery.modelQuery;
    return result ;
}

const updateSemesterRegistrationFromDB = async(id:string,payload:Partial<TSemesterRegistration>)=>{

  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    id
    );
  if(!isSemesterRegistrationExists){
    throw new AppError(404,"Semester is not found");
  }

 
  

  const currentSemesterStatus = await isSemesterRegistrationExists?.status


  if(currentSemesterStatus === 'ENDED'){
    throw new AppError(404,'Semester already Ended')
  }
  const result = await SemesterRegistration.create(payload);
  return result;
}

const getSingleSemesterRegistrationFromDB = async(id:string)=>{

  const result = await SemesterRegistration.findById(id);
  return result ;
}

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllRegistrationSemesterFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB
}