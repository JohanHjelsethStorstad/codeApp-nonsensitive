import dbConnect from '../database/dbConnect.js'
import Account from '../database/models/Account.js'
import Batch from '../database/models/Batch.js'
import Feedback from '../database/models/Feedback.js'
import Progress from '../database/models/Progress.js'
import Response from '../database/models/Response.js'
import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

await dbConnect(() => {}, process.env.DB_URI)

let accounts = await Account.find({})
let batches = await Batch.find({})
let feedbacks = await Feedback.find({})
let progresses = await Progress.find({})
let responses = await Response.find({})

fs.writeFile(`setUp/backUp-${("0" + (new Date()).getDate()).slice(-2)}.json`, 
    JSON.stringify({accounts, batches, feedbacks, progresses, responses}, null, 4), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('done')
        }
    })