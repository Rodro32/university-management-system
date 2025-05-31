// student.validation.ts

import { z } from 'zod';

// Zod schemas

const userNameZodSchema = z.object({
  fistName: z.string({ required_error: "First Name is required" }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: "Last Name is required" }),
});

const guardianZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContact: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContact: z.string(),
});

const localGuardianZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contact: z.string(),
  address: z.string(),
});

export const studentZodSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  password: z.string().max(20),
  name: userNameZodSchema,
  gender: z.enum(['male', 'female'], {
    required_error: "Gender is required",
    invalid_type_error: "Invalid gender",
  }),
  dateOfBirth: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  emergencyContact:z.string(),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  BloodGroup: z.enum(['A+', 'B+', 'A-']),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  permanentAddress: z.string().min(1, { message: "Permanent address is required" }),
  Guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImg: z.string(),
  isActive: z.enum(['Active', 'Inactive']).default('Active'),
});
export default studentZodSchema;