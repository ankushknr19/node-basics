// vanilla node http server

const http = require('http')

const server = http.createServer( (req,res) => {
    if(req.url === '/'){
        res.write('Hello world from backend')
        res.end()

        console.log('api running on port 3000')
    }
}
    if(req.url === '/api/courses'){
        res.write('Hello world from backend courses')
        res.end()
    }
}
)

server.listen(3000)