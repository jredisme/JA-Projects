const express = require('express');
const router = express.Router();
const personController = require('../controllers/person.controller');

// get all coaches
router.get('/', (req, res) => {
  const reqWithParams = { 
    ...req, 
    params: { person_type: 'coach' }
  };
  personController.getAllPeople(reqWithParams, res);
});

// update a coach
router.put(
  '/:id',
  personController.validate('updatePerson'), // apply validation rules for updating coach
  personController.handleValidationErrors, // handle validation errors
  personController.updatePerson // update coach if valid
);

module.exports = router;
