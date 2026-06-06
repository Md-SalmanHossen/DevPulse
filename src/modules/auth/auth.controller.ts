
import type { Request,Response } from "express";
import catchAsync from "../../utils/catch-async.utils";
import *as authService from '../auth/auth.service';
import sendResponse from "../../utils/response.utils";
import { StatusCodes } from "http-status-codes";

export const signup = catchAsync(async (req: Request, res: Response) => {
   
   const result =await authService.signupIntoDB(req.body);

   sendResponse(res,{
      statusCode:StatusCodes.CREATED,
      success:true,
      message:'User registered successfully',
      data:result,
   })
});

