const TokenInfo = require('../models/tokenInfoModel');
const ApiFeatures = require('../utils/apifeatures');
const catchAsyncError = require('../utils/catchAsyncError');

exports.getTokenInfo = catchAsyncError(async (req, res) => {
    const projectCount = await TokenInfo.countDocuments();
    const apifeature = new ApiFeatures(TokenInfo.find(), req.query).search().filter()
        .pagination(projectCount)

    let data = await apifeature.query;

    TokenInfo.find().exec(function (err, projects) {
        if (err) return next(err);
        res.send(data)
    })
})


exports.insertTokenInfo = function (req, res, next) {

    let data = req.body
    console.log(data)
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
