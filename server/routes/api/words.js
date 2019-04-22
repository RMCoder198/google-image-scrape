const express = require("express");
const router = express.Router();
const Word = require("../../models/Word");
const Scraper = require("images-scraper"),
  google = new Scraper.Google();
const fs = require("fs"),
  request = require("request");
//@route GET api/users

//@ Test
const port = 5000;

const download = function(uri, folder, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);
    var dir = `./images/${folder}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    request(uri)
      .pipe(fs.createWriteStream(`${dir}/${filename}`))
      .on("close", callback);
  });
};

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
        download(
          data[i].url,
          req.params.word,
          `${req.params.word}${i}.png`,
          function() {
            console.log("done");
          }
        );
      }

      var image = [];
      for (let i = 0; i < 15; i++) {
        image.push(
          `http://${port}/images/${req.params.word}/${req.params.word}${i}.png`
        );
      }

      //   const word = new Word({
      //     word:req.params.word,
      //     images:image
      //   })
      // word.save()
      //   .then(data=>console.log(data))
      //   .catch(er=>console.log(er))

      console.log("first 10 results from google");

      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
