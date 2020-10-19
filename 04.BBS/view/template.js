module.exports = {
    header: function () {
        return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>My BBS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css"> 
    <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.min.css">
    <script src="/jquery/jquery.min.js"></script>
    <script src="/popper/popper.min.js"></script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
    
        `;
    },

    navbarLogin: function () {
        return `
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="/home">
            <img src="/img/logo.png" alt="호서직업능력개발원"
                style="height: 40px; margin-left: 50px; margin-right: 100px;">
        </a>
        <ul class="nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/home"><i class="fas fa-home"></i>홈</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/register">회원가입</a>
            </li>
        </ul>
        <div class="navbar-text fixed-right">
            로그인이 필요합니다.&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </nav>
        `
    },
    navbarUser: function (uid, uname) {
        return `
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="/home">
            <img src="/img/logo.png" alt="호서직업능력개발원"
                style="height: 40px; margin-left: 50px; margin-right: 100px;">
        </a>
        <ul class="nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/home"><i class="fas fa-home"></i>홈</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/bbs/write"><i class="fas fa-pen-square"></i>글쓰기</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/uid/${uid}"><i class="far fa-user"></i>사용자</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout">로그아웃</a>
            </li>
            <li class="nav-item">
            <form action="/bbs/list" method="POST">
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="작성자 검색" name="search" id="search">
            <div class="input-group-append">
            <button class="btn btn-secondary" type="submit" name="search" id="search"><i class="fas fa-search"></i></button>
            </div>
            </div>
            </form>
            </li>
        </ul>
        <div class="navbar-text fixed-right">
            ${uname} 님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </nav>
        `
    }, navbarReg: function () {
        return `
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="/home">
            <img src="/img/logo.png" alt="호서직업능력개발원"
                style="height: 40px; margin-left: 50px; margin-right: 100px;">
        </a>
        <ul class="nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/home"><i class="fas fa-home"></i>홈</a>
            </li>
            
        </ul>
    </nav>
        `
    },
    navbarAdmin: function () {
        return `
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="/home">
            <img src="/img/logo.png" alt="호서직업능력개발원"
                style="height: 40px; margin-left: 50px; margin-right: 100px;">
        </a>
        <ul class="nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/home"><i class="far fa-list-alt"></i>게시판</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/admin/list"><i class="far fa-user"></i>사용자</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout">로그아웃</a>
            </li>
            <li class="nav-item">
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search">
            <div class="input-group-append">
            <button class="btn btn-success" type="submit">Go</button>
            </div>
            </div>
            </li>
        </ul>
        <div class="navbar-text fixed-right">
            관리자 님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </nav>
        `
    },
    footer: function () {
        return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-bottom">
        <span class="navbar-text">
            Copyright &copy; 2020 Hoseo Institute of Big Data
        </span>
    </nav>
</body>
</html>
        `;
    },
    reply: function(rows){
        let tableRow = ''
    for (let row of rows) {
        tableRow += `
        <div class="card-columns">
    <div class="card bg-light">
      <div class="card-body text-left">
        <p class="card-text">${row.uname}
        ${row.regTime}<br>${row.content}
        </p>
      </div>
    </div>
        </div>
              `;
                        
    }
    return `
                     ${tableRow}
         `
    }
}