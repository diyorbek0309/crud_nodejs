const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const books = [
    {id: '1', name: 'book1'},
    {id: '2', name: 'book2'},
    {id: '3', name: 'book3'},
    {id: '4', name: 'book4'}
]

app.get('/', (req, res) => {
    res.send('Salom');
})

app.post('/api/books', (req, res) => {
    const { error } = validateBooks(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const book = {
        id: books.length + 1,
        name: req.body
    }
    books.push(book);
    res.status(201).send(book);
})

app.get('/api/books', (req, res) => {
    res.send(["sjdjshdjhs", "sdhjsh", "sdhhjhfh", "sdhjsh"]);
})

app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        res.status(404).send("Berilgan IDli kitob topilmadi!");
    }
    res.send(book);
})

app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        res.status(404).send("Berilgan IDli kitob topilmadi!");
    }

    const { error } = validateBooks(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    book.name = req.body.name;
    res.send(book);
})

function validateBooks (book) {
    const bookSchema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
    })
    return bookSchema.validate(book);
}

app.listen(5000, () => {
    console.log("5000 port");
})