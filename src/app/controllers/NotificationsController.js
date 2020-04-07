import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationsController {
  async index(req, resp) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return resp.status(401).json({ error: 'Oly provders can stay here!' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return resp.json(notifications);
  }

  async update(req, resp) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return resp.json(notification);
  }
}

export default new NotificationsController();
