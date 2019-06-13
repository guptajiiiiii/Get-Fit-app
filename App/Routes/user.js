const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');
const userModel = require('../Models/userModel.js'); 


// router.get('/',function(req,res){
//     res.send("user's home").status(200);
// });

router.get('/',function(req,res){
        userModel.find() 
    .exec()
    .then(orders=>{ 
        res.json(orders).status(200); 
        
    })
});

router.delete("/:productID",function(req,res){
    const id=req.params.productID;
    userModel.deleteOne({_id:id})
    .exec()
    .then(data=>{
        res.json(data).status(200);
    })
});  
// router.put('/:productId',function(req,res){
//     const id=req.params.productID;
//     const newage=req.body.age; 
//     MessageModel.updateOne({_id:id},{$set:{age:newage}}) 
//     .exec()
//     .then(data=>{
//         res.json(data).status(200);
//     })
//     .catch(err =>{
//          console.log(err);
//     });
// });

router.post('/',function(req,res){ 
    const newUser =new userModel({ 
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        profileimage:req.body.profileimage
    });
    newUser.save(function(err,newEntry){ 
        if(err){
            res.json(err).status(400);
        }else{
            res.json(newEntry).status(200); 
        }
      })
});

//router.post('/',function(req,res){
 //   console.log(req.body);
  //  res.json(req.body).status(200);
//});np
module.exports=router;
