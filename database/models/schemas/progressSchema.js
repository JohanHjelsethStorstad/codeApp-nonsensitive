import mongoose from "mongoose"
const Schema = mongoose.Schema

const progressSchema = new Schema({
    a: {
        type: mongoose.SchemaTypes.Mixed,
        required: true,
    },
    b: {
        type: mongoose.SchemaTypes.Mixed,
        required: true,
    }
}, {
    timestamps: true
})

export default progressSchema