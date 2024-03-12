import { Router } from "express";
import { TodoRoutes } from "./todos/routes";



export class AppRoutes {

    static get routes(): Router{

        // Router de express
        const router = Router();


        //puedes mandar ref a la funcion , todocontroller.getTodos ( nadamas )
        router.use("/api/todos", TodoRoutes.routes );
    


        return router;
    }


}