import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appontment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, resp) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return resp.status(404).json({ error: 'User is not a Provider' });
    }
    const { date } = req.query;
    const parseDate = parseISO(date);

    const appointment = await Appontment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date'],
    });

    return resp.json(appointment);
  }
}

export default new ScheduleController();
