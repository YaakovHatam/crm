const mysql = require('mysql');

var connection = mysql.createConnection({
   host: '127.0.0.1',
   user: 'root',
   password: '',
   database: 'crm'
});

connection.connect(function (err) {
   if (err) console.log(err);
});

function performSelect(query, values, callback) {
   connection.query(query, values, function (err, results, fields) {
      if (fields.find(f => f.name === 'pwd')) {
         results.forEach(r => delete r['pwd']);
      }
      callback(err, results);
   });
}

function performInsert(query, values, callback) {
   connection.query(query, values, function (err, results) {
      callback(err, results.affectedRows === 1);
   });
}

function performDelete() {

}

function performUpdate() {

}

function performQuery(query, values, callback) {
   connection.query(query, values, function (err, results) {
      callback(err, results);
   });
}

module.exports = {
   performSelect,
   performInsert,
   performUpdate,
   performDelete,
   performQuery
}