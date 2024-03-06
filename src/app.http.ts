import fs from "fs";
import http from "http";

const server = http.createServer( (request, response)=>{

    console.log( request.url );

    // resposne.write("Hola amigo!")

    //Serbir HTML
    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.write("<h1> Hola Mundo </h1>");
    // response.end();

    //Servir JSON
    // const data = { name: "Micke", age: 30, city: "Mexico"};

    // response.writeHead(200, {'Content-Type': 'application/json'})
    // response.end( JSON.stringify( data ));

    console.log( request )
    if( request.url === "/"){
        const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
        response.writeHead(200, { "Content-Type": "text/html" });

        response.end( htmlFile );
        return;
    }

    if( request.url?.endsWith(".js")){
        response.writeHead(200, {"Content-Type": "application/javascript"} );

    }else if(request.url?.endsWith(".css")){
        response.writeHead(200, {"Content-Type": "text/css"} );
    }

    const responseContent = fs.readFileSync(`./public${ request.url }`, "utf-8");
    response.end( responseContent )

});



server.listen(8080, () =>{
    console.log("Server runing on port 8080"); 
})