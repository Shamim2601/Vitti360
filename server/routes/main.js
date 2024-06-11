const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');
const regTutor = require('../models/regTutor');
const sendMail = require('../helpers/mailer');

// Routes

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
    try {
      // console.log(req.query);
      const locals = {
        title: "Vitti360 | Welcome",
        description: "Simple Site created with NodeJs, Express & MongoDb."
      }
  
      const tags = ['buet', 'du', 'medical', 'cadet'];
      const data = await Tutor.find({ tag: { $in: tags } }).sort({ tag: 1, rating: -1, id: 1 });

  
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
      const tags = ['buet', 'du', 'medical', 'cadet'];
      data = await Tutor.find({ tag: { $in: tags } }).sort({ tag: 1, rating: -1, id: 1 });
    } else {
      data = await Tutor.find({ tag: req_tag }).sort({ rating: -1, id: 1 });
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
 * GET /search-tutors
 * Route to search tutors by name, preferred area, institution, department, college, or expertise
 */
router.get('/search-tutors', async (req, res) => {
  try {
    const locals = {
      title: 'Search Results',
      description: 'Tutors matching your search criteria'
    };

    const searchQuery = req.query.query;
    const searchRegex = new RegExp(searchQuery, 'i'); // Case-insensitive search

    // Search for tutors matching the query in multiple fields
    const data = await Tutor.find({
      $or: [
        { name: searchRegex },
        { pref: searchRegex },
        { institution: searchRegex },
        { dept: searchRegex },
        { college: searchRegex },
        { expertise: searchRegex }
      ]
    }).sort({ rating: -1, id: 1 });

    res.render('index', {
      locals,
      data,
      currentRoute: '/search-tutors'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});


/**
 * GET /
 * REG Tutors
*/
router.get('/reg-tutor', async (req, res) => {
  try {
    const locals = {
      title: "Vitti360 | Welcome",
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
    try {
      const newregTutor = new regTutor({
        name: req.body.name,
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
        email: req.body.email,
        fb: req.body.fb,
      });

      await regTutor.create(newregTutor);

      // Send custom email
      const subject = 'New Tutor Registration';
      const text = `A new tutor has registered:\n\nName: ${req.body.name}\nTag: ${req.body.tag}\nInstitution: ${req.body.institution}\nDepartment: ${req.body.dept}\nHSC Batch: ${req.body.hsc}\nCollege: ${req.body.college}\nGo to Admin Panel:\nhttps://www.vitti360.xyz/admin`;
      
      await sendMail('saimaneeti367@gmail.com', subject, text);

      res.redirect('/');
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;