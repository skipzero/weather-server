import app from './app'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string 
const PORT = process.env.PORT as string

const weatherDB = mongoose.connect(MONGODB_URI, {
  dbName: 'weatherDB-oak',
})
  .then(() =>{
    console.log('Mongoose connected...(server)')
    app.listen(PORT, () => {
      console.log(`server running, listening on ${PORT}`)
    })
  })
  .catch(err => console.error(err))
