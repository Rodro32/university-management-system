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
  preRequestCourses: [],
  isDeleted?: boolean,
}