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
        title: "QTutor | Welcome",
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
      const data = await Tutor.find({ tag: { $in: tags } }).sort({ tag: 1, rating: -1, id: 1 });
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
        fb: req.body.fb,
      });

      await regTutor.create(newregTutor);

      // Send custom email
      const subject = 'New Tutor Registration';
      const text = `A new tutor has registered:\n\nName: ${req.body.name}\nTag: ${req.body.tag}\nInstitution: ${req.body.institution}\nDepartment: ${req.body.dept}\nHSC Batch: ${req.body.hsc}\nCollege: ${req.body.college}`;
      
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