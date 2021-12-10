const mongoose = require('mongoose');

const evalMarksSchema = mongoose.Schema({
    eval_id : 
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"eval",
      required:true 
   },
   student_id:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"student",
     required:true
   },
   marks:{type:Number, required:true}
 },{
  versionKey:false
})
module.exports = mongoose.model('evalMark', evalMarksSchema); 