const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"public/Images")
    },
    filename:function (req,file,cb){
        return cb(null,`${file.filename}${Date.now()}_${file.originalname}`)
    }
})

exports.upload=multer({storage})