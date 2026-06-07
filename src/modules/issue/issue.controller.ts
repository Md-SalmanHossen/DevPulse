import type { Request, Response } from "express";
import catchAsync from "../../utils/catch-async.utils";
import *as issuesService from '../issue/issue.service'
import sendResponse from "../../utils/response.utils";
import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/app-error.utils";

export const createIssue=catchAsync(async(req:Request,res:Response)=>{
   const result = await issuesService.createIssueIntoDB(req.body, req.user?.id as number);
   sendResponse(res,{
      statusCode:StatusCodes.CREATED,
      success:true,
      message:'Issue created successfully',
      data:result
   });
})

export const getAllIssues=catchAsync(async(req:Request,res:Response)=>{
   const result = await issuesService.getAllIssuesFromDB();
   
   sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:'Issue retrieved successfully',
      data:result
   });

})

export const getSingleIssues=catchAsync(async(req:Request,res:Response)=>{
   const {id}=req.params;

   if(!id){
      throw new AppError('Invalid or missing ID formate',StatusCodes.BAD_REQUEST)
   }

   const result = await issuesService.getSingleIssuesFromDB(id as string);
   
   sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:'Issue retrieved successfully',
      data:result
   });

})

export const updateIssue=catchAsync(async(req:Request,res:Response)=>{

   const result = await issuesService.updateIssuesIntoDB(
      req.params.id as string,
      req.body,
      req.user?.id as number,
      req.user?.role as string,
   )
   sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:'Issue update successfully',
      data:result
   });

})

export const deleteIssues=catchAsync(async(req:Request,res:Response)=>{
   const {id}=req.params;

   if(!id){
      throw new AppError('Invalid or missing ID formate',StatusCodes.BAD_REQUEST)
   }

   await issuesService.deleteIssueIntoDB(id as string);
   
   sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:'Issue deleted successfully',
      data:null
   });

})