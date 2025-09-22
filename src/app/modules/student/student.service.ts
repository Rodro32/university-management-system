import { error } from "console";
import { Student } from "../student.model";
import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import AppError from "../../Errors/AppErrors";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";




const getAllStudentFromDB = async (query: Record<string, unknown>) => {

  // console.log('base query', query)
  // const queryObj = {...query};

  // let searchTerm = '';

  // const studentSearchableFields = ['email', 'name.firstName','presentAddress']

  // if(query?.searchTerm){
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field)=>({
  //     [field]:{$regex: searchTerm, $options: 'i'},
  //   }))
  // });

  // const includeFields = ['searchTerm','sort','limit','page','fields'];

  // includeFields.forEach((el)=> delete queryObj[el]);
  // // console.log({query,queryObj})

  // const filterQuery = searchQuery
  // .find(queryObj)
  // .populate('admissionSemester').populate({
  //   path:'academicDepartment',
  //   populate:{
  //     path:'academicFaculty',
  //   }
  // });

  // let sort = '-createdAt'
  // if(query.sort){
  //   sort = query.sort as string;
  // }
  // const sortQuery =  filterQuery.sort(sort)

  // let page = 1;
  // let limit = 2;
  // let skip = 0;

  // if(query.limit){
  //   limit = Number(query.limit);
  // }

  // if(query.page){
  //   page = Number (query.page);
  //   skip = (page-1)*limit;
  // }

  //   const paginateQuery = sortQuery.skip(skip);

  //   const limitQuery =  paginateQuery.limit(limit);

  //   let fields = '-__v';

  //   if(query.fields){
  //     fields = (query.fields as string).split(',').join(' ');
  //     // console.log({fields})
  //   }
  //   const fieldQuery = await limitQuery.select(fields);

  //   return fieldQuery ;


  const studentQuery = new QueryBuilder(Student.find()
   .find()
  .populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty',
    },
  }), 
  query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .field()

  const result = await studentQuery.modelQuery;
  return result;

}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {

  const { name, Guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (Guardian && Object.keys(Guardian).length) {
    for (const [key, value] of Object.entries(Guardian)) {
      modifiedUpdatedData[`Guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }


  const result = await Student.findByIdAndUpdate(
     id ,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
}


const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id )
  return result;
}

const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession();

  try {

    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(400, "Failed to delete student");
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(400, "Failed to delete user");
    };

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;

  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404, "Failed to create new student");
  }


}


export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
}