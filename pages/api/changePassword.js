import getAccount from "../../database/actions/getAccount"
import bcrypt from 'bcrypt'

const changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword, confirmPassword} = req.body
        let error = {}

        if (!oldPassword) {
            error['oldPassword'] = 'requiered'
        }
        if (!newPassword) {
            error['newPassword'] = 'requiered'
        }
        if (!confirmPassword) {
            error['confirmPassword'] = 'requiered'
        }
        if (Object.keys(error).length !== 0) {
            return res.status(406).json(error)
        }

        if (newPassword.length < 8) {
            error["newPassword"] = "Password must be at least 8 characters"
        }
        if (newPassword != confirmPassword) {
            error["confirmPassword"] = "The confirmed password diden´t match"
        }
        const account = await getAccount(req.cookies.code_jwt)
        const match = await bcrypt.compare(oldPassword, account.hpassword)
        if (!match) {
            error["oldPassword"] = "wrong password"
        }  
        if (Object.keys(error).length !== 0) {
            return res.status(406).json(error)
        }
        const salt = parseInt(process.env.SALT)
        const newhpassword = await bcrypt.hash(newPassword, salt)
        account.hpassword = newhpassword
        await account.save()
        res.status(200).json('updated')
    } catch (error) {
        console.log("a client coudn't change password " + error)
        res.status(500).send()
    }
}

export default changePassword