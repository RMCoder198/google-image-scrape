const express = require("express");
const router = express.Router();
const Word = require("../../models/Word");
const Scraper = require("images-scraper"),
  google = new Scraper.Google();
const fs = require("fs");

//@route GET api/users
const Jimp = require("jimp");

//@ Test
const port = 5000;
function writeImage(imageUrl,word,i){
  Jimp.read(imageUrl, function(err, image) {
    if (err) throw err;
    image
      .resize(250, 250)
      .quality(50)
      .grayscale()
      .write(`./server/images/${word}-${i}.jpg`);
    console.log("done");
  });
}
function getImages(word){
  google
  .list({
    keyword: word,
    num: 15,
    detail: true,
    nightmare: {
      show: false
    }
  })
  .then(function(data) {
    for (let i = 0; i < 15; i++) {
      writeImage(data[i].url,word,i)
     
    }


  
  })
  .catch(function(err) {
    console.log(err);
  });
}

router.get("/test", (req, res) => res.json({ message: "Test API works" }));

router.get("/getImages/:word", (req, res) => {
  Word.findOne({ word: req.params.word })
    .then(data => {
      let images =[]
      for(let i=0;i<15;i++){
          images[i]= `https://agile-chamber-19810.herokuapp.com/images/${req.params.word}-${i}.jpg` 
      }
      res.json(images)
    })
    .catch(err => res.json(err));
});

router.get("/words", (req, res) => {
  Word.find()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get("/images/:word", (req, res) => {
  getImages(req.params.word)
  const word = new Word({
    word:req.params.word
  })
  word.save()
      .then((data)=>res.json(data))
      .catch((er)=>res.json(er))
});

module.exports = router;
