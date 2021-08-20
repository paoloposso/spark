const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');

const port = process.env.PORT || 3000;
require('dotenv').config();

const registerRoutes = () => {
  const { createSparkpostRepository } = require('./src/infrastructure/mongo-db/sparkpost-repository');
  const routes = require('./src/api/sparkpost-routes');
  const repo = createSparkpostRepository();

  routes.register(app, { repo });
};

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    if (mongoose.connection.readyState === 1) {
      console.log('connected to mongo');
    } else {
      console.log({
        error: 'error connecting to mongo.',
        state: mongoose.connection.readyState
      });
    }
  } catch (err) {
    console.log({
      error: err,
      state: mongoose.connection.readyState
    });

    throw err;
  }
}

(async () => {
  await connectToMongo();

  app.use(morgan('combined'));
  app.use(express.json());

  registerRoutes();

  app.listen(port, () => {
    console.log(`listening at port ${port}`);
  });
})();