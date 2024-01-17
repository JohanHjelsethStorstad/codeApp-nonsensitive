import getAccount from "../../database/actions/getAccount"
import Batch from "../../database/models/Batch"
import getActiveBatch from "../../database/actions/getActiveBatch"

const createBatch = async (req, res) => {
    try {
        const account = await getAccount(req.cookies.code_jwt)

        //Check no active
        const activeBatch = await getActiveBatch(account._id)
        if (activeBatch) return res.status(405).json({error: 'a batch is active'}) 
    
        await Batch.create(
            {
                account: account._id,
                active: true
            }
        )
        res.status(200).send()
    } catch (error) {
        console.log('server error on /api/createBatch: ')
        console.log(error)
        res.status(500).send()
    }
}

export default createBatch