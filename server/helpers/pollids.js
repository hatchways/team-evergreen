const mongoose = require("mongoose");
const pollIds = [];

for (let i = 0; i < 10; i++) {
    pollIds.push(mongoose.Types.ObjectId());
}
module.exports = pollIds;
