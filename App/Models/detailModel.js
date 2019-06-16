const mongoose=require('mongoose'); 
const DetailsSchema=mongoose.Schema({ 
    _id : mongoose.Schema.Types.ObjectId,
   // _id : mongoose.Schema.Types.ObjectId,
    
    username:{type:String ,required:true},
    
    day:{type:Number,required:true},
    dietplan:{type:String ,required:true},
    schedule:{type:String ,required:true}     
   
});
module.exports=mongoose.model('details',DetailsSchema);     