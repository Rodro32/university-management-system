import { Schema, model, connect } from 'mongoose';
import { Guardian, Student, Student, localGuardian, userName } from './student/student.interface';

const userNameSchema = new Schema<userName>({
  
    fistName: {
      type: String,
      required: true
    },
    middleName:{
      type: String,
    },
    lastName:{
      type: String,
      required: true
    }
  
})

const guardianSchema = new Schema <Guardian>(
  {
    fatherName:{
      type: String
    },
  fatherOccupation: {
    type: String
  },
  fatherContact: {
    type: String
  },
  motherName: {
    type: String
  },
  motherOccupation: {
    type: String
  },
  motherContact: {
    type: String
  },
  }
)

const localGuardianSchema = new Schema <localGuardian> (
  {
    name: {
      type: String
    },
  occupation :{
    type: String
  },
  contact: {
    type: String
  },
  address: {
    type: String
  },
  }
)

const studentSchema = new Schema < Student> ({
  id: {type: String},
  name:userNameSchema,
  gender:['male','female'],
  dateOfBirth: {type: String},
  email:{
    type : String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  BloodGroup: ["A+", "B+", "A-"],
  presentAddress:{
    type : String,
    required: true
  },
  permanentAddress:{
    type : String,
    required: true
  },
  Guardian:guardianSchema,
  localGuardian:localGuardianSchema,
  profileImg: {type: String},
  isActive:['Active','Inactive']
})


// creating model
const Student = model<Student>('Student',studentSchema)