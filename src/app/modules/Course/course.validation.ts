import { z } from "zod";


const PreRequestValidationCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    preRequestCourses: z.array(PreRequestValidationCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  })
})

const updateCourseValidationSchema = createCourseValidationSchema.partial();

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
}