const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');


router.get('/', authorController.listAuthors);


router.get('/create', authorController.createAuthorForm);

router.post('/create', authorController.createAuthor);

router.get('/edit/:id', authorController.editAuthorForm);

router.post('/edit/:id', authorController.editAuthor);

router.get('/delete/:id', authorController.deleteAuthorForm);
router.post('/delete/:id', authorController.deleteAuthor); 

module.exports = router;
