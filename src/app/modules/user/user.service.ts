import mongoose from "mongoose";
import AppError from "../../Errors/AppErrors";
import { TAcademicSemester } from "../academicSemeter/academicSemester.interface";
import { academicSemester } from "../academicSemeter/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/facutly.model";
import config from "../../config";
import { Admin } from "../Admin/admin.model";

const createStudentToDB = async (password: string,payload: TStudent)=>{


  // create a empty object
  const userData: Partial<TUser> ={};

  // if password not given , use default password
  userData.password = password || config.default_pass as string;

  userData.role = 'student';
  userData.email = payload.email;

 

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
    throw new AppError(404,"Failed to create new student");
  }

  
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array
      //create a faculty
      if (!newUser.length) {
        throw new AppError(404, 'Failed to create user');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a faculty (transaction-2)
  
      const newFaculty = await Faculty.create([payload], { session });
  
      if (!newFaculty.length) {
        throw new AppError(404, 'Failed to create faculty');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newFaculty;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

  const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use default password
    userData.password = password || (config.default_pass as string);
  
    //set student role
    userData.role = 'admin';
    userData.email = payload.email;
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); 
  
      //create a admin
      if (!newUser.length) {
        throw new AppError(400, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userService = {
  createStudentToDB,
  createFacultyIntoDB,
  createAdminIntoDB,
}