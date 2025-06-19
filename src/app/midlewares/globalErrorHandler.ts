import express, {  NextFunction, Request, Response } from 'express';

const globalErrorhandler = (err :any, req: Request, res: Response , next: NextFunction)=>{
  const statusCode = err.statusCode || 300;
  const message = err.message || 'something went wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  })

}

export default globalErrorhandler;