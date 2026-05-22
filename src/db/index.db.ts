import { Pool } from "pg";
import config from "../configs/index.config";

export const pool = new Pool({
   connectionString : config.connection_string,
})

export const initDB = async()=>{
   try {
      console.log("Database connected successfully");
      
   } catch (error) {
      console.log(error);
   }
}