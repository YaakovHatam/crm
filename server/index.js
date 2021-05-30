const express = require('express');
const cors = require('cors');
const expressFileupload = require('express-fileupload');
// variables
process.env.SECRET_KEY = 'abc';
process.env.prod = process.env.prod || false;

// configurations
const PORT = 14700;
const app = express();

app.use(expressFileupload());
app.use(express.json());

// if (!process.env.prod) {
app.use(cors());
// }

app.use('/images', express.static('./uploads'));
app.use(express.static('./client'));

// attributes / middlewares
const userCredentials = require('./attributes/user-credentials.attr');
const authorizationAttribute = require('./attributes/authorization.attr');
const quriesAttributes = require('./attributes/query.attribute');
const adminOnlyAttribute = require('./attributes/admin-only.attr');

// controllers
const authCtrl = require('./controllers/auth.ctrl');
const contactCtrl = require('./controllers/contact.ctrl');
const reportCtrl = require('./controllers/report.ctrl');


app.use('/auth', userCredentials, authCtrl);

const middlewares = [
   authorizationAttribute,
   quriesAttributes.fieldsQuery
];

app.post('/upload', function (req, res) {
   console.log(1);
   if (req.files && req.files.user_picture) {
      req.files['user_picture'].mv(__dirname + '/uploads/' + req.files.user_picture.name, function (err) {
         if (err) {
            return res.status(500).send();
         }
         res.send();
      });
   } else {
      res.status(500).send();
   }
})

app.use('/api/v1/contact', ...middlewares, contactCtrl);
app.use('/api/v1/account', ...middlewares, contactCtrl);
app.use('/api/v1/user', ...middlewares, contactCtrl);
app.use('/api/v1/reports', ...middlewares, adminOnlyAttribute, reportCtrl);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));