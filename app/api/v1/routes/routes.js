const express = require('express');
const router = express.Router(); 
const Link = require('../models/linkModel')
const mongoose = require('mongoose')
const { generateId,suggestIds } = require('../functions/generator')


// API Endpoints 

//1. Create a new Short URL from given URL (METHOD : POST)
router.post('/link',async (req, res) => {

    //fecth longurl & CODE from body
    let longurl = req.body.longurl;
    let shortCode = req.body.code;

    //if code not given by user then generate a random short url
    if (shortCode == null)
    {
        shortCode = generateId();

    }

    //check in database if same code is availabe for any other long url
    const exists = await Link.exists({ "shortName": shortCode });
    if (exists)
    {
        let suggestedCode = suggestIds();
        return res.status(201).json({ "_isExists": true, "suggestedCode": suggestedCode });


    }
    else {

        //save longurl and its corresponding shorturl in database
        const shortnedLink = new Link({"shortName":shortCode,"longUrl":longurl}); // Default role is trainee
        await shortnedLink.save();
        return res.status(201).json({ "_isExists": false, "shortCode": shortCode })  

    }
})



module.exports = router;





