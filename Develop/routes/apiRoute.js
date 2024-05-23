const router = require('express').Router();
const storage = require('../helper/storageHelper');

router.get('/notes', async (req, res) => {
    const notes = await storage.getNotes();
    res.json(notes);
});

router.post('/notes', async (req, res) => {
    const newNote = req.body;
    const note = await storage.addNotes(newNote);
    res.json(note);
});

router.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;
    await storage.deleteNotes(id);
    res.json({ ok: true });
});

module.exports = router;