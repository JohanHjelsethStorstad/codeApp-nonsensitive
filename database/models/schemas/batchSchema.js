import mongoose from "mongoose"
const Schema = mongoose.Schema

const batchSchema = new Schema({
    account: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    finishedAt: {
        type: Date
    }
}, {
    timestamps: true
})

export default batchSchema