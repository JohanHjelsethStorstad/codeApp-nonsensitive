import mongoose from "mongoose"
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default feedbackSchema