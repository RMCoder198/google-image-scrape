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

router.get("/test", (req, res) => res.json({ message: "Test API works" }));

router.get("/image/:word", (req, res) => {
  Word.findOne({ word: req.params.word })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get("/words", (req, res) => {
  Word.find()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get("/images/:word", (req, res) => {
  google
    .list({
      keyword: req.params.word,
      num: 15,
      detail: true,
      nightmare: {
        show: false
      }
    })
    .then(function(data) {
      for (let i = 0; i < 15; i++) {
        Jimp.read(data[i].url, function(err, image) {
          if (err) throw err;
          image
            .resize(250, 250)
            .quality(50)
            .grayscale()
            .write(`./server/images/${req.params.word}-${i}.jpg`);
          console.log("done");
        });
      }

      var image = [];
      for (let i = 0; i < 15; i++) {
        image.push(
          `http://${port}/images/${req.params.word}/${req.params.word}${i}.png`
        );
      }

      const word = new Word({
        word: req.params.word,
        images: image
      });
      word
        .save()
        .then(data => console.log(data))
        .catch(er => console.log(er));

      console.log("first 10 results from google");

      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
