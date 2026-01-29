// === controllers/userController.js ===
import User from '../models/User.js';

// @desc   Register a new user
// @route  POST /api/users
// @access Public
export const registerUsers = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({ message: 'Input should be an array of users.' });
    }

    const createdUsers = [];

    for (const userData of users) {
      const { name, email, password, role } = userData;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) continue; // Skip duplicates

      const newUser = new User({ name, email, password, role });
      await newUser.save();
      createdUsers.push({ name, email, role });
    }

    res.status(201).json({ message: `${createdUsers.length} users registered`, users: createdUsers });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error: error.message });
  }
};

// @desc   Get profile of current user
// @route  GET /api/users/getProfile
// @access Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc   Get all users
// @route  GET /api/users/getAllUsers
// @access Private/Seller (or Admin if you change roles)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// @desc   Get single user
// @route  GET /api/users/:id
// @access Private/Seller
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private/Seller
export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.name = name || user.name;
        user.role = role || user.role;
        
        await user.save();
        
        res.json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status || 'active'
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Seller
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc   Update user status
// @route  PATCH /api/users/:id/status
// @access Private/Seller
export const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.status = status;
        await user.save();
        
        res.json({ 
            _id: user._id,
            status: user.status
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc   Update user role
// @route  PATCH /api/users/:id/role
// @access Private/Seller
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.role = role;
        await user.save();
        
        res.json({ 
            _id: user._id,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
// @desc   Create a single user
// @route  POST /api/users/create
// @access Private/Seller
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ 
      name, 
      email, 
      password,  // Will be hashed by the pre-save hook
      role: role || 'buyer',
      status: status || 'active'
    });

    await newUser.save();

    // Return user data without password
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status
    };

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to create user', 
      error: error.message 
    });
  }
};