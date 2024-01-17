import dbConnect from "../dbConnect"
import Account from "../models/Account"
import bcrypt from 'bcrypt'

const setRtoken = async (accountId, rtoken) => {
    const salt = parseInt(process.env.SALT)
    await dbConnect()
    let account = await Account.findById(accountId)
    let hrtoken = await bcrypt.hash(rtoken, salt)
    account.hrtoken = hrtoken
    await account.save()
}

const validateRtoken = async (accountId, rtoken) => {
    await dbConnect()
    let account = await Account.findById(accountId)
    const match = await bcrypt.compare(rtoken, account.hrtoken).catch((error) => {
        console.log(error)
        return false
    })
    return match
}

const deleteRtoken = async (accountId) => {
    await dbConnect()
    let account = await Account.findById(accountId)
    account.hrtoken = undefined
    await account.save()
}


export { validateRtoken, setRtoken, deleteRtoken }