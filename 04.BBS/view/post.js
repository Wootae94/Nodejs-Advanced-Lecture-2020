///로그인창
const template = require('./template');
const templateLogout = require('./templateLogout');

module.exports.postForm = function (result,user) {
    
    return `
    
    ${templateLogout.header(user)}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
        <table class="table table-borderless">
        <tr >
            <th style =" float : left">${result.title}</th>
            <th style =" float : right">${result.uname}</th>
        </tr>
        <tr >
            <td style =" float : left">글번호 : ${result.bid} | ${result.modTime}</td>
            <td style =" float : right">조회 ${result.viewCount} 댓글 ${result.replyCount}</td>
        </tr>
        </table>
        <hr>
        <p style="margin-top: 50px;">${result.content}</p>
        <hr>
        <div class="form-group">
            <label for="comment">댓글</label>
            <textarea class="form-control" rows="5" id="comment" name="text"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">등록</button>
        </form>
            
        </div>
        <div class="col-1"></div>
    </div>
    
    </div>
    ${template.footer()}
    `
};