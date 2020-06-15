/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Emailaddresses = require('machinepack-emailaddresses');
const Passwords = require('machinepack-passwords');

module.exports = {
	signUp: function(req, res) {
        if (_.isUndefined(req.param('email'))) {
            return res.json(200, { status: 'error', msg: 'An email address is required!' });
        }

        // if (_.isUndefined(req.param('password')) || req.param('password').length < 6) {
        //     return res.json(200, { status: 'error', msg: 'A password is required, and must be aleast 6 characters' });
        // }

        // validate email and password
        Emailaddresses.validate({
            string: req.param('email')
        }).exec({
            error: function (err) {
                return res.serverError(err);
            },
            invalid: function () {
                return res.json(200, {status: 'error', msg: "Doesn\'t look like an email address to me!"});
            },
            success: function () {
                Passwords.encryptPassword({
                    password: 'password',
                }).exec({
                    error: function (err) {
                        return res.serverError(err);
                    },
                    success: function (encryptedPassword) {
                        // collect ALL signup data
                        var data = {
                            fullname: req.param('name'),
                            email: req.param('email'),
                            phone: req.param('phone'),
                            state: req.param('state'),
                            gender: req.param('gender'),
                            password: encryptedPassword
                        };

                        User.create(data).exec(function (err, user) {
                            if (err) {
                                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                    return res.json(400, {
                                        status: 'error',
                                        msg: 'Email address is already taken, please try another one.'
                                    });
                                }
                                console.log(err);
                                return res.json(400, {status: 'error', msg: err}); // couldn't be completed
                            }

                            //return res.json(200, { status: 'success', user });
                            return res.redirect('/login');
                        });
                    }
                });
            }
        });
    },

    login: function(req, res) {
        User.findOne({ email: req.param('email') }).exec(function(err, foundUser) {
            if (err) return res.json(200, { status: 'Err', msg: err });
            if (!foundUser) return res.json(200, { status: 'Err', msg : 'User not found' });
            Passwords.checkPassword({
                passwordAttempt: 'password',
                encryptedPassword: foundUser.password
            }).exec({
                error: function (err) {
                    return res.json(200, {status: 'Err', msg: err});
                },
                incorrect: function () {
                    return res.json(200, {status: 'Err', msg: 'User not found'});
                },
                success: function () {
                    if (foundUser.deleted) {
                        return res.json(200, {status: 'Err', msg: "'Your account has been deleted.'"});
                    }

                    if (foundUser.banned) {
                        return res.json(200, {
                            status: 'Err',
                            msg: "'Your account has been banned, most likely for violation of the Terms of Service. Please contact us.'"
                        });
                    }
                    req.session.userId = foundUser.id;
                    req.session.user_type = 'user';
                    req.session.fullname = foundUser.fullname;
                    //return res.json(200, {status: 'success'});
                    return res.redirect("/vote");
                }
            });
        });
    },

    signout: function (req, res) {
        if (!req.session.userId) return res.redirect('/');
        User.findOne(req.session.userId, function foundUser(err, createdUser) {
            if (err) return res.negotiate(err);

            if (!createdUser) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.redirect('/');
            }
            req.session.userId = null;
            return res.redirect('/');
        });
    },
};

