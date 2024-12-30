const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizerController');

router.post('/organizers', organizerController.createOrganizer);
router.get('/organizers', organizerController.getOrganizers);
router.put('/organizers/:organizerId', organizerController.updateOrganizerPermissions);
router.delete('/organizers/:organizerId', organizerController.deleteOrganizer);

module.exports = router;
