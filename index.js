const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
// const stream = require('youtube-audio-stream')
const { createReadStream } = require('fs')

// Middleware Connections
app.use(cors())
app.use(express.json())

const audioFile = createReadStream('./audio.mp3')

async function handleView (req, res) {
    try {
      for await (const chunk of audioFile) {
        res.write(chunk)
      }
      res.end()
    } catch (err) {
      console.error(err)
      if (!res.headersSent) {
        res.writeHead(500)
        res.end('internal system error')
      }
    }
  }

app.use("/:videoId", handleView)
// Routes

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})