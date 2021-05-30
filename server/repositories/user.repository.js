const md5 = require('md5');
const db = require('./../db/db');

function getById(id, callback) {
   db.performSelect('SELECT * FROM `users` WHERE `user_id` = ?', [id], function (err, res) {
      if (res.length == 1) {
         callback(null, res[0]);
      } else callback('no user');
   });
}

function getByLogin(email, pass, callback) {
   db.performSelect('SELECT * FROM `users` WHERE `email` = ? AND pwd = ?', [email, md5(pass)], function (err, res) {
      callback(err, res.length == 1 ? res[0] : null);
   });
}

function getOwnedUsers(id, callback) {
   db.performSelect('SELECT * FROM `users` WHERE `user_owner` = ?', [id], function (err, res) {
      callback(err, res);
   });
}
function getOwned(user_id, callback) {
   getById(user_id, function (err, res) {
      if (err) return callback(err);

      if (res.role === 'Admin') {
         getOwnedUsers(res.user_id, function (err2, res2) {
            callback(err2, res2);
         })
      } else callback(null, null);
   });
}

function isEmailExist(email, callback) {
   db.performSelect('SELECT email FROM `users` WHERE `email` = ?', [email], function (err, res) {
      if (res.length > 0) {
         callback(null, true);
      } else callback(null, false);
   });
}

function add(objModel, callback) {
   isEmailExist(objModel.email, function (err, res) {
      if (!res) {
         db.performInsert("INSERT INTO `users` (`email`, `pwd`, `role`, `user_status`, `user_owner`) VALUES (?, ?, ?, ?, ?)",
            [objModel.email, md5(objModel.pass), objModel.role, 'Active', objModel.ownerid], function (err, res) {
               callback(err, res);
            })
      } else return callback('email exist');
   })


}

module.exports.getById = getById;
module.exports.getOwned = getOwned;
module.exports.getByLogin = getByLogin;
module.exports.add = add;