const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/key').mongoUri;
const words = require('./routes/api/words.js');
const path = require('path');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',words);
app.use(express.static(__dirname ));
app.use(express.static(path.join(__dirname,'./images')))


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname,"../build")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
  });
}


mongoose.connect(db,{ useNewUrlParser: true }).then(()=> console.log("mongodb connected")).catch( err => console.log(err));
{ useNewUrlParser: true }
//passport middleware


//passport config

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server is running on port ${port}`));