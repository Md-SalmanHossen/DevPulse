import type { NextFunction, Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../utils/response.utils";


const authorize=(...roles:('contributor'|'maintainer')[])=>{
  
   return (req:Request,res:Response,next:NextFunction)=>{

      const userRole =req.user?.role;

      if(!userRole || !roles.includes(userRole)){
         return sendResponse(res,{
            statusCode:StatusCodes.FORBIDDEN,
            success:false,
            message:'Forbidden access'
         });
      }

      next();
   }
}

export default authorize;