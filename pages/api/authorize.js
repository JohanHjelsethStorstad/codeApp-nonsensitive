import getAccount from '../../database/actions/getAccount'
import jsonwebtoken from "jsonwebtoken"
import { validateRtoken } from '../../database/actions/rtoken'

//brukes av _middleware
const authorize = async (req, res) => {
    let account = await getAccount(req.body.token)
    let newToken = undefined
    if (!account) {
        //sjekker om rtoken gir en account
        console.log('refreshing token')
        const rtoken = req.body.refresh
        account = await getAccount(rtoken, process.env.REFRESH_TOKEN_SECRET)
        if (!account || !(await validateRtoken(account._id.toString(), rtoken))) { //hvis rtoken gir en konto og denne har denne rtoken fremdeles aktiv gå videre
            console.log('not authorized')
            return res.status(401).json({_id: null})
        }
        newToken = jsonwebtoken.sign({_id: account._id.toString()}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60*15
        }) 
    }
    return res.status(200).json({_id: account._id.toString(), admin: account.admin, newToken: newToken})
}

export default authorize