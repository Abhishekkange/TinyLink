const express = require('express');
const router = express.Router(); 
const Link = require('../models/linkModel')
const mongoose = require('mongoose')
const { generateId, generateSuggestions } = require('../functions/generator')

//ejs configuration





// API Endpoints 

//1. Create a new Short URL from given URL (METHOD : POST)
router.post('/link', async (req, res) => {

    //fecth longurl & CODE from body
    let longurl = req.body.longurl;
    let shortCode = req.body.code;

    //if code not given by user then generate a random short url
    if (shortCode == null) {
        shortCode = generateId();

    }

    //check in database if same code is availabe for any other long url
    const exists = await Link.exists({ "shortName": shortCode });
    if (exists) {
        const similar = await generateSuggestions(shortCode);
        return res.status(409).json({ "_isExists": true, "suggestedCode": similar });

    }
    else {

        //save longurl and its corresponding shorturl in database
        const shortnedLink = new Link({ "shortName": shortCode, "longUrl": longurl }); // Default role is trainee
        await shortnedLink.save();
        return res.status(201).json({ "_isExists": false, "shortCode": shortCode })

    }
});



//3: Dashboard API 
router.get('/', async (req, res) => {
    try {
        const allDocs = await Link.find({}).sort({ createdAt: -1 }); // latest first
        res.render("dashboard", { links: allDocs });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

    // 2. Redirection API.
    router.get("/:shortName", async (req, res) => {
        try {
    
            const { shortName } = req.params;
            const record = await Link.findOne({ shortName });
            console.log(shortName);
    
            if (shortName == "create")
            {
                 res.render('index');
            }

            else if (shortName == "healtz") {
                res.status(200).json({ status: "ok", "version": "1.0" });
                
            }

            else {
                if (!record) {
                return res.status(404).send("Short URL not found");
                }
                console.log(record);
                //check delete status of url
                if (record.isDeleted)
                {
                    //return 404 page.
                    res.status(404).render('error');

                }
                else {
                    //update the count and last timestamp
                    var count = record.clickCount;
                    count = count + 1;
                    const updateRecord = await Link.findByIdAndUpdate(record._id, { "clickCount": count });
                    // Redirect user to the original long URL
                    return res.redirect(302, record.longUrl);

                }
    
            
            }
    
            
    
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    });

module.exports = router;





