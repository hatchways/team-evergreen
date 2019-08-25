//db-connect.js
/* Created by Fil on August 25, 2019 */

//TODO (FG) - Change require to import once Babel works?
const config = require('./config.js');
const mongoose = require('mongoose');

const dbUrl = `${config.db.dbType}://${config.db.host}:${config.db.port}/${config.db.name}`;
console.log (dbUrl);
const dbConnect = () => {
  return mongoose.connect(dbUrl)
};

const user = new mongoose.Schema({
  firstName: String,
  lastName:String,
  eMail:String
});

const User = mongoose.model('user', user);

dbConnect()
  .then( async connection => {
    const user = await User.create({
      firstName: 'Fil',
      lastName: 'Gambatesa',
      eMail: 'filgdev@gmail.com'
    })
  })
  .catch(error => console.error (error));