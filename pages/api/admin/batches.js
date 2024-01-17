//RETURNERER BATCHENE TIL EN ID
import getBatchesInfo from "../../../database/actions/getBatchesInfo"

const batches = async (req, res) => { 
    try {
        const batches = await getBatchesInfo(req.body.account)
        res.status(200).json({batches})
    } catch {
        res.status(501).json()
    }   
}

export default batches