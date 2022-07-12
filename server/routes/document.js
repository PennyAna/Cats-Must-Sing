var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

//GET1 COMPLETE
router.get('/:id',(req, res, next) => {
    const query = {'id': req.params.id};
    Document.findOne(query).populate('name')
    .then(document => {
        res.status(200).json({
            message: 'Document Fetch',
            document: document
        });
    })
    .catch(error=> {
        res.status(500).json({
            message: 'An error occurred', 
            error: error
        });
    });
});
//GETOMNES COMPLETE
router.get('/',(req,res,next) => {
    Document.find().populate('name')
    .then(documents => {
        res.status(200).json({
        message: "Documents fetched successfully!", 
        documents: documents});
    })
    .catch(error=> {
        res.status(500).json({
            message: 'An error occurred', 
            error: error
        });
    });
});

//POST
router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
    document.save()
      .then(createdDocument => {
        res.status(201).json({
          message: 'Document added successfully',
          document: createdDocument
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });
//PUT
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });
//DELETE
router.delete('/:id', (req, res, next) => {
    const query = {'id': req.params.id};
    Document.findOne(query)
    .then(document => {
        Document.deleteOne(query)
        .then(result => {
            res.status(204).json({
                message: 'Document deleted successfully'
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
            message: 'Document not found.', 
            error: { document: 'Document not found'}
        });
    });
});


