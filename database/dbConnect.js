import mongoose from 'mongoose'

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async (ret = () => console.log("conneted to db"), uri) => {
  const MONGODB_URI = uri || process.env.DB_URI
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      ret()
      return mongoose
    }).catch(error => {
      console.log("db connection failed")
      console.log(error)
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
export default dbConnect

