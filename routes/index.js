const router = require('express').Router()
const uniqid = require('uniqid')
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils.js');


// GET route for getting db.json file data
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))).catch(() => res.json([]))
})

// POST route for adding a note into db.json file
router.post('/notes', (req, res) => {
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

// POST route for deleting a note from db.json file
router.delete('/notes/:id', (req, res) => {

    if (req.params.id) {
        readAndDelete(req.params.id, './db/db.json')
        res.json('Note deleted successfully')
    } else {
        res.json('Error in deleting note');
    }
})

module.exports = router;