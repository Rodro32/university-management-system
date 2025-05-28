import { z } from 'zod';

// userName validation
const userNameZodSchema = z.object({
  fistName: z.string({ required_error: 'First Name is required' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last Name is required' }),
});

// guardian validation
const guardianZodSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContact: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContact: z.string().optional(),
});

// localGuardian validation
const localGuardianZodSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contact: z.string().optional(),
  address: z.string().optional(),
});

// student validation
export const studentZodSchema = z.object({
  id: z.string({ required_error: 'ID is required' }),
  name: userNameZodSchema,
  gender: z.enum(['male', 'female'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Invalid gender value',
  }),
  dateOfBirth: z.string().optional(),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  contactNumber: z.string({ required_error: 'Contact Number is required' }),
  BloodGroup: z.enum(['A+', 'B+', 'A-']).optional(),
  presentAddress: z.string({ required_error: 'Present Address is required' }),
  permanentAddress: z.string({ required_error: 'Permanent Address is required' }),
  Guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['Active', 'Inactive']).default('Active'),
});

export default studentZodSchema;