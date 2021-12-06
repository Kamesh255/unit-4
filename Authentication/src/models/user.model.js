const bcrypt = require('bcryptjs');

const {Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
        name: {type: String, required:true},
        email: {type: String, required: true,unique: true},
        password:{type: String,required:true}
        
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
//using sync
// userSchema .pre("save",function (next)  {//works for both create and update
//     if(!this.isModified("password")) return next();
//     const hash = bcrypt.hashSync(this.password,10)
//     // bcrypt.genSalt(10, function(err, salt) {
//     //     bcrypt.hash(this.password, salt, function(err, hash) {
//             // Store hash in your password DB.
//             this.password = hash;
//             return next();
// });
//using async
userSchema .pre("save",function (next)  {//works for both create and update
    if(!this.isModified("password")) return next();
    bcrypt.hash(this.password,10, (err,hash) => {
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(this.password, salt, function(err, hash) {
            // Store hash in your password DB.
            this.password = hash;
            return next();
});
});
userSchema.methods.checkPassword = function (password){
    return new Promise((resolve,reject) => {
    bcrypt.compare(password,this.password,function (err, same) {
        if(err) return reject (err);
        return resolve (same);


    });


    });
};

    
    



module.exports = model("user",userSchema);