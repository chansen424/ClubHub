const express = require('express');
const router = express.Router();
const Bcrypt = require("bcrypt");
const config = require("config");
const Applicant = require('../models/Applicant');
const Application = require('../models/Application');

//@route POST api/applicants
//@desc create an applicant
//@access Public
router.post('/', (req, res) =>{
    Applicant.findById(req.body.netId)
    .then(appl=> {
        if (appl)
        return res.status(404).json({msg: "Applicant exists already"})
    
    
        req.body.password = Bcrypt.hashSync(req.body.password, 10);

    const newAppl = new Applicant({
        netId: req.body.netId,
        password: req.body.password,
        name: req.body.name
    });


    newAppl.save().then(appl =>{
        res.json({
            appl: {
            id:appl._id,
            netId: appl.netId,
            name:appl.name
        }})
    } );
    
}).catch(err=> res.status(400).json({msg:err}))

});

//@route POST api/applicants/login
//@desc validate an applicant's credentials
//@access Public
router.post('/login', (req, res) =>{
    Applicant.findOne({ netId: req.body.netId }).exec()
    .then(
        appl =>{
        if (!Bcrypt.compareSync(req.body.password, appl.password)) {
            return res.json({success:false});
        }
        res.json({
                appl: {
                id:appl._id,
                netId:appl.netId,
                }
            });
        }
    )
    .catch(err => res.status(400).json({success:false}))
});



module.exports = router;