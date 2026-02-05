import AppError from "../../Errors/AppErrors";
import config from "../../config";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';





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
  if(!isPasswordMatched){
    throw new AppError(404,'Password do not matched');
  }
   // create jwt token and sent to clint side 
  const jwtPayload = {
    userId:isUserExits.id,
    role:isUserExits?.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

  // console.log(payload);
  return {
    accessToken,
    needsPasswordChange:isUserExits.needsPasswordChange,
  };
}

export const AuthServices = {
  loginUser,
}