module.exports.deleteForm = function (result) {
   
    return `
    <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Delete Form</title>
        </head>
        <body>
            <h3>Delete Page</h3>
            <hr>
            <form action="/delete" method="POST">
            <input type="hidden" name="ggid" value="${result.ggid}">
                ${result.NAME} 을/를 삭제하시겠습니까?
            <input type="hidden" name="NAME" value="${result.NAME}">
            <input type="submit" value="삭제" >
        </form>
    
        </body>
        </html>

    `
};