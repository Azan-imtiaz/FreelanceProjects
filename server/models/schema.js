const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
   newUsername: {
    required:true,type:String
   }, email: {
    required:true,type:String,unique:true
   }, newpassword: {
    required:true,type:String
   }
});
const userModel=mongoose.model("userModel",userSchema);





const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    newUsername: { type: String, required: true },
    newpassword: { type: String, required: true }, // Store temporarily, handle with caution
    createdAt: { type: Date, default: Date.now, expires: 600 } // Auto-delete after 10 minutes
});

const otpModel = mongoose.model('otpModel', otpSchema);


module.exports={
    userModel,otpModel
}

