import Response from '../models/Response'
import dbConnect from '../dbConnect'

const getResponsesInBatch = async (_id) => {
    await dbConnect()
    const responses = await Response.find({batch: {$all: [_id]}})
    return responses
}

export default getResponsesInBatch