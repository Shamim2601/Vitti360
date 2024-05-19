const express = require('express');
const router = express.Router();
const Post = require('../models/Tutor');

// Routes

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
    try {
      // console.log(req.query);
      const locals = {
        title: "QTutor | Welcome",
        description: "Simple Site created with NodeJs, Express & MongoDb."
      }
  
      const data = await Tutor.aggregate([
        { $sample: { size: 2 } }
      ]);      
  
      res.render('index', { 
        locals,
        data,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });


module.exports = router;