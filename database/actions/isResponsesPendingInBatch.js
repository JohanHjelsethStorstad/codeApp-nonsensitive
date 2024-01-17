import Response from '../models/Response'
import dbConnect from '../dbConnect'

const isResponsesPendingInBatch = async (_id) => {
    await dbConnect()
    const numberPending = await Response.find({batch: {$all: [_id]}, pending: 1}).count()
    if (numberPending !== 0) return true
    return false
}

export default isResponsesPendingInBatch

