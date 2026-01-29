import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: "SemesterRegistration",
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    section: {
      type: Number,
      required: true,
      min: 1,
    },
    days: {
      type: String,
      enum: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OfferedCourse = model<TOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema
);
