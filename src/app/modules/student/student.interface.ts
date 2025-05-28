import { Schema, model, connect } from 'mongoose';


export type userName = {
  fistName: string;
  middleName?: string;
  lastName: string;
}

export type Guardian = {
  fatherName: string,
  fatherOccupation: string,
  fatherContact: string,
  motherName: string,
  motherOccupation: string,
  motherContact: string,
}



export type localGuardian = {
  name: string;
  occupation :string;
  contact: string;
  address: string;
}

export type Student = {
  id: string;
  name: userName;
  dateOfBirth: string;
  contactNumber: string;
  gender: 'male' | 'female';
  email: string;
  emergencyContact: string;
  BloodGroup: "A+"| "B+"| "A-";
  presentAddress: string;
  permanentAddress: string;
  Guardian:  Guardian;
  localGuardian: localGuardian;
  profileImg ?: string;
  isActive: 'Active' | 'Inactive';
}