const express = require('express')

const app = express()

courses = [
    {id: 1 , name: 'science'},
    {id: 2 , name: 'english'},
    {id: 3 , name: 'maths'},
]

app.get('/api/courses', (req, res) => {
    res.send(courses)
})


// http://localhost:3000/api/courses/10

app.get('/api/courses/:id', (req, res) => {
    //logic to find course from the array
    const course = courses.find(c => c.id === parseInt(req.params.id))
    //req.params.id returns string so parse to int

    if(!course) res.status(404).send('course with given id not found ')

    res.send(course)
})


const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))