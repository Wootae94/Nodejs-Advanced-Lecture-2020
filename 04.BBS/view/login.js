///로그인창
const template = require('./template');

module.exports.loginForm = function () {
    return `
    ${template.header()}
    <style>
        /* Make the image fully responsive */
        .carousel-inner img {
           
            height: 100%
        }
    </style>
    <div class="container" style="margin-top: 90px;">  
    <div id="demo" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../img/chicago.jpg" alt="chicago" width="1100" height="500" >
                    <div class="carousel-caption">
                        <h3 style="background-color: black;">chicago</h3>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../img/la.jpg" alt="la" width="1100" height="500" >
                    <div class="carousel-caption">
                        <h3 style="background-color: black;">Los Angeles</h3>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../img/ny.jpg" alt="ny" width="1100" height="500" >
                    <div class="carousel-caption">
                        <h3 style="background-color: black;">New York</h3>     
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
            <div class="container">
                <form class="form" action="/login" method="POST">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td>
                                  <label for="uid" class="col-form-label">사용자 ID </label>
                                </td>
                                <td>
                                  <input type="text" class="form-control" id="uid" name="uid" placeholder="아이디">
                                </td>
                            </tr>
                            <tr>
                              <td>
                                  <label for="pwd" class="col-form-label">패스워드</label>
                              </td>
                              <td>
                                  <input type="password" class="form-control" id="pwd" name="pwd" placeholder="********">
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2" style="text-align: center;">
                                  <button type="button" class="btn btn-primary">로그인</button>
                                  <button onclick="location.href='/home'" type="button" class="btn btn-secondary">취소</button>
                              </td>
                          </tr>
                        </tbody>
                    </table>
                    <button onclick="location.href='/user/register'" type="button" class="btn btn-success btn-sm">회원가입</button>
                </form>
            </div>
        </div>
        <div class="col-3"></div>
    </div>
    ${template.footer()}
    `
};