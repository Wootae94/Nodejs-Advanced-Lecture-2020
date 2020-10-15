///로그인창
const template = require('./template');
const templateLogout = require('./templateLogout');

module.exports.mainForm = function (uid) {
    return `
    ${templateLogout.header(uid)}
    <div class="container" style="margin-top: 90px;">  
   
    </div>
    ${template.footer()}
    `
};