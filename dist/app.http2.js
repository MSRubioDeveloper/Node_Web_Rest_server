"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http2_1 = __importDefault(require("http2"));
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync("./keys/server.key"),
    cert: fs_1.default.readFileSync("./keys/server.crt")
}, (request, response) => {
    var _a, _b;
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
    try {
        const responseContent = fs_1.default.readFileSync(`./public${request.url}`, "utf-8");
        response.end(responseContent);
    }
    catch (error) {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end();
    }
});
server.listen(8080, () => {
    console.log("Server runing on port 8080");
});
