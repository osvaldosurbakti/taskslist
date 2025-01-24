const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login request received:', req.body);

    // Cari user berdasarkan username
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found:', username);
      return res.status(401).send('Invalid username or password');
    }

    // Gunakan comparePassword untuk memverifikasi password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log('Password mismatch for user:', username);
      return res.status(401).send('Invalid username or password');
    }

    // Simpan user dalam session
    req.session.user = user;
    console.log('User logged in:', user.username);

    res.redirect('/dashboard.html');
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('An error occurred during login');
  }
};

module.exports = login;
