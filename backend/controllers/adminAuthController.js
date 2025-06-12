const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Helper: Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// @desc    (Disabled) Register new admin
// @route   POST /api/admin/register
// @access  Private (should be used only manually or protected)
// ❗ Consider removing this in production
exports.registerAdmin = async (req, res) => {
  return res.status(403).json({ message: "Admin registration is disabled." });

  /*
  ❗ You can use this block manually (e.g. via Postman in super-admin tools)

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  const adminUser = await User.create({ name, email, password, isAdmin: true });

  res.status(201).json({
    _id: adminUser._id,
    name: adminUser.name,
    email: adminUser.email,
    isAdmin: adminUser.isAdmin,
    token: generateToken(adminUser),
  });
  */
};

// @desc    Login as admin
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid credentials." });

    if (!user.isAdmin)
      return res.status(403).json({ message: "Access denied. Not an admin." });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: true,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};