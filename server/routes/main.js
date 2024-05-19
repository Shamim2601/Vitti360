const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

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
  
      const data = await Tutor.find().sort({ tag: 1, rating: -1 });
  
      res.render('index', { 
        locals,
        data,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

/**
 * GET /filter-tutors
 * Route to filter tutors by tag
 */
router.get('/filter-tutors', async (req, res) => {
  try {
    const locals = {
      title: 'Tutors',
      description: 'Tutor by tag'
    }

    const req_tag = req.query.tag;

    let data;
    if (req_tag === 'all') {
      data = await Tutor.find().sort({ tag: 1, rating: -1 });
    } else {
      data = await Tutor.find({ tag: req_tag }).sort({ rating: -1 });
    }

    res.render('index', { 
      locals,
      data,
      currentRoute: '/filter-tutors'
    });

  } catch (error) {
    console.log(error);
  }
});


module.exports = router;