const express = require('express')

const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'Biology'},
    {id: 2, name: 'Physics'},
    {id: 3, name: 'Nepali'},
]

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

// handling post request

// send a course object in the body of request
// it is json object so need to parse json by using express.json() middleware

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name  // this input needs validation. Never trust what the client sends you.
    } 
    courses.push(course) //array.push appends new elements in array

    res.send(course) //respond with newly posted element

})

app.listen(3000, console.log('listening on port 3000'))