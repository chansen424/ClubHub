const express = require('express');
const router = express.Router();
const Bcrypt = require("bcrypt");
const config = require("config");
const Org = require('../models/Org');
const Posting = require('../models/Posting');

//@route POST api/orgs
//@desc create an org
//@access Public
router.post('/', (req, res) =>{
    Org.findById(req.body.name)
    .then(orgRes=> {
        if (orgRes)
        return res.status(404).json({msg: "Organization exists already"})
    
    
        req.body.password = Bcrypt.hashSync(req.body.password, 10);

    const newOrg = new Org({
        name: req.body.name,
        password: req.body.password,
        description: req.body.description
    });


    newOrg.save().then(org =>{
        res.json({
            org: {
            id:org._id,
            name: org.name,
            description:org.description
        }})
    } );
    
}).catch(err=> res.status(400).json({msg:err}))

});

//@route POST api/orgs/login
//@desc validate an orgs's credentials
//@access Public
router.post('/login', (req, res) =>{
    Org.findOne({ name: req.body.name }).exec()
    .then(
        orgRes =>{
        if (!Bcrypt.compareSync(req.body.password, orgRes.password)) {
            return res.json({success:false});
        }
        res.json({
                org: {
                id:org._id,
                name:org.name,
                }
            });
        }
    )
    .catch(err => res.status(400).json({success:false}))
});



module.exports = router;