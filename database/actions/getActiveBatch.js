import dbConnect from "../dbConnect";
import Batch from '../models/Batch'

const getActiveBatch = async (_id) => {
    await dbConnect()
    const activeBatches = await Batch.find({account: _id, active: 1})
    if (activeBatches.length === 0) {
        return null
    } else if (activeBatches.length === 1) {
        return activeBatches[0]
    }
    console.log('There are more than one active batch for account: ' + _id + ' this should never happen!')
    return activeBatches[0]
}

export default getActiveBatch