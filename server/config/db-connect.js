//db-connect.js
/* Created by Fil on August 25, 2019 */

//TODO (FG) - Change require to import once Babel works?
const config = require('./config.js');
const mongoose = require('mongoose');

const dbUrl = `${config.db.dbType}://${config.db.host}:${config.db.port}/${config.db.name}`;
/* const dbConnect = () => {
  return mongoose.connect(dbUrl, {useNewUrlParser: true})
};
*/
function dbConnect(){
  return mongoose.connect(dbUrl, {useNewUrlParser:true});
}

export default dbConnect();

