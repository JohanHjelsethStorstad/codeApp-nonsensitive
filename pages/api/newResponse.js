import getAccount from "../../database/actions/getAccount"
import getActiveBatch from "../../database/actions/getActiveBatch"
import isResponsesPendingInBatch from '../../database/actions/isResponsesPendingInBatch'
import assignResponseToBatch from "../../database/actions/assignResponseToBatch"

const newResponse = async (req, res) => {
    try {
        const { booklet, onlyR } = req.body

        const account = await getAccount(req.cookies.code_jwt)
        const activeBatch = await getActiveBatch(account._id)
        if (!activeBatch) return  res.status(405).json({error: 'no active batch'})

        //Sjekker at ingenting er responses er pending
        if (await isResponsesPendingInBatch(activeBatch._id)) return res.status(405).json({error: 'you have responses left'})
        
        const response = await assignResponseToBatch(activeBatch._id, booklet, onlyR)
        if (!response) return res.status(405).json({error: 'there are no B' + booklet + ' booklets left ' + (onlyR ? 'with only R' : '')})
        return res.status(200).json({response: {
            _id: response._id.toString(),
            studentId: response.studentId,
            booklet: response.booklet,
            pending: response.pending
        }})
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
    
}

export default newResponse