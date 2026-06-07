import app from "./app";
import config from "./configs/index.config";
import { initDB } from "./db/index.db";

const main = () =>{
   initDB();
   app.listen(config.port,()=>{
      console.log(`DevPulse app listening on port ${config.port}`)
   })
}
main();

export default app;