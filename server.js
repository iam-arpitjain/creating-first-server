const http = require('http'); //package import

const port = 8081; //local port

const toDoList = ["Playing Cricket", "Playing Valleyball"];

http.createServer((request, response) => {
    const { method, url } = request;

    if (url === "/todos") {
        if (method === "GET") {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(toDoList.toString());
        }
        else if (method === "POST") {
            let body = "";
            request.on('error', (err) => {
                console.error(err);
            })
                .on('data', (chunk) => {
                    body += chunk;
                })
                .on('end', () => {
                    body = JSON.parse(body);
                    console.log("data : ", body);
                })
        }
        else {
            response.writeHead(501);
        }
    }
    else {
        response.writeHead(404);
    }

    response.end();
}).listen(port, () => {
    //callback function
    console.log(`Nodejs server started on port ${port}`);
});

// http:/localhost:8081 