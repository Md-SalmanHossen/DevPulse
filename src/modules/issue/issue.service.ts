import { Result } from "pg";
import { pool } from "../../db/index.db";
import type { IIssue } from "../../interfaces/issue.interface";
import AppError from "../../utils/app-error.utils";
import { StatusCodes } from "http-status-codes";


export const createIssueIntoDB = async(payload: IIssue,reporter_id:number)=>{
   const {title,description,type}=payload;

   const result = await pool.query(
      `INSERT INTO issues (title,description,type,reporter_id)
      VALUES($1,$2,$3,$4)
      RETURNING *`,
      [title,description,type,reporter_id]
   );
   return result.rows[0];
}

export const getAllIssuesFromDB=async ()=>{
    const issues = await pool.query(
      `SELECT * FROM issues ORDER BY created_at DESC`
    );
    return issues.rows;
}

export const getSingleIssuesFromDB=async (id:string)=>{
    const result = await pool.query(
      `SELECT * FROM issues WHERE id=$1`,
      [id] 
    );

    if(result.rows.length===0){
      throw new AppError('Issue not found',StatusCodes.NOT_FOUND);
    }

    return result.rows[0];
}

export const updateIssuesIntoDB=async (id:string,payload:Partial<IIssue>,userId:number,userRole:string)=>{
    const issue = await pool.query(
      `SELECT * FROM issues WHERE id=$1`,
      [id] 
    );

    if(issue.rows.length===0){
      throw new AppError('Issue not found',StatusCodes.NOT_FOUND);
    }

    const issueData=issue.rows[0];
    
    if(userRole==='contributor' &&(issueData.reporter_id!==userId || issueData.status!=='open')){
      throw new AppError("You can update only own open issues",StatusCodes.FORBIDDEN);
    };

    const {title,description,type}=payload;
    const result = await pool.query(
      `UPDATE issues
      SET title = COALESCE($1,title),
          description = COALESCE($2,description),
          type= COALESCE($3,type),
          updated_at = NOW()
      WHERE id = $4
      RETURNING *`,
      [title,description,type,id]
    );

    return result.rows[0];
}

export const deleteIssueIntoDB =async(id:string)=>{
  const result = await pool.query(
    `DELETE FROM issues WHERE id = $1 RETURNING id`,
    [id]
  );

  if(result.rows.length === 0){
    throw new AppError('Issues not found',StatusCodes.NOT_FOUND);
  }

  return result.rows[0];
}