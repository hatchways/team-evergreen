//pollModelUpdates
/**
 * @author - Fil
 * @date - September 8, 2019
 * @purpose - Functions used to update the Poll model
 */

import Poll from "../../models/Poll";
export async function createNewPoll(data) {
    try {
        const newPoll = await new Poll({
            title: data.pollTitle,
            userId: data.userId,
            sendToList: data.sendToList,
            expiresOn: data.expiresOn,
            options: data.imageUrls
        });
        await newPoll.save();
        return { status: 200, pollId: newPoll._id };
    } catch (err) {
        console.log(err);
        return { status: 500, message: "Unable to save poll images." };
    }
}
