import dbConnect from '../dbConnect'
import Batch from '../models/Batch'
import Response from "../models/Response"

const getNumberCoded = async (_id) => {
    await dbConnect()
    const batches = await Batch.find({account: {$all: [_id]}})
    let numCoded = 0;
    for (let batch of batches) {
        numCoded += await Response.find({batch: {$all: [batch._id]}}).find({pending: 0}).count()
    }
    return numCoded
}

export default getNumberCoded