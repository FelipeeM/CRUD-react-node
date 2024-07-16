const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { swaggerUi, specs } = require('./swagger');


const app = express()
const port = parseInt(process.env.PORT) || 3333;

app.use(cors())
app.use(express.json())

app.use("/api/v1", routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
