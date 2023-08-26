const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(express.json());

const storage = multer.memoryStorage(); // Store file in memory for simplicity
const upload = multer({ storage: storage });

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/upload',upload.single('file'),(req,res)=>{
    if (!req.file) {
        console.log(0);
        return res.status(400).send('No file uploaded.');
    }
    if (req.file) {
        console.log(1);
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const fileExtension = path.extname(fileName);

    // Assuming the file contains text, you can convert the buffer to string
    const fileContent = fileBuffer.toString();

    const fileInfo = {
        name: fileName,
        extension: fileExtension,
    };
    console.log(req.file);

    res.json(fileInfo);
})


  
const PORT = 80 || process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})