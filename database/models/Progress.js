import mongoose from "mongoose"
import progressSchema from "./schemas/progressSchema.js"

const Progress = mongoose.models.Progress || mongoose.model("Progress", progressSchema)
export default Progress