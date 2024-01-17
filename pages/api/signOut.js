import { deleteRtoken } from '../../database/actions/rtoken'
import { serialize } from 'cookie'
import getAccount from "../../database/actions/getAccount"

const signOut = async (req, res) => {
    try {
        let account = await getAccount(req.cookies.code_jwt) //fjerner også utgåtte rtokens for memory
        await deleteRtoken(account._id.toString())
    } catch {
        console.log('could not delete rtoken')
    }     
    res.setHeader('Set-Cookie', [
        serialize('code_jwt', '', {
          maxAge: -1,
          path: '/',
        }),
        serialize('rcode_jwt', '', {
            maxAge: -1,
            path: '/',
        })
    ]).status(401).send() 
}

export default signOut