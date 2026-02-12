const http = require('http')
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const getRespHandler = require('./getResponses.js')
const postRespHandler = require('./postResponses.js')

const urlStruct = {
    '/': getRespHandler.getIndex,
    index: getRespHandler.getIndex,    
    '/style.css': getRespHandler.getCSS,
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
        handler(request, response);
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
})