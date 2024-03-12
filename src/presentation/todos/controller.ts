import { create } from "domain";
import { Request, Response } from "express"


const todos = [
    { id: 1, text: "Buy Milk", completedAt: new Date() },
    { id: 2, text: "Buy fish", completedAt: null },
    { id: 3, text: "Buy new flutter course", completedAt: new Date() },
];


export class TodosController{

    //* DI
    constructor(){
        
    }

    //all todos
    public getTodos = (req: Request, res: Response)=>{

        return res.json( todos );
    }
    //:id
    public getTodoById = (req: Request, resp: Response) => {

        const id: number = Number(req.params.id);
        if( isNaN(id) ) return resp.status(400).json({error: "ID Argument is not a number"});

        const todo = todos.find( todo => todo.id == id  );

        ( todo )
        ? resp.json(todo)
        : resp.status(404).json({ error: `Todo with id ${ id } not found` })

    }      
    //CreatTodo
    public createTodo = ( req: Request, resp: Response )=>{

        const { text  } = req.body;
        if( !text ) return resp.status(400).json({ error: "Text property is required" } );


        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: new Date()
        }

        todos.push(newTodo);

        resp.json( newTodo );

    }  

    //Update Tdo
    public updateTodo = (req: Request, resp: Response) =>{

        const id: number = +req.params.id;
        if( isNaN( id ) ) return resp.status(400).json(
            {errror: "ID Argument is not a number"}
        );

        const todo = todos.find( todo => todo.id === id);
        if( !todo) return resp.status(404).json({ error: `Todo with id ${ id } was not found`})
        
        const { text, completedAt } = req.body;
        // if( !text ) return resp.status( 400 ).json( {error: "Text property is required"});
        // if( !createdAt ) return resp.status( 400 ).json( {error: "created at is required"});

        todo.text = text || todo.text;
        if( completedAt === "null"){
            todo.completedAt = null;
        }else{
            todo.completedAt = new Date( completedAt || todo.completedAt);
        }
    
        //! OJO Referencia

        resp.json( todo )
        // resp.json( updateTodo)
    }


    //DELETE ( elimninar fisciamente o marcar como inactivo)
    public deleteTodo = (req: Request, res: Response)=>{
        //tarea, eliminar un todo por id, la segunda peticion dara error
        const id: number = +req.params.id;
        
        const todo = todos.find( todo => todo.id === id);
        if( !todo ) return res.status( 404 ).json({error: "Todo not with id: " + id + " Not found"} );

        todos.splice( todos.indexOf(todo), 1);
        res.json( todo );
        
    }

}