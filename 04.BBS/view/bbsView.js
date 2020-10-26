
const template = require('./template');


module.exports.viewForm = function (result, uid, uname, rows, _mine) {

    return `
    
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 150px;">
    <div class="row">
        <div class="col-1"></div>
        <div class="col-7">
            <h4>${result.title}</h4>
            <h6>글번호: ${result.bid} | ${result.modTime}</h6>
        </div>
        <div class="col-3" style="text-align: right;">
            <h4>${result.uname}</h4>
            <h6>조회 ${result.viewCount}&nbsp;&nbsp;댓글 ${result.replyCount}</h6>
        </div>
        <div class="col-1"></div>
        <div class="col-12"><hr></div>
        <div class="col-1"></div>
        <div class="col-10">        
                <p>${result.content}
                ${template.bbsButton(result.bid, _mine)}
                
                </p>
        </div>
        <div class="col-1">
        </div>
        <div class="col-12"><hr></div>
        <div class="col-1"></div>
        <div class="col-10">  
            ${template.reply(rows)}
        </div>
        <div class="col-1"></div>
        <div class="col-1"></div>
        <div class="col-10">  
                <br>
                <form action="/bbs/reply" method="POST">
                <input type="hidden" name="bid" value="${result.bid}">
                <input type="hidden" name="uid" value="${result.uid}">
                    <div class="form-group">
                        <label for="comment">댓글</label>
                        <textarea class="form-control" rows="3" name="comment"  id="comment"></textarea>
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
    </body>
</html>
    `
};