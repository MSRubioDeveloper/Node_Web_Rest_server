import express from "express"
import path from "path";

interface Options {
    PORT: number,
    PUBLIC_PATH?: string
}

export class Server {

    //importacion de express()
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(
        options: Options
    ){
        const {PORT, PUBLIC_PATH = "public"}= options;
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
    }



    async start() {

        //* Middlewares


        //* Public Folder
        this.app.use( express.static( this.publicPath ) );

        //si no existe la carpeta solicitada ( ej. search )
        this.app.get("*", (req, res)=> {
           const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
           res.sendFile( indexPath )
        })

        this.app.listen(this.port, ()=>{
            console.log("server running on port 3000")
        })
    }


}