const crypto = require('crypto');
const dbModules = require('./db/db-modules');
const moment = require('moment')
const am = require('./view/userAlertMsg');
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

    displayTime: function (modTime){
        let today = moment().format("YYYY-MM-DD")
        let dataTime = moment(modTime).format("YYYY-MM-DD HH:mm:ss");
        return (dataTime.indexOf(today) == 0) ?
        dataTime.substring(11) : dataTime.substring(0,10);
    },
    hasRight: function(req, res, next){
        if (req.params.uid === req.session.uid||req.session.uid == 'admin') { 
            next();
        } else {
            let html = am.alertMsg('권한이 없습니다.', '/')
            res.send(html);
        }
    }
}