const mongoose = require("mongoose");
const listIds = [];

for (let i = 0; i < 10; i++) {
    listIds.push(mongoose.Types.ObjectId());
}
module.exports = listIds;
