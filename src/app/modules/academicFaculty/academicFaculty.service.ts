import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB =async (payload:TAcademicFaculty) =>{

  // semester name --> semester code




 const result = await AcademicFaculty.create(payload);
 return result;
}

// get academic faculty
 const getAllAcademicFaculty = async() => {
  const result = await AcademicFaculty.find();
  return result;
 }

export const AcademicFacultyServices  ={
  createAcademicFacultyIntoDB ,
  getAllAcademicFaculty,
}