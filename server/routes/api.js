const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/neuroshare', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('relapses')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
router.post('/users', function (req, res) {
    connection((db) => {  
        if(req.body.message == "add")       
        {
            db.collection('relapses')
            .update(
                { _id: 1 },
                //{ $addToSet: { relapses: { "relapse_id": id.toString(), "relapse_month": "August", "relapse_year": "2019", "last_updated_provider_id": "G00123", "save_csn": "865482572", "save_csn_status": "Open", "last_updated_instant": "08/31/2019 10:41:05", "patient_reported": false, "qx_id": "", "clinician_confirmed": true } } }
                { $addToSet: { relapses: req.body.data } }
                
             ).then((users) => {
                response.data = "success";
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
        }
       else if(req.body.message == "delete"){
        db.collection('relapses')
        .update( { _id: 1 }, 
            { $pull: { 'relapses': { relapse_id: req.body.id } } }
          )
        .then((users) => {
            response.data = "success";
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
       }
       else{
        db.collection('relapses').update(
            { _id: 1, "relapses.relapse_id": req.body.id },
            { $set: { "relapses.$.relapse_month" : req.body.month,"relapses.$.relapse_year" : req.body.year } }
         )
       }
       
    });
  })
 
module.exports = router;