"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((request, response) => {
    var _a, _b;
    console.log(request.url);
    // resposne.write("Hola amigo!")
    //Serbir HTML
    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.write("<h1> Hola Mundo </h1>");
    // response.end();
    //Servir JSON
    // const data = { name: "Micke", age: 30, city: "Mexico"};
    // response.writeHead(200, {'Content-Type': 'application/json'})
    // response.end( JSON.stringify( data ));
    console.log(request);
    if (request.url === "/") {
        const htmlFile = fs_1.default.readFileSync("./public/index.html", "utf-8");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(htmlFile);
        return;
    }
    if ((_a = request.url) === null || _a === void 0 ? void 0 : _a.endsWith(".js")) {
        response.writeHead(200, { "Content-Type": "application/javascript" });
    }
    else if ((_b = request.url) === null || _b === void 0 ? void 0 : _b.endsWith(".css")) {
        response.writeHead(200, { "Content-Type": "text/css" });
    }
    const responseContent = fs_1.default.readFileSync(`./public${request.url}`, "utf-8");
    response.end(responseContent);
});
server.listen(8080, () => {
    console.log("Server runing on port 8080");
});
