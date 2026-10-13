
const { body, validationResult } = require('express-validator');
const Person = require('../models/person.model');
const validPersonTypes = ['player', 'coach'];

// get and return all selected people from database
exports.getAllPeople = async (req, res) => {
  const { person_type } = req.params; // choose 'coach' or 'player'
  // make sure person type is valid
  if (!validPersonTypes.includes(person_type)) {
    return res.status(400).json({ message: 'Invalid person type' });
  }

  try {
    // perform the query asynchronously
    const people = await Person.getPersons(person_type);
    // send people data in a JSON response with a 200 (success) status
    res.status(200).json(people);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ message: err.message });
  }
};

// update a person
exports.updatePerson = async (req, res) => {
  try {
    const personId = req.params.id;
    const personData = req.body;
    // perform update asynchronously
    const result = await Person.updatePerson(personId, personData);
    // send a 404 error if it fails
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Person not found' });
    }
    // send updated person data in a JSON response with a 200 (success) status
    res.status(200).json(result);
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ message: err.message });
  }
};

// update player photo URL
exports.updatePlayerUrl = async (req, res) => {
  const personId = req.params.id;
  const personData = req.body;
  // make sure a url is provided
  if (!personData.photo_url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const result = await Person.updatePlayerUrl(personId, personData.photo_url);
    // send a 404 error if it fails
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Player not found' });
    }
    // send updated url data in a JSON response with a 200 (success) status
    res.status(200).json({ message: 'Player URL updated successfully' });
  } catch (err) {
    // send a 500 (server error) status with an error message if it fails
    res.status(500).json({ message: err.message });
  }
};

// validation rules
exports.validate = (method) => {
  const rules = [
    body('full_name')
      .not().isEmpty().trim().escape().withMessage('Full name is required'),
    body('address')
      .not().isEmpty().trim().escape().withMessage('Address is required'),
    body('city')
      .not().isEmpty().trim().escape().withMessage('City is required'),
    body('state')
      .isLength({ min: 2, max: 2 }).withMessage('State must be 2 characters')
      .trim().escape(),
    body('zip')
      .isLength({ min: 5, max: 10 }).withMessage('Zip code must be between 5 and 10 characters')
      .notEmpty().withMessage('Zip code is required')
      .trim().escape(),
    body('email')
      .isEmail().withMessage('Invalid email')
      .custom(async (value) => {
        const exists = await Person.checkDuplicateEmail(value);
        if (exists) {
          throw new Error('Email already exists');
        }
        return true;
      })
      .trim().escape(),
    body('phone')
      .not().isEmpty().trim().escape().withMessage('Phone number is required'),
    body('age')
      .isInt({ min: 0 }).withMessage('Age must be a positive integer')
      .not().isEmpty().withMessage('Age is required'),
    body('height')
      .not().isEmpty().trim().escape().withMessage('Height is required'),
    body('weight')
      .not().isEmpty().trim().escape().withMessage('Weight is required'),
    body('wins')
      .isInt({ min: 0 }).withMessage('Wins must be a positive integer')
      .not().isEmpty().withMessage('Wins are required'),
    body('losses')
      .isInt({ min: 0 }).withMessage('Losses must be a positive integer')
      .not().isEmpty().withMessage('Losses are required'),
    body('license_level_id')
      .isInt().withMessage('License Level ID must be an integer')
      .not().isEmpty().withMessage('License Level ID is required'),
    body('person_type')
      .isIn(validPersonTypes).withMessage('Person type must be "coach" or "player"'),
    body('team_id')
      .isInt().withMessage('Team ID must be an integer')
      .not().isEmpty().withMessage('Team ID is required'),
    body('photo_url')
      .optional().isURL().withMessage('Photo URL must be a valid URL'),
  ];

  switch (method) {
    case 'createPerson':
      return rules;
    case 'updatePerson':
      return rules.map(rule => rule.optional({ nullable: true }));
    default:
      return [];
  }
};

// middleware for validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
