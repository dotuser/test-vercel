const express = require('express');
const Visitor = require('../models/Visitor');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const visitor = new Visitor({
            ...req.body,
        });
        const savedVisitor = await visitor.save();
        res.status(201).send(savedVisitor);
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const visitors = await Visitor.find().select('-__v');
        res.send(visitors);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;