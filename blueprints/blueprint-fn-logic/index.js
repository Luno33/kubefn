const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello Function!')
})

module.exports = router
