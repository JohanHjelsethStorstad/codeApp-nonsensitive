import { verify } from "jsonwebtoken"
import dbConnect from "../../database/dbConnect"
import Account from "../../database/models/Account"

const getAccount = async (token, secret = process.env.ACCESS_TOKEN_SECRET) => {
    if (!token) return null
    let _id = null
    verify(token, secret, (err, result) => {
        if (err) {
            _id = null
            return
        }
        _id = result._id
    })
    if (!_id) return null
    await dbConnect()
    let account = await Account.findById(_id)
    return account
}

export default getAccount