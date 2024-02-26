import {User} from '../models/user';

app.post('/auth/resister', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExists = await User.findOne({
      email
    });
    if (emailExists) {
      res.status(400).json({
        message: 'email already exists'
      })
      return
    }
    const newUser = await User.create({
      name,
      email,
      password
    })
  } catch (err) {
    console.error(err)
  }
})