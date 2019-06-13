const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');
const multer = require('multer');
const trainerModel = require('../Models/TrainerModel.js');

 var upload = multer({dest: './public/uploads'});


// router.get('/',function(req,res){
//     res.send("user's home").status(200);
// });

router.get('/',function(req,res){
        trainerModel.find()
    .exec()
    .then(orders=>{
        res.json(orders).status(200);

    })
});

router.delete("/:trainerID",function(req,res){
    const id=req.params.trainerID;
    trainerModel.deleteOne({_id:id})
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

router.post('/',upload.single('profileimage'),function(req,res){
   if(req.file){
       console.log('Uploading File....');
       var profileimage = req.file.filename;
   } else{
       console.log('No File Uploaded....');
       var profileimage = 'noimage.jpg';
   }

    const newTrainer =new trainerModel({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        profileimage:profileimage,
        experience:req.body.experience,
        location:req.body.location,
        Feild:req.body.Feild,
    });
    newTrainer.save(function(err,newEntry){
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
