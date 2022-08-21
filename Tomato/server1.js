const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const jq = require("./js/app")

const port = 3000;
const ip = "127.0.0.1";

const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`./html/${filename}`, (error, data) => {
        if (error) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Sorry, internal error")
        }
        else {
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data)
        }
    })
}
const server = http.createServer((request, response) => {
    const method = request.method;
    let url = request.url
    if (method === "GET") {
        const requestURL = new URL(url, `http://${ip}:${port}`)
        url = requestURL.pathname
        const lang = requestURL.searchParams.get("lang")
        let selector;
        if (lang === null || lang === "zh") {
            selector = "";
        }
        else if (lang === "en") {
            selector = "-en";
        }
        else {
            selector = "";
        }

        if (url === "/") {
            sendResponse(`index${selector}.html`, 200, response);
        }
        else if (url === "/about") {
            sendResponse(`about${selector}.html`, 200, response);
        }
        else if (url === "/test") {
            sendResponse(`test${selector}.html`, 200, response);
        }
        else if (url === "/login") {
            sendResponse(`login${selector}.html`, 200, response);
        }
        else if (url === "/login-success") {
            sendResponse(`login-success${selector}.html`, 200, response);
        }
        else if (url === "/login-fail") {
            sendResponse(`login-fail${selector}.html`, 200, response);
        }
        else {
            sendResponse(`404${selector}.html`, 404, response);
        }
    }
    else {
        if (url === "/process-login") {
            let body = [];
            request.on("data", function (chunk) {
                body.push(chunk);
            })

            request.on("end", () => {
                body = Buffer.concat(body).toString();
                body = qs.parse(body)
                console.log(body)
                if (body.userId == "ted" && body.password == "123") {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-success")
                }
                else {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-fail");
                }
                response.end();
            })
        }
    }
});



server.listen(port, ip, () => {
    console.log(`伺服器正在 http://${ip}:${port}`);
})