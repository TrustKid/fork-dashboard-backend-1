const User = require('../models/userModel');

exports.loginUser = function (req, res) {
    let data = req.body
    console.log(data)
    User.find({email:data.email, password:data.password, role:data.role}).exec(function (err, user) {
        if (err)  return next(err);
        res.send(user)
    })
};

exports.signupUser = function (req, res) {
    let data = req.body
    
    User.find({email:data.email, role:data.role}).exec(function (err, userlist) {
        if (err)  return next(err);
        if(userlist.length==0){
            let user = new User(req.body)
            user.created_at = new Date().getTime()/1000
            user.save(function(err, result){
                if(err) return next (err)
                res.send('Sign up success!')
            })
        }else if(userlist.length>0){
            res.send('Aleady existing user!')
        }
    })
    
};

exports.getUser = function (req, res){
    User.find().exec(function (err, user) {
        if (err)  return next(err);
        res.send(user)
    })
}

exports.deleteUser = function (req, res){
    User.deleteOne({_id:req.body.id}).exec((err, result)=>{
        if (err)  return next(err);
        res.send('Success!')
    })
}
exports.editUser = function (req, res){
    console.log(req.body)
    // User.findById(req.body.id).exec((err, result)=>{
    //     if (err)  return next(err);
        User.updateOne({_id:req.body._id},req.body).exec((err1,)=>{
            if (err1)  return next(err1);
            res.send(req.body)
        })
    // })
}
exports.deadUser = function (req, res){
    User.findById(req.body.id).exec((err, result)=>{
        if (err)  return next(err);
        if(result.dead)result.dead=false
        else result.dead=true
        User.updateOne({_id:req.body.id},result).exec((err1,result1)=>{
            if (err1)  return next(err1);
            res.send(result)
        })
    })
}
