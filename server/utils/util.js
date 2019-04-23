const Scraper = require("images-scraper"),
  google = new Scraper.Google();

const Jimp = require("jimp");
const writeImage = function (imageUrl,word,i){
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
 const getImages = function (word){
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
  module.exports =getImages