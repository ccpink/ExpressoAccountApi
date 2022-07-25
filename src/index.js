import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';

const multer = require("multer")
const app = express();

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//image upload code using multer

var storage = multer.diskStorage({
  destination: function (rec, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
})

var upload = multer({storage: storage});

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/contacts', routes.contact);

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
