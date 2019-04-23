const express = require("express");
const router = express.Router();
const Word = require("../../models/Word");
const getImages  = require("../../utils/util")

//@ Test

router.get("/test", (req, res) => res.json({ message: "Test API works" }));



router.get("/getImages/:word", (req, res) => {
  Word.findOne({ word: req.params.word })
    .then(data => {
      if(data){
      let images =[]
      for(let i=0;i<15;i++){
          images[i]= `http://localhost:5000/images/${req.params.word}-${i}.jpg` 
      }
      res.json(images)
    }
    else
    res.json("Images does not exist")
    })
    .catch(err => res.json(err));
});



/* 
GET get the all words
public
*/
router.get("/words", (req, res) => {
  Word.find()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});



/*
POST store word and get response 
public
*/
router.post("/images/:word", (req, res) => {
  Word.findOne({word:req.params.word})
    .then((data)=>{
      if(data){
        res.json("Search already exist")
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
