import Account from "../../../database/models/Account"
import bcrypt from "bcrypt"
import dbConnect from "../../../database/dbConnect"

const createAccount = async (req, res) => {
    try {
        let {id, name, password, confirmPassword, admin, team} = req.body
        let error = {}
        if (!name) {
            error["name"] = "requiered"
        }
        if (!id) {
            error["id"] = "requiered"
        }
        if (!password) {
            error["password"] = "requiered"
        }
        if (!confirmPassword) {
            error["confirmPassword"] = "requiered"
        }
        if (!team) {
            error["team"] = "requiered"
        }
        if (Object.keys(error).length !== 0) {
            return res.status(406).json(error)
        }

        name = name.toLowerCase()

        await dbConnect()
        //prosseserer username
        const match = await Account.findOne({name: name})
        if (match) {
            error["name"] = "name already taken"
        }
        const newmatch = await Account.findOne({id: id})
        if (newmatch) {
            error["id"] = "id already taken"
        }

        //prosseserer password
        if (password.length < 8) {
            error["password"] = "Password must be at least 8 characters"
        }
        //prosseserer confirm password.
        if (password != confirmPassword) {
            error["confirmPassword"] = "The confirmed password diden´t match"
        }

        if (Object.keys(error).length !== 0) {
            res.status(406).json(error)
        } else {
            const salt = parseInt(process.env.SALT)
            const hPassword = await bcrypt.hash(password, salt) // krypterer for lagring. 
            const account = await Account.create({
                id: id,
                name: name,
                hpassword: hPassword,
                admin: admin,
                team: team
            })
            console.log("an account was created: " + account)
            res.status(200).send()
        }
    } catch (error) {
        console.log("an account could not be created due to server side error:")
        console.log(error)
        res.status(500).send()
    }
}

export default createAccount