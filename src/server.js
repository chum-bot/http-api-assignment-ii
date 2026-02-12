const http = require('http')
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const getRespHandler = require('./getResponses.js')
const postRespHandler = require('./postResponses.js')
const htmlHandler = require('./htmlResponses.js')

const urlStruct = {
    '/': htmlHandler.getIndex,
    index: htmlHandler.getIndex,    
    '/style.css': htmlHandler.getCSS,
    '/getUsers': getRespHandler.getUsers,
    '/notReal': getRespHandler.getNotReal,
    '/addUser': postRespHandler.addUser
}

function onRequest(request, response) {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

    //handler for urls
    const handler = urlStruct[parsedUrl.pathname];
    if(handler) {
        return handler(request, response);
    }
    return getRespHandler.getNotFound(request, response);
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
})