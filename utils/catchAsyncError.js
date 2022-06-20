module.exports = theFnc => (req, res, next) => {
    Promise.resolve(theFnc(req, res, next)).catch(next)
}