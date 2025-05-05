
const express = require('express')
const http = require('http')
const port = process.env.PORT || 3000 // 5000 8080 3001

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const cookieParser = require('cookie-parser')

const { connectDb } = require('./utils/connection.util')

const indexRouter = require('./api/index.router')
const swaggerApiDoc = YAML.load('./api-docs/base.yaml')
const errorHandler = require('./api/common/middleware/error.middleware')

const app = express()
const server = http.createServer(app)

// db connection 
connectDb()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

const morgan = require('morgan')
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerApiDoc))
app.use('/', express.json(), indexRouter)

app.use(errorHandler)

server.listen(port, () => {
    console.log(`Server is listenning on port ${port}...`)
})

