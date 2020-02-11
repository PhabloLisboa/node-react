import User from '../models/User';

class UserController {
  async store(req, resp) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return resp.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return resp.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, resp) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return resp.status(400).json({ error: 'Email already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return resp.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return resp.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
