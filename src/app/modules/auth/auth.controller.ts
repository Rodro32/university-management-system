import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logged successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {



  const {...passwordData} = req.body;


  const result = await AuthServices.changePassword(req.user,passwordData);

  const {refreshToken,accessToken,needsPasswordChange} = result as any;

  res.cookie('refreshToken',refreshToken,{
    secure:config.NODE_ENV === 'production',
    httpOnly:true,
})

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password change successfully',
    data: {
      accessToken,needsPasswordChange
    },
  });
});

const forgetPassword = catchAsync(async (req, res) => {

  const userId = req.body.id
  const result = await AuthServices.forgetPassword(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reset link is generated successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {

  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(req.body,token)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password reset successful',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword
}