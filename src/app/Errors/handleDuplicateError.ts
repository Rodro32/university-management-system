import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/errors";


const handleDuplicateError = (err: any ) :TGenericErrorResponse=>{

  const match = err.message.match();
  const extractedMessage = match && match[1];

  const errorSource :TErrorSource = [{
    path:'',
    message:`extractedMessage`,
  }]

  const statusCode = 400;
  return {
    statusCode,
    message:"InvalidId",
    errorSource
  }
}

export default handleDuplicateError;