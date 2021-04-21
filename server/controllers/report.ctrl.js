const express = require('express');
const os = require('os');
// const reportRepository = require('./../repositories/user.repository');

const router = express.Router();

router.get('/contact-report', function (req, res) {
   var arr = [
      { user_id: 1, user_owner: 2, email: "asd@asd.com" },
      { user_id: 1, user_owner: 2, email: "asd@asd.com" },
      { user_id: 1, user_owner: 2, email: "asd@asd.com" },
      { user_id: 1, user_owner: 2, email: "asd@asd.com" }

   ];

   let file = arr.map(u => Object.entries(u).map(a => a[0]).join(',')) + os.EOL;
   file += arr.map(u => Object.entries(u).map(a => a[1]).join(',')).join(os.EOL);
   res.attachment('report.csv')
   res.type('csv')
   res.send(file);
})

module.exports = router;