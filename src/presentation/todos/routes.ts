import { Router } from "express";
import { TodosController } from "./controller";



export class TodoRoutes {

    static get routes(): Router{

        // Router de express
        const router = Router();
        const todoController = new TodosController();

        //puedes mandar ref a la funcion , todocontroller.getTodos ( nadamas )
        router.get("/", (req, resp)=> todoController.getTodos( req, resp) );
        //buscar por ID
        router.get("/:id", todoController.getTodoById)
        //Creando recurso
        router.post("/", todoController.createTodo)
        //Update Todo
        router.put("/:id", todoController.updateTodo);
        //DELETE Todo
        router.delete("/:id", todoController.deleteTodo)

        return router;
    }


}