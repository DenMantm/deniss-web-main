var multer = require('multer');
var userImage = require('../database/models/user-image');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './app/uploads/img');
  },
  filename: function(req, file, cb) {
    cb(null, 'img' + '-' + Date.now() + " - " + file.originalname)
  }
});

const upload = multer({ storage: storage }).single('avatar');


exports.uploadImg = function(req, res) { // This is just for my Controller same as app.post(url, function(req,res,next) {....


  upload(req, res, function(err) {
    if (err) {
      // An error occurred when uploading
      throw err;
    }

    console.log("app/uploads/img/" + res.req.file.filename);
    
    
    var newUserImage = new userImage();
    
    newUserImage.itemName = "app/uploads/img/" + res.req.file.filename;
    newUserImage.itemGroup = "Your Uploads";
    
    
    newUserImage.save(function(err, image) {
        if (err)
            return res.send({ error: err });
        else
                res.json({
                  sucess: true,
                  message: 'Image was uploaded successfully',
                  image: image
                });
    });
    
    
    //save new image here....


    // Everything went fine
  })


}
