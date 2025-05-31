import { error } from "console";
import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentToDB = async (studentData: TStudent)=>{
  // built in static method
  if(await Student.isUserExist(studentData.id)){
    throw new Error('user already exits')
  }
  const result = await Student.create(studentData);
 

  // built in instance method
  // const student = new Student(studentData)
  // if(await student.isUserExist(studentData.id)){
  //   throw new Error ('user already exists')
  // }
  // const result = await student.save() 

  return result;
}


const getAllStudentFromDB = async()=>{
  const result = await Student.find();
  return result;
}


const getSingleStudentFromDB = async(id: string)=>{
  const result = await Student.findOne({id}); 
  return result;
}


export const studentService = {
  createStudentToDB,
  getAllStudentFromDB,
  getSingleStudentFromDB
}