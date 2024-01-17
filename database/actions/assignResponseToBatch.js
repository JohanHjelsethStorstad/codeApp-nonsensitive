import dbConnect from "../dbConnect"
import Response from "../models/Response"
import Batch from "../models/Batch"
import Account from "../models/Account"

const assignResponseToBatch = async (batchId, booklet, onlyR = false) => {
    await dbConnect()
    const accountId = await Batch.findById(batchId).then(batch => batch.account)
    const team = await Account.findById(accountId).then(account => account.team)
    const normalCode = {batch: { $size: 0 }, team: team}
    const rCode = {batch: { $size: 1 }, reliability: true, team: {$ne: team}}
    const choises = onlyR ? [rCode] : [normalCode, rCode]
    const response = await Response.find({booklet: booklet}) //riktig booklet
                                    .find({pending: false}) //kan ikke kode samtidig som annen, pending kan bli overstyrt
                                    .find({batch: {$ne: batchId}}) //ikke kodet før av samme person
                                    .find({$or: choises}).limit(1)
                                    .then(arr => arr[0])
    if (!response) return null
    response.batch = [...response.batch, batchId]
    response.pending = 1
    await response.save()
    return response
}

export default assignResponseToBatch