import { Model, Schema, model } from "mongoose";
import { TCourse, TPreRequestCourses,  } from "./course.interface";


const preRequestCoursesSchema = new Schema<TPreRequestCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref:'Course',
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
})
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  prefix: {
    type: String,
    trim: true,
    required: true
  },
  code:{
    type: Number,
    trim: true,
    required: true
  },
  credit:{
    type: Number,
    trim: true,
    required: true
  },
  preRequestCourses:[preRequestCoursesSchema],
  isDeleted:{
    type: Boolean,
    default: false
  }
})

export const Course = model<TCourse>('Course',courseSchema)