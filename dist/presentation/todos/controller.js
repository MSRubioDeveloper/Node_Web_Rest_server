"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, text: "Buy Milk", completedAt: new Date() },
    { id: 2, text: "Buy fish", completedAt: null },
    { id: 3, text: "Buy new flutter course", completedAt: new Date() },
];
class TodosController {
    //* DI
    constructor() {
        //all todos
        this.getTodos = (req, res) => {
            return res.json(todos);
        };
        //:id
        this.getTodoById = (req, resp) => {
            const id = Number(req.params.id);
            if (isNaN(id))
                return resp.status(400).json({ error: "ID Argument is not a number" });
            const todo = todos.find(todo => todo.id == id);
            (todo)
                ? resp.json(todo)
                : resp.status(404).json({ error: `Todo with id ${id} not found` });
        };
        //CreatTodo
        this.createTodo = (req, resp) => {
            const { text } = req.body;
            if (!text)
                return resp.status(400).json({ error: "Text property is required" });
            const newTodo = {
                id: todos.length + 1,
                text: text,
                completedAt: new Date()
            };
            todos.push(newTodo);
            resp.json(newTodo);
        };
        //Update Tdo
        this.updateTodo = (req, resp) => {
            const id = +req.params.id;
            if (isNaN(id))
                return resp.status(400).json({ errror: "ID Argument is not a number" });
            const todo = todos.find(todo => todo.id === id);
            if (!todo)
                return resp.status(404).json({ error: `Todo with id ${id} was not found` });
            const { text, completedAt } = req.body;
            // if( !text ) return resp.status( 400 ).json( {error: "Text property is required"});
            // if( !createdAt ) return resp.status( 400 ).json( {error: "created at is required"});
            todo.text = text || todo.text;
            if (completedAt === "null") {
                todo.completedAt = null;
            }
            else {
                todo.completedAt = new Date(completedAt || todo.completedAt);
            }
            //! OJO Referencia
            resp.json(todo);
            // resp.json( updateTodo)
        };
        //DELETE ( elimninar fisciamente o marcar como inactivo)
        this.deleteTodo = (req, res) => {
            //tarea, eliminar un todo por id, la segunda peticion dara error
            const id = +req.params.id;
            const todo = todos.find(todo => todo.id === id);
            if (!todo)
                return res.status(404).json({ error: "Todo not with id: " + id + " Not found" });
            todos.splice(todos.indexOf(todo), 1);
            res.json(todo);
        };
    }
}
exports.TodosController = TodosController;
