import { Schema, model, connect } from 'mongoose';
import { TGuardian, TStudent,  TlocalGuardian, TuserName, StudentModel } from './student/student.interface';


const userNameSchema = new Schema<TuserName>({
  
    firstName: {
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
  id: {type: String, required: [true,'Id is required'], unique: true},
  
  user:{
    type: Schema.Types.ObjectId,
    required: [true,'userId required'],
    unique: true,
    ref:'User',
  },
  name:{
    type:userNameSchema,
    required: [true,'name is required'],
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
  admissionSemester : {
    type: Schema.Types.ObjectId,
    ref:'AcademicSemester',
  },
  academicDepartment:{
    type: Schema.Types.ObjectId,
    ref:'AcademicDepartment'
  },
  isDeleted:{
    type:Boolean,
    default:false,
  }
},{
  toJSON:{
    virtuals: true,
  }
})

// virtual
studentSchema.virtual('fullName').get(function(){
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
})

// #Query middleware
studentSchema.pre('find',function(next){
  this.find({isDeleted: {$ne:true}})
  next();
})

studentSchema.pre('findOne',function(next){
  this.find({isDeleted: {$ne:true}})
  next();
})

studentSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne: true}}})
  next();
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