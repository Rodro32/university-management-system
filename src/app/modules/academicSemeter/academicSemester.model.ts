import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonth, academicSemesterCode, academicSemesterName } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";




const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  code:{
    type: String,
    required: true,
    enum:AcademicSemesterCode,
  },
  year:{
    type: Date,
    required: true,
  },
  startMonth:{
    type: String,
    required: true,
    enum:months,
  },
  endMonth:{
    type: String,
    required: true,
    enum:months,
  },
  
  
},{
  timestamps: true,
})

export const academicSemester = model<TAcademicSemester>('AcademicSemester',academicSemesterSchema)