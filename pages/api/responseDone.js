import dbConnect from '../../database/dbConnect'
import Response from '../../database/models/Response'
import getAccount from '../../database/actions/getAccount'
import getActiveBatch from '../../database/actions/getActiveBatch'

const responseDone = async (req, res) => {
    const responseId = req.body.responseId
    await dbConnect()
    const response = await Response.findById(responseId)
    if (!response) res.status(406).send({error: 'response did not exist'})

    //CHECK THAT THE RESPONS IS IN THE ACCOUNTS BATCH
    const account = await getAccount(req.cookies.code_jwt)
    const activeBatch = await getActiveBatch(account._id)
    if (!response.batch.includes(activeBatch._id)) return res.status(406).send({error: 'you do not own the response'})
    
    if (!response.pending) return res.status(406).send({error: 'this response has already been marked as done'})
    response.pending = false
    await response.save()
    res.status(200).send()
} 
export default responseDone