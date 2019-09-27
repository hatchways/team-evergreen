const mongoose = require("mongoose");
const userIds = [];

for (let i = 0; i < 10; i++) {
    userIds.push(mongoose.Types.ObjectId());
}
module.exports = userIds;
