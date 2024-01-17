import dbConnect from '../database/dbConnect.js'
import Response from '../database/models/Response.js'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

console.log('setUp starting. Script will import responses into mongodb')
fs.readFile('setUp/data.json', 'utf-8', async (err, data) => {
    try {
        if (err) throw err
        const responses = JSON.parse(data) 
        await dbConnect(() => {}, process.env.DB_URI)
        const num = await Response.find({}).count()
        if (num) {
            throw "Responses is not empty!"
        }  else {
            console.log("creationg responses")
            Response.create(responses).then(() => {
                console.log("responses are in database!")
                process.exit()
            })
        }
    } catch (err) {
        console.log(err)
        process.exit()
    }
})


