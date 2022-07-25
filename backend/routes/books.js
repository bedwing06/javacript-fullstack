const { Router } = require('express');
const router = Router();
const Book = require('../models/Books');
const { unlink } = require('fs-extra')
const path = require('path');

router.get('/', async(req, res) => {
    const books = await Book.find()
    res.json(books)
})

router.post('/', async(req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({ title, author, isbn, imagePath });
    await newBook.save()
    res.json({ message: 'Book saved' });
})

router.delete('/:id', async(req, res) => {
    const book = await Book.findOneAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + book.imagePath))
    res.json({ message: 'Book deleted' });
})




module.exports = router;