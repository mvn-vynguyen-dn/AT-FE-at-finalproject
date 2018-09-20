const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.index = (req, res, next) => {
  Users.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.login = (req, res, next) => {
  const conditon = {
    userName: req.body.userName
  }
  const password = req.body.password;
  Users.show(conditon, (err, user) => {
    if (err) throw err;
    if(user.length) {
      Users.hashPassword(password, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err })
        }
        Users.comparePassword(password, user[0].password, (err, callback) => {
          if (callback) {
            const token = jwt.sign({ username: user.userName, password: user.password}, 'RESTFULAPIs');
            const id = user[0]._id;
            Users.updateField(id, token);
            return res.json(
              {
                token: token
              }
            );
          } else {
            res.status(404).json(
              { error: 'Password or username are wrong' }
            );
          }
      })
    });
  } 
    else {
      res.status(404).json(
        { error: 'Password or username are wrong' }
      );
      };
  })
}

exports.show = (req, res, next) => {
  Users.show((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Users.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const user = req.body;
  const password = req.body.password;
  const userName = req.body.userName;
  const conditon = { userName: userName }
  
  Users.show(conditon, (err, callback) => {
    if (err) throw err;
    if(callback.length) {
      return res.status(409).json({
        error: 'user name alrealy exist'
      })
    }
  Users.hashPassword(password, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const userObj = new Users({
        name: user.name,
        email: user.email,
        age: user.age,
        hobbies: user.hobbies,
        listPictures: user.listPictures,
        listFriends: user.listFriends,
        password: hash,
        userName: userName,
        role: user.role
      });
      Users.create(userObj, (err, callback) => {
        if(err) throw err;
        res.status(200).send(callback);
      });
    }
    });
  })
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Users.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Users.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.forgot = (req, res, next) => {
  const email = process.env.SENDGRID_USER;
  const password = process.env.SENDGRID_PASSWORD;
  var transporter =  nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: password
    },
    tls: {
      rejectUnauthorized: true
    }
  });
  async.waterfall([
    (done) => {
      Users.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (user) {
          done(err, user);
        } else {
          done('User not found.');
        }
      });
    },
    (user, done) => {
      crypto.randomBytes(20, function(err, buffer) {
        var token = buffer.toString('hex');
        done(err, user, token);
      });
    },
    (user, token, done) => {
      Users.findByIdAndUpdate({ _id: user._id }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }, { upsert: true, new: true }).exec(function(err, new_user) {
        done(err, token, new_user);
      });
    },
    (token, user, done) => {
      var data = {
        to: user.email,
        from: email,
        subject: 'Password help has arrived!',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(data, (err) => {
        if (!err) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        } else {
          return done(err);
        }
      });
    }
  ], (err) => {
    return res.status(422).json({ message: err });
  });
};

exports.reset = (req, res, next) => {
  const email = process.env.SENDGRID_USER;
  const password = process.env.SENDGRID_PASSWORD;
  var transporter =  nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: password
    },
    tls: {
      rejectUnauthorized: true
    }
  });

  Users.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }).exec((err, user) => {
    if (!err && user) {
      console.log(user.password);
      if (req.body.newPassword === req.body.verifyPassword) {
        user.password = bcrypt.hashSync(req.body.newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save((err) => {
          if (err) {
            return res.status(422).send({
              message: err
            });
          } else {
            var data = {
              to: user.email,
              from: email,
              subject: 'Password Reset Confirmation',
              text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account in LoveTravel' + user.email + ' has just been changed.\n'
            };
            transporter.sendMail(data, (err) => {
              if (!err) {
                return res.json({ message: 'Password reset' });
              } else {
                return done(err);
              }
            });
          }
        });
      } else {
        return res.status(422).send({
          message: 'Passwords do not match'
        });
      }
    } else {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.'
      });
    }
  });
};
