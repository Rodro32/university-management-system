import { Model, Types } from "mongoose";


export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'B+'
  | 'O-'
  | 'A+'
  | 'AB-'
  | 'B+'
  | 'A-'
  | 'O-'
  | 'B-'
  | 'AB+'
  | 'O+';

  export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
  };
export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  BloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty>{
  isUserExist(id: string): Promise<TFaculty | null>;
}