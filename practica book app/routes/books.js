const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookcontroller');

router.get('/', bookController.listBooks);
router.get('/create', bookController.createBookForm);
router.post('/create', bookController.createBook);
router.get('/edit/:id', bookController.editBookForm);
router.post('/edit/:id', bookController.editBook);
router.get('/delete/:id', bookController.deleteBookConfirm); 
router.post('/delete/:id', bookController.deleteBook);

router.get('/:id', bookController.bookDetail);

module.exports = router;
