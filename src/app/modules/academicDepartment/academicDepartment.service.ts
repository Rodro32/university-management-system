import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB =async (payload:TAcademicDepartment) =>{

  // used for checking is department exits or not

  // const isDepartmentExits = await AcademicDepartment.findOne({
  //   name: payload.name
  // });
  // if(isDepartmentExits){
  //   throw new Error ("Department already exits!");
  // }


 const result = await AcademicDepartment.create(payload);
 return result;
}

// get academic faculty
 const getAllAcademicDepartment = async() => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
 }

export const AcademicDepartmentServices  ={
  createAcademicDepartmentIntoDB ,
  getAllAcademicDepartment,
}