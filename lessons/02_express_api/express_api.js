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

//app.listen(3000, ()=> console.log('Listening on port 3000'))


// use environment variable PORT whose value is set outside this application by host
// global object process, property env, name of env variable = PORT
// set environment variable by $ set PORT = 5000 in cmd !! didn't work :( 
const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}....`))