///로그인창
const template = require('./template');

module.exports.chartForm = function (_label,_data,uid, uname) {
    
    return `
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 90px;">
    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
        <h2>게시물 조회수 Top6</h2>
        <hr>
    <script src="/Chart.js/Chart.js"></script>
    <canvas id="myChart" width="200" height="100"></canvas><script>var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ${_label},
            datasets: [{
                label: '게시물 조회수',
                data: ${_data},
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    </script>
    </div>
    <div class="col-2"><button onclick="location.href='/user/uid/admin/list/1'" class="btn btn-primary btn-sm" style="float:right;">회원관리</button></div></div>
    </div>
    </div>
        ${template.footer()}
    </body>
</html>
    `
};