import dbConnect from "../../database/dbConnect"
import Feedback from "../../database/models/Feedback"

const feedback = async (req, res) => {
    const {email, feedback} = req.body
    const error = {}
    if (!email) {
        error["email"] = "requiered"
    }
    if (!feedback) {
        error["feedback"] = "requiered"
    }
    if (feedback?.length > 450) {
        error["feedback"] = "feedback must be less than 450 chars"
    }
    if (Object.keys(error).length !== 0) {
        return res.status(406).json(error)
    }
    await dbConnect()
    await Feedback.create({
        email,
        feedback
    }).catch(e => {
        console.log("could not save feedback")
        console.log(e)
        res.send(500)
    })
    res.status(200).send()
}

export default feedback