import { StatusCodes } from "http-status-codes";
import { pool } from "../../db/index.db";
import type { IUser } from "../../interfaces/auth.interface";
import AppError from "../../utils/app-error.utils";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


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

export const loginUser = async(email:string,password:string)=>{
   
   const result =await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
   );

   if(result.rows.length===0){
      throw new Error('User not found');
   };

   const isMatched=await bcrypt.compare(password,result.rows[0].password);

   if(!isMatched){
      throw new AppError('Invalid credentials',StatusCodes.UNAUTHORIZED)
   }

   const user= result.rows[0];

   const token = jwt.sign(
      {
         id:user.id,
         name:user.name,
         role:user.role
      },
      process.env.JWT_SECRET as string,
      {expiresIn:'7d'}
   );


   return {
      token,
      user:{
         id:user.id,
         name:user.name,
         email:user.email,
         role:user.role,
         created_at:user.created_at,
         updated_at:user.updated_at,
      }
   }
}