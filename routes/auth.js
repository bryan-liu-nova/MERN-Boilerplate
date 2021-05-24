const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
// @desc    Google OAuth Transaction
// @route   GET /auth/google
// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google OAuth Callback
// @route   GET /auth/google/callback
router.post('/google/callback', async (req, res) => {
  if (req.body.profile) {
    const profile = req.body.profile;
    const newUser = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      given_name: profile.given_name,
      family_name: profile.family_name,
      providerId: profile.providerId,
      refreshToken: profile.refreshToken,
      accessToken: profile.accessToken,
    };

    try {
      let user = await User.findOne({
        id: profile.id,
      });

      if (user) {
        res.status(200).json({ message: 'User already exit', data: user });
      } else {
        let user = await User.create(newUser);
        res
          .status(200)
          .json({ message: 'Succesfully stored user data!', data: user });
      }
    } catch (error) {
      res.status(400).json({ message: 'Lost connection with db!' });
    }
  } else {
    res.status(400).json({ message: 'Failed to save data!' });
  }
});

router.post('/salesforce/callback', async (req, res) => {
  if (req.body) {
    const profile = req.body.user;
    const newUser = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      given_name: profile.given_name,
      family_name: profile.family_name,
      providerId: profile.providerId,
      refreshToken: profile.refreshToken,
      accessToken: profile.accessToken,
      salesforceAccessToken: profile.salesforceAccessToken,
    };
    try {
      let user = await User.findOne({
        id: profile.id,
      });
      let calculatedUser = {};
      if (user) {
        calculatedUser = await User.update({ id: profile.id }, { ...newUser });
        res
          .status(200)
          .json({
            message: 'Successfully save access token',
            data: calculatedUser,
          });
      } else {
        calculatedUser = await User.create(newUser);
        res
          .status(200)
          .json({
            message: 'uccessfully save access token',
            data: calculatedUser,
          });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});
// @desc    Facebook OAuth Transaction
// @route   GET /auth/facebook
// router.get('/facebook', passport.authenticate('facebook'));

// @desc    Facebook OAuth Callback
// @route   GET /auth/facebook/callback
// router.get(
//   '/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/',
//   }),
// );

// @desc    Logout User
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send(200);
});

module.exports = router;
