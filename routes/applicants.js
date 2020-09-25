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
    .then(appl=> res.status(404).json({msg: "Applicant exists already"}))
    .catch(err=> {
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
        });
    })
});

//@route POST api/applicants/login
//@desc validate an applicant's credentials
//@access Public
router.post('/login', (req, res) =>{
    Applicant.findOne({ netId: req.body.netId }).exec()
    .then(
        applicant => {
            console.log(applicant)
        if (!Bcrypt.compareSync(req.body.password, applicant.password)) {
            return res.json({success:false});
        }
        res.json({
                appl: {
                id:applicant._id,
                netId:applicant.netId,
                }
            });
        }
    )
    .catch(err => res.status(400).json({success:false}))
});

//@route POST api/applicants/apply
//@desc create an application
//@access Public
router.post('/login', (req, res) =>{
    Application.findOne({ netId: req.body.netId, postingId:req.body.postingId }).exec()
    .then(application => res.status(400).json({success:false, application: application})
    )
    .catch(err => {
        const newApplication = new Application({
            netId: req.body.netId,
            postingId:postingId,
            answer:req.body.answer,
            status:"pending"
        });

        newApplication.save().then(applic=> 
            res.json(applic));
    })
});



//@route GET api/applicants/[id]
//@desc validate an applicant's applications
//@access Public
router.get('/:netId', (req, res) =>{
    Application.find({ applicantId: req.params.netId }).exec()
    .then(
        applications => {
            console.log(applications);
        res.json({
                applications: applications
            });
        }
    )
    .catch(err => res.status(400).json({success:false}))
});



module.exports = router;