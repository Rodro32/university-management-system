import AppError from "../../Errors/AppErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";





const loginUser =async (payload:TLoginUser) =>{

  //checking if the user is exits in the database
  const isUserExits = await User.findOne({id:payload.id})
  // console.log(isUserExits)

  if(!isUserExits){
    throw new AppError(404,'This user is not found!')
  }

  // // check if the user is already deleted
  const isDeleted = isUserExits.isDeleted;
 
  if(isDeleted){
    throw new AppError(404,'This user is deleted!')
  }

  // // check if the user is blocked 
  const userBlocked = isUserExits.status;
 
  if(userBlocked === 'blocked'){
    throw new AppError(404,'This user is blocked!');
  }

  // check if password is correct
  const isPasswordMatched = await bcrypt.compare(payload?.password , isUserExits?.password)
  console.log(isPasswordMatched)

  // console.log(payload);
  return {};
}

export const AuthServices = {
  loginUser,
}