const mongoose=require("mongoose");
const DATABASE_URL=process.env.DATABASE_URL;
console.log(DATABASE_URL)

mongoose.connect(DATABASE_URL).then(()=>{
    console.log(" database connected");
})

.catch((err)=>{
    console.log(err.message);
})