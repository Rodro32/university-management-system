import config from "../../config";
import { TAcademicSemester } from "../academicSemeter/academicSemester.interface";
import { academicSemester } from "../academicSemeter/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentToDB = async (password: string,payload: TStudent)=>{
  // built in static method
  // if(await Student.isUserExist(studentData.id)){
  //   throw new Error('user already exits')
  // }

  // create a empty object
  const userData: Partial<TUser> ={};

  // if password not given , use default password
  userData.password = password || config.default_pass as string;

  userData.role = 'student';

 

  // find academic semester info
  const admissionSemester = await academicSemester.findById(payload.admissionSemester);

  if (!admissionSemester) {
    throw new Error("Admission semester not found!");
  }

  // set manually generated id
  userData.id =await generateStudentId(admissionSemester);

  // set student role
  const newUser = await User.create(userData);

  // create a student 
  if(Object.keys(newUser).length){
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; 

    const newStudent = await Student.create(payload);
    return newStudent;
  }
 

  // built in instance method
  // const student = new Student(studentData)
  // if(await student.isUserExist(studentData.id)){
  //   throw new Error ('user already exists')
  // }
  // const result = await student.save() 

  
}

export const userService = {
  createStudentToDB
}