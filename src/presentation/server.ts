import express, { Router } from "express"
import path from "path";

interface Options {
    PORT: number,
    PUBLIC_PATH?: string,
    routes: Router
}

export class Server {

    //importacion de express()
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(
        options: Options
    ){
        const {PORT, PUBLIC_PATH = "public", routes}= options;
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
        this.routes = routes
    }



    async start() {

        //* Middlewares
        //la data que venga en JSON la serializa para recibirla en express
        // como un obj valido de js
        this.app.use( express.json() )

        //data que venga por x-www-form-urlencoded
        this.app.use( express.urlencoded({extended: true}))
       
        //* Public Folder
        this.app.use( express.static( this.publicPath ) );


        //* Routes 
        this.app.use( this.routes )

        //si no existe la carpeta solicitada ( ej. search )
        //* SPA
        this.app.get("*", (req, res)=> {
           const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
           res.sendFile( indexPath )
        })

        //Puerto para que la app corra
        this.app.listen(this.port, ()=>{
            console.log("server running on port 3000")
        })
    }


}