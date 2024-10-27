import { registerUser, loginUser } from '../services/auth.js';

export async function registerController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(payload);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: registeredUser,
  });
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  const session = await loginUser(email, password);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: session.accessToken,
  });
}
