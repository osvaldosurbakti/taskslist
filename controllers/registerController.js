const User = require('../models/User');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send('All fields are required');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).redirect('/index.html'); // Redirect ke halaman login
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).send('Error registering user');
  }
};

module.exports = register;
