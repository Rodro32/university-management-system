import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/errors";
import config from "../config";
import handleZodError from "../Errors/handleZodError";
import handleValidationError from "../Errors/handleValidationError";


const globalErrorhandler: ErrorRequestHandler = (
  err , 
  req,
  res , 
  next)=>{

  let statusCode = err.statusCode || 300;
  let message = err.message || 'something went wrong';




  let errorSource : TErrorSource =[{
    path: '',
    message:'something went wrong!',
  }]


  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
   
    message = 'This is zod error';
  }
  else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }

    res.status(statusCode).json({
    success: false,
    message,
    errorSource ,
    stack: config.NODE_ENV === 'developement' ? err?.stack : null,
  })

}

export default globalErrorhandler;