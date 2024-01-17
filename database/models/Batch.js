import mongoose from "mongoose"
import batchSchema from "./schemas/batchSchema.js"

const Batch = mongoose.models.Batch || mongoose.model("Batch", batchSchema)
export default Batch