const Organizer = require('../models/Organizer');

// Create a new organizer
exports.createOrganizer = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Organizer name is required' });
        }

        const newOrganizer = await Organizer.create({ name, permissions });
        res.status(201).json(newOrganizer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all organizers
exports.getOrganizers = async (req, res) => {
    try {
        const organizers = await Organizer.findAll();
        res.status(200).json(organizers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update organizer's permissions
exports.updateOrganizerPermissions = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const { permissions } = req.body;

        const organizer = await Organizer.findByPk(organizerId);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }

        organizer.permissions = permissions;
        await organizer.save();

        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an organizer
exports.deleteOrganizer = async (req, res) => {
    try {
        const { organizerId } = req.params;

        const organizer = await Organizer.findByPk(organizerId);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }

        await organizer.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
