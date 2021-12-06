
const { Schema, model } = require("mongoose");





const postSchema = new Schema(
    {
        user_id: {
         type:Schema.Types.ObjectId,
         ref: "user",
         required: true,
        },
        body:{type: String, required: true},
      title: {type:String, required: true},
    

      
        
    },
    {
        versionKey: false,
        timestamp: true,
    }
);
    module.exports = model("post",postSchema); 