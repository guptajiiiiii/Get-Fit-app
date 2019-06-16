const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');

 const detailModel = require('../Models/detailModel.js');

//  var upload = multer({dest: './public/uploads'});


// router.get('/',function(req,res){
//     res.send("user's home").status(200);
// });

router.get('/',function(req,res){
        detailModel.find()
    .exec()
    .then(orders=>{
        res.json(orders).status(200);

    })
});

// router.delete("/:trainerID",function(req,res){
//     const id=req.params.trainerID;
//     trainerModel.deleteOne({_id:id})
//     .exec()
//     .then(data=>{
//         res.json(data).status(200);
//     })
// });
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

    const newDetails =new detailModel({
        _id: new mongoose.Types.ObjectId(),

        username:req.body.username,
        day:req.body.day,
        dietplan:req.body.dietplan,
        schedule:req.body.schedule,

    });
    newDetails.save(function(err,newEntry){
        if(err){
            res.json(err).status(400);
        }else{
            //res.send(__dirname,+'../public'+'classification.html');
             res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/public/classification.html');
            // res.json(data).status(200);
            //  console.log(res.sendFile(path.join(__dirname+'/classification.html')));
            //  res.sendFile('/home/piyush/Desktop/lelo/Get-Fit-app/App/public/classification.html'); //chane krni hogi
        }
      })
});

//router.post('/',function(req,res){
 //   console.log(req.body);
  //  res.json(req.body).status(200);
//});np
module.exports=router;
