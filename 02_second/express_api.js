// install express: npm i express

const express = require('express')
const app = express()

// app.get()
// app.post()
// app.put()
// app.delete()

app.get('/', (req, res) => {
    res.send('Hello world from express backend')
})

// no if blocks. routes can be moved to different folder for code maintainability

app.get('/api/courses', (req, res) => {
    // response with list of courses
    res.send([1,2,3])
})

app.listen(3000, ()=> console.log('Listening on port 3000'))