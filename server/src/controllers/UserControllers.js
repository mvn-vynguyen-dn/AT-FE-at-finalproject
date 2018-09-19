const Users = require('../models/user');
const jwt = require('jsonwebtoken');

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
    if(user) {
      Users.hashPassword(password, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err })
        }
        Users.comparePassword(password, user[0].password, (err, callback) => {
          if (callback) {
            console.log(user[0].token);
            const token = jwt.sign({ username: user.userName, password: user.password}, 'RESTFULAPIs');
            user[0].token.push(token);
            console.log(user[0].token);
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
  Users.show( (err, callback) => {
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
