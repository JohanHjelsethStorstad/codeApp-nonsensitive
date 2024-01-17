import dbConnect from "../dbConnect"
import Account from "../models/Account"

const getAllAccounts = async () => {
    await dbConnect()
    let accounts = await Account.find({})
    return accounts
}

export default getAllAccounts