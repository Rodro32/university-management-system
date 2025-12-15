import { Types } from "mongoose"

export type TPreRequestCourses = {
  course : Types.ObjectId,
  isDeleted: boolean,
}

export type TCourse = {
  title: string,
  prefix: string,
  code: number,
  credit: number,
  preRequestCourses: [TPreRequestCourses],
  isDeleted?: boolean,
}

export type TCourseFaculty = {
  course: Types.ObjectId,
  faculties:[Types.ObjectId]
}