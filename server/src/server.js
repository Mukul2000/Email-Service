const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoute = require('./routes/api');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // support json encoded bodies

app.use("/api/", apiRoute);

const CONNECTION_URL1 = 'mongodb://localhost:27017/emailDB'; // Local test database.
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL1,  {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
.catch((err) => console.log(err.message));