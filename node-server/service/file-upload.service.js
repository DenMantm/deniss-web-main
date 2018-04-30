// var path = require('path'),
//     fs = require('fs');

const formidable = require('formidable')
const path = require('path')
const uploadDir = path.join(__dirname, '/..', '/..', '/uploads/') //i made this  before the function because i use it multiple times for deleting later




exports.uploadImg = function(req, res) { // This is just for my Controller same as app.post(url, function(req,res,next) {....


console.log(uploadDir);

  var form = new formidable.IncomingForm()
  form.multiples = true
  form.keepExtensions = true
  form.uploadDir = uploadDir
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json({ uploaded: true })
  })
  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.')
    file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
  })
  
  
}





//option 2
// exports.uploadImage = function(req,res){
//     var tempPath = req.files.file.path,
//         targetPath = path.resolve('./uploads/image.png');
//     if (path.extname(req.files.file.name).toLowerCase() === '.png') {
//         fs.rename(tempPath, targetPath, function(err) {
//             if (err) throw err;
//             console.log("Upload completed!");
//         });
//     } else {
//         fs.unlink(tempPath, function () {
//             if (err) throw err;
//             console.error("Only .png files are allowed!");
//         });
//     }
//     // ...
// }