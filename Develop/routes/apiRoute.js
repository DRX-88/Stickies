const router = require('express').Router();
const storage = require('../helper/storageHelper');

router.get('/notes', async (req, res) => {
    storeData.getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

router.post('/notes', async (req, res) => {
    storage.addNotes(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', async (req, res) => {    
    storage.deleteNotes(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;