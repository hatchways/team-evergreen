//pollModelUpdates
/**
 * @author - Fil
 * @date - September 8, 2019
 * @purpose - Functions used to update the Poll model
 */

import Poll from "../../models/Poll";
export async function createNewPoll(data, cb) {
    console.log(data);
    await new Poll({
        title: data.pollTitle,
        userId: data.userId,
        sendToList: data.sendToList,
        expiresOn: data.expiresOn,
        $push: {
            options: data.imageUrls
        }
    })
        .save()
        .then(newPoll => {
            cb({ pollId: newPoll[_id] });
        })
        .catch(err => {
            console.log(err);
            cb(err);
        });
}
