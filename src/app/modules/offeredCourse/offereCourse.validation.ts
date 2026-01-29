import { z } from "zod";

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),

    maxCapacity: z.number(),
    section: z.number(),

    days: z.enum(["sat", "sun", "mon", "tue", "wed", "thu", "fri"]),

    startTime: z.string().refine((time)=>{
      const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
      return regex.test(time);
    },{
      message:'invalid time format'
    }),
    endTime: z.string().refine((time)=>{
      const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
      return regex.test(time);
    },{
      message:'invalid time format in end time '
    }),
  }).refine((body)=>{
    const start = new Date(`1970-01-01T${body.startTime}:00`);
    const end = new Date(`1970-01-01T${body.endTime}:00`);

    return end > start;
  },{
    message: 'end should grater then start'
  }),
});


const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),

    maxCapacity: z.number(),

    days: z.enum(["sat", "sun", "mon", "tue", "wed", "thu", "fri"]),

    startTime: z.string(),
    endTime: z.string(),
  }),
})

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
};
