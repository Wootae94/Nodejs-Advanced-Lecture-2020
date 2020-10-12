module.exports.deleteForm = function (result) {
   
    return `
    <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Song Form</title>
        </head>
        <body>
            <h3>Delete Page</h3>
            <hr>
            <form action="/delete" method="POST">
            <input type="hidden" name="sid" value="${result.sid}">
                ${result.title} 을/를 삭제하시겠습니까?
            <input type="hidden" name="subject" value="${result.title}">
            <input type="submit" value="삭제" >
        </form>
    
        </body>
        </html>

    `
};