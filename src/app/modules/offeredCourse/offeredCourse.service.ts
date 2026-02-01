import AppError from "../../Errors/AppErrors";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/facutly.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistrationModel";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.untils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

  const {semesterRegistration, 
    section,
    academicFaculty
    ,academicDepartment
    ,course,
    faculty,
    days,
    startTime,
    endTime,
  }= payload;

  const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration)

   if(!isSemesterRegistrationExits){
    throw new AppError(404,'not found semester registration')
   }

   const academicSemester = isSemesterRegistrationExits.academicSemester;

   const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty)

   if(!isAcademicFacultyExits){
    throw new AppError(404,'not found Faculty registration')
   }


   const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment)

   if(!isAcademicDepartmentExits){
    throw new AppError(404,'Department not found')
   }

   const isCourseExits = await Course.findById(course)

   if(!isCourseExits  ){
    throw new AppError(404,'course not found')
   }

   const isFacultyExits = await Faculty.findById(faculty)

   if(!isFacultyExits){
    throw new AppError(404,'Faculty not found')
   }






   // check if the department belong to this faculty
   const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
   })

   if(!isDepartmentBelongToFaculty){
    throw new AppError(404,`this ${isAcademicDepartmentExits.name} is not belong to this ${isAcademicFacultyExits.name}`)
   }

  //  check if the same course same semester offered
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  })
  if(isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection){
    throw new AppError(404,`this course with same section already exists`)
   }



   //check the schedule of the faculties 
   const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in : days}
   }).select('days startTime endTime');

   const newSchedule = {
    days,
    startTime,
    endTime,
   }

   
  if(hasTimeConflict(assignSchedule,newSchedule)){
    throw new AppError(404,'This faculty is not available at that time !chose another day or time')
  }



  const result = await OfferedCourse.create({...payload,academicSemester});
  return result;
};






const updateOfferedCourseIntoDB = async(id:string,payload:Pick<TOfferedCourse,'days'| 'startTime'|'endTime'| 'faculty'>)=>{
  const {faculty,days,startTime,endTime } = payload;


  const isOfferedCourseExits = await OfferedCourse.findById(id)

   if(!isOfferedCourseExits ){
    throw new AppError(404,'offered course not found')
   }

   const isFacultyExits = await Faculty.findById(faculty)

   if(!isFacultyExits){
    throw new AppError(404,'Faculty not found')
   }

    //check the schedule of the faculties 
    const semesterRegistration = isOfferedCourseExits.semesterRegistration;

    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)
    if(semesterRegistrationStatus?.status==='UPCOMING'){
      throw new AppError(404,'you can not update')
    }
    const assignSchedule = await OfferedCourse.find({
      semesterRegistration,
      faculty,
      days: {$in : days}
     }).select('days startTime endTime');
  
     const newSchedule = {
      days,
      startTime,
      endTime,
     }
  
     
    if(hasTimeConflict(assignSchedule,newSchedule)){
      throw new AppError(404,'This faculty is not available at that time !chose another day or time')
    }

    const result = await OfferedCourse.findByIdAndUpdate(id,payload,{
      new:true,
    });
    return result;
  
}

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
};
