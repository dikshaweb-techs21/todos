const express = require('express');
const Todo = require('../models/Todo.js');

const createTodo = async (tododata) => {
    const newTodo = new Todo(tododata)
    return await newTodo.save();
    }

const getTodoById = async (id) => {
    const todos = await Todo.findById(id);
    return todos;
    }
    
const getAllTodos = async () => { 
    return  await Todo.find();
}

const deleteTodo = async (id) => {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return deletedTodo;
}

const deleteAllTodo = async (id) => {
    const deletedTodo = await Todo.deleteMany({});
    return deletedTodo;
}

const updateTodo = async (id, updatedTodoData) => {
    const updatedTodo = await Todo.findByIdAndUpdate(id, updatedTodoData, {new: true});
    return updatedTodo;
}



module.exports = {
    createTodo,
    getTodoById,
    getAllTodos,
    deleteTodo,
    deleteAllTodo,
    updateTodo
}
