const express = require("express");
const router = express.Router();
const Word = require("../../models/Word");
const Scraper = require("images-scraper"),
  google = new Scraper.Google();

//@route GET api/users
const Jimp = require("jimp");

//@ Test
function writeImage(imageUrl,word,i){
 
  Jimp.read(imageUrl)
  .then(image => {
    return image
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(`./server/images/${word}-${i}.jpg`); // save
  })
  .catch(err => {
    console.error(err);
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
    console.log(data)
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
  Word.findOne({word:req.params.word})
    .then((data)=>{
      if(data){
        res.json("word already exist")
      }
      else{
        getImages(req.params.word)
        const word = new Word({
          word:req.params.word
        })
        word.save()
            .then((data)=>res.json(data))
            .catch((er)=>res.json(er))
      }
    }

    )
  
});

module.exports = router;
