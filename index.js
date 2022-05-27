const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const imageStorage = multer.diskStorage({   
    destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
            + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
        // upload only png and jpg format
        return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
}
});

app.post('/upload', imageUpload.single('image'), (req, res) => {
    console.log('Endpoint upload');
    res.send(req.file);
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

app.get('/', function (req, res) {
    res.send('OK');
})

app.listen(3000, () => console.log('running!'));
