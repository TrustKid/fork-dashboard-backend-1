const Project = require('../models/projectModel');
const LandingPageAds = require('../models/landingpageAdsModal');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');
const catchAsyncError = require('../utils/catchAsyncError');

exports.landingPageAds = catchAsyncError(async (req, res, next) => {
    let promises = [];
    req.body.adsGallery.forEach(async (image) => {
        promises.push(
            cloudinary.v2.uploader.upload(image, {
                folder: 'leoads'
            })
        )
    })

    const responses = await Promise.all(promises);
    const imagesLink = [];
    responses.map(({ public_id, secure_url }) => imagesLink.push({ public_id: public_id, url: secure_url }));

    await LandingPageAds.findOneAndUpdate(
        { "_id": '62af04ebb894488c7cbb7236' },
        { "$push": { "adsGallery": imagesLink } },
    ).exec((err, result) => {
        if (err) {
            return next(err)
        }
        return res.status(200).json({
            success: true,
            message: 'success'
        });
    })
})


exports.getLandingPageAds = catchAsyncError(async (req, res) => {
    LandingPageAds.find().exec(function (err, ads) {
        if (err) return next(err);
        res.send(ads)
    })
})


exports.removeLandingPageAds = catchAsyncError(async (req, res, next) => {
    const { adsId, id, public_id } = req.body;

    LandingPageAds.findOneAndUpdate(
        { "_id": adsId },
        { "$pull": { "adsGallery": { "_id": id } } },
    ).exec(async (err, result) => {
        if (err) {
            return next(err)
        } else {
            await cloudinary.v2.uploader.destroy(public_id);
            return res.status(200).json({
                success: true,
                message: 'success'
            });
        }

    })
})

exports.interval = catchAsyncError(async (req, res, next) => {
    const { id, interval, adsGallery } = req.body;
    const newData = {
        interval: Number(interval),
        adsGallery: adsGallery
    }

    const intervalStatus = await LandingPageAds.findByIdAndUpdate({ _id: id }, newData, {
        new: true,
    })

    if (intervalStatus) {
        res.status(200).json({
            success: true
        })
    }
})



exports.getProject = async (req, res) => {

    const projectCount = await Project.countDocuments();
    const apifeature = new ApiFeatures(Project.find(), req.query).search().filter()
        .pagination(projectCount)

    let products = await apifeature.query;
    // console.log('Line 21', products)

    Project.find().exec(function (err, projects) {
        if (err) return next(err);
        res.send(products)
    })
};

exports.saveProject = function (req, res) {
    // console.log(req.body)
    let project = new Project(req.body)
    project.isNew = true
    project.created_at = new Date().getTime()
    project.launchDateSearch = new Date(req.body.launchDate * 1000).toLocaleDateString();
    project.save(function (err, result) {
        if (err) return next(err)
        res.send(project)
    })
}

exports.updateProject = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.watchlist == true) result.watchlist = false
        else result.watchlist = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}


exports.updateProjectApprove = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.approved) result.approved = false
        else result.approved = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

exports.updateProjectDead = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.dead) result.dead = false
        else result.dead = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

exports.updateProjectRug = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.ruged) result.ruged = false
        else result.ruged = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

exports.updateAdminLanding = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.landing) result.landing = false
        else result.landing = true
        result.isNew = false
        Project.updateOne(
            { _id: req.body.id }, result).exec((err1, result1) => {
                if (err1) return next(err1);
                res.send(result)
            })
    })
}



exports.updateAdminFeatured = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.featured) result.featured = false
        else result.featured = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

exports.updateAdminHot = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.hot) result.hot = false
        else result.hot = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

exports.updateAdminTrending = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.trending) result.trending = false
        else result.trending = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

exports.updateAdminTop = function (req, res) {
    Project.findById(req.body.id).exec((err, result) => {
        if (err) return next(err);
        if (result.top) result.top = false
        else result.top = true
        result.isNew = false
        Project.updateOne({ _id: req.body.id }, result).exec((err1, result1) => {
            if (err1) return next(err1);
            res.send(result)
        })
    })
}

exports.updateProjectFunction = function (req, res) {
    // console.log(req.body)
    Project.updateOne({ _id: req.body._id }, req.body).exec((err, result) => {
        if (err) return next(err);
        res.send('Update success!')
        //    if(result.ruged)result.ruged=false
        //    else result.ruged=true
        //    result.isNew=false
        //    Project.updateOne({_id:req.body.id},result).exec((err1,result1)=>{
        //        if (err1)  return next(err1);
        //        res.send(result)
        //    })
    })
}

exports.editProject = function (req, res) {
    let project = req.body
    project.isNew = false
    Project.updateOne({ _id: req.body._id }, req.body).exec((err, result) => {
        if (err) return next(err)
        Project.findById(req.body._id).exec((err1, result1) => {
            if (err1) return next(err1)
            res.send(result1)
        })
    })
}

exports.removeProject = function (req, res) {
    Project.deleteOne({ _id: req.body.id }).exec((err, result) => {
        if (err) return next(err)
        res.send(req.body.id)
    })
}

exports.saveImage = function (req, res) {
    // console.log(req)
}
