const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const { format } = require('date-fns');


router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  // const { name,phone,id,creationDate,email,password } = req.body;
  const { email,password ,username,phone } = req.body;

  // let existingUser;
  // try {
  //   existingUser = await User.findOne({ email: email });
  // } catch (err) {
  //   const error = new HttpError(
  //     "Signing up failed, please try again later.",
  //     500
  //   );
  //   return next(error);
  // }

  // if (existingUser) {
  //   const error = new HttpError(
  //     "User exists already, please login instead.",
  //     422
  //   );
  //   return next(error);
  // }

  const createdUser = new User({

    username,
    phone,
    creationDate: new Date().toLocaleDateString('en-GB'),
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });

});

module.exports = router;

