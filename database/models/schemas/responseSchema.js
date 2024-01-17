import mongoose from "mongoose"
const Schema = mongoose.Schema

const responseSchema = new Schema({
    studentId: {
        type: Number,
        required: true
    },
    booklet: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    team: {
        type: String,
        enum: ['A', 'B']
    },
    reliability: {
        type: Boolean,
        required: true
    },
    batch: {
        type: [String],
        default: []
    },
    pending: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

export default responseSchema