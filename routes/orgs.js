const express = require('express');
const router = express.Router();
const Bcrypt = require("bcrypt");
const config = require("config");
const Org = require('../models/Org');
const Posting = require('../models/Posting');
const Application = require('../models/Application');

//@route POST api/orgs
//@desc create an org
//@access Public
router.post('/', (req, res) => {
    Org.findById(req.body.name)
        .then(orgRes => { res.status(404).json({ msg: "Organization exists already" }) })
        .catch(err => {
            req.body.password = Bcrypt.hashSync(req.body.password, 10);

            const newOrg = new Org({
                name: req.body.name,
                password: req.body.password,
                description: req.body.description
            });


            newOrg.save().then(org => {
                res.json({
                    org: {
                        id: org._id,
                        name: org.name,
                        description: org.description
                    }
                })
            });
        })

});

//@route POST api/orgs/login
//@desc validate an orgs's credentials
//@access Public
router.post('/login', (req, res) => {
    Org.findOne({ name: req.body.name }).exec()
        .then(
            orgRes => {
                if (Bcrypt.compareSync(req.body.password, orgRes.password)) {
                    return res.json({
                        org: {
                            id: orgRes._id,
                            name: orgRes.name,
                        }
                    });
                } else {
                    res.json({ success: false });
                }
            }
        )
        .catch(err => res.status(400).json({ success: false }))
});

//@route POST api/orgs/create
//@desc create a posting
//@access Public
router.post('/create', (req, res) => {
    Org.findById(req.body.orgId)
        .then(
            orgRes => {
                if (orgRes) {
                    const posting = new Posting({
                        orgId: req.body.orgId,
                        postingName: req.body.postingName,
                        description: req.body.description,
                        deadline: req.body.deadline,
                        question: req.body.question
                    });


                    posting.save().then(posting => {
                        res.json({
                            posting: {
                                id: posting._id,
                                name: posting.postingName,
                                description: orgRes.description
                            }
                        })
                    });

                }
            }
        )
        .catch(err => res.status(400).json({ success: false }))
});

//@route POST api/orgs/posting
//@desc create a posting
//@access Public
router.post('/posting', (req, res) => {
    Posting.findOne({ orgId: req.body.orgId, name: req.body.name }).exec()
        .then(posting => res.status(400).json({ success: false, posting: posting })
        )
        .catch(err => {
            const newPosting = new Posting({
                name: req.body.name,
                orgId: req.body.orgId,
                question: req.body.question,
                deadline: req.body.deadline,
                description: req.body.description
            });

            newPosting.save().then(posting =>
                res.json(posting));
        })
});

//@route POST api/orgs/update
//@desc update an application
//@access Public
router.put('/update', (req, res) => {
    Application.findOne({ netId: req.body.netId, postingId: req.body.postingId }).exec()
        .then(application => {
            application.status = res.body.status;
            application.save().then(application => res.json(application));
        })
        .catch(err => res.status(400).json({ success: false }))
});

//@route GET api/orgs/[id]
//@desc get an org's postings
//@access Public
router.get('/:orgId', (req, res) => {
    Posting.find({ orgId: req.params.orgId }).exec()
        .then(
            postings => {
                console.log(postings);
                res.json({
                    postings: postings
                });
            }
        )
        .catch(err => res.status(400).json({ success: false }))
});



module.exports = router;