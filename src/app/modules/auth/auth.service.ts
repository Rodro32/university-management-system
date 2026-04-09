import AppError from "../../Errors/AppErrors";
import config from "../../config";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from "./auth.untils";
import { sendEmail } from "../../utils/sendEmail";





const loginUser =async (payload:TLoginUser) =>{

  //checking if the user is exits in the database
  const isUserExits = await User.findOne({id:payload.id}).select('+password')
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
  const accessToken = createToken
  (jwtPayload,config.jwt_access_secret as string,'1d')

  const refreshToken = createToken
  (jwtPayload,config.jwt_refresh_secret as string, '100d')
  // console.log(payload);
  return {
    accessToken,
    refreshToken,
    needsPasswordChange:isUserExits.needsPasswordChange,
  };
}


const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {

  const isUserExits = await User.findOne({ id: user.userId }).select('+password')

  if (!isUserExits) {
    throw new AppError(404, 'This user is not found!')
  }

  if (isUserExits.isDeleted) {
    throw new AppError(404, 'This user is deleted!')
  }

  if (isUserExits.status === 'blocked') {
    throw new AppError(404, 'This user is blocked!')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    isUserExits.password
  )

  if (!isPasswordMatched) {
    throw new AppError(400, 'Password do not matched')
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  )

  const result = await User.findOneAndUpdate(
    { id: user.userId, role: user.role },
    {
      password: newHashPassword,
      needsPasswordChange: false,  
      passwordChangeAt:new Date()
    },
    { new: true }
  )

  return result
}

const forgetPassword =async (userId:string) =>{

  const isUserExits = await User.findOne({ id: userId }).select('+password')

  if (!isUserExits) {
    throw new AppError(404, 'This user is not found!')
  }

  if (isUserExits.isDeleted) {
    throw new AppError(404, 'This user is deleted!')
  }

  if (isUserExits.status === 'blocked') {
    throw new AppError(404, 'This user is blocked!')
  }

  const jwtPayload = {
    userId:isUserExits.id,
    role:isUserExits?.role,
  }
  const accessToken = createToken
  (jwtPayload,config.jwt_access_secret as string,'10m')

  const resetUiLink = `${config.reset_password_link}?id=${isUserExits.id}&token=${accessToken}`


  sendEmail(isUserExits.email,resetUiLink)
}


const resetPassword = async (payload:{id:string, newPassword:string},token:string)=>{
  const isUserExits = await User.findOne({ id: payload.id }).select('+password')

  if (!isUserExits) {
    throw new AppError(404, 'This user is not found!')
  }

  if (isUserExits.isDeleted) {
    throw new AppError(404, 'This user is deleted!')
  }

  if (isUserExits.status === 'blocked') {
    throw new AppError(404, 'This user is blocked!')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.newPassword,
    isUserExits.password
  )

  if (!isPasswordMatched) {
    throw new AppError(400, 'Password do not matched')
  }
}


export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
}