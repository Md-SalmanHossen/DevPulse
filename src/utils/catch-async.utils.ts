import type { NextFunction, Request, Response } from "express";

type AsyncRequestHandler = (req : Request,res: Response,next:NextFunction)=>Promise<unknown>

const catchAsync=(func : AsyncRequestHandler)=>{
   return(req:Request,res:Response,next:NextFunction)=>{
      func(req,res,next).catch(next);
   }
}
export default catchAsync;