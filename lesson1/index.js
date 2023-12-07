const http = require("http");

let homeCount = 0;
let aboutCount = 0;

const server = http.createServer((req, res) => {
    switch (req.url) {
        case "/":
            homeCount++;
            res.writeHead(200, {
                "Content-Type": "text/html; charset=UTF-8",
            });
            res.end(`<h2>Home</h2>
            <a href="/about">To about</a>
            <p>Visits count: ${homeCount}</p>`);
            break;
        case "/about":
            aboutCount++;
            res.writeHead(200, {
                "Content-Type": "text/html; charset=UTF-8",
            });
            res.end(`<h2>About</h2>
            <a href="/">Back to home</a>
            <p>Visits count: ${aboutCount}</p>`);
            break;
        default:
            res.writeHead(404, {
                "Content-Type": "text/html; charset=UTF-8",
            });
            res.end("<h1>Page not found</h1>");
            break;
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});