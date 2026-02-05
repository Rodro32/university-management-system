import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../Errors/AppErrors";
import jwt from 'jsonwebtoken';
import config from "../config";

const auth = ()=>{
  return catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
   const token = req.headers.authorization;

  //  is the token is send from the clint 
   if(!token){
    throw new AppError(400,'You are not Authorized!');
   }

  //  is the token is verified
  jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
    // err
    if(err){
      throw new AppError(400,'You are not Authorized')
    }
    // decoded undefined
    console.log(decoded)
  });

   next();
  })
  }
  export default auth;