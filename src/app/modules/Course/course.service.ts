import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableField } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"
import AppError from "../../Errors/AppErrors";

const createCourseIntoDB = async(payload:TCourse)=>{
  const result = await Course.create(payload);
  return result;
}

const getAllCoursesFromDB = async(query: Record<string,unknown>)=>{
  const courseQuery = new QueryBuilder(Course.find().populate('preRequestCourses.course'),query)
  .search(courseSearchableField)
  .filter()
  .sort()
  .paginate()
  .field()
  const result = await courseQuery.modelQuery;
  return result;
}

const getSingleCourseFromDB = async(id:string)=>{
  const result = await Course.findById(id).populate('preRequestCourses.course');
  return result;
}


const updateCourseIntoDB = async(id:string, payload:Partial<TCourse>)=>{
  const {preRequestCourses, ...courseRemaining} = payload;

  const session = await mongoose.startSession();

  try{
  session.startTransaction()


  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemaining,
    {
      new:true,
      runValidators:true,
      session
    },
    );

    if(!updateBasicCourseInfo){
      throw new AppError(404,'failed to update the course')
    }

    if(preRequestCourses && preRequestCourses.length>0){

      const deletedPreRequisite = preRequestCourses.filter(el=>el.course && el.isDeleted)
      .map(el=>el.course)

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {preRequestCourses:{course:{$in:deletedPreRequisite },}}
        } ,{
          new:true,
          runValidators:true,
          session
        }
      )

      if(!deletedPreRequisiteCourses){
        throw new AppError(404,'failed to update the course')
      }

      const newPreRequisite = preRequestCourses.filter(el=>el.course && !el.isDeleted)
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet :{preRequestCourses:{$each:newPreRequisite}}
        }, {
          new:true,
          runValidators:true,
          session
        }
      )
      if(!newPreRequisiteCourses){
        throw new AppError(404,'failed to update the course')
      }

      const result = await Course.findById(id).populate('preRequestCourses.course')
      return result;
    };

    await session.commitTransaction();
    await session.endSession();

  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404,'Failed to update course')
  }
   
    
}

const deleteCourseFromDB = async(id:string)=>{
  const result = await Course.findByIdAndUpdate(
    id,{
      isDeleted:true,
    },{
      new:true,
    });
  return result;
}

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB
}