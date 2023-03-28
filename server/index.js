import app from './server.js';
import mongodb from 'mongodb';
import { injectDBDAO } from './dao/reviewsDAO.js';

import dotenv from 'dotenv';
dotenv.config();

const MongoClient = mongodb.MongoClient;

const url = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

MongoClient.connect(url)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then((client) => {
    app.listen(port, async () => {
      await injectDBDAO(client);
      console.log(`Server listening on http://localhost:${port}...`);
    });
  });
