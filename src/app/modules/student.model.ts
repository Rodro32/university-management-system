import { Schema, model, connect } from 'mongoose';
import { TGuardian, TStudent,  TlocalGuardian, TuserName, StudentModel } from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TuserName>({
  
    fistName: {
      type: String,
      required:[true, "First Name is required"],
    },
    middleName:{
      type: String,
    },
    lastName:{
      type: String,
      required:[true, "Last Name is required"],
    }
  
})

const guardianSchema = new Schema <TGuardian>(
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

const localGuardianSchema = new Schema <TlocalGuardian> (
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

const studentSchema = new Schema < TStudent,StudentModel> ({
  id: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  name:{
    type: userNameSchema,
    required: true,
  },
  gender:{
    type: String,
    enum:{
      values:['male','female'],
      message:'{VALUE} is not supported',
    },
    required: true,
  },
  dateOfBirth: {type: String},
  email:{
    type : String,
    required: true,
    // unique: true,
  },
  contactNumber: {
    type: String,
    required: true
  },
  BloodGroup:{
    type: String,
    enum: ["A+", "B+", "A-"],
  },
  presentAddress:{
    type : String,
    required: true
  },
  permanentAddress:{
    type : String,
    required: true
  },
  Guardian:{
    type:  guardianSchema,
    required: true,
  },
  localGuardian:{
    type:localGuardianSchema,
    required: true,
  },
  profileImg: {type: String},
  isActive:{
    type: String,
    enum:['Active','Inactive'],
    default: "Active"
  }
})


// pre save middleware 
studentSchema.pre('save',async function (next){
  const user = this;
  // console.log(this,'pre hook: we will save the data')
  // hashing password and then save into DB
  user.password =await bcrypt.hash(user.password,Number(config.bcrypt_salt_round));
  next();
})

// post save middleware 
studentSchema.post('save',function(){
  console.log(this,'post hook : we saved the data');
})




// #creating a custom static method
studentSchema.statics.isUserExist = async function (id:string){
  const existingUser = await Student.findOne({id})
  return existingUser;
}




// creating an instance method
// studentSchema.methods.isUserExist = async function (id:string){
//   const existingUser = await Student.findOne({id})
//   return existingUser;
// }


// creating model for student data
export const Student = model<TStudent,StudentModel>('Student',studentSchema)