const express = require('express');
const router = express();
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    }, 
    filename:(req, file, cb) => {
        cb(null, "CNP_" + file.originalname);
    }
});

const upload = multer({storage: fileStorageEngine});
router.post("/upload", upload.single("email_list"), (req, res)=>{
    if(!req.file){
        res.status(404).json("Please Upload a File");
        return;
    }
    console.log(req.file);
    res.send("File Uploaded!");
});

module.exports = router;