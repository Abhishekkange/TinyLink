const express = require('express');
const router = express.Router(); 
const Link = require('../models/linkModel')
const mongoose = require('mongoose')


// Details of an indivisual Link
router.get('/:code', async (req, res) => {
    
    const shortName = req.params.code;
    
    try {
        
        const doc = await Link.find({ shortName });
        console.log(doc)
        if (doc!=null)
            {
                res.render("stats", { link: doc[0] });
                
                
            }
            
            
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
        
        
    });
    





module.exports = router;
