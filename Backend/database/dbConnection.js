
import mongoose from "mongoose";


export const dbConnection=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        dbName:"TASK_MANAGEMENTS"
    }).then(()=>{
        console.log("We are connected to database successfully!");
    }).catch((error)=>{
        console.log(`Something is Wrong to connected with Database :${error}`);
    })
}