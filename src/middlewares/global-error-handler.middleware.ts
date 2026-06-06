import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler=(
   err:any,
   req:Request,
   res:Response,
   next:NextFunction
)=>{
   res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success:false,
      message:err.message || 'Something went wrong',
      error:err
   });
}

export default globalErrorHandler;