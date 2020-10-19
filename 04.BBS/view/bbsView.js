///로그인창
const template = require('./template');


module.exports.viewForm = function (result, uid, uname,rows) {

    return `
    
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 90px;">
    <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
            <table class="table table-borderless">
                <tr>
                    <th style=" float : left">${result.title}</th>
                    <th style=" float : right">작성자 : ${result.uname}</th>
                </tr>
                <tr>
                    <td style=" float : left">글번호 : ${result.bid} | ${result.modTime}</td>
                    <td style=" float : right">조회 ${result.viewCount} 댓글 ${result.replyCount}</td>
                </tr>
                <tr>
                    <td>
                        ${result.content}
                    </td>
                </tr>
                </table>
                <hr>
                ${template.reply(rows)}
            <form action="/bbs/view/reply" method="POST" style="margin-top: 90px;">
            <input type="hidden" name="bid" value="${result.bid}">
            <input type="hidden" name="uid" value="${result.uid}">
                <div class="form-group">
                    <label for="comment">댓글</label>
                    <textarea class="form-control" rows="3" name="comment" id="comment"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-sm">등록</button>
            </form>
        </div>
        <div class="col-1"></div>
    </div>
</div>
    <br>
    <br>
    <br>
    <br>
    <br>

    ${template.footer()}
    `
};