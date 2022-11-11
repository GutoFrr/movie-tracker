import app from './server.js'
import mongodb from 'mongodb'
import { injectDB } from './dao/reviewsDAO.js'

import dotenv from 'dotenv'
dotenv.config()

const MongoClient = mongodb.MongoClient

const url = process.env.MONGO_URL
const port = process.env.PORT || 5000

MongoClient.connect(url, {
  maxPoolSize: 50,
  writeConcern: 2500,
})
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .then((client) => {
    app.listen(port, async () => {
      await injectDB(client)
      console.log(`Server listening on port ${port}...`)
    })
  })
