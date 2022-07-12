var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

//GET1
router.get('/:id',(req,res,next) => {
    const query = {'id':req.params.id};
    Message.findOne(query).populate('sender')
    .then(message => {
        res.status(200).json({
        message: "Message Fetch", 
        messages: message
    });
    })
    .catch(error=> {
        res.status(500).json({
            message: 'An error occurred', 
            error: error
        });
    });
});
//GETOMNES
router.get('/',(req,res,next) => {
    Message.find()
    .populate('sender')
    .then(messages => {
        res.status(200).json({
            message: 'Messages fetched successfully!', 
            messages: messages
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred', 
            error: error
        });
    });
});

//POST
router.post('/',(req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
    const message = new Message({
        id: maxMessageId, 
        subject: req.body.subject, 
        msgText: req.body.msgText,
        sender: req.body.sender
    });
    message.save()
    .then(createdMessage => {
        res.status(201).json({
            message: 'Message added successfully', 
            document: message
        });
    })
    .catch(error=> {
        res.status(500).json({
            message: 'An error occurred', 
            error: error
        });
    });
});
//PUT
router.put('/:id', (req, res, next) => {
    const query = {'id':req.params.id};
    Message.findOne(query)
    .then(message => {
        message.name = req.body.name,
        message.subject = req.body.subject,
        message.msgText = req.body.msgText,
        message.sender = req.body.sender

        Message.updateOne(query, message)
        .then(result => {
            res.status(204).json({
                message: 'Message updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred', 
                error: error
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Message not found.',
            error: {document: 'Message not found'}
        });
    });
});
//DELETE
router.delete('/:id', (req, res, next) => {
    const query = {'id':req.params.id};
    Message.findOne(query)
    .then(message => {
        Message.deleteOne(query)
        .then(result => {
            res.status(204).json({
                message: 'Message deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred', 
                error: error
            });
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Message not found.', 
            error: { document: 'Message not found'}
        });
    });
});


