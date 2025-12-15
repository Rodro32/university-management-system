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

const updatePreRequestValidationCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number().optional(),
    preRequestCourses: z.array(updatePreRequestValidationCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  })
})


const assignFacultiesValidationWithSchema = z.object({
  body:z.object({
    faculties:z.array(z.string())
  })
})

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignFacultiesValidationWithSchema ,
}