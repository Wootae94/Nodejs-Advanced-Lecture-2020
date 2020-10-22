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
            <input type="text" class="form-control" placeholder="제목 검색" name="search" id="search">
            <div class="input-group-append">
            <button class="btn btn-secondary" type="submit"><i class="fas fa-search"></i></button>
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
    footer: function () {
        return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-bottom">
        <span class="navbar-text">
            Copyright &copy; 2020 Hoseo Institute of Big Data
        </span>
    </nav>

        `;
    },
    reply: function (rows) {
        let tableRow = ``
        for (let row of rows) {
            tableRow += (row.isMine == 0) ?
                `<div class="card bg-light text-dark mt-1" style="margin-right: 60%;">` :
                `<div class="card bg-dark text-light text-right mt-1" style="margin-left: 70%;">`;
            tableRow +=
                `  
            <div class="card-body">
            <h6 class="card-title">${row.uname} ${row.regTime}</h6>
            <p class="card-text"> 
                    ${row.content.replace(/\r/g, '<br>')}
                    </p>
                    </div>
                </div>
              `;
        }
        return `
                     ${tableRow}
         `
    },
    bbsButton: function (bid, _mine) {
        let buttons =
            (_mine == 1) ?
                `<div class="float-right">
             <button type="button" class="btn btn-primary btn-sm" onclick="location.href='/bbs/update/bid/${bid}'"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-danger btn-sm" onclick="location.href='/bbs/delete/bid/${bid}'"><i class="far fa-trash-alt"></i></button>
            </div>`: ''
        return `${buttons}`
    },
    page: function (pageNo, startPage, endPage, totalPage, router) {
        let leftPage = (pageNo > 10) ? `/${router}/list/${Math.floor(pageNo / 10) * 10}` : '#';
        let pages = ``
        pages += `<li class="page-item">
                    <a class="page-link active" href="${leftPage}">
                    Previous</a>
                </li>`;
        for (let page = startPage; page <= endPage; page++) {
            if (page === pageNo)
                pages += `<li class="page-item active"><a class="page-link" href="#">${page}</a></li>`;
            else
                pages += `<li class="page-item"><a class="page-link" href="/${router}/list/${page}">${page}</a></li>`;
        }
        let rightPage = (endPage < totalPage) ? `/${router}/list/${Math.ceil(pageNo / 10) * 10 + 1}` : '#';
        pages += `<li class="page-item">
                <a class="page-link" href="${rightPage}">
                Next</a>
            </li>`;
        return pages
    }
}