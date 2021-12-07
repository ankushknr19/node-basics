const express = require('express')
const app = express()

const users = ['Ankush','Ankit','Rajeev']

app.get('/', (req, res) => res.send('Hello from express backend'))

app.get('/api/users', (req, res) => {
    res.send(users)
})

//route parameters to get specific data by req.params object
// rooute parameters are required values

app.get('/api/users/:id', (req, res) => {
    res.send(users[req.params.id])
})

// :id can be anything, and there can be multiple route parameters

//http://localhost:3000/api/posts/2021/01
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params)
})

// query string parameters are optional values, used to provide additional data to backend

//http://localhost:3000/api/story/2018/04?sortBy=name
app.get('/api/story/:year/:month', (req, res) => {
    res.send(req.query)
})

const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))