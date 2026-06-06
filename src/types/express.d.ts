import {JwtPayload} from 'jsonwebtoken';

interface CustomJwtPayload extends CustomJwtPayload{
   id:number;
   name:string;
   role:"contributor"|"maintainer"
}

declare global{
   namespace Express{
      interface Request{
         user?:CustomJwtPayload
      }
   }
}