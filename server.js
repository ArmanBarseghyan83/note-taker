const express = require('express')
const uniqid = require('uniqid')
const path = require('path')

const { readFromFile, readAndAppend, readAndDelete } = require('./helpers/fsUtils');

const app = express()
const PORT = 3001

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})


app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))).catch(() => res.json([]))
})


app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.json('Error in adding note');
    }
})


app.delete('/api/notes/:id', (req, res) => {

    if (req.params.id) {
        readAndDelete(req.params.id, './db/db.json')
        res.json('Note deleted successfully')
    } else {
        res.json('Error in deleting note');
    }
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
