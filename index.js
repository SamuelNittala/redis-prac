const express = require('express')
const axios = require('axios')
const cors = require('cors')
const Redis = require('redis')

const client = Redis.createClient()
const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.get("/photos",async (req,res) => {
    const albumId = req.query.albumId
    client.get("photos",async (error, photos) => {
        if (error) console.error(error);
        if (photos != null) {
            return res.json(JSON.parse(photos))
        }
        else {
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/photos",
                { params : { albumId }}
            )
            client.setex('photos',2400,JSON.stringify(data))
        }
        res.json(data)
    })
})

app.get("/photos/:id", async (req,res) => {
    
})
app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
})