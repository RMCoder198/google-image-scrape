const Scraper = require("images-scraper"),
  google = new Scraper.Google();

const Jimp = require("jimp");

module.exports =  function getImages(word){
    /* Get 15 images using google-image-scarape package
     */
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
      for (let i = 0; i < data.length; i++) {
        
        writeImage(data[i].url,word,i)
       
      }
  
  
    
    })
    .catch(function(err) {
      console.log(err);
    });
  }
  /*
  Compress image and turn into grayscale then save
   */
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