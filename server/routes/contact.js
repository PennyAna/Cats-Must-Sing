var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

//GET1
router.get('/:id',(req, res, next) => {
    const query = {'id':req.params.id};
    Contact.findOne(query).populate('group')
    .then(contact => {
        res.status(200).json({
            message: 'Contact Fetch',
            contact: contact
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
    Contact.find().populate('group')
    .then(contacts => {
        res.status(200).json({
            message: 'Contacts fetched Successfully!', 
            contacts: contacts
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
    const maxContactId = sequenceGenerator.nextId("contacts");
    const contact = new Contact({
        id:  maxContactId, 
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    });
    contact.save()
    .then(createdContact => {
        res.status(201).json({
            message: 'Contact added successfully', 
            document: createdContact
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred', 
            error: error
        });
    });
});
/* //PUT
router.put('/:id', (req, res, next) => {
    const query = {id: req.params.id};
      Document.findOne(query)
        .then(document => {
          document.name = req.body.name;
          document.description = req.body.description;
          document.url = req.body.url;
          Document.updateOne(query, document)
            .then(result => {
              res.status(204).json({
                message: 'Document updated successfully'
              })
            }) */
//PUT
router.put('/:id', (req, res, next) => {
    console.log(req.body);
    const query = {id:req.params.id};
    Contact.findOne(query)
    .then(contact => {
        contact.id = req.body.id, 
        contact.name = req.body.name, 
        contact.email = req.body.email, 
        contact.phone = req.body.phone,
        contact.imageUrl = req.body.imageUrl,
        contact.group = req.body.group
        Contact.updateOne(query, contact)
        .then(result => {
            res.status(204).json({
                message: 'Contact updated successfully'
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
            message: 'Contact not found.',
            error: {document: 'Contact not found'}
        });
    });
});
//DELETE
router.delete('/:id', (req, res, next) => {
    const query = {'id':req.params.id};
    Contact.findOne(query)
    .then(contact => {
        Contact.deleteOne(query)
        .then(result => {
            res.status(204).json({
                message: 'Contact deleted successfully'
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
            message: 'Contact not found.', 
            error: { document: 'Contact not found'}
        });
    });
});


