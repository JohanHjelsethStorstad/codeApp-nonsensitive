import getAccount from "../../database/actions/getAccount"
import getActiveBatch from "../../database/actions/getActiveBatch"
import isResponsesPendingInBatch from '../../database/actions/isResponsesPendingInBatch'


const batchDone = async (req, res) => {
    try {
        const account = await getAccount(req.cookies.code_jwt)
        const activeBatch = await getActiveBatch(account._id)
        if (!activeBatch) return  res.status(405).json({error: 'no active batch'})
    
        //Sjekker at ingenting er responses er pending
        if (await isResponsesPendingInBatch(activeBatch._id)) return res.status(405).json({error: 'you have responses left'})
    
        activeBatch.active = false
        activeBatch.finishedAt = new Date()
        await activeBatch.save()
        res.status(200).send()

    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

export default batchDone