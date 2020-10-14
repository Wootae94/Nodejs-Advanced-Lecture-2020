const template = require('./template');

module.exports.home = function () {
	return `
		${template.header()}
<div class="container" style="margin-top: 90px;">  
</div>
		${template.footer()}
    `;
}