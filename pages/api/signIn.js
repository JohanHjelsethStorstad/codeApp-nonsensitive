import Account from "../../database/models/Account"
import jsonwebtoken from "jsonwebtoken"
import dbconnect from '../../database/dbConnect'
import bcrypt from 'bcrypt'
import { serialize } from 'cookie'
import { setRtoken } from "../../database/actions/rtoken"

const signIn = async (req, res) => {
    try {
        const password = req.body.password || undefined
        let name = req.body.name
        let error = {}

        if (!name) {
            error["name"] = "requiered"
        }
        if (!password) {
            error["password"] = "requiered"
        }
        if (Object.keys(error).length !== 0) {
            return res.status(406).json(error)
        }

        name = name.toLowerCase()
        
        await dbconnect()
        const account = await Account.findOne({name: name}) 
        if (!account) {
            error["general"] = "name or password is wrong"
        } else {
            const match = await bcrypt.compare(password, account.hpassword)
            if (!match) {
                error["general"] = "name or password is wrong"
            }  
        }

        if (Object.keys(error).length !== 0) {
            return res.status(406).json(error)
        } else {
            const token = jsonwebtoken.sign({_id: account._id.toString()}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 60*15
            }) 
            const rtoken = jsonwebtoken.sign({_id: account._id.toString()}, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: 86400
            }) 
            await setRtoken(account._id.toString(), rtoken)
            const sendToken = serialize('code_jwt', token, { httpOnly: true, path: "/" })
            const sendrToken = serialize('rcode_jwt', rtoken, { httpOnly: true, path: "/" })
            res.setHeader('Set-Cookie', [sendToken, sendrToken])
            console.log("sign In succeesed: " + token)
            return res.status(200).send()
        }
    } catch (error) {
        console.log("a client coudn't be signed in due to server error " + error)
        res.status(500).send()
    }
}

export default signIn