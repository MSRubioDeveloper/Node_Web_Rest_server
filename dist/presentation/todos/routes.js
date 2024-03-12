"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TodoRoutes {
    static get routes() {
        // Router de express
        const router = (0, express_1.Router)();
        const todoController = new controller_1.TodosController();
        //puedes mandar ref a la funcion , todocontroller.getTodos ( nadamas )
        router.get("/", (req, resp) => todoController.getTodos(req, resp));
        //buscar por ID
        router.get("/:id", todoController.getTodoById);
        //Creando recurso
        router.post("/", todoController.createTodo);
        //Update Todo
        router.put("/:id", todoController.updateTodo);
        //DELETE Todo
        router.delete("/:id", todoController.deleteTodo);
        return router;
    }
}
exports.TodoRoutes = TodoRoutes;
