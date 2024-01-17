import mongoose from "mongoose"
import responseSchema from './schemas/responseSchema.js'

const Response = mongoose.models.Response || mongoose.model("Response", responseSchema)
export default Response