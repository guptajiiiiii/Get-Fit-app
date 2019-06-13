const mongoose=require('mongoose'); 
const TrainerSchema=mongoose.Schema({ 
    _id : mongoose.Schema.Types.ObjectId,
   // _id : mongoose.Schema.Types.ObjectId,
    name: {type:String ,required:true},
    email: {type:String ,required:true}, 
    password:{type:Number,required:true},
    username:{type:String ,required:true},
    profileimage:{type:String ,required:true},
    experience:{type:Number,required:true},
    location:{type:String ,required:true},
    Feild:{type:String ,required:true}     
   
});
module.exports=mongoose.model('trainer',TrainerSchema);     