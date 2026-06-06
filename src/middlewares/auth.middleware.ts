import type { NextFunction, Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import sendResponse from "../utils/response.utils";

const auth=(req:Request,res:Response,next:NextFunction)=>{
   try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if(!token){
         return sendResponse(res,{
            statusCode:StatusCodes.UNAUTHORIZED,
            success:false,
            message:"Unauthorized access"
         });
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user=decode as any;

      next()

   } catch (error) {
      return sendResponse(res,{
         statusCode: StatusCodes.UNAUTHORIZED,
         success:false,
         message:"Invalid token"
      });
   }
   
}



export default auth;