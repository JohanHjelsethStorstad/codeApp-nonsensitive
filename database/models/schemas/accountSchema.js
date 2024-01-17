import mongoose from "mongoose"
const Schema = mongoose.Schema

const accountSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        min: 6,
        max: 32
    },
    hpassword: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true,
        max: 99999
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    team: {
        type: String,
        enum: ['A', 'B']
    },
    hrtoken: {
        type: String
    }
}, {
    timestamps: true
})

export default accountSchema