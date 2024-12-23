const express = require('express');
const {createTodo,
    getTodoById,
    getAllTodos,
    deleteTodo,
    updateTodo
} = require('./todoservice.js');

const router = express.Router();

router.post('/',async (req,res) => {
    try{
        const todo = await createTodo(req.body)
        res.status(201).send(todo) 
    }
    catch(error) {
        console.log(error,'error')
        res.sendStatus(500).send("Some error occured in the todos")
    }
})

router.get('/',async (req,res) => {
    try{
        const todos = await getAllTodos();
        res.status(200).send(todos); 
    }
    catch(error) {
        console.log(error,'error')
        res.sendStatus(500).send("Some error occured in the todos")
    }
})
router.get('/:id',async (req,res) => {
    try{
        const todos = await getTodoById(req.params.id);
        res.status(200).send(todos);
    }
    catch(error) {
        console.log(error,'error')
        res.sendStatus(500).send("Some error occured in the todos")
    }
})

router.put('/:id',async (req,res) => {
    try{
        const todos = await updateTodo(req.params.id,req.body);
        res.status(200).send("Todo Updated Successfully"); 
    }
    catch(error) {
        console.log(error,'error')
        res.sendStatus(500).send("Some error occured in the todos")
    }
})

router.delete('/:id',async (req,res) => {
    try{
        const todos = await deleteTodo(req.params.id);
        res.status(200).send("Todo Deleted Successfully"); 
    }
    catch(error) {
        console.log(error,'error')
        res.sendStatus(500).send("Some error occured in the todos")
    }
})

router.delete('/',async (req,res) => {
    try{
        const todos = await deleteAllTodo();
        res.status(200).send("Todo Deleted Successfully"); 
    }
    catch(error) {
        console.log(error,'error')
        res.sendStatus(500).send("Some error occured in the todos")
    }
})

module.exports=router;