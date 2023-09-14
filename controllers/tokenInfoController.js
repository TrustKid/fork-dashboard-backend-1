const TokenInfo = require('../models/tokenInfoModel');
const catchAsyncError = require('../utils/catchAsyncError');

exports.getTokenInfo = catchAsyncError(async (req, res) => {
    TokenInfo.find().exec(function (err, ads) {
        if (err) return next(err);
        res.send(ads)
    })
})

exports.insertTokenInfo = function (req, res, next) {

    let data = req.body
    if (!data?.id) {
        let data = new TokenInfo(req.body)
        data.save(function (err, result) {
            if (err) return next(err)
            res.send(data)
        })
    } else {
        TokenInfo.updateOne({ _id: req.body.id }, req.body).exec((err, result) => {
            if (err) return next(err)
            TokenInfo.findById(req.body.id).exec((err1, result1) => {
                if (err1) return next(err1)
                res.send({
                    code: 200,
                    message: 'Update success!',
                })
            })
        })
    }

}

exports.updateTokenInfo = function (req, res) {
    TokenInfo.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        TokenInfo.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

