const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// const { ApartmentRepository } = require('./src/infrastructure/mongo-db/apartment-repository');

const registerRoutes = () => {
  // const apartmentRouter = require('./src/routes/apartment-routes');
  // apartmentRouter.register(app, new ApartmentRepository());
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

  app.use(express.json());

  // registerRoutes();

  app.listen(port, () => {
    console.log(`listening at port ${port}`);
  });
})();