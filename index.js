const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express(); 
const Todo = require('./models/Todo.js');
const {createTodo,getTodoById,
    getAllTodos,
    deleteTodo,updateTodo} 
    = require('./controllers/todoservice.js');
const todosRoutes = require('./controllers/todorouters.js');

// middleware

app.use(cors())

app.set('view engine', 'ejs') 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
    console.log("use is trigered")
    next()
})


// app.get('/user/:profile', (req, res) => {
//     res.send(profile is ${req.params.profile})
// })



// app.get('/', (req, res) => {
//     res.send('get is trigered')
// })


// app.put('/', (req, res) => {
//     res.send('put is trigered')
// })


// app.delete('/profile', (req, res) => {
//     res.send('delete is trigered')
// })

// app.get('/register', (req, res) => {
//     res.render('register')
// })

app.post('/register', async (req, res) => {
    try {
        console.log(req.body)

        const { email, password } = req.body // obj destructuring

        if (password.length < 6) {
            res.status(400).send("password length is greater than 6")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ email, password: hashPassword });

        await newUser.save(); // it is saying that i will await for sometime until the collection created

        console.log(newUser);

        res.send(`hi, thanks for registering with ${email}`)
    } catch (error) {

        if (error.code == 11000) {
            res.status(500).send("email already exists")
        }
        console.log(error, "error")
        res.status(500).send('Error while registering')
    }

})

// app.get('/login', (req, res) => {
//     res.render('login')
// })

app.post('/login', async (req, res) => {

    console.log(req.body)

    const { email, password } = req.body // obj destructuring

    const useravailable = await User.findOne({ email });

    console.log(useravailable, 'Useravailable')

    if (!useravailable) {
        return res.status(400).send("Invalid username or user not found")
    }

    const isMatching = await bcrypt.compare(password, useravailable.password)

    if (!isMatching) {
        return res.status(400).send('Password is incorrect')
    }

    const SECRET_KEY = 'diksha123'
    const token = jwt.sign({
        id: useravailable._id, email: useravailable.email,
    }, SECRET_KEY, { expiresIn: '1m' })

    res.status(200).send({
        message: 'Login successful',
        token: token
    })

})


app.use('/todos',todosRoutes);

app.use((req, res) => {
    res.render('404')
})

const port = 3000;

// string literals

const mongooseurl = "mongodb+srv://dikshaps844:diksha2003@cluster0.rlmdn.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongooseurl)
    .then(() => console.log('Connected to Mongodb Atlas'))
    .catch(err => console.log('error is triggered',err))

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})