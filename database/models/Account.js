import mongoose from "mongoose"
import accountSchema from "./schemas/accountSchema.js"

const Account = mongoose.models.Account || mongoose.model("Account", accountSchema)
export default Account