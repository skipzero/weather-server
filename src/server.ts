import app from './app'
import mongoose from 'mongoose'
console.log(process.env.MONGODB_URI)
const MONGODB_URI: any =  process.env.MONGODB_URI;
const PORT = process.env.PORT as string

mongoose.connect(MONGODB_URI, {
  dbName: 'weatherDB-oak',
})
  .then(() =>{
    console.log('Mongoose connected...(server)')
    app.listen(PORT, () => {
      console.log(`server running, listening on ${PORT}`)
    })
  })
  .catch(err => console.error(err))
