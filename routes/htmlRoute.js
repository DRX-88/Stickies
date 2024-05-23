const router = require('express').Router();
const path = require('path');

router.get('/notes', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'), (err) => {
    if (err) throw err;
  });
});

router.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if (err) throw err;
  });
});

module.exports = router;

