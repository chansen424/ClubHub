const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config= require("config");
const applicants = require("./routes/applicants");
const orgs = require("./routes/orgs");

const app = express();

//Body Parser Middleware

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//DB Config

const db = config.get("mongoURI");

mongoose.connect(db, {useNewUrlParser: true})
.then(()=> console.log('Mongo DB connected'));

app.use('/api/applicants', applicants);
app.use('/api/orgs', orgs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));