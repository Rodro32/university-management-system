import mongoose, { Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistrationInterface";
import { semesterRegistrationStatus } from "./semesterRegistrationConstant";

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  academicSemester:{
    type:Schema.Types.ObjectId,
    unique:true,
    ref:'AcademicSemester'
  },
  status:{
    type:String,
    enum:semesterRegistrationStatus,
    default:'UPCOMING',
  },
  startDate:{
    type:Date,
  },
  endDate:{
    type:Date,
  },
  minCredit:{
    type:Number,
    default:3
  },
  maxCredit:{
    type:Number,
    default:14
  }
},{
  timestamps:true
})

export const SemesterRegistration = mongoose
.model<TSemesterRegistration>('SemesterRegistration',semesterRegistrationSchema)