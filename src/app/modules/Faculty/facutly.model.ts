import { Schema, model} from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';


const userNameSchema = new Schema<TUserName>({
  
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



const FacultySchema = new Schema < TFaculty,FacultyModel> ({

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
  designation: {
    type: String,
    required: [true, 'Designation is required'],
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
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true
  },
  BloodGroup:{
    type: String,
    enum: ["A+", "B+", "other"],
  },
  presentAddress:{
    type : String,
    required: true
  },
  permanentAddress:{
    type : String,
    required: true
  },

  profileImg: {type: String},
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    ref: 'User',
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

// virtual generating full name 
FacultySchema.virtual('fullName').get(function(){
  return (
    `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
  )
})

// #Query middleware
FacultySchema.pre('find',function(next){
  this.find({isDeleted: {$ne:true}})
  next();
})

FacultySchema.pre('findOne',function(next){
  this.find({isDeleted: {$ne:true}})
  next();
})

FacultySchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne: true}}})
  next();
})




// #creating a custom static method if the user is exists
FacultySchema.statics.isUserExist = async function (id:string){
  const existingUser = await Faculty.findOne({id})
  return existingUser;
}




// creating an instance method
// studentSchema.methods.isUserExist = async function (id:string){
//   const existingUser = await Student.findOne({id})
//   return existingUser;
// }


// creating model for student data
export const Faculty = model<TFaculty,FacultyModel>('Faculty',FacultySchema )