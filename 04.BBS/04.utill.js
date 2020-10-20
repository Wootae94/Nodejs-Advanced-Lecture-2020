const crypto = require('crypto');
const dbModules = require('./db/db-modules');
const moment = require('moment')
module.exports = {
    generateHash: function (something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something);
        return shasum.digest('base64');
    },
    isLoggedIn: function (req, res, next) {
        if (!req.session.uid) {
            res.redirect('/login')
        } else {
            next();
        }
    },
    alreadyLoggedIn: function (req, res, next) {
        if (req.session.uid) {
            res.redirect('/home')
        } else {
            next();
        }
    },
    displayTime: function (modTime){
        let today = moment().format("YYYY-MM-DD")
        let dataTime = moment(modTime).format("YYYY-MM-DD HH:mm:ss");
        return (dataTime.indexOf(today) == 0) ?
        dataTime.substring(11) : dataTime.substring(0,10);
    }
}