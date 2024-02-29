import app from './app'
import env from './utils/config'
import mongoose from 'mongoose'

const port = env.PORT

mongoose.connect(env.MONGODB_URI)
  .then(() =>{
    console.log('Mongoose connected...')
    app.listen(port, () => {
      console.log(`server running, listening on ${port}`)
    })
  })
  .catch(err => console.error(err))