const express = require('express');
const router = express.Router();

const bookRoutes = require('./books');
const categoryRoutes = require('./categories');
const authorRoutes = require('./authors');
const publisherRoutes = require('./publishers');

router.use('/books', bookRoutes);
router.use('/categories', categoryRoutes);
router.use('/authors', authorRoutes);
router.use('/publishers', publisherRoutes);

module.exports = router;
