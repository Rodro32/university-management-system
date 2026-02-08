import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../Errors/AppErrors";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";



const auth = (...RequiredRole:TUserRole[])=>{
  return catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
   const token = req.headers.authorization;

  //  is the token is send from the clint 
   if(!token){
    throw new AppError(400,'You are not Authorized!');
   }


  //  is the token is verified
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    const {role,userId} = decoded;

     //checking if the user is exits in the database
  const isUserExits = await User.findOne({id:userId}).select('+password')
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
    

    if(RequiredRole && !RequiredRole.includes(role)){
      throw new AppError(400,'You are not Authorized')
    }
    // decoded undefined
    req.user = decoded as JwtPayload

    next();

  
  })
  }
  export default auth;