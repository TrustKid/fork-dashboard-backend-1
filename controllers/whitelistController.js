const Whitelist = require('../models/whitelistModel');

exports.getWhitelist = function (req, res) {
    // let data = req.body
    // console.log(data)
    Whitelist.find().sort({created_at:-1}).exec(function (err, user) {
        if (err)  return next(err);
        res.send(user)
    })
};

exports.addWhitelist = function (req, res) {
    // console.log(req.body)
    let data = {
        image:req.body.image,
        project:req.body.project,
        network:req.body.network,
        whitelist:req.body.whitelist,
        website:req.body.website,
        created_at:new Date().getTime()/1000
    }
    let whitlist = new Whitelist(data)
    whitlist.save(function(err, result){
        if(err) return next (err)
        res.send(whitlist)
    })
};

exports.updateWhitelist = function (req, res){
    console.log(req.body)
    Whitelist.updateOne({_id:req.body._id},req.body).exec((err, result)=>{
        if(err) return next(err)
        Whitelist.findById(req.body._id).exec((err1, result1)=>{
             if(err1) return next(err1)
                 res.send(result1)
         })
    })
}

exports.deleteWhitelist = function (req, res){
    // console.log(req.body)
    Whitelist.deleteOne({_id:req.body.id}).exec((err, result)=>{
        if (err)  return next(err);
        res.send(req.body.id)
    })
}
