import { NextResponse } from "next/server"
import { serialize } from 'cookie'

//AUTHERIZATION with jwt
const middleware = async (req) => {  
    const pathname = req.nextUrl.pathname
    const apiReq = pathname.includes('/api/')

    console.log("running autherization...")
    const origin = req.nextUrl.origin

    const unprotectedRoutes = ["/signIn", "/serverError", "/api/feedback", "/authorize"]
    const adminRoutes = ['/api/admin', '/administrator']
    //rest is non-admin protected

    //UNPROTECTED ROUTES => DO NOT CHECK
    if (unprotectedRoutes.some(route => req.url.includes(route))) return NextResponse.next()

    
    const token = req.cookies.code_jwt || undefined
    const refresh = req.cookies.rcode_jwt || undefined
    let response = {
        next: 0,
        status: 500,
        redirect: ""
    }
    let isAdmin = false
    if (token == null) {
        response = {
            next: 0,
            status: 401,
            redirect:`${origin}/signIn`
        }
    } else {
        response = await fetch(
            `${origin}/api/authorize`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({token: token, refresh: refresh})
                })
                .then(authResponse => authResponse.json())
                .then(authResponse => {
                    if (authResponse._id == null) return {
                        next: 0,
                        status: 401,
                        redirect:`${origin}/signIn`,
                        newToken: authResponse.newToken
                    }
                    isAdmin = authResponse.admin
                    return  {
                        next: 1,
                        status: 200,
                        redirect:``,
                        newToken: authResponse.newToken
                    }
                })
                .catch(error => {
                    console.log("could not authorize" + error)
                    return  {
                        next: 0,
                        status: 500,
                        redirect:`${origin}/serverError`
                    }
            })
    }
    if (response.newToken) {
        console.log('setting new token')
        const sendToken = serialize('code_jwt', response.newToken, { httpOnly: true, path: "/" })
        res = NextResponse.redirect(`${origin}${pathname}`)
        res.cookie(sendToken)
        return res
    }
    if (response.next === 1) {
        if (adminRoutes.some(route => req.url.includes(route))) { //sjekker om admin for admin-ruter
            if (!isAdmin) response = {
                next: 0,
                status: 403,
                redirect:`${origin}/adminNeeded`
            } 
        }
    }
    if (response.next === 1) {
        return NextResponse.next()
    }
    if (apiReq) {
        return new Response(JSON.stringify(response), {status: response.status,
            headers: {
              'Content-Type': 'application/json',
            }})
    } else {
        return NextResponse.redirect(response.redirect)
    }
}

export default middleware