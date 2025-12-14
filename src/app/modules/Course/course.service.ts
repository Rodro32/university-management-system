import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableField } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"

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


  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemaining,
    {
      new:true,
      runValidators:true,
    });

    // if(preRequestCourses && preRequestCourses.length>0){
    //   const deletedPreRequisite = preRequestCourses.filter(el=>el.course && el.isDeleted)
    // };
    // console.log(deletedPreRequisite)
    return updateBasicCourseInfo;
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