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

app.use(express.static('./client'));

// attributes / middlewares
const userCredentials = require('./attributes/user-credentials.attr');
const authorizationAttribute = require('./attributes/authorization.attr');
const quriesAttributes = require('./attributes/query.attribute');

// controllers
const authCtrl = require('./controllers/auth.ctrl');
const contactCtrl = require('./controllers/contact.ctrl');
const reportCtrl = require('./controllers/report.ctrl');

app.use('/reports', reportCtrl);

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

app.use('/contact', ...middlewares, contactCtrl);
app.use('/account', ...middlewares, contactCtrl);
app.use('/user', ...middlewares, contactCtrl);


app.listen(PORT, () => console.log(`server started at port ${PORT}`));