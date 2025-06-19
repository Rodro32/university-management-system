import mongoose from "mongoose";
import AppError from "../../Errors/AppErrors";
import config from "../../config";
import { TAcademicSemester } from "../academicSemeter/academicSemester.interface";
import { academicSemester } from "../academicSemeter/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentToDB = async (password: string,payload: TStudent)=>{

  
  // create a empty object
  const userData: Partial<TUser> ={};

  // if password not given , use default password
  userData.password = password || config.default_pass as string;

  userData.role = 'student';

 

  // find academic semester info
  const admissionSemester = await academicSemester.findById(payload.admissionSemester);

  if (!admissionSemester) {
    throw new AppError(404,"Admission semester not found!");
  }


  const session = await mongoose.startSession();

  try{
    session.startTransaction();
      // set manually generated id
  userData.id =await generateStudentId(admissionSemester);

  // set student role (transaction - 1)
  const newUser = await User.create([userData],{session});

  // create a student 
  if(!newUser.length){
    throw new AppError(404,"Failed to create user");
  }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; 

    //(transaction - 2)
    const newStudent = await Student.create([payload],{session});
    if(!newStudent.length){
      throw new AppError(404,"Failed to create Student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  }catch(err){
    await session.abortTransaction();
    await session.endSession();
  }

  
}

export const userService = {
  createStudentToDB
}