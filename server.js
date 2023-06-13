const express = require('express');
const { upload } = require('./middleware/multer');
const { connection } = require('./config/db');
const Image = require('./model/image');
const app = express();
const port = 5000; // or any port number you prefer
connection();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', async(req, res) => {
    const imageData = await Image.find({})
    console.log(imageData);
    res.render('index', {
        imageData
    });
});


app.post('/upload', upload.single('image'), async(req, res) => {
    // Handle the uploaded image here
    const { filename } = req.file;

    const image = new Image({ filename });
    if (image) {
        await image.save()
        res.redirect('/');
    }
});
app.post('/edit/:id', upload.single('image'), async(req, res) => {
    // Handle the uploaded image here
    const imageId = req.params.id;
    const { filename } = req.file;

    const image = await Image.findByIdAndUpdate(imageId, { $set: { filename } });
    if (image) {
        await image.save()
        res.redirect('/');
    }
});

app.get('/edit/:id', async(req, res) => {
    const imageId = req.params.id;
    const imageDataFromID = await Image.findById(imageId)
    if (imageDataFromID) {
        res.render(`edit`, { id: imageId, data: imageDataFromID });
    } else [
        res.sedn('No Image Found')
    ]
});

app.get('/delete/:id', async(req, res) => {
    const imageId = req.params.id;

    // Find the image by its ID and perform the necessary logic
    const deletedImage = await Image.findByIdAndRemove(imageId);
    if (deletedImage) {
        res.redirect('/')
    }
});

app.listen(port, () => {
    console.log(`
                        Server is listening on port $ { port }
                        `);
});