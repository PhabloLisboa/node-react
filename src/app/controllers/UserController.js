import User from '../models/User';

class UserController {
  async store(req, resp) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return resp.status(404).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return resp.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
