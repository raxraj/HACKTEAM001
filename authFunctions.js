function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/")
}
function checkUnAuthenticated(req, res, next) {
    if (! req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/userHome")
    }
}
module.exports = {checkAuthenticated : checkAuthenticated , checkUnAuthenticated : checkUnAuthenticated}