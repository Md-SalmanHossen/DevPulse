import { StatusCodes } from "http-status-codes";
import { pool } from "../../db/index.db";
import type { IUser } from "../../interfaces/auth.interface";
import AppError from "../../utils/app-error.utils";
import bcrypt from "bcryptjs";


export const signupIntoDB=async(payload:IUser)=>{
   const {name,email,password,role}=payload;

   const existingUser = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
   );

   if(existingUser.rows.length>0){
      throw new AppError('User already exists',StatusCodes.CONFLICT);
   }

   const hashedPassword = await bcrypt.hash(password,10);

   const result = await pool.query(
      `INSERT INTO users(name,email,password,role)
      VALUES($1,$2,$3,$4)
      RETURNING id,name,email,role,created_at,updated_at`,
      [name,email,hashedPassword,role]
   );

   return result.rows[0];
}

