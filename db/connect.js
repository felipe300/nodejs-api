import mongoose from 'mongoose'

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // usecreateindex is not supported
    useFindAndModify: false // usefindandmodify are not supported by mongoose 5.x
  })
}

export default connectDB
