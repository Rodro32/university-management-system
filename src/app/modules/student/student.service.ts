import { error } from "console";
import { Student } from "../student.model";
import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import AppError from "../../Errors/AppErrors";
import { User } from "../user/user.model";




const getAllStudentFromDB = async()=>{
  const result = await Student.find()
  .populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty',
    }
  });
  return result;
}

const updateStudentIntoDB = async(id: string, payload:Partial<TStudent>)=>{
  // const result = await Student.findOne({id}); 
  const result = await Student.findOneAndUpdate({id},payload)
  return result;
}


const getSingleStudentFromDB = async(id: string)=>{
  const result = await Student.findOne({id})
  return result;
}

const deleteStudentFromDB = async(id: string)=>{

  const session = await mongoose.startSession();

  try{

  session.startTransaction();

  const deletedStudent = await Student.findOneAndUpdate(
    {id},
    {isDeleted:true},
    {new: true, session}
    ); 
    if(!deletedStudent){
      throw new AppError(400,"Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted:true},
      {new: true, session}
      );
      if(!deletedUser){
        throw new AppError(400,"Failed to delete user");
      };

      await session.commitTransaction();
      await session.endSession();

  return deletedStudent;

  }catch(err){
    await session.abortTransaction();
    await session.endSession();
  }


}


export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
}