const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');


router.get('/', publisherController.listPublishers);


router.get('/create', publisherController.createPublisherForm);

router.post('/create', publisherController.createPublisher);

router.get('/edit/:id', publisherController.editPublisherForm);

router.post('/edit/:id', publisherController.editPublisher);

router.get('/delete/:id', publisherController.deletePublisherForm);
router.post('/delete/:id', publisherController.deletePublisher);

module.exports = router;
