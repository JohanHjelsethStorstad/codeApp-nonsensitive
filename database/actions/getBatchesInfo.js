//RETURNERER INFO OM  EN KODERS BATCHES SOM ER KODET UT FRA _id
import dbConnect from "../dbConnect"
import Batch from "../models/Batch"
import getResponsesInBatch from "./getResponsesInBatch"
import Response from "../models/Response"

const getBatchesInfo = async (_id) => {
    await dbConnect()
    const batches = await Batch.find({account: _id}).sort({createdAt: -1})
    let data = []
    let number = batches.length
    for (let batch of batches) {
        const responses = await getResponsesInBatch(batch._id)
        data.push({
            _id: batch._id.toString(),
            account: batch.account,
            active: batch.active,
            number: number,
            createdAt: batch.createdAt,
            finishedAt: batch.finishedAt,
            numberResponses: responses.length,
            responses: responses.map(response => {
                return {
                    _id: response._id.toString(),
                    studentId: response.studentId,
                    booklet: response.booklet,
                    pending: response.pending
                }
            })
        })
        number--
    }
    return JSON.parse(JSON.stringify(data)) 
}

export default getBatchesInfo