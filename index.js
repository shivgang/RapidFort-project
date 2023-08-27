const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Files will be saved in the "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/upload',upload.single('file'),(req,res)=>{
    if (!req.file) {
        console.log(0);
        return res.status(400).send('No file uploaded.');
    }

    const fileInfo = {
        name: req.file.originalname,
        extension: path.extname(req.file.originalname),
        size: Math.round(req.file.size / 1024) + ' KB'
    };

    const fileLink = `<a href="/uploads/${req.file.originalname}" target="_blank">View File</a>`;

    res.send(`
        <h1>File Details</h1>
        <p>Name: ${fileInfo.name}</p>
        <p>Extension: ${fileInfo.extension}</p> 
        <p>Size: ${fileInfo.size}</p>
        <p>URL: ${fileLink}</p>
    `);
})


  
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})