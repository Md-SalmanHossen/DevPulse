import type { Request, Response } from "express";

const notFound=(req:Request,res:Response)=>{
   res.status(404).json({
      success:false,
      message:'Api not found'
   });
}

export default notFound;