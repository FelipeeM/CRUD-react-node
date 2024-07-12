const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = parseInt(process.env.PORT) || 3000;

app.use(cors())
app.use(express.json())

app.use("/api/v1", routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
