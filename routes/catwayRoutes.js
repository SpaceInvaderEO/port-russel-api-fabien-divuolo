const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Catway');
});

module.exports = router;