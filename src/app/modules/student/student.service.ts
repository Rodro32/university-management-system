import { error } from "console";
import { Student } from "../student.model";
import { TStudent } from "./student.interface";




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


const getSingleStudentFromDB = async(id: string)=>{
  // const result = await Student.findOne({id}); 
  const result = await Student.findById(id)
  .populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty',
    }
  });
  return result;
}

const deleteStudentFromDB = async(id: string)=>{
  const result = await Student.updateOne({id},{isDeleted:true}); 
  return result;
}


export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}