const express = require("express");
const router = express.Router();
const Word = require("../../models/Word");
const getImages = require("../../utils/util")

//@ Test

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
