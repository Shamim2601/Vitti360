const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');
const regTutor = require('../models/regTutor');

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


/**
 * GET /
 * REG Tutors
*/
router.get('/reg-tutor', async (req, res) => {
  try {
    const locals = {
      title: "QTutor | Welcome",
      description: "Simple Site created with NodeJs, Express & MongoDb."
    }

    res.render('regtutor', { 
      locals,
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * reg tutor
*/
router.post('/reg-tutor', async (req, res) => {
  try {
    const tutors = await Tutor.find({}, { id: 1 }).sort({ id: -1 }).limit(1); // Find the tutor with the highest ID
    let highestId = 1;

    if (tutors.length > 0) {
        const highestIdStr = tutors[0].id; // Get the highest ID from the result
        const numericPart = parseInt(highestIdStr.substring(1)); // Extract numeric part after the prefix "t"
        highestId = numericPart + 1; // Increment the numeric part
    }

    const newId = "t" + highestId; // Form the new ID by concatenating the prefix "t" with the incremented numeric part
    try {
      const newregTutor = new regTutor({
        name: req.body.name,
        id: newId,
        tag: req.body.tag,
        institution: req.body.institution,
        dept: req.body.dept,
        hsc: req.body.hsc,
        background: req.body.background,
        college: req.body.college,
        expertise: req.body.expertise,
        mode: req.body.mode,
        pref: req.body.pref,
        phone: req.body.phone,
        fb: req.body.fb,
        rating: 5,
      });

      await regTutor.create(newregTutor);
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;