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

module.exports={
    userModel
}
